import { useState } from 'react';

export interface VehicleFormData {
  nome: string;
  placa: string;
  tipo: string;
}

export const useVehicle = () => {
  const [formData, setFormData] = useState<VehicleFormData>({
    nome: '',
    placa: '',
    tipo: '',
  });

  const updateField = (field: keyof VehicleFormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const save = (): void => {
    console.log(formData);
  };

  const reset = (): void => {
    setFormData({ nome: '', placa: '', tipo: '' });
  };

  return {
    formData,
    updateField,
    save,
    reset,
  };
};


