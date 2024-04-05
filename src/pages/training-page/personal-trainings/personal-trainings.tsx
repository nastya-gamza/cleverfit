import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {EditOutlined, MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {PATHS} from '@constants/paths.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {DrawerRight} from '@pages/calendar-page/drawer-right/drawer-right.tsx';
import {ExercisesForm} from '@pages/calendar-page/exercises-form/exercises-form.tsx';
import {error} from '@pages/calendar-page/notification-modal/error-notification-modal.tsx';
import {NoPersonalTrainings} from '@pages/training-page/personal-trainings/no-personal-trainings';
import {PeriodicityBlock} from '@pages/training-page/personal-trainings/periodicity-block';
import {TrainingTable} from '@pages/training-page/personal-trainings/training-table';
import {useCreateTrainingMutation, useUpdateTrainingMutation} from '@redux/api/training-api.ts';
import {setAlert} from '@redux/slices/app-slice.ts';
import {
    addExercises, resetCreatedTraining,
    selectCreatedTraining,
    selectTrainingData, setCreatedTraining,
} from '@redux/slices/training-slice.ts';
import {Button, Select, Space} from 'antd';

import styles from './personal-trainings.module.less';

export const PersonalTrainings = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [openTrainingCard, setOpenTrainingCard] = useState(false);
    const [editingTrainingName, setEditingTrainingName] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const {_id, name, date, exercises, parameters} = useAppSelector(selectCreatedTraining);
    const {userTraining} = useAppSelector(selectTrainingData);
    const [createTraining] = useCreateTrainingMutation();
    const [update] = useUpdateTrainingMutation();
    const [deletedExercises, setDeletedExercises] = useState<number[]>([]);
    const {trainingList} = useAppSelector(selectTrainingData);

    const currentTrainingList = trainingList?.map(({key, name}) => ({
        value: key,
        label: name
    }));

    useEffect(() => {
        if (name && date && exercises.some(e => e.name !== '')) {
            setIsDisabled(false);

            return;
        }
        setIsDisabled(true)
    }, [name, date, exercises]);

    const handleOpenDrawer = () => setIsDrawerOpen(true);
    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setEditingTrainingName('');
        dispatch(resetCreatedTraining());
    };

    const handleAddExercise = () => {
        dispatch(addExercises());
    }

    const handleChangeTraining = (value: string) => {
        const selectedTrainingName = trainingList.find(training => training.key === value);

        if (selectedTrainingName) {
            const trainingName = selectedTrainingName.name;

            dispatch(setCreatedTraining({name: trainingName}))
        }
    }

    const onSaveTraining = async () => {
        const body = {
            _id,
            name,
            date,
            parameters,
            isImplementation: false,
            exercises: exercises.filter(e => e.name !== '').map(e => ({
                name: e.name,
                approaches: e.approaches ?? 1,
                weight: e.weight ?? 0,
                replays: e.replays ?? 1,
                _id: e._id,
            })),
        };

        if (editingTrainingName) {
            try {
                await update(body).unwrap();
                dispatch(setAlert({
                    type: 'success',
                    message: 'Тренировка успешно обновлена',
                    dataTestId: 'create-training-success-alert'
                }));
            } catch (e) {
                error(
                    'При сохранении данных произошла ошибка',
                    'Придётся попробовать ещё раз',
                    'Закрыть',
                    () => navigate(PATHS.training, {state: {from: 'redirect'}}),
                    'modal-error-user-training-button',
                    true,
                );
            } finally {
                handleCloseDrawer();
                setOpenTrainingCard(false);
                dispatch(resetCreatedTraining());
            }

            return;
        }

        try {
            await createTraining(body).unwrap();
            dispatch(setAlert({
                type: 'success',
                message: 'Новая тренировка успешно добавлена',
                dataTestId: 'create-training-success-alert'
            }));
        } catch (e) {
            error(
                'При сохранении данных произошла ошибка',
                'Придётся попробовать ещё раз',
                'Закрыть',
                () => navigate(PATHS.training, {state: {from: 'redirect'}}),
                'modal-error-user-training-button',
                true,
            );
        } finally {
            handleCloseDrawer();
            dispatch(resetCreatedTraining());
        }
    }

    const onDelete = () => {
        const filteredResultExercises = exercises.filter((_, index) => !deletedExercises.includes(index));

        dispatch(setCreatedTraining({exercises: filteredResultExercises}))
    }

    const addDeletedExercise = (index: number) => {
        const resultDeletedExercises = [...deletedExercises, index];

        setDeletedExercises(resultDeletedExercises);
    };

    const excludeDeletedExercise = (index: number) => {
        const resultDeletedExercises = deletedExercises.filter(e => e !== index);

        setDeletedExercises(resultDeletedExercises);
    };

    return (
        <React.Fragment>
            {Object.values(userTraining).length ?
                <TrainingTable
                    openDrawer={handleOpenDrawer}
                    openCard={openTrainingCard}
                    setOpenCard={setOpenTrainingCard}
                    setEditingTrainingName={setEditingTrainingName}
                /> :
                <NoPersonalTrainings openDrawer={handleOpenDrawer}/>
            }
            <DrawerRight
                title={editingTrainingName ? 'Редактирование' : 'Добавление упражнений'}
                open={isDrawerOpen}
                isFullScreen={true}
                close={handleCloseDrawer}
                closeIcon={editingTrainingName ? <EditOutlined/> : <PlusOutlined/>}
                dataTestId='modal-drawer-right'
                footer={
                    <Button
                        type='primary'
                        size='large'
                        block={true}
                        disabled={isDisabled}
                        onClick={onSaveTraining}
                    >
                        Сохранить
                    </Button>
                }
            >
                <Space direction='vertical' size={24}>
                    <Select
                        defaultValue={name || 'Выбор типа тренировки'}
                        options={currentTrainingList}
                        onChange={handleChangeTraining}
                        disabled={!!editingTrainingName}
                        className={styles.select}
                        data-test-id='modal-create-exercise-select'
                    />
                    <PeriodicityBlock/>
                    {exercises.map(({weight, approaches, name, replays, _id}, index) => (
                        <ExercisesForm
                            key={`${_id}${index}`}
                            index={index}
                            name={name}
                            replays={replays}
                            weight={weight}
                            approaches={approaches}
                            isCheckbox={!!editingTrainingName}
                            addDeletedExercise={addDeletedExercise}
                            excludeDeletedExercise={excludeDeletedExercise}
                        />
                    ))}
                    <Button
                        type='link'
                        icon={<PlusOutlined style={{fill: '#2F54EB'}}/>}
                        size='large'
                        className={styles.btnGroup}
                        onClick={handleAddExercise}
                    >
                        Добавить ещё упражнение
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
                </Space>
            </DrawerRight>
        </React.Fragment>
    )
}
