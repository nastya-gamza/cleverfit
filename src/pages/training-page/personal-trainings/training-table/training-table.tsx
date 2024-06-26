import React, {Dispatch, SetStateAction, useState} from 'react';
import {DownOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {TrainingBadge} from '@components/training-badge';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {TrainingCard} from '@pages/training-page/personal-trainings/training-card';
import {
    selectTrainingData,
    setCreatedTraining,
    setExercises,
    setTrainingMode,
} from '@redux/slices/training-slice.ts';
import {TrainingMode, UserTraining} from '@redux/types/training.ts';
import {getPeriodicityLabel} from '@utils/get-periodicity-label.ts';
import {Button, Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import moment from 'moment';

import styles from './training-table.module.less';

export type TrainingTableProps = {
    openDrawer: () => void;
    openCard: boolean;
    setOpenCard: Dispatch<SetStateAction<boolean>>;
}

const EDIT_TYPE_DRAWER = 'drawer';
const EDIT_TYPE_CARD = 'card';

export const TrainingTable = ({openDrawer, openCard, setOpenCard}: TrainingTableProps) => {
    const dispatch = useAppDispatch();
    const {userTraining} = useAppSelector(selectTrainingData);
    const [selectedTraining, setSelectedTraining] = useState<UserTraining>();

    const userTrainingList = Object.values(userTraining).flatMap((trainingsArray) => trainingsArray);

    const handleCloseTrainingCard = () => setOpenCard(false);

    const onClickEdit = (record: UserTraining, type = EDIT_TYPE_DRAWER) => {
        const editDate = moment(record.date).toISOString();

        setSelectedTraining(record);
        dispatch(setTrainingMode(TrainingMode.EDIT));
        dispatch(setExercises(record.exercises));
        dispatch(setCreatedTraining({
            _id: record._id,
            name: record.name,
            date: editDate,
            parameters: record.parameters
        }));

        if (type === EDIT_TYPE_CARD) {
            setOpenCard(true);

            return;
        }

        openDrawer();
    }

    const columns: ColumnsType<UserTraining> = [
        {
            title: 'Тип тренировки',
            dataIndex: 'trainingType',
            key: 'trainingType',
            render: (_, record) => (
                <div className={styles.cellContent}>
                    <TrainingBadge training={record.name}/>
                    <Button
                        type='link'
                        onClick={() => onClickEdit(record, EDIT_TYPE_CARD)}
                    >
                        <DownOutlined/>
                    </Button>
                    {
                        openCard && record?._id === selectedTraining?._id &&
                        <TrainingCard
                            selectedTraining={record}
                            openDrawer={openDrawer}
                            closeCard={handleCloseTrainingCard}
                        />
                    }
                </div>
            ),
        },
        {
            title: 'Периодичность',
            dataIndex: 'periodicity',
            key: 'periodicity',
            width: '45%',
            render: (_, record) => <div>{getPeriodicityLabel(record.parameters?.period)}</div>,
            sorter: (a, b) => (a.parameters?.period ?? 0) - (b.parameters?.period ?? 0),
        },
        {
            title: '',
            dataIndex: 'edit',
            key: 'edit',
            width: '5%',
            render: (_text, record, i) => (
                <Button
                    type='link'
                    disabled={record.isImplementation}
                    onClick={() => onClickEdit(record)}
                    data-test-id={`update-my-training-table-icon${i}`}
                >
                    <EditOutlined style={{fontSize: '25px'}}/>
                </Button>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Table
                size='small'
                columns={columns}
                dataSource={userTrainingList}
                pagination={userTrainingList.length > 10 && {position: ['bottomLeft']}}
                className={styles.trainingTable}
                data-test-id='my-trainings-table'
            />
            <Button
                size='large'
                type='primary'
                onClick={openDrawer}
                icon={<PlusOutlined/>}
                data-test-id='create-new-training-button'
            >
                Новая тренировка
            </Button>
        </React.Fragment>
    )
}
