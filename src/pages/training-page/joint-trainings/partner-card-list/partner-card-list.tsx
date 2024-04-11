import {Dispatch, SetStateAction} from 'react';
import {PartnerCard} from '@pages/training-page/joint-trainings/partner-card';
import {UserJointTrainingList} from '@redux/types/invite.ts';
import {List} from 'antd';

import styles from './partner-card-list.module.less';

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
                        index={i}
                        partner={partner}
                        isMyPartner={true}
                        onClick={handleShowPartnerModal}
                        selectedPartner={setSelectedPartner}
                    />
                )}
            />
        </div>
    )
}
