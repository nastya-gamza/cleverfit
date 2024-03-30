import {ActionCard,InfoCard} from '@components/card';
import {ACTIONS} from '@constants/actions.tsx';
import {FEATURES_LIST} from '@constants/features-list.ts';
import {useRedirectNavigation} from '@hooks/use-redirect-navigation.ts';
import {Button, List, Space, Typography} from 'antd';

import styles from './page-main-content.module.less'

const {Title, Paragraph} = Typography;

export const PageMainContent = () => {

    const {handleNavigate} = useRedirectNavigation();

    return (
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
                                <Button
                                    type='link'
                                    onClick={()=>handleNavigate(item.path)}
                                    className={styles.btn}
                                    data-test-id={item.dataTestId}
                                >
                                    {item.icon} {item.name}
                                </Button>
                            </ActionCard>
                        </List.Item>
                    )}
                />
            </Space>
        </div>
    )
}
