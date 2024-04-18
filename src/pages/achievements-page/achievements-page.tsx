import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {MonthAchievements} from '@pages/achievements-page/month-achievements';
import {WeekAchievements} from '@pages/achievements-page/week-achievements/week-achievements.tsx';
import {useGetTrainingListQuery, useGetUserTrainingsQuery} from '@redux/api/training-api.ts';
import {selectIsError} from '@redux/slices/app-slice.ts';
import {Tabs} from 'antd';
import classNames from 'classnames';

import styles from './achievements-page.module.less';

import 'moment/locale/ru';

export const AchievementsPage = () => {
    const navigate = useNavigate();
    const isError = useAppSelector(selectIsError);

    useGetUserTrainingsQuery();
    useGetTrainingListQuery();

    const items = [
        {label: 'За неделю', key: 'week', children: <WeekAchievements/>},
        {label: 'За месяц', key: 'month', children: <MonthAchievements/>},
        {label: 'За всё время (PRO)', key: 'all', disabled: true,},
    ];

    useEffect(() => {
        if (isError) {
            navigate('/');
        }
    }, [isError, navigate]);

    return (
        <div className={classNames(styles.contentWrapper)}>
            <Tabs
                size='small'
                items={items}
                className={styles.tabs}
            />
        </div>
    );
};
