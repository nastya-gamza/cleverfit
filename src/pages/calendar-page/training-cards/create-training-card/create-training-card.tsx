import {Button, Card} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import {Dispatch, SetStateAction} from 'react';
import {Moment} from 'moment';
import moment from 'moment/moment';
import styles from './create-training-card.module.less';
import {useGetTrainingListQuery, useGetUserTrainingsQuery} from '@redux/api/training-api.ts';
import {EmptyCart} from '@pages/calendar-page/empty-cart/empty-cart.tsx';
import {TrainingBadgeEdit} from '@pages/calendar-page/training-badge/training-badge.tsx';

const {Meta} = Card;

type CreateTrainingCardProps = {
    isLeft: boolean,
    selectedDate: Moment | string,
    setAddNewWorkout: Dispatch<SetStateAction<boolean>>,
    setCreateWorkout: Dispatch<SetStateAction<boolean>>,
    setEditingTrainingName: Dispatch<SetStateAction<string | undefined>>,
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

    const isTrainingsExists = userTrainings?.[moment(selectedDate).format('YYYY-MM-DD')] ?? [];
    const dateString = moment(selectedDate).format('YYYY-MM-DD');
    const trainingByDay = userTrainings && userTrainings[dateString];

    const isOldDate = (date?: Moment | string) => Boolean(date && moment(date).isBefore(moment()));
    const disabledButton = isOldDate(selectedDate) || trainingByDay?.length === trainingList?.length;

    const onClickEdit = (name: string) => {
        setCreateWorkout(true);
        setEditingTrainingName(name);
    }

    return (
        <div data-test-id='modal-create-training'
             className={isLeft ? styles.cardWrapper : styles.cardWrapper2}
             onClick={e => e.stopPropagation()}>
            <Card
                title={`Тренировки на ${moment(selectedDate).format('DD.MM.YYYY')}`}
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
                        block
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
                                setCreateWorkout={setCreateWorkout}
                                setEditingTrainingName={setEditingTrainingName}
                                _id={_id}
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
