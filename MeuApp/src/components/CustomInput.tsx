import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { colors, formStyles } from '../styles';

export interface InputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric' | 'phone-pad' | 'email-address' | 'number-pad' | 'decimal-pad';
  editable?: boolean;
  maxLength?: number;
}

export const CustomInput: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  editable = true,
  maxLength,
}) => {
  return (
    <View style={formStyles.inputContainer}>
      <Text style={formStyles.inputLabel}>{label}</Text>
      <TextInput
        style={[formStyles.input, !editable && formStyles.inputDisabled]}
        placeholder={placeholder}
        placeholderTextColor={colors.white}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        editable={editable}
        maxLength={maxLength}
      />
    </View>
  );
};
