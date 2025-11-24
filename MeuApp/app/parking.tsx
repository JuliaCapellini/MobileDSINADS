import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNavigationBar, ParkingMap, ParkingArea } from '../src/components';
import { commonStyles, parkingStyles } from '../src/styles';

export default function ParkingScreen() {
    const [parkingAreas, setParkingAreas] = useState<ParkingArea[]>([]);


    const handleAreaSelected = (area: ParkingArea) => {
        console.log('Área selecionada:', area);
        setParkingAreas([...parkingAreas, area]);
    };

    return (
        <SafeAreaView style={commonStyles.container} edges={['top']}>
            <View style={parkingStyles.container}>

                <View style={parkingStyles.contentArea}>
                    <ParkingMap 
                        onAreaSelected={handleAreaSelected}
                        initialAreas={parkingAreas}
                    />
                </View>

                <BottomNavigationBar activeTab="parking" />
            </View>
        </SafeAreaView>
    );
}