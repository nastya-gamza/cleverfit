import {EditOutlined} from '@ant-design/icons';
import {TRAINING_COLORS_MAP} from '@constants/training-colors-map.ts';
import {Badge, Button, Typography} from 'antd';

import styles from './training-badge.module.less';

type TrainingBadgeProps = {
    training: string,
}

type TrainingBadgeEditProps = {
    name: string,
    index: number,
    type?: string,
    onClick: (name?: string) => void,
    isDisabled?: boolean
}

export const TrainingBadge = ({training}: TrainingBadgeProps) => (
    <div className={styles.badgeRow}>
        <Badge color={TRAINING_COLORS_MAP[training]} text={training}/>
    </div>
)

export const TrainingBadgeEdit = ({
                                      name,
                                      type,
                                      index,
                                      onClick,
                                      isDisabled
                                  }: TrainingBadgeEditProps) => (
    <div className={styles.editBadge}>
        {
            type
                ?
                <Typography.Text type='secondary'>{name}</Typography.Text>
                :
                <Badge
                    color={TRAINING_COLORS_MAP[name]}
                    text={
                        isDisabled ?
                            <span className={styles.disabledText}>{name}</span>
                            :
                            <span>{name}</span>}
                />
        }
        <Button
            type='link'
            onClick={() => onClick(name)}
            data-test-id={`modal-update-training-edit-button${index}`}
            disabled={isDisabled}
        >
            <EditOutlined/>
        </Button>
    </div>
)
