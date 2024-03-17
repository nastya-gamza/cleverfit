import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {addExercises, resetTraining} from '@redux/slices/training-slice.ts';
import {CellPopover} from '@pages/calendar-page/popover/cell-popover.tsx';
import {AddExercisesCard} from '@pages/calendar-page/training-cards/add-exercises-card';
import {PlusOutlined} from '@ant-design/icons';
import styles from '@pages/calendar-page/calendar-page.module.less';
import {Badge, Button, Typography} from 'antd';
import {ExercisesForm} from '@pages/calendar-page/exercises-form/exercises-form.tsx';
import {DrawerRight} from '@pages/calendar-page/drawer-right/drawer-right.tsx';
import moment from 'moment';
import {TRAINING_COLORS_MAP} from '@constants/training-colors-map.ts';

type CreateWorkoutModalProps = {
    isLeft: boolean,
    createWorkout: boolean,
    setCreateWorkout: Dispatch<SetStateAction<boolean>>,
}

export const ExercisesPopover = ({
                                     isLeft,
                                     createWorkout,
                                     setCreateWorkout,
                                 }: CreateWorkoutModalProps) => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const dispatch = useAppDispatch();
    const {exercises} = useAppSelector(state => state.training.createdTraining);
    const {training} = useAppSelector(state => state.training);
    const selectedDate = useAppSelector(state => state.training.date);

    const handleAddExercise = () => {
        dispatch(addExercises());
    }

    useEffect(() => {
        dispatch(resetTraining())
    }, [createWorkout, dispatch]);

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
                    />}
            >
                <div
                    style={{height: '100%', width: '100%'}}
                />
            </CellPopover>
            <DrawerRight
                title={'Добавление упражнений'}
                open={openDrawer}
                close={()=>setOpenDrawer(false)}
                closeIcon={<PlusOutlined/>}
            >
                <div className={styles.drawerInfo}>
                    <Typography.Text type='secondary'>
                        <Badge color={TRAINING_COLORS_MAP[training]} text={training} />
                    </Typography.Text>
                    <Typography.Text type='secondary'>
                        {moment(selectedDate).format('DD.MM.YYYY')}
                    </Typography.Text>
                </div>
                {exercises.map(({weight, approaches, name, replays}, index) => (
                    <ExercisesForm
                        key={index}
                        index={index}
                        name={name}
                        replays={replays}
                        weight={weight}
                        approaches={approaches}
                    />
                ))}
                <Button
                    type='text'
                    icon={<PlusOutlined/>}
                    size='small'
                    onClick={handleAddExercise}
                >
                    Добавить ещё
                </Button>
            </DrawerRight>
        </>
    )
}
