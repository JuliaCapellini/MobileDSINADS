import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton, Logo } from '../src/components';
import { commonStyles, loginStyles } from '../src/styles';
import { APP_CONFIG, MESSAGES } from '../src/utils';

export default function HomeScreen() {
  const handleCreateAccount = () => {
    console.log(MESSAGES.CREATE_ACCOUNT_PRESSED);
    router.push('/phoneRegister');
  };

  const handleLogin = () => {
    console.log(MESSAGES.LOGIN_PRESSED);
    router.push('/login');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.content}>
        <Logo 
          source={APP_CONFIG.LOGO_URL}
          width={APP_CONFIG.LOGO_WIDTH}
          height={APP_CONFIG.LOGO_HEIGHT}
        />

        <View style={loginStyles.buttonsContainer}>
          <CustomButton
            title={MESSAGES.CREATE_ACCOUNT}
            onPress={handleCreateAccount}
            variant="secondary"
          />

          <CustomButton
            title={MESSAGES.LOGIN}
            onPress={handleLogin}
            variant="primary"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
