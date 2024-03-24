import {HeartFilled, IdcardOutlined} from '@ant-design/icons';
import {PATHS} from '@constants/paths.ts';
import CalendarIcon from '@public/icons/calendar.svg?react';

export const ACTIONS = [
    {
        name: 'Тренировки',
        icon: <HeartFilled/>,
        path: PATHS.workouts,
        action: 'Расписать тренировки',
        dataTestId: 'menu-button-workouts'
    },
    {
        name: 'Календарь',
        icon: <CalendarIcon/>,
        path: PATHS.calendar,
        action: 'Назначить календарь',
        dataTestId: 'menu-button-calendar'
},
    {
        name: 'Профиль',
        icon: <IdcardOutlined/>,
        path: PATHS.profile,
        action: 'Заполнить профиль',
        dataTestId: 'menu-button-profile'
    },
];
