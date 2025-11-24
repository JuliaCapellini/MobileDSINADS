import api from './api';

export interface Driver {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface EditDriverDTO {
    email: string;
    phone: string;
}

export const driverService = {
    async getProfile(): Promise<Driver> {
        const response = await api.get('/drivers/profile');
        return response.data;
    },

    async updateProfile(data: EditDriverDTO): Promise<Driver> {
        const response = await api.put('/drivers/profile', data);
        return response.data;
    },
};

