import { router, useNavigation } from 'expo-router';
import React, { useState, useLayoutEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton, CustomButton, CustomInput } from '../src/components';
import { commonStyles, registerStyles } from '../src/styles';
import { MESSAGES } from '../src/utils';

export default function RegisterScreen() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);
    const [code, setCode] = useState('');

    const handleBack = () => {
        console.log('Voltar pressionado');
        router.back();
    };

    const handleContinue = () => {
        console.log('Continuar pressionado', {
            code
        });
        router.push('/register');
    };

    return (
        <SafeAreaView style={commonStyles.container}>
        <BackButton onPress={handleBack} />
        
            <View style={registerStyles.content}>
                <Text style={registerStyles.title}>{MESSAGES.REGISTER_TITLE}</Text>
        
                <View style={registerStyles.formContainer}>
                    <CustomInput
                        label="Insira o código"
                        placeholder="Digite o código enviado"
                        value={code}
                        onChangeText={setCode}
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
