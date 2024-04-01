import {HeartFilled, IdcardOutlined,TrophyFilled} from '@ant-design/icons';
import {PATHS} from '@constants/paths.ts';
import CalendarIcon from '@public/icons/calendar.svg?react';

export const MENU_ITEMS = [
    { label: 'Календарь', key: 'calendar', icon: <CalendarIcon/>, path: PATHS.calendar },
    { label: 'Тренировки', key: 'workouts', icon: <HeartFilled />, path: PATHS.training },
    { label: 'Достижения', key: 'achievements', icon: <TrophyFilled />, path: PATHS.achievements },
    { label: 'Профиль', key: 'profile', icon: <IdcardOutlined />, path: PATHS.profile },

];
