import {UserTraining} from '@redux/types/training.ts';
import {getTotalLoad} from '@utils/get-most-popular-training.ts';

export const getTrainingInfoCards = (daysNumber: number) => [
    {
        value: 'Общая нагрузка, кг',
        func: (trainings: UserTraining[]) => {
            let totalLoad = 0;

            trainings.forEach(training => {
                totalLoad += getTotalLoad(training);
            });

            return totalLoad;
        }
    },
    {
        value: 'Нагрузка в день, кг',
        func: (trainings: UserTraining[]) => {
            let totalLoad = 0;

            trainings.forEach(training => {
                totalLoad += getTotalLoad(training);
            });

            return totalLoad > 0
                ? (totalLoad / daysNumber).toFixed(1).replace('.', ',')
                : (totalLoad / daysNumber);
        }
    },
    {
        value: 'Количество повторений, раз',
        func: (trainings: UserTraining[]) => {
            let totalReplays = 0;

            trainings.forEach((training) => {
                if (training && training.exercises) {
                    const exercises = training.exercises.flatMap((exercise) => exercise?.replays || []);

                    totalReplays += exercises.length > 0 ? exercises.reduce((total, current) => total + current) : 0;
                }
            });

            return totalReplays;
        }
    },
    {
        value: 'Подходы, раз',
        func: (trainings: UserTraining[]) => {
            let totalApproaches = 0;

            trainings.forEach((training) => {
                if (training && training.exercises) {
                    const exercises = training.exercises.flatMap((exercise) => exercise?.approaches || []);

                    totalApproaches += exercises.length > 0 ? exercises.reduce((total, current) => total + current) : 0;
                }
            });

            return totalApproaches;
        }
    }
];
