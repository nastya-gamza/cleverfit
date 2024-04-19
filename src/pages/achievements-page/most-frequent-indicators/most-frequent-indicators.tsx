import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {selectAchievements} from '@redux/slices/achievements-slice.ts';
import {UserTraining} from '@redux/types/training.ts';
import {countExerciseNames} from '@utils/achievements/count-exercise-names.ts';
import {countTrainingNames} from '@utils/achievements/count-training-names.ts';
import {findMostFrequentTraining} from '@utils/achievements/find-most-frequent-training.ts';
import {Space, Typography} from 'antd';

import styles from './most-frequent-indicators.module.less';

const {Text, Title} = Typography;

type MostFrequentIndicatorsProps = {
    allTrainings: UserTraining[],
}

export const MostFrequentIndicators = ({allTrainings}: MostFrequentIndicatorsProps) => {
    const {key: selectedTag} = useAppSelector(selectAchievements);

    const mostFrequentTrainingName = findMostFrequentTraining(countTrainingNames(allTrainings));
    const mostFrequentExercise = findMostFrequentTraining(countExerciseNames(allTrainings));

    return (
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
    )
};
