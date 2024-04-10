import {DDMMYYYY, YYYYMMDD} from '@constants/date-formates.ts';
import {periodicityOptions} from '@constants/periodicity-options.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import CalendarIcon from '@public/icons/calendar.svg?react';
import {selectProfileInfo} from '@redux/slices/profile-slice.ts';
import {
    selectCreatedTraining,
    selectTrainingData,
    setCreatedTraining
} from '@redux/slices/training-slice.ts';
import {calendarLocale} from '@utils/calendar-options.ts';
import {Checkbox, DatePicker, Select} from 'antd';
import {CheckboxChangeEvent} from 'antd/es/checkbox';
import moment, {Moment} from 'moment';

import styles from './periodicity-block.module.less';

export const PeriodicityBlock = () => {
    const dispatch = useAppDispatch();
    const {date, parameters} = useAppSelector(selectCreatedTraining);
    const {userTraining} = useAppSelector(selectTrainingData);
    const {readyForJointTraining} = useAppSelector(selectProfileInfo);

    const handleChangeDate = (date: Moment) => {
        dispatch(setCreatedTraining({date: date?.toISOString()}));
    }

    const handleParameterChange = (period: number, repeat: boolean) => {
        dispatch(
            setCreatedTraining({
                parameters: {
                    period,
                    repeat,
                    jointTraining: readyForJointTraining,
                    participants: [],
                },
            }),
        );
    };

    const handleTogglePeriodicity = (e: CheckboxChangeEvent) => {
        handleParameterChange(0, e.target.checked);
    };

    const handleChangePeriodicity = (period: number) => {
        handleParameterChange(period, parameters?.repeat || false);
    };

    const dateRender = (current: Moment) => {
        const formattedDate = moment(current).format(YYYYMMDD);

        if (Object.keys(userTraining).includes(formattedDate)) {
            return (
                <div className='ant-picker-cell-inner' style={{backgroundColor: '#F0F5FF'}}>
                    {current.date()}
                </div>
            );
        }

        return current.date();
    };

    return (
        <div>
            <div className={styles.dateBlock}>
                <DatePicker
                    locale={calendarLocale}
                    format={DDMMYYYY}
                    size='small'
                    defaultValue={date ? moment(date) : undefined}
                    dateRender={dateRender}
                    onSelect={handleChangeDate}
                    disabledDate={date => date.isBefore(moment())}
                    suffixIcon={<CalendarIcon fill='rgba(0, 0, 0, 0.25)'/>}
                    className={styles.datePicker}
                    data-test-id='modal-drawer-right-date-picker'
                />
                <Checkbox
                    checked={parameters?.repeat}
                    onChange={handleTogglePeriodicity}
                    data-test-id='modal-drawer-right-checkbox-period'
                >
                    С периодичностью
                </Checkbox>
            </div>
            {parameters?.repeat &&
                <Select
                    defaultValue={parameters?.period || 'Периодичность'}
                    options={periodicityOptions}
                    className={styles.periodicitySelect}
                    onChange={handleChangePeriodicity}
                    data-test-id='modal-drawer-right-select-period'
                />}
        </div>
    )
}
