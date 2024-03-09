import {PickerLocale} from 'antd/es/date-picker/generatePicker';

export const calendarLocale: PickerLocale = {
    lang: {
        locale: 'ru_RU',
        placeholder: 'Выберите дату',
        rangePlaceholder: ['Начальная дата', 'Конечная дата'],
        today: 'Сегодня',
        now: 'Сейчас',
        backToToday: 'Back to today',
        ok: 'OK',
        clear: 'Clear',
        month: 'Месяц',
        year: 'Год',
        timeSelect: 'Select time',
        dateSelect: 'Select date',
        monthSelect: 'Choose a month',
        yearSelect: 'Choose a year',
        decadeSelect: 'Choose a decade',
        yearFormat: 'YYYY',
        dateFormat: 'D/M/YYYY',
        dayFormat: 'D',
        dateTimeFormat: 'D/M/YYYY HH:mm:ss',
        monthFormat: 'MMMM',
        monthBeforeYear: true,
        previousMonth: 'Previous month (PageUp)',
        nextMonth: 'Next month (PageDown)',
        previousYear: 'Last year (Control + left)',
        nextYear: 'Next year (Control + right)',
        previousDecade: 'Last decade',
        nextDecade: 'Next decade',
        previousCentury: 'Last century',
        nextCentury: 'Next century',
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
        ]
    },
    timePickerLocale: {
        placeholder: 'Select time'
    },
    dateFormat: 'DD-MM-YYYY',
    dateTimeFormat: 'DD-MM-YYYY HH:mm:ss',
    weekFormat: 'wo-YYYY',
    monthFormat: 'MM-YYYY',
}


