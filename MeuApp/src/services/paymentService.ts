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
        // Mocking payment processing for now as the user mentioned "Fake API"
        // In a real scenario, this would call the backend
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Return true for success
            return true;
        } catch (error) {
            console.error('Payment error:', error);
            return false;
        }
    }
};
