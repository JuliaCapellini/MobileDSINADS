import api from './api';
import { CreateParkingDTO, Parking } from '../types';

export const parkingService = {
    async create(data: CreateParkingDTO): Promise<Parking> {
        const response = await api.post('/parking/start', data);
        return response.data;
    },

    async getActive(): Promise<Parking | null> {
        try {
            const response = await api.get('/parking/active');
            return response.data;
        } catch (error) {
            return null;
        }
    },

    async getHistoryByDriverId(driverId: string): Promise<Parking[]> {
        const response = await api.get(`/parking/history/${driverId}`);
        return response.data;
    }
};
