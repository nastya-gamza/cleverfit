import {DDMM} from '@constants/date-formates.ts';
import moment from 'moment';

export const getStartAndEndDates = (data: Array<Array<{date: string, value: number}>>) => data.map(array => {
        const startDate: string = array[0].date;
        const endDate: string = array[array.length - 1].date;

        return `Неделя ${moment(startDate).format(DDMM)} - ${moment(endDate).format(DDMM)}`;
    })
