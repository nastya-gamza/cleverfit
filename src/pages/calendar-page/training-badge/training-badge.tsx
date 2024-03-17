import {Badge, Button} from 'antd';
import {TRAINING_COLORS_MAP} from '@constants/training-colors-map.ts';
import {UserTraining} from '@redux/types/training.ts';
import {EditOutlined} from '@ant-design/icons';
import styles from './training-badge.module.less';

type TrainingBadgeProps = {
    trainingList: UserTraining[]
}

export const TrainingBadge = ({trainingList}: TrainingBadgeProps) => {
    return (
        trainingList?.map(training => (
            <div key={training._id}>
                <Badge color={TRAINING_COLORS_MAP[training.name]} text={training.name}/>
            </div>
        ))
    )
}

export const TrainingBadgeEdit = ({trainingList}: TrainingBadgeProps) => {
    return (
        <div className={styles.wrapper}>
            {
                trainingList?.map(training => (
                    <div key={training._id} className={styles.editBadge}>
                        <Badge color={TRAINING_COLORS_MAP[training.name]} text={training.name}/>
                        <Button
                            data-test-id=''
                            type='link'
                        >
                            <EditOutlined/>
                        </Button>
                    </div>
                ))
            }
        </div>
    )
}
