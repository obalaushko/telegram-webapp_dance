let botId: string | null = null;
let wasManuallySet = false;

export const setBotId = (id: string) => {
    botId = id;
    wasManuallySet = true;
};

export const getBotId = (): string | null => {
    if (!botId) autoDetectBotId();
    return botId;
};

export const autoDetectBotId = (): void => {
    if (botId || wasManuallySet) return;

    const tg = window?.Telegram?.WebApp;

    const autoId = new URLSearchParams(tg?.initData || '').get('bot_id');
    if (autoId) {
        botId = autoId;
    } else if (import.meta.env.DEV) {
        botId = import.meta.env.BOT_ID || '5943367577'; // fallback
    } else {
        console.warn('⚠️ [botContext] Bot ID could not be detected');
    }
};

export const resetBotId = () => {
    botId = null;
    wasManuallySet = false;
};
