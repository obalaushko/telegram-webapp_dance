 

type TelegramUser = {
    id: number;
    username?: string;
    first_name?: string;
    last_name?: string;
    language_code?: string;
    is_premium?: boolean;
};

class TelegramService {
    private tg: typeof window.Telegram.WebApp;
    private initDataParams: URLSearchParams | null = null;
    private cachedStartParam: string | null = null;

    constructor() {
        this.tg = window.Telegram.WebApp;
    }

    private ensureInitData(): URLSearchParams {
        if (!this.initDataParams && this.tg.initData) {
            this.initDataParams = new URLSearchParams(this.tg.initData);
        }
        return this.initDataParams || new URLSearchParams();
    }

    get startParam(): string | null {
        if (this.cachedStartParam) return this.cachedStartParam;

        // 1) initDataUnsafe
        const fromInitData = this.tg?.initDataUnsafe?.start_param || null;
        if (fromInitData) {
            this.cachedStartParam = fromInitData;
            try {
                sessionStorage.setItem('tgWebAppStartParam', fromInitData);
            } catch (e) {
                // ignore storage errors
                void e;
            }
            return this.cachedStartParam;
        }

        // 2) URL query
        const search = window.location?.search || '';
        if (search) {
            const params = new URLSearchParams(search);
            const fromQuery = params.get('tgWebAppStartParam');
            if (fromQuery) {
                this.cachedStartParam = fromQuery;
                try {
                    sessionStorage.setItem('tgWebAppStartParam', fromQuery);
                } catch (e) {
                    // ignore storage errors
                    void e;
                }
                return this.cachedStartParam;
            }
        }

        // 3) sessionStorage fallback between navigations/reloads
        try {
            const fromStorage = sessionStorage.getItem('tgWebAppStartParam');
            if (fromStorage) {
                this.cachedStartParam = fromStorage;
                return this.cachedStartParam;
            }
        } catch (e) {
            // ignore storage errors
            void e;
        }

        return null;
    }

    /**
     * Normalized path from start_param.
     * Accepts values like "/host/dance" or "host/dance" and returns leading-slash path.
     * If a full URL is provided, returns it unchanged.
     */
    get startPath(): string | null {
        const raw = this.startParam;
        if (!raw) return null;

        let decoded = raw;
        try {
            decoded = decodeURIComponent(raw);
        } catch {
            // ignore decode errors; use raw
        }

        if (/^https?:\/\//i.test(decoded)) {
            return decoded;
        }

        const trimmed = decoded.trim();
        if (!trimmed) return null;

        return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
    }

    private getDevBotId(): string | null {
        return import.meta.env.DEV ? '5943367577' : null;
    }

    get botId(): string | null {
        return this.ensureInitData().get('bot_id') || this.getDevBotId();
    }

    get queryId(): string | null {
        return this.tg?.initDataUnsafe?.query_id || null;
    }

    get user(): TelegramUser | null {
        return this.tg?.initDataUnsafe?.user || null;
    }

    get language(): string | null {
        return this.tg?.initDataUnsafe?.user?.language_code || null;
    }

    get isReady(): boolean {
        return Boolean(this.tg?.initData && this.user);
    }

    get rawInitData(): string {
        return this.tg?.initData;
    }

    get tgAPI(): typeof window.Telegram.WebApp {
        return this.tg;
    }

    get mainButton() {
        return this.tg.MainButton;
    }

    get backButton() {
        return this.tg.BackButton;
    }

    expand(): void {
        this.tg.expand();
    }

    close(): void {
        this.tg.close();
    }

    closeScanQrPopup(): void {
        this.tg.closeScanQrPopup();
    }

    enableClosingConfirmation(): void {
        this.tg.enableClosingConfirmation();
    }

    disableClosingConfirmation(): void {
        this.tg.disableClosingConfirmation();
    }
}

export const telegram = new TelegramService();
