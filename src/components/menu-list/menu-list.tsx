import {useWindowSize} from 'usehooks-ts';
import {Menu} from 'antd';
import {MENU_ITEMS} from '../../contants/menu-items.tsx';
import styles from './menu-list.module.less'

const {Item} = Menu;

export const MenuList = () => {
    const {width = 0} = useWindowSize();

    return (
        <Menu className={styles.menu} mode='inline' inlineIndent={width > 425 ? 16 : 8}>
            {MENU_ITEMS.map((item) => (
                <Item key={item.label} icon={width > 425 ? item.icon : ''}>{item.label}</Item>
            ))}
        </Menu>
    )
}
