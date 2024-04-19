import {Badge, List, Typography} from 'antd';
import {ACHIEVEMENTS} from '@constants/achievements.ts';

import styles from './most-frequent-exercises-list.module.less';

type MostFrequentExercisesListProps = {
    type: ACHIEVEMENTS,
    exercises: { day: string, exercise: string, count: number }[]
}

const {Text} = Typography;

export const MostFrequentExercisesList = ({exercises, type}: MostFrequentExercisesListProps) => {
    const isAchievementTabMonth = type === ACHIEVEMENTS.month;

    return (
        <div className={styles.infoByDays}>
            <Text>Самые частые упражнения по дням недели {isAchievementTabMonth && 'за месяц' }</Text>
            <List
                dataSource={exercises}
                renderItem={(el, i) => (
                    <List.Item>
                        <Badge
                            count={i + 1}
                            text={<Text type='secondary'>{el.day}</Text>}
                        />
                        <Text strong={true}>{el.exercise && `${el.exercise}`}</Text>
                    </List.Item>
                )}
                split={false}
                className={styles.list}
            />
        </div>
    )
}
