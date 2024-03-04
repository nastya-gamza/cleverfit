import {useLocation} from 'react-router-dom';
import {Layout, Typography, Grid, Breadcrumb, Button} from 'antd';
import {SettingOutlined} from '@ant-design/icons';
import {BreadcrumbItems,} from '@components/page-header/breadcrumb-items/breadcrumb-items.tsx';
import styles from './page-header.module.less';
import {PATHS} from '@constants/paths.ts';

const {Title} = Typography;
const {Header} = Layout;
const {useBreakpoint} = Grid;

export const PageHeader = () => {
    const screens = useBreakpoint();
    const breadcrumbItems = BreadcrumbItems();
    const location = useLocation();

    return (
        <Header className={styles.header}>
            <Breadcrumb className={styles.breadcrumbItems}>
                {breadcrumbItems}
            </Breadcrumb>
            {location.pathname === PATHS.main && (
                <div className={styles.wrapper}>
                    <Title>Приветствуем тебя в{'\u00A0'}CleverFit{'\u00A0'}— приложении, <br/>
                        которое поможет тебе добиться своей мечты!
                    </Title>
                    <Button
                        icon={<SettingOutlined/>}
                        type='link'
                        className={styles.link}
                    >
                        {screens.xs ? '' : 'Настройки'}
                    </Button>
                </div>
            )}
        </Header>
    );
}
