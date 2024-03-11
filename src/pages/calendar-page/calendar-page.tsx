import {useEffect, useState} from 'react';
import moment from 'moment';
import {useLocation, useNavigate} from 'react-router-dom';
import {Calendar} from 'antd';
import {useGetTrainingListQuery, useGetUserTrainingsQuery} from '@redux/api/training-api.ts';
import {error} from '@pages/calendar-page/modals/notification-modal/error-notification-modal.tsx';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {calendarLocale} from '@utils/calendar-options.ts';
import {PATHS} from '@constants/paths.ts';
import 'moment/locale/ru';
import { Moment } from 'moment';
import {CellPopover} from '@pages/calendar-page/cell-popover/cell-popover.tsx';

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
    const [addNewWorkout, setAddNewWorkout] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Moment | string>('');
    const [isLeft, setIsLeft] = useState(true);

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

    const onSelect = (date: Moment) => {
        setSelectedDate(date);
        setAddNewWorkout(true);

        const selectedDay = moment(date).format('dddd');

        if (selectedDay === 'Sunday') {
            setIsLeft(false);
            return;
        }

        setIsLeft(true);
    }

    const dateCellRender = (value: Moment) => {
        if (value.isSame(selectedDate, 'day') && addNewWorkout) {
            return (
                <div onClick={() => setAddNewWorkout(true)}>
                    <CellPopover
                        isLeft={isLeft}
                        addNewWorkout={addNewWorkout}
                        setAddNewWorkout={setAddNewWorkout}
                        value={value} />
                </div>
            );
        }
    };

    return (
        <>
            <Calendar
                locale={calendarLocale}
                onSelect={onSelect}
                dateCellRender={dateCellRender}
            />
        </>

    )
}
