import { CheckOutlined } from '@ant-design/icons';
import {Button, Card, Typography} from 'antd';

import styles from './tariff-card.module.less';

export type TariffCardProps = {
    title: string;
    img: string;
    dataTestId: string;
    handleOpen: () => void;
    coverPro: boolean;
    userTariff: {tariffId: string, expired: string};
    date: string;
}

export const TariffCard = ({title, img, dataTestId, handleOpen, coverPro, userTariff, date}: TariffCardProps) => (
    <Card
        className={styles.card}
        title={title}
        extra={
            <Button type='link' onClick={handleOpen}>
                Подробнее
            </Button>
        }
        key={title}
        hoverable={false}
        data-test-id={dataTestId}
        cover={
            <div className={coverPro ? styles.inactive : ''}>
                <img alt={title} src={img}/>
            </div>
        }
    >
        {!coverPro && (
            <div className={styles.active}>
                <Typography.Title level={5}>
                    активен
                    {userTariff &&
                        title.includes('PRO') && `до ${date}`
                    }
                </Typography.Title>
                {title.includes('FREE') && <CheckOutlined/>}
            </div>
        )}
        {coverPro && (
            <Button
                data-test-id='activate-tariff-btn'
                type='primary'
                onClick={handleOpen}
                size='large'
            >
                Активировать
            </Button>
        )}
    </Card>
)
