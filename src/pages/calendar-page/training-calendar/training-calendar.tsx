import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {YYYYMMDD} from '@constants/date-formates.ts';
import {PATHS} from '@constants/paths.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {CalendarCell} from '@pages/calendar-page/calendar-cell';
import {ExercisesPopover, TrainingPopover} from '@pages/calendar-page/popover';
import {useGetUserTrainingsQuery} from '@redux/api/training-api.ts';
import {selectTrainingData, setDate} from '@redux/slices/training-slice.ts';
import {ruLocale} from '@utils/ru-locale.ts';
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

    }, [location.state, navigate]);

    const onSelect = (date: Moment) => {
        setAddNewWorkout(true);
        setCreateWorkout(false);

        dispatch(setDate(date.toISOString()))

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
            <CalendarCell
                value={value}
                onSelect={onSelect}
                isFullScreen={isFullScreen}
                popoverComponent={popoverComponent}
                trainingByDay={trainingByDay}
            />
        );
    }

    return (
        <Calendar
            fullscreen={isFullScreen}
            locale={ruLocale}
            onSelect={onSelect}
            dateFullCellRender={dateCellRender}
            className={styles.trainingCalendar}
        />
    )
}
