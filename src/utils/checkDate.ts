import {Moment} from 'moment/moment';
import moment from 'moment';
export const isOldDate = (date?: Moment | string) => Boolean(date && moment(date).isBefore(moment()));
