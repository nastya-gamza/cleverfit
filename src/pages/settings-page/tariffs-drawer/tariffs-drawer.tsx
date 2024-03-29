import {useEffect, useState} from 'react';
import {CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import {TariffsComparison} from '@constants/tariffs-comparison.ts';
import {DrawerRight} from '@pages/calendar-page/drawer-right/drawer-right.tsx';
import {TariffPriceForm} from '@pages/settings-page/tariff-price-form';
import {Button, Space, Typography} from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import styles from './tariffs-drawer.module.less';

type TariffItemProps = {
    title: string;
    isFree: boolean;
}

type TariffsDrawerProps = {
    open: boolean;
    close: () => void;
    date: string;
    proTariff: { tariffId: string, expired: string };
}

export const TariffItem = ({title, isFree}: TariffItemProps) => (
    <div className={styles.itemWrapper}>
        <span>{title}</span>
        <div className={styles.icons}>
            <div>{isFree ? <CheckCircleFilled/> : <CloseCircleOutlined/>}</div>
            <div><CheckCircleFilled/></div>
        </div>
    </div>
);

export const TariffsDrawer = ({open, close, proTariff, date}: TariffsDrawerProps) => {
    const screens = useBreakpoint();
    const [isDisableBtn, setIsDisabledBtn] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(true);

    useEffect(() => {
        if (!screens.sm) {
            setIsFullScreen(false);
        } else {
            setIsFullScreen(true)
        }
    }, [screens.sm]);

    return (
        <DrawerRight
            title='Сравнить тарифы'
            open={open}
            close={close}
            closable={false}
            isFullScreen={isFullScreen}
            className={styles.drawer}
            dataTestId='tariff-sider'
            footer={
                !proTariff &&
                <Button
                    form='tarriff-form'
                    type='primary'
                    size='large'
                    block={true}
                    htmlType='submit'
                    disabled={isDisableBtn}
                    data-test-id='tariff-submit'
                >
                    Выбрать и оплатить
                </Button>
            }
        >
            {proTariff &&
                <div className={styles.expireProDate}>
                    <Typography.Title level={5}>Ваш PRO tarif активен до {date}</Typography.Title>
                </div>}
            <div className={styles.headerRow}>
                <div className={styles.free}>free</div>
                <div className={styles.pro}>pro {proTariff &&
                    <CheckCircleOutlined style={{color: '#52C41A'}}/>}</div>
            </div>
            <Space
                direction='vertical'
                size={screens.xs ? 8 : 16}
                className={styles.comparisonForm}
            >
                {TariffsComparison.map(({title, isFree}) =>
                    <TariffItem
                        key={title}
                        title={title}
                        isFree={isFree}
                    />
                )}
            </Space>
            {!proTariff &&
                <div>
                    <h6 className={styles.priceTitle}>Стоимость тарифа</h6>
                    <TariffPriceForm
                        closeDrawer={close}
                        setIsDisabledBtn={setIsDisabledBtn}
                    />
                </div>
            }
        </DrawerRight>
    )
}
