import {Layout, List, Space, Typography} from 'antd';
import {InfoCard} from '@components/card';
import {ActionCard} from '@components/card';
import {FEATURES_LIST} from '../../contants/features-list.ts';
import {ACTIONS} from '../../contants/actions.tsx';
import styles from './page-main-content.module.less'

const {Content} = Layout;
const {Title, Paragraph} = Typography;

export const PageMainContent = () => (
    <Content className={styles.content}>
        <div className={styles.wrapper}>
            <Space direction={'vertical'} size={24}>
                <InfoCard className={styles['features-card']}>
                    <Paragraph>С CleverFit ты сможешь:</Paragraph>
                    <List
                        dataSource={FEATURES_LIST}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                </InfoCard>
                <InfoCard className={styles['info-card']}>
                    <Title level={4}>
                        CleverFit — это не просто приложение, а твой личный помощник в&nbsp;мире
                        фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                    </Title>
                </InfoCard>
                <List
                    className={styles['action-list']}
                    grid={{gutter: 16, column: 3, xs: 1,}}
                    dataSource={ACTIONS}
                    renderItem={item => (
                        <List.Item>
                            <ActionCard className={styles['action-card']}
                                        title={item.action}>{item.icon} {item.name}</ActionCard>
                        </List.Item>
                    )}
                />
            </Space>
        </div>
    </Content>
);
