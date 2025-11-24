import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { AuthProvider } from '../src/context';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="phoneRegister" options={{ headerShown: false }} />
        <Stack.Screen name="parking" options={{ headerShown: false }} />
        <Stack.Screen name="usage" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="vehicle" options={{ headerShown: false }} />
        <Stack.Screen name="registerVehicle" options={{ headerShown: false }} />
        <Stack.Screen name="userProfile" options={{ headerShown: false }} />
        <Stack.Screen name="balance" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </AuthProvider>
  );
}
