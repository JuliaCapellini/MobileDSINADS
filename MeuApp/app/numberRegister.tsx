import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton, CustomButton, CustomInput } from '../src/components';
import { commonStyles, registerStyles } from '../src/styles';
import { MESSAGES } from '../src/utils';

export default function RegisterScreen() {
    const [country, setCountry] = useState('');
    const [number, setNumber] = useState('');

    const handleBack = () => {
    console.log('Voltar pressionado');
    router.back();
    };

    const handleContinue = () => {
        console.log('Continuar pressionado', {
            country,
            number
        });
        router.push('/codeRegister');
    };

    return (
        <SafeAreaView style={commonStyles.container}>
            <BackButton onPress={handleBack} />

            <View style={registerStyles.content}>
                <Text style={registerStyles.title}>{MESSAGES.REGISTER_TITLE}</Text>
        
                <View style={registerStyles.formContainer}>
                    <CustomInput
                        label="Escolha um país"
                        placeholder="Brasil (+55)"
                        value={country}
                        onChangeText={setCountry}
                        keyboardType="default"
                    />
                    <CustomInput
                        label="Insira seu telefone"
                        placeholder=''
                        value={number}
                        onChangeText={setNumber}
                        keyboardType="default"
                    />
                </View>
        
                <View style={registerStyles.buttonContainer}>
                    <CustomButton
                        title={MESSAGES.CONTINUE}
                        onPress={handleContinue}
                        variant="primary"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
