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

type ArchitectureHomeScreenProps = {
  navigation: StackNavigationProp<any>;
};

const ArchitectureHomeScreen: React.FC<ArchitectureHomeScreenProps> = ({ navigation }) => {
  const structures = [
    {
      id: 'basic-structure',
      title: 'Estructura Básica por Tipos',
      description: 'Organización tradicional separando por tipo de archivo',
      icon: '📁',
      color: '#4CAF50',
      features: [
        'components/ - Componentes reutilizables',
        'screens/ - Pantallas de la app',
        'utils/ - Funciones auxiliares',
        'services/ - APIs y servicios'
      ],
      route: 'BasicStructureExample'
    },
    {
      id: 'feature-structure',
      title: 'Estructura por Features',
      description: 'Organización por funcionalidades del negocio',
      icon: '🎯',
      color: '#2196F3',
      features: [
        'features/auth/ - Todo sobre autenticación',
        'features/profile/ - Gestión de perfil',
        'shared/ - Código compartido',
        'Escalabilidad horizontal'
      ],
      route: 'FeatureStructureExample'
    },
    {
      id: 'atomic-structure',
      title: 'Atomic Design Structure',
      description: 'Estructura basada en componentes atómicos',
      icon: '⚛️',
      color: '#9C27B0',
      features: [
        'atoms/ - Componentes básicos',
        'molecules/ - Combinaciones simples',
        'organisms/ - Componentes complejos',
        'templates/ - Layout structures'
      ],
      route: 'AtomicStructureExample'
    },
    {
      id: 'domain-structure',
      title: 'Domain-Driven Structure',
      description: 'Organización basada en dominios del negocio',
      icon: '🏛️',
      color: '#FF9800',
      features: [
        'domains/user/ - Dominio de usuarios',
        'domains/order/ - Dominio de pedidos',
        'shared/infrastructure/ - Infraestructura',
        'Separación por contexto'
      ],
      route: 'DomainStructureExample'
    },
    {
      id: 'layered-structure',
      title: 'Estructura en Capas',
      description: 'Organización por capas de responsabilidad',
      icon: '🏗️',
      color: '#607D8B',
      features: [
        'presentation/ - UI y pantallas',
        'business/ - Lógica de negocio',
        'data/ - Acceso a datos',
        'core/ - Configuración base'
      ],
      route: 'LayeredStructureExample'
    },
    {
      id: 'modular-structure',
      title: 'Estructura Modular',
      description: 'Módulos independientes y reutilizables',
      icon: '🧩',
      color: '#795548',
      features: [
        'modules/auth/ - Módulo de auth',
        'modules/payment/ - Módulo de pagos',
        'core/ - Funcionalidad base',
        'Deploy independiente'
      ],
      route: 'ModularStructureExample'
    }
  ];

  const renderStructureCard = (structure: typeof structures[0]) => (
    <Pressable
      key={structure.id}
      style={[styles.structureCard, { borderLeftColor: structure.color }]}
      onPress={() => navigation.navigate(structure.route)}
      android_ripple={{ color: '#e0e0e0' }}>
      
      <View style={styles.cardHeader}>
        <Text style={styles.structureIcon}>{structure.icon}</Text>
        <View style={styles.structureInfo}>
          <Text style={styles.structureTitle}>{structure.title}</Text>
          <Text style={styles.structureDescription}>{structure.description}</Text>
        </View>
        <Text style={styles.arrow}>→</Text>
      </View>

      <View style={styles.featuresContainer}>
        {structure.features.map((feature, index) => (
          <View key={index} style={styles.featureTag}>
            <Text style={[styles.featureTagText, { color: structure.color }]}>
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
          <Text style={styles.title}>Estructuras de Proyectos</Text>
          <Text style={styles.subtitle}>
            Diferentes formas de organizar carpetas y archivos en proyectos React Native
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>📁 ¿Por qué importa la estructura de carpetas?</Text>
          <Text style={styles.infoText}>
            Una buena estructura de carpetas es fundamental para:{'\n'}
            • Encontrar archivos rápidamente{'\n'}
            • Mantener código organizado y predecible{'\n'}
            • Facilitar la colaboración en equipo{'\n'}
            • Escalar el proyecto sin problemas{'\n'}
            • Reducir la complejidad cognitiva
          </Text>
        </View>

        <View style={styles.structuresContainer}>
          {structures.map(renderStructureCard)}
        </View>

        <View style={styles.comparisonSection}>
          <Text style={styles.comparisonTitle}>📊 Comparación por Proyecto</Text>
          
          <View style={styles.comparisonTable}>
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonHeader}>Estructura</Text>
              <Text style={styles.comparisonHeader}>Tamaño</Text>
              <Text style={styles.comparisonHeader}>Mejor Para</Text>
            </View>
            
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonCell}>Básica</Text>
              <Text style={styles.comparisonCell}>Pequeño</Text>
              <Text style={styles.comparisonCell}>MVPs, Prototipos</Text>
            </View>
            
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonCell}>Features</Text>
              <Text style={styles.comparisonCell}>Mediano</Text>
              <Text style={styles.comparisonCell}>Equipos múltiples</Text>
            </View>
            
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonCell}>Atomic</Text>
              <Text style={styles.comparisonCell}>Grande</Text>
              <Text style={styles.comparisonCell}>Design Systems</Text>
            </View>
            
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonCell}>Domain</Text>
              <Text style={styles.comparisonCell}>Enterprise</Text>
              <Text style={styles.comparisonCell}>Apps complejas</Text>
            </View>
          </View>
        </View>

        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Consejos para Estructurar tu Proyecto</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>
              🚀 <Text style={styles.tipBold}>Startup/MVP:</Text> Estructura básica por tipos
            </Text>
            <Text style={styles.tipItem}>
              🏢 <Text style={styles.tipBold}>Equipos medianos:</Text> Estructura por features
            </Text>
            <Text style={styles.tipItem}>
              🎨 <Text style={styles.tipBold}>Design system:</Text> Atomic design con componentes
            </Text>
            <Text style={styles.tipItem}>
              🏛️ <Text style={styles.tipBold}>Apps empresariales:</Text> Domain-driven o en capas
            </Text>
            <Text style={styles.tipItem}>
              🧩 <Text style={styles.tipBold}>Microservicios:</Text> Estructura modular independiente
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            📁 La estructura correcta evoluciona con tu proyecto. Empieza simple y refactoriza cuando sea necesario.
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
    backgroundColor: '#e3f2fd',
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
  structuresContainer: {
    padding: 10,
  },
  structureCard: {
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
  structureIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  structureInfo: {
    flex: 1,
  },
  structureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  structureDescription: {
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
  comparisonSection: {
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
  comparisonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  comparisonTable: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
  },
  comparisonRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  comparisonHeader: {
    flex: 1,
    padding: 12,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
  },
  comparisonCell: {
    flex: 1,
    padding: 12,
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  tipsSection: {
    backgroundColor: '#fff3e0',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 12,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 14,
    color: '#F57C00',
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

export default ArchitectureHomeScreen;
