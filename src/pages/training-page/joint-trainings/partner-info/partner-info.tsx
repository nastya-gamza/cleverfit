import {UserOutlined} from '@ant-design/icons';
import {TrainingBadge} from '@components/training-badge';
import {UserJointTrainingList} from '@redux/types/invite.ts';
import {Avatar, Typography} from 'antd';

import styles from './partner-info.module.less';

type PartnerInfoProps = {
    partner: UserJointTrainingList;
};

export const PartnerInfo = ({partner}: PartnerInfoProps) => (
    <div className={styles.container}>
        <div className={styles.partnerInfo}>
            <Avatar
                size={42}
                src={partner.imageSrc}
                icon={<UserOutlined/>}
                className={styles.partnerAvatar}
            />
            <div className={styles.partnerName}>
                <Typography.Text>{partner.name}</Typography.Text>
            </div>
        </div>
        <TrainingBadge training={partner.trainingType}/>
    </div>
)

