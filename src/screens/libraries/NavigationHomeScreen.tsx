import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NavigationHomeScreen = ({ navigation }: any) => {
  const navigationTypes = [
    {
      id: 'stack',
      title: 'Stack Navigator',
      description: 'Navegación de pila con transiciones nativas',
      icon: '📚',
      screen: 'StackNavigationExample',
      complexity: 'Básico',
      features: [
        'Push/Pop screens',
        'Header customizable',
        'Transiciones nativas',
        'Params entre pantallas'
      ]
    },
    {
      id: 'bottom-tabs',
      title: 'Bottom Tab Navigator',
      description: 'Tabs inferiores para navegación principal',
      icon: '📱',
      screen: 'BottomTabsExample',
      complexity: 'Básico',
      features: [
        'Tabs persistentes',
        'Iconos y badges',
        'Lazy loading',
        'Tab bar personalizable'
      ]
    },
    {
      id: 'top-tabs',
      title: 'Top Tab Navigator',
      description: 'Tabs superiores con scroll horizontal',
      icon: '📊',
      screen: 'TopTabsExample',
      complexity: 'Intermedio',
      features: [
        'Scroll horizontal',
        'Indicador animado',
        'Lazy loading',
        'Swipe gestures'
      ]
    },
    {
      id: 'drawer',
      title: 'Drawer Navigator',
      description: 'Menú lateral deslizante',
      icon: '🍔',
      screen: 'DrawerNavigationExample',
      complexity: 'Intermedio',
      features: [
        'Menú deslizante',
        'Custom drawer content',
        'Gesture navigation',
        'Status aware'
      ]
    }
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Básico':
        return '#4caf50';
      case 'Intermedio':
        return '#ff9800';
      case 'Avanzado':
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  };

  const renderNavigationCard = (navType: any) => (
    <Pressable
      key={navType.id}
      style={styles.navigationCard}
      onPress={() => navigation.navigate(navType.screen)}
      android_ripple={{ color: '#e0e0e0' }}>
      
      <View style={styles.cardHeader}>
        <Text style={styles.navigationIcon}>{navType.icon}</Text>
        <View style={styles.navigationInfo}>
          <Text style={styles.navigationTitle}>{navType.title}</Text>
          <Text style={styles.navigationDescription}>{navType.description}</Text>
          <View style={[
            styles.complexityBadge, 
            { backgroundColor: getComplexityColor(navType.complexity) }
          ]}>
            <Text style={styles.complexityText}>{navType.complexity}</Text>
          </View>
        </View>
      </View>

      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>Características:</Text>
        {navType.features.map((feature: string, index: number) => (
          <Text key={index} style={styles.featureItem}>
            • {feature}
          </Text>
        ))}
      </View>

      <Text style={styles.arrow}>→</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>React Navigation</Text>
          <Text style={styles.subtitle}>
            Navegación robusta para aplicaciones React Native
          </Text>
          <Text style={styles.description}>
            React Navigation es la librería estándar para manejar navegación 
            en React Native. Proporciona navegadores nativos con APIs 
            declarativas y configuración flexible.
          </Text>
        </View>

        <View style={styles.installationSection}>
          <Text style={styles.installationTitle}>📦 Instalación</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              {`npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context

# Para Stack Navigator
npm install @react-navigation/stack

# Para Bottom Tabs
npm install @react-navigation/bottom-tabs

# Para Top Tabs
npm install @react-navigation/material-top-tabs

# Para Drawer
npm install @react-navigation/drawer`}
            </Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>🧭 ¿Por qué React Navigation?</Text>
          <Text style={styles.infoText}>
            React Navigation es la solución más popular y madura para navegación 
            en React Native. Ofrece APIs nativas, transiciones fluidas y una 
            arquitectura extensible.
          </Text>
          
          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>✨ Beneficios:</Text>
            <Text style={styles.benefitItem}>• Navegación nativa en iOS y Android</Text>
            <Text style={styles.benefitItem}>• APIs declarativas y type-safe</Text>
            <Text style={styles.benefitItem}>• Navegadores altamente customizables</Text>
            <Text style={styles.benefitItem}>• Soporte para deep linking</Text>
            <Text style={styles.benefitItem}>• State persistence automático</Text>
            <Text style={styles.benefitItem}>• Excelente documentación</Text>
          </View>
        </View>

        <View style={styles.navigatorsContainer}>
          <Text style={styles.navigatorsTitle}>Tipos de Navegadores</Text>
          {navigationTypes.map(renderNavigationCard)}
        </View>

        <View style={styles.setupSection}>
          <Text style={styles.setupTitle}>⚙️ Setup Básico</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              {`// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}`}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🎯 Cada ejemplo incluye código funcional y mejores prácticas
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
  installationSection: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  installationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  codeContainer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#333',
    lineHeight: 18,
  },
  infoSection: {
    backgroundColor: '#e3f2fd',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#1976d2',
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
    color: '#1976d2',
    marginBottom: 8,
  },
  benefitItem: {
    fontSize: 14,
    color: '#1976d2',
    marginBottom: 4,
  },
  navigatorsContainer: {
    padding: 10,
  },
  navigatorsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  navigationCard: {
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
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  navigationIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  navigationInfo: {
    flex: 1,
  },
  navigationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  navigationDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  complexityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  complexityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  featuresContainer: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  featureItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  arrow: {
    fontSize: 20,
    color: '#007AFF',
    textAlign: 'right',
  },
  setupSection: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  setupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
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

export default NavigationHomeScreen;
