import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const StateManagementHomeScreen = ({ navigation }: any) => {
  const stateManagementExamples = [
    {
      id: 'redux-toolkit',
      title: 'Redux Toolkit',
      description: 'Store moderno con RTK, slices y middleware',
      icon: '🔴',
      color: '#764ABC',
      features: [
        'RTK Store Setup',
        'Slices & Reducers',
        'Async Thunks',
        'DevTools Integration'
      ]
    },
    {
      id: 'redux-sagas',
      title: 'Redux Sagas',
      description: 'Manejo de side effects con generadores',
      icon: '🌀',
      color: '#999999',
      features: [
        'Saga Middleware',
        'Effect Handlers',
        'Fork & Take',
        'Error Handling'
      ]
    },
    {
      id: 'zustand',
      title: 'Zustand',
      description: 'Store ligero y simple sin boilerplate',
      icon: '🐻',
      color: '#2C3E50',
      features: [
        'Simple Store',
        'Persist Middleware',
        'Subscriptions',
        'Computed Values'
      ]
    },
    {
      id: 'context-api',
      title: 'Context API',
      description: 'Context API nativo de React',
      icon: '⚛️',
      color: '#61DAFB',
      features: [
        'Context Providers',
        'useContext Hook',
        'Multiple Contexts',
        'Performance Patterns'
      ]
    },
    {
      id: 'jotai',
      title: 'Jotai',
      description: 'Atomic state management bottom-up',
      icon: '⚛️',
      color: '#007ACC',
      features: [
        'Atomic Values',
        'Derived Atoms',
        'Async Atoms',
        'Provider Patterns'
      ]
    },
    {
      id: 'valtio',
      title: 'Valtio',
      description: 'Proxy-based state con mutaciones',
      icon: '🔄',
      color: '#FF6B6B',
      features: [
        'Proxy State',
        'Direct Mutations',
        'Snapshots',
        'Subscriptions'
      ]
    }
  ];

  const getNavigationRoute = (id: string) => {
    const routeMap: { [key: string]: string } = {
      'redux-toolkit': 'redux-toolkitExample',
      'redux-sagas': 'redux-sagasExample',
      'zustand': 'zustandExample',
      'context-api': 'context-apiExample',
      'jotai': 'jotaiExample',
      'valtio': 'valtioExample',
    };
    return routeMap[id] || `${id}Example`;
  };

  const renderExampleCard = (example: any) => (
    <Pressable
      key={example.id}
      style={[styles.exampleCard, { borderLeftColor: example.color }]}
      onPress={() => navigation.navigate(getNavigationRoute(example.id))}
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
          <Text style={styles.title}>Gestión de Estados</Text>
          <Text style={styles.subtitle}>
            Soluciones modernas para el manejo de estado en React Native
          </Text>
          <Text style={styles.description}>
            Explora diferentes estrategias para manejar el estado de tu aplicación, 
            desde Redux hasta soluciones más modernas como Zustand y Jotai.
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>🗃️ ¿Por qué gestionar el estado?</Text>
          <Text style={styles.infoText}>
            En aplicaciones complejas, el estado local de React puede volverse difícil 
            de manejar. Las librerías de gestión de estado ofrecen soluciones para 
            compartir datos entre componentes, manejar estado global y optimizar renders.
          </Text>
          
          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>✨ Beneficios principales:</Text>
            <Text style={styles.benefitItem}>• Estado global predecible</Text>
            <Text style={styles.benefitItem}>• Separación de lógica y UI</Text>
            <Text style={styles.benefitItem}>• DevTools para debugging</Text>
            <Text style={styles.benefitItem}>• Persistencia automática</Text>
            <Text style={styles.benefitItem}>• Performance optimizada</Text>
            <Text style={styles.benefitItem}>• Testing más sencillo</Text>
            <Text style={styles.benefitItem}>• Patrones escalables</Text>
          </View>
        </View>

        <View style={styles.comparisonSection}>
          <Text style={styles.comparisonTitle}>⚖️ Comparación de Soluciones</Text>
          
          <View style={styles.comparisonGrid}>
            <View style={styles.comparisonCard}>
              <Text style={styles.comparisonLabel}>🔴 Redux</Text>
              <Text style={styles.comparisonDesc}>Más robusto, gran ecosistema</Text>
              <Text style={styles.comparisonPros}>✅ DevTools, Middleware</Text>
              <Text style={styles.comparisonCons}>❌ Boilerplate</Text>
            </View>
            
            <View style={styles.comparisonCard}>
              <Text style={styles.comparisonLabel}>🐻 Zustand</Text>
              <Text style={styles.comparisonDesc}>Simple, mínimo boilerplate</Text>
              <Text style={styles.comparisonPros}>✅ Fácil setup</Text>
              <Text style={styles.comparisonCons}>❌ Ecosistema menor</Text>
            </View>
            
            <View style={styles.comparisonCard}>
              <Text style={styles.comparisonLabel}>⚛️ Context</Text>
              <Text style={styles.comparisonDesc}>Nativo, sin dependencias</Text>
              <Text style={styles.comparisonPros}>✅ Built-in</Text>
              <Text style={styles.comparisonCons}>❌ Performance issues</Text>
            </View>
            
            <View style={styles.comparisonCard}>
              <Text style={styles.comparisonLabel}>⚛️ Jotai</Text>
              <Text style={styles.comparisonDesc}>Atomic, bottom-up</Text>
              <Text style={styles.comparisonPros}>✅ Granular</Text>
              <Text style={styles.comparisonCons}>❌ Curva de aprendizaje</Text>
            </View>
          </View>
        </View>

        <View style={styles.examplesSection}>
          <Text style={styles.examplesTitle}>Ejemplos Interactivos</Text>
          {stateManagementExamples.map(renderExampleCard)}
        </View>

        <View style={styles.bestPracticesSection}>
          <Text style={styles.bestPracticesTitle}>🎯 Mejores Prácticas</Text>
          <View style={styles.practicesList}>
            <Text style={styles.practiceItem}>• Elige la solución según la complejidad</Text>
            <Text style={styles.practiceItem}>• Mantén el estado lo más local posible</Text>
            <Text style={styles.practiceItem}>• Usa TypeScript para type safety</Text>
            <Text style={styles.practiceItem}>• Implementa persistencia cuando sea necesario</Text>
            <Text style={styles.practiceItem}>• Optimiza renders con selectors</Text>
            <Text style={styles.practiceItem}>• Separa estado de UI y lógica de negocio</Text>
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
  comparisonSection: {
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
  comparisonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  comparisonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  comparisonCard: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  comparisonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  comparisonDesc: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  comparisonPros: {
    fontSize: 11,
    color: '#34C759',
    marginBottom: 2,
  },
  comparisonCons: {
    fontSize: 11,
    color: '#FF3B30',
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
  disabledCard: {
    opacity: 0.6,
    backgroundColor: '#f5f5f5',
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
  disabledTitle: {
    color: '#999',
  },
  disabledDescription: {
    color: '#aaa',
  },
  disabledNote: {
    fontSize: 12,
    color: '#007AFF',
    fontStyle: 'italic',
    marginTop: 4,
  },
  comingSoonBadge: {
    backgroundColor: '#ff9800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  comingSoonText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
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

export default StateManagementHomeScreen;
