import {getTrainingInfoCards} from '@utils/achievements/get-training-info-cards.ts';
import {Card, List, Typography} from 'antd';
import {UserTraining} from '@redux/types/training.ts';

import styles from './achievements-statistics-cards.module.less';

const {Text, Title} = Typography;

type AchievementsStatisticsCardProps = {
    allTrainings: UserTraining[],
    isAchievementTabWeek: boolean,
}

export const AchievementStatisticsCards = ({allTrainings, isAchievementTabWeek}: AchievementsStatisticsCardProps) => {
    const daysNumber = isAchievementTabWeek ? 7 : 28;

    return (
        <List
            dataSource={getTrainingInfoCards(daysNumber)}
            renderItem={(el) => (
                <List.Item>
                    <Card className={styles.statisticsCard}>
                        <Title level={3}>{el.func(allTrainings)}</Title>
                        <Text type='secondary'>{el.value}</Text>
                    </Card>
                </List.Item>
            )}
            split={false}
            className={styles.trainingInfoList}
        />
    )
}
