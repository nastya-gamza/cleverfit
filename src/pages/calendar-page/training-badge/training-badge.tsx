import {Badge, Button, Typography} from 'antd';
import {TRAINING_COLORS_MAP} from '@constants/training-colors-map.ts';
import {EditOutlined} from '@ant-design/icons';
import {Dispatch, SetStateAction} from 'react';
import styles from './training-badge.module.less';

type TrainingBadgeProps = {
    training: string,
}

type TrainingBadgeEditProps = {
    name: string,
    index: number,
    type?: string,
    setCreateWorkout?: Dispatch<SetStateAction<boolean>>,
    setEditingTrainingName?: Dispatch<SetStateAction<string | undefined>>,
    onClick: (name?: string) => void,
    _id?: string
}

export const TrainingBadge = ({training}: TrainingBadgeProps) => {
    return (
        <div className={styles.badgeRow}>
            <Badge color={TRAINING_COLORS_MAP[training]} text={training}/>
        </div>
    )
}

export const TrainingBadgeEdit = ({name, type, index, onClick}: TrainingBadgeEditProps) => (
    <div className={styles.editBadge}>
        {
            type
                ?
                <Typography.Text type='secondary'>{name}</Typography.Text>
                :
                <Badge color={TRAINING_COLORS_MAP[name]} text={name}/>
        }
        <Button
            type='link'
            onClick={() => onClick(name)}
            data-test-id={`modal-update-training-edit-button${index}`}
        >
            <EditOutlined/>
        </Button>
    </div>
)
