import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {PartnerCard} from '@pages/training-page/joint-trainings/partner-card';
import {selectUserJointTrainings} from '@redux/slices/invite-slice.ts';
import {Button, List, Typography} from 'antd';
import Search from 'antd/es/input/Search';

import styles from './random-choice.module.less';

export const RandomChoice = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const {userJointTrainingList} = useAppSelector(selectUserJointTrainings);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const filteredData = searchValue ?
        userJointTrainingList?.filter(i => i.name.trim().toLowerCase().includes(searchValue)) :
        userJointTrainingList;

    return (
        <React.Fragment>
            <div className={styles.header}>
                <Button
                    type='text'
                    onClick={() => navigate(-1)}
                    className={styles.btnBack}
                >
                    <ArrowLeftOutlined/>
                    <Typography.Title level={4}>Назад</Typography.Title>
                </Button>
                <Search
                    placeholder='Поиск по имени'
                    onChange={e => handleSearch(e)}
                    style={{width: 484}}
                    data-test-id='search-input'
                />
            </div>
            <List
                dataSource={filteredData}
                renderItem={(partner) => (
                    <PartnerCard
                        key={partner.id}
                        name={partner.name}
                        searchValue={searchValue}
                        imageSrc={partner.imageSrc}
                        trainingType={partner.trainingType}
                        avgWeightInWeek={partner.avgWeightInWeek}
                    />
                )}
                pagination={
                    filteredData.length > 12 && {
                        pageSize: 12,
                        size: 'small',
                    }
                }
                className={styles.list}
            />
        </React.Fragment>
    )
}
