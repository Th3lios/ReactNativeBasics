import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainMenuScreen = ({ navigation }: any) => {
  const sections = [
    {
      id: 'components',
      title: 'Componentes Base',
      description: 'Componentes fundamentales de React Native',
      icon: '🧱',
      screen: 'ComponentsHome',
      available: true,
    },
    {
      id: 'hooks',
      title: 'Hooks',
      description: 'Hooks de React y React Native',
      icon: '🪝',
      screen: 'HooksHome',
      available: true,
    },
    {
      id: 'libraries',
      title: 'Librerías',
      description: 'Librerías populares del ecosistema',
      icon: '📚',
      screen: 'LibrariesHome',
      available: true,
    },
    {
      id: 'state',
      title: 'Gestión de Estados',
      description: 'Redux, Zustand, Context API y más',
      icon: '🗃️',
      screen: 'StateManagementHome',
      available: true,
    },
    {
      id: 'architecture',
      title: 'Arquitectura de Proyectos',
      description: 'Estructuras y patrones de organización',
      icon: '🏗️',
      screen: 'ArchitectureHome',
      available: false,
    },
    {
      id: 'workflows',
      title: 'Flujos de Desarrollo',
      description: 'CI/CD, testing, debugging',
      icon: '⚙️',
      screen: 'WorkflowsHome',
      available: false,
    },
    {
      id: 'patterns',
      title: 'Patrones Comunes',
      description: 'Patrones de diseño y mejores prácticas',
      icon: '🎯',
      screen: 'PatternsHome',
      available: false,
    },
    {
      id: 'comparison',
      title: 'Vue 3 vs React Native',
      description: 'Comparación de frameworks',
      icon: '⚖️',
      screen: 'ComparisonHome',
      available: false,
    },
  ];

  const renderSectionCard = (section: any, _index: number) => (
    <Pressable
      key={section.id}
      style={[
        styles.sectionCard,
        !section.available && styles.disabledCard
      ]}
      onPress={() => {
        if (section.available) {
          navigation.navigate(section.screen);
        }
      }}
      disabled={!section.available}
      android_ripple={{ color: section.available ? '#e0e0e0' : 'transparent' }}>
      
      <View style={styles.cardHeader}>
        <Text style={styles.sectionIcon}>{section.icon}</Text>
        {!section.available && (
          <View style={styles.comingSoonBadge}>
            <Text style={styles.comingSoonText}>Próximamente</Text>
          </View>
        )}
      </View>
      
      <View style={styles.cardContent}>
        <Text style={[
          styles.sectionTitle,
          !section.available && styles.disabledTitle
        ]}>
          {section.title}
        </Text>
        <Text style={[
          styles.sectionDescription,
          !section.available && styles.disabledDescription
        ]}>
          {section.description}
        </Text>
      </View>
      
      {section.available && (
        <Text style={styles.arrow}>→</Text>
      )}
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.appTitle}>React Native</Text>
          <Text style={styles.appSubtitle}>Guía Completa de Desarrollo</Text>
          <Text style={styles.description}>
            Explora todos los aspectos del desarrollo con React Native, 
            desde componentes básicos hasta arquitecturas avanzadas.
          </Text>
        </View>

        <View style={styles.sectionsContainer}>
          <Text style={styles.sectionsTitle}>Secciones Disponibles</Text>
          {sections.map((section, index) =>
            renderSectionCard(section, index),
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🚀 Sandbox de aprendizaje para React Native
          </Text>
          <Text style={styles.footerSubtext}>
            Cada sección incluye ejemplos prácticos y explicaciones detalladas
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
    padding: 24,
    backgroundColor: '#007AFF',
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    opacity: 0.9,
  },
  sectionsContainer: {
    padding: 16,
  },
  sectionsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionCard: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabledCard: {
    opacity: 0.6,
    backgroundColor: '#f5f5f5',
  },
  cardHeader: {
    position: 'relative',
  },
  sectionIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  comingSoonBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ff9800',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  comingSoonText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  disabledTitle: {
    color: '#999',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  disabledDescription: {
    color: '#aaa',
  },
  arrow: {
    fontSize: 24,
    color: '#007AFF',
    marginLeft: 12,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  footerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default MainMenuScreen;
