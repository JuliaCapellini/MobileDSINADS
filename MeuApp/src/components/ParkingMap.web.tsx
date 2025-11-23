import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import { MAP_CONFIG, getCurrentLocationWeb } from '../utils/constants';
import { parkingMapWebStyles } from '../styles';

export interface ParkingArea {
  id: string;
  type: 'polygon' | 'circle';
  coordinates: Array<{ latitude: number; longitude: number }>;
  center?: { latitude: number; longitude: number };
  radius?: number;
}

interface ParkingMapWebProps {
  onAreaSelected?: (area: ParkingArea) => void;
  initialAreas?: ParkingArea[];
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
  var window: any;
  var document: any;
}

export const ParkingMap: React.FC<ParkingMapWebProps> = ({
  onAreaSelected,
  initialAreas = [],
}) => {
  const mapRef = useRef<any>(null);
  const mapInstanceRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [areas, setAreas] = useState<ParkingArea[]>(initialAreas);
  const polygonsRef = useRef<any[]>([]);
  const circlesRef = useRef<any[]>([]);

  const initializeMap = useCallback(() => {
    const mapElement = mapRef.current as any;
    if (!mapElement || !window.google) return;

    getCurrentLocationWeb()
      .then((center) => {
      console.log('Localização recebida no componente web:', center);
      
      const map = new window.google.maps.Map(mapElement, {
        center: center,
        zoom: MAP_CONFIG.DEFAULT_ZOOM,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        fullscreenControl: false,
      });

      new window.google.maps.Marker({
        position: center,
        map: map,
        title: 'Sua localização',
      });

      mapInstanceRef.current = map;
      setMapLoaded(true);
      initialAreas.forEach((area) => {
        if (area.type === 'polygon' && area.coordinates.length > 0) {
          const polygon = new window.google.maps.Polygon({
            paths: area.coordinates.map((coord) => ({
              lat: coord.latitude,
              lng: coord.longitude,
            })),
            fillColor: '#FF0000',
            fillOpacity: 0.2,
            strokeColor: '#FF0000',
            strokeWeight: 2,
          });
          polygon.setMap(map);
          polygonsRef.current.push(polygon);
        } else if (area.type === 'circle' && area.center) {
          const circle = new window.google.maps.Circle({
            center: { lat: area.center.latitude, lng: area.center.longitude },
            radius: area.radius || 100,
            fillColor: '#FF0000',
            fillOpacity: 0.2,
            strokeColor: '#FF0000',
            strokeWeight: 2,
          });
          circle.setMap(map);
          circlesRef.current.push(circle);
        }
      });
    })
      .catch((error) => {
        setLocationError(error instanceof Error ? error.message : 'Erro ao obter localização');
        setMapLoaded(true);
      });
  }, [initialAreas, onAreaSelected]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.google && window.google.maps) {
      setTimeout(() => {
        initializeMap();
      }, 100);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_CONFIG.GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;

    window.initMap = () => {
      setTimeout(() => {
        initializeMap();
      }, 100);
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [initializeMap]);


  const MapElement = Platform.OS === 'web' 
    ? React.createElement('div', { 
        ref: mapRef, 
        style: { width: '100%', height: '100%' } 
      })
    : <View ref={mapRef} style={parkingMapWebStyles.map} />;

  if (locationError) {
    return (
      <View style={[parkingMapWebStyles.container, parkingMapWebStyles.centerContent]}>
        <Text style={parkingMapWebStyles.errorText}>{locationError}</Text>
        <Text style={parkingMapWebStyles.errorSubtext}>Por favor, verifique as permissões de localização</Text>
      </View>
    );
  }

  return (
    <View style={parkingMapWebStyles.container}>
      {MapElement}
      
      {!mapLoaded && (
        <View style={parkingMapWebStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={parkingMapWebStyles.loadingText}>Obtendo sua localização...</Text>
        </View>
      )}

    </View>
  );
};
