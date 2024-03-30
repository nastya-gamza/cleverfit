import {Outlet, useLocation} from 'react-router-dom';
import {PageHeader} from '@components/page-header';
import {SideBar} from '@components/sidebar';
import {PATHS} from '@constants/paths.ts';
import {Layout} from 'antd';

import {useSidebarContext} from '../../../context/sidebar/use-sidebar-context.ts';

import styles from './main-layout.module.less';

const {Content} = Layout;

export const MainLayout = () => {
    const {collapsed} = useSidebarContext();
    const {pathname} = useLocation();

    const pagesLayouts: Record<string, string> = {
        [PATHS.calendar]: styles.calendarLayout,
        [PATHS.settings]: styles.settingsLayout,
    };

    const layoutClass = pagesLayouts[pathname] || styles.layout;

    return (
        <Layout className={layoutClass}>
            <SideBar/>
            <Layout className={collapsed ? styles.close : styles.open}>
                <PageHeader/>
                <Content className={styles.content}><Outlet/></Content>
            </Layout>
        </Layout>
    )
}
