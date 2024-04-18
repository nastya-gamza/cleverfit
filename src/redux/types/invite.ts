import {UserTraining} from '@redux/types/training.ts';
import {Nullable} from '@typings/nullable.ts';

export type UserJointTrainingList = {
    id: string;
    name: Nullable<string>;
    trainingType: string;
    imageSrc: Nullable<string>;
    avgWeightInWeek: number;
    status: Nullable<string>;
    inviteId: Nullable<string>;
};

export type Invitation = {
    _id: string;
    from: {
        _id: string;
        firstName: Nullable<string>;
        lastName: Nullable<string>;
        imageSrc: Nullable<string>;
    };
    training: UserTraining;
    status: string;
    createdAt: string;
};

export type CreateInvitationRequest = {
    to: string;
    trainingId: string;
};

export type ResponseToInvitationRequest = {
    id: string;
    status: string;
};
