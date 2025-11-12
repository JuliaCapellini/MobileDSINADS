import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNavigationBar } from '../src/components';
import { commonStyles, usoButtonConfig, usoStyles } from '../src/styles';

export default function UsageScreen() {
  const handleVeiculos = () => {
    console.log('Veículos pressionado');
    // router.push('/veiculos'); // Será implementado futuramente
  };

  const handleHistoricoPagamento = () => {
    console.log('Histórico de pagamento pressionado');
    // router.push('/historicoPagamento'); // Será implementado futuramente
  };

  const handleMeuSaldo = () => {
    console.log('Meu Saldo pressionado');
    // router.push('/meuSaldo'); // Será implementado futuramente
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

        {/* Área de conteúdo com botões */}
        <View style={usoStyles.contentArea}>
          <View style={usoStyles.buttonsContainer}>
            {/* Botão Veículos */}
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

            {/* Botão Histórico de pagamentos */}
            <TouchableOpacity
              style={usoStyles.actionButton}
              onPress={handleHistoricoPagamento}
              activeOpacity={usoButtonConfig.activeOpacity}
            >
              <Ionicons
                name="receipt-outline"
                size={usoButtonConfig.iconSize}
                color={usoButtonConfig.iconColor}
                style={usoStyles.actionButtonIcon}
              />
              <Text style={usoStyles.actionButtonText}>
                Histórico de pagamentos
              </Text>
            </TouchableOpacity>

            {/* Botão Meu Saldo */}
            <TouchableOpacity
              style={usoStyles.actionButton}
              onPress={handleMeuSaldo}
              activeOpacity={usoButtonConfig.activeOpacity}
            >
              <Ionicons
                name="wallet-outline"
                size={usoButtonConfig.iconSize}
                color={usoButtonConfig.iconColor}
                style={usoStyles.actionButtonIcon}
              />
              <Text style={usoStyles.actionButtonText}>Meu Saldo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Barra de navegação */}
        <BottomNavigationBar activeTab="usage" />
      </View>
    </SafeAreaView>
  );
}

