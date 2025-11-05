import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { profileStyles } from '../styles';

type ActiveTab = 'estacionar' | 'uso' | 'dados';

interface BottomNavigationBarProps {
    activeTab?: ActiveTab;
}

export const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({ activeTab = 'dados' }) => {
    const handleEstacionar = () => {
        console.log('Estacionar pressionado');
        router.push('/screenHome');
    };

    const handleUso = () => {
        console.log('Uso pressionado');
        // Adicione a rota correta quando a tela de uso for criada
        // router.push('/uso');
    };

    const handleDados = () => {
        console.log('Dados pressionado');
        router.push('/dados');
    };

    return (
        <View style={profileStyles.navigationBar}>
            <TouchableOpacity 
                style={[
                    profileStyles.navItem, 
                    activeTab === 'estacionar' 
                        ? profileStyles.navItemActive 
                        : profileStyles.navItemInactive
                ]}
                onPress={handleEstacionar}
                activeOpacity={0.7}
            >
                <Ionicons name="car-outline" size={28} color="#000000" />
                <Text style={profileStyles.navItemText}>Estacionar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={[
                    profileStyles.navItem, 
                    activeTab === 'uso' 
                        ? profileStyles.navItemActive 
                        : profileStyles.navItemInactive
                ]}
                onPress={handleUso}
                activeOpacity={0.7}
            >
                <Ionicons name="grid-outline" size={28} color="#000000" />
                <Text style={profileStyles.navItemText}>Uso</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={[
                    profileStyles.navItem, 
                    activeTab === 'dados' 
                        ? profileStyles.navItemActive 
                        : profileStyles.navItemInactive
                ]}
                onPress={handleDados}
                activeOpacity={0.7}
            >
                <Ionicons name="person-outline" size={28} color="#000000" />
                <Text style={profileStyles.navItemText}>Dados</Text>
            </TouchableOpacity>
        </View>
    );
};

