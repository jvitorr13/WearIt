import React from 'react';
import { Text, Platform, StyleSheet, View, Dimensions, Button, Alert} from 'react-native';
import { Image } from 'expo-image';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Carousel from 'react-native-reanimated-carousel';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';

const { width } = Dimensions.get('window');

const images = [
  require('@/assets/images/image1.jpg'),
  require('@/assets/images/image2.jpg'),
  require('@/assets/images/image3.jpg'),
];

export default function TabTwoScreen() {
  return (
  <View style={styles.container}>

    <View style={styles.headerview}>
      <View style={styles.cardHeader}>  
          <Text style={styles.text}>Name                            </Text>
        <View style={styles.userIcon}>
        </View>   
        <View style={styles.userIcon}>
        </View> 
        <View style={styles.userIcon}>
        </View>   
      </View> 
    </View>
      
    <View style={styles.card}> 
           
      <View style={styles.cardHeader}>
        <View style={styles.userIcon}>
        </View>     
        <View style={styles.userName}>
          <Text style={styles.text}>Username(imput)</Text>
        </View>    
      </View>     
      
        <View style={styles.carouselContainer}>
          <Carousel
            loop
            width={395}
            height={430}
            autoPlay={false}
            data={images}
            renderItem={({ item }) => (
              <View style={styles.carouselItemContainer}>
                <Image source={item} style={styles.carouselImage} />
              </View>
            )}
          />
        </View>

        <View>
          <Button
            onPress={() => Alert.alert('Funcionando')}
            title="Gerar Imagem"
            color="#000000ff"
        />
        </View>

        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Explore</ThemedText>
        </ThemedView>
        <ThemedText>This app includes example code to help you get started.</ThemedText>

        {/* Seções com conteúdo expansível */}
        <Collapsible title="File-based routing">
          <ThemedText>
            This app has two screens:{' '}
            <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
            <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
          </ThemedText>
          <ThemedText>
            The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
            sets up the tab navigator.
          </ThemedText>
          <ExternalLink href="https://docs.expo.dev/router/introduction">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>

        <Collapsible title="Android, iOS, and web support">
          <ThemedText>
            You can open this project on Android, iOS, and the web. To open the web version, press{' '}
            <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Images">
          <ThemedText>
            For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
            <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
            different screen densities
          </ThemedText>
          <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
          <ExternalLink href="https://reactnative.dev/docs/images">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>

        <Collapsible title="Custom fonts">
          <ThemedText>
            Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
            <ThemedText style={{ fontFamily: 'SpaceMono' }}>
              custom fonts such as this one.
            </ThemedText>
          </ThemedText>
          <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>

        <Collapsible title="Light and dark mode components">
          <ThemedText>
            This template has light and dark mode support. The{' '}
            <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
            what the user's current color scheme is, and so you can adjust UI colors accordingly.
          </ThemedText>
          <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>

        <Collapsible title="Animations">
          <ThemedText>
            This template includes an example of an animated component. The{' '}
            <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
            the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText>{' '}
            library to create a waving hand animation.
          </ThemedText>
          {Platform.select({
            ios: (
              <ThemedText>
                The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
                component provides a parallax effect for the header image.
              </ThemedText>
            ),
          })}
        </Collapsible>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  headerview:{
    width: '100%',
    minHeight: 65,
    maxHeight:85,
    height:'10%',
    backgroundColor: '#ffffffff',
    shadowColor: '#000',           
    shadowOffset: { width: 0, height: 4 },  
    shadowOpacity: 0.3,            
    elevation: 5,   
    marginTop:15,
  },

  card:{
    margin:8,
    backgroundColor: '#ffffffff',
    justifyContent: 'center', 
    width:395,
    maxWidth:'96%', 
  },

  cardHeader:{
    flexDirection:'row',
    textAlign:'center',
    paddingTop:12,
  },
  
 userIcon:{
    height:50,
    minWidth:50,
    borderRadius:100,
    width:'12%',
    backgroundColor: '#c9c9c9ff',
  },

  userName:{
    height:50,
    width:345,
    marginBottom:8,
    backgroundColor: '#ffffffff',
  },

  text: {
    flexDirection: 'row',
    gap: 8,
    fontSize:24,
    fontWeight:'bold',
    color:'black',
    paddingLeft:12,
    paddingTop:8,
  },

  box: {
    width: 200,
    height: 200,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',           
    shadowOffset: { width: 0, height: 3 },  
    shadowOpacity: 0.3,            
    shadowRadius: 5,               
    elevation: 1,               
  },

  headerComponent: {
    color: '#c9c9c9ff',
    height: '100%',
    position: 'absolute',
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  container: {
    paddingHorizontal: 0,
    marginTop: 20,
    width:'100%',
    backgroundColor: '#ffffffff',
  },
  carouselContainer: {
    marginBottom: 20,
    width:'100%',
    height:430,
  },
  carouselItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    height:430,
  },
  carouselImage: {
    width: '100%',
    height: 430,
    borderRadius: 8,
    resizeMode:'contain',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
