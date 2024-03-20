import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import moment from 'moment';
import {Badge, Button, Typography} from 'antd';
import {EditOutlined, MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {
    addExercises,
    resetTraining, selectCreatedTraining, selectTrainingData, setCreatedTraining,
    setExercises
} from '@redux/slices/training-slice.ts';
import {Exercise} from '@redux/types/training.ts';
import {useUpdateTrainingMutation} from '@redux/api/training-api.ts';
import {CellPopover} from '@pages/calendar-page/popover/cell-popover';
import {AddExercisesCard} from '@pages/calendar-page/training-cards/add-exercises-card';
import {ExercisesForm} from '@pages/calendar-page/exercises-form/exercises-form.tsx';
import {DrawerRight} from '@pages/calendar-page/drawer-right/drawer-right.tsx';
import {error} from '@pages/calendar-page/notification-modal/error-notification-modal.tsx';
import {PATHS} from '@constants/paths.ts';
import {TRAINING_COLORS_MAP} from '@constants/training-colors-map.ts';
import styles from '@pages/calendar-page/calendar-page.module.less';
import {isOldDate} from '@utils/checkDate.ts';
import {DDMMYYYY} from '@constants/date-formates.ts';

type CreateWorkoutModalProps = {
    isLeft: boolean,
    isFullScreen: boolean,
    createWorkout: boolean,
    setCreateWorkout: Dispatch<SetStateAction<boolean>>,
    editingTrainingName: string | null,
    setEditingTrainingName: Dispatch<SetStateAction<string | null>>,
    setAddNewWorkout: Dispatch<SetStateAction<boolean>>,
}

export const ExercisesPopover = ({
                                     isLeft,
                                     isFullScreen,
                                     createWorkout,
                                     setCreateWorkout,
                                     editingTrainingName,
                                     setEditingTrainingName,
                                     setAddNewWorkout
                                 }: CreateWorkoutModalProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [update] = useUpdateTrainingMutation();

    const {exercises} = useAppSelector(selectCreatedTraining);
    const createdTraining = useAppSelector(selectCreatedTraining);
    const {training, date: selectedDate} = useAppSelector(selectTrainingData);

    const [openDrawer, setOpenDrawer] = useState(false);
    const [trainingName, setTrainingName] = useState('');
    const [deletedExercises, setDeletedExercises] = useState<number[]>([]);
    const [resultExercises, setResultExercises] = useState<Exercise[]>([]);

    useEffect(() => {
        const result = editingTrainingName ? createdTraining.name : training
        setTrainingName(result)

    }, [editingTrainingName, training, createdTraining.name]);

    useEffect(() => {
        setResultExercises(exercises)
    }, [exercises]);

    const onUpdate = async () => {
        const requestData = {
            ...createdTraining,
            exercises: resultExercises
        }

        if (isOldDate(requestData.date)) {
            requestData['isImplementation'] = true
        }

        try {
            const data = await update(requestData).unwrap();

            if (data) {
                dispatch(setCreatedTraining(data));
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
    }

    const onDelete = () => {
        const resultExercises = exercises.filter((_, index) => {
            return !deletedExercises.includes(index);
        })
        setResultExercises(resultExercises)
    }

    const addDeletedExercise = (index: number) => {
        const resultDeletedExercises = [...deletedExercises, index];
        setDeletedExercises(resultDeletedExercises);
    };

    const excludeDeletedExercise = (index: number) => {
        const resultDeletedExercises = deletedExercises.filter(e => e != index);
        setDeletedExercises(resultDeletedExercises);
    };

    const handleAddExercise = () => {
        dispatch(addExercises());
    }

    useEffect(() => {
        dispatch(resetTraining())
    }, [createWorkout, dispatch]);

    const handleClose = () => {
        setOpenDrawer(false);
        if (!editingTrainingName) {
            const resultExercises = exercises.filter((e, index) => (e.name !== '') || (index == 0));
            dispatch(setExercises(resultExercises))
        }
    }

    return (
        <>
            <CellPopover
                isLeft={isLeft}
                isFullScreen={isFullScreen}
                isOpen={createWorkout}
                onOpenChange={setCreateWorkout}
                content={
                    <AddExercisesCard
                        isLeft={isLeft}
                        setCreateWorkout={setCreateWorkout}
                        setOpenDrawer={setOpenDrawer}
                        editingTrainingName={editingTrainingName}
                        onUpdate={onUpdate}
                        setEditingTrainingName={setEditingTrainingName}
                        setAddNewWorkout={setAddNewWorkout}
                        resultExercises={resultExercises}
                    />}
            >
                <div
                    style={{height: '100%', width: '100%', left: 0}}
                />
            </CellPopover>
            <DrawerRight
                title={editingTrainingName ? 'Редактирование' : 'Добавление упражнений'}
                open={openDrawer}
                isFullScreen={isFullScreen}
                close={handleClose}
                closeIcon={editingTrainingName ? <EditOutlined/> : <PlusOutlined/>}
            >
                <div className={styles.drawerInfo}>
                    <Badge
                        color={TRAINING_COLORS_MAP[trainingName]}
                        text={
                            <Typography.Text type='secondary'>{trainingName}</Typography.Text>
                        }
                    />
                    <Typography.Text type='secondary'>
                        {moment(selectedDate).format(DDMMYYYY)}
                    </Typography.Text>
                </div>
                {resultExercises.map(({weight, approaches, name, replays, _id}, index) => (
                    <ExercisesForm
                        key={`${_id}${index}`}
                        index={index}
                        name={name}
                        replays={replays}
                        weight={weight}
                        approaches={approaches}
                        isCheckbox={!!editingTrainingName}
                        _id={_id}
                        addDeletedExercise={addDeletedExercise}
                        excludeDeletedExercise={excludeDeletedExercise}
                    />
                ))}
                <div className={styles.btnGroup}>
                    <Button
                        type='link'
                        icon={<PlusOutlined style={{fill: '#2F54EB'}}/>}
                        size='small'
                        onClick={handleAddExercise}
                    >
                        Добавить ещё
                    </Button>
                    {editingTrainingName && (
                        <Button
                            type='text'
                            icon={<MinusOutlined/>}
                            onClick={onDelete}
                            size='small'
                            disabled={deletedExercises.length === 0}
                        >
                            Удалить
                        </Button>
                    )}
                </div>
            </DrawerRight>
        </>
    )
}
