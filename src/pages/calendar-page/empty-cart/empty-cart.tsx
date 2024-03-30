import EmptyIcon from '@public/icons/empty-cart.svg?react';
import {Empty} from 'antd';

export const EmptyCart = () => (
    <Empty
        image={<EmptyIcon/>}
        description={null}
    />
)
