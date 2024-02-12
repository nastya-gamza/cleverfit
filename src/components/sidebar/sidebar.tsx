import {Link} from 'react-router-dom';
import {useWindowSize} from 'usehooks-ts'
import {useSidebarContext} from '../../context/sidebar/use-sidebar-context.ts';
import {Button, Divider, Layout} from 'antd';
import {MenuList} from '@components/menu-list';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import Logo from '@public/icons/logo.svg?react';
import LogoMini from '@public/icons/logo-sm.svg?react';
import LogoMobile from '@public/icons/logo-mobile.svg?react';
import ExitIcon from '@public/icons/exit.svg?react';
import styles from './sidebar.module.less'

const {Sider} = Layout;

export const SideBar = () => {
    const {collapsed, toggleCollapsed} = useSidebarContext();
    const {width = 0} = useWindowSize();

    return (
        <div className={styles.wrapper} data-collapsed={collapsed}>
            <Sider
                collapsible
                collapsed={collapsed}
                trigger={null}
                collapsedWidth={width > 425 ? 64 : 0}
                width={width > 425 ? 208 : 106}
                className={styles.sidebar}
            >
                <div className={styles['logo-wrapper']}>
                    <Link to={'/'} className={styles.logo}>{collapsed ? <LogoMini/> :
                        <Logo/>}</Link>
                    <Link to={'/'} className={styles.mobile}><LogoMobile/></Link>
                </div>
                <MenuList/>
            </Sider>
            <div>
                <Divider className={styles.divider}/>
                <Button className={styles['exit-btn']} type='link'
                        icon={width > 425 ? <ExitIcon/> : ''}>{!collapsed && 'Выход'}</Button>
            </div>
            <div className={styles.toggler}>
                <Button type={'default'} onClick={toggleCollapsed}
                        data-test-id={width > 425 ? 'sider-switch' : 'sider-switch-mobile'}
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}></Button>
            </div>
        </div>

    )
}
