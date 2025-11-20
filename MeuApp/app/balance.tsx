import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { BackButton, CustomInput } from "../src/components";
import { commonStyles, vehicleStyles, balanceStyles } from '../src/styles';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Balance() {
    const [currentBalance, setCurrentBalance] = useState(150.75);
    
    const [addAmount, setAddAmount] = useState("");

    const handleBack = () => {
        console.log('Voltar pressionado');
        router.back();
    };

    const handleAddBalance = () => {
        const amountToAdd = parseFloat(addAmount.replace(',', '.'));

        if (isNaN(amountToAdd) || amountToAdd <= 0) {
            Alert.alert("Erro", "Por favor, insira um valor válido e maior que zero.");
            return;
        }

        const newBalance = currentBalance + amountToAdd;
        setCurrentBalance(parseFloat(newBalance.toFixed(2)));

        setAddAmount("");

        Alert.alert(
            "Sucesso", 
            `R$ ${amountToAdd.toFixed(2).replace('.', ',')} adicionado(s) com sucesso!\nNovo Saldo: R$ ${newBalance.toFixed(2).replace('.', ',')}`
        );

        console.log(`Saldo atualizado para: R$ ${newBalance.toFixed(2)}`);
    };

    return (
        <SafeAreaView style={commonStyles.container}>
            <BackButton onPress={handleBack} />

            <View style={vehicleStyles.container}>
                <Text style={vehicleStyles.title}>💳 Seu Saldo</Text>
                
                {/* Visualização do Saldo Atual */}
                <View style={balanceStyles.balanceDisplayContainer}>
                    <Text style={balanceStyles.balanceLabel}>Saldo Disponível:</Text>
                    <Text style={balanceStyles.balanceValue}>
                        R$ {currentBalance.toFixed(2).replace('.', ',')}
                    </Text>
                </View>

                {/* Input para Adicionar Saldo */}
                <Text style={balanceStyles.sectionTitle}>Adicionar Saldo</Text>
                <CustomInput
                    label="Valor a Adicionar"
                    placeholder="Ex: 50,00"
                    value={addAmount}
                    onChangeText={setAddAmount}
                    keyboardType="numeric" 
                />

                {/* Botão para Adicionar Saldo */}
                <TouchableOpacity 
                    style={vehicleStyles.saveButton} 
                    onPress={handleAddBalance}
                >
                    <Text style={vehicleStyles.saveButtonText}>Adicionar ao Saldo</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}