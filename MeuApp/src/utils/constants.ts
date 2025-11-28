import * as Location from 'expo-location';

export const APP_CONFIG = {
  LOGO_URL: require('../../assets/images/logos/DSIN.png'),
  LOGO_WIDTH: 360,
  LOGO_HEIGHT: 160,
} as const;

export const MESSAGES = {
  CREATE_ACCOUNT: 'Criar uma Conta',
  LOGIN: 'Entrar',
  CONTINUE: 'Continuar',
  REGISTER_TITLE: 'Cadastro',
  CREATE_ACCOUNT_PRESSED: 'Criar conta pressionado',
  LOGIN_PRESSED: 'Entrar pressionado',
  CONTINUE_PRESSED: 'Continuar pressionado',
} as const;

export const MAP_CONFIG = {
  DEFAULT_ZOOM: 15,
  GOOGLE_MAPS_API_KEY: 'AIzaS***********************************AeWFlU',
} as const;

export const getCurrentLocationNative = async (): Promise<{ latitude: number; longitude: number }> => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    throw new Error('Permissão de localização negada pelo usuário');
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Highest,
  });

  const coords = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };

  console.log('Localização obtida:', coords);

  return coords;
};

export const getCurrentLocationWeb = (): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      const geolocation = navigator.geolocation as any;
      geolocation.getCurrentPosition(
        (position: any) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log('Localização obtida (web):', coords);
          resolve(coords);
        },
        (error: any) => {
          console.error('Erro ao obter localização:', error);
          reject(new Error('Não foi possível obter a localização do dispositivo'));
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );
    } else {
      reject(new Error('Geolocalização não está disponível neste navegador'));
    }
  });
};