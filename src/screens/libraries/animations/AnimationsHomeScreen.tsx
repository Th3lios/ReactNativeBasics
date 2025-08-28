import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnimationsHomeScreen = ({ navigation }: any) => {
  const animationExamples = [
    {
      id: 'basic',
      title: 'Animaciones Básicas',
      description: 'SharedValue, withTiming, withSpring y interpolaciones',
      icon: '⚡',
      color: '#FF3B30',
      examples: [
        'Fade In/Out',
        'Scale Animations',
        'Rotation',
        'Color Transitions'
      ]
    },
    {
      id: 'gesture',
      title: 'Animaciones con Gestos',
      description: 'Gesture Handler + Reanimated para interacciones fluidas',
      icon: '👆',
      color: '#007AFF',
      examples: [
        'Pan Gesture',
        'Pinch to Zoom',
        'Swipe to Delete',
        'Drag & Drop'
      ]
    },
    {
      id: 'layout',
      title: 'Layout Animations',
      description: 'Transiciones automáticas de layout y entering/exiting',
      icon: '🎭',
      color: '#34C759',
      examples: [
        'Enter/Exit Animations',
        'Layout Transitions',
        'Shared Elements',
        'List Animations'
      ]
    },
    {
      id: 'complex',
      title: 'Animaciones Complejas',
      description: 'Combinación de técnicas para efectos avanzados',
      icon: '🎨',
      color: '#FF9500',
      examples: [
        'Physics Animations',
        'Morphing Shapes',
        'Card Flip',
        'Parallax Scroll'
      ]
    }
  ];

  const renderExampleCard = (example: any) => (
    <Pressable
      key={example.id}
      style={[styles.exampleCard, { borderLeftColor: example.color }]}
      onPress={() => navigation.navigate(`${example.id}Animations`)}
      android_ripple={{ color: '#e0e0e0' }}>
      
      <View style={styles.cardHeader}>
        <Text style={styles.exampleIcon}>{example.icon}</Text>
        <View style={styles.exampleInfo}>
          <Text style={styles.exampleTitle}>{example.title}</Text>
          <Text style={styles.exampleDescription}>{example.description}</Text>
        </View>
        <Text style={styles.arrow}>→</Text>
      </View>

      <View style={styles.examplesContainer}>
        {example.examples.map((item: string, index: number) => (
          <View key={index} style={styles.exampleTag}>
            <Text style={[styles.exampleTagText, { color: example.color }]}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>React Native Reanimated 3</Text>
          <Text style={styles.subtitle}>
            Animaciones fluidas y de alto rendimiento
          </Text>
          <Text style={styles.description}>
            Reanimated 3 es la librería de animaciones más poderosa para React Native, 
            ejecutando animaciones en el hilo de UI para máximo rendimiento.
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>🎬 ¿Por qué Reanimated?</Text>
          <Text style={styles.infoText}>
            A diferencia de la Animated API nativa, Reanimated ejecuta todas las 
            animaciones directamente en el hilo de UI, garantizando 60fps incluso 
            con el hilo de JavaScript bloqueado.
          </Text>
          
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>✨ Características:</Text>
            <Text style={styles.featureItem}>• Ejecución en el hilo de UI (60 FPS)</Text>
            <Text style={styles.featureItem}>• Integración con Gesture Handler</Text>
            <Text style={styles.featureItem}>• Layout Animations automáticas</Text>
            <Text style={styles.featureItem}>• Shared Values para estado compartido</Text>
            <Text style={styles.featureItem}>• Worklets para lógica personalizada</Text>
          </View>
        </View>

        <View style={styles.installSection}>
          <Text style={styles.installTitle}>📦 Instalación</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>npm install react-native-reanimated</Text>
          </View>
          <Text style={styles.installNote}>
            ⚠️ Requiere configuración adicional en iOS/Android. Ver documentación oficial.
          </Text>
        </View>

        <View style={styles.examplesSection}>
          <Text style={styles.examplesTitle}>Ejemplos Interactivos</Text>
          {animationExamples.map(renderExampleCard)}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🚀 Cada ejemplo incluye código comentado y explicaciones detalladas
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
    fontSize: 18,
    fontWeight: '600',
    color: '#FF3B30',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  infoSection: {
    backgroundColor: '#fff3e6',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#cc6600',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#cc6600',
    lineHeight: 24,
    marginBottom: 16,
  },
  featuresContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#cc6600',
    marginBottom: 8,
  },
  featureItem: {
    fontSize: 14,
    color: '#cc6600',
    marginBottom: 4,
  },
  installSection: {
    backgroundColor: '#f0f4f8',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  installTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: 12,
  },
  codeBlock: {
    backgroundColor: '#2d3748',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  codeText: {
    color: '#a0aec0',
    fontFamily: 'Courier',
    fontSize: 14,
  },
  installNote: {
    fontSize: 14,
    color: '#0056b3',
    fontStyle: 'italic',
  },
  examplesSection: {
    padding: 10,
  },
  examplesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  exampleCard: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderLeftWidth: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  exampleIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  exampleInfo: {
    flex: 1,
  },
  exampleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  exampleDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  arrow: {
    fontSize: 20,
    color: '#007AFF',
  },
  examplesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  exampleTag: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  exampleTagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default AnimationsHomeScreen;
