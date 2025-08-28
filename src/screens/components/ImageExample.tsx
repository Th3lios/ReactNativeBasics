import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ImageExample = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const networkImages = [
    'https://picsum.photos/300/200?random=1',
    'https://picsum.photos/300/200?random=2',
    'https://picsum.photos/300/200?random=3',
  ];

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
    Alert.alert('Error', 'No se pudo cargar la imagen');
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.title}>Image Component</Text>
          <Text style={styles.description}>
            El componente Image muestra imágenes desde diversas fuentes: 
            locales, remotas, recursos estáticos o data URIs. Soporta 
            diferentes modos de redimensionamiento y eventos de carga.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Imagen Local (Placeholder)</Text>
          <View style={styles.imageContainer}>
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>📷</Text>
              <Text style={styles.placeholderLabel}>Imagen Local</Text>
            </View>
          </View>
          <Text style={styles.note}>
            Para usar imágenes locales, agrégalas a la carpeta assets y usa require('./assets/imagen.png')
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Imagen de Red</Text>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://picsum.photos/300/200?random=0' }}
              style={styles.networkImage}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            {imageLoaded && (
              <Text style={styles.successText}>✅ Imagen cargada exitosamente</Text>
            )}
            {imageError && (
              <Text style={styles.errorText}>❌ Error al cargar la imagen</Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modos de Redimensionamiento</Text>
          
          <Text style={styles.resizeModeTitle}>cover (por defecto)</Text>
          <Image
            source={{ uri: 'https://picsum.photos/400/300?random=10' }}
            style={styles.resizeImage}
            resizeMode="cover"
          />
          <Text style={styles.resizeModeDescription}>
            Escala la imagen para llenar el tamaño manteniendo aspecto. Puede recortar.
          </Text>

          <Text style={styles.resizeModeTitle}>contain</Text>
          <Image
            source={{ uri: 'https://picsum.photos/400/300?random=11' }}
            style={styles.resizeImage}
            resizeMode="contain"
          />
          <Text style={styles.resizeModeDescription}>
            Escala la imagen para que quepa completamente. Puede dejar espacios.
          </Text>

          <Text style={styles.resizeModeTitle}>stretch</Text>
          <Image
            source={{ uri: 'https://picsum.photos/400/300?random=12' }}
            style={styles.resizeImage}
            resizeMode="stretch"
          />
          <Text style={styles.resizeModeDescription}>
            Estira la imagen para llenar exactamente el tamaño. Puede distorsionar.
          </Text>

          <Text style={styles.resizeModeTitle}>center</Text>
          <Image
            source={{ uri: 'https://picsum.photos/150/100?random=13' }}
            style={styles.resizeImage}
            resizeMode="center"
          />
          <Text style={styles.resizeModeDescription}>
            Centra la imagen sin escalar. Si es más grande, se recorta.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Galería de Imágenes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
            {networkImages.map((uri, index) => (
              <Pressable
                key={index}
                style={styles.galleryItem}
                onPress={() => Alert.alert('Imagen', `Imagen ${index + 1} seleccionada`)}>
                <Image
                  source={{ uri }}
                  style={styles.galleryImage}
                  resizeMode="cover"
                />
                <Text style={styles.galleryLabel}>Imagen {index + 1}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Imagen con Border Radius</Text>
          <View style={styles.roundImageContainer}>
            <Image
              source={{ uri: 'https://picsum.photos/150/150?random=20' }}
              style={styles.roundImage}
              resizeMode="cover"
            />
            <Image
              source={{ uri: 'https://picsum.photos/150/150?random=21' }}
              style={styles.circularImage}
              resizeMode="cover"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Avatar con Fallback</Text>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: 'https://picsum.photos/80/80?random=30' }}
                style={styles.avatar}
                resizeMode="cover"
              />
              <View style={styles.avatarInfo}>
                <Text style={styles.avatarName}>Usuario Ejemplo</Text>
                <Text style={styles.avatarRole}>Desarrollador</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Imagen con Overlay</Text>
          <View style={styles.overlayContainer}>
            <Image
              source={{ uri: 'https://picsum.photos/300/200?random=40' }}
              style={styles.overlayImage}
              resizeMode="cover"
            />
            <View style={styles.overlay}>
              <Text style={styles.overlayTitle}>Título Superpuesto</Text>
              <Text style={styles.overlaySubtitle}>Descripción de la imagen</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Propiedades del Image</Text>
          <Text style={styles.properties}>
            • source: Fuente de la imagen (local, red, data URI){'\n'}
            • resizeMode: 'cover', 'contain', 'stretch', 'repeat', 'center'{'\n'}
            • style: Estilos CSS para dimensiones y apariencia{'\n'}
            • onLoad: Callback cuando la imagen se carga{'\n'}
            • onError: Callback cuando hay error de carga{'\n'}
            • onLoadStart: Callback al iniciar la carga{'\n'}
            • onLoadEnd: Callback al finalizar la carga{'\n'}
            • defaultSource: Imagen por defecto mientras carga (Android)
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mejores Prácticas</Text>
          <Text style={styles.bestPractices}>
            ✅ Especifica siempre width y height{'\n'}
            ✅ Usa onLoad y onError para feedback{'\n'}
            ✅ Optimiza el tamaño de las imágenes{'\n'}
            ✅ Considera usar bibliotecas como react-native-fast-image{'\n'}
            ✅ Implementa placeholders y estados de carga{'\n\n'}
            ⚠️ Las imágenes grandes afectan el rendimiento{'\n'}
            ⚠️ Las imágenes de red requieren permisos de internet
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 12,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  placeholderImage: {
    width: 200,
    height: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 48,
    color: '#999',
  },
  placeholderLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  networkImage: {
    width: 300,
    height: 200,
    borderRadius: 8,
  },
  successText: {
    color: '#4caf50',
    fontSize: 14,
    marginTop: 8,
  },
  errorText: {
    color: '#f44336',
    fontSize: 14,
    marginTop: 8,
  },
  note: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
  },
  resizeModeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  resizeImage: {
    width: 250,
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    alignSelf: 'center',
  },
  resizeModeDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 8,
    textAlign: 'center',
  },
  gallery: {
    marginVertical: 8,
  },
  galleryItem: {
    marginRight: 12,
    alignItems: 'center',
  },
  galleryImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
  },
  galleryLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  roundImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 16,
  },
  roundImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  circularImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  avatarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    width: '100%',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  avatarInfo: {
    flex: 1,
  },
  avatarName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  avatarRole: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  overlayContainer: {
    position: 'relative',
    alignItems: 'center',
    marginVertical: 8,
  },
  overlayImage: {
    width: 300,
    height: 200,
    borderRadius: 8,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  overlayTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  overlaySubtitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
    opacity: 0.9,
  },
  properties: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    fontFamily: 'monospace',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
  },
  bestPractices: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    backgroundColor: '#e8f5e8',
    padding: 12,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
});

export default ImageExample;
