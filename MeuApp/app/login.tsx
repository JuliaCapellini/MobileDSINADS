import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton, CustomButton, CustomInput } from '../src/components';
import { commonStyles, loginFormStyles } from '../src/styles';

export default function LoginFormScreen() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleBack = () => {
    console.log('Voltar pressionado');
    router.back();
  };

  const handleLogin = () => {
    console.log('Login pressionado', { phone, password });
    router.replace('/parking');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <BackButton onPress={handleBack} />
      
      <View style={loginFormStyles.content}>
        <Text style={loginFormStyles.title}>Login</Text>
        
        <View style={loginFormStyles.formContainer}>
          <CustomInput
            label="Celular"
            placeholder="Digite seu celular"
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