import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { driverService } from '../services/driverService';
import { Driver } from '../services/driverService';

export const useUserProfile = () => {
  const [profile, setProfile] = useState<Driver | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return {
    profile,
    isLoading,
    reload: loadProfile,
  };
};


