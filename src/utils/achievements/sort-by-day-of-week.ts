import moment from 'moment';

type ObjectWithDate = {
    date: string;
}

export const sortByDayOfWeek = <T extends ObjectWithDate>(trainings: T[]) => (
    [...trainings].sort((a, b) => {
        const dayOfWeekA = moment(a.date).isoWeekday();
        const dayOfWeekB = moment(b.date).isoWeekday();

        return dayOfWeekA - dayOfWeekB;
    })
)
