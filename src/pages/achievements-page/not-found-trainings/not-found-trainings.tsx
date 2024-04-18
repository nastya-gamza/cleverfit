import {TrainingFilter} from '@pages/achievements-page/training-filter/training-filter.tsx';
import NotFoundTrainingsImg from '@public/img/not-found-trainings-img.svg?react';
import {Typography} from 'antd';

import styles from './not-found-trainings.module.less';

export const NotFoundTrainings = () => (
        <div className={styles.wrapper}>
            <TrainingFilter/>
            <div className={styles.content}>
                <NotFoundTrainingsImg/>
                <Typography.Text>Ой, такой тренировки на этой неделе не было.</Typography.Text>
            </div>

        </div>
    )
