import React from 'react';
import { Image, View } from 'react-native';
import { loginStyles } from '../styles';
import { LogoProps } from '../types';

export const Logo: React.FC<LogoProps> = ({
  source,
  width = 200,
  height = 80,
}) => {
  return (
    <View style={loginStyles.logoContainer}>
      <Image 
        source={source} 
        style={[loginStyles.logo, { width, height }]}
        resizeMode="contain"
      />
    </View>
  );
};
