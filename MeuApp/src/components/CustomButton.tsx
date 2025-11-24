import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ButtonVariant, buttonStyles } from '../styles';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
}

export const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}) => {
  const getButtonStyle = () => {
    const baseStyle = [buttonStyles.base];
    if (variant === 'primary') {
      baseStyle.push(buttonStyles.primary);
    } else {
      baseStyle.push(buttonStyles.secondary);
    }
    if (disabled) {
      baseStyle.push(buttonStyles.disabled);
    }
    return baseStyle;
  };

  const getTextStyle = () => {
    return variant === 'primary' ? buttonStyles.text : buttonStyles.text;
  };

  return (
    <TouchableOpacity 
      style={getButtonStyle()} 
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};
