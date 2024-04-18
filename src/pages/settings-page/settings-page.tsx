import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {PATHS} from '@constants/paths.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {AddFeedbackModal} from '@pages/feedbacks-page/modals';
import {SettingsForm} from '@pages/settings-page/settings-form';
import {SuccessModal} from '@pages/settings-page/success-modal';
import {TariffCardList} from '@pages/settings-page/tariff-card-list';
import {useGetTariffListQuery} from '@redux/api/settings-api.ts';
import {selectSuccessModal} from '@redux/slices/settings-slice.ts';
import {Button, Space, Typography} from 'antd';

import styles from './settings-page.module.less';

export const SettingsPage = () => {
    const navigate = useNavigate();
    const isShowSuccessModal = useAppSelector(selectSuccessModal)
    const [showAddFeedbackModal, setShowAddFeedbackModal] = useState(false);

    useGetTariffListQuery();

    const handleShowAddFeedbackModal = () => {
        setShowAddFeedbackModal(true)
    }

    const handleNavigate = () => {
        navigate(PATHS.feedbacks)
    }

    return (
        <React.Fragment>
            <div className={styles.contentWrapper}>
                <Typography.Title level={4} className={styles.title}>Мой тариф</Typography.Title>
                <Space direction='vertical' size={24}>
                    <TariffCardList/>
                    <SettingsForm/>
                    <div className={styles.btnWrapper}>
                        <Button
                            type='primary'
                            onClick={handleShowAddFeedbackModal}
                            size='large'
                            data-test-id='write-review'
                        >
                            Написать отзыв
                        </Button>
                        <Button
                            type='link'
                            size='large'
                            onClick={handleNavigate}
                            data-test-id='see-reviews'
                        >
                            Смотреть все отзывы
                        </Button>
                    </div>
                </Space>
            </div>
            <AddFeedbackModal
                showFeedbackModal={showAddFeedbackModal}
                setShowFeedbackModal={setShowAddFeedbackModal}
            />
            <SuccessModal open={isShowSuccessModal}/>
        </React.Fragment>
    )
}
