import React from 'react';
import {Column, Pie} from '@ant-design/plots';
import {DDMMYYYY} from '@constants/date-formates.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import styles from '@pages/achievements-page/achievements-page.module.less';
import {columnChartConfig, pieChartConfig} from '@pages/achievements-page/chart-configs';
import {NotFoundTrainings} from '@pages/achievements-page/not-found-trainings';
import {TrainingFilter} from '@pages/achievements-page/training-filter/training-filter.tsx';
import {selectAchievements} from '@redux/slices/achievements-slice.ts';
import {selectTrainingData} from '@redux/slices/training-slice.ts';
import {calculateAverageLoadByDay} from '@utils/achievements/calculate-average-load-by-day.ts';
import {calculateExercisePercentages} from '@utils/achievements/calculate-exercise-percentages.ts';
import {countExerciseNames} from '@utils/achievements/count-exercise-names.ts';
import {countExercisesByDay} from '@utils/achievements/count-exercises-by-day.ts';
import {countTrainingNames} from '@utils/achievements/count-training-names.ts';
import {findMostFrequentTraining} from '@utils/achievements/find-most-frequent-training.ts';
import {getAllDaysInRange} from '@utils/achievements/get-all-last-days-in-range.ts';
import {getFilteredTrainingsByName} from '@utils/achievements/get-filtered-trainings-by-name.ts';
import {getLastDaysRangeFromMonday} from '@utils/achievements/get-last-days-range.ts';
import {
    getMostFrequentExercisesByDay
} from '@utils/achievements/get-most-frequent-exercises-by-day.ts';
import {getTrainingInfoCards} from '@utils/achievements/get-training-info-cards.ts';
import {groupTrainingsByWeek} from '@utils/achievements/group-trainings-by-week.ts';
import {isTrainingNameExists} from '@utils/achievements/is-training-name-exists.ts';
import {sortByDate} from '@utils/achievements/sort-by-date.ts';
import {sortByDayOfWeek2} from '@utils/achievements/sort-by-day-of-week2.ts';
import {Badge, Card, List, Space, Typography} from 'antd';
import classNames from 'classnames';
import moment from 'moment/moment';

const {Text, Title} = Typography;

export const MonthAchievements = () => {
    const {key: selectedTag, value: selectedTrainingName} = useAppSelector(selectAchievements);
    const {userTraining} = useAppSelector(selectTrainingData);

    const lastWeekDaysRange = getLastDaysRangeFromMonday(28);

    const allDaysInRange = getAllDaysInRange(lastWeekDaysRange);

    const filteredTrainingsByName = getFilteredTrainingsByName(allDaysInRange, userTraining, selectedTrainingName);

    const allTrainingsInRange = filteredTrainingsByName.map(i => i.trainings).flatMap(t => t);

    const mostFrequentTrainingName = findMostFrequentTraining(countTrainingNames(allTrainingsInRange));
    const mostFrequentExercise = findMostFrequentTraining(countExerciseNames(allTrainingsInRange));

    const dataByWeeks = groupTrainingsByWeek(filteredTrainingsByName);

    const test = dataByWeeks.map(i => calculateAverageLoadByDay(i));

    const sortedDataByDate = sortByDate(filteredTrainingsByName);

    const averageLoadByDate = calculateAverageLoadByDay(sortedDataByDate);

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
                <div className={styles.infoByDays}>
                    <div>
                        {test.map((columnData, i) => (
                            <div key={i}>
                                <List
                                    dataSource={columnData}
                                    renderItem={(el, i) => (
                                        <List.Item>
                                            <Badge
                                                count={i + 1}
                                                text={<Text type='secondary'>{moment(el.date).format(DDMMYYYY)}</Text>}
                                                className={classNames(styles.badge, {[styles.badgeLight]: !el.value})}
                                            />
                                            <Text strong={true}>{el.value ? `${el.value} кг` : ''}</Text>
                                        </List.Item>
                                    )}
                                    split={false}
                                    className={styles.list}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <List
                dataSource={getTrainingInfoCards(28)}
                renderItem={(el) => (
                    <List.Item>
                        <Card className={styles.statisticsCard}>
                            <Title level={3} className={styles.cardTitle}>
                                {el.func(allTrainingsInRange)}
                            </Title>
                            <Text type='secondary'>{el.value}</Text>
                        </Card>
                    </List.Item>
                )}
                split={false}
                className={styles.trainingInfoList}
            />
            <Space direction='vertical' size={18}>
                {selectedTag === -1
                    && (
                        <div className={styles.row}>
                            <Text type='secondary'>
                                Самая частая <br/> тренировка
                            </Text>
                            <Title level={3}>
                                {mostFrequentTrainingName}
                            </Title>
                        </div>
                    )}
                <div className={styles.row}>
                    <Text type='secondary'>
                        Самое частое <br/> упражнение
                    </Text>
                    <Title level={3}>
                        {mostFrequentExercise}
                    </Title>
                </div>
            </Space>
            <div className={styles.trainingLoad}>
                <div className={styles.chartWrapper}>
                    <Pie data={exercisesPercentage} {...pieChartConfig} />
                </div>
                <div className={styles.infoByDays}>
                    <Text>Самые частые упражнения по дням недели</Text>
                    <List
                        dataSource={sortedMostFrequentExercises}
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
            </div>
        </React.Fragment>
    )
}
