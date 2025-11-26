import api from './api';

export interface PaymentRequest {
    vehicleId: string;
    parkingAreaId: string;
    durationMinutes: number;
    amount: number;
    paymentMethod: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PIX';
}

export const paymentService = {
    async processPayment(data: PaymentRequest): Promise<boolean> {

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            return true;
        } catch (error) {
            console.error('Payment error:', error);
            return false;
        }
    }
};
