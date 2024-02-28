import {Link} from 'react-router-dom';
import {useSidebarContext} from '../../context/sidebar/use-sidebar-context.ts';
import {Button, Divider, Grid, Layout} from 'antd';
import {MenuList} from '@components/menu-list';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import Logo from '@public/icons/logo.svg?react';
import LogoMini from '@public/icons/logo-sm.svg?react';
import LogoMobile from '@public/icons/logo-mobile.svg?react';
import ExitIcon from '@public/icons/exit.svg?react';
import styles from './sidebar.module.less'
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";
import {logout} from "@redux/slices/auth-slice.ts";
import {push} from "redux-first-history";
import {PATHS} from "@constants/paths.ts";

const {Sider} = Layout;
const { useBreakpoint } = Grid;

export const SideBar = () => {
    const {collapsed, toggleCollapsed} = useSidebarContext();
    const screens = useBreakpoint();
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch(logout());
        dispatch(push(PATHS.auth))
    };

    return (
        <div className={styles.wrapper} data-collapsed={collapsed}>
            <Sider
                collapsible
                collapsed={collapsed}
                trigger={null}
                collapsedWidth={screens.xs ? 0 : 64}
                width={screens.xs ? 106 : 208}
                className={styles.sidebar}
            >
                <div className={styles.logoWrapper}>
                    <Link to={'/'} className={styles.logo}>
                        {collapsed ? <LogoMini/> : <Logo/>}
                    </Link>
                    <Link to={'/'} className={styles.mobile}>
                        <LogoMobile/>
                    </Link>
                </div>
                <MenuList/>
            </Sider>
            <div>
                <Divider className={styles.divider}/>
                <Button onClick={handleLogout} className={styles.exitBtn} type='link'
                        icon={screens.xs ? '' : <ExitIcon/>}>{!collapsed && 'Выход'}</Button>
            </div>
            <div className={styles.toggler}>
                <Button type={'default'} onClick={toggleCollapsed}
                        data-test-id={screens.xs ? 'sider-switch-mobile' : 'sider-switch'}
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}></Button>
            </div>
        </div>

    )
}
