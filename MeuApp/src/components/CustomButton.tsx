import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { loginStyles } from '../styles';
import { ButtonProps } from '../types';

export const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}) => {
  const buttonStyle = variant === 'primary' 
    ? [loginStyles.button, loginStyles.primaryButton]
    : [loginStyles.button, loginStyles.secondaryButton];

  return (
    <TouchableOpacity 
      style={[buttonStyle, disabled && styles.disabled]} 
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={loginStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});
