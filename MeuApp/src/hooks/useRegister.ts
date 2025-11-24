import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export const useRegister = (registerFn: (data: RegisterFormData) => Promise<void>) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field: keyof RegisterFormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validate = (): boolean => {
    return !!(formData.firstName && formData.lastName && formData.email && formData.phone && formData.password);
  };

  const handleRegister = async (): Promise<void> => {
    if (!validate()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      setIsLoading(true);
      await registerFn(formData);
      router.replace('/parking');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Não foi possível completar o registro.";
      Alert.alert("Erro no registro", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    updateField,
    handleRegister,
  };
};


