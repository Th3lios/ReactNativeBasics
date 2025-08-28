import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const StackNavigationExample = ({ navigation }: any) => {
  const navigateToDetails = (item: any) => {
    navigation.navigate('StackDetailsExample', {
      title: item.title,
      description: item.description,
      timestamp: new Date().toISOString(),
    });
  };

  const items = [
    {
      id: 1,
      title: 'Pantalla de Detalles',
      description: 'Ejemplo de navegación con parámetros'
    },
    {
      id: 2,
      title: 'Configuración de Header',
      description: 'Personalización del header de navegación'
    },
    {
      id: 3,
      title: 'Transiciones Nativas',
      description: 'Animaciones de transición entre pantallas'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.title}>Stack Navigator</Text>
          <Text style={styles.description}>
            El Stack Navigator maneja la navegación de pila donde las pantallas 
            se apilan una sobre otra. Es el patrón más común de navegación.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 Navegación Básica</Text>
          <Text style={styles.sectionDescription}>
            Toca cualquier elemento para navegar a una nueva pantalla con parámetros:
          </Text>
          
          {items.map((item) => (
            <Pressable
              key={item.id}
              style={styles.listItem}
              onPress={() => navigateToDetails(item)}
              android_ripple={{ color: '#e0e0e0' }}>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
              <Text style={styles.itemArrow}>→</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛠️ Configuración Básica</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              {`import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Inicio' }}
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen}
        options={{ title: 'Detalles' }}
      />
    </Stack.Navigator>
  );
}`}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Navegación con Parámetros</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              {`// Enviar parámetros
navigation.navigate('Details', {
  itemId: 86,
  otherParam: 'Hola desde Home!',
});

// Recibir parámetros
function DetailsScreen({ route, navigation }) {
  const { itemId, otherParam } = route.params;
  
  return (
    <View>
      <Text>Item ID: {itemId}</Text>
      <Text>{otherParam}</Text>
    </View>
  );
}`}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Opciones de Screen</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              {`<Stack.Screen
  name="Profile"
  component={ProfileScreen}
  options={{
    title: 'Mi Perfil',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: () => (
      <Button title="Info" onPress={() => alert('Info')} />
    ),
  }}
/>`}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔄 Métodos de Navegación</Text>
          <View style={styles.methodsContainer}>
            <Pressable 
              style={styles.methodButton}
              onPress={() => navigation.push('StackNavigationExample')}>
              <Text style={styles.methodButtonText}>navigation.push()</Text>
              <Text style={styles.methodDescription}>Empuja nueva instancia</Text>
            </Pressable>
            
            <Pressable 
              style={styles.methodButton}
              onPress={() => navigation.pop()}>
              <Text style={styles.methodButtonText}>navigation.pop()</Text>
              <Text style={styles.methodDescription}>Retrocede una pantalla</Text>
            </Pressable>
            
            <Pressable 
              style={styles.methodButton}
              onPress={() => navigation.popToTop()}>
              <Text style={styles.methodButtonText}>navigation.popToTop()</Text>
              <Text style={styles.methodDescription}>Va a la primera pantalla</Text>
            </Pressable>
            
            <Pressable 
              style={styles.methodButton}
              onPress={() => Alert.alert('Replace', 'Reemplaza la pantalla actual')}>
              <Text style={styles.methodButtonText}>navigation.replace()</Text>
              <Text style={styles.methodDescription}>Reemplaza pantalla actual</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Mejores Prácticas</Text>
          <Text style={styles.bestPractices}>
            ✅ Usa títulos descriptivos para cada pantalla{'\n'}
            ✅ Pasa solo los datos necesarios como parámetros{'\n'}
            ✅ Configura opciones de header apropiadas{'\n'}
            ✅ Usa navigation.replace() para login flows{'\n'}
            ✅ Evita apilar demasiadas pantallas{'\n\n'}
            ⚠️ No pases objetos complejos como parámetros{'\n'}
            ⚠️ Evita usar push() indiscriminadamente{'\n'}
            ⚠️ Ten cuidado con navigation loops
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
    shadowOffset: { width: 0, height: 2 },
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
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  itemArrow: {
    fontSize: 18,
    color: '#007AFF',
    marginLeft: 12,
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
  methodsContainer: {
    gap: 12,
  },
  methodButton: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  methodButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  methodDescription: {
    fontSize: 14,
    color: '#666',
  },
  bestPractices: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
  },
});

export default StackNavigationExample;
