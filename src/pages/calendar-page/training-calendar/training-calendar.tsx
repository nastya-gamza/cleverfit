import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import moment, {Moment} from 'moment/moment';
import {Calendar, Grid, Modal} from 'antd';
import {
    useGetTrainingListQuery,
    useGetUserTrainingsQuery
} from '@redux/api/training-api.ts';
import {setDate} from '@redux/slices/training-slice.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {calendarLocale} from '@utils/calendar-options.ts';
import {PATHS} from '@constants/paths.ts';
import {error} from '@pages/calendar-page/modals/notification-modal/error-notification-modal.tsx';
import {TrainingPopover} from '@pages/calendar-page/popover/training-popover.tsx';
import {ExercisesPopover} from '@pages/calendar-page/popover/exercises-popover.tsx';
import {TrainingBadge} from '@pages/calendar-page/training-badge/training-badge.tsx';
import styles from './training-calendar.module.less';

const {useBreakpoint} = Grid;

export const TrainingCalendar = () => {
    const [isFullScreen, setIsFullScreen] = useState(true);
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

    useEffect(() => {
        if (isError) {
            navigate('/');
            return;
        }
    }, [isError, navigate]);

    useEffect(() => {
        Modal.destroyAll();
        if (isGetTrainingListError && !isError) {
            error(
                <>При открытии данных <br/> произошла ошибка</>,
                'Попробуйте еще раз.',
                'Обновить',
                refetch
            );
        }
    }, [isGetTrainingListError, isError, refetch]);

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
                    <div key={_id} className={!isFullScreen && styles.mobileCell}>
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
