import {Grid, Menu} from 'antd';
import {MENU_ITEMS} from '@constants/menu-items.tsx';
import styles from './menu-list.module.less'

const {Item} = Menu;
const { useBreakpoint } = Grid;

export const MenuList = () => {
    const screens = useBreakpoint();

    return (
        <Menu className={styles.menu} mode='inline' inlineIndent={screens.xs ? 8 : 16}>
            {MENU_ITEMS.map((item) => (
                <Item key={item.label} icon={screens.xs ? '' : item.icon}>{item.label}</Item>
            ))}
        </Menu>
    )
}
