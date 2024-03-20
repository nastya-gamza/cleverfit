import {Empty} from 'antd';
import EmptyIcon from '@public/icons/empty-cart.svg?react';

export const EmptyCart = () => {
    return (
        <Empty
            image={<EmptyIcon/>}
            description={null}
        >
        </Empty>
    )
}
