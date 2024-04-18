import moment from 'moment';

type ObjectWithDate = {
    day: string;
}

export const sortByDayOfWeek2 = <T extends ObjectWithDate>(trainings: T[]) => (
    [...trainings].sort((a, b) => {
        const dayOfWeekA = moment().day(a.day).day();
        const dayOfWeekB = moment().day(b.day).day();

        return (dayOfWeekA === 0 ? 7 : dayOfWeekA) - (dayOfWeekB === 0 ? 7 : dayOfWeekB);
    })
)
