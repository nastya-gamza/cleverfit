import Moment from 'moment';
import {extendMoment} from 'moment-range';

const moment = extendMoment(Moment);

export const getLastDaysRange = (range: number) => (
    moment.range(moment().subtract(range, 'days'), moment())
);
