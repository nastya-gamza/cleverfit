import {ACHIEVEMENTS} from '@constants/achievements.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {selectTrainingData} from '@redux/slices/training-slice.ts';
import {selectAchievements} from '@redux/slices/achievements-slice.ts';
import {DateRange} from 'moment-range';
import {
    getLastDaysRange,
    getLastDaysRangeFromMonday,
    getAllDaysInRange,
    getFilteredTrainingsByName,
    sortByDate,
    calculateAverageLoadByDay,
    sortByDayOfWeek,
    groupTrainingsByWeek,
    countExercisesByDay,
    getMostFrequentExercisesByDay,
    sortByDayOfWeek2,
    calculateExercisePercentages,
    isTrainingNameExists,
} from '@utils/achievements';

export const useAchievements = (achievementType: string) => {
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

    return {
        notFoundSelectedTraining,
        averageLoadByDate,
        averageLoadByDayOfWeek,
        averageLoadByWeek,
        allTrainingsInRange,
        isAchievementTabWeek,
        exercisesPercentage,
        sortedMostFrequentExercises
    }
}
