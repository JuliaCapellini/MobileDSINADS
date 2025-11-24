import { useState } from 'react';
import { Alert } from 'react-native';

export const useBalance = (initialBalance: number = 0) => {
  const [balance, setBalance] = useState(initialBalance);
  const [addAmount, setAddAmount] = useState('');

  const formatCurrency = (value: number): string => {
    return value.toFixed(2).replace('.', ',');
  };

  const parseAmount = (value: string): number => {
    return parseFloat(value.replace(',', '.'));
  };

  const addBalance = (): void => {
    const amountToAdd = parseAmount(addAmount);

    if (isNaN(amountToAdd) || amountToAdd <= 0) {
      Alert.alert("Erro", "Por favor, insira um valor válido e maior que zero.");
      return;
    }

    const newBalance = balance + amountToAdd;
    setBalance(parseFloat(newBalance.toFixed(2)));
    setAddAmount("");

    Alert.alert(
      "Sucesso", 
      `R$ ${formatCurrency(amountToAdd)} adicionado(s) com sucesso!\nNovo Saldo: R$ ${formatCurrency(newBalance)}`
    );
  };

  return {
    balance,
    addAmount,
    setAddAmount,
    addBalance,
    formatCurrency,
  };
};


