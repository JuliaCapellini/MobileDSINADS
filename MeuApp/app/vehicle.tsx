import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { BackButton, CustomButton, CustomInput } from "../src/components";
import { commonStyles, vehicleStyles } from '../src/styles';
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Vehicle() {
    const [nome, setNome] = useState("");
    const [placa, setPlaca] = useState("");
    const [tipo, setTipo] = useState("");

    const handleBack = () => {
        console.log('Voltar pressionado')
        router.back()
    }

    function salvar() {
        console.log({ nome, placa, tipo });
        //alert("Veículo cadastrado com sucesso!");
    }

    return (
        <SafeAreaView style={commonStyles.container}>
            <BackButton onPress={handleBack} />

            <View style={vehicleStyles.container}>
                <Text style={vehicleStyles.title}>Cadastrar Veículo</Text>

            <CustomInput
                label="Nome"
                placeholder="digite o nome do veiculo"
                value={nome}
                onChangeText={setNome}
                keyboardType="default"
            />

            <CustomInput
                label="Placa"
                placeholder="digite a placa do veiculo"
                value={placa}
                onChangeText={setPlaca}
                keyboardType="default"
            />

            <CustomInput
                label="Tipo"
                placeholder="digite o tipo do veiculo"
                value={tipo}
                onChangeText={setTipo}
                keyboardType="default"
            />

            <TouchableOpacity style={vehicleStyles.saveButton} onPress={salvar}>
                <Text style={vehicleStyles.saveButtonText}>Salvar Veículo</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    );
}
