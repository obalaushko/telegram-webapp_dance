/**
 * Parsing Telegram WebApp initData  bot_id
 * @param initData — Telegram WebApp initData
 * @returns bot_id або undefined
 */
export function getBotIdFromInitData(initData: string): string | undefined {
    const params = new URLSearchParams(initData);
    return params.get('bot_id') ?? undefined;
}
