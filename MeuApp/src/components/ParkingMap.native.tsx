import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { MAP_CONFIG } from '../utils/constants';
import MapView, { Marker, Polygon, Circle, PROVIDER_GOOGLE } from 'react-native-maps';

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

  const [region] = useState({
    latitude: MAP_CONFIG.DEFAULT_LATITUDE,
    longitude: MAP_CONFIG.DEFAULT_LONGITUDE,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [areas] = useState<ParkingArea[]>(initialAreas);

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
      >
        {areas.map((area) => {
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