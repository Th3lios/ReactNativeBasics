import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const StackDetailsExample = ({ route, navigation }: any) => {
  const { title, description, timestamp } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.title}>Pantalla de Detalles</Text>
          <Text style={styles.subtitle}>
            Esta pantalla recibió parámetros desde la pantalla anterior
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📦 Parámetros Recibidos</Text>
          
          <View style={styles.paramContainer}>
            <Text style={styles.paramLabel}>Título:</Text>
            <Text style={styles.paramValue}>{title}</Text>
          </View>
          
          <View style={styles.paramContainer}>
            <Text style={styles.paramLabel}>Descripción:</Text>
            <Text style={styles.paramValue}>{description}</Text>
          </View>
          
          <View style={styles.paramContainer}>
            <Text style={styles.paramLabel}>Timestamp:</Text>
            <Text style={styles.paramValue}>{new Date(timestamp).toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔄 Acciones de Navegación</Text>
          
          <Pressable 
            style={styles.actionButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.actionButtonText}>← Regresar</Text>
            <Text style={styles.actionDescription}>navigation.goBack()</Text>
          </Pressable>
          
          <Pressable 
            style={styles.actionButton}
            onPress={() => navigation.push('StackDetailsExample', {
              title: 'Nueva Pantalla',
              description: 'Otra instancia de detalles',
              timestamp: new Date().toISOString(),
            })}>
            <Text style={styles.actionButtonText}>🔄 Push Nueva Instancia</Text>
            <Text style={styles.actionDescription}>navigation.push()</Text>
          </Pressable>
          
          <Pressable 
            style={styles.actionButton}
            onPress={() => navigation.popToTop()}>
            <Text style={styles.actionButtonText}>🏠 Ir al Inicio</Text>
            <Text style={styles.actionDescription}>navigation.popToTop()</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Código de Ejemplo</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              {`// En la pantalla anterior:
navigation.navigate('Details', {
  title: '${title}',
  description: '${description}',
  timestamp: '${timestamp}'
});

// En esta pantalla:
function DetailsScreen({ route, navigation }) {
  const { title, description, timestamp } = route.params;
  
  return (
    <View>
      <Text>{title}</Text>
      <Text>{description}</Text>
      <Text>{new Date(timestamp).toLocaleString()}</Text>
    </View>
  );
}`}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Configuración del Header</Text>
          <Text style={styles.description}>
            Esta pantalla puede configurar su propio header dinámicamente:
          </Text>
          
          <Pressable 
            style={styles.headerButton}
            onPress={() => navigation.setOptions({
              title: 'Título Actualizado',
              headerStyle: { backgroundColor: '#4caf50' }
            })}>
            <Text style={styles.headerButtonText}>Cambiar Título del Header</Text>
          </Pressable>
          
          <Pressable 
            style={styles.headerButton}
            onPress={() => navigation.setOptions({
              headerRight: () => (
                <Pressable onPress={() => alert('Header button pressed!')}>
                  <Text style={{ color: '#fff', marginRight: 15 }}>Info</Text>
                </Pressable>
              )
            })}>
            <Text style={styles.headerButtonText}>Agregar Botón al Header</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Información Adicional</Text>
          <Text style={styles.infoText}>
            Stack Navigator mantiene un historial de pantallas en una pila. 
            Cada vez que navegas a una nueva pantalla, se agrega a la pila. 
            Cuando retrocedes, se remueve de la pila.
          </Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>Métodos Principales:</Text>
            <Text style={styles.infoCardItem}>• navigate() - Navega a una pantalla</Text>
            <Text style={styles.infoCardItem}>• push() - Agrega nueva instancia</Text>
            <Text style={styles.infoCardItem}>• goBack() - Retrocede una pantalla</Text>
            <Text style={styles.infoCardItem}>• pop() - Remueve pantalla actual</Text>
            <Text style={styles.infoCardItem}>• popToTop() - Va al inicio</Text>
            <Text style={styles.infoCardItem}>• replace() - Reemplaza pantalla</Text>
          </View>
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
  subtitle: {
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
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  paramContainer: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  paramLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  paramValue: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'monospace',
  },
  actionButton: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'monospace',
  },
  headerButton: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  headerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976d2',
    textAlign: 'center',
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
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoCardItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});

export default StackDetailsExample;
