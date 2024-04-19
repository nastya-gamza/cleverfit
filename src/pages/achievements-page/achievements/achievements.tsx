import React from 'react';
import {Column, Pie} from '@ant-design/plots';
import {ACHIEVEMENTS} from '@constants/achievements.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {AchievementStatisticsCards} from '@pages/achievements-page/achievement-statistics-card';
import styles from '@pages/achievements-page/achievements-page.module.less';
import {AverageLoadList} from '@pages/achievements-page/average-load-list';
import {columnChartConfig, pieChartConfig} from '@pages/achievements-page/chart-configs';
import {
    MostFrequentExercisesList
} from '@pages/achievements-page/most-frequent-exercises-list/most-frequent-exercises-list.tsx';
import {MostFrequentIndicators} from '@pages/achievements-page/most-frequent-indicators';
import {NotFoundTrainings} from '@pages/achievements-page/not-found-trainings';
import {TrainingFilter} from '@pages/achievements-page/training-filter/training-filter.tsx';
import {selectAchievements} from '@redux/slices/achievements-slice.ts';
import {selectTrainingData} from '@redux/slices/training-slice.ts';
import {calculateAverageLoadByDay} from '@utils/achievements/calculate-average-load-by-day.ts';
import {calculateExercisePercentages} from '@utils/achievements/calculate-exercise-percentages.ts';
import {countExercisesByDay} from '@utils/achievements/count-exercises-by-day.ts';
import {getAllDaysInRange} from '@utils/achievements/get-all-last-days-in-range.ts';
import {getFilteredTrainingsByName} from '@utils/achievements/get-filtered-trainings-by-name.ts';
import {
    getLastDaysRange,
    getLastDaysRangeFromMonday
} from '@utils/achievements/get-last-days-range.ts';
import {
    getMostFrequentExercisesByDay
} from '@utils/achievements/get-most-frequent-exercises-by-day.ts';
import {groupTrainingsByWeek} from '@utils/achievements/group-trainings-by-week.ts';
import {isTrainingNameExists} from '@utils/achievements/is-training-name-exists.ts';
import {sortByDate} from '@utils/achievements/sort-by-date.ts';
import {sortByDayOfWeek} from '@utils/achievements/sort-by-day-of-week.ts';
import {sortByDayOfWeek2} from '@utils/achievements/sort-by-day-of-week2.ts';
import {Card} from 'antd';
import {DateRange} from 'moment-range';

type AchievementsProps = {
    achievementType: ACHIEVEMENTS;
}

export const Achievements = ({achievementType}: AchievementsProps) => {
    const isAchievementTabWeek = achievementType === ACHIEVEMENTS.week;

    const {userTraining} = useAppSelector(selectTrainingData);
    const {key: selectedTag, value: selectedTrainingName} = useAppSelector(selectAchievements);

    let lastWeekDaysRange: DateRange;

    if (isAchievementTabWeek) {
        lastWeekDaysRange = getLastDaysRange(6)
    } else {
        lastWeekDaysRange = getLastDaysRangeFromMonday(28)
    }

    const allDaysInRange = getAllDaysInRange(lastWeekDaysRange);

    const filteredTrainingsByName = getFilteredTrainingsByName(allDaysInRange, userTraining, selectedTrainingName);

    const allTrainingsInRange = filteredTrainingsByName.map(i => i.trainings).flatMap(t => t);

    const sortedDataByDate = sortByDate(filteredTrainingsByName);

    const averageLoadByDate = calculateAverageLoadByDay(sortedDataByDate);

    const sortedDataByDayOfWeek = sortByDayOfWeek(filteredTrainingsByName);
    const averageLoadByDayOfWeek = calculateAverageLoadByDay(sortedDataByDayOfWeek);

    const averageLoadByWeek = groupTrainingsByWeek(filteredTrainingsByName).map(d => calculateAverageLoadByDay(d));

    const numberOfExercisesPerDay = countExercisesByDay(filteredTrainingsByName);

    const mostFrequentExercisesCount = getMostFrequentExercisesByDay(numberOfExercisesPerDay);

    const sortedMostFrequentExercises = sortByDayOfWeek2(mostFrequentExercisesCount);

    const exercisesPercentage = calculateExercisePercentages(mostFrequentExercisesCount);

    const notFoundSelectedTraining = isTrainingNameExists(allTrainingsInRange, selectedTag, selectedTrainingName);

    if (!notFoundSelectedTraining) {
        return (<NotFoundTrainings/>)
    }

    return (
        <React.Fragment>
            <TrainingFilter/>

            <div className={styles.trainingLoad}>
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
