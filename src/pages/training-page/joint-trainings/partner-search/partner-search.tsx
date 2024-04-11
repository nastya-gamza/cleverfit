import React, {useState} from 'react';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {PartnerCard} from '@pages/training-page/joint-trainings/partner-card';
import {selectUserJointTrainings} from '@redux/slices/invite-slice.ts';
import {sortJointTrainingList} from '@utils/sort-joint-training-list.ts';
import {Button, List, Typography} from 'antd';
import Search from 'antd/es/input/Search';

import styles from './partner-search.module.less';

type RandomChoiceProps = {
    back: () => void;
}

export const PartnerSearch = ({back}: RandomChoiceProps) => {
    const [searchValue, setSearchValue] = useState('');
    const {userJointTrainingList} = useAppSelector(selectUserJointTrainings);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const filteredData = searchValue ?
        sortJointTrainingList(userJointTrainingList)?.filter(i =>
            i.name?.toLocaleLowerCase().trim().includes(searchValue.toLowerCase())) :
        sortJointTrainingList(userJointTrainingList);

    return (
        <React.Fragment>
            <div className={styles.header}>
                <Button
                    type='text'
                    onClick={back}
                    className={styles.btnBack}
                >
                    <ArrowLeftOutlined/>
                    <Typography.Title level={4}>Назад</Typography.Title>
                </Button>
                <Search
                    placeholder='Поиск по имени'
                    onChange={(e) => handleSearch(e)}
                    className={styles.search}
                    data-test-id='search-input'
                />
            </div>
            <List
                dataSource={filteredData}
                renderItem={(partner, i) => (
                    <PartnerCard
                        key={partner.id}
                        index={i}
                        partner={partner}
                        searchValue={searchValue}
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
