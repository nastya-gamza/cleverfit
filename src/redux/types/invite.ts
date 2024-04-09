import {UserTraining} from '@redux/types/training.ts';

export type UserJointTrainingList = {
    id: string;
    name: string | null;
    trainingType: string;
    imageSrc: string | null;
    avgWeightInWeek: number;
    status: string | null;
    inviteId: string | null;
};

export type Invitation = {
    _id: string;
    from: {
        _id: string;
        firstName: string | null;
        lastName: string | null;
        imageSrc: string | null;
    };
    training: UserTraining;
    status: string;
    createdAt: string;
};

export type CreateInvitationRequest = {
    to: string;
    trainingId: string;
}

export type ResponseToInvitationRequest = {
    id: string;
    status: string;
}
