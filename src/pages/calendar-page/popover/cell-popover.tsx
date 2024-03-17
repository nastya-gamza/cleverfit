import {Popover, PopoverProps} from 'antd';
import {Dispatch, ReactNode, SetStateAction} from 'react';

type CellPopoverProps = PopoverProps & {
    isLeft: boolean,
    isOpen: boolean,
    onOpenChange: Dispatch<SetStateAction<boolean>>,
    children: ReactNode,
}

export const CellPopover = ({
                                isLeft,
                                isOpen,
                                onOpenChange,
                                children,
                                ...props
                            }: CellPopoverProps) => {
    return (
        <Popover
            placement={isLeft ? 'topLeft' : 'topRight'}
            showArrow={false}
            destroyTooltipOnHide
            overlayInnerStyle={{width: 0, height: 0}}
            open={isOpen}
            onOpenChange={onOpenChange}
            zIndex={50}
            trigger='focus'
            {...props}
        >
            {children}
        </Popover>
    )
}
