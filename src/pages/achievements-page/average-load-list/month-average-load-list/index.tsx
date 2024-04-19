import {Badge, Collapse, Grid, List, Typography} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import moment from 'moment';
import classNames from 'classnames';
import styles from '@pages/achievements-page/average-load-list/average-load-list.module.less';
import {getStartAndEndDates} from '@utils/achievements/get-start-and-end-dates.ts';
import React, {useEffect, useState} from 'react';

const {Panel} = Collapse;
const {Text} = Typography;

const {useBreakpoint} = Grid;

type MonthAverageLoadListProps = {
    averageLoadByWeek: { date: string, value: number }[][],
}

export const MonthAverageLoadList = ({averageLoadByWeek}: MonthAverageLoadListProps) => {
    const screens = useBreakpoint();
    const [isFullScreen, setIsFullScreen] = useState(true);

    useEffect(() => {
        if (!screens.sm) {
            setIsFullScreen(false);
        } else {
            setIsFullScreen(true)
        }
    }, [screens.sm]);
    const startAndEndDates = getStartAndEndDates(averageLoadByWeek);

    return (
        <React.Fragment>
            {isFullScreen ? (
                averageLoadByWeek.map(columnData => (
                    <List
                        dataSource={columnData}
                        renderItem={(el, i) => (
                            <List.Item>
                                <Badge
                                    count={i + 1}
                                    text={
                                        <Text type='secondary'>
                                            {moment(el.date).format('DD.MM.YYYY')}
                                        </Text>
                                    }
                                    className={classNames(styles.badge, {[styles.badgeLight]: !el.value})}
                                />
                                <Text strong={true}>{el.value ? `${el.value} кг` : ''}</Text>
                            </List.Item>
                        )}
                        split={false}
                        className={styles.list}
                    />
                ))
            ) : (
                <Collapse
                    accordion={true}
                    bordered={false}
                    expandIconPosition='end'
                    ghost={true}
                    expandIcon={({isActive}) => <DownOutlined rotate={isActive ? 180 : 0}/>}
                >
                    {averageLoadByWeek.map((columnData, i) => (
                        <Panel
                            key={i}
                            header={Object.values(startAndEndDates[i])}
                            showArrow={true}
                            collapsible="header"
                        >
                            <List
                                dataSource={columnData}
                                renderItem={(el, i) => (
                                    <List.Item>
                                        <Badge
                                            count={i + 1}
                                            text={
                                                <Text type='secondary'>
                                                    {moment(el.date).format('DD.MM.YYYY')}
                                                </Text>
                                            }
                                            className={classNames(styles.badge, {[styles.badgeLight]: !el.value})}
                                        />
                                        <Text strong={true}>{el.value ? `${el.value} кг` : ''}</Text>
                                    </List.Item>
                                )}
                                split={false}
                                className={styles.list}
                            />
                        </Panel>
                    ))}
                </Collapse>
            )}
        </React.Fragment>
    );
}