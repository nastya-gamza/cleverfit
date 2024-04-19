import React, {useEffect, useState} from 'react';
import {Column, Pie} from '@ant-design/plots';
import {ACHIEVEMENTS} from '@constants/achievements.ts';
import {AchievementStatisticsCards} from '@pages/achievements-page/achievement-statistics-card';
import {AverageLoadList} from '@pages/achievements-page/average-load-list';
import {getColumnChartConfig, getPieChartConfig,} from '@pages/achievements-page/chart-configs';
import {useAchievements,} from '@pages/achievements-page/hooks/use-achievements.ts';
import {MostFrequentExercisesList} from '@pages/achievements-page/most-frequent-exercises-list/';
import {MostFrequentIndicators} from '@pages/achievements-page/most-frequent-indicators';
import {NotFoundTrainings} from '@pages/achievements-page/not-found-trainings';
import {TrainingFilter} from '@pages/achievements-page/training-filter/training-filter.tsx';
import {Card, Grid} from 'antd';
import classNames from 'classnames';

import styles from './achievements.module.less';

type AchievementsProps = {
    achievementType: ACHIEVEMENTS;
}

const {useBreakpoint} = Grid;

export const Achievements = ({achievementType}: AchievementsProps) => {
    const {
        averageLoadByDate,
        averageLoadByDayOfWeek,
        averageLoadByWeek,
        allTrainingsInRange,
        exercisesPercentage,
        isAchievementTabWeek,
        notFoundSelectedTraining,
        sortedMostFrequentExercises
    } = useAchievements(achievementType);

    const screens = useBreakpoint();
    const [isFullScreen, setIsFullScreen] = useState(true);

    const columnConfig = getColumnChartConfig(achievementType, isFullScreen);
    const pieConfig = getPieChartConfig(isFullScreen);

    useEffect(() => {
        if (!screens.sm) {
            setIsFullScreen(false);
        } else {
            setIsFullScreen(true)
        }
    }, [screens.sm]);

    if (!notFoundSelectedTraining) {
        return (<NotFoundTrainings/>)
    }

    return (
        <React.Fragment>
            <TrainingFilter/>

            <div className={classNames(
                styles.trainingLoad,
                {[styles.trainingLoadMonth]: !isAchievementTabWeek})
            }>
                <Card className={
                    classNames(styles.chartWrapperColumn, {[styles.chartWrapperMonth]: !isAchievementTabWeek})}>
                    <Column data={averageLoadByDate} {...columnConfig} />
                </Card>
                <AverageLoadList
                    type={achievementType}
                    averageLoadByDayOfWeek={averageLoadByDayOfWeek}
                    averageLoadByWeek={averageLoadByWeek}
                />
            </div>

            <AchievementStatisticsCards
                allTrainings={allTrainingsInRange}
                isAchievementTabWeek={isAchievementTabWeek}
            />

            <MostFrequentIndicators allTrainings={allTrainingsInRange}/>

            <div className={styles.trainingLoad}>
                <div className={styles.chartWrapperPie}>
                    <Pie data={exercisesPercentage} {...pieConfig} />
                </div>
                <MostFrequentExercisesList
                    type={achievementType}
                    exercises={sortedMostFrequentExercises}
                />
            </div>
        </React.Fragment>
    );
}
