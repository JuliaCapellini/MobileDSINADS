import api from './api';
import { Vehicle, CreateVehicleDTO } from '../types';

export const vehicleService = {
    async getAll(): Promise<Vehicle[]> {
        const response = await api.get('/vehicles');
        return response.data;
    },

    async create(data: CreateVehicleDTO): Promise<Vehicle> {
        const response = await api.post('/vehicles', data);
        return response.data;
    },

    async update(id: string, data: CreateVehicleDTO): Promise<Vehicle> {
        const response = await api.put(`/vehicles/${id}`, data);
        return response.data;
    },
};