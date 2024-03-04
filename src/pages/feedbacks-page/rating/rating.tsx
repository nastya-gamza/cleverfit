import {Rate} from 'antd';
import {StarFilled, StarOutlined} from '@ant-design/icons';

export const Rating = ({...props}) => (
    <Rate
        character={({value = 0, index = 0}) => {
            const Star = index + 1 <= value ? StarFilled : StarOutlined;
            return <Star style={{width: 20, color: '#FAAD14'}}/>;
        }}
        {...props}
    />
);
