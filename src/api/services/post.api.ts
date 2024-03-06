import { IWebData } from "../../constants/index.ts";
import apiService from "../api.ts";

export const sendQrData = async (data: IWebData) => {
    const response = await apiService.get('web-data', data);

    if (response.ok) {
        return response.data;
    } else {
        throw new Error('Не вдалося отримати дані');
    }
};