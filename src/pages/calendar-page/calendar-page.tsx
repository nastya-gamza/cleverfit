import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {error} from '@components/error-notification-modal';
import {TrainingCalendar} from '@pages/calendar-page/training-calendar/training-calendar.tsx';
import {useGetTrainingListQuery, useGetUserTrainingsQuery} from '@redux/api/training-api.ts';
import {selectIsError} from '@redux/slices/app-slice.ts';
import {Modal} from 'antd';
import moment from 'moment';

import 'moment/locale/ru';

moment.updateLocale('ru', {
    week: {
        dow: 1
    },
    weekdays : [
        'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'
    ]
});

export const CalendarPage = () => {
    const navigate = useNavigate();
    const isError = useAppSelector(selectIsError);
    const {isSuccess: isGetUserTrainingsSuccess,} = useGetUserTrainingsQuery();
    const {isError: isGetTrainingListError, refetch: refetchTrainingList} = useGetTrainingListQuery();

    useEffect(() => {
        if (isError) {
            navigate('/');
        }
    }, [isError, navigate]);

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (isGetUserTrainingsSuccess && isGetTrainingListError) {
            error(
                <span>При открытии данных <br/> произошла ошибка</span>,
                'Попробуйте еще раз.',
                'Обновить',
                refetchTrainingList,
                'modal-error-user-training-button',
            );

            return () => Modal.destroyAll();
        }
    }, [isGetTrainingListError, isGetUserTrainingsSuccess, refetchTrainingList]);

    return (
        <TrainingCalendar/>
    )
};
