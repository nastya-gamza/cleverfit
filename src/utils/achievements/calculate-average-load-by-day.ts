import {DDDD, DDMM} from '@constants/date-formates.ts';
import {UserTraining} from '@redux/types/training.ts';
import {getTotalLoad} from '@utils/get-most-popular-training.ts';
import moment from 'moment';

type UserData = {
    date: string,
    trainings: UserTraining[],
}

export const calculateAverageLoadByDay = (data: UserData[], isByDayOfWeek = false) => (
    data.map(({date, trainings}) => {
        const exercises = trainings.flatMap(training => training.exercises);

        let totalLoad = 0;

        trainings.forEach(training => {
            totalLoad += getTotalLoad(training);
        });

        const averageLoad = exercises.length === 0 ? 0 : (totalLoad / exercises.length);

        return isByDayOfWeek
            ? {day: moment(date).format(DDDD), value: Math.round(averageLoad) || ''}
            : {date: moment(date).format(DDMM), value: averageLoad};
    })
);
