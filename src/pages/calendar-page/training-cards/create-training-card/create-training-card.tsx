import {Dispatch, SetStateAction} from 'react';
import {CloseOutlined} from '@ant-design/icons';
import {DDMMYYYY, YYYYMMDD} from '@constants/date-formates.ts';
import {EmptyCart} from '@pages/calendar-page/empty-cart/empty-cart.tsx';
import {TrainingBadgeEdit} from '@pages/calendar-page/training-badge/training-badge.tsx';
import {useGetTrainingListQuery, useGetUserTrainingsQuery} from '@redux/api/training-api.ts';
import {isOldDate} from '@utils/check-date.ts';
import {Button, Card} from 'antd';
import moment, {Moment} from 'moment';

import styles from './create-training-card.module.less';

const {Meta} = Card;

type CreateTrainingCardProps = {
    isLeft: boolean,
    selectedDate: Moment | string,
    setAddNewWorkout: Dispatch<SetStateAction<boolean>>,
    setCreateWorkout: Dispatch<SetStateAction<boolean>>,
    setEditingTrainingName: Dispatch<SetStateAction<string | null>>,
}

export const CreateTrainingCard = ({
                                       selectedDate,
                                       isLeft,
                                       setAddNewWorkout,
                                       setCreateWorkout,
                                       setEditingTrainingName
                                   }: CreateTrainingCardProps) => {
    const {data: userTrainings} = useGetUserTrainingsQuery();
    const {data: trainingList} = useGetTrainingListQuery();

    const onClose = () => {
        setAddNewWorkout(false);
    }

    const isTrainingsExists = userTrainings?.[moment(selectedDate).format(YYYYMMDD)] ?? [];
    const dateString = moment(selectedDate).format(YYYYMMDD);
    const trainingByDay = userTrainings && userTrainings[dateString];

    const disabledButton = isOldDate(selectedDate) || trainingByDay?.length === trainingList?.length;

    const onClickEdit = (name: string) => {
        setCreateWorkout(true);
        setEditingTrainingName(name);
    }

    return (
        <div data-test-id='modal-create-training'
             className={isLeft ? styles.wrapperLeft : styles.wrapperRight}
             onClick={e => e.stopPropagation()}>
            <Card
                title={`Тренировки на ${moment(selectedDate).format(DDMMYYYY)}`}
                extra={<Button
                    data-test-id='modal-create-training-button-close'
                    type='text'
                    size='small'
                    icon={<CloseOutlined/>}
                    onClick={onClose}
                />}
                className={styles.card}
                actions={[
                    <Button
                        disabled={disabledButton}
                        className={styles.actionButton}
                        size='large'
                        type='primary'
                        block={true}
                        onClick={() => setCreateWorkout(true)}
                    >
                        Создать тренировку
                    </Button>,
                ]}
            >
                {isTrainingsExists.length > 0 ?
                    <div className={styles.editBadgeWrapper}>
                        {trainingByDay && trainingByDay.map(({_id, name, isImplementation}, i) =>
                            <TrainingBadgeEdit
                                key={_id ?? i}
                                index={i}
                                name={name}
                                onClick={() => onClickEdit(name)}
                                isDisabled={isImplementation}
                            />)
                        }
                    </div>
                    :
                    <Meta
                        description='Нет активных тренировок'
                        avatar={<EmptyCart/>}
                    />}
            </Card>
        </div>
    )
}
