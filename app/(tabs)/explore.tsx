import { Image } from 'expo-image';
import React from 'react';
import { Alert, Button, Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

const defaultImages = [
  require('@/assets/images/react-logo.png'),
  require('@/assets/images/react-logo.png'),
  require('@/assets/images/react-logo.png'),
];

export default function TabTwoScreen() {
  const [carouselImages, setCarouselImages] = React.useState<(string | number)[]>(defaultImages);

  React.useEffect(() => {
    async function loadImages() {
      try {
        const savedImages = await AsyncStorage.getItem('carouselImages');
        if (savedImages) {
          const parsedImages = JSON.parse(savedImages);
          setCarouselImages(parsedImages);
        }
      } catch (error) {
        console.error('Erro ao carregar as imagens do carousel:', error);
      }
    }
    loadImages();
  }, []);

  const showUserData = async () => {
    try {
      const user = await AsyncStorage.getItem('wearit.user');
      console.log('Usuário encontrado:', user);
      if (user) {
        const parsedUser = JSON.parse(user);
        const message = Object.entries(parsedUser)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n');
        Alert.alert('Dados do usuário', message);
      } else {
        Alert.alert('Dados do usuário', 'Nenhum usuário encontrado');
      }
    } catch (error) {
      console.error('Erro ao ler AsyncStorage:', error);
      Alert.alert('Erro', 'Não foi possível ler os dados do usuário');
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permissão negada', 'Precisamos da permissão para acessar a galeria.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      const newImage = result.assets[0].uri;
      const updatedImages = [...carouselImages, newImage];
      setCarouselImages(updatedImages);
      try {
        await AsyncStorage.setItem('carouselImages', JSON.stringify(updatedImages));
      } catch (error) {
        console.error('Erro ao salvar imagem no carousel:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerview}>
        <View style={styles.cardHeader}>
          <Text style={styles.text}>Name</Text>
          <View style={styles.userIcon}></View>
          <View style={styles.userIcon}></View>
          <View style={styles.userIcon}></View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.userIcon}></View>
          <View style={styles.userName}>
            <Text style={styles.text}>Username(input)</Text>
          </View>
        </View>

        <View style={styles.carouselContainer}>
          <Carousel
            loop
            width={395}
            height={430}
            autoPlay={false}
            data={carouselImages}
            renderItem={({ item }) => (
              <View style={styles.carouselItemContainer}>
                <Image source={item} style={styles.carouselImage} contentFit="contain" />
              </View>
            )}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Button
            onPress={() => Alert.alert('Funcionando')}
            title="Gerar Imagem"
            color="#000000ff"
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Button onPress={showUserData} title="Ver dados do usuário" color="#000000" />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Button onPress={pickImage} title="Inserir Imagem" color="#00008b" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerview: {
    width: '100%',
    minHeight: 65,
    maxHeight: 85,
    height: '10%',
    backgroundColor: '#ffffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    elevation: 5,
    marginTop: 15,
  },
  card: {
    margin: 8,
    backgroundColor: '#ffffffff',
    justifyContent: 'center',
    width: 395,
    maxWidth: '96%',
  },
  cardHeader: {
    flexDirection: 'row',
    textAlign: 'center',
    paddingTop: 12,
  },
  userIcon: {
    height: 50,
    minWidth: 50,
    borderRadius: 100,
    width: '12%',
    backgroundColor: '#c9c9c9ff',
    marginHorizontal: 4,
  },
  userName: {
    height: 50,
    width: 345,
    marginBottom: 8,
    backgroundColor: '#ffffffff',
  },
  text: {
    flexDirection: 'row',
    gap: 8,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 12,
    paddingTop: 8,
  },
  container: {
    paddingHorizontal: 0,
    marginTop: 20,
    width: '100%',
    backgroundColor: '#ffffffff',
  },
  carouselContainer: {
    marginBottom: 20,
    width: '100%',
    height: 430,
  },
  carouselItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 430,
  },
  carouselImage: {
    width: '100%',
    height: 430,
    borderRadius: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});