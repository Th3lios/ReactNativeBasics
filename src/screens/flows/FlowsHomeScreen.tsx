import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';

type FlowsHomeScreenProps = {
  navigation: StackNavigationProp<any>;
};

const FlowsHomeScreen: React.FC<FlowsHomeScreenProps> = ({ navigation }) => {
  const flows = [
    {
      id: 'api-flows',
      title: 'Flujos de API',
      description: 'Desde trigger hasta almacenamiento de datos',
      icon: '🌐',
      color: '#2196F3',
      features: [
        'Trigger de llamadas API',
        'Manejo de loading states',
        'Error handling',
        'Cache y persistencia'
      ],
      route: 'ApiFlowsExample'
    },
    {
      id: 'state-flows',
      title: 'Flujos de Estado',
      description: 'Comunicación entre componentes y estado global',
      icon: '🔄',
      color: '#4CAF50',
      features: [
        'Estado local vs global',
        'Props drilling vs context',
        'State lifting patterns',
        'Optimización renders'
      ],
      route: 'StateFlowsExample'
    },
  ];

  const standards = [
    {
      title: 'Loading States',
      pattern: 'loading → success/error → idle',
      description: 'Estado estándar para operaciones asíncronas'
    },
    {
      title: 'Error Handling',
      pattern: 'try → catch → user feedback → retry',
      description: 'Manejo consistente de errores'
    },
    {
      title: 'Data Flow',
      pattern: 'trigger → API → store → UI update',
      description: 'Flujo unidireccional de datos'
    },
    {
      title: 'Component Communication',
      pattern: 'props down → events up → context sideways',
      description: 'Comunicación entre componentes'
    }
  ];

  const renderFlowCard = (flow: typeof flows[0]) => (
    <Pressable
      key={flow.id}
      style={[styles.flowCard, { borderLeftColor: flow.color }]}
      onPress={() => navigation.navigate(flow.route)}
      android_ripple={{ color: '#e0e0e0' }}>
      
      <View style={styles.cardHeader}>
        <Text style={styles.flowIcon}>{flow.icon}</Text>
        <View style={styles.flowInfo}>
          <Text style={styles.flowTitle}>{flow.title}</Text>
          <Text style={styles.flowDescription}>{flow.description}</Text>
        </View>
        <Text style={styles.arrow}>→</Text>
      </View>

      <View style={styles.featuresContainer}>
        {flow.features.map((feature, index) => (
          <View key={index} style={styles.featureTag}>
            <Text style={[styles.featureTagText, { color: flow.color }]}>
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
          <Text style={styles.title}>Flujos de Desarrollo</Text>
          <Text style={styles.subtitle}>
            Patrones estándares para manejar estado, APIs y comunicación en React Native
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>🔄 ¿Qué son los flujos de desarrollo?</Text>
          <Text style={styles.infoText}>
            Los flujos de desarrollo son patrones estandarizados que definen cómo:{'\n\n'}
            📡 <Text style={styles.infoBold}>APIs:</Text> Dónde se gatillan, cómo se llaman y dónde se guardan{'\n'}
            🗃️ <Text style={styles.infoBold}>Estado:</Text> Cómo se maneja local vs global{'\n'}
            👥 <Text style={styles.infoBold}>Componentes:</Text> Cómo se comunican padres e hijos{'\n'}
            🎯 <Text style={styles.infoBold}>Estándares:</Text> Patrones repetibles y consistentes
          </Text>
        </View>

        <View style={styles.flowsContainer}>
          {flows.map(renderFlowCard)}
        </View>

        <View style={styles.standardsSection}>
          <Text style={styles.standardsTitle}>⚡ Patrones Estándar</Text>
          <Text style={styles.standardsSubtitle}>
            Flujos comunes que debes seguir consistentemente
          </Text>
          
          {standards.map((standard, index) => (
            <View key={index} style={styles.standardCard}>
              <Text style={styles.standardTitle}>{standard.title}</Text>
              <View style={styles.patternContainer}>
                <Text style={styles.patternText}>{standard.pattern}</Text>
              </View>
              <Text style={styles.standardDescription}>{standard.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.principlesSection}>
          <Text style={styles.principlesTitle}>💡 Principios Fundamentales</Text>
          
          <View style={styles.principleCard}>
            <Text style={styles.principleTitle}>🎯 Single Responsibility</Text>
            <Text style={styles.principleText}>
              Cada función/hook/componente tiene una responsabilidad específica
            </Text>
          </View>

          <View style={styles.principleCard}>
            <Text style={styles.principleTitle}>🔄 Unidirectional Data Flow</Text>
            <Text style={styles.principleText}>
              Los datos fluyen en una sola dirección: actions → state → UI
            </Text>
          </View>

          <View style={styles.principleCard}>
            <Text style={styles.principleTitle}>🏗️ Separation of Concerns</Text>
            <Text style={styles.principleText}>
              UI, lógica de negocio y acceso a datos están separados
            </Text>
          </View>

          <View style={styles.principleCard}>
            <Text style={styles.principleTitle}>🔒 Predictable State</Text>
            <Text style={styles.principleText}>
              El estado es predecible y fácil de rastrear en cualquier momento
            </Text>
          </View>
        </View>

        <View style={styles.architectureSection}>
          <Text style={styles.architectureTitle}>🏛️ Arquitectura de Flujos</Text>
          
          <View style={styles.layerCard}>
            <Text style={styles.layerTitle}>📱 Presentation Layer</Text>
            <Text style={styles.layerDescription}>
              Components, Screens, Navigation
            </Text>
            <View style={styles.layerFlow}>
              <Text style={styles.layerFlowText}>User Interaction → Events</Text>
            </View>
          </View>

          <View style={styles.layerCard}>
            <Text style={styles.layerTitle}>🧠 Business Logic Layer</Text>
            <Text style={styles.layerDescription}>
              Hooks, Services, State Management
            </Text>
            <View style={styles.layerFlow}>
              <Text style={styles.layerFlowText}>Events → Processing → State Updates</Text>
            </View>
          </View>

          <View style={styles.layerCard}>
            <Text style={styles.layerTitle}>💾 Data Layer</Text>
            <Text style={styles.layerDescription}>
              APIs, Cache, Local Storage
            </Text>
            <View style={styles.layerFlow}>
              <Text style={styles.layerFlowText}>State Updates → Data Persistence</Text>
            </View>
          </View>
        </View>

        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>🎯 Consejos para Flujos Consistentes</Text>
          
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>
              📋 <Text style={styles.tipBold}>Documenta patrones:</Text> Crea un style guide de flujos
            </Text>
            <Text style={styles.tipItem}>
              🔄 <Text style={styles.tipBold}>Reutiliza hooks:</Text> Patrones comunes en custom hooks
            </Text>
            <Text style={styles.tipItem}>
              ⚡ <Text style={styles.tipBold}>Optimiza renders:</Text> Usa React.memo y useMemo
            </Text>
            <Text style={styles.tipItem}>
              🐛 <Text style={styles.tipBold}>Error boundaries:</Text> Manejo de errores consistente
            </Text>
            <Text style={styles.tipItem}>
              📊 <Text style={styles.tipBold}>Monitoring:</Text> Trackea performance y errores
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🔄 Flujos consistentes = código predecible y mantenible
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
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
    lineHeight: 24,
  },
  infoSection: {
    backgroundColor: '#e8f4fd',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
  infoBold: {
    fontWeight: 'bold',
  },
  flowsContainer: {
    padding: 10,
  },
  flowCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    borderLeftWidth: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  flowIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  flowInfo: {
    flex: 1,
  },
  flowTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  flowDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  arrow: {
    fontSize: 24,
    color: '#999',
    fontWeight: 'bold',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureTag: {
    backgroundColor: '#f5f5f5',
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
  standardsSection: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  standardsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  standardsSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  standardCard: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
  },
  standardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  patternContainer: {
    backgroundColor: '#2d3748',
    padding: 8,
    borderRadius: 6,
    marginBottom: 6,
  },
  patternText: {
    fontFamily: 'Courier',
    fontSize: 12,
    color: '#a0aec0',
    textAlign: 'center',
  },
  standardDescription: {
    fontSize: 13,
    color: '#666',
  },
  principlesSection: {
    backgroundColor: '#e8f5e8',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  principlesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  principleCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  principleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  principleText: {
    fontSize: 13,
    color: '#388E3C',
    lineHeight: 18,
  },
  architectureSection: {
    backgroundColor: '#fff3e0',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  architectureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 16,
  },
  layerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  layerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 4,
  },
  layerDescription: {
    fontSize: 12,
    color: '#FF8F00',
    marginBottom: 6,
  },
  layerFlow: {
    backgroundColor: '#2d3748',
    padding: 6,
    borderRadius: 4,
  },
  layerFlowText: {
    fontFamily: 'Courier',
    fontSize: 10,
    color: '#a0aec0',
    textAlign: 'center',
  },
  tipsSection: {
    backgroundColor: '#f3e5f5',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 12,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 14,
    color: '#7B1FA2',
    lineHeight: 20,
  },
  tipBold: {
    fontWeight: 'bold',
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

export default FlowsHomeScreen;
