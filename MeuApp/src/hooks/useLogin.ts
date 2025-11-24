import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';

export interface LoginFormData {
  email: string;
  password: string;
}

export const useLogin = (loginFn: (email: string, password: string) => Promise<void>) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field: keyof LoginFormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await loginFn(formData.email, formData.password);
      router.replace('/parking');
    } catch (error) {
      Alert.alert("Erro", "Login falhou. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    updateField,
    handleLogin,
  };
};


