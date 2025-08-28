import React from 'react';
import { Keyboard, TextInput, TouchableWithoutFeedback, View } from 'react-native';

import { LoginStyles } from './styles/LoginStyles';
import { Button } from './ui/Button';

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  isLoading?: boolean;
}

export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = () => {
    if (!email.trim() || !password.trim()) {
      // Adicione feedback de erro se quiser
      return;
    }
    onSubmit({ email, password });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={LoginStyles.form}>
        <TextInput
          style={LoginStyles.input}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!isLoading}
          returnKeyType="next"
          textContentType="emailAddress"
          autoComplete="email"
        />
        <TextInput
          style={LoginStyles.input}
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!isLoading}
          returnKeyType="done"
          textContentType="password"
          autoComplete="password"
          onSubmitEditing={handleSubmit}
        />
        
        <Button
          variant="primary"
          onPress={handleSubmit}
          style={LoginStyles.loginButton}
          disabled={isLoading}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>
        <Button
          variant="secondary"
          //onPress={() => router.push('/auth/register')}
          style={LoginStyles.createAccountButton}
          disabled={isLoading}
        >
          Criar conta
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
}