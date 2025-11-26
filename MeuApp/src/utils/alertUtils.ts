import { Alert, Platform } from 'react-native';

export const showAlert = (title: string, message: string, buttons?: { text: string, onPress?: () => void }[]) => {
    if (Platform.OS === 'web') {
        // Simple web implementation
        // If there are buttons, we can try to simulate a confirm if there's a "cancel" like option, 
        // but for now let's just alert and run the last button's action or the "OK" action.

        // If it's a success message with a navigation callback, we want to ensure it runs.
        // window.alert is blocking.
        window.alert(`${title}\n\n${message}`);

        // If there is a button with an onPress, execute it.
        // Usually the positive action is the last one or the one labeled OK.
        if (buttons && buttons.length > 0) {
            const okButton = buttons.find(b => b.text.toUpperCase() === 'OK' || b.text.toUpperCase() === 'SIM');
            if (okButton && okButton.onPress) {
                okButton.onPress();
            } else {
                // Fallback: execute the last button's action if it exists
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
