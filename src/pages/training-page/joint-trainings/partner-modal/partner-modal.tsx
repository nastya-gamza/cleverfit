import {CheckCircleFilled, UserOutlined} from '@ant-design/icons';
import {Statuses, STATUSES_MAP} from '@constants/statuses.ts';
import {UserJointTrainingList} from '@redux/types/invite.ts';
import {Nullable} from '@typings/nullable.ts';
import {Avatar, Button, Modal, Typography} from 'antd';

import styles from './partner-modal.module.less';

type PartnerModalProps = {
    open: boolean
    onClose: () => void;
    partner: UserJointTrainingList;
    onClick: (inviteId: Nullable<string>) => void;
}

export const PartnerModal = ({open, onClose, partner, onClick}: PartnerModalProps) => (
    <Modal
        open={open}
        onCancel={onClose}
        closable={true}
        centered={true}
        maskStyle={{
            background: 'rgba(121, 156, 212, 0.5)',
            backdropFilter: 'blur(6px)'
        }}
        className={styles.modal}
        footer={null}
        data-test-id='partner-modal'
    >
        <div className={styles.content}>
            <div className={styles.partnerInfo}>
                <Avatar
                    size={42}
                    src={partner?.imageSrc}
                    icon={<UserOutlined/>}
                    className={styles.avatar}
                />
                <Typography.Text className={styles.fullName}>{partner?.name}</Typography.Text>
            </div>
            <div className={styles.trainingInfoWrapper}>
                <div className={styles.trainingInfo}>
                    <Typography.Text type='secondary'>Тип тренировки:</Typography.Text>
                    <Typography.Text
                        className={styles.trainingData}>{partner?.trainingType}</Typography.Text>
                </div>
                <div className={styles.trainingInfo}>
                    <Typography.Text type='secondary'>Средняя нагрузка:</Typography.Text>
                    <Typography.Text
                        className={styles.trainingData}>{partner?.avgWeightInWeek} кг/нед</Typography.Text>
                </div>
            </div>
            <Typography.Text className={styles.status}>
                {STATUSES_MAP[partner?.status as keyof typeof Statuses]}
                <CheckCircleFilled style={{color: '#52C41A'}}/>
            </Typography.Text>
            <Button
                size='large'
                block={true}
                onClick={() => onClick(partner?.inviteId)}
            >
                Отменить тренировку
            </Button>
        </div>
    </Modal>
)
