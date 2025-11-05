import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="numberRegister" options={{ headerShown: false }} />
        <Stack.Screen name="codeRegister" options={{ headerShown: false }} />
        <Stack.Screen name="screenHome" options={{ headerShown: false }} />
        <Stack.Screen name="dados" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
