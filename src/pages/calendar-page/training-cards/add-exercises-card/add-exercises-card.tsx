import {Dispatch, SetStateAction, useEffect} from 'react';
import {Button, Card, Divider, Select} from 'antd';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {
    resetCreatedTraining,
    setCreatedTraining,
    setTraining
} from '@redux/slices/training-slice.ts';
import {useCreateTrainingMutation} from '@redux/api/training-api.ts';
import {EmptyCart} from '@pages/calendar-page/empty-cart/empty-cart.tsx';
import styles from './add-exercises-card.module.less';
import moment from 'moment';
import {TrainingBadgeEdit} from '@pages/calendar-page/training-badge/training-badge.tsx';
import {Exercise} from '@redux/types/training.ts';

type AddExercisesCardProps = {
    isLeft: boolean,
    setCreateWorkout: Dispatch<SetStateAction<boolean>>,
    setOpenDrawer: Dispatch<SetStateAction<boolean>>,
    editingTrainingName: string | undefined,
    onUpdate: () => void,
    setEditingTrainingName: Dispatch<SetStateAction<string | undefined>>,
}

export const AddExercisesCard = ({
                                     isLeft,
                                     setCreateWorkout,
                                     setOpenDrawer,
                                     editingTrainingName,
                                     onUpdate,
                                     setEditingTrainingName
                                 }: AddExercisesCardProps) => {
    const trainingList = useAppSelector(state => state.training.trainingList);
    const selectedTraining = useAppSelector(state => state.training.training);
    const selectedDate = useAppSelector(state => state.training.date);
    const training = useAppSelector(state => state.training.training);
    const exercises = useAppSelector(state => state.training.createdTraining);
    const userTraining = useAppSelector(state => state.training.userTraining);

    const dispatch = useAppDispatch();

    const handleChange = (value: string) => {
        const selectedTraining = trainingList.find(training => training.key === value);
        if (selectedTraining) {
            const trainingName = selectedTraining.name;
            dispatch(resetCreatedTraining())
            dispatch(setTraining(trainingName));
        }
    };

    const isSaveDisable = exercises.exercises.some(i => i.name !== '');

    const [createTraining] = useCreateTrainingMutation();

    //TODO
    const test = moment(selectedDate).format('YYYY-MM-DD');
    const test2 = userTraining[test];

    const namesToRemove = test2?.map(exercise => exercise.name);
    const currentTrainingList = trainingList?.map(({key, name}) => ({
        value: key,
        label: name
    }));
    const filteredExercises = currentTrainingList?.filter(exercise => !namesToRemove?.includes(exercise.label));

    const convertToResultExercises = (exercises: Exercise[]) =>
        exercises.map(e => ({
            name: e.name,
            approaches: e.approaches || 1,
            weight: e.weight || 0,
            replays: e.replays || 1
        }))

    const onSaveTraining = () => {
        const body = {
            name: selectedTraining,
            date: selectedDate,
            isImplementation: false,
            exercises: convertToResultExercises(exercises.exercises),
        };

        try {
            editingTrainingName ? onUpdate() : createTraining(body);
            setCreateWorkout(false);
        } catch (e) {
            console.log(e)
        }
    };

    const currentExercises = exercises.exercises.map(exercise => exercise.name).filter(name => name !== '');

    useEffect(() => {
        if (editingTrainingName) {
            const editingTraining = test2?.find(e => e.name === editingTrainingName);
            if (editingTraining) {
                dispatch(setCreatedTraining(editingTraining))
            }
        }
    }, [editingTrainingName]);

    const onClickEdit = () => {
        setOpenDrawer(true)
    }

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
                        onClick={() => {
                            setCreateWorkout(false);
                            setEditingTrainingName(undefined)
                        }}
                        style={{width: 16}}
                        data-test-id='modal-exercise-training-button-close'
                    />
                    <Select
                        defaultValue={editingTrainingName || 'Выбор типа тренировки'}
                        bordered={false}
                        style={{width: '100%'}}
                        options={filteredExercises}
                        onChange={handleChange}
                        data-test-id='modal-create-exercise-select'
                    />
                </div>
                <Divider/>
                <>
                    {
                        currentExercises?.length === 0
                            ?
                            <EmptyCart/>
                            :
                            <div className={styles.editBadgeWrapper}>
                                {currentExercises?.map((e, i) =>
                                    <TrainingBadgeEdit
                                        type={'exercises'}
                                        key={i + e}
                                        name={e}
                                        _id={exercises._id}
                                        onClick={onClickEdit}
                                    />)}
                            </div>
                    }
                </>
            </Card>
        </div>
    )
}
