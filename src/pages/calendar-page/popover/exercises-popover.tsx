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

type CreateWorkoutModalProps = {
    isLeft: boolean,
    createWorkout: boolean,
    setCreateWorkout: Dispatch<SetStateAction<boolean>>,
    editingTrainingName: string | undefined,
    setEditingTrainingName: Dispatch<SetStateAction<string | undefined>>,
}

export const ExercisesPopover = ({
                                     isLeft,
                                     createWorkout,
                                     setCreateWorkout,
                                     editingTrainingName,
                                     setEditingTrainingName
                                 }: CreateWorkoutModalProps) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [deletedExercises, setDeletedExercises] = useState<string[]>([]);

    const dispatch = useAppDispatch();
    const {exercises} = useAppSelector(state => state.training.createdTraining);
    const createdTraining = useAppSelector(state => state.training.createdTraining);
    const {training} = useAppSelector(state => state.training);
    const selectedDate = useAppSelector(state => state.training.date);

    const [update, {data}] = useUpdateTrainingMutation();

    const onUpdate = async () => {
        const resultExercises = exercises.filter(e => {
            if (e._id) {
                !deletedExercises.includes(e._id)
            }
        })
        const requestData = {
            ...createdTraining,
            exercises: resultExercises
        }

        console.log(exercises)
        try {
            console.log(resultExercises)
            await update(requestData);
            if (data) { dispatch(setCreatedTraining(data)); }
        }
        catch (e) {
            console.log(e)
        }
    }

    const addDeletedExercise = (id: string) => {
        const resultDeletedExercises = [...deletedExercises, id];
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
        const resultExercises = exercises.filter((e, index) => (e.name !== '') || (index == 0));
        dispatch(setExercises(resultExercises))
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
                        <Badge color={TRAINING_COLORS_MAP[training]} text={training}/>
                    </Typography.Text>
                    <Typography.Text type='secondary'>
                        {moment(selectedDate).format('DD.MM.YYYY')}
                    </Typography.Text>
                </div>
                {exercises.map(({weight, approaches, name, replays, _id}, index) => (
                    <ExercisesForm
                        key={index}
                        index={index}
                        name={name}
                        replays={replays}
                        weight={weight}
                        approaches={approaches}
                        isCheckbox={!!editingTrainingName}
                        _id={_id}
                        addDeletedExercise={addDeletedExercise}
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
                            onClick={onUpdate}
                            size='small'
                        >
                            Удалить
                        </Button>
                    )}
                </div>
            </DrawerRight>
        </>
    )
}
