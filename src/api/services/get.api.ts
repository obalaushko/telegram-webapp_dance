import { IUser } from '../../constants/index.ts';
import apiService from '../api.ts';

export const fetchUserData = async (userId: number): Promise<IUser> => {
    const response = await apiService.get('user-info', {
        userId: userId,
    });

    if (response.ok) {
        return response.data;
    } else {
        throw new Error('Не вдалося отримати дані');
    }
};
