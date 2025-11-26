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

export interface ParkingArea {
    id: string;
    name: string;
    description: string;
    mapCoordinates: string;
}

export enum PaymentMethod {
    CreditCard = 1,
    DebitCard = 2,
    Pix = 3
}

export enum Bank {
    BancoDoBrasil = 1,
    Bradesco = 2,
    Itau = 3,
    Caixa = 4,
    Santander = 5,
    Nubank = 13,
    Inter = 14
}

export interface CreateParkingDTO {
    driverId: string;
    vehicleId: string;
    parkingAreaId: string;
    timeInMins: number;
    bankId: number;
    paymentMethodId: number;
}

export interface Parking {
    id: string;
    driverId: string;
    vehicleId: string;
    parkingAreaId: string;
    startTime: string;
    endTime: string;
    timeInMins: number;
    totalPrice: number;
    status: 'Active' | 'Completed' | 'Cancelled';
}