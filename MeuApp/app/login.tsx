import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton, CustomButton, CustomInput } from '../src/components';
import { commonStyles, loginFormStyles } from '../src/styles';
import { authService } from '../src/services/authService';
import { replace } from 'expo-router/build/global-state/routing';

export default function LoginFormScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleBack = () => {
    console.log('Voltar pressionado');
    router.back();
  };

  const handleLogin = async () => {
    try {
      const response = await authService.login({
        email: email,
        password: password
      });
    await authService.saveToken(response.token);

    router.replace('/parking');
    } catch (error) {
      Alert.alert("Erro", "Login falhou. Verifique suas credenciais.");
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <BackButton onPress={handleBack} />
      
      <View style={loginFormStyles.content}>
        <Text style={loginFormStyles.title}>Login</Text>
        
        <View style={loginFormStyles.formContainer}>
          <CustomInput
            label="Email"
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          
          <CustomInput
            label="Senha"
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
        
        <View style={loginFormStyles.buttonContainer}>
          <CustomButton
            title="Entrar"
            onPress={handleLogin}
            variant="primary"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}