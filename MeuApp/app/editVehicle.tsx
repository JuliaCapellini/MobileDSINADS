import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton, CustomInput } from '../src/components';
import { commonStyles, vehicleStyles } from '../src/styles';
import { useVehicle } from '../src/hooks/useVehicle';
import { VehicleType } from '../src/types';

export default function EditVehicleScreen() {
    const { id, name, plate, type } = useLocalSearchParams();
    const { formData, updateField, updateVehicle, isLoading, setFormData } = useVehicle();

    useEffect(() => {
        if (name && plate && type) {
            const nameStr = Array.isArray(name) ? name[0] : name;
            const plateStr = Array.isArray(plate) ? plate[0] : plate;
            const typeStr = Array.isArray(type) ? type[0] : type;
            const typeNum = parseInt(typeStr, 10);

            setFormData({
                name: nameStr,
                plate: plateStr,
                type: !isNaN(typeNum) ? (typeNum as VehicleType) : VehicleType.Car,
            });
        }
    }, [name, plate, type, setFormData]);

    const handleBack = (): void => {
        router.back();
    };

    const handleSave = async (): Promise<void> => {
        if (!formData.name.trim() || !formData.plate.trim()) {
            Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        const idStr = Array.isArray(id) ? id[0] : id;
        if (!idStr) {
            Alert.alert('Erro', 'ID do veículo não encontrado.');
            return;
        }
        await updateVehicle(idStr);
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
                <Text style={vehicleStyles.title}>Editar Veículo</Text>

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
                            <Text style={vehicleStyles.saveButtonText}>Salvar Alterações</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
