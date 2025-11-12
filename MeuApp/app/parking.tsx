import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNavigationBar } from '../src/components';
import { commonStyles, parkingStyles } from '../src/styles';

export default function ParkingScreen() {
    const [balance] = useState('21,56');

    const handleAddBalance = () => {
        console.log('Adicionar saldo pressionado');
        // Implementar lógica para adicionar saldo
    };

    return (
        <SafeAreaView style={commonStyles.container} edges={['top']}>
            <View style={parkingStyles.container}>
                {/* Botão de Saldo no canto superior direito */}
                <TouchableOpacity 
                    style={parkingStyles.balanceButton}
                    onPress={handleAddBalance}
                    activeOpacity={0.7}
                >
                    <Ionicons name="add" size={24} color="#FFFFFF" />
                    <Text style={parkingStyles.balanceText}>R$ {balance}</Text>
                </TouchableOpacity>

                {/* Área de conteúdo principal */}
                <View style={parkingStyles.contentArea}>
                    {/* Aqui pode ser adicionado conteúdo futuro, como painel de estacionamento */}
                </View>

                {/* Barra de navegação */}
                <BottomNavigationBar activeTab="parking" />
            </View>
        </SafeAreaView>
    );
}

