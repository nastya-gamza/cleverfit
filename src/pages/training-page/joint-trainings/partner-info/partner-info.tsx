import React from 'react';
import {UserOutlined} from '@ant-design/icons';
import {TrainingBadge} from '@pages/calendar-page/training-badge/training-badge.tsx';
import {UserJointTrainingList} from '@redux/types/invite.ts';
import {Avatar, Typography} from 'antd';

import styles from './partner-info.module.less';

type PartnerInfoProps = {
    partner: UserJointTrainingList;
};

export const PartnerInfo = ({partner}: PartnerInfoProps) => {
    const [firstName, lastName] = partner.name?.split(' ') ?? [];

    return (
        <div className={styles.container}>
            <div className={styles.partnerInfo}>
                <Avatar size={42} src={partner.imageSrc} icon={<UserOutlined/>}/>
                <div className={styles.partnerName}>
                    <Typography.Text>{firstName}</Typography.Text>
                    <Typography.Text>{lastName}</Typography.Text>
                </div>
            </div>
            <TrainingBadge training={partner.trainingType}/>
        </div>
    )
}

