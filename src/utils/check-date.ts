import moment, {Moment} from 'moment';

export const isOldDate = (date?: Moment | string) => Boolean(date && moment(date).isBefore(moment()));
