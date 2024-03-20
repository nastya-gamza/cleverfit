import {HeartFilled, TrophyFilled, IdcardOutlined} from '@ant-design/icons';
import CalendarIcon from '@public/icons/calendar.svg?react';
import {PATHS} from '@constants/paths.ts';

export const MENU_ITEMS = [
    { label: 'Календарь', key: 'calendar', icon: <CalendarIcon/>, path: PATHS.calendar },
    { label: 'Тренировки', key: 'workouts', icon: <HeartFilled />, path: PATHS.workouts },
    { label: 'Достижения', key: 'achievements', icon: <TrophyFilled />, path: PATHS.achievements },
    { label: 'Профиль', key: 'profile', icon: <IdcardOutlined />, path: PATHS.profile },

];
