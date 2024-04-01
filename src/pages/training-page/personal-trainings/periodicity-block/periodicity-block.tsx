import {useState} from 'react';
import {DDMMYYYY, YYYYMMDD} from '@constants/date-formates.ts';
import {periodicityOptions} from '@constants/periodicity-options.ts';
import {useAppDispatch} from '@hooks/typed-react-redux-hooks.ts';
import CalendarIcon from '@public/icons/calendar.svg?react';
import {setCreatedTraining} from '@redux/slices/training-slice.ts';
import {calendarLocale} from '@utils/calendar-options.ts';
import {Checkbox, DatePicker, Select} from 'antd';
import {RangePickerProps} from 'antd/es/date-picker';
import moment, {Moment} from 'moment';

import styles from './periodicity-block.module.less';

export const PeriodicityBlock = () => {
    const dispatch = useAppDispatch();
    const [isChecked, setIsChecked] = useState(false);

    const handleChangeDate = (date: Moment) => {
        dispatch(setCreatedTraining({date: date.toISOString()}));
    }

    const disabledDate: RangePickerProps['disabledDate'] = current => current && current < moment().endOf('day');

    return (
        <div>
            <div className={styles.dateBlock}>
                <DatePicker
                    locale={calendarLocale}
                    format={DDMMYYYY}
                    size='small'
                    disabledDate={disabledDate}
                    onChange={handleChangeDate}
                    suffixIcon={<CalendarIcon fill='rgba(0, 0, 0, 0.25)'/>}
                    className={styles.datePicker}
                    data-test-id='modal-drawer-right-date-picker'
                />
                <Checkbox
                    onChange={() => setIsChecked(!isChecked)}
                    data-test-id='modal-drawer-right-checkbox-period'
                >
                    С периодичностью
                </Checkbox>
            </div>
            {isChecked &&
                <Select
                    defaultValue='Периодичность'
                    options={periodicityOptions}
                    className={styles.periodicitySelect}
                    data-test-id='modal-drawer-right-select-period'
                />}
        </div>
    )
}
