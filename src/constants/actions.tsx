import {HeartFilled, IdcardOutlined} from "@ant-design/icons";
import CalendarIcon from '@public/icons/calendar.svg?react';

export const ACTIONS = [
    {
        name: 'Тренировки',
        icon: <HeartFilled/>,
        path: 'workouts',
        action: 'Расписать тренировки'
    },
    {
        name: 'Календарь',
        icon: <CalendarIcon/>,
        path: 'calendar',
        action: 'Назначить календарь'
    },
    {
        name: 'Профиль',
        icon: <IdcardOutlined/>,
        path: 'profile',
        action: 'Заполнить профиль'
    },
];
