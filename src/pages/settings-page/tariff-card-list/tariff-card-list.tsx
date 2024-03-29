import React, {useState} from 'react';
import {DDMM} from '@constants/date-formates.ts';
import {TARIFFS} from '@constants/tariffs.ts';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {TariffCard} from '@pages/settings-page/tariff-card';
import {TariffsDrawer} from '@pages/settings-page/tariffs-drawer/tariffs-drawer.tsx';
import {selectProfileInfo} from '@redux/slices/profile-slice.ts';
import moment from 'moment';

import styles from './tariff-card-list.module.less';

export const TariffCardList = () => {
    const [openTariffDrawer, setOpenTariffDrawer] = useState(false);

    const {tariff: userTariff} = useAppSelector(selectProfileInfo);

    const formattedDate = moment(userTariff?.expired)?.format(DDMM);

    const handleOpenDrawer = () => {
        setOpenTariffDrawer(true);
    }

    const handleCloseDrawer = () => {
        setOpenTariffDrawer(false);
    }

    return (
        <React.Fragment>
            <div className={styles.cardsWrapper}>
                {TARIFFS.map(({title, img, isPro, dataTestId}) => {
                    const coverPro = !userTariff && isPro;

                    return (
                        <TariffCard
                            key={title}
                            title={title}
                            img={img}
                            dataTestId={dataTestId}
                            handleOpen={(handleOpenDrawer)}
                            coverPro={coverPro}
                            userTariff={userTariff}
                            date={formattedDate}
                        />
                    );
                })}
            </div>
            <TariffsDrawer
                open={openTariffDrawer}
                close={handleCloseDrawer}
                proTariff={userTariff}
                date={formattedDate}
            />
        </React.Fragment>

    )
}
