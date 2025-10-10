import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, spacing } from '../styles';

export interface BackButtonProps {
  onPress: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.arrow}>‹</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
    zIndex: 1,
  },
  arrow: {
    color: colors.white,
    fontSize: 32,
    fontWeight: 'bold',
  },
});
