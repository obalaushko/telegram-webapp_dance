import axios from 'axios';
import { toast } from 'react-toastify';

import { ApiResponse } from '@/constants/types.ts';
import { BOT_API_MAP, DEFAULT_API } from './botMap.ts';
import { getBotId } from '@/shared/botContext.ts';
import { BOT_URL } from '@/constants/index.ts';

export type RequestData = {
    userId?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
};

class ApiService {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async get(url: string, data?: RequestData): Promise<ApiResponse> {
        try {
            const response = await axios.get(`${this.baseUrl}/${url}`, {
                params: data,
            });
            return response.data;
        } catch (error) {
            const errorMessage = (error as Error).message;
            toast.error(errorMessage);
            throw error;
        }
    }

    async post(url: string, data: RequestData): Promise<ApiResponse> {
        try {
            const response = await axios.post(`${this.baseUrl}/${url}`, data);
            return response.data;
        } catch (error) {
            const errorMessage = (error as Error).message;
            toast.error(errorMessage);
            throw error;
        }
    }
}

/**
 * Creates an API instance for the specified botId (from initData.receiver.id)
 */
export const createApiService = () => {
    const botId = getBotId();
    const baseUrl = BOT_URL + BOT_API_MAP[botId || ''] || DEFAULT_API;
    return new ApiService(`${baseUrl}/api`);
};
