import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {selectAchievements, setSelectedTag} from '@redux/slices/achievements-slice.ts';
import {selectTrainingData} from '@redux/slices/training-slice.ts';
import {Tag, Typography} from 'antd';

import styles from './training-filter.module.less';

const {CheckableTag} = Tag;
const {Text} = Typography;

export const TrainingFilter = () => {
    const dispatch = useAppDispatch();

    const {key} = useAppSelector(selectAchievements);
    const {trainingList} = useAppSelector(selectTrainingData);

    const handleTagClick = (key: number) => {
        dispatch(setSelectedTag({key, value: trainingList[key]?.name ?? ''}));
    };

    return (
        <div className={styles.filterWrapper}>
            <Text>Тип тренировки:</Text>
            <div>
                <CheckableTag
                    key="all"
                    checked={key === -1}
                    onClick={() => handleTagClick(-1)}
                    className={styles.filterItem}
                >
                    Все
                </CheckableTag>
                {...trainingList.map(({name}, i) => (
                    <CheckableTag
                        key={name}
                        checked={key === i}
                        onClick={() => handleTagClick(i)}
                        className={styles.filterItem}
                    >
                        {name}
                    </CheckableTag>
                ))
                }
            </div>
        </div>
    )
}
