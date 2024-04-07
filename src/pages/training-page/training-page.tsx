import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {error} from '@pages/calendar-page/notification-modal/error-notification-modal.tsx';
import {JointTrainings} from '@pages/training-page/joint-trainings';
import {PersonalTrainings} from '@pages/training-page/personal-trainings/personal-trainings.tsx';
import {useGetInviteListQuery} from '@redux/api/invite-api.ts';
import {useGetTrainingListQuery, useGetUserTrainingsQuery} from '@redux/api/training-api.ts';
import {selectIsError} from '@redux/slices/app-slice.ts';
import {selectUserJointTrainings} from '@redux/slices/invite-slice.ts';
import {Badge, Modal, Tabs} from 'antd';

import styles from './training-page.module.less';

export const TrainingPage = () => {
    const navigate = useNavigate();

    const isError = useAppSelector(selectIsError);
    const {invitationList} = useAppSelector(selectUserJointTrainings);

    useGetInviteListQuery();

    const {isSuccess: isGetUserTrainingsSuccess,} = useGetUserTrainingsQuery();
    const {
        isError: isGetTrainingListError,
        refetch: refetchTrainingList
    } = useGetTrainingListQuery();

    useEffect(() => {
        if (isError) {
            navigate('/');
        }
    }, [isError, navigate]);

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (isGetUserTrainingsSuccess && isGetTrainingListError) {
            error(
                <span>При открытии данных <br/> произошла ошибка</span>,
                'Попробуйте еще раз.',
                'Обновить',
                refetchTrainingList,
                'modal-error-user-training-button',
            );

            return () => Modal.destroyAll();
        }
    }, [isGetTrainingListError, isGetUserTrainingsSuccess, refetchTrainingList]);

    const items = [
        {label: 'Мои тренировки', key: 'my-training', children: <PersonalTrainings/>},
        {
            label: <span> Совместные тренировки <Badge count={invitationList.length}/></span>,
            key: 'joint-training',
            children: <JointTrainings/>
        },
        {label: 'Марафоны', key: 'marathons', children: <div>3</div>},
    ];

    return (
        <div className={styles.contentWrapper}>
            <Tabs
                items={items}
                size='small'
                className={styles.tabs}
            />
        </div>
    )
}
