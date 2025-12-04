import { Image } from 'expo-image';
import React from 'react';

import { LoginForm } from '@/src/components/LoginForm';
import { ThemedView } from '@/src/components/ThemedView';
import { LoginStyles } from '@/src/components/styles/LoginStyles';
import { useAuth } from '@/src/hooks/useAuth';

export default function LoginScreen() {
  const { signIn, isLoadingAuth } = useAuth(); 

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    try {
      await signIn({ email, password });
    } catch (error) {
      console.log('Erro no login:', error);
    }
  };

  return (
    <ThemedView style={LoginStyles.container}>
      <LoginForm onSubmit={handleLogin} isLoading={isLoadingAuth} />
      <Image
        source={require('@/assets/images/wearit-logo.png')}
        style={LoginStyles.logo}
        contentFit="contain"
      />
    </ThemedView>
  );
}
