import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {error} from '@pages/calendar-page/error-notification-modal/error-notification-modal.tsx';
import {JointTrainings} from '@pages/training-page/joint-trainings';
import {Marathons} from '@pages/training-page/marathon';
import {PersonalTrainings} from '@pages/training-page/personal-trainings/personal-trainings.tsx';
import {useGetInviteListQuery} from '@redux/api/invite-api.ts';
import {useGetTrainingListQuery, useGetUserTrainingsQuery} from '@redux/api/training-api.ts';
import {selectIsError} from '@redux/slices/app-slice.ts';
import {selectUserJointTrainings} from '@redux/slices/invite-slice.ts';
import {Badge, Modal, Tabs} from 'antd';
import classNames from 'classnames';

import styles from './training-page.module.less';

export const TrainingPage = () => {
    const navigate = useNavigate();
    const isError = useAppSelector(selectIsError);
    const {invitationList} = useAppSelector(selectUserJointTrainings);
    const {isSuccess: isGetUserTrainingsSuccess,} = useGetUserTrainingsQuery();
    const {isError: isGetTrainingsError, refetch: refetchTrainings} = useGetTrainingListQuery();

    useGetInviteListQuery();

    const [activeTab, setActiveTab] = useState('');
    const isMarathonsTab = activeTab === 'marathons';
    const handleActiveTab = (tab: string) => setActiveTab(tab);

    const items = [
        {label: 'Мои тренировки', key: 'my-training', children: <PersonalTrainings/>},
        {
            label: <span> Совместные тренировки <Badge count={invitationList.length}/></span>,
            key: 'joint-training',
            children: <JointTrainings/>
        },
        {label: 'Марафоны', key: 'marathons', children: <Marathons/>},
    ];

    useEffect(() => {
        if (isError) {
            navigate('/');
        }
    }, [isError, navigate]);

    useEffect(() => {
        if (isGetUserTrainingsSuccess && isGetTrainingsError) {
            error(
                <span>При открытии данных <br/> произошла ошибка</span>,
                'Попробуйте еще раз.',
                'Обновить',
                refetchTrainings,
                'modal-error-user-training-button',
            );

            return () => Modal.destroyAll();
        }
    }, [isGetTrainingsError, isGetUserTrainingsSuccess, refetchTrainings]);

    return (
        <div className={classNames(styles.contentWrapper, {[styles.marathonsBg]: isMarathonsTab})}>
            <Tabs
                size='small'
                items={items}
                onChange={handleActiveTab}
                className={styles.tabs}
            />
        </div>
    )
}
