export const URL = import.meta.env.VITE_BOT_URL;

export interface User {
    userId: number;
    fullName: string;
    username?: string;
}
