import moment from 'moment';
import {TrainingCalendar} from '@pages/calendar-page/training-calendar/training-calendar.tsx';
import {useGetTrainingListQuery, useGetUserTrainingsQuery} from '@redux/api/training-api.ts';
import {useEffect} from 'react';
import {error} from '@pages/calendar-page/notification-modal/error-notification-modal.tsx';
import {Modal} from 'antd';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {selectIsError} from '@redux/slices/app-slice.ts';
import {useNavigate} from 'react-router-dom';

export const CalendarPage = () => {
    moment.updateLocale('ru', {
        week: {
            dow: 1
        }
    });

    const navigate = useNavigate();
    const isError = useAppSelector(selectIsError);
    const {isSuccess: isGetUserTrainingsSuccess,} = useGetUserTrainingsQuery();
    const {isError: isGetTrainingListError, refetch: refetchTrainingList} = useGetTrainingListQuery();

    useEffect(() => {
        if (isError) {
            navigate('/');
            return;
        }
    }, [isError, navigate]);

    useEffect(() => {
        if (isGetUserTrainingsSuccess && isGetTrainingListError) {
            error(
                <>При открытии данных <br/> произошла ошибка</>,
                'Попробуйте еще раз.',
                'Обновить',
                refetchTrainingList
            );

            return () => Modal.destroyAll();
        }
    }, [isGetTrainingListError, isGetUserTrainingsSuccess, refetchTrainingList]);

    return (
        <TrainingCalendar/>
    )
};
