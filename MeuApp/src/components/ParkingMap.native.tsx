import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { getCurrentLocationNative } from '../utils/constants';
import MapView, { Polygon, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import { parkingMapNativeStyles } from '../styles';

export interface ParkingArea {
  id: string;
  type: 'polygon' | 'circle';
  coordinates: Array<{ latitude: number; longitude: number }>;
  center?: { latitude: number; longitude: number };
  radius?: number;
}

interface ParkingMapProps {
  initialAreas?: ParkingArea[];
}

export const ParkingMap: React.FC<ParkingMapProps> = ({ initialAreas = [] }) => {
  const [region, setRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const location = await getCurrentLocationNative();
        setRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao obter localização');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={[parkingMapNativeStyles.container, parkingMapNativeStyles.centerContent]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={parkingMapNativeStyles.loadingText}>Obtendo sua localização...</Text>
      </View>
    );
  }

  if (error || !region) {
    return (
      <View style={[parkingMapNativeStyles.container, parkingMapNativeStyles.centerContent]}>
        <Text style={parkingMapNativeStyles.errorText}>{error || 'Não foi possível obter a localização'}</Text>
      </View>
    );
  }

  return (
    <View style={parkingMapNativeStyles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={parkingMapNativeStyles.map}
        initialRegion={region}
        showsUserLocation={true}
        toolbarEnabled={false}
      >
        {initialAreas.map((area) => {
          if (area.type === 'polygon') {
            return (
              <Polygon
                key={area.id}
                coordinates={area.coordinates}
                fillColor="rgba(255, 0, 0, 0.2)"
                strokeColor="rgba(255, 0, 0, 0.8)"
                strokeWidth={2}
              />
            );
          }
          if (area.type === 'circle' && area.center) {
            return (
              <Circle
                key={area.id}
                center={area.center}
                radius={area.radius || 100}
                fillColor="rgba(255, 0, 0, 0.2)"
                strokeColor="rgba(255, 0, 0, 0.8)"
                strokeWidth={2}
              />
            );
          }
          return null;
        })}
      </MapView>
    </View>
  );
};