import {TrainingItem} from '@redux/types/training.ts';

export const TRAINING_COLORS_MAP: Record<TrainingItem['key'], string> = {
    'Ноги': 'rgb(255, 77, 79)',
    'Руки': 'rgb(19, 194, 194)',
    'Силовая': 'rgb(250, 219, 20)',
    'Спина': 'rgb(250, 140, 22)',
    'Грудь': 'rgb(82, 196, 26)',
};
