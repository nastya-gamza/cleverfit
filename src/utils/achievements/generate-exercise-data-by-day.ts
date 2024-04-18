import {DDDD} from '@constants/date-formates.ts';
import moment from 'moment';

export const generateExerciseDataByDay = (data:  Array<{date: string; exercise: string; }>) => (
    data.map(({date, exercise}) => ({day: moment(date).format(DDDD), value: exercise}))
);
