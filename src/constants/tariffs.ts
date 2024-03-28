import freeTariffImg from '@public/img/free-tariff.jpg';
import proTariffImg from '@public/img/pro-tariff.jpg';

export const TARIFFS = [
    { title: 'FREE tariff', img: freeTariffImg, dataTestId: 'free-tariff-card' },
    { title: 'PRO tariff', img: proTariffImg, dataTestId: 'pro-tariff-card', isPro: true },
];
