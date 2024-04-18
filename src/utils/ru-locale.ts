import {PickerLocale} from 'antd/es/date-picker/generatePicker';
import locale from 'antd/es/date-picker/locale/ru_RU';
// eslint-disable-next-line import/no-extraneous-dependencies
import CalendarLocale from 'rc-picker/lib/locale/ru_RU';

export const ruLocale: PickerLocale = {
    lang: {
        ...locale.lang,
        shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        shortMonths: [
            'Янв',
            'Фев',
            'Мар',
            'Апр',
            'Май',
            'Июн',
            'Июл',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек',
        ],
        ...CalendarLocale,
    },
    timePickerLocale: {
        ...locale.timePickerLocale,
    },
};

