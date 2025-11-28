import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { BottomNavigationBar, ParkingMap, ParkingArea as MapParkingArea } from '../../src/components';
import { commonStyles, parkingStyles } from '../../src/styles';
import { getCurrentLocationNative } from '../../src/utils/constants';
import { isPointInPolygon } from '../../src/utils/geoUtils';
import { parkingAreaService } from '../../src/services/parkingAreaService';
import { showAlert } from '../../src/utils/alertUtils';

export default function ParkingScreen() {
    const [parkingAreas, setParkingAreas] = useState<MapParkingArea[]>([]);
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    useEffect(() => {
        loadParkingAreas();
    }, []);

    const loadParkingAreas = async () => {
        try {
            const areas = await parkingAreaService.getAll();
            const mapAreas: MapParkingArea[] = areas.map(area => {
                let coordinates = [];
                try {
                    coordinates = JSON.parse(area.mapCoordinates);
                } catch (e) {
                    console.error('Error parsing coordinates for area', area.id, e);
                }
                return {
                    id: area.id,
                    type: 'polygon',
                    coordinates: coordinates
                };
            });
            setParkingAreas(mapAreas);
        } catch (error) {
            console.error('Failed to load parking areas', error);
            showAlert('Erro', 'Não foi possível carregar as áreas de estacionamento.');
        }
    };

    const handleAreaSelected = (area: MapParkingArea) => {
        console.log('Área selecionada:', area);
        Alert.alert(
            'Estacionar Aqui',
            'Deseja ativar um ticket para esta área?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Sim',
                    onPress: () => {
                        router.push({
                            pathname: '/parking/create',
                            params: { areaId: area.id }
                        } as any);
                    }
                }
            ]
        );
    };

    const handleActivateTicket = async () => {
        try {
            const location = await getCurrentLocationNative();
            setUserLocation(location);

            const area = parkingAreas.find(area => {
                if (area.type === 'polygon') {
                    return isPointInPolygon(location, area.coordinates);
                }
                return false;
            });

            if (area) {
                router.push({
                    pathname: '/parking/create',
                    params: { areaId: area.id }
                } as any);
            } else {
                showAlert('Atenção', 'Você não está dentro de uma área de estacionamento válida.');
            }
        } catch (error) {
            showAlert('Erro', 'Não foi possível verificar sua localização.');
        }
    };

    return (
        <SafeAreaView style={commonStyles.container} edges={['top']}>
            <View style={parkingStyles.container}>

                <View style={parkingStyles.contentArea}>
                    <ParkingMap
                        onAreaSelected={handleAreaSelected}
                        initialAreas={parkingAreas}
                    />

                    <TouchableOpacity
                        style={parkingStyles.activateButton}
                        onPress={handleActivateTicket}
                    >
                        <Text style={parkingStyles.activateButtonText}>Ativar Ticket</Text>
                    </TouchableOpacity>
                </View>

                <BottomNavigationBar activeTab="parking" />
            </View>
        </SafeAreaView>
    );
}