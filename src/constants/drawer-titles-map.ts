import {TrainingMode} from '@redux/types/training.ts';

export const DRAWER_TITLES_MAP: Record<TrainingMode, string> = {
    [TrainingMode.NEW]: 'Добавление упражнений',
    [TrainingMode.EDIT]: 'Редактирование',
    [TrainingMode.JOINT]: 'Совместная тренировка',
};
