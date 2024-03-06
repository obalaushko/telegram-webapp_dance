import apiService from "../api.ts";

export const fetchUserData = async (userId: number) => {
    const response = await apiService.get('user-info', {
        userId: userId,
    });

    if (response.ok) {
        return response.data;
    } else {
        throw new Error('Не вдалося отримати дані');
    }
};