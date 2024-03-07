import axios from 'axios';
import { ApiResponse, BOT_URL } from '../constants/index.ts';
import { toast } from 'react-toastify';

export type RequestData = {
    userId: number | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

/**
 * Represents an API service for making HTTP requests.
 */
class ApiService {
    private readonly baseUrl: string;

    /**
     * Creates an instance of ApiService.
     * @param baseUrl - The base URL of the API.
     */
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    /**
     * Sends a GET request to the specified URL.
     * @param url - The URL to send the request to.
     * @param data - The request data (optional).
     * @returns A promise that resolves to the API response.
     * @throws An error if the request fails.
     */
    async get(url: string, data?: RequestData): Promise<ApiResponse> {
        try {
            const response = await axios.get(`${this.baseUrl}/${url}`, { params: data });
            return response.data;
        } catch (error) {
            const errorMessage = (error as Error).message;
            toast.error(errorMessage);
            throw error;
        }
    }

    /**
     * Sends a POST request to the specified URL.
     * @param url - The URL to send the request to.
     * @param data - The request data.
     * @returns A promise that resolves to the API response.
     * @throws An error if the request fails.
     */
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

const apiService = new ApiService(BOT_URL + '/api');

export default apiService;