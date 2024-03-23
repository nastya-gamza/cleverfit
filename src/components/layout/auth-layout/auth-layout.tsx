import {Outlet} from 'react-router-dom';
import {Layout} from 'antd';

import styles from './auth-layout.module.less';

export const AuthLayout = () => (
    <Layout className={styles.layout}>
        <Outlet/>
    </Layout>
)
