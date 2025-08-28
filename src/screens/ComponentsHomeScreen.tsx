import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ComponentsHomeScreen = ({ navigation }: any) => {
  const components = [
    { name: 'View', screen: 'ViewExample', description: 'Contenedor básico para otros componentes' },
    { name: 'Text', screen: 'TextExample', description: 'Mostrar texto con diferentes estilos' },
    { name: 'TextInput', screen: 'TextInputExample', description: 'Entrada de texto del usuario con validaciones' },
    { name: 'ScrollView', screen: 'ScrollViewExample', description: 'Contenido desplazable verticalmente' },
    { name: 'FlatList', screen: 'FlatListExample', description: 'Lista optimizada para grandes conjuntos de datos' },
    { name: 'Button', screen: 'ButtonExample', description: 'Botón básico del sistema' },
    { name: 'Pressable', screen: 'PressableExample', description: 'Componente presionable altamente personalizable' },
    { name: 'TouchableOpacity', screen: 'TouchableOpacityExample', description: 'Botón con efecto de opacidad' },
    { name: 'TouchableHighlight', screen: 'TouchableHighlightExample', description: 'Botón con efecto de resaltado' },
    { name: 'Modal', screen: 'ModalExample', description: 'Ventana modal superpuesta' },
    { name: 'Image', screen: 'ImageExample', description: 'Mostrar imágenes locales y remotas' },
  ];

  const renderComponentButton = (component: any, index: number) => (
    <Pressable
      key={index}
      style={styles.componentButton}
      onPress={() => navigation.navigate(component.screen)}
      android_ripple={{ color: '#e0e0e0' }}>
      <View style={styles.buttonContent}>
        <Text style={styles.componentName}>{component.name}</Text>
        <Text style={styles.componentDescription}>{component.description}</Text>
      </View>
      <Text style={styles.arrow}>→</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Componentes Básicos</Text>
          <Text style={styles.subtitle}>
            Explora los componentes fundamentales de React Native
          </Text>
        </View>

        <View style={styles.componentsContainer}>
          {components.map((component, index) =>
            renderComponentButton(component, index),
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Cada componente incluye ejemplos prácticos y explicaciones detalladas
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
  header: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  componentsContainer: {
    padding: 10,
  },
  componentButton: {
    backgroundColor: '#fff',
    marginBottom: 12,
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
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  componentName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    flex: 1,
  },
  componentDescription: {
    fontSize: 14,
    color: '#666',
    flex: 2,
    marginLeft: 12,
  },
  arrow: {
    fontSize: 20,
    color: '#007AFF',
    marginRight: 16,
  },
  footer: {
    padding: 20,
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ComponentsHomeScreen;
