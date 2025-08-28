import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LibrariesHomeScreen = ({ navigation }: any) => {
  const libraryCategories = [
    {
      id: 'navigation',
      title: 'Navigation',
      description: 'Navegación avanzada con React Navigation',
      icon: '🧭',
      color: '#007AFF',
      available: true,
      libraries: [
        'Stack Navigator',
        'Bottom Tabs',
        'Top Tabs', 
        'Drawer Navigator'
      ]
    },
    {
      id: 'forms',
      title: 'Forms & Validation',
      description: 'Formik + Yup para formularios robustos',
      icon: '📝',
      color: '#34C759',
      available: true,
      libraries: [
        'Formik',
        'Yup Validation',
        'Form Examples'
      ]
    },
    {
      id: 'animations',
      title: 'Animations',
      description: 'React Native Reanimated para animaciones fluidas',
      icon: '🎬',
      color: '#FF3B30',
      available: true,
      libraries: [
        'Reanimated v3',
        'Gesture Handler',
        'Animation Examples'
      ]
    },
    {
      id: 'bottomsheet',
      title: 'Bottom Sheet',
      description: 'Gorhom Bottom Sheet para interfaces modernas',
      icon: '📋',
      color: '#FF9500',
      available: true,
      libraries: [
        'Basic Bottom Sheet',
        'Scrollable Content',
        'Custom Backdrops'
      ]
    },
    {
      id: 'utilities',
      title: 'Utility Libraries',
      description: 'Herramientas útiles para desarrollo',
      icon: '🔧',
      color: '#8E44AD',
      available: true,
      libraries: [
        'Jail Monkey',
        'RN Camera',
        'Splash Screen',
        'SVG',
        'WebView'
      ]
    },
  ];

  const renderCategoryCard = (category: any) => (
    <Pressable
      key={category.id}
      style={[styles.categoryCard, { borderLeftColor: category.color }]}
      onPress={() => {
        if (category.available) {
          navigation.navigate(`${category.id}Home`);
        }
      }}
      android_ripple={{ color: '#e0e0e0' }}>
      
      <View style={styles.cardHeader}>
        <Text style={styles.categoryIcon}>{category.icon}</Text>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <Text style={styles.categoryDescription}>{category.description}</Text>
        </View>
        <View style={styles.statusContainer}>
          {category.available ? (
            <Text style={styles.availableStatus}>✅</Text>
          ) : (
            <Text style={styles.comingSoonStatus}>🚧</Text>
          )}
        </View>
      </View>

      <View style={styles.librariesContainer}>
        {category.libraries.map((lib: string, index: number) => (
          <View key={index} style={styles.libraryTag}>
            <Text style={[styles.libraryTagText, { color: category.color }]}>
              {lib}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.arrow}>→</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Librerías React Native</Text>
          <Text style={styles.subtitle}>
            Explora las librerías más populares del ecosistema
          </Text>
          <Text style={styles.description}>
            Ejemplos prácticos de las herramientas más utilizadas en el 
            desarrollo profesional de aplicaciones React Native.
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>📚 ¿Por qué usar librerías?</Text>
          <Text style={styles.infoText}>
            Las librerías de terceros aceleran el desarrollo, proporcionan 
            funcionalidades robustas y están mantenidas por la comunidad. 
            Te permiten enfocarte en la lógica de negocio en lugar de 
            reinventar la rueda.
          </Text>
          
          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>💡 Beneficios:</Text>
            <Text style={styles.benefitItem}>• Desarrollo más rápido y eficiente</Text>
            <Text style={styles.benefitItem}>• Código probado por la comunidad</Text>
            <Text style={styles.benefitItem}>• Mantenimiento y actualizaciones</Text>
            <Text style={styles.benefitItem}>• Documentación y ejemplos</Text>
            <Text style={styles.benefitItem}>• Soporte de la comunidad</Text>
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesTitle}>Categorías Disponibles</Text>
          {libraryCategories.map(renderCategoryCard)}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🚀 Cada categoría incluye ejemplos funcionales, instalación y mejores prácticas
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
    backgroundColor: '#e8f5e8',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#2e7d32',
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
    color: '#2e7d32',
    marginBottom: 8,
  },
  benefitItem: {
    fontSize: 14,
    color: '#2e7d32',
    marginBottom: 4,
  },
  categoriesContainer: {
    padding: 10,
  },
  categoriesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  categoryCard: {
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
  categoryIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  statusContainer: {
    alignItems: 'center',
  },
  availableStatus: {
    fontSize: 20,
  },
  comingSoonStatus: {
    fontSize: 20,
  },
  librariesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  libraryTag: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  libraryTagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  arrow: {
    fontSize: 20,
    color: '#007AFF',
    textAlign: 'right',
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

export default LibrariesHomeScreen;
