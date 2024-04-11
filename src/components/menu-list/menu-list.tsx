import {MENU_ITEMS} from '@constants/menu-items.tsx';
import {PATHS} from '@constants/paths.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {useRedirectNavigation} from '@hooks/use-redirect-navigation.ts';
import {selectUserJointTrainings} from '@redux/slices/invite-slice.ts';
import {Badge, Grid, Menu} from 'antd';

import styles from './menu-list.module.less'

const {Item} = Menu;
const {useBreakpoint} = Grid;

export const MenuList = () => {
    const screens = useBreakpoint();
    const {handleNavigate} = useRedirectNavigation();
    const {invitationList} = useAppSelector(selectUserJointTrainings);

    return (
        <Menu className={styles.menu} mode='inline' inlineIndent={screens.xs ? 8 : 16}>
            {MENU_ITEMS.map(({label, path, icon}) => (
                <Item
                    key={label}
                    onClick={() => handleNavigate(path)}
                    icon={
                        path === PATHS.training ? (
                            !screens.xs &&
                            <Badge
                                count={invitationList.length}
                                size='small'
                                data-test-id='notification-about-joint-training'
                            >
                                {icon}
                            </Badge>
                        ) : (
                            !screens.xs && icon
                        )
                    }
                >
                    {label}
                </Item>
            ))}
        </Menu>
    )
}
