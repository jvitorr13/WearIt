import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle
} from 'react-native';

import { ThemedText } from '../ThemedText';

interface ButtonProps extends TouchableOpacityProps {
  children: string;
  variant: 'primary' | 'secondary';
  style?: ViewStyle;
}

export function Button({ children, variant, style, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.button,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
        style
      ]} 
      {...rest}
    >
      <ThemedText 
        style={[
          styles.text,
          variant === 'primary' ? styles.primaryText : styles.secondaryText
        ]}
      >
        {children}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#000000',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000000',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#000000',
  },
});