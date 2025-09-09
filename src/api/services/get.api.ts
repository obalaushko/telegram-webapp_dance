import { IUser } from '@/constants/types.ts';
import { HistoryResponse } from '@/pages/admin/HistoryPage/types.ts';
import { getApiService } from '../api.ts';

export const fetchUserData = async (userId: number): Promise<IUser> => {
    const response = await getApiService().get('user-info', {
        userId: userId,
    });

    if (response.ok) {
        return response.data;
    } else {
        throw new Error('Не вдалося отримати дані');
    }
};

export const fetchAllUsers = async ({
    adminId,
}: {
    adminId: number;
}): Promise<IUser[]> => {
    const response = await getApiService().post('users', { userId: adminId });

    if (response.ok) {
        return response.data;
    } else {
        throw new Error('Не вдалося завантажити список користувачів');
    }
};

export const fetchAllHistory = async ({
    userId,
    page,
    pageSize,
}: {
    userId?: number;
    page?: number;
    pageSize?: number;
}): Promise<HistoryResponse> => {
    const response = await getApiService().get('history-all', {
        userId,
        page,
        pageSize,
    });

    if (response.ok) {
        return response.data;
    } else {
        throw new Error('Не вдалося завантажити історію');
    }
};
export const fetchHistoryByUserId = async ({
    userId,
    page,
    pageSize,
}: {
    userId?: number;
    page?: number;
    pageSize?: number;
}): Promise<HistoryResponse> => {
    const response = await getApiService().post('history-user', {
        userId,
        page,
        pageSize,
    });

    if (response.ok) {
        return response.data;
    } else {
        throw new Error('Не вдалося завантажити історію');
    }
};
