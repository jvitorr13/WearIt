import React, { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { Button } from './ui/Button';
import { LoginStyles } from '@/src/components/styles/LoginStyles';

export function LoginForm({ onSubmit, isLoading }: { onSubmit: any; isLoading: boolean }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    onSubmit({ email, password });
  };

  return (
    <View style={LoginStyles.container}>
      <TextInput
        style={LoginStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={LoginStyles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={handleSubmit} disabled={isLoading} variant="primary">
        {isLoading ? 'Carregando...' : 'Entrar'}
      </Button>
    </View>
  );
}
