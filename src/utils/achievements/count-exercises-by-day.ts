import {UserTraining} from '@redux/types/training.ts';
import {ExerciseCounter} from '@typings/exercises-counter.ts';

function countExercisesByTrainings(trainings: UserTraining[], exerciseCount: Record<string, number>) {
    trainings.forEach(training => {
        training.exercises.forEach(exercise => {
            const {name} = exercise;

            exerciseCount[name] = (exerciseCount[name] || 0) + 1;
        });
    });
}

export const countExercisesByDay = (allTrainings: Array<{date: string, trainings: UserTraining[]}>): ExerciseCounter[] => (
     allTrainings.flatMap(({date, trainings}) => {
        const exerciseCount: Record<string, number> = {};
        countExercisesByTrainings(trainings, exerciseCount);

        return Object.entries(exerciseCount).map(([exerciseName, count]) => ({date, exerciseName, count}))
    })
);
