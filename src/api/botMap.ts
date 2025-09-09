const rawMap = import.meta.env.VITE_BOT_API_MAP || '';
export const DEFAULT_API = import.meta.env.VITE_DEFAULT_API || '';

export const BOT_API_MAP: Record<string, string> = rawMap
    .split(',')
    .reduce((acc: Record<string, string>, pair: string) => {
        const [id, url] = pair.split(':');
        if (id && url) acc[id] = url;
        return acc;
    }, {});
