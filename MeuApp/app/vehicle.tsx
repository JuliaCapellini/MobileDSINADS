import { router, useFocusEffect } from 'expo-router';
import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton } from '../src/components';
import { commonStyles, vehicleStyles } from '../src/styles';
import { useVehicle } from '../src/hooks/useVehicle';
import { VehicleType } from '../src/types';

export default function VehicleScreen() {
  const { vehicles, isLoading, loadVehicles } = useVehicle();

  useFocusEffect(
    useCallback(() => {
      loadVehicles();
    }, [loadVehicles])
  );

  const handleBack = (): void => {
    router.back();
  };

  const handleAddVehicle = (): void => {
    router.push('/registerVehicle');
  };

  const getVehicleTypeLabel = (type: VehicleType): string => {
    switch (type) {
      case VehicleType.Car:
        return 'Carro';
      case VehicleType.Motorcycle:
        return 'Moto';
      case VehicleType.Van:
        return 'Van';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={vehicleStyles.header}>
        <BackButton onPress={handleBack} />
        <TouchableOpacity
          style={vehicleStyles.addButton}
          onPress={handleAddVehicle}
        >
          <Text style={vehicleStyles.addButtonText}>Cadastrar Veículo</Text>
        </TouchableOpacity>
      </View>

      <View style={vehicleStyles.container}>
        <Text style={vehicleStyles.title}>Meus Veículos</Text>

        {isLoading ? (
          <View style={vehicleStyles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFD700" />
          </View>
        ) : vehicles.length === 0 ? (
          <View style={vehicleStyles.emptyContainer}>
            <Text style={vehicleStyles.emptyText}>
              Nenhum veículo cadastrado ainda.
            </Text>
          </View>
        ) : (
          <ScrollView style={vehicleStyles.listContainer}>
            {vehicles.map((vehicle) => (
              <TouchableOpacity
                key={vehicle.id}
                style={vehicleStyles.vehicleCard}
                onPress={() => router.push({
                  pathname: '/editVehicle',
                  params: {
                    id: vehicle.id,
                    name: vehicle.name,
                    plate: vehicle.plate,
                    type: vehicle.type
                  }
                })}
              >
                <Text style={vehicleStyles.vehicleName}>{vehicle.name}</Text>
                <Text style={vehicleStyles.vehiclePlate}>Placa: {vehicle.plate}</Text>
                <Text style={vehicleStyles.vehicleType}>
                  Tipo: {getVehicleTypeLabel(vehicle.type)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
