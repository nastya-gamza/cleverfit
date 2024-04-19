import React, {useEffect, useState} from 'react';
import {DownOutlined} from '@ant-design/icons';
import styles from '@pages/achievements-page/average-load-list/average-load-list.module.less';
import {getStartAndEndDates} from '@utils/achievements/get-start-and-end-dates.ts';
import {Badge, Collapse, Grid, List, Typography} from 'antd';
import classNames from 'classnames';
import moment from 'moment';

const {Panel} = Collapse;
const {Text} = Typography;

const {useBreakpoint} = Grid;

type MonthAverageLoadListProps = {
    averageLoadByWeek: Array<Array<{ date: string, value: number }>>,
}

export const MonthAverageLoadList = ({averageLoadByWeek}: MonthAverageLoadListProps) => {
    const screens = useBreakpoint();
    const [isFullScreen, setIsFullScreen] = useState(true);

    const startAndEndDates = getStartAndEndDates(averageLoadByWeek);

    useEffect(() => {
        if (!screens.sm) {
            setIsFullScreen(false);
        } else {
            setIsFullScreen(true)
        }
    }, [screens.sm]);

    return (
        <React.Fragment>
            {isFullScreen ? (
                averageLoadByWeek.map((columnData, i) => (
                    <div className={styles.weekColumn}>
                        <Text>{startAndEndDates[i]}</Text>
                        <List
                            key={i}
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
                    </div>
                ))
            ) : (
                <Collapse
                    bordered={false}
                    expandIconPosition='end'
                    ghost={true}
                    expandIcon={({isActive}) => <DownOutlined rotate={isActive ? 180 : 0}/>}
                >
                    {averageLoadByWeek.map((columnData, i) => (
                        <Panel
                            key={i}
                            showArrow={true}
                            header={startAndEndDates[i]}
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
