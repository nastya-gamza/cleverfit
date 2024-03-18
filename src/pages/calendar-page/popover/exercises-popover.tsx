import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
    addExercises,
    resetTraining, setCreatedTraining,
    setExercises
} from '@redux/slices/training-slice.ts';
import {CellPopover} from '@pages/calendar-page/popover/cell-popover.tsx';
import {AddExercisesCard} from '@pages/calendar-page/training-cards/add-exercises-card';
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import styles from '@pages/calendar-page/calendar-page.module.less';
import {Badge, Button, Typography} from 'antd';
import {ExercisesForm} from '@pages/calendar-page/exercises-form/exercises-form.tsx';
import {DrawerRight} from '@pages/calendar-page/drawer-right/drawer-right.tsx';
import moment from 'moment';
import {TRAINING_COLORS_MAP} from '@constants/training-colors-map.ts';
import {useUpdateTrainingMutation} from '@redux/api/training-api.ts';
import {Moment} from 'moment/moment';
import {Exercise} from '@redux/types/training.ts';
import {error} from '@pages/calendar-page/modals/notification-modal/error-notification-modal.tsx';
import {PATHS} from '@constants/paths.ts';
import {useNavigate} from 'react-router-dom';

type CreateWorkoutModalProps = {
    isLeft: boolean,
    createWorkout: boolean,
    setCreateWorkout: Dispatch<SetStateAction<boolean>>,
    editingTrainingName: string | undefined,
    setEditingTrainingName: Dispatch<SetStateAction<string | undefined>>,
    setAddNewWorkout: Dispatch<SetStateAction<boolean>>,
}

export const ExercisesPopover = ({
                                     isLeft,
                                     createWorkout,
                                     setCreateWorkout,
                                     editingTrainingName,
                                     setEditingTrainingName,
                                     setAddNewWorkout
                                 }: CreateWorkoutModalProps) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [res, setRes] = useState('');
    const [deletedExercises, setDeletedExercises] = useState<number[]>([]);
    const [resultExercises, setResultExercises] = useState<Exercise[]>([]);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {exercises} = useAppSelector(state => state.training.createdTraining);
    const createdTraining = useAppSelector(state => state.training.createdTraining);
    const {training} = useAppSelector(state => state.training);
    const selectedDate = useAppSelector(state => state.training.date);

    useEffect(() => {
        const res = editingTrainingName ? createdTraining.name : training
        setRes(res)

    }, [training, createdTraining.name]);

    useEffect(() => {
        setResultExercises(exercises)
    }, [exercises]);

    const [update] = useUpdateTrainingMutation();
    const isOldDate = (date?: Moment | string) => Boolean(date && moment(date).isBefore(moment()));

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
        const resultExercises = exercises.filter((e, index) => {
            console.log(index)
            console.log(deletedExercises)
            return !deletedExercises.includes(index);
        })
        console.log(resultExercises)
        setResultExercises(resultExercises)
    }

    const addDeletedExercise = (index: number) => {
        const resultDeletedExercises = [...deletedExercises, index];
        console.log(resultDeletedExercises)
        setDeletedExercises(resultDeletedExercises);
    };

    const excludeDeletedExercise = (index: number) => {
        const resultDeletedExercises = deletedExercises.filter(e => e != index);
        console.log(resultDeletedExercises)
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
                    style={{height: '100%', width: '100%'}}
                />
            </CellPopover>
            <DrawerRight
                title={editingTrainingName ? 'Редактирование' : 'Добавление упражнений'}
                open={openDrawer}
                close={handleClose}
                closeIcon={<PlusOutlined/>}
            >
                <div className={styles.drawerInfo}>
                    <Typography.Text type='secondary'>
                        <Badge color={TRAINING_COLORS_MAP[res]} text={res}/>
                    </Typography.Text>
                    <Typography.Text type='secondary'>
                        {moment(selectedDate).format('DD.MM.YYYY')}
                    </Typography.Text>
                </div>
                {resultExercises.map(({weight, approaches, name, replays, _id}, index) => (
                    <ExercisesForm
                        key={_id ?? index}
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
                <div>
                    <Button
                        type='text'
                        icon={<PlusOutlined/>}
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
