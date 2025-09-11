import axios from 'axios';
import { toast } from 'react-toastify';

import { ApiResponse } from '@/constants/types.ts';
import { DEFAULT_API } from './botMap.ts';
import { BOT_URL } from '@/constants/index.ts';
import { telegram } from '@/shared/TelegramService.ts';

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
    const startPathOrUrl = telegram.startPath;

    let resolvedBase = '';

    if (startPathOrUrl) {
        if (/^https?:\/\//i.test(startPathOrUrl)) {
            resolvedBase = startPathOrUrl;
        } else {
            resolvedBase = `${BOT_URL}${startPathOrUrl}`;
        }
    } else {
        const path = DEFAULT_API;
        if (!path) {
            throw new Error('[ApiService] No API path. Missing DEFAULT_API');
        }
        resolvedBase = `${BOT_URL}${path}`;
    }

    if (!apiService) {
        apiService = new ApiService(`${resolvedBase}/api`);
    }


    return apiService;
};
