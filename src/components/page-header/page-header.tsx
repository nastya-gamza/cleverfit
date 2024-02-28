import {Link} from 'react-router-dom';
import {Layout, Typography, Grid} from 'antd';
import {SettingOutlined} from '@ant-design/icons';
import styles from './page-header.module.less';

const {Title} = Typography;
const {Header} = Layout;
const { useBreakpoint } = Grid;

export const PageHeader = () => {
    const screens = useBreakpoint();

    return (
        <Header className={styles.header}>
            <Link to={'/'}>Главная</Link>
            <div className={styles.wrapper}>
                <Title>Приветствуем тебя в{'\u00A0'}CleverFit{'\u00A0'}— приложении, <br/> которое
                    поможет тебе добиться своей мечты!
                </Title>
                <Link to={'settings'}>
                    {
                        <span className={styles.link}>
                            <SettingOutlined
                                className={styles.settings}/> {screens.xs ? '' : 'Настройки'}
                        </span>
                    }
                </Link>
            </div>
        </Header>
    )
}
