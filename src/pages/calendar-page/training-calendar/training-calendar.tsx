import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {YYYYMMDD} from '@constants/date-formates.ts';
import {PATHS} from '@constants/paths.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {ExercisesPopover} from '@pages/calendar-page/popover/exercises-popover.tsx';
import {TrainingPopover} from '@pages/calendar-page/popover/training-popover.tsx';
import {TrainingBadge} from '@pages/calendar-page/training-badge/training-badge.tsx';
import {useGetUserTrainingsQuery} from '@redux/api/training-api.ts';
import {selectTrainingData, setDate} from '@redux/slices/training-slice.ts';
import {calendarLocale} from '@utils/calendar-options.ts';
import {Calendar, Grid} from 'antd';
import moment, {Moment} from 'moment';

import styles from './training-calendar.module.less';

const {useBreakpoint} = Grid;

export const TrainingCalendar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {data} = useGetUserTrainingsQuery();
    const {date: selectedDate} = useAppSelector(selectTrainingData);

    const [isFullScreen, setIsFullScreen] = useState(true);
    const [addNewWorkout, setAddNewWorkout] = useState(false);
    const [createWorkout, setCreateWorkout] = useState(false);
    const [editingTrainingName, setEditingTrainingName] = useState<string | null>(null);
    const [isLeft, setIsLeft] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState<Moment>(moment());

    const location = useLocation();
    const screens = useBreakpoint();

    useEffect(() => {
        if (!screens.sm) {
            setIsFullScreen(false);
        } else {
            setIsFullScreen(true)
        }
    }, [screens.sm]);

    useEffect(() => {
        const {state} = location;

        if (state?.from !== 'redirect') {
            navigate(PATHS.main);
        }

    }, [location, navigate]);

    const onSelect = (date: Moment) => {
        if (isFullScreen && !date.isSame(selectedMonth, 'month')) {
            setAddNewWorkout(false);

            return;
        }

        setAddNewWorkout(true);
        setCreateWorkout(false);

        dispatch(setDate(date?.toISOString()))

        const dayInNumber = moment(date).day();

        const isPopoverRight =
            dayInNumber === 0 ||
            (dayInNumber === 6 && isFullScreen && !screens.lg) ||
            (dayInNumber === 5 && screens.sm && !screens.md);

        if (isPopoverRight) {
            setIsLeft(false);

            return;
        }

        setIsLeft(true);
    }

    const handlePanelChange = (value: Moment) => setSelectedMonth(value);

    const dateCellRender = (value: Moment) => {
        const dateString = value.format(YYYYMMDD);
        const trainingByDay = data && data[dateString];

        let popoverComponent = null;

        if (value.isSame(selectedDate, 'day') && addNewWorkout) {
            popoverComponent = createWorkout ? (
                <ExercisesPopover
                    isLeft={isLeft}
                    isFullScreen={isFullScreen}
                    createWorkout={createWorkout}
                    setCreateWorkout={setCreateWorkout}
                    editingTrainingName={editingTrainingName}
                    setEditingTrainingName={setEditingTrainingName}
                    setAddNewWorkout={setAddNewWorkout}
                />
            ) : (
                <TrainingPopover
                    isLeft={isLeft}
                    isFullScreen={isFullScreen}
                    addNewWorkout={addNewWorkout}
                    setAddNewWorkout={setAddNewWorkout}
                    setCreateWorkout={setCreateWorkout}
                    setEditingTrainingName={setEditingTrainingName}
                    value={value}
                />
            );
        }

        return (
            <React.Fragment>
                {popoverComponent}
                {trainingByDay?.map(({_id, name}) => (
                    <div key={_id} className={!isFullScreen ? styles.mobileCell : ''}>
                        {isFullScreen && <TrainingBadge training={name}/>}
                    </div>
                ))}
            </React.Fragment>
        );
    }

    return (
        <Calendar
            fullscreen={isFullScreen}
            locale={calendarLocale}
            onSelect={onSelect}
            dateCellRender={dateCellRender}
            className={styles.trainingCalendar}
            onPanelChange={handlePanelChange}
            disabledDate={(date) => isFullScreen && !date.isSame(selectedMonth, 'month')}
        />
    )
}
