import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton, CustomButton, CustomInput } from '../src/components';
import { commonStyles, registerStyles } from '../src/styles';
import { MESSAGES } from '../src/utils';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  const handleBack = () => {
    console.log('Voltar pressionado');
    router.back();
  };

  const handleContinue = () => {
    console.log('Continuar pressionado', {
      fullName,
      email,
      phone,
      birthDate,
      cpf,
      password,
    });
    router.replace('/parking');
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
                label="Nome Completo"
                placeholder="Digite seu nome completo"
                value={fullName}
                onChangeText={setFullName}
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
                label="Data de Nascimento"
                placeholder="DD/MM/AAAA"
                value={birthDate}
                onChangeText={setBirthDate}
                keyboardType="number-pad"
              />
              
              <CustomInput
                label="CPF"
                placeholder="Digite seu CPF"
                value={cpf}
                onChangeText={setCpf}
                keyboardType="number-pad"
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
