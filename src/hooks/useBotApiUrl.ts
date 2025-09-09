import { useTelegram } from './useTelegram';

const DEFAULT_API = import.meta.env.VITE_DEFAULT_BOT_URL;
const rawMap = import.meta.env.VITE_BOT_API_MAP;

function parseBotApiMap(rawMap: string): Record<string, string> {
    const map: Record<string, string> = {};
    try {
        const entries = rawMap.split(',').map((pair) => pair.split(':'));
        entries.forEach(([key, value]) => {
            if (key && value) {
                map[key.trim()] = value.trim();
            }
        });
    } catch (e) {
        console.error('[useBotApiUrl] Failed to parse BOT_API_MAP:', e);
    }
    return map;
}

/**
 * Returns the base API URL based on Telegram bot start_param.
 */
export function useBotApiUrl(): string {
    const { tg } = useTelegram();
    const BOT_API_MAP = parseBotApiMap(rawMap);

    const botId = tg?.initDataUnsafe?.start_param;
    if (botId && BOT_API_MAP[botId]) {
        return BOT_API_MAP[botId];
    }

    return DEFAULT_API;
}
