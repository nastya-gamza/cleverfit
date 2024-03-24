export type UserCredentials = {
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    imgSrc: string;
    readyForJointTraining: boolean;
    sendNotification: false;
}

export type UserTariff = {
    tariff: {
        tariffId: string;
        expired: string;
    }
}

export type ProfileInfo = UserCredentials & UserTariff;
