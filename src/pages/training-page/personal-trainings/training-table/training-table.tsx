import React, {Dispatch, SetStateAction,useState} from 'react';
import {DownOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {periodicityOptions} from '@constants/periodicity-options.ts';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {TrainingBadge} from '@pages/calendar-page/training-badge/training-badge.tsx';
import {
    selectCreatedTraining,
    selectTrainingData, setCreatedTraining,
    setExercises,
} from '@redux/slices/training-slice.ts';
import {UserTraining} from '@redux/types/training.ts';
import {isOldDate} from '@utils/check-date.ts';
import {Button, Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import moment from 'moment';

import styles from './training-table.module.less';

export type TrainingTableProps = {
    openDrawer: () => void;
    setEditingTrainingName: Dispatch<SetStateAction<string>>
}

const getTrainingPeriod = (period: number | null | undefined) => periodicityOptions.find((option) => option.value === period)?.label ?? '';

export const TrainingTable = ({openDrawer, setEditingTrainingName}: TrainingTableProps) => {
    const dispatch = useAppDispatch();
    const {userTraining} = useAppSelector(selectTrainingData);
    const [openEditCard, setOpenEditCard] = useState(false);
    const {date} = useAppSelector(selectCreatedTraining);


    const onClickEdit = (record: UserTraining) => {
        const editDate = moment(record.date).toISOString();

        openDrawer();
        setOpenEditCard(true);
        setEditingTrainingName(record.name);
        dispatch(setExercises(record.exercises));
        dispatch(setCreatedTraining({_id: record._id, name: record.name, date: editDate, parameters: record.parameters}))
    }


    const columns: ColumnsType<UserTraining> = [
        {
            title: 'Тип тренировки',
            dataIndex: 'trainingType',
            key: 'trainingType',
            render: (_, record) => (
                <div
                    style={{display: 'flex', justifyContent: 'space-between'}}
                >
                    <TrainingBadge training={record.name}/>

                    <Button
                        type='link'
                        onClick={() => setOpenEditCard(true)}
                        disabled={isOldDate(date)}
                    >
                        <DownOutlined/>
                    </Button>
                </div>
            ),
        },
        {
            title: 'Периодичность',
            dataIndex: 'periodicity',
            key: 'periodicity',
            width: '45%',
            render: (_, record) => <div>{getTrainingPeriod(record.parameters?.period)}</div>,
            sorter: (a, b) => (a.parameters?.period || 0) - (b.parameters?.period || 0),
        },
        {
            title: '',
            dataIndex: 'edit',
            key: 'edit',
            width: '5%',
            render: (_text, record, index) => (
                <Button
                    type='link'
                    disabled={record.isImplementation}
                    onClick={() => onClickEdit(record)}
                    className={styles.editPen}
                    data-test-id={`update-my-training-table-icon${index}`}
                >
                    <EditOutlined style={{fontSize: '25px'}}/>
                </Button>
            ),
        },
    ];

    const userTrainingList = Object.values(userTraining).flatMap((trainingsArray) => trainingsArray);

    return (
        <React.Fragment>
            <Table
                columns={columns}
                dataSource={userTrainingList}
                size='small'
                pagination={{position: ['bottomLeft', 'bottomLeft']}}
                className={styles.trainingTable}
                data-test-id='my-trainings-table'
            />
            <Button
                type='primary'
                size='large'
                onClick={openDrawer}
                icon={<PlusOutlined/>}
                data-test-id='create-new-training-button'
            >
                Новая тренировка
            </Button>
        </React.Fragment>

    )
}
