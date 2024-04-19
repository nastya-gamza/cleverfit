import {ACHIEVEMENTS} from '@constants/achievements.ts';
import {MonthAverageLoadList} from '@pages/achievements-page/average-load-list/month-average-load-list';
import {WeekAverageLoadList} from '@pages/achievements-page/average-load-list/week-average-load-list';

import styles from './average-load-list.module.less';
import classNames from 'classnames';

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
        <div className={classNames(styles.infoByDays, {[styles.infoByDaysMonth]: !isAchievementTabWeek})}>
            {
                isAchievementTabWeek ?
                    <WeekAverageLoadList averageLoadByDayOfWeek={averageLoadByDayOfWeek}/>
                    :
                    <MonthAverageLoadList averageLoadByWeek={averageLoadByWeek}/>
            }
        </div>
    )
}
