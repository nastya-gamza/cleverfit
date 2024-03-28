import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {PATHS} from '@constants/paths.ts';
import {AddFeedbackModal} from '@pages/feedbacks-page/modals';
import {SettingsForm} from '@pages/settings-page/settings-form';
import {TariffCardList} from '@pages/settings-page/tariff-card-list';
import {useGetTariffListQuery} from '@redux/api/settings-api.ts';
import {Button, Space, Typography} from 'antd';

import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import styles from './settings-page.module.less';
import {selectSuccessModal} from '@redux/slices/settings-slice.ts';
import {SuccessModal} from '@pages/settings-page/success-modal';

export const SettingsPage = () => {
    const navigate = useNavigate();
    const isShowSuccessModal = useAppSelector(selectSuccessModal)
    const [showAddFeedbackModal, setShowAddFeedbackModal] = useState(false);

    useGetTariffListQuery();

    const handleShowAddFeedbackModal = () => {
        setShowAddFeedbackModal(true)
    }

    return (
        <>
            <div className={styles.contentWrapper}>
                <Typography.Title level={4} className={styles.title}>Мой тариф</Typography.Title>
                <Space direction='vertical' size={24}>
                    <TariffCardList/>
                    <SettingsForm/>
                    <div className={styles.btnWrapper}>
                        <Button
                            type='primary'
                            onClick={handleShowAddFeedbackModal}
                            data-test-id='write-review'
                            size='large'
                        >
                            Написать отзыв
                        </Button>
                        <Button
                            type='link'
                            onClick={() => navigate(PATHS.feedbacks)}
                            className={styles.link}
                            data-test-id='see-reviews'
                            size='large'
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
        </>
    )
}
