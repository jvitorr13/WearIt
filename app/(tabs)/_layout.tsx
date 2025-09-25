import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 80 : 60,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 8,
          borderTopWidth: 0.5,
          borderTopColor: '#ddd',
          backgroundColor: '#fff',
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Dados Usuário' }} />
      <Tabs.Screen name="explore" options={{ title: 'Gerar imagens' }} />
    </Tabs>
  );
}
