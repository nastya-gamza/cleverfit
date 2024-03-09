import {Grid, Menu} from 'antd';
import {MENU_ITEMS} from '@constants/menu-items.tsx';
import styles from './menu-list.module.less'
import {useRedirectNavigation} from '@hooks/use-redirect-navigation.ts';

const {Item} = Menu;
const {useBreakpoint} = Grid;

export const MenuList = () => {
    const screens = useBreakpoint();
    const {handleNavigate} = useRedirectNavigation();

    return (
        <Menu className={styles.menu} mode='inline' inlineIndent={screens.xs ? 8 : 16}>
            {MENU_ITEMS.map(({label, path, icon}) => (
                <Item
                    key={label}
                    onClick={()=>handleNavigate(path)}
                    icon={!screens.xs && icon}>{label}
                </Item>
            ))}
        </Menu>
    )
}
