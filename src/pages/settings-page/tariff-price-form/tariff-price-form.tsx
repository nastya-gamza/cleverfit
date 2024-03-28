import {Dispatch, SetStateAction, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {useBuyNewTariffMutation} from '@redux/api/settings-api.ts';
import {selectTariffList, setShowSuccessModal} from '@redux/slices/settings-slice.ts';
import {Form, Radio, Space, Typography} from 'antd';

import styles from './tariff-price-form.module.less';

export const TariffPriceForm = ({setIsDisabledBtn, closeDrawer}: {
    setIsDisabledBtn: Dispatch<SetStateAction<boolean>>
    closeDrawer: () => void;
}) => {
    const tariffItems = useAppSelector(selectTariffList);
    const [buyNewTariff] = useBuyNewTariffMutation();

    const handleChange = () => {
        setIsDisabledBtn(false);
    }

    const onFinish = ({days}: { days: number }) => {
        buyNewTariff({days, tariffId: tariffItems[0]._id});
        closeDrawer();
    }

    return (
        <Form
            id='form'
            onFinish={onFinish}
            className={styles.priceForm}
            data-test-id='tariff-cost'
        >
            <Form.Item name='days' className={styles.priceFields}>
                <Radio.Group onChange={handleChange}>
                    <Space direction="vertical" size={16} className={styles.radioBtnWrapper}>
                        {tariffItems[0].periods.map(({text, cost, days}) => {
                            const formattedPrice = cost.toLocaleString('ru-RU', {
                                style: 'currency',
                                currency: 'USD',
                                maximumSignificantDigits: 2
                            })

                            return (
                                <Radio value={days} key={cost} data-test-id={`tariff-${cost}`}>
                                    <div className={styles.label}>
                                        <Typography.Text>{text}</Typography.Text>
                                        <Typography.Title level={5}>
                                            {formattedPrice}
                                        </Typography.Title>
                                    </div>
                                </Radio>
                            )
                        })}
                    </Space>
                </Radio.Group>
            </Form.Item>
        </Form>
    )
}
