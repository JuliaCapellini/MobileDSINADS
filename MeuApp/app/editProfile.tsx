import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton, CustomInput } from '../src/components';
import { commonStyles, vehicleStyles } from '../src/styles';
import { useUserProfile } from '../src/hooks/useUserProfile';

export default function EditProfileScreen() {
    const { email, phone } = useLocalSearchParams();
    const { formData, updateField, updateProfile, isLoading, setFormData } = useUserProfile();

    useEffect(() => {
        if (email && phone) {
            const emailStr = Array.isArray(email) ? email[0] : email;
            const phoneStr = Array.isArray(phone) ? phone[0] : phone;

            setFormData({
                email: emailStr,
                phone: phoneStr,
            });
        }
    }, [email, phone, setFormData]);

    const handleBack = (): void => {
        router.back();
    };

    const handleSave = async (): Promise<void> => {
        if (!formData.email.trim() || !formData.phone.trim()) {
            Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        try {
            await updateProfile();
            router.back();
        } catch (error) {
            // Error handling is already done in the hook
        }
    };

    return (
        <SafeAreaView style={commonStyles.container}>
            <BackButton onPress={handleBack} />

            <ScrollView style={vehicleStyles.container}>
                <Text style={vehicleStyles.title}>Editar Perfil</Text>

                <View style={vehicleStyles.formContainer}>
                    <CustomInput
                        label="E-mail"
                        placeholder="Digite seu e-mail"
                        value={formData.email}
                        onChangeText={(value) => updateField('email', value)}
                        keyboardType="email-address"
                    />

                    <CustomInput
                        label="Telefone"
                        placeholder="Digite seu telefone"
                        value={formData.phone}
                        onChangeText={(value) => updateField('phone', value)}
                        keyboardType="phone-pad"
                    />

                    <TouchableOpacity
                        style={[
                            vehicleStyles.saveButton,
                            isLoading && vehicleStyles.saveButtonDisabled,
                        ]}
                        onPress={handleSave}
                        disabled={isLoading || !formData.email.trim() || !formData.phone.trim()}
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
