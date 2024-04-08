import React, {useEffect, useState} from 'react';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {error} from '@pages/calendar-page/notification-modal/error-notification-modal.tsx';
import {
    JointTrainingRequestList
} from '@pages/training-page/joint-trainings/joint-training-request-list';
import {PartnerCard} from '@pages/training-page/joint-trainings/partner-card';
import {RandomChoice} from '@pages/training-page/joint-trainings/random-choice';
import {
    useGetUsersAcceptingJointTrainingQuery,
    useLazyGetUserJointTrainingListQuery
} from '@redux/api/invite-api.ts';
import {selectUserJointTrainings} from '@redux/slices/invite-slice.ts';
import {selectTrainingData} from '@redux/slices/training-slice.ts';
import {findMostPopularTraining} from '@utils/get-most-popular-training.ts';
import {Button, Card, List, Space,Typography} from 'antd';
import Meta from 'antd/es/card/Meta';

import styles from './joint-training.module.less';

export const JointTrainings = () => {
    const [getUserJointTrainingList, {isError}] = useLazyGetUserJointTrainingListQuery();
    const {invitationList, acceptedJointTrainingList} = useAppSelector(selectUserJointTrainings);
    const {userTraining} = useAppSelector(selectTrainingData);

    useGetUsersAcceptingJointTrainingQuery();

    const isInvitationListEmpty = invitationList.length === 0;

    const [isOpenJointTrainings, setIsOpenJointTrainings] = useState(false);

    const handleCloseJointTrainings = () => setIsOpenJointTrainings(false);

    const handleOpenRandomTrainings = () => {
        setIsOpenJointTrainings(true);
        getUserJointTrainingList({});
    }

    const handleOpenTrainingsByType = () => {
        const listOfAllTrainings = Object.values(userTraining).flatMap((trainingsArray) => trainingsArray);
        const mostPopularTrainingType = findMostPopularTraining(listOfAllTrainings);

        getUserJointTrainingList({trainingType: mostPopularTrainingType});
        setIsOpenJointTrainings(true);
    }

    useEffect(() => {
        if (isError) {
            error(
                <span>При открытии данных <br/> произошла ошибка</span>,
                'Попробуйте еще раз.',
                'Обновить',
                ()=>getUserJointTrainingList({}),
                'modal-error-user-training-button',
            );
        }
    }, [getUserJointTrainingList, isError]);

    if (isOpenJointTrainings && !isError) {
        return (<RandomChoice back={handleCloseJointTrainings}/>);
    }

    return (
        <React.Fragment>
            {!isInvitationListEmpty && <JointTrainingRequestList/>}
            <Card
                actions={[
                    <Button type='link' onClick={handleOpenRandomTrainings}>
                        Случайный выбор
                    </Button>,
                    <Button type='text' onClick={handleOpenTrainingsByType}>
                        Выбор друга по моим тренировкам
                    </Button>,
                ]}
                className={styles.card}
            >
                <Meta
                    description={
                        <div className={styles.cardHeader}>
                            <Typography.Title level={3}>
                                Хочешь тренироваться с тем, кто разделяет твои цели и темп? <br/>
                                Можешь найти друга для совместных тренировок среди других
                                пользователей.
                            </Typography.Title>
                            <Typography.Text type='secondary'>
                                Можешь воспользоваться случайным выбором или выбрать
                                друга с похожим на твой уровень и вид тренировки,
                                и мы найдем тебе идеального спортивного друга.
                            </Typography.Text>
                        </div>
                    }
                />
            </Card>
            <Space direction='vertical' size={12}>
                <Typography.Title level={4} className={styles.title} style={{fontWeight: 500}}>
                    Мои партнеры по тренировкам
                </Typography.Title>
                {acceptedJointTrainingList.length ? (
                    <div className={styles.cardsContainer}>
                        <List
                            dataSource={acceptedJointTrainingList}
                            renderItem={(partner, i) => (
                                <PartnerCard
                                    partner={partner}
                                    index={i}
                                    isMyPartner={true}
                                />
                            )}
                        />
                    </div>
                ) : (
                    <Typography.Text type='secondary'>
                        У вас пока нет партнёров для совместных тренировок
                    </Typography.Text>
                )}
            </Space>
        </React.Fragment>
    )
}
