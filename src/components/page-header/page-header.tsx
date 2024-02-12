import {Link} from 'react-router-dom';
import {useWindowSize} from 'usehooks-ts';
import {Layout, Typography} from 'antd';
import {SettingOutlined} from '@ant-design/icons';
import styles from '@components/page-header/page-header.module.less';

const {Title} = Typography;
const {Header} = Layout;

export const PageHeader = () => {
    const {width = 0} = useWindowSize();

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
                                className={styles.settings}/> {width > 425 ? 'Настройки' : ''}
                        </span>
                    }
                </Link>
            </div>
        </Header>
    )
}
