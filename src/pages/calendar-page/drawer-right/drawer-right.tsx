import {ReactNode} from 'react';
import {CloseOutlined} from '@ant-design/icons';
import {Button, Drawer} from 'antd';

import styles from './drawer-right.module.less';

type DrawerRightProps = {
    title: string;
    open: boolean;
    close: () => void;
    isFullScreen: boolean;
    closeIcon: ReactNode;
    children: ReactNode;
}

export const DrawerRight = ({
                                title,
                                open,
                                close,
                                closeIcon,
                                isFullScreen,
                                children
                            }: DrawerRightProps) => (
    <Drawer
        title={title}
        placement={isFullScreen ? 'right' : 'bottom'}
        destroyOnClose={true}
        closable={true}
        zIndex={100}
        open={open}
        closeIcon={closeIcon}
        width={408}
        maskStyle={{background: 'transparent'}}
        className={styles.drawer}
        onClick={(e) => e.stopPropagation()}
        data-test-id='modal-drawer-right'
        extra={
            <Button
                data-test-id='modal-drawer-right-button-close'
                type='text'
                size='middle'
                icon={<CloseOutlined/>}
                onClick={close}
            />
        }
    >
        {children}
    </Drawer>
)
