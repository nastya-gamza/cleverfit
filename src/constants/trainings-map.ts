import {TrainingItem} from '@redux/types/training.ts';

export const TRAININGS_MAP: Record<TrainingItem['key'], string> = {
    'Ноги': 'тренировок на ноги',
    'Руки': 'тренировок на руки',
    'Силовая': 'силовых тренировок',
    'Спина': 'тренировок на спину',
    'Грудь': 'тренировок на грудь',
};
