import {DDDD} from '@constants/date-formates.ts';
import styles from '@pages/achievements-page/average-load-list/average-load-list.module.less';
import {Badge, List, Typography} from 'antd';
import classNames from 'classnames';
import moment from 'moment';

const {Text} = Typography;

type WeekAverageLoadListProps = {
    averageLoadByDayOfWeek: Array<{ date: string, value: number }>,
}

export const WeekAverageLoadList = ({averageLoadByDayOfWeek}: WeekAverageLoadListProps) => (
        <div>
            <Text>Средняя силовая нагрузка по дням недели</Text>
            <List
                dataSource={averageLoadByDayOfWeek}
                renderItem={(el, i) => (
                    <List.Item>
                        <Badge
                            count={i + 1}
                            text={
                                <Text type='secondary' className={styles.weekDay}>
                                    {moment(el.date).format(DDDD)}
                                </Text>
                            }
                            className={classNames(styles.badge, {[styles.badgeLight]: !el.value})}
                        />
                        <Text strong={true}>
                            {el.value ? `${el.value} кг` : ''}
                        </Text>
                    </List.Item>
                )}
                split={false}
                className={styles.list}
            />
        </div>
    )
