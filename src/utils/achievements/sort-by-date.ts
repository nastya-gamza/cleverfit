import {UserTraining} from '@redux/types/training.ts';
import moment from 'moment';

type UserData = {
    date: string,
    trainings: UserTraining[],
}

export const sortByDate = (trainings: UserData[]) => (
    [...trainings].sort((a, b) => moment(a.date).diff(moment(b.date)))
)
