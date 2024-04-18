import {UserTraining} from '@redux/types/training.ts';

export const countExerciseNames = (allTrainings: UserTraining[]) => (
    allTrainings.reduce((acc, training) => {
        training.exercises.forEach(exercise => {
            const {name} = exercise;

            acc[name] = (acc[name] || 0) + 1;
        });

        return acc;
    }, {} as { [key: string]: number })
);
