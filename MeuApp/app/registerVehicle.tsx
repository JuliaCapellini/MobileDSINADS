import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton, CustomInput } from '../src/components';
import { commonStyles, vehicleStyles } from '../src/styles';
import { useVehicle } from '../src/hooks/useVehicle';
import { VehicleType } from '../src/types';

export default function RegisterVehicleScreen() {
  const { formData, updateField, createVehicle, isLoading } = useVehicle();

  const handleBack = (): void => {
    router.back();
  };

  const handleSave = async (): Promise<void> => {
    if (!formData.name.trim() || !formData.plate.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    await createVehicle();
    router.back();
  };

  const vehicleTypeOptions = [
    { label: 'Carro', value: VehicleType.Car },
    { label: 'Moto', value: VehicleType.Motorcycle },
    { label: 'Van', value: VehicleType.Van },
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      <BackButton onPress={handleBack} />

      <ScrollView style={vehicleStyles.container}>
        <Text style={vehicleStyles.title}>Cadastrar Veículo</Text>

        <View style={vehicleStyles.formContainer}>
          <CustomInput
            label="Nome"
            placeholder="Digite o nome do veículo"
            value={formData.name}
            onChangeText={(value) => updateField('name', value)}
            keyboardType="default"
          />

          <CustomInput
            label="Placa"
            placeholder="Digite a placa do veículo"
            value={formData.plate}
            onChangeText={(value) => updateField('plate', value.toUpperCase())}
            keyboardType="default"
            maxLength={7}
          />

          <View style={vehicleStyles.typeContainer}>
            <Text style={vehicleStyles.typeLabel}>Tipo de Veículo</Text>
            <View style={vehicleStyles.typeOptions}>
              {vehicleTypeOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    vehicleStyles.typeOption,
                    formData.type === option.value && vehicleStyles.typeOptionSelected,
                  ]}
                  onPress={() => updateField('type', option.value)}
                >
                  <Text
                    style={[
                      vehicleStyles.typeOptionText,
                      formData.type === option.value && vehicleStyles.typeOptionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity 
            style={[
              vehicleStyles.saveButton,
              isLoading && vehicleStyles.saveButtonDisabled,
            ]} 
            onPress={handleSave}
            disabled={isLoading || !formData.name.trim() || !formData.plate.trim()}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={vehicleStyles.saveButtonText}>Salvar Veículo</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

