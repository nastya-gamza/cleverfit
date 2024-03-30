import {CheckOutlined} from '@ant-design/icons';
import {Button, Card, Typography} from 'antd';

import styles from './tariff-card.module.less';

export type TariffCardProps = {
    title: string;
    img: string;
    dataTestId: string;
    handleOpen: () => void;
    coverPro: boolean;
    userTariff: { tariffId: string, expired: string };
    date: string;
}

export const TariffCard = ({
                               title,
                               img,
                               dataTestId,
                               handleOpen,
                               coverPro,
                               userTariff,
                               date
                           }: TariffCardProps) => (
    <Card
        key={title}
        title={title}
        hoverable={false}
        extra={
            <Button type='link' onClick={handleOpen}>
                Подробнее
            </Button>
        }
        cover={
            <div className={coverPro ? styles.inactive : ''}>
                <img alt={title} src={img}/>
            </div>
        }
        data-test-id={dataTestId}
        className={styles.card}
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
                type='primary'
                onClick={handleOpen}
                size='large'
                data-test-id='activate-tariff-btn'
            >
                Активировать
            </Button>
        )}
    </Card>
)
