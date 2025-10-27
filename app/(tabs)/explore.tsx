import { Image } from 'expo-image';
import React from 'react';
import { Alert, Button, Dimensions, View, Text, Modal, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { downloadAsync } from 'expo-file-system/legacy';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { styles } from '../../src/styles/tabTwoScreen';

const { width } = Dimensions.get('window');

const defaultImages = [
  require('@/assets/images/react-logo.png'),
  require('@/assets/images/react-logo.png'),
  require('@/assets/images/react-logo.png'),
];

export default function TabTwoScreen() {
  const [carouselImages, setCarouselImages] = React.useState<(string | number)[]>(defaultImages);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [generatedImage, setGeneratedImage] = React.useState<string>('');
  const [user, setUser] = React.useState<{ nome?: string }>({});


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
  React.useEffect(() => {
    async function loadUser() {
      try {
        const savedUser = await AsyncStorage.getItem('userInfo');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData.sobrenome);
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      }
    }

    loadUser();
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
      mediaTypes: ['images'],
      quality: 1,
    });
    if (!result.canceled) {
      const newImage = result.assets[0].uri;
      const updatedImages = [...carouselImages, newImage];
      setCarouselImages(updatedImages);
      try {
        await AsyncStorage.setItem('carouselImages', JSON.stringify(updatedImages));
        await uploadImages(updatedImages);
      } catch (error) {
        console.error('Erro ao salvar imagem no carousel ou enviar:', error);
      }
    }
  };

  const generateImage = async () => {
    try {
      // Realize a requisição para sua API. Exemplo:
      const response = await fetch('https://api', {
        method: 'GET' // ou 'POST', conforme sua API
      });
      const data = await response.json();
      // Considere que a API retorna a URL da imagem em data.imageUrl
      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        setModalVisible(true);
      } else {
        Alert.alert('Erro', 'A imagem não foi retornada pela API');
      }
    } catch (error) {
      console.error('Erro ao gerar imagem:', error);
      Alert.alert('Erro', 'Não foi possível gerar a imagem');
    }
  };

const downloadImage = async () => {
  try {
    const dir = (FileSystem as unknown as { documentDirectory: string }).documentDirectory;
    const fileUri = dir + 'generatedImage.jpg';
    const { uri } = await FileSystem.downloadAsync(generatedImage, fileUri);
    Alert.alert('Download concluído', `Imagem salva em: ${uri}`);
  } catch (error) {
    console.error('Erro ao baixar a imagem:', error);
    Alert.alert('Erro', 'Não foi possível baixar a imagem');
  }
};


  return (
    <View style={styles.container}>
      <View style={styles.headerview}>
        <View style={styles.cardHeader}>
          <Text style={styles.text}>{user.nome || "Name"}</Text>
           <View style={styles.userIcon}>
             <FontAwesome6
                name="face-grin-wink"
                size={24}
                color="black"
                style={{ marginLeft: 20, marginTop: 10 }}
              />
          </View>
        </View>
      </View>

      <View style={{ alignItems: 'center', marginTop: 60 }}>  

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
          <Button onPress={generateImage} title="Gerar Imagem" color="#000000ff" />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Button onPress={showUserData} title="Ver dados do usuário" color="#000000" />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Button onPress={pickImage} title="Inserir Imagem" color="#00008b" />
        </View>
      </View>

      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalText}>Imagem Gerada</Text>
            {generatedImage ? (
              <Image source={{ uri: generatedImage }} style={modalStyles.generatedImage} contentFit="contain" />
            ) : null}
            <View style={{ marginTop: 10 }}>
              <Button title="Baixar Imagem" onPress={downloadImage} />
            </View>
            <View style={{ marginTop: 10 }}>
              <Button title="Fechar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const uploadImages = async (images: (string | number)[]) => {
  const formData = new FormData();

  images.forEach((img, index) => {
    if (typeof img === 'string') {
      const uri = img;
      const filename = uri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename || '');
      let type = match ? `image/${match[1]}` : `image`;
      formData.append('photos', {
        uri,
        name: filename,
        type,
      } as any);
    }
  });

  try {
    const response = await fetch('https://api', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const json = await response.json();
    console.log('Imagens enviadas com sucesso:', json);
  } catch (error) {
    console.error('Erro ao enviar imagens:', error);
  }
};

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  generatedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});