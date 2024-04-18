import {UserTrainingByDate} from '@redux/types/training.ts';

export const getFilteredTrainingsByName = (daysRange: string[], userTraining: UserTrainingByDate, selectedTrainingName: string) => (
    daysRange.map(date => {
        const trainings = userTraining[date] || [];
        const filteredTrainings = selectedTrainingName
            ? trainings.filter(training => training.name === selectedTrainingName)
            : trainings;

        return {date, trainings: filteredTrainings};
    })
)
