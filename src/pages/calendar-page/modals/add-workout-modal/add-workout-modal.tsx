import {Button, Card, Empty} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import {Dispatch, SetStateAction} from 'react';
import {Moment} from 'moment';
import moment from 'moment/moment';
import styles from './add-workout-modal.module.less';

const {Meta} = Card;

type AddWorkoutModal = {
    isLeft: boolean,
    setAddNewWorkout: Dispatch<SetStateAction<boolean>>,
    selectedDate: Moment | string,
}

export const AddWorkoutModal = ({selectedDate, isLeft, setAddNewWorkout}: AddWorkoutModal) => {
    const onClose = () => {
        setAddNewWorkout(false);
    }

    return (
        <div className={isLeft ? styles.cardWrapper : styles.cardWrapper2}
             onClick={e => e.stopPropagation()}>
            <Card
                data-test-id=''
                title={`Тренировки на ${moment(selectedDate).format('DD.MM.YYYY')}`}
                extra={<Button
                    data-test-id=''
                    type='text'
                    size='small'
                    icon={<CloseOutlined/>}
                    onClick={onClose}
                />}
                className={styles.card}
                actions={[
                    <Button
                        // disabled={disabledButton}
                        className={styles.actionButton}
                        size='large'
                        type='primary'
                        block
                    >
                        Создать тренировку
                    </Button>,
                ]}
            >
                <Meta
                    description={'Нет активных тренировок'}
                    avatar={<Empty
                        image="/img/empty-image.svg"
                        imageStyle={{
                            width: 32,
                            height: 32,
                            margin: '36px auto 16px',
                        }}
                        description={null}
                    >
                    </Empty>}
                />
            </Card>
        </div>
    )
}
