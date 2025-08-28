import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ViewExample = () => {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.title}>View Component</Text>
          <Text style={styles.description}>
            El componente View es el contenedor más fundamental en React Native. 
            Es equivalente al div en HTML y se usa para agrupar otros componentes.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejemplo Básico</Text>
          <View style={styles.exampleContainer}>
            <View style={styles.basicView}>
              <Text style={styles.viewText}>Esta es una View básica</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Views con Diferentes Estilos</Text>
          <View style={styles.exampleContainer}>
            <View style={styles.redView}>
              <Text style={styles.whiteText}>View Roja</Text>
            </View>
            <View style={styles.blueView}>
              <Text style={styles.whiteText}>View Azul</Text>
            </View>
            <View style={styles.greenView}>
              <Text style={styles.whiteText}>View Verde</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Views Anidadas</Text>
          <View style={styles.exampleContainer}>
            <View style={styles.parentView}>
              <Text style={styles.viewLabel}>View Padre</Text>
              <View style={styles.childView}>
                <Text style={styles.viewLabel}>View Hijo 1</Text>
              </View>
              <View style={styles.childView}>
                <Text style={styles.viewLabel}>View Hijo 2</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Layout con Flexbox</Text>
          <View style={styles.exampleContainer}>
            <View style={styles.flexContainer}>
              <View style={styles.flexItem}>
                <Text style={styles.flexText}>1</Text>
              </View>
              <View style={styles.flexItem}>
                <Text style={styles.flexText}>2</Text>
              </View>
              <View style={styles.flexItem}>
                <Text style={styles.flexText}>3</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Propiedades Clave</Text>
          <Text style={styles.properties}>
            • style: Define la apariencia y layout{'\n'}
            • children: Componentes hijos{'\n'}
            • pointerEvents: Controla eventos táctiles{'\n'}
            • testID: Para testing automatizado{'\n'}
            • accessible: Para accesibilidad
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  exampleContainer: {
    marginTop: 8,
  },
  basicView: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2196f3',
  },
  viewText: {
    fontSize: 16,
    color: '#1976d2',
    textAlign: 'center',
  },
  redView: {
    backgroundColor: '#f44336',
    padding: 12,
    margin: 4,
    borderRadius: 8,
  },
  blueView: {
    backgroundColor: '#2196f3',
    padding: 12,
    margin: 4,
    borderRadius: 8,
  },
  greenView: {
    backgroundColor: '#4caf50',
    padding: 12,
    margin: 4,
    borderRadius: 8,
  },
  whiteText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  parentView: {
    backgroundColor: '#ffeb3b',
    padding: 16,
    borderRadius: 8,
  },
  childView: {
    backgroundColor: '#ff9800',
    padding: 8,
    margin: 4,
    borderRadius: 4,
  },
  viewLabel: {
    textAlign: 'center',
    fontWeight: '500',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
  },
  flexItem: {
    backgroundColor: '#9c27b0',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  flexText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  properties: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    fontFamily: 'monospace',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
  },
});

export default ViewExample;
