import React, {useEffect} from 'react';
import {error} from '@pages/calendar-page/notification-modal/error-notification-modal.tsx';
import {RandomChoice} from '@pages/training-page/joint-trainings/random-choice';
import {useGetUserJointTrainingListQuery} from '@redux/api/invite-api.ts';
import {Button, Card, Typography} from 'antd';
import Meta from 'antd/es/card/Meta';

import styles from './joint-training.module.less';

export const JointTrainings = () => {
    const {
        data: jointTrainingList = [],
        isError,
        refetch: refetchJointTrainingList
    } = useGetUserJointTrainingListQuery();

    useEffect(() => {
        if (isError) {
            error(
                <span>При открытии данных <br/> произошла ошибка</span>,
                'Попробуйте еще раз.',
                'Обновить',
                refetchJointTrainingList,
                'modal-error-user-training-button',
            );
        }
    }, [isError, refetchJointTrainingList]);

    const isDataEmpty = jointTrainingList.length === 0;

    return (
        <React.Fragment>
            {
                isDataEmpty ?
                    <div>
                        <Card
                            actions={[
                                <Button
                                    type='link'
                                >
                                    Случайный выбор
                                </Button>,
                                <Button
                                    type='text'
                                >
                                    Выбор друга по моим тренировкам
                                </Button>,
                            ]}
                            className={styles.card}
                        >
                            <Meta
                                description={
                                    <div className={styles.cardHeader}>
                                        <Typography.Title level={3}>
                                            Хочешь тренироваться с тем, кто разделяет твои цели и
                                            темп? <br/>
                                            Можешь найти друга для совместных тренировок среди
                                            других
                                            пользователей.
                                        </Typography.Title>
                                        <Typography.Text type='secondary'>
                                            Можешь воспользоваться случайным выбором или выбрать
                                            друга с похожим
                                            на
                                            твой уровень и вид тренировки,
                                            и мы найдем тебе идеального спортивного друга.
                                        </Typography.Text>
                                    </div>
                                }
                            />
                        </Card>
                        <div>
                            <Typography.Title level={4} style={{fontWeight: 500}}>
                                Мои партнеры по тренировкам
                            </Typography.Title>

                            <Typography.Text type='secondary'>
                                У вас пока нет партнёров для совместных тренировок
                            </Typography.Text>
                        </div>
                    </div>
                    :
                    <RandomChoice/>
            }
        </React.Fragment>
    )
}
