import {UserOutlined} from '@ant-design/icons';
import {HighlightWords} from '@components/highlight-words/highlight-words.tsx';
import {useAppDispatch} from '@hooks/typed-react-redux-hooks.ts';
import {setIsOpenTrainingDrawer, setTrainingMode} from '@redux/slices/training-slice.ts';
import {UserJointTrainingList} from '@redux/types/invite.ts';
import {TrainingMode} from '@redux/types/training.ts';
import {Avatar, Button, Typography} from 'antd';

import styles from './partner-card.module.less';
import {setPartnerInfo} from '@redux/slices/invite-slice.ts';

export type PartnerCardProps = {
    partner: UserJointTrainingList;
    searchValue: string,
}

export const PartnerCard = ({
                                partner,
                                searchValue,
                            }: PartnerCardProps) => {
    const dispatch = useAppDispatch();

    const handleCreateTraining = () => {
        dispatch(setIsOpenTrainingDrawer(true));
        dispatch(setTrainingMode(TrainingMode.JOINT));
        dispatch(setPartnerInfo(partner))
    }

    return (
        <div className={styles.card}>
            <div className={styles.partnerInfo}>
                <Avatar size={42} src={partner.imageSrc} icon={<UserOutlined/>}/>
                <div className={styles.partnerName}>
                    <Typography.Text>
                        <HighlightWords
                            searchWords={searchValue}
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
            <Button
                onClick={handleCreateTraining}
                type='primary'
                block={true}
            >
                Создать тренировку
            </Button>
        </div>
    )
}
