import api from './api';
import { ParkingArea } from '../types';

export const parkingAreaService = {
    async getAll(): Promise<ParkingArea[]> {
        const response = await api.get('/parking-areas');
        return response.data;
    },

    async checkLocation(latitude: number, longitude: number): Promise<ParkingArea | null> {
        try {
            const response = await api.get('/parking-areas/check-location', {
                params: {
                    lat: latitude,
                    lng: longitude
                }
            });
            return response.data;
        } catch (_error) {
            return null;
        }
    },

    async getById(id: string): Promise<ParkingArea> {
        const response = await api.get(`/parking-areas/${id}`);
        return response.data;
    }
};