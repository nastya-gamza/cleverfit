import {Dispatch, SetStateAction, useEffect} from 'react';
import {Button, Card, Divider, Select} from 'antd';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {
    resetCreatedTraining, resetTraining,
    setCreatedTraining,
    setTraining
} from '@redux/slices/training-slice.ts';
import {
    useCreateTrainingMutation,
    useGetTrainingListQuery,
    useGetUserTrainingsQuery
} from '@redux/api/training-api.ts';
import {EmptyCart} from '@pages/calendar-page/empty-cart/empty-cart.tsx';
import styles from './add-exercises-card.module.less';
import moment from 'moment';
import {TrainingBadgeEdit} from '@pages/calendar-page/training-badge/training-badge.tsx';
import {Exercise} from '@redux/types/training.ts';
import {error} from '@pages/calendar-page/modals/notification-modal/error-notification-modal.tsx';
import {useNavigate} from 'react-router-dom';
import {PATHS} from '@constants/paths.ts';

type AddExercisesCardProps = {
    isLeft: boolean,
    setCreateWorkout: Dispatch<SetStateAction<boolean>>,
    setOpenDrawer: Dispatch<SetStateAction<boolean>>,
    editingTrainingName: string | undefined,
    onUpdate: () => void,
    setEditingTrainingName: Dispatch<SetStateAction<string | undefined>>,
    setAddNewWorkout: Dispatch<SetStateAction<boolean>>,
    resultExercises: Exercise[]
}

export const AddExercisesCard = ({
                                     isLeft,
                                     setCreateWorkout,
                                     setOpenDrawer,
                                     editingTrainingName,
                                     onUpdate,
                                     setEditingTrainingName,
                                     setAddNewWorkout,
                                     resultExercises
                                 }: AddExercisesCardProps) => {
    const trainingList = useAppSelector(state => state.training.trainingList);
    const selectedTraining = useAppSelector(state => state.training.training);
    const selectedDate = useAppSelector(state => state.training.date);
    const training = useAppSelector(state => state.training.training);
    const exercises = useAppSelector(state => state.training.createdTraining);
    const userTraining = useAppSelector(state => state.training.userTraining);

    const navigate = useNavigate();
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

        useGetUserTrainingsQuery();
        useGetTrainingListQuery();

    const onSaveTraining = async () => {
        const body = {
            name: selectedTraining,
            date: selectedDate,
            isImplementation: false,
            exercises: convertToResultExercises(exercises.exercises),
        };

        try {
            dispatch(resetTraining());
            dispatch(resetCreatedTraining());
            if (editingTrainingName) {
                onUpdate()
            } else {
                await createTraining(body).unwrap();
            }

        } catch (e) {
            error(
                'При сохранении данных произошла ошибка',
                'Придётся попробовать ещё раз',
                'Закрыть',
                () => navigate(PATHS.calendar, {state: {from: 'redirect'}}),
                true,
            );
            setAddNewWorkout(false);
            dispatch(resetTraining());
        } finally {
            setCreateWorkout(false);
        }
    };

    const currentExercises = resultExercises.filter(ex => ex.name !== '');

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

    useEffect(() => {
        console.log(editingTrainingName)
    }, [editingTrainingName]);

    return (
        <div data-test-id='modal-create-exercise'
             className={isLeft ? styles.cardWrapper : styles.cardWrapper2}
             onClick={e => e.stopPropagation()}>
            <Card
                className={styles.card}
                actions={[
                    <>
                        <Button
                            disabled={!training && !editingTrainingName}
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
                            {editingTrainingName ? 'Сохранить изменения' : 'Сохранить'}
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
                                        type='exercises'
                                        key={i}
                                        index={i}
                                        name={e.name}
                                        _id={e._id}
                                        onClick={onClickEdit}
                                    />)}
                            </div>
                    }
                </>
            </Card>
        </div>
    )
}
