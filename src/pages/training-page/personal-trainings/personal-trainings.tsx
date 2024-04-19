import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {EditOutlined, MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {DrawerRight} from '@components/drawer-right';
import {error} from '@components/error-notification-modal';
import {DRAWER_TITLES_MAP} from '@constants/drawer-titles-map.ts';
import {PATHS} from '@constants/paths.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {ExercisesForm} from '@pages/calendar-page/exercises-form';
import {PartnerInfo} from '@pages/training-page/joint-trainings/partner-info';
import {NoPersonalTrainings} from '@pages/training-page/personal-trainings/no-personal-trainings';
import {PeriodicityBlock} from '@pages/training-page/personal-trainings/periodicity-block';
import {TrainingTable} from '@pages/training-page/personal-trainings/training-table';
import {useCreateInvitationMutation} from '@redux/api/invite-api.ts';
import {useCreateTrainingMutation, useUpdateTrainingMutation} from '@redux/api/training-api.ts';
import {setAlert} from '@redux/slices/app-slice.ts';
import {selectUserJointTrainings} from '@redux/slices/invite-slice.ts';
import {
    addExercises, resetCreatedTraining, selectCreatedTraining,
    selectTrainingData, setCreatedTraining, setIsOpenTrainingDrawer, setTrainingMode,
} from '@redux/slices/training-slice.ts';
import {TrainingMode, UserTraining} from '@redux/types/training.ts';
import {isOldDate} from '@utils/check-date.ts';
import {Button, Select, Space} from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import styles from './personal-trainings.module.less';

export const PersonalTrainings = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const screens = useBreakpoint();

    const [createTraining] = useCreateTrainingMutation();
    const [update] = useUpdateTrainingMutation();
    const [createInvitation] = useCreateInvitationMutation();

    const {isDrawerOpen} = useAppSelector(selectTrainingData);
    const {partnerInfo} = useAppSelector(selectUserJointTrainings);
    const {name, date, exercises, parameters} = useAppSelector(selectCreatedTraining);
    const {userTraining, trainingMode} = useAppSelector(selectTrainingData);
    const {trainingList} = useAppSelector(selectTrainingData);

    const [openTrainingCard, setOpenTrainingCard] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(true);
    const [deletedExercises, setDeletedExercises] = useState<number[]>([]);
    const [isDisabled, setIsDisabled] = useState(true);

    const isEditMode = trainingMode === TrainingMode.EDIT;
    const isAddNewMode = trainingMode === TrainingMode.NEW;
    const isJointMode = trainingMode === TrainingMode.JOINT;

    const currentTrainingList = trainingList?.map(({key, name}) => ({value: key, label: name}));

    const handleOpenDrawer = () => dispatch(setIsOpenTrainingDrawer(true));

    const handleCloseDrawer = () => {
        dispatch(setIsOpenTrainingDrawer(false))
        dispatch(resetCreatedTraining());
        dispatch(setTrainingMode(TrainingMode.NEW));
    };

    const handleAddExercise = () => dispatch(addExercises());

    const handleChangeTraining = (value: string) => {
        const selectedTrainingName = trainingList.find(training => training.key === value);

        if (selectedTrainingName) {
            const trainingName = selectedTrainingName.name;

            dispatch(setCreatedTraining({name: trainingName}))
        }
    }

    const onSaveTraining = async () => {
        const trainingName = isJointMode ? partnerInfo.trainingType : name;

        const body: UserTraining = {
            name: trainingName,
            date,
            parameters: {
                ...parameters,
                jointTraining: isJointMode,
            },
            isImplementation: false,
            exercises: exercises.filter(e => e.name !== '').map(e => ({
                name: e.name,
                approaches: e.approaches ?? 1,
                weight: e.weight ?? 0,
                replays: e.replays ?? 1,
                _id: e._id,
            })),
        };

        if (isEditMode) {
            try {
                if (isOldDate(body.date)) {
                    body.isImplementation = true
                }

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
            const data: UserTraining = await createTraining(body).unwrap();

            if (isJointMode) {
                await createInvitation({to: partnerInfo.id, trainingId: data._id || ''});
            }

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

        setDeletedExercises([]);

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

    useEffect(() => {
        if (!screens.sm) {
            setIsFullScreen(false);
        } else {
            setIsFullScreen(true)
        }
    }, [screens.sm]);

    useEffect(() => {
        const hasValidInputs = (isJointMode || name) && date && exercises.some(e => e.name !== '');

        setIsDisabled(!hasValidInputs);
    }, [name, date, exercises, isJointMode]);

    useEffect(() => {
        if (isAddNewMode) {
            dispatch(resetCreatedTraining());
        }
    }, [isAddNewMode]);

    return (
        <React.Fragment>
            {Object.values(userTraining).length ?
                <TrainingTable
                    openDrawer={handleOpenDrawer}
                    openCard={openTrainingCard}
                    setOpenCard={setOpenTrainingCard}
                /> :
                <NoPersonalTrainings openDrawer={handleOpenDrawer}/>
            }
            <DrawerRight
                title={DRAWER_TITLES_MAP[trainingMode]}
                open={isDrawerOpen}
                isFullScreen={isFullScreen}
                close={handleCloseDrawer}
                closeIcon={isEditMode ? <EditOutlined/> : <PlusOutlined/>}
                dataTestId='modal-drawer-right'
                footer={
                    <Button
                        type='primary'
                        size='large'
                        block={true}
                        disabled={isDisabled}
                        onClick={onSaveTraining}
                    >
                        {isJointMode ? 'Отправить приглашение' : 'Сохранить'}
                    </Button>
                }
            >
                <Space direction='vertical' size={24}>
                    {
                        isJointMode ? <PartnerInfo partner={partnerInfo}/> :
                            <Select
                                defaultValue={name || 'Выбор типа тренировки'}
                                options={currentTrainingList}
                                onChange={handleChangeTraining}
                                disabled={isEditMode}
                                className={styles.select}
                                data-test-id='modal-create-exercise-select'
                            />
                    }
                    <PeriodicityBlock/>
                    {exercises.map(({weight, approaches, name, replays, _id, tempId}, index) => (
                        <ExercisesForm
                            key={_id || tempId}
                            tempId={tempId}
                            index={index}
                            name={name}
                            replays={replays}
                            weight={weight}
                            approaches={approaches}
                            isCheckbox={!isAddNewMode}
                            addDeletedExercise={addDeletedExercise}
                            excludeDeletedExercise={excludeDeletedExercise}
                        />
                    ))}
                    <div className={styles.btnGroup}>
                        <Button
                            type='link'
                            icon={<PlusOutlined style={{fill: '#2F54EB'}}/>}
                            size='large'
                            onClick={handleAddExercise}
                        >
                            Добавить ещё
                        </Button>
                        {!isAddNewMode && (
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
                </Space>
            </DrawerRight>
        </React.Fragment>
    )
}
