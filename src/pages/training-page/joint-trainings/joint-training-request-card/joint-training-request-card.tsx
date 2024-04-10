import {Dispatch, SetStateAction, useState} from 'react';
import {UserOutlined} from '@ant-design/icons';
import {DDMMYYYY} from '@constants/date-formates.ts';
import {Statuses} from '@constants/statuses.ts';
import {TRAININGS_MAP} from '@constants/trainings-map.ts';
import {
    PartnerTrainingDetailsCard
} from '@pages/training-page/joint-trainings/partner-training-details-card';
import {useResponseToInvitationMutation} from '@redux/api/invite-api.ts';
import {UserTraining} from '@redux/types/training.ts';
import {Avatar, Button, Card, Typography} from 'antd';
import moment from 'moment/moment';

import styles from './joint-training-request-card.module.less';

type JointTrainingRequestCardProps = {
    id: string;
    from: {
        firstName: string | null,
        lastName: string | null,
        imageSrc: string | null,
    },
    training: UserTraining,
    showMyPartners: Dispatch<SetStateAction<boolean>>
}

export const JointTrainingRequestCard = ({
                                             id,
                                             from,
                                             training,
                                             showMyPartners
                                         }: JointTrainingRequestCardProps) => {
    const [openTrainingDetails, setOpenTrainingDetails] = useState(false);
    const formattedDate = moment(training.date).format(DDMMYYYY);
    const [responseToInvitation] = useResponseToInvitationMutation();

    const handleOpenTrainingDetails = () => setOpenTrainingDetails(true);
    const handleCloseTrainingDetails = () => setOpenTrainingDetails(false);

    const handleAcceptTraining = (id: string) => {
        responseToInvitation({id, status: Statuses.accepted});
        showMyPartners(true);
    }

    const handleRejectTraining = (id: string) => {
        responseToInvitation({id, status: Statuses.rejected})
    }

    return (
        <Card bordered={false} className={styles.card}>
            <div className={styles.wrapper}>
                <div className={styles.userInfo}>
                    <Avatar
                        size={42}
                        src={from.imageSrc}
                        icon={<UserOutlined/>}
                        className={styles.avatar}
                    />
                    <div>
                        <Typography.Title level={5}>
                            {from.firstName || 'Пользователь'}
                        </Typography.Title>
                        <Typography.Title level={5}>
                            {from.lastName || ''}
                        </Typography.Title>
                    </div>
                </div>
                <div className={styles.trainingInfo}>
                    <Typography.Text className={styles.date}>{formattedDate}</Typography.Text>
                    <Typography.Title level={5}>
                        Привет, я ищу партнёра для совместных {TRAININGS_MAP[training.name]}.
                        Ты хочешь присоединиться ко мне на следующих тренировках?
                    </Typography.Title>
                    <div className={styles.showDetailsBtn}>
                        <Button
                            type='link'
                            size='small'
                            onClick={handleOpenTrainingDetails}
                        >
                            Посмотреть детали тренировки
                        </Button>
                        {
                            openTrainingDetails && (
                                <PartnerTrainingDetailsCard
                                    date={formattedDate}
                                    trainingName={training.name}
                                    exercises={training.exercises}
                                    period={training.parameters?.period}
                                    close={handleCloseTrainingDetails}
                                />
                            )
                        }
                    </div>
                </div>
                <div className={styles.btnGroup}>
                    <Button
                        type='primary'
                        block={true}
                        size='large'
                        onClick={() => handleAcceptTraining(id)}
                    >
                        Тренироваться вместе
                    </Button>
                    <Button
                        block={true}
                        size='large'
                        onClick={() => handleRejectTraining(id)}
                    >
                        Отклонить запрос
                    </Button>
                </div>
            </div>
        </Card>
    )
}
