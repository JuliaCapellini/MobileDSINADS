import { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { parkingAreaService } from '../services/parkingAreaService';
import { ParkingArea } from '../types';

export function useParkingMap() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [areas, setAreas] = useState<ParkingArea[]>([]);
  const [currentArea, setCurrentArea] = useState<ParkingArea | null>(null);
  const [loading, setLoading] = useState(true);

  const loadInitialData = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos do GPS para funcionar.');
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);

      console.log("📍 Buscando áreas na API...");
      const areasData = await parkingAreaService.getAll();

      console.log("📦 Áreas recebidas:", JSON.stringify(areasData, null, 2));
      setAreas(areasData);
    } catch (error) {
      console.log("Erro ao carregar mapa");
    } finally {
      setLoading(false);
    }
  }, []);


  const checkZone = useCallback(async (lat: number, lng: number) => {
    if (currentArea) return;

    const detectedArea = await parkingAreaService.checkLocation(lat, lng);
    
    if (detectedArea) {
      setCurrentArea(detectedArea);
      Alert.alert("Zona Azul", `Você entrou na ${detectedArea.name}.`);
    }
  }, [currentArea]);


  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);


  useEffect(() => {
    if (location) {
      checkZone(location.coords.latitude, location.coords.longitude);
    }
  }, [location, checkZone]);

  return {
    location,
    setLocation,
    areas,
    currentArea,
    loading
  };
}