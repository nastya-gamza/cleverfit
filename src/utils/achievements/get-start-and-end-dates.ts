import moment from 'moment';
import {DDMM} from '@constants/date-formates.ts';

export const getStartAndEndDates = (data: Array< {date: string, value: number}[]>) => {
    return data.map(array => {
        const startDate: string = array[0].date;
        const endDate: string = array[array.length - 1].date;

        return `${'Неделя'} ${moment(startDate).format(DDMM)} - ${moment(endDate).format(DDMM)}`;
    });
}
