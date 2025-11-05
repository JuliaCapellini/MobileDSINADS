import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, profileStyles } from '../src/styles';

export default function DadosScreen() {
    const userName = 'Nome do Usuário';

    const handleUserButton = () => {
        console.log('Botão Usuário pressionado');
    };

    const handleLogout = () => {
        console.log('Sair pressionado');
        router.replace('/');
    };

    return (
        <SafeAreaView style={commonStyles.container} edges={['top']}>
            <View style={profileStyles.container}>
                <View style={profileStyles.header}>
                    <View style={profileStyles.avatarContainer}>
                        <Ionicons name="person" size={40} color="#B0BEC5" />
                    </View>
                    <View style={profileStyles.userInfo}>
                        <Text style={profileStyles.userLabel}>Usuário</Text>
                        <Text style={profileStyles.userName}>{userName}</Text>
                    </View>
                </View>

                <TouchableOpacity 
                    style={profileStyles.userButton}
                    onPress={handleUserButton}
                    activeOpacity={0.7}
                >
                    <Ionicons name="person-outline" size={30} color="#000000" />
                    <Text style={profileStyles.userButtonText}>Usuário</Text>
                </TouchableOpacity>

                <View style={profileStyles.contentArea}>

                </View>

                <TouchableOpacity 
                    style={profileStyles.logoutButton}
                    onPress={handleLogout}
                    activeOpacity={0.7}
                >
                    <Ionicons name="exit-outline" size={40} color="#000000" />
                    <Text style={profileStyles.logoutButtonText}>Sair</Text>
                </TouchableOpacity>

                <View style={profileStyles.navigationBar}>
                    <TouchableOpacity 
                        style={[profileStyles.navItem, profileStyles.navItemInactive]}
                        onPress={() => console.log('Estacionar pressionado')}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="car-outline" size={28} color="#000000" />
                        <Text style={profileStyles.navItemText}>Estacionar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[profileStyles.navItem, profileStyles.navItemInactive]}
                        onPress={() => console.log('Uso pressionado')}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="grid-outline" size={28} color="#000000" />
                        <Text style={profileStyles.navItemText}>Uso</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[profileStyles.navItem, profileStyles.navItemActive]}
                        onPress={() => console.log('Dados pressionado')}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="person-outline" size={28} color="#000000" />
                        <Text style={profileStyles.navItemText}>Dados</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

