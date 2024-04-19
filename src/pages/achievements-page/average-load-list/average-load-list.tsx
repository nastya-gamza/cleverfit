import {ACHIEVEMENTS} from '@constants/achievements.ts';
import {MonthAverageLoadList} from '@pages/achievements-page/average-load-list/month-average-load-list';
import {WeekAverageLoadList} from '@pages/achievements-page/average-load-list/week-average-load-list';

import styles from './average-load-list.module.less';

type AverageLoadListProps = {
    type: string,
    averageLoadByDayOfWeek: Array<{ date: string, value: number }>,
    averageLoadByWeek: Array<Array<{ date: string, value: number }>>,
}

export const AverageLoadList = ({
                                    type,
                                    averageLoadByDayOfWeek,
                                    averageLoadByWeek
                                }: AverageLoadListProps) => {
    const isAchievementTabWeek = type === ACHIEVEMENTS.week;

    return (
        <div className={styles.infoByDays}>
            {
                isAchievementTabWeek ?
                    <WeekAverageLoadList averageLoadByDayOfWeek={averageLoadByDayOfWeek}/>
                    :
                    <MonthAverageLoadList averageLoadByWeek={averageLoadByWeek}/>
            }
        </div>
    )
}
