import { useState, useEffect, useCallback } from 'react';
import { Vehicle, VehicleType, CreateVehicleDTO } from '../types';
import { vehicleService } from '../services/vehicleService';
import { Alert } from 'react-native';

export interface VehicleFormData {
  name: string;
  plate: string;
  type: VehicleType;
}

export const useVehicle = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<VehicleFormData>({
    name: '',
    plate: '',
    type: VehicleType.Car,
  });

  const loadVehicles = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const data = await vehicleService.getAll();
      setVehicles(data);
    } catch (error) {
      console.error('Erro ao carregar veículos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os veículos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  const updateField = <K extends keyof VehicleFormData>(
    field: K,
    value: VehicleFormData[K]
  ): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const createVehicle = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const dto: CreateVehicleDTO = {
        plate: formData.plate,
        name: formData.name,
        type: formData.type,
      };
      await vehicleService.create(dto);
      Alert.alert('Sucesso', 'Veículo cadastrado com sucesso!');
      setFormData({ name: '', plate: '', type: VehicleType.Car });
      await loadVehicles();
    } catch (error: any) {
      console.error('Erro ao criar veículo:', error);
      Alert.alert('Erro', error.response?.data?.message || 'Não foi possível cadastrar o veículo.');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = (): void => {
    setFormData({ name: '', plate: '', type: VehicleType.Car });
  };

  return {
    vehicles,
    isLoading,
    formData,
    updateField,
    createVehicle,
    reset,
    loadVehicles,
  };
};


