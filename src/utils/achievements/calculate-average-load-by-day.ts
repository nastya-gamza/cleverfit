import {UserTraining} from '@redux/types/training.ts';
import {getTotalLoad} from '@utils/get-most-popular-training.ts';

type UserData = {
    date: string,
    trainings: UserTraining[],
}

export const calculateAverageLoadByDay = (data: UserData[]) => (
    data.map(({date, trainings}) => {
        const exercises = trainings.flatMap(training => training.exercises);

        let totalLoad = 0;

        trainings.forEach(training => {
            totalLoad += getTotalLoad(training);
        });

        const averageLoad = exercises.length === 0 ? 0 : (totalLoad / exercises.length);

        return {date, value: Math.round(averageLoad)};
    })
);

