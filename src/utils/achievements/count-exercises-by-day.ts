import {UserTraining} from '@redux/types/training.ts';

export const countExercisesByDay = (allTrainings: Array<{date: string, trainings: UserTraining[]}>) => (
    allTrainings.map(({date, trainings}) => {
        const exerciseCount: Record<string, number> = {};

        trainings.forEach(training => {
            training.exercises.forEach(exercise => {
                const { name } = exercise;

                exerciseCount[name] = (exerciseCount[name] || 0) + 1;
            });
        });

        return {date, exerciseCount};
    })
);
