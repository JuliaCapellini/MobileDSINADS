import { router } from 'expo-router';
import React from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton, CustomButton, CustomInput } from '../src/components';
import { commonStyles, registerStyles } from '../src/styles';
import { MESSAGES } from '../src/utils';
import { useAuth } from '../src/context';
import { useRegister } from '../src/hooks/useRegister';

export default function RegisterScreen() {
  const { register } = useAuth();
  const { formData, isLoading, updateField, handleRegister } = useRegister(register);

  const handleBack = (): void => {
    router.back();
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <BackButton onPress={handleBack} />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={registerStyles.content}>
            <Text style={registerStyles.title}>{MESSAGES.REGISTER_TITLE}</Text>
            
            <View style={registerStyles.formContainer}>
              <CustomInput
                label="Primeiro Nome"
                placeholder="Digite seu primeiro nome"
                value={formData.firstName}
                onChangeText={(value) => updateField('firstName', value)}
                keyboardType="default"
              />

              <CustomInput
                label="Último Nome"
                placeholder="Digite seu último nome"
                value={formData.lastName}
                onChangeText={(value) => updateField('lastName', value)}
                keyboardType="default"
              />
              
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
              
              <CustomInput
                label="Senha"
                placeholder="Digite sua senha"
                value={formData.password}
                onChangeText={(value) => updateField('password', value)}
                secureTextEntry={true}
              />
            </View>
            
            <View style={registerStyles.buttonContainer}>
              <CustomButton
                title={MESSAGES.CONTINUE}
                onPress={handleRegister}
                variant="primary"
                disabled={isLoading}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
