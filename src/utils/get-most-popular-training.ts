import {store} from '@redux/store.ts';
import {UserTraining} from '@redux/types/training.ts';

const getTotalLoad = (training: UserTraining): number => (
    training.exercises.reduce((total, {approaches, weight, replays}) => (
        total + ((approaches ?? 0) * (weight ?? 0) * (replays ?? 0))
    ), 0)
)

export const findMostPopularTraining = (trainings: UserTraining[]) => {
    const {trainingList} = store.getState().training;

    let maxLoad = 0;
    let mostPopularTraining = '';

    trainings.forEach(training => {
        const totalLoad = getTotalLoad(training);

        if (totalLoad > maxLoad) {
            maxLoad = totalLoad;
            mostPopularTraining = training.name;
        }
    });

    return trainingList?.find(type => type.name === mostPopularTraining)?.key;
}
