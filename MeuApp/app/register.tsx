import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton, CustomButton, CustomInput } from '../src/components';
import { commonStyles, registerStyles } from '../src/styles';
import { MESSAGES } from '../src/utils';
import { authService } from '../src/services/authService';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    console.log('Voltar pressionado');
    router.back();
  };

  const handleContinue = async () => {
    if (!firstName || !lastName || !email || !phone || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await authService.register({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password,
      });

      if (response.token) {
        await authService.saveToken(response.token);
        router.replace('/parking');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Náo foi possível completar o registro.";
      Alert.alert("Erro no registro", errorMessage)
    } finally {
      setIsLoading(false);
    }
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
                value={firstName}
                onChangeText={setFirstName}
                keyboardType="default"
              />

              <CustomInput
                label="Último Nome"
                placeholder="Digite seu último nome"
                value={lastName}
                onChangeText={setLastName}
                keyboardType="default"
              />
              
              <CustomInput
                label="E-mail"
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              
              <CustomInput
                label="Telefone"
                placeholder="Digite seu telefone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              
              <CustomInput
                label="Senha"
                placeholder="Digite sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>
            
            <View style={registerStyles.buttonContainer}>
              <CustomButton
                title={MESSAGES.CONTINUE}
                onPress={handleContinue}
                variant="primary"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
