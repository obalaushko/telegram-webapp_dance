/* eslint-disable @typescript-eslint/no-explicit-any */
export const BOT_URL = import.meta.env.VITE_BOT_URL;

export const PAGE_TITLE = Object.freeze({
    users: 'Учні',
    history: 'Історія відвідувань',
    scanner: 'Сканер абонементів',
    about: 'Загальна інформація',
    user: (id: string) => `Користувач ${id}`,
    notFound: '404',
});

export const actionsHistory = Object.freeze({
    create: 'Створення аккаунту',
    remove: 'Видалення аккаунту',
    approveUser: 'Підтвердження користувача',
    markUser: 'Відмічено на занятті',
    updateTotalLessons: 'Оновлення кількості занять',
    updateDateExpired: 'Оновлення дати закінчення',
    updateUsedLessons: 'Оновлення кількості використаних занять',
    freezeSubscription: 'Заморозка абонементу',
    defrostSubscription: 'Розморозка абонементу',
    activateSubscription: 'Активація абонементу',
    deactivateSubscription: 'Деактивація абонементу',
    dateExpired: 'Закінчення терміну дії абонементу',
    changeName: 'Зміна імені',
    updateNotification: 'Оновлення налаштувань сповіщень',
    moveToInactive: 'Переміщення в неактивні користувачі',
    moveToActive: 'Переміщення в активні користувачі',
});