import {DDDD} from '@constants/date-formates.ts';
import {ExerciseCounter} from '@typings/exercises-counter.ts';
import moment from 'moment';

function groupExerciseByWeekDay(exercisesCounters: ExerciseCounter[]) {
    const groupedExercisesByWeekDay: Record<string, ExerciseCounter[]> = {};

    exercisesCounters.forEach(ex => {
        const weekDay = moment(ex.date).format('dddd');

        if (!groupedExercisesByWeekDay[weekDay]) {
            groupedExercisesByWeekDay[weekDay] = []
        }
        groupedExercisesByWeekDay[weekDay].push(ex)
    })

    return groupedExercisesByWeekDay;
}

function countGroupedExercisesAmount(exCounters: ExerciseCounter[]) {
    const groupedExerciseCounter: Record<string, number> = {};

    exCounters?.map(exCounter => groupedExerciseCounter[exCounter.exerciseName] =
            (groupedExerciseCounter[exCounter.exerciseName] || 0) + exCounter.count)

    return groupedExerciseCounter;
}

function getMostFrequentExercise(day: string, groupedExerciseCounter: Record<string, number>) {
    const dayMostFrequentExercise: { day: string, exercise: string, count: number } = {
        day,
        exercise: '',
        count: 0
    }

    Object.entries(groupedExerciseCounter).forEach(([exercise, amount]) => {
        if (dayMostFrequentExercise.count < amount) {
            dayMostFrequentExercise.exercise = exercise
            dayMostFrequentExercise.count = amount
        }
    })

    return dayMostFrequentExercise
}

export const getMostFrequentExercisesByDay = (exercisesCounters: ExerciseCounter[]) => {
    const groupedExercisesByWeekDay = groupExerciseByWeekDay(exercisesCounters);

    return [...Array(7).keys()].map(i => {
        const day = moment().weekday(i).format(DDDD);
        const groupedExerciseCounter = countGroupedExercisesAmount(groupedExercisesByWeekDay[day]);

        return getMostFrequentExercise(day, groupedExerciseCounter);
    })
};

