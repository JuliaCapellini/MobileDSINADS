import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNavigationBar } from '../src/components';
import { commonStyles, usoButtonConfig, usoStyles } from '../src/styles';
import { router } from 'expo-router';

export default function UsageScreen() {
  const handleVeiculos = () => {
    console.log('Veículos pressionado');
    router.push('/vehicle');
  };

  const handleActiveParkings = () => {
    console.log('Estacionamentos Ativos pressionado');
    router.push('/parking/active' as any);
  };

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <View style={usoStyles.container}>
        <View style={usoStyles.header} />

        <View style={usoStyles.logoContainer}>
          <Image
            source={require('../assets/images/logos/DSIN.png')}
            style={usoStyles.logo}
          />
        </View>
        <View style={usoStyles.contentArea}>
          <View style={usoStyles.buttonsContainer}>
            <TouchableOpacity
              style={usoStyles.actionButton}
              onPress={handleVeiculos}
              activeOpacity={usoButtonConfig.activeOpacity}
            >
              <Ionicons
                name="car-outline"
                size={usoButtonConfig.iconSize}
                color={usoButtonConfig.iconColor}
                style={usoStyles.actionButtonIcon}
              />
              <Text style={usoStyles.actionButtonText}>Veículos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={usoStyles.actionButton}
              onPress={handleActiveParkings}
              activeOpacity={usoButtonConfig.activeOpacity}
            >
              <Ionicons
                name="time-outline"
                size={usoButtonConfig.iconSize}
                color={usoButtonConfig.iconColor}
                style={usoStyles.actionButtonIcon}
              />
              <Text style={usoStyles.actionButtonText}>Estacionamentos Ativos</Text>
            </TouchableOpacity>
          </View>
        </View>

        <BottomNavigationBar activeTab="usage" />
      </View>
    </SafeAreaView>
  );
}