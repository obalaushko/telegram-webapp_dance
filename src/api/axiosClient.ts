import axios from 'axios';
import { BOT_URL } from '../constants/index.ts';

const axiosClient = axios.create({
  baseURL: BOT_URL,
});

export default axiosClient;