export type TariffItem = {
    _id: string;
    name: string;
    periods: [
        {
            text: string;
            cost: number;
            days: number;
        }
    ]
}

export type NewTariff = {
    tariffId: string;
    days: number;
}
