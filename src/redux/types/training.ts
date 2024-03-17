import {Moment} from 'moment';

export type TrainingItem = {
    name: string,
    key: string
}


export type UserTrainingData = {
    name: string;
    date: string | Moment;
    isImplementation: boolean;
    _id?: string;
};

export type Exercises = {
    name: string;
    replays: number;
    weight: number;
    approaches: number;
};

export type UserTraining = UserTrainingData & {
    exercises: Exercises[];
};

export type UserTrainingTransform = Record<string, UserTraining[]>;
