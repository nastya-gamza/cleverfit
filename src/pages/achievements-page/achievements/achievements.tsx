import React from 'react';
import {Column, Pie} from '@ant-design/plots';
import {ACHIEVEMENTS} from '@constants/achievements.ts';
import {AchievementStatisticsCards} from '@pages/achievements-page/achievement-statistics-card';
import styles from '@pages/achievements-page/achievements-page.module.less';
import {AverageLoadList} from '@pages/achievements-page/average-load-list';
import {columnChartConfig, pieChartConfig} from '@pages/achievements-page/chart-configs';
import {useAchievements,} from '@pages/achievements-page/hooks/useAchievements.ts';
import {MostFrequentExercisesList} from '@pages/achievements-page/most-frequent-exercises-list/';
import {MostFrequentIndicators} from '@pages/achievements-page/most-frequent-indicators';
import {NotFoundTrainings} from '@pages/achievements-page/not-found-trainings';
import {TrainingFilter} from '@pages/achievements-page/training-filter/training-filter.tsx';
import {Card} from 'antd';
import classNames from 'classnames';

type AchievementsProps = {
    achievementType: ACHIEVEMENTS;
}

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
                <Card className={styles.chartWrapper}>
                    <Column data={averageLoadByDate} {...columnChartConfig} />
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
                <div className={styles.chartWrapper}>
                    <Pie data={exercisesPercentage} {...pieChartConfig} />
                </div>
                <MostFrequentExercisesList
                    type={achievementType}
                    exercises={sortedMostFrequentExercises}
                />
            </div>
        </React.Fragment>
    );
}
