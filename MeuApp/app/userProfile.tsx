import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { BackButton } from "../src/components";
import { commonStyles, userProfileStyles } from '../src/styles';
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserProfile() {
    const [fullName, getFullName] = useState('');
    const [email, getEmail] = useState('');
    const [phone, getPhone] = useState('');
    const [birthDate, getBirthDate] = useState('');
    const [cpf, getCpf] = useState('');

    const handleBack = () => {
        console.log('Voltar pressionado');
        router.back();
    };

    return (
        <SafeAreaView style={commonStyles.container}>
            <BackButton onPress={handleBack} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <Text style={userProfileStyles.title}>Dados Cadastrais</Text>

                <View style={userProfileStyles.fieldContainer}>
                    <Text style={userProfileStyles.label}>Nome</Text>
                    <Text style={userProfileStyles.value}>{fullName}</Text>
                </View>

                <View style={userProfileStyles.fieldContainer}>
                    <Text style={userProfileStyles.label}>Email</Text>
                    <Text style={userProfileStyles.value}>{email}</Text>
                </View>

                <View style={userProfileStyles.fieldContainer}>
                    <Text style={userProfileStyles.label}>Celular</Text>
                    <Text style={userProfileStyles.value}>{phone}</Text>
                </View>

                <View style={userProfileStyles.fieldContainer}>
                    <Text style={userProfileStyles.label}>Data de Nascimento</Text>
                    <Text style={userProfileStyles.value}>{birthDate}</Text>
                </View>

                <View style={userProfileStyles.fieldContainer}>
                    <Text style={userProfileStyles.label}>CPF</Text>
                    <Text style={userProfileStyles.value}>{cpf}</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}