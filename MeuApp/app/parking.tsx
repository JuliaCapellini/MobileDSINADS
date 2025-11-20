import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNavigationBar, ParkingMap, ParkingArea } from '../src/components';
import { commonStyles, parkingStyles } from '../src/styles';

export default function ParkingScreen() {
    const [balance] = useState('21,56');
    const [parkingAreas, setParkingAreas] = useState<ParkingArea[]>([]);

    const handleAddBalance = () => {
        console.log('Adicionar saldo pressionado');
    };

    const handleAreaSelected = (area: ParkingArea) => {
        console.log('Área selecionada:', area);
        setParkingAreas([...parkingAreas, area]);
    };

    return (
        <SafeAreaView style={commonStyles.container} edges={['top']}>
            <View style={parkingStyles.container}>
                <TouchableOpacity 
                    style={parkingStyles.balanceButton}
                    onPress={handleAddBalance}
                    activeOpacity={0.7}
                >
                    <Ionicons name="add" size={24} color="#FFFFFF" />
                    <Text style={parkingStyles.balanceText}>R$ {balance}</Text>
                </TouchableOpacity>

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