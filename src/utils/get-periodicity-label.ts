import {periodicityOptions} from '@constants/periodicity-options.ts';
import {Nullable} from '@typings/nullable.ts';

export const getPeriodicityLabel = (period: Nullable<number> | undefined) => {
    const option = periodicityOptions.find(({value}) => value === period);

    return option ? option.label : '';
}
