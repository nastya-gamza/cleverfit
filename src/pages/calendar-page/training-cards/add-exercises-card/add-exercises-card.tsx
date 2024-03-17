import {Button, Card, Divider, Select} from 'antd';
import {Dispatch, SetStateAction} from 'react';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {setTraining} from '@redux/slices/training-slice.ts';
import {useCreateTrainingMutation} from '@redux/api/training-api.ts';
import {EmptyCart} from '@pages/calendar-page/empty-cart/empty-cart.tsx';
import styles from './add-exercises-card.module.less';
import moment from 'moment';

type AddExercisesCardProps = {
    isLeft: boolean,
    setCreateWorkout: Dispatch<SetStateAction<boolean>>,
    setOpenDrawer: Dispatch<SetStateAction<boolean>>,
}

export const AddExercisesCard = ({
                                     isLeft,
                                     setCreateWorkout,
                                     setOpenDrawer
                                 }: AddExercisesCardProps) => {
    const trainingList = useAppSelector(state => state.training.trainingList);
    const selectedTraining = useAppSelector(state => state.training.training);
    const selectedDate = useAppSelector(state => state.training.date);

    const dispatch = useAppDispatch();

    const handleChange = (value: string) => {
        const selectedTraining = trainingList.find(training => training.key === value);
        if (selectedTraining) {
            const trainingName = selectedTraining.name;
            dispatch(setTraining(trainingName));
        }
    };

    const training = useAppSelector(state => state.training.training);
    const exercises = useAppSelector(state => state.training.createdTraining);
    const userTraining = useAppSelector(state => state.training.userTraining);

    const isSaveDisable = exercises.exercises.some(i => i.name !== '');

    const [createTraining] = useCreateTrainingMutation();

    //TODO
    const test = moment(selectedDate).format('YYYY-MM-DD');
    const test2 = userTraining[test];
    const namesToRemove = test2?.map(exercise => exercise.name);
    const filteredExercises = trainingList?.map(({key, name}) => ({value: key, label: name}))?.filter(exercise => !namesToRemove?.includes(exercise.label));
    console.log(filteredExercises);

    const onSaveTraining = () => {
        const body = {
            name: selectedTraining,
            date: selectedDate,
            isImplementation: false,
            exercises: exercises.exercises,
        };
        createTraining(body);
    };

    // const options = trainingList
        // .filter(i => i.name !== selectedTraining)
        // .map(({key, name}) => ({value: key, label: name}));

    return (
        <div data-test-id='modal-create-exercise'
             className={isLeft ? styles.cardWrapper : styles.cardWrapper2}
             onClick={e => e.stopPropagation()}>
            <Card
                className={styles.card}
                actions={[
                    <>
                        <Button
                            disabled={!training}
                            size='middle'
                            type='ghost'
                            block
                            onClick={() => setOpenDrawer(true)}
                        >
                            Добавить упражнения
                        </Button>
                        <Button
                            onClick={onSaveTraining}
                            size='middle'
                            type='link'
                            disabled={!isSaveDisable}
                        >
                            Сохранить
                        </Button>
                    </>
                ]}
            >
                <div className={styles.cardSelect}>
                    <ArrowLeftOutlined
                        onClick={() => setCreateWorkout(false)}
                        style={{width: 16}}
                        data-test-id='modal-exercise-training-button-close'
                    />
                    <Select
                        defaultValue='Выбор типа тренировки'
                        bordered={false}
                        style={{width: '100%'}}
                        options={filteredExercises}
                        onChange={handleChange}
                        data-test-id='modal-create-exercise-select'
                    />
                </div>
                <Divider/>
                <div>
                    <EmptyCart/>
                </div>
            </Card>
        </div>
    )
}
