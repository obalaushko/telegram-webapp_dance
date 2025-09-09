let botId: string | null = null;

export const setBotId = (id: string) => {
    botId = id;
};

export const getBotId = (): string | null => {
    return botId;
};
