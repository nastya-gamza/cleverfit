import {HeartFilled, TrophyFilled, IdcardOutlined} from '@ant-design/icons';
import CalendarIcon from '@public/icons/calendar.svg?react';

export const MENU_ITEMS = [
    { label: 'Календарь', key: 'calendar', icon: <CalendarIcon/>, path: 'calendar' },
    { label: 'Тренировки', key: 'workouts', icon: <HeartFilled />, path: 'workouts' },
    { label: 'Достижения', key: 'achievements', icon: <TrophyFilled />, path: 'achievements' },
    { label: 'Профиль', key: 'profile', icon: <IdcardOutlined />, path: 'profile' },
];
