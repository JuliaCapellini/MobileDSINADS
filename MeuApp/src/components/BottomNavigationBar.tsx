import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { profileStyles } from '../styles';

type ActiveTab = 'parking' | 'usage' | 'profile';

interface BottomNavigationBarProps {
    activeTab?: ActiveTab;
}

export const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({ activeTab = 'profile' }) => {
    const handleParking = () => {
        console.log('Parking pressionado');
        router.push('/parking');
    };

    const handleUsage = () => {
        console.log('Usage pressionado');
        router.push('/usage');
    };

    const handleProfile = () => {
        console.log('Profile pressionado');
        router.push('/profile');
    };

    return (
        <View style={profileStyles.navigationBar}>
            <TouchableOpacity 
                style={[
                    profileStyles.navItem, 
                    activeTab === 'parking' 
                        ? profileStyles.navItemActive 
                        : profileStyles.navItemInactive
                ]}
                onPress={handleParking}
                activeOpacity={0.7}
            >
                <Ionicons name="car-outline" size={28} color="#000000" />
                <Text style={profileStyles.navItemText}>Estacionar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={[
                    profileStyles.navItem, 
                    activeTab === 'usage' 
                        ? profileStyles.navItemActive 
                        : profileStyles.navItemInactive
                ]}
                onPress={handleUsage}
                activeOpacity={0.7}
            >
                <Ionicons name="grid-outline" size={28} color="#000000" />
                <Text style={profileStyles.navItemText}>Uso</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={[
                    profileStyles.navItem, 
                    activeTab === 'profile' 
                        ? profileStyles.navItemActive 
                        : profileStyles.navItemInactive
                ]}
                onPress={handleProfile}
                activeOpacity={0.7}
            >
                <Ionicons name="person-outline" size={28} color="#000000" />
                <Text style={profileStyles.navItemText}>Dados</Text>
            </TouchableOpacity>
        </View>
    );
};

