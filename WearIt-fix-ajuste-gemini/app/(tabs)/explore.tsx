import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  Button,
  Alert,
} from 'react-native';

import Carousel from 'react-native-reanimated-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as NavigationBar from 'expo-navigation-bar';
import * as FileSystem from 'expo-file-system'; 
import { styles as importedStyles } from '../../src/styles/tabTwoScreen';
import { API_URL } from '../../src/services/api';

interface CarouselImage {
  uri: string;
  base64?: string;
}

interface UserData {
  nome?: string;
  sobrenome?: string;
}

export default function TabTwoScreen() {
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);
  const [user, setUser] = useState<UserData>({});
  

const PROMPT_PADRAO =
  "Pegue a roupa da imagem 1 e vista a pessoa da imagem 2. A imagem resultante deve ser fotorrealista e preservar as características da pessoa";

const [prompt, setPrompt] = useState<string>(PROMPT_PADRAO);

const atualizarPrompt = (valor?: string) => {
  setPrompt(PROMPT_PADRAO); 
};

  
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    async function initialize() {
      try {
        const savedUser = await AsyncStorage.getItem('userInfo');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser({ nome: userData.sobrenome || userData.nome });
        }
        // Limpa imagens anteriores ao iniciar para evitar confusão de contexto
        await AsyncStorage.removeItem('carouselImages');
        setCarouselImages([]);
      } catch (error) {
        console.error(error);
      }
    }
    initialize();
  }, []);

  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBehaviorAsync('overlay-swipe');
  }, []);

  async function uriToBase64(uri: string) {
    try {
      const cleanUri = uri.split('?')[0];
      const base64 = await FileSystem.readAsStringAsync(cleanUri, { encoding: FileSystem.EncodingType.Base64 });
      
       return `data:image/jpeg;base64,${base64}`;
    } catch (e) {
      console.error("Erro ao converter base64:", e);
      return "";
    }
  }

  const handleGenerate = async () => {
    if (!prompt) {
        alert("Por favor, digite o que você deseja fazer (ex: 'Vista o vestido da imagem 1 na modelo da imagem 2').");
        return;
    }
    
    if (carouselImages.length === 0) {
        alert("Por favor, adicione pelo menos uma imagem.");
        return;
    }

    setLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const base64Images: string[] = [];

      for (const item of carouselImages) {
        let b64 = item.base64;
        
        if (!b64 || b64.length < 100) {
            b64 = await uriToBase64(item.uri);
        }
        
        if (b64) base64Images.push(b64);
      }

      console.log(`Enviando ${base64Images.length} imagens e prompt...`);

      const res = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt, 
          images: base64Images,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Erro API: ${res.status}`);
      }

      const data = await res.json();
      
      if (data.imageUrl) {
         setGeneratedImageUrl(data.imageUrl);
         setModalVisible(true);
      } else {
         throw new Error("A API não retornou uma imagem.");
      }

    } catch (error: any) {
      console.error(error);
      setError(error.message || 'Erro ao gerar imagem.');
      Alert.alert("Erro", error.message || "Falha na geração");
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
        Alert.alert("Permissão necessária", "Precisamos de acesso à galeria.");
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      quality: 0.8, 
      base64: true, 
    });

    if (result.canceled) return;

    const asset = result.assets[0];
    const newImageUri = asset.uri;
    const base64Data = asset.base64;

    if (base64Data) {
      const imageObject: CarouselImage = {
        uri: newImageUri,
        base64: `data:image/jpeg;base64,${base64Data}`
      };
      
      const updatedImages = [...carouselImages, imageObject];
      setCarouselImages(updatedImages);

      try {
        await AsyncStorage.setItem('carouselImages', JSON.stringify(updatedImages));
      } catch (error) {
        console.error("Erro storage:", error);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={importedStyles.container}>
        
        <View style={styles.headerview}>
          <View style={styles.cardHeader}>
             <Text style={styles.text}>{user.nome || 'Usuário'}</Text>
             <View style={styles.navIcon}>
               <Feather name="search" size={32} color="black" />
             </View>
             <View style={styles.navIcon}>
               <Feather name="settings" size={32} color="black" />
             </View>
             <View style={styles.navIcon}>
               <Feather name="menu" size={32} color="black" />
             </View>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>✨ Resultado ✨</Text>

              <View style={styles.modalImageContainer}>
                {loading ? (
                   <ActivityIndicator size="large" color="#000" />
                ) : generatedImageUrl ? (
                   <Image 
                      source={{ uri: generatedImageUrl }} 
                      style={styles.generatedImage}
                      contentFit="contain" 
                      transition={1000}
                   />
                ) : (
                   <Text>Falha ao carregar imagem.</Text>
                )}
              </View>

              <View style={{flexDirection: 'row', gap: 10}}>
                <TouchableOpacity
                  style={[styles.modalButton, {backgroundColor: '#333'}]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={importedStyles.headerview}>
          <View style={importedStyles.cardHeader}>
            <Text style={importedStyles.text}>{user.nome || 'Name'}</Text>
            <View style={importedStyles.userIcon}>
              <FontAwesome6 name="face-grin-wink" size={24} color="black" style={{ marginLeft: 20, marginTop: 10 }} />
            </View>
          </View>
        </View>

        <View style={[importedStyles.carouselContainer, { height: 250 }]}>
            {carouselImages.length > 0 ? (
                <Carousel
                    loop={false}
                    width={395}
                    height={250}
                    autoPlay={false}
                    data={carouselImages}
                    renderItem={({ item, index }) => (
                    <View style={importedStyles.carouselItemContainer}>
                        <Text style={{position: 'absolute', zIndex: 10, top: 10, left: 20, backgroundColor: 'rgba(255,255,255,0.7)', padding: 5, borderRadius: 5}}>
                            Imagem {index + 1}
                        </Text>
                        <Image 
                            source={{ uri: item.uri }} 
                            style={importedStyles.carouselImage} 
                            contentFit="contain" 
                        />
                    </View>
                    )}
                />
            ) : (
                <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#f0f0f0', margin: 20, borderRadius: 10}}>
                    <Text style={{color: '#999'}}>Nenhuma imagem selecionada</Text>
                </View>
            )}
        </View>

        <View style={{ alignItems: 'center', marginTop: 10, flex: 1 }}>
          <View style={{ marginBottom: 10, width: '90%' , minHeight: 35,}}>
            <Button onPress={pickImage} title=" + Adicionar Imagem" color="#00008b"  />
          </View>
            

     {/*  <TextInput
            style={styles.input}
            placeholder="Ex: Pegue o vestido da Imagem 1 e coloque na modelo da Imagem 2. Gere uma foto realista."
            placeholderTextColor="#999"
            value={prompt}
            onChangeText={setPrompt}
            multiline
            numberOfLines={4}
          />
        */}

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity
            style={[styles.carouselButton, { opacity: loading ? 0.7 : 1 }]}
            onPress={handleGenerate}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Gerar Imagem</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  headerview: {
    width: '100%',
    minHeight: 65,
    maxHeight: 85,
    height: '10%',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    elevation: 5,
    marginTop: 35,
    paddingHorizontal: 15,
  },
  navIcon: {
    height: 50,
    minWidth: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    width: '100%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    minHeight: 80,
    maxHeight: 120,
    textAlignVertical: 'top',
    margin: 8,
    width: '90%',
  },
  errorText: { color: 'red', marginTop: 5, textAlign: 'center' },
  carouselButton: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#000',
    height: 55,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },

Button2: {
    marginLeft:20,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#02475cff',
    height: 55,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },

  buttonText: { fontSize: 20, color: 'white', fontWeight: 'bold' },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '90%',
    height: '70%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    elevation: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalImageContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  generatedImage: {
    width: '100%',
    height: '100%',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  modalButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});