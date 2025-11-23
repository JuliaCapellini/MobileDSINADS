export enum VehicleType {
    Car = 0,
    Motorcycle = 1,
    Van = 2
}

export interface Vehicle {
    id: string;
    driverId: string;
    plate: string;
    name: string;
    type: VehicleType;
}

export interface CreateVehicleDTO {
    plate: string;
    name: string;
    type: VehicleType;
    driverId?: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        firstName: string;
        email: string;
    };
}

export interface RegisterDriverDTO {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
}