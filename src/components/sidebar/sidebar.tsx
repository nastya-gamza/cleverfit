import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {push} from 'redux-first-history';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {MenuList} from '@components/menu-list';
import {PATHS} from '@constants/paths.ts';
import {useAppDispatch} from '@hooks/typed-react-redux-hooks.ts';
import ExitIcon from '@public/icons/exit.svg?react';
import Logo from '@public/icons/logo.svg?react';
import LogoMobile from '@public/icons/logo-mobile.svg?react';
import LogoMini from '@public/icons/logo-sm.svg?react';
import {logout} from '@redux/slices/auth-slice.ts';
import {Button, Divider, Grid, Layout} from 'antd';

import {useSidebarContext} from '../../context/sidebar/use-sidebar-context.ts';

import styles from './sidebar.module.less'

const {Sider} = Layout;
const {useBreakpoint} = Grid;

export const SideBar = () => {
    const {collapsed, setCollapsed, toggleCollapsed} = useSidebarContext();
    const screens = useBreakpoint();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch(logout());
        dispatch(push(PATHS.auth))
    };

    useEffect(() => {
        if (!screens.sm) {
            setCollapsed(true);

            return;
        }

        setCollapsed(false);
    }, [screens.sm, setCollapsed]);

    return (
        <div className={styles.wrapper} data-collapsed={collapsed}>
            <Sider
                collapsible={true}
                collapsed={collapsed}
                trigger={null}
                collapsedWidth={screens.xs ? 0 : 64}
                width={screens.xs ? 106 : 208}
                className={styles.sidebar}
            >
                <div className={styles.logoWrapper}>
                    <Link to='/' className={styles.logo}>
                        {collapsed ? <LogoMini/> : <Logo/>}
                    </Link>
                    <Link to='/' className={styles.mobile}>
                        <LogoMobile/>
                    </Link>
                </div>
                <MenuList/>
            </Sider>
            <div>
                <Divider className={styles.divider}/>
                <Button
                    onClick={handleLogout}
                    className={styles.exitBtn}
                    type='link'
                    icon={screens.xs ? '' : <ExitIcon/>}>
                    {!collapsed && 'Выход'}
                </Button>
            </div>
            <div className={styles.toggler}>
                <Button
                    type='default'
                    onClick={toggleCollapsed}
                    data-test-id={screens.xs ? 'sider-switch-mobile' : 'sider-switch'}
                    icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>} />
            </div>
        </div>

    )
}
