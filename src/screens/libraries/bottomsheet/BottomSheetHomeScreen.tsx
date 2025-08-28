import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BottomSheetHomeScreen = ({ navigation }: any) => {
  const bottomSheetExamples = [
    {
      id: 'basic',
      title: 'Bottom Sheet Básico',
      description: 'Implementación básica con snap points y gestos',
      icon: '📋',
      color: '#007AFF',
      features: [
        'Snap Points',
        'Gesture Controls',
        'Backdrop',
        'Keyboard Handling'
      ]
    },
    {
      id: 'scrollable',
      title: 'Contenido Scrollable',
      description: 'Bottom sheet con FlatList y ScrollView',
      icon: '📜',
      color: '#34C759',
      features: [
        'ScrollView Integration',
        'FlatList Support',
        'Dynamic Content',
        'Pull to Refresh'
      ]
    },
    {
      id: 'custom',
      title: 'Customización Avanzada',
      description: 'Backdrops personalizados y animaciones',
      icon: '🎨',
      color: '#FF9500',
      features: [
        'Custom Backdrop',
        'Handle Styling',
        'Footer Components',
        'Custom Animations'
      ]
    },
    {
      id: 'modal',
      title: 'Modal Bottom Sheet',
      description: 'Bottom sheet como modal con overlay',
      icon: '🔲',
      color: '#FF3B30',
      features: [
        'Modal Presentation',
        'Full Screen Support',
        'Detached Mode',
        'Portal Integration'
      ]
    }
  ];

  const renderExampleCard = (example: any) => (
    <Pressable
      key={example.id}
      style={[styles.exampleCard, { borderLeftColor: example.color }]}
      onPress={() => navigation.navigate(`${example.id}BottomSheet`)}
      android_ripple={{ color: '#e0e0e0' }}>
      
      <View style={styles.cardHeader}>
        <Text style={styles.exampleIcon}>{example.icon}</Text>
        <View style={styles.exampleInfo}>
          <Text style={styles.exampleTitle}>{example.title}</Text>
          <Text style={styles.exampleDescription}>{example.description}</Text>
        </View>
        <Text style={styles.arrow}>→</Text>
      </View>

      <View style={styles.featuresContainer}>
        {example.features.map((feature: string, index: number) => (
          <View key={index} style={styles.featureTag}>
            <Text style={[styles.featureTagText, { color: example.color }]}>
              {feature}
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
          <Text style={styles.title}>Gorhom Bottom Sheet</Text>
          <Text style={styles.subtitle}>
            Bottom sheets modernos y performantes
          </Text>
          <Text style={styles.description}>
            La librería más popular para implementar bottom sheets en React Native, 
            con soporte para gestos fluidos, snap points dinámicos y customización completa.
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>📋 ¿Por qué Gorhom Bottom Sheet?</Text>
          <Text style={styles.infoText}>
            A diferencia de las implementaciones básicas, Gorhom Bottom Sheet ofrece 
            una experiencia nativa con gestos fluidos, integración con Reanimated 
            y soporte completo para contenido scrollable.
          </Text>
          
          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>✨ Características principales:</Text>
            <Text style={styles.benefitItem}>• Gestos nativos y fluidos</Text>
            <Text style={styles.benefitItem}>• Snap points dinámicos</Text>
            <Text style={styles.benefitItem}>• Integración con Reanimated 3</Text>
            <Text style={styles.benefitItem}>• Soporte para ScrollView/FlatList</Text>
            <Text style={styles.benefitItem}>• Backdrops y overlays customizables</Text>
            <Text style={styles.benefitItem}>• Keyboard handling automático</Text>
            <Text style={styles.benefitItem}>• TypeScript support completo</Text>
          </View>
        </View>

        <View style={styles.installSection}>
          <Text style={styles.installTitle}>📦 Instalación</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>npm install @gorhom/bottom-sheet</Text>
          </View>
          <Text style={styles.installNote}>
            💡 Requiere react-native-reanimated y react-native-gesture-handler
          </Text>
          
          <View style={styles.setupContainer}>
            <Text style={styles.setupTitle}>⚙️ Setup básico:</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>{`// 1. Wrap app with GestureHandlerRootView
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// 2. Import bottom sheet
import BottomSheet from '@gorhom/bottom-sheet';

// 3. Use in component
const snapPoints = ['25%', '50%', '90%'];`}</Text>
            </View>
          </View>
        </View>

        <View style={styles.useCasesSection}>
          <Text style={styles.useCasesTitle}>🎯 Casos de Uso Comunes</Text>
          <View style={styles.useCasesList}>
            <View style={styles.useCase}>
              <Text style={styles.useCaseIcon}>🛒</Text>
              <View style={styles.useCaseInfo}>
                <Text style={styles.useCaseTitle}>E-commerce</Text>
                <Text style={styles.useCaseDesc}>Detalles de producto, carrito, filtros</Text>
              </View>
            </View>
            <View style={styles.useCase}>
              <Text style={styles.useCaseIcon}>📍</Text>
              <View style={styles.useCaseInfo}>
                <Text style={styles.useCaseTitle}>Mapas</Text>
                <Text style={styles.useCaseDesc}>Información de ubicación, direcciones</Text>
              </View>
            </View>
            <View style={styles.useCase}>
              <Text style={styles.useCaseIcon}>🎵</Text>
              <View style={styles.useCaseInfo}>
                <Text style={styles.useCaseTitle}>Media Players</Text>
                <Text style={styles.useCaseDesc}>Controles de reproducción, playlists</Text>
              </View>
            </View>
            <View style={styles.useCase}>
              <Text style={styles.useCaseIcon}>⚙️</Text>
              <View style={styles.useCaseInfo}>
                <Text style={styles.useCaseTitle}>Configuraciones</Text>
                <Text style={styles.useCaseDesc}>Menús de opciones, configuraciones</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.examplesSection}>
          <Text style={styles.examplesTitle}>Ejemplos Interactivos</Text>
          {bottomSheetExamples.map(renderExampleCard)}
        </View>

        <View style={styles.bestPracticesSection}>
          <Text style={styles.bestPracticesTitle}>🎯 Mejores Prácticas</Text>
          <View style={styles.practicesList}>
            <Text style={styles.practiceItem}>• Usa snap points apropiados para tu contenido</Text>
            <Text style={styles.practiceItem}>• Implementa backdrop para mejor UX</Text>
            <Text style={styles.practiceItem}>• Considera keyboard handling para formularios</Text>
            <Text style={styles.practiceItem}>• Usa portal para bottom sheets modales</Text>
            <Text style={styles.practiceItem}>• Optimiza contenido scrollable con windowSize</Text>
            <Text style={styles.practiceItem}>• Proporciona feedback visual en gestos</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🚀 Cada ejemplo incluye implementación completa y casos de uso reales
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
    color: '#007AFF',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  infoSection: {
    backgroundColor: '#e8f4fd',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#0056b3',
    lineHeight: 24,
    marginBottom: 16,
  },
  benefitsContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0056b3',
    marginBottom: 8,
  },
  benefitItem: {
    fontSize: 14,
    color: '#0056b3',
    marginBottom: 4,
  },
  installSection: {
    backgroundColor: '#f0f4f8',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6C757D',
  },
  installTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
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
    fontSize: 12,
    lineHeight: 18,
  },
  installNote: {
    fontSize: 14,
    color: '#495057',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  setupContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  setupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  useCasesSection: {
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
    elevation: 3,
  },
  useCasesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  useCasesList: {
    gap: 12,
  },
  useCase: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  useCaseIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  useCaseInfo: {
    flex: 1,
  },
  useCaseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  useCaseDesc: {
    fontSize: 14,
    color: '#666',
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
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureTag: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  featureTagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  bestPracticesSection: {
    backgroundColor: '#fff9e6',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },
  bestPracticesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#cc6600',
    marginBottom: 12,
  },
  practicesList: {
    gap: 8,
  },
  practiceItem: {
    fontSize: 14,
    color: '#cc6600',
    lineHeight: 20,
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

export default BottomSheetHomeScreen;
