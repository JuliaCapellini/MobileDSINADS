import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, ScrollView } from 'react-native';
import { Vehicle, VehicleType, Bank, PaymentMethod, CreateParkingDTO } from '../types';
import { vehicleService } from '../services/vehicleService';
import { parkingService } from '../services/parkingService';
import { colors, spacing, typography, borderRadius, commonStyles } from '../styles';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TicketActivationModalProps {
    visible: boolean;
    onClose: () => void;
    parkingAreaId: string;
    onSuccess: () => void;
}

export const TicketActivationModal: React.FC<TicketActivationModalProps> = ({
    visible,
    onClose,
    parkingAreaId,
    onSuccess
}) => {
    const [step, setStep] = useState<'vehicle' | 'duration' | 'payment' | 'bank'>('vehicle');
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [duration, setDuration] = useState<number | null>(null);
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
    const [loading, setLoading] = useState(false);
    const [processingPayment, setProcessingPayment] = useState(false);

    useEffect(() => {
        if (visible) {
            loadVehicles();
            setStep('vehicle');
            setSelectedVehicle(null);
            setDuration(null);
            setSelectedBank(null);
            setSelectedPaymentMethod(null);
        }
    }, [visible]);

    const loadVehicles = async () => {
        setLoading(true);
        try {
            const data = await vehicleService.getAll();
            setVehicles(data);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar seus veículos');
        } finally {
            setLoading(false);
        }
    };

    const getPrice = (vehicleType: VehicleType, minutes: number) => {
        let basePrice = 0;
        switch (vehicleType) {
            case VehicleType.Motorcycle:
                basePrice = 2.00;
                break;
            case VehicleType.Car:
                basePrice = 5.00;
                break;
            case VehicleType.Van:
                basePrice = 7.00;
                break;
        }
        return minutes === 60 ? basePrice : basePrice * 2;
    };

    const handlePayment = async () => {
        if (!selectedVehicle || !duration || !selectedBank || !selectedPaymentMethod) return;

        setProcessingPayment(true);
        try {
            const userStr = await AsyncStorage.getItem('@parquimetro_user');
            if (!userStr) {
                Alert.alert('Erro', 'Usuário não encontrado');
                return;
            }
            const user = JSON.parse(userStr);

            const parkingData: CreateParkingDTO = {
                driverId: user.id,
                vehicleId: selectedVehicle.id,
                parkingAreaId: parkingAreaId,
                timeInMins: duration,
                bankId: selectedBank,
                paymentMethodId: selectedPaymentMethod
            };

            await parkingService.create(parkingData);

            Alert.alert('Sucesso', 'Ticket ativado com sucesso!', [
                { text: 'OK', onPress: onSuccess }
            ]);
        } catch (error: any) {
            const message = error.response?.data?.message || error.message || 'Falha no pagamento';
            Alert.alert('Erro', message);
        } finally {
            setProcessingPayment(false);
        }
    };

    const renderVehicleSelection = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.title}>Selecione o Veículo</Text>
            {loading ? (
                <ActivityIndicator size="large" color={colors.yellow} />
            ) : (
                <ScrollView style={styles.listContainer}>
                    {vehicles.map(vehicle => (
                        <TouchableOpacity
                            key={vehicle.id}
                            style={[
                                styles.optionCard,
                                selectedVehicle?.id === vehicle.id && styles.optionCardSelected
                            ]}
                            onPress={() => setSelectedVehicle(vehicle)}
                        >
                            <Ionicons
                                name={vehicle.type === VehicleType.Motorcycle ? "bicycle" : "car"}
                                size={24}
                                color={selectedVehicle?.id === vehicle.id ? colors.black : colors.white}
                            />
                            <View>
                                <Text style={[
                                    styles.optionTitle,
                                    selectedVehicle?.id === vehicle.id && styles.optionTextSelected
                                ]}>{vehicle.name}</Text>
                                <Text style={[
                                    styles.optionSubtitle,
                                    selectedVehicle?.id === vehicle.id && styles.optionTextSelected
                                ]}>{vehicle.plate}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
            <TouchableOpacity
                style={[styles.button, !selectedVehicle && styles.buttonDisabled]}
                disabled={!selectedVehicle}
                onPress={() => setStep('duration')}
            >
                <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
        </View>
    );

    const renderDurationSelection = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.title}>Tempo de Estacionamento</Text>
            <View style={styles.listContainer}>
                {[60, 120].map(mins => (
                    <TouchableOpacity
                        key={mins}
                        style={[
                            styles.optionCard,
                            duration === mins && styles.optionCardSelected
                        ]}
                        onPress={() => setDuration(mins)}
                    >
                        <Ionicons
                            name="time-outline"
                            size={24}
                            color={duration === mins ? colors.black : colors.white}
                        />
                        <View>
                            <Text style={[
                                styles.optionTitle,
                                duration === mins && styles.optionTextSelected
                            ]}>{mins} minutos</Text>
                            {selectedVehicle && (
                                <Text style={[
                                    styles.optionSubtitle,
                                    duration === mins && styles.optionTextSelected
                                ]}>
                                    R$ {getPrice(selectedVehicle.type, mins).toFixed(2)}
                                </Text>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={[styles.button, styles.secondaryButton]}
                    onPress={() => setStep('vehicle')}
                >
                    <Text style={styles.secondaryButtonText}>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, !duration && styles.buttonDisabled]}
                    disabled={!duration}
                    onPress={() => setStep('payment')}
                >
                    <Text style={styles.buttonText}>Continuar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderPaymentSelection = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.title}>Forma de Pagamento</Text>
            <ScrollView style={styles.listContainer}>
                <Text style={styles.sectionTitle}>Método</Text>
                {[
                    { id: PaymentMethod.CreditCard, label: 'Cartão de Crédito', icon: 'card' },
                    { id: PaymentMethod.DebitCard, label: 'Cartão de Débito', icon: 'card-outline' },
                    { id: PaymentMethod.Pix, label: 'Pix', icon: 'qr-code' }
                ].map(method => (
                    <TouchableOpacity
                        key={method.id}
                        style={[
                            styles.optionCard,
                            selectedPaymentMethod === method.id && styles.optionCardSelected
                        ]}
                        onPress={() => setSelectedPaymentMethod(method.id)}
                    >
                        <Ionicons
                            name={method.icon as any}
                            size={24}
                            color={selectedPaymentMethod === method.id ? colors.black : colors.white}
                        />
                        <Text style={[
                            styles.optionTitle,
                            selectedPaymentMethod === method.id && styles.optionTextSelected
                        ]}>{method.label}</Text>
                    </TouchableOpacity>
                ))}

                <Text style={[styles.sectionTitle, { marginTop: spacing.lg }]}>Banco</Text>
                {[
                    { id: Bank.BancoDoBrasil, label: 'Banco do Brasil' },
                    { id: Bank.Bradesco, label: 'Bradesco' },
                    { id: Bank.Nubank, label: 'Nubank' },
                ].map(bank => (
                    <TouchableOpacity
                        key={bank.id}
                        style={[
                            styles.optionCard,
                            selectedBank === bank.id && styles.optionCardSelected
                        ]}
                        onPress={() => setSelectedBank(bank.id)}
                    >
                        <Text style={[
                            styles.optionTitle,
                            selectedBank === bank.id && styles.optionTextSelected
                        ]}>{bank.label}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={[styles.button, styles.secondaryButton]}
                    onPress={() => setStep('duration')}
                >
                    <Text style={styles.secondaryButtonText}>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, (!selectedPaymentMethod || !selectedBank) && styles.buttonDisabled]}
                    disabled={!selectedPaymentMethod || !selectedBank}
                    onPress={handlePayment}
                >
                    {processingPayment ? (
                        <ActivityIndicator color={colors.black} />
                    ) : (
                        <Text style={styles.buttonText}>Pagar e Ativar</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close" size={24} color={colors.black} />
                    </TouchableOpacity>

                    {step === 'vehicle' && renderVehicleSelection()}
                    {step === 'duration' && renderDurationSelection()}
                    {step === 'payment' && renderPaymentSelection()}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.background,
        borderTopLeftRadius: borderRadius.lg,
        borderTopRightRadius: borderRadius.lg,
        padding: spacing.lg,
        height: '80%',
    },
    stepContainer: {
        flex: 1,
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: spacing.sm,
        zIndex: 1,
    },
    title: {
        fontSize: typography.subtitle.fontSize,
        fontWeight: typography.subtitle.fontWeight,
        color: colors.white,
        marginBottom: spacing.lg,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: typography.label.fontSize,
        fontWeight: typography.label.fontWeight,
        color: colors.lightText,
        marginBottom: spacing.sm,
    },
    listContainer: {
        flex: 1,
        marginBottom: spacing.xl,
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        backgroundColor: colors.primary,
        borderRadius: borderRadius.md,
        gap: spacing.md,
        borderWidth: 2,
        borderColor: 'transparent',
        marginBottom: spacing.sm,
    },
    optionCardSelected: {
        backgroundColor: colors.yellow,
        borderColor: colors.yellow,
    },
    optionTitle: {
        fontSize: typography.body.fontSize,
        fontWeight: 'bold',
        color: colors.white,
    },
    optionSubtitle: {
        fontSize: typography.small.fontSize,
        color: colors.lightText,
    },
    optionTextSelected: {
        color: colors.black,
    },
    button: {
        backgroundColor: colors.yellow,
        padding: spacing.md,
        borderRadius: borderRadius.sm,
        alignItems: 'center',
        flex: 1,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        fontSize: typography.button.fontSize,
        fontWeight: 'bold',
        color: colors.black,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: spacing.md,
        marginTop: 'auto',
    },
    secondaryButton: {
        backgroundColor: colors.white,
    },
    secondaryButtonText: {
        fontSize: typography.button.fontSize,
        fontWeight: 'bold',
        color: colors.black,
    },
});
