import { IUpdateUser, IWebData } from '@/constants/types.ts';
import { getApiService } from '../api.ts';

export const sendQrData = async (data: IWebData) => {
    const response = await getApiService().post('web-data', data);

    if (response.ok) {
        return response.data;
    } else {
        throw new Error('Не вдалося отримати дані');
    }
};

export const updateUserData = async (data: IUpdateUser) => {
    const response = await getApiService().post('user-update-data', data);

    if (response.ok) {
        return response.data;
    } else {
        throw new Error('Не вдалося оновити дані');
    }
};

export const checkUser = async (userId: number) => {
    const response = await getApiService().post('admin-info', { userId });
    if (response.ok) {
        return response.data;
    } else {
        throw new Error('Error checking user');
    }
};

export const sendPaymentReminder = async (userId: number) => {
    const response = await getApiService().post('payment-reminder', { userId });
    if (response.ok) {
        return response.data;
    } else {
        throw new Error(response.message);
    }
};
