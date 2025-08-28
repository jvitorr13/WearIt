import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const images = [
  require('@/assets/images/react-logo.png'),
  require('@/assets/images/react-logo.png'),
  require('@/assets/images/react-logo.png'),
];

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
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
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <ThemedText type="defaultSemiBold">Login</ThemedText>
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
});