import moment from 'moment';
import {TrainingCalendar} from '@pages/calendar-page/training-calendar/training-calendar.tsx';

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
