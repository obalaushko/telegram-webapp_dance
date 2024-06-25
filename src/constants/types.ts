/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ISubscription {
    active: boolean;
    dateExpired: Date | string;
    totalLessons: number;
    usedLessons: number;
    freeze: {
        lastDateFreeze: Date;
        dateExpired: Date;
        frozenUntil: Date;
        active: boolean;
        usedLessons: number;
    };
}

export interface IUser {
    userId: number;
    role?: string;
    username?: string;
    firstName?: string;
    subscription?: ISubscription;
    fullName?: string;
    approved?: boolean;
    notifications?: boolean;
}

export interface IUpdateUser {
    userId: number;
    role?: string;
    firstName?: string;
    fullName?: string;
    notifications?: boolean;
    dateExpired?: Date | string;
    totalLessons?: number;
    usedLessons?: number;
    [key: string]: any;
}

export interface IWebData {
    userId: number | undefined;
    userIds: number[];
    quaryId: string | undefined;
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
