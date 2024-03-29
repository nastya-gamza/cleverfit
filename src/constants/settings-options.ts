export const SettingsOptions = [
    {
        name: 'readyForJointTraining',
        title: 'Открыт для совместных тренировок',
        tooltip: 'включеная функция позволит участвовать в совместных тренировках',
        dataTestId: 'tariff-trainings',
        dataTestIdIcon: 'tariff-trainings-icon',
    },
    {
        name: 'sendNotification',
        title: 'Уведомления',
        tooltip: 'включеная функция позволит получать уведомления об активностях',
        dataTestId: 'tariff-notifications',
        dataTestIdIcon: 'tariff-notifications-icon',
    },
    {
        title: 'Тёмная тема',
        tooltip: 'темная тема доступна для PRO tarif',
        dataTestId: 'tariff-theme',
        dataTestIdIcon: 'tariff-theme-icon',
        isPro: true,
    },
];
