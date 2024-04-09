import React, {Dispatch, SetStateAction} from 'react';
import {
    CheckCircleFilled,
    InfoCircleOutlined,
    UserOutlined
} from '@ant-design/icons';
import {HighlightWords} from '@components/highlight-words/highlight-words.tsx';
import {Statuses, STATUSES_MAP} from '@constants/statuses.ts';
import {useAppDispatch} from '@hooks/typed-react-redux-hooks.ts';
import {useCancelJointTrainingMutation} from '@redux/api/invite-api.ts';
import {setPartnerInfo} from '@redux/slices/invite-slice.ts';
import {
    setCreatedTraining,
    setIsOpenTrainingDrawer,
    setTrainingMode
} from '@redux/slices/training-slice.ts';
import {UserJointTrainingList} from '@redux/types/invite.ts';
import {TrainingMode} from '@redux/types/training.ts';
import {Avatar, Button, Card, Tooltip, Typography} from 'antd';
import classNames from 'classnames';

import styles from './partner-card.module.less';

export type PartnerCardProps = {
    partner: UserJointTrainingList;
    index: number;
    searchValue?: string;
    isMyPartner?: boolean;
    onClick?: () => void;
    selectedPartner?: Dispatch<SetStateAction<UserJointTrainingList>>
}

export const PartnerCard = ({
                                partner,
                                index,
                                searchValue,
                                isMyPartner,
                                onClick,
                                selectedPartner,
                            }: PartnerCardProps) => {
    const isPending = partner?.status === Statuses.pending;
    const isAccepted = partner?.status === Statuses.accepted;
    const isRejected = partner?.status === Statuses.rejected;

    const [cancelJointTraining] = useCancelJointTrainingMutation();

    const dispatch = useAppDispatch();

    const onCancelJointTraining = (inviteId: string | null) => {
        cancelJointTraining({inviteId});
    };

    const handleClickPartner = (partner: UserJointTrainingList) => {
        if (onClick) onClick();
        if (selectedPartner) selectedPartner(partner);
    }

    const handleCreateTraining = () => {
        dispatch(setIsOpenTrainingDrawer(true));
        dispatch(setTrainingMode(TrainingMode.JOINT));
        dispatch(setPartnerInfo(partner));
        dispatch(setCreatedTraining({
                parameters: {
                    period: null,
                    repeat: false,
                    jointTraining: true,
                    participants: [],
                },
            }),
        );
    }

    return (
        <Card
            hoverable={isMyPartner}
            bordered={isMyPartner}
            onClick={()=>handleClickPartner(partner)}
            data-test-id={`joint-training-cards${index}`}
            className={classNames(styles.card, {[styles.myPartnerCard]: isMyPartner})}
        >
            <div className={styles.partnerInfo}>
                <Avatar size={42} src={partner.imageSrc} icon={<UserOutlined/>}/>
                <div className={styles.partnerName}>
                    <Typography.Text>
                        <HighlightWords
                            searchWords={searchValue ?? ''}
                            text={partner.name ?? 'Пользователь'}
                            className={styles.highlight}
                        />
                    </Typography.Text>
                </div>
            </div>
            <div className={styles.trainingInfoWrapper}>
                <div className={styles.trainingInfo}>
                    <Typography.Text type='secondary'>Тип тренировки:</Typography.Text>
                    <Typography.Text
                        className={styles.trainingData}>{partner.trainingType}</Typography.Text>
                </div>
                <div className={styles.trainingInfo}>
                    <Typography.Text type='secondary'>Средняя нагрузка:</Typography.Text>
                    <Typography.Text
                        className={styles.trainingData}>{partner.avgWeightInWeek} кг/нед</Typography.Text>
                </div>
            </div>
            {
                !isMyPartner
                &&
                (
                    <React.Fragment>
                        {partner.status === null ? (
                            <Button
                                block={true}
                                type='primary'
                                onClick={handleCreateTraining}
                            >
                                Создать тренировку
                            </Button>
                        ) : (
                            <Button
                                block={true}
                                type={isAccepted ? 'default' : 'primary'}
                                onClick={() => onCancelJointTraining(partner.inviteId)}
                                disabled={isRejected || isPending}
                            >
                                {isAccepted
                                    ? 'Отменить тренировку'
                                    : 'Создать тренировку'}
                            </Button>
                        )}
                        {partner.status && (
                            <div className={styles.partnerStatus}>
                                {STATUSES_MAP[partner.status as keyof typeof Statuses]}
                                {isRejected && (
                                    <Tooltip
                                        placement='topRight'
                                        overlayStyle={{width: '150px'}}
                                        title='повторный запрос будет доступнен через 2 недели'
                                    >
                                        <InfoCircleOutlined/>
                                    </Tooltip>
                                )}
                                {isAccepted && (
                                    <CheckCircleFilled style={{color: '#52C41A'}}/>
                                )}
                            </div>
                        )}
                    </React.Fragment>
                )
            }
        </Card>
    )
}
