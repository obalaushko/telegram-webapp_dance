/* eslint-disable @typescript-eslint/no-explicit-any */
export const BOT_URL = import.meta.env.VITE_BOT_URL;

export const PAGE_TITLE = Object.freeze({
    settings: 'Налаштування',
    history: 'Історія відвідувань',
    scanner: 'Сканер абонементів',
    about: 'Загальна інформація',
    user: (id: string) => `Користувач ${id}`,
});
