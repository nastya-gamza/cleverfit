import {useLocation, useNavigate} from 'react-router-dom';
import {ArrowLeftOutlined, SettingOutlined} from '@ant-design/icons';
import {BreadcrumbItems,} from '@components/page-header/breadcrumb-items/breadcrumb-items.tsx';
import {PATHS} from '@constants/paths.ts';
import {Breadcrumb, Button, Grid, Layout, Typography} from 'antd';
import classNames from 'classnames';

import styles from './page-header.module.less';

const {Title} = Typography;
const {Header} = Layout;
const {useBreakpoint} = Grid;

export const PageHeader = () => {
    const screens = useBreakpoint();
    const navigate = useNavigate();
    const breadcrumbItems = BreadcrumbItems();
    const {pathname} = useLocation();

    const isPathMain = pathname === PATHS.main;
    const isPathCalendar = pathname === PATHS.calendar;
    const isPathFeedbacks = pathname === PATHS.feedbacks;
    const isPathProfile = pathname === PATHS.profile;
    const isPathSettings = pathname === PATHS.settings;
    const isPathTraining = pathname === PATHS.training;


    return (
        <Header className={styles.header}>
            {(isPathMain ||
                    isPathCalendar ||
                    isPathFeedbacks ||
                    isPathTraining) &&
                <Breadcrumb className={styles.breadcrumbItems}>
                    {breadcrumbItems}
                </Breadcrumb>
            }
            {isPathProfile && (<Title level={4} className={styles.profile}>Профиль</Title>)}
            {isPathSettings && (
                <Button
                    data-test-id='settings-back'
                    type='text'
                    className={styles.settings}
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeftOutlined/>
                    <Typography.Title level={4}>Настройки</Typography.Title>
                </Button>
            )}
            <div className={styles.wrapper}>
                {isPathMain && (
                    <Title>Приветствуем тебя в{'\u00A0'}CleverFit{'\u00A0'}— приложении, <br/>
                        которое поможет тебе добиться своей мечты!
                    </Title>
                )}
                {(!isPathFeedbacks && !isPathSettings) && (
                    <Button
                        icon={<SettingOutlined/>}
                        type='link'
                        className={classNames(styles.link, {[styles.settingsBtn]: isPathMain})}
                        data-test-id='header-settings'
                        onClick={() => navigate(PATHS.settings)}
                    >
                        {screens.xs ? '' : 'Настройки'}
                    </Button>
                )}
            </div>
        </Header>
    );
}
