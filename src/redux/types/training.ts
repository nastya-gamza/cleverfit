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
    period: number | null;
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
    replays: number | null;
    weight: number | null;
    approaches: number | null;
    tempId?: string;
    _id?: string;
};

export type UserTraining = UserTrainingData & {
    exercises: Exercise[];
};

export type UserTrainingByDate = Record<string, UserTraining[]>;
