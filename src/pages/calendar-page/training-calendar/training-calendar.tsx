import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import moment, {Moment} from 'moment/moment';
import {Calendar, Grid} from 'antd';
import {
    useGetUserTrainingsQuery
} from '@redux/api/training-api.ts';
import {selectTrainingData, setDate} from '@redux/slices/training-slice.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {calendarLocale} from '@utils/calendar-options.ts';
import {PATHS} from '@constants/paths.ts';
import {TrainingPopover} from '@pages/calendar-page/popover/training-popover.tsx';
import {ExercisesPopover} from '@pages/calendar-page/popover/exercises-popover.tsx';
import {TrainingBadge} from '@pages/calendar-page/training-badge/training-badge.tsx';
import {YYYYMMDD} from '@constants/date-formates.ts';
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
        const state = location.state;

        if (state?.from !== 'redirect') {
            navigate(PATHS.main);
        }

    }, [location.state, navigate]);

    const onSelect = (date: Moment) => {
        setAddNewWorkout(true);
        setCreateWorkout(false);

        dispatch(setDate(date.toISOString()))

        const selectedDay = moment(date).format('dddd');

        if (selectedDay === 'Sunday') {
            setIsLeft(false);
            return;
        }

        setIsLeft(true);
    }

    const handlePanelChange = (value: Moment) => {
        setSelectedMonth(value);
    };

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
            <>
                {popoverComponent}
                {trainingByDay?.map(({_id, name}) => (
                    <div key={_id} className={!isFullScreen ? styles.mobileCell : ''}>
                        {isFullScreen && <TrainingBadge training={name}/>}
                    </div>
                ))}
            </>
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
