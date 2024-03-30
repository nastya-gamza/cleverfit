import {Dispatch, ReactNode, SetStateAction} from 'react';
import {Popover, PopoverProps} from 'antd';

import styles from './cell-popover.module.less'

type CellPopoverProps = PopoverProps & {
    isLeft: boolean,
    isFullScreen: boolean,
    isOpen: boolean,
    onOpenChange: Dispatch<SetStateAction<boolean>>,
    children: ReactNode,
}

export const CellPopover = ({
                                isLeft,
                                isFullScreen,
                                isOpen,
                                onOpenChange,
                                children,
                                ...props
                            }: CellPopoverProps) => {

    const placement = () => {
        if (isFullScreen && isLeft) {
            return 'topLeft'
        }

        if (isFullScreen && !isLeft) {
            return 'topRight'
        }

        return 'bottom'
    }

    return (
        <Popover
            placement={placement()}
            showArrow={false}
            destroyTooltipOnHide={true}
            overlayInnerStyle={{width: 0, height: 0, padding: 0}}
            open={isOpen}
            overlayClassName={styles.innerContent}
            onOpenChange={onOpenChange}
            zIndex={50}
            trigger='focus'
            {...props}
        >
            {children}
        </Popover>
    )
}
