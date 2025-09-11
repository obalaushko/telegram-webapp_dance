import { toast } from "react-toastify";

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

    constructor() {
        this.tg = window.Telegram.WebApp;
    }

    private ensureInitData(): URLSearchParams {
        if (!this.initDataParams && this.tg.initData) {
            this.initDataParams = new URLSearchParams(this.tg.initData);
        }
        return this.initDataParams || new URLSearchParams();
    }

    private getDevBotId(): string | null {
        return import.meta.env.DEV ? '5943367577' : null;
    }

    get botId(): string | null {
        console.log(this.ensureInitData().get('bot_id'))
        toast.info(this.ensureInitData().get('bot_id'))
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
