import React, {ReactNode} from 'react';
import {TrainingBadge} from '@components/training-badge';
import {UserTraining} from '@redux/types/training.ts';
import moment, {Moment} from 'moment';

import styles from './calendar-cell.module.less';

type CalendarCellProps = {
    value: moment.Moment,
    onSelect: (date: Moment) => void,
    popoverComponent: ReactNode | null,
    trainingByDay: UserTraining[] | undefined,
    isFullScreen: boolean,
}

export const CalendarCell = ({
                                 value,
                                 onSelect,
                                 popoverComponent,
                                 trainingByDay,
                                 isFullScreen
                             }: CalendarCellProps) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isFullScreen) {
            e.stopPropagation();
        }

        onSelect(value);
    }

    return (
        <div
            onClick={handleClick}
            className='ant-picker-cell-inner ant-picker-calendar-date'
        >
            <div className='ant-picker-calendar-date-value'>
                {value.date().toString().padStart(2, '0')}
            </div>
            <div className='ant-picker-calendar-date-content'>
                {popoverComponent}
                {trainingByDay?.map(({_id, name}) => (
                    <div key={_id} className={!isFullScreen ? styles.mobileCell : ''}>
                        {isFullScreen && <TrainingBadge training={name}/>}
                    </div>
                ))}
            </div>
        </div>
    )
}

