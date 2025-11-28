import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://10.1.52.102:5010/api';

const api = axios.create({
    baseURL: baseURL,
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('@parquimetro_token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;