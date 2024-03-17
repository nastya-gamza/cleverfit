import {TrainingCalendar} from '@pages/calendar-page/training-calendar/training-calendar.tsx';
import moment from 'moment';

export const CalendarPage = () => {
    moment.updateLocale('ru', {
        week: {
            dow: 1
        }
    });
    return (
        <TrainingCalendar/>
    )
};
