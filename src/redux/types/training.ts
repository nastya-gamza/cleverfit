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

export type Exercise = {
    name: string;
    replays: number | null;
    weight: number | null;
    approaches: number | null;
    _id?: string;
};

export type UserTraining = UserTrainingData & {
    exercises: Exercise[];
};

export type UserTrainingTransform = Record<string, UserTraining[]>;
