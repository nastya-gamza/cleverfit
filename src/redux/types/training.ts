import {Nullable} from '@typings/nullable.ts';
import {Moment} from 'moment';

export type TrainingItem = {
    name: string;
    key: string;
}

export enum TrainingMode {
    NEW = 'new',
    EDIT = 'edit',
    JOINT = 'joint',
}

export type Parameters = {
    repeat: boolean;
    period: Nullable<number>;
    jointTraining: boolean;
    participants: string[];
};

export type UserTrainingData = {
    name: string;
    date: string | Moment;
    isImplementation?: boolean;
    parameters?: Parameters;
    _id?: string;
};

export type Exercise = {
    name: string;
    replays: Nullable<number>;
    weight: Nullable<number>;
    approaches: Nullable<number>;
    tempId?: string;
    _id?: string;
};

export type UserTraining = UserTrainingData & {
    exercises: Exercise[];
};

export type UserTrainingByDate = Record<string, UserTraining[]>;
