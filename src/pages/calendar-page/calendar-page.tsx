import {useEffect, useState} from 'react';
import moment from 'moment';
import {useLocation, useNavigate} from 'react-router-dom';
import { Calendar } from 'antd';
import {useGetTrainingListQuery, useGetUserTrainingsQuery} from '@redux/api/training-api.ts';
import {error} from '@pages/calendar-page/modals/error-notification-modal.tsx';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {calendarLocale} from '@utils/calendar-options.ts';
import {PATHS} from '@constants/paths.ts';
import 'moment/locale/ru';

moment.locale('ru', {
    week: {
        dow: 1
    },
});

export const CalendarPage = () => {
    useGetUserTrainingsQuery();
    const {isError: isGetTrainingListError, refetch} = useGetTrainingListQuery();
    const isError = useAppSelector(state => state.app.isError);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
    const navigate = useNavigate();

    const location = useLocation();

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

        if (isGetTrainingListError && !isErrorModalOpen) {
            setIsErrorModalOpen(true);
            error(refetch)
        }
    }, [isError, navigate, isGetTrainingListError]);

    return (
        <>
            <Calendar locale={calendarLocale} />
        </>

    )
}
