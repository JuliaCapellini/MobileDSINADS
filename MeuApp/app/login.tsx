import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton, CustomButton, CustomInput } from '../src/components';
import { commonStyles, loginFormStyles } from '../src/styles';
import { useAuth } from '../src/context';
import { useLogin } from '../src/hooks/useLogin';

export default function LoginFormScreen() {
  const { login } = useAuth();
  const { formData, isLoading, updateField, handleLogin } = useLogin(login);

  const handleBack = (): void => {
    router.back();
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
            value={formData.email}
            onChangeText={(value) => updateField('email', value)}
            keyboardType="email-address"
          />
          
          <CustomInput
            label="Senha"
            placeholder="Digite sua senha"
            value={formData.password}
            onChangeText={(value) => updateField('password', value)}
            secureTextEntry={true}
          />
        </View>
        
        <View style={loginFormStyles.buttonContainer}>
          <CustomButton
            title="Entrar"
            onPress={handleLogin}
            variant="primary"
            disabled={isLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}