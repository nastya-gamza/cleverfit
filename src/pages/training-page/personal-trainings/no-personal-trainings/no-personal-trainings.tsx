import {Button, Typography} from 'antd';

import styles from './no-personal-trainings.module.less';

export type NoPersonalTrainingsProps = {
    openDrawer: () => void;
}

export const NoPersonalTrainings = ({openDrawer}: NoPersonalTrainingsProps) => (
        <div className={styles.wrapper}>
            <Typography.Title level={3}>
                У вас ещё нет созданных треноровок
            </Typography.Title>
            <Button
                type='primary'
                size='large'
                onClick={openDrawer}
                className={styles.btn}
            >
                Создать тренировку
            </Button>
        </div>
    )
