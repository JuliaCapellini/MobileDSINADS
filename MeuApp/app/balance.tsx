import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton, CustomInput } from '../src/components';
import { commonStyles, balanceStyles } from '../src/styles';
import { useBalance } from '../src/hooks/useBalance';

export default function BalanceScreen() {
  const { balance, addAmount, setAddAmount, addBalance, formatCurrency } = useBalance(150.75);

  const handleBack = (): void => {
    router.back();
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <BackButton onPress={handleBack} />

      <View style={balanceStyles.container}>
        <Text style={balanceStyles.title}>💳 Seu Saldo</Text>
        
        <View style={balanceStyles.balanceDisplayContainer}>
          <Text style={balanceStyles.balanceLabel}>Saldo Disponível:</Text>
          <Text style={balanceStyles.balanceValue}>
            R$ {formatCurrency(balance)}
          </Text>
        </View>

        <Text style={balanceStyles.sectionTitle}>Adicionar Saldo</Text>
        <CustomInput
          label="Valor a Adicionar"
          placeholder="Ex: 50,00"
          value={addAmount}
          onChangeText={setAddAmount}
          keyboardType="numeric" 
        />

        <TouchableOpacity 
          style={balanceStyles.saveButton} 
          onPress={addBalance}
        >
          <Text style={balanceStyles.saveButtonText}>Adicionar ao Saldo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}