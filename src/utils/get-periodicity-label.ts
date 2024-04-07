import {periodicityOptions} from '@constants/periodicity-options.ts';

export const getPeriodicityLabel = (period: number | null | undefined) => {
    const option = periodicityOptions.find(({value}) => value === period);

    return option ? option.label : '';
}
