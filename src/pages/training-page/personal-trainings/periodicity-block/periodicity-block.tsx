import {DDMMYYYY, YYYYMMDD} from '@constants/date-formates.ts';
import {periodicityOptions} from '@constants/periodicity-options.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import CalendarIcon from '@public/icons/calendar.svg?react';
import {
    selectCreatedTraining,
    selectTrainingData,
    setCreatedTraining
} from '@redux/slices/training-slice.ts';
import {calendarLocale} from '@utils/calendar-options.ts';
import {Checkbox, DatePicker, Select} from 'antd';
import {CheckboxChangeEvent} from 'antd/es/checkbox';
import {RangePickerProps} from 'antd/es/date-picker';
import moment, {Moment} from 'moment';

import styles from './periodicity-block.module.less';

export const PeriodicityBlock = () => {
    const dispatch = useAppDispatch();
    const {date, parameters} = useAppSelector(selectCreatedTraining);
    const {userTraining} = useAppSelector(selectTrainingData);

    const handleChangeDate = (date: Moment) => {
        dispatch(setCreatedTraining({date: date?.toISOString()}));
    }

    const dateRender = (current: Moment) => {
        const formattedDate = moment(current).format(YYYYMMDD);

        if (Object.keys(userTraining).includes(formattedDate)) {
            return (
                <div className="ant-picker-cell-inner" style={{backgroundColor: '#F0F5FF'}}>
                    {current.date()}
                </div>
            );
        }

        return current.date();
    };

    const handleChangePeriodicity = (period: number) => {
        dispatch(setCreatedTraining({
            parameters: {
                period,
                repeat: parameters?.repeat as boolean,
                jointTraining: parameters?.jointTraining as boolean,
                participants: []
            }
        }));
    }

    const frequencyHandler = (e: CheckboxChangeEvent) => {
        dispatch(
            setCreatedTraining({
                parameters: {
                    period: 0,
                    repeat: e.target.checked,
                    jointTraining: parameters?.jointTraining as boolean,
                    participants: [],
                },
            }),
        );
    };

    const disabledDate: RangePickerProps['disabledDate'] = current => current && current < moment().endOf('day');

    return (
        <div>
            <div className={styles.dateBlock}>
                <DatePicker
                    locale={calendarLocale}
                    format={DDMMYYYY}
                    size='small'
                    defaultValue={date ? moment(date) : undefined}
                    dateRender={dateRender}
                    onChange={handleChangeDate}
                    disabledDate={disabledDate}
                    suffixIcon={<CalendarIcon fill='rgba(0, 0, 0, 0.25)'/>}
                    className={styles.datePicker}
                    data-test-id='modal-drawer-right-date-picker'
                />
                <Checkbox
                    checked={parameters?.repeat}
                    onChange={frequencyHandler}
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
