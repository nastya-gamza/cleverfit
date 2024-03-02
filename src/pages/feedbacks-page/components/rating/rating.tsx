import { Rate, RateProps } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { createElement } from 'react';

export const Rating = (props: RateProps) => (
    <Rate
        character={({ index = 0, value = 0 }) =>
            createElement(index + 1 <= value ? StarFilled : StarOutlined, {
                style: { width: 20, height: 'auto', color: '#FAAD14' },
            })
        }
        {...props}
    />
);
