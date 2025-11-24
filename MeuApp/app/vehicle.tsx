import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton, CustomInput } from '../src/components';
import { commonStyles, vehicleStyles } from '../src/styles';
import { useVehicle } from '../src/hooks/useVehicle';

export default function VehicleScreen() {
  const { formData, updateField, save } = useVehicle();

  const handleBack = (): void => {
    router.back();
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <BackButton onPress={handleBack} />

      <View style={vehicleStyles.container}>
        <Text style={vehicleStyles.title}>Cadastrar Veículo</Text>

        <View style={vehicleStyles.formContainer}>
          <CustomInput
            label="Nome"
            placeholder="Digite o nome do veículo"
            value={formData.nome}
            onChangeText={(value) => updateField('nome', value)}
            keyboardType="default"
          />

          <CustomInput
            label="Placa"
            placeholder="Digite a placa do veículo"
            value={formData.placa}
            onChangeText={(value) => updateField('placa', value)}
            keyboardType="default"
          />

          <CustomInput
            label="Tipo"
            placeholder="Digite o tipo do veículo"
            value={formData.tipo}
            onChangeText={(value) => updateField('tipo', value)}
            keyboardType="default"
          />

          <TouchableOpacity 
            style={vehicleStyles.saveButton} 
            onPress={save}
          >
            <Text style={vehicleStyles.saveButtonText}>Salvar Veículo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
