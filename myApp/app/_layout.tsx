import { ThemedText } from '@/src/components/ThemedText';
import { AuthProvider } from '@/src/contexts/AuthContext';
import { useAuth } from '@/src/hooks/useAuth';

import { Slot } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

function RootLayoutNav() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>Carregando...</ThemedText>
      </View>
    );
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav /> {}
    </AuthProvider>
  );
}
