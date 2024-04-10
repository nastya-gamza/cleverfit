import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {PATHS} from '@constants/paths.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {error} from '@pages/calendar-page/notification-modal/error-notification-modal.tsx';
import {
    JointTrainingRequestList
} from '@pages/training-page/joint-trainings/joint-training-request-list';
import {PartnerCardList} from '@pages/training-page/joint-trainings/partner-card-list';
import {PartnerModal} from '@pages/training-page/joint-trainings/partner-modal';
import {RandomChoice} from '@pages/training-page/joint-trainings/random-choice';
import {
    useCancelJointTrainingMutation,
    useGetUsersAcceptingJointTrainingQuery,
    useLazyGetUserJointTrainingListQuery
} from '@redux/api/invite-api.ts';
import {selectUserJointTrainings} from '@redux/slices/invite-slice.ts';
import {selectTrainingData} from '@redux/slices/training-slice.ts';
import {UserJointTrainingList} from '@redux/types/invite.ts';
import {findMostPopularTraining} from '@utils/get-most-popular-training.ts';
import {Button, Card, Space, Typography} from 'antd';
import Meta from 'antd/es/card/Meta';

import styles from './joint-training.module.less';

export const JointTrainings = () => {
    const [getUserJointTrainingList, {isError: isErrorGetJointTrainingList}] = useLazyGetUserJointTrainingListQuery();
    const {invitationList, acceptedJointTrainingList} = useAppSelector(selectUserJointTrainings);
    const {userTraining} = useAppSelector(selectTrainingData);
    const navigate = useNavigate();

    useGetUsersAcceptingJointTrainingQuery();

    const [cancelJointTraining, {isError: isErrorCancelJointTraining}] = useCancelJointTrainingMutation();

    const isInvitationListEmpty = invitationList.length === 0;

    const [showMyPartners, setShowMyPartners] = useState(false);
    const [isOpenJointTrainings, setIsOpenJointTrainings] = useState(false);
    const [showPartnerModal, setShowPartnerModal] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState<UserJointTrainingList>({} as UserJointTrainingList);

    const handleCloseJointTrainings = () => setIsOpenJointTrainings(false);

    const handleOpenRandomTrainings = () => {
        setIsOpenJointTrainings(true);
        getUserJointTrainingList({});
    }

    const handleShowPartnerModal = () => {
        setShowPartnerModal(true);
    };

    const handleHidePartnerModal = () => setShowPartnerModal(false);

    const onCancelJointTraining = (inviteId: string | null) => {
        cancelJointTraining({inviteId});
        handleCloseJointTrainings();
        handleHidePartnerModal();
    };

    useEffect(() => {
        if (isErrorCancelJointTraining) {
            error(
                'При сохранении данных произошла ошибка',
                'Придётся попробовать ещё раз',
                'Закрыть',
                () => navigate(PATHS.training, {state: {from: 'redirect'}}),
                'modal-error-user-training-button',
                true,
            );
        }
    }, [isErrorCancelJointTraining, navigate]);

    useEffect(() => {
        if (isErrorGetJointTrainingList) {
            error(
                <span>При открытии данных <br/> произошла ошибка</span>,
                'Попробуйте еще раз.',
                'Обновить',
                () => getUserJointTrainingList({}),
                'modal-error-user-training-button',
            );
        }
    }, [getUserJointTrainingList, isErrorGetJointTrainingList]);

    const handleOpenTrainingsByType = () => {
        const listOfAllTrainings = Object.values(userTraining).flatMap((trainingsArray) => trainingsArray);
        const mostPopularTrainingType = findMostPopularTraining(listOfAllTrainings);

        getUserJointTrainingList({trainingType: mostPopularTrainingType});
        setIsOpenJointTrainings(true);
    }

    const PartnerListAndModal = () => (
        <React.Fragment>
            {acceptedJointTrainingList.length ? (
                <PartnerCardList
                    acceptedJointTrainingList={acceptedJointTrainingList}
                    setSelectedPartner={setSelectedPartner}
                    handleShowPartnerModal={handleShowPartnerModal}
                />
            ) : (
                <Typography.Text type='secondary'>
                    У вас пока нет партнёров для совместных тренировок
                </Typography.Text>
            )}
            <PartnerModal
                open={showPartnerModal}
                onClose={handleHidePartnerModal}
                partner={selectedPartner}
                onClick={onCancelJointTraining}
            />
        </React.Fragment>
    );

    if (isOpenJointTrainings && !isErrorGetJointTrainingList) {
        return (<RandomChoice back={handleCloseJointTrainings}/>);
    }

    if (showMyPartners) {
        return <PartnerListAndModal/>
    }

    return (
        <React.Fragment>
            {!isInvitationListEmpty &&
                <JointTrainingRequestList showMyPartners={setShowMyPartners}/>}
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
                <PartnerListAndModal/>
            </Space>
        </React.Fragment>
    )
}
