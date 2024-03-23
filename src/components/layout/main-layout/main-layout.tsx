import {Outlet} from 'react-router-dom';
import {PageHeader} from '@components/page-header';
import {SideBar} from '@components/sidebar';
import {Layout} from 'antd';

import {useSidebarContext} from '../../../context/sidebar/use-sidebar-context.ts';

import styles from './main-layout.module.less';

const {Content} = Layout;

export const MainLayout = () => {
    const {collapsed} = useSidebarContext();

    return (
        <Layout className={styles.layout}>
            <SideBar/>
            <Layout className={collapsed ? styles.close : styles.open}>
                <PageHeader/>
                <Content className={styles.content}><Outlet/></Content>
            </Layout>
        </Layout>
    )
}
