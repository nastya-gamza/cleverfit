import {useLocation} from 'react-router-dom';
import {SettingOutlined} from '@ant-design/icons';
import {BreadcrumbItems,} from '@components/page-header/breadcrumb-items/breadcrumb-items.tsx';
import {PATHS} from '@constants/paths.ts';
import {Breadcrumb, Button, Grid, Layout, Typography} from 'antd';

import styles from './page-header.module.less';

const {Title} = Typography;
const {Header} = Layout;
const {useBreakpoint} = Grid;

export const PageHeader = () => {
    const screens = useBreakpoint();
    const breadcrumbItems = BreadcrumbItems();
    const {pathname} = useLocation();

    return (
        <Header className={styles.header}>
            {(pathname === PATHS.main ||
                    pathname === PATHS.calendar ||
                    pathname === PATHS.feedbacks) &&
                <Breadcrumb className={styles.breadcrumbItems}>
                    {breadcrumbItems}
                </Breadcrumb>
            }
            {pathname === PATHS.profile && (
                <Title level={4} className={styles.profile}>Профиль</Title>
            )}

            <div className={styles.wrapper}>
                {pathname === PATHS.main && (
                    <Title>Приветствуем тебя в{'\u00A0'}CleverFit{'\u00A0'}— приложении, <br/>
                        которое поможет тебе добиться своей мечты!
                    </Title>
                )}
                {pathname !== PATHS.feedbacks && (
                    <Button
                        icon={<SettingOutlined/>}
                        type='link'
                        className={styles.link}
                    >
                        {screens.xs ? '' : 'Настройки'}
                    </Button>
                )}
            </div>

        </Header>
    );
}
