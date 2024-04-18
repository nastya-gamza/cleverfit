import {UserTraining} from '@redux/types/training.ts';

export const countTrainingNames = (allTrainings: UserTraining[]) => (
    allTrainings.reduce((acc, {name}) => {
        acc[name] = (acc[name] || 0) + 1;

        return acc;
    }, {} as { [key: string]: number })
)
