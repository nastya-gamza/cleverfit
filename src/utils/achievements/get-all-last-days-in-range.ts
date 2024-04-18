import {YYYYMMDD} from '@constants/date-formates.ts';
import {DateRange} from 'moment-range';

export const getAllDaysInRange = (range: DateRange) => Array.from(range.by('days'), day => day.format(YYYYMMDD))
