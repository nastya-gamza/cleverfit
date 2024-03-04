import {Link} from 'react-router-dom';
import {List, Space, Typography} from 'antd';
import {InfoCard} from '@components/card';
import {ActionCard} from '@components/card';
import {FEATURES_LIST} from '@constants/features-list.ts';
import {ACTIONS} from '@constants/actions.tsx';
import styles from './page-main-content.module.less'

const {Title, Paragraph} = Typography;

export const PageMainContent = () => (
    <div className={styles.wrapper}>
        <Space direction='vertical' size={24}>
            <InfoCard className={styles.featuresCard}>
                <Paragraph>С CleverFit ты сможешь:</Paragraph>
                <List
                    dataSource={FEATURES_LIST}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                />
            </InfoCard>
            <InfoCard className={styles.infoCard}>
                <Title level={4}>
                    CleverFit — это не просто приложение, а твой личный помощник в&nbsp;мире
                    фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                </Title>
            </InfoCard>
            <List
                className={styles.actionList}
                grid={{gutter: 16, column: 3, xs: 1}}
                dataSource={ACTIONS}
                renderItem={item => (
                    <List.Item>
                        <ActionCard className={styles.actionCard} title={item.action}>
                            <Link to={item.path}>{item.icon} {item.name}</Link>
                        </ActionCard>
                    </List.Item>
                )}
            />
        </Space>
    </div>
);
