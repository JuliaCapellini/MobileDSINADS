import api from './api';
import { LoginDTO, AuthResponse, RegisterDriverDTO } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
    async login(data: LoginDTO): Promise<AuthResponse> {
        const response = await api.post('/auth/login', data);
        return response.data;
    },

    async register(data: RegisterDriverDTO): Promise<AuthResponse> {
        const response = await api.post('/auth/register', data);
        return response.data;
    },

    async saveToken(token: string) {
        await AsyncStorage.setItem('@parquimetro_token', token);
    },

    async logout() {
        await AsyncStorage.removeItem('@parquimetro_token');
    }

};