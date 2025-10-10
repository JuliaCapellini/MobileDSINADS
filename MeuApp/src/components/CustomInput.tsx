import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, spacing } from '../styles';

export interface InputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric' | 'phone-pad' | 'email-address' | 'number-pad' | 'decimal-pad';
}

export const CustomInput: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.white}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
    width: '100%',
  },
  label: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    color: colors.white,
    fontSize: 16,
  },
});
