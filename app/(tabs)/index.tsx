import React, { useState } from 'react';
import { Platform, StyleSheet, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import Carousel from 'react-native-reanimated-carousel';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width } = Dimensions.get('window');

const images = [
  require('@/assets/images/image1.jpg'),
  require('@/assets/images/image2.jpg'),
  require('@/assets/images/image3.jpg'),
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
          <ThemedText type="button">Login</ThemedText>
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
    height: 200, // Ajuste conforme necessário
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
