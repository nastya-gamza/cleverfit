import {ReactNode} from 'react';
import {CloseOutlined} from '@ant-design/icons';
import {Button, Drawer, DrawerProps} from 'antd';

import styles from './drawer-right.module.less';

type DrawerRightProps = DrawerProps & {
    title: string;
    open: boolean;
    close: () => void;
    isFullScreen: boolean;
    children: ReactNode;
    dataTestId: string;
    closeIcon?: ReactNode;
}

export const DrawerRight = ({
                                title,
                                open,
                                close,
                                closeIcon,
                                isFullScreen,
                                children,
                                dataTestId,
                                ...props
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
        data-test-id={dataTestId}
        extra={
            <Button
                data-test-id='modal-drawer-right-button-close'
                type='text'
                size='middle'
                icon={<CloseOutlined/>}
                onClick={close}
            />
        }
        {...props}
    >
        {children}
    </Drawer>
)
