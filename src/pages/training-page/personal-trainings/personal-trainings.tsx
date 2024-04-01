import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {PlusOutlined} from '@ant-design/icons';
import {PATHS} from '@constants/paths.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {DrawerRight} from '@pages/calendar-page/drawer-right/drawer-right.tsx';
import {ExercisesForm} from '@pages/calendar-page/exercises-form/exercises-form.tsx';
import {error} from '@pages/calendar-page/notification-modal/error-notification-modal.tsx';
import {NoPersonalTrainings} from '@pages/training-page/personal-trainings/no-personal-trainings';
import {PeriodicityBlock} from '@pages/training-page/personal-trainings/periodicity-block';
import {useCreateTrainingMutation} from '@redux/api/training-api.ts';
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
    const [isDisabled, setIsDisabled] = useState(true);
    const {name, date, exercises, parameters} = useAppSelector(selectCreatedTraining);
    const [createTraining] = useCreateTrainingMutation();

    const {trainingList} = useAppSelector(selectTrainingData);
    const currentTrainingList = trainingList?.map(({key, name}) => ({
        value: key,
        label: name
    }));

    useEffect(() => {
        if (name && date !== 'Invalid date' && exercises.some(e => e.name !== '')) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true)
        }
    }, [name, date, exercises]);

    const handleOpen = () => setIsDrawerOpen(true);
    const handleClose = () => setIsDrawerOpen(false);

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
            name,
            date,
            exercises: exercises.filter(e => e.name !== '').map(e => ({
                name: e.name,
                approaches: e.approaches ?? 1,
                weight: e.weight ?? 0,
                replays: e.replays ?? 1
            })),
            parameters,
        };

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
            handleClose();
            dispatch(resetCreatedTraining());
        }
    }

    return (
        <React.Fragment>
            <NoPersonalTrainings openDrawer={handleOpen}/>
            <DrawerRight
                title='Новая тренировка'
                open={isDrawerOpen}
                isFullScreen={true}
                close={handleClose}
                closeIcon={<PlusOutlined/>}
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
                        defaultValue='Выбор типа тренировки'
                        options={currentTrainingList}
                        onChange={handleChangeTraining}
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
                            isCheckbox={false}
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
                </Space>
            </DrawerRight>
        </React.Fragment>
    )
}
