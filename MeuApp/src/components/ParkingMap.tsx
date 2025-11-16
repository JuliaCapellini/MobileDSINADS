import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MAP_CONFIG } from '../utils/constants';

let MapView: any;
let Marker: any;
let Polygon: any;
let Circle: any;
let PROVIDER_GOOGLE: any;
let Region: any;

if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
  Polygon = Maps.Polygon;
  Circle = Maps.Circle;
  PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;
  Region = Maps.Region;
}

export interface ParkingArea {
  id: string;
  type: 'polygon' | 'circle';
  coordinates: Array<{ latitude: number; longitude: number }>;
  center?: { latitude: number; longitude: number };
  radius?: number;
}

interface ParkingMapProps {
  onAreaSelected?: (area: ParkingArea) => void;
  initialAreas?: ParkingArea[];
}

export const ParkingMap: React.FC<ParkingMapProps> = ({ 
  onAreaSelected, 
  initialAreas = [] 
}) => {
  const mapRef = useRef<any>(null);
  const [region, setRegion] = useState<any>({
    latitude: MAP_CONFIG.DEFAULT_LATITUDE,
    longitude: MAP_CONFIG.DEFAULT_LONGITUDE,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  
  const [areas, setAreas] = useState<ParkingArea[]>(initialAreas);


  if (Platform.OS === 'web') {
    const ParkingMapWeb = require('./ParkingMapWeb').ParkingMapWeb;
    return <ParkingMapWeb onAreaSelected={onAreaSelected} initialAreas={initialAreas} />;
  }

  if (!MapView) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color="#F44336" />
          <Text style={styles.errorText}>
            Erro ao carregar o mapa. Verifique se react-native-maps está instalado.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        showsUserLocation={false}
        showsMyLocationButton={false}
        toolbarEnabled={false}
        mapType="standard"
      >
        {areas.map((area) => {
          if (area.type === 'polygon' && area.coordinates.length > 0) {
            return (
              <Polygon
                key={area.id}
                coordinates={area.coordinates}
                fillColor="rgba(255, 0, 0, 0.2)"
                strokeColor="rgba(255, 0, 0, 0.8)"
                strokeWidth={2}
              />
            );
          } else if (area.type === 'circle' && area.center) {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  webMapContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#38454D',
    padding: 20,
  },
  webMessageContainer: {
    maxWidth: 400,
    alignItems: 'center',
    gap: 16,
  },
  webTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  webMessageText: {
    fontSize: 14,
    color: '#E0E0E0',
    textAlign: 'center',
    lineHeight: 20,
  },
  webLinkButton: {
    marginTop: 8,
    backgroundColor: '#617991',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  webLinkButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
    textAlign: 'center',
    fontWeight: '600',
  },
});

