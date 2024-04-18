import Moment from 'moment';
import moment from 'moment';
import {extendMoment} from 'moment-range';

const momentRange = extendMoment(Moment);

export const getLastDaysRange = (range: number) => (
    momentRange.range(moment().subtract(range, 'days'), moment())
);

export const getLastDaysRangeFromMonday = (range: number) => {
    let end = moment();
    let start = moment().subtract(range, 'days');

    if (end.isoWeekday() !== 7) {
        const diffDays = 7 - end.isoWeekday();

        end = end.add(diffDays, 'days');
    }

    if (start.isoWeekday() !== 1) {
        const diffDays = 8 - start.isoWeekday();

        start = start.add(diffDays, 'days');
    }

    return momentRange.range(start, end);
};
