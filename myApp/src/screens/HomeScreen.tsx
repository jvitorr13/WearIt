import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { Button } from '@/src/components/ui/Button';
import { useAuth } from '@/src/hooks/useAuth';
import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const images = [
  require('@/assets/images/react-logo.png'),
  require('@/assets/images/react-logo.png'),
  require('@/assets/images/react-logo.png'),
];

export default function HomeScreen() {
  const { signOut } = useAuth();

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

      {/* Conteúdo da Home */}
      <ThemedView style={styles.contentContainer}>
        <ThemedText type="title">Bem-vindo ao WearIt!</ThemedText>
        <ThemedText style={styles.description}>
          Explore nossa coleção de roupas e encontre o estilo perfeito para você.
        </ThemedText>
        
        <Button
          variant="secondary"
          onPress={signOut}
          style={styles.logoutButton}
        >
          Sair
        </Button>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  carouselContainer: {
    marginTop: 20,
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
  contentContainer: {
    marginHorizontal: 20,
    flex: 1,
  },
  description: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
  logoutButton: {
    marginTop: 30,
    alignSelf: 'center',
  },
});
