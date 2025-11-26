import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parkingService } from '../../src/services/parkingService';
import { vehicleService } from '../../src/services/vehicleService';
import { Parking, Vehicle } from '../../src/types';
import { BackButton } from '../../src/components';
import { colors, spacing, typography, borderRadius } from '../../src/styles';
import { Ionicons } from '@expo/vector-icons';

export default function ActiveParkingsScreen() {
    const [activeParking, setActiveParking] = useState<Parking | null>(null);
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadActiveParking();
    }, []);

    const loadActiveParking = async () => {
        try {
            const userStr = await AsyncStorage.getItem('@parquimetro_user');
            if (!userStr) {
                setLoading(false);
                return;
            }
            const parking = await parkingService.getActive();
            setActiveParking(parking);

            if (parking && parking.vehicleId) {
                const vehicles = await vehicleService.getAll();
                const foundVehicle = vehicles.find(v => v.id === parking.vehicleId);
                setVehicle(foundVehicle || null);
            }
        } catch (error) {
            console.error('Error loading active parking:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <BackButton onPress={() => router.back()} />
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={colors.yellow} />
                </View>
            </SafeAreaView>
        );
    }

    console.log('Rendering ActiveParkingsScreen', { loading, activeParking, vehicle });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <BackButton onPress={() => router.back()} />
                <Text style={styles.title}>Estacionamentos Ativos</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {!activeParking ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>Você não tem estacionamentos ativos no momento.</Text>
                    </View>
                ) : (
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="car-sport" size={24} color={colors.yellow} />
                            <Text style={styles.cardTitle}>Em Andamento</Text>
                        </View>

                        <View style={styles.cardBody}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Veículo:</Text>
                                <Text style={styles.value}>{vehicle?.plate || 'Placa não encontrada'}</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>Início:</Text>
                                <Text style={styles.value}>{new Date(activeParking.startTime).toLocaleString()}</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>Fim Previsto:</Text>
                                <Text style={styles.value}>{new Date(activeParking.endTime).toLocaleString()}</Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>Tempo Total:</Text>
                                <Text style={styles.value}>{activeParking.timeInMins} minutos</Text>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: typography.subtitle.fontSize,
        fontWeight: 'bold',
        color: colors.white,
        marginLeft: spacing.md,
    },
    content: {
        padding: spacing.md,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.xxl,
        gap: spacing.md,
    },
    emptyText: {
        color: colors.lightText,
        fontSize: typography.body.fontSize,
        textAlign: 'center',
    },
    card: {
        backgroundColor: colors.primary,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        marginBottom: spacing.md,
        borderLeftWidth: 4,
        borderLeftColor: colors.yellow,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
        gap: spacing.sm,
    },
    cardTitle: {
        color: colors.white,
        fontSize: typography.body.fontSize,
        fontWeight: 'bold',
    },
    cardBody: {
        gap: spacing.sm,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        color: colors.lightText,
        fontSize: typography.body.fontSize,
    },
    value: {
        color: colors.white,
        fontSize: typography.body.fontSize,
        fontWeight: 'bold',
    },
});
