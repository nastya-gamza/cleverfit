import {UserTraining} from '@redux/types/training.ts';
import moment from 'moment';

export const groupTrainingsByWeek = (trainings: Array<{ date: string; trainings: UserTraining[] }>) => {
    const trainingsByDate: Record<string, UserTraining[]> = {};

    trainings.forEach(({ date, trainings }) => {
        trainingsByDate[date] = trainings;
    });

    const weeks = [];
    let currentWeek: Array<{ date: string; trainings: UserTraining[] }> = [];

    Object.entries(trainingsByDate).forEach(([date, trainings]) => {
        currentWeek.push({ date, trainings });

        if (moment(date).isoWeekday() === 7) {
            weeks.push([...currentWeek]);
            currentWeek = [];
        }
    });

    if (currentWeek.length > 0) {
        weeks.push([...currentWeek]);
    }

    return weeks;
};
