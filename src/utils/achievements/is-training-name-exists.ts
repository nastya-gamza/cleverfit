import {UserTraining} from '@redux/types/training.ts';

export const isTrainingNameExists = (allTrainings: UserTraining[], selectedTag: number, selectedTraining: string) => {
    if (allTrainings.length === 0) {
        return false
    }

    if (selectedTag === -1) {
        return true
    }

    return allTrainings.some(training => training.name === selectedTraining);
}
