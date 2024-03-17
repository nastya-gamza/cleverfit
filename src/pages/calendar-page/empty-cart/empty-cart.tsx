import {Empty} from 'antd';

export const EmptyCart = () => {
    return (
        <Empty
            image="/img/empty-image.svg"
            imageStyle={{
                width: 32,
                height: 32,
                margin: '36px auto 16px',
            }}
            description={null}
        >
        </Empty>
    )
}
