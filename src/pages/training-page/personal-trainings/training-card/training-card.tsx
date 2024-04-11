import {ArrowLeftOutlined} from '@ant-design/icons';
import {TRAINING_COLORS_MAP} from '@constants/training-colors-map.ts';
import {UserTraining} from '@redux/types/training.ts';
import {Button, Card, Divider, Typography} from 'antd';

import styles from './training-card.module.less';

type TrainingCardProps = {
    selectedTraining: UserTraining;
    openDrawer: () => void;
    closeCard: () => void;
}

export const TrainingCard = ({selectedTraining, openDrawer, closeCard}: TrainingCardProps) => (
    <Card
        className={styles.card}
        actions={[
            <Button
                block={true}
                onClick={openDrawer}
            >
                Добавить упражнения
            </Button>
        ]}
    >
        <div
            className={styles.cardHeader}
            style={{borderBottom: `2px solid ${TRAINING_COLORS_MAP[selectedTraining.name]}`}}
        >
            <ArrowLeftOutlined onClick={closeCard} style={{width: 16}}/>
            <Typography.Text>{selectedTraining.name}</Typography.Text>
        </div>
        <Divider/>
        <div className={styles.cardContent}>
            {selectedTraining?.exercises?.map(({_id, name}) => (
                <Typography.Text key={_id} type='secondary'>
                    {name}
                </Typography.Text>
            ))}
        </div>
    </Card>
)
