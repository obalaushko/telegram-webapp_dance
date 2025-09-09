import axios from 'axios';
import { toast } from 'react-toastify';

import { ApiResponse } from '@/constants/types.ts';
import { BOT_API_MAP } from './botMap.ts';
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


let apiService: ApiService | null = null;

export const getApiService = (): ApiService => {
    if (!apiService) {
        const botId = getBotId();
        const path = BOT_API_MAP[botId || ''];

        if (!botId || !path) {
            throw new Error(`[ApiService] Unknown or missing botId: ${botId}`);
        }

        const baseUrl = BOT_URL + path;
        apiService = new ApiService(`${baseUrl}/api`);
    }

    return apiService;
};