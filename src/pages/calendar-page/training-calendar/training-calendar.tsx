import {Calendar, Grid, Modal} from 'antd';
import {calendarLocale} from '@utils/calendar-options.ts';
import moment, {Moment} from 'moment/moment';
import {useGetTrainingListQuery, useGetUserTrainingsQuery} from '@redux/api/training-api.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {useEffect, useLayoutEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {PATHS} from '@constants/paths.ts';
import {error} from '@pages/calendar-page/modals/notification-modal/error-notification-modal.tsx';
import {TrainingPopover} from '@pages/calendar-page/popover/training-popover.tsx';
import {ExercisesPopover} from '@pages/calendar-page/popover/exercises-popover.tsx';
import {setDate} from '@redux/slices/training-slice.ts';
import {TrainingBadge} from '@pages/calendar-page/training-badge/training-badge.tsx';
import styles from './training-calendar.module.less';

const {useBreakpoint} = Grid;

export const TrainingCalendar = () => {
    const {data} = useGetUserTrainingsQuery();
    const {isError: isGetTrainingListError, refetch} = useGetTrainingListQuery();
    const isError = useAppSelector(state => state.app.isError);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [addNewWorkout, setAddNewWorkout] = useState(false);
    const [createWorkout, setCreateWorkout] = useState(false);
    const [editingTrainingName, setEditingTrainingName] = useState<string | undefined>(undefined);
    const [isLeft, setIsLeft] = useState(true);
    const selectedDate = useAppSelector(state => state.training.date);
    const [selectedMonth, setSelectedMonth] = useState<Moment>(moment());

    const location = useLocation();
    const screens = useBreakpoint();

    const isFullScreen = screens.md;

    useEffect(() => {
        const state = location.state;

        if (state?.from !== 'redirect') {
            navigate(PATHS.main);
        }

    }, [location.state, navigate]);

    useEffect(() => {
        if (isError) {
            navigate('/');
            return;
        }
    }, [isError, navigate]);

    useLayoutEffect(() => {
        Modal.destroyAll();
        if (isGetTrainingListError && !isError) {
            error(refetch);
        }
    }, [isGetTrainingListError]);

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
        const dateString = value.format('YYYY-MM-DD');
        const trainingByDay = data && data[dateString];

        if (value.isSame(selectedDate, 'day') && addNewWorkout) {
            return (
                !createWorkout ? (
                    <TrainingPopover
                        isLeft={isLeft}
                        addNewWorkout={addNewWorkout}
                        setAddNewWorkout={setAddNewWorkout}
                        setCreateWorkout={setCreateWorkout}
                        setEditingTrainingName={setEditingTrainingName}
                        value={value}
                    />
                ) : (
                    <ExercisesPopover
                        createWorkout={createWorkout}
                        isLeft={isLeft}
                        setCreateWorkout={setCreateWorkout}
                        editingTrainingName={editingTrainingName}
                        setEditingTrainingName={setEditingTrainingName}
                    />
                )
            );
        }

        return (
            <>
                {trainingByDay && isFullScreen && trainingByDay.map(e => <TrainingBadge key={e._id} training={e.name}/>)}
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
