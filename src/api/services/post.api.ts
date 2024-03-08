import { IUpdateUser, IWebData } from '../../constants/index.ts';
import apiService from '../api.ts';

export const sendQrData = async (data: IWebData) => {
    const response = await apiService.post('web-data', data);

    if (response.ok) {
        return response.data;
    } else {
        throw new Error('Не вдалося отримати дані');
    }
};

export const updateUserData = async (data: IUpdateUser) => {
    const response = await apiService.post('user-update-data', data);

    if (response.ok) {
        return response.data;
    } else {
        throw new Error('Не вдалося оновити дані');
    }
};

export const checkUser = async (userId: number) => {
    const response = await apiService.post('admin-info', { userId });
    if (response.ok) {
        return response.data;
    } else {
        throw new Error('Error checking user');
    }
};
