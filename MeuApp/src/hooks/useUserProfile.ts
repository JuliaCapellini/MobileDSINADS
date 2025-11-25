import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { driverService } from '../services/driverService';
import { Driver, EditDriverDTO } from '../services/driverService';

export const useUserProfile = () => {
  const [profile, setProfile] = useState<Driver | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState<EditDriverDTO>({
    email: '',
    phone: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const data = await driverService.getProfile();
      setProfile(data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Não foi possível carregar o perfil.";
      Alert.alert("Erro", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: keyof EditDriverDTO, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateProfile = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await driverService.updateProfile(formData);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      await loadProfile();
    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);
      Alert.alert('Erro', error.response?.data?.message || 'Não foi possível atualizar o perfil.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    isLoading,
    formData,
    setFormData,
    updateField,
    updateProfile,
    reload: loadProfile,
  };
};


