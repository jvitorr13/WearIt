import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

// Dados das imagens do carrossel
const images = [
  require('@/assets/images/image1.jpg'),
  require('@/assets/images/image2.jpg'),
  require('@/assets/images/image3.jpg'),
];

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isLoading } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      // Você pode adicionar validação aqui
      return;
    }
    
    try {
      await signIn({ email, password });
    } catch (error) {
      console.log('Erro no login:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Carrossel de Imagens */}
      <View style={styles.carouselContainer}>
        <Carousel
          loop
          width={width}
          height={200}
          autoPlay={true}
          data={images}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <View style={styles.carouselItemContainer}>
              <Image source={item} style={styles.carouselImage} />
            </View>
          )}
        />
      </View>

      {/* Formulário de Login */}
      <ThemedView style={styles.formContainer}>
        <ThemedText type="title">Login</ThemedText>
        
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={!isLoading}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!isLoading}
        />
        
        <TouchableOpacity 
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          <ThemedText type="defaultSemiBold" style={styles.loginButtonText}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  carouselContainer: {
    marginBottom: 20,
  },
  carouselItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  carouselImage: {
    width: '80%',
    height: 200,
    borderRadius: 8,
  },
  formContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#4c6ef5',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: '#ccc',
  },
  loginButtonText: {
    color: 'white',
  },
});
