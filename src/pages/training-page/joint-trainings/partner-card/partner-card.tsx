import {UserOutlined} from '@ant-design/icons';
import {HighlightWords} from '@components/highlight-words/highlight-words.tsx';
import {Avatar, Button, Typography} from 'antd';

import styles from './partner-card.module.less';

export type PartnerCardProps = {
    name: string | null,
    searchValue: string,
    imageSrc: string | null,
    trainingType: string,
    avgWeightInWeek: number,
}

export const PartnerCard = ({name, searchValue, imageSrc, trainingType, avgWeightInWeek}: PartnerCardProps) => {
    const [firstName, surname] = name?.split(' ') ?? [];

    return (
        <div className={styles.card}>
            <div className={styles.partnerInfo}>
                <Avatar size={42} src={imageSrc} icon={<UserOutlined/>} className={styles.avatar}/>
                <div className={styles.partnerName}>
                    <Typography.Text><HighlightWords text={firstName} className={styles.highlight} searchWords={searchValue} /></Typography.Text>
                    <Typography.Text><HighlightWords text={surname} className={styles.highlight} searchWords={searchValue} /></Typography.Text>
                </div>
            </div>
            <div className={styles.trainingInfoWrapper}>
                <div className={styles.trainingInfo}>
                    <Typography.Text type='secondary'>Тип тренировки:</Typography.Text>
                    <Typography.Text className={styles.trainingData}>{trainingType}</Typography.Text>
                </div>
                <div className={styles.trainingInfo}>
                    <Typography.Text type='secondary'>Средняя нагрузка:</Typography.Text>
                    <Typography.Text className={styles.trainingData}>{avgWeightInWeek} кг/нед</Typography.Text>
                </div>
            </div>
            <Button type='primary' block={true}>Создать тренировку</Button>
        </div>
    )
}
