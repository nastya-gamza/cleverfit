import {Dispatch, SetStateAction} from 'react';
import styles from '@pages/training-page/joint-trainings/joint-training.module.less';
import {PartnerCard} from '@pages/training-page/joint-trainings/partner-card';
import {UserJointTrainingList} from '@redux/types/invite.ts';
import {List} from 'antd';

type PartnerCardListProps = {
    acceptedJointTrainingList: UserJointTrainingList[];
    handleShowPartnerModal: () => void;
    setSelectedPartner: Dispatch<SetStateAction<UserJointTrainingList>>;
}

export const PartnerCardList = ({
                                    acceptedJointTrainingList,
                                    handleShowPartnerModal,
                                    setSelectedPartner
                                }: PartnerCardListProps) => {
    return (
        <div className={styles.cardsContainer}>
            <List
                dataSource={acceptedJointTrainingList}
                renderItem={(partner, i) => (
                    <PartnerCard
                        partner={partner}
                        index={i}
                        isMyPartner={true}
                        onClick={handleShowPartnerModal}
                        selectedPartner={setSelectedPartner}
                    />
                )}
            />
        </div>
    )
}
