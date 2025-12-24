import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// 你的本地 IP 地址，如果是模拟器请用 10.0.2.2 (Android) 或 局域网IP
// 这里假设是真机调试，建议改为电脑的局域网 IP，例如 http://192.168.1.x:3001
const API_URL = 'http://192.168.1.43:3001';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器：自动附加 Token
api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const loginEmail = (email, password) => api.post('/auth/login-email', { email, password });
export const checkIn = () => api.post('/user/checkin');
export const getPoints = () => api.get('/user/points');
export const generateCopy = (topic, platform) => api.post('/generate', { topic, platform });

export default api;
