/* eslint-disable @typescript-eslint/no-explicit-any */
export const BOT_URL = import.meta.env.VITE_BOT_URL;

export interface User {
    userId: number;
    fullName: string;
    username?: string;
}

export type ApiResponse = SuccessResponse | ErrorResponse;

export type SuccessResponse = {
    status: 'success';
    ok: boolean;
    message?: string;
    data?: any;
};

export type ErrorResponse = {
    status: 'error';
    ok: boolean;
    message: string;
    data?: any;
    error: any;
};
