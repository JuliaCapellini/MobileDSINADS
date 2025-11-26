import { Alert, Platform } from 'react-native';

export const showAlert = (title: string, message: string, buttons?: { text: string, onPress?: () => void }[]) => {
    if (Platform.OS === 'web') {
        window.alert(`${title}\n\n${message}`);

        if (buttons && buttons.length > 0) {
            const okButton = buttons.find(b => b.text.toUpperCase() === 'OK' || b.text.toUpperCase() === 'SIM');
            if (okButton && okButton.onPress) {
                okButton.onPress();
            } else {
                const lastButton = buttons[buttons.length - 1];
                if (lastButton.onPress) {
                    lastButton.onPress();
                }
            }
        }
    } else {
        Alert.alert(title, message, buttons);
    }
};
