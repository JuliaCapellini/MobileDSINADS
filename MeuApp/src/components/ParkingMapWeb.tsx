import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { MAP_CONFIG } from '../utils/constants';

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
}

export const ParkingMapWeb: React.FC<ParkingMapWebProps> = ({
  onAreaSelected,
  initialAreas = [],
}) => {
  const mapRef = useRef<any>(null);
  const mapInstanceRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [areas, setAreas] = useState<ParkingArea[]>(initialAreas);
  const polygonsRef = useRef<any[]>([]);
  const circlesRef = useRef<any[]>([]);

  const initializeMap = useCallback(() => {
    const mapElement = mapRef.current as any;
    if (!mapElement || !window.google) return;

    const defaultCenter = {
      lat: MAP_CONFIG.DEFAULT_LATITUDE,
      lng: MAP_CONFIG.DEFAULT_LONGITUDE,
    };

    const map = new window.google.maps.Map(mapElement, {
      center: defaultCenter,
      zoom: MAP_CONFIG.DEFAULT_ZOOM,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false, // Desabilita o controle de tipo de mapa (Mapa/Satélite)
      fullscreenControl: false, // Desabilita o controle de tela cheia
    });

    mapInstanceRef.current = map;
    setMapLoaded(true);

    // DrawingManager removido - delimitação será feita pelo código


    // Renderizar áreas iniciais
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
  }, [initialAreas, onAreaSelected]);

  // Carregar Google Maps API
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Verificar se já está carregado
    if (window.google && window.google.maps) {
      // Aguardar um pouco para garantir que o elemento está no DOM
      setTimeout(() => {
        initializeMap();
      }, 100);
      return;
    }

    // Carregar script do Google Maps
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_CONFIG.GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;

    window.initMap = () => {
      // Aguardar um pouco para garantir que o elemento está no DOM
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



  // Renderizar elemento nativo para web
  const MapElement = Platform.OS === 'web' 
    ? React.createElement('div', { 
        ref: mapRef, 
        style: { width: '100%', height: '100%' } 
      })
    : <View ref={mapRef} style={styles.map} />;

  return (
    <View style={styles.container}>
      {MapElement}
      
      {!mapLoaded && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando mapa...</Text>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    borderRadius: 10,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

