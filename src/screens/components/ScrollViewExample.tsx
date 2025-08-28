import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScrollViewExample = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.title}>ScrollView Component</Text>
          <Text style={styles.description}>
            ScrollView es un contenedor desplazable que puede hospedar múltiples 
            componentes y vistas. Es ideal para contenido que no cabe en pantalla 
            y necesita ser desplazado.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ScrollView Vertical</Text>
          <View style={styles.scrollContainer}>
            <ScrollView style={styles.verticalScroll} showsVerticalScrollIndicator={true}>
              {Array.from({ length: 10 }, (_, i) => (
                <View key={i} style={styles.scrollItem}>
                  <Text style={styles.itemText}>Elemento {i + 1}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ScrollView Horizontal</Text>
          <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={true}
            style={styles.horizontalScroll}>
            {Array.from({ length: 8 }, (_, i) => (
              <View key={i} style={styles.horizontalItem}>
                <Text style={styles.itemText}>{i + 1}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contenido Largo</Text>
          <Text style={styles.longContent}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            {'\n\n'}
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
            sunt in culpa qui officia deserunt mollit anim id est laborum.
            {'\n\n'}
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            {'\n\n'}
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
            sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            {'\n\n'}
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
            adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et 
            dolore magnam aliquam quaerat voluptatem.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tarjetas Desplazables</Text>
          {Array.from({ length: 6 }, (_, i) => (
            <View key={i} style={styles.card}>
              <Text style={styles.cardTitle}>Tarjeta {i + 1}</Text>
              <Text style={styles.cardContent}>
                Esta es una tarjeta con contenido de ejemplo. Puedes desplazarte 
                verticalmente para ver más tarjetas como esta.
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Propiedades Clave</Text>
          <Text style={styles.properties}>
            • horizontal: ScrollView horizontal{'\n'}
            • showsVerticalScrollIndicator: Mostrar indicador vertical{'\n'}
            • showsHorizontalScrollIndicator: Mostrar indicador horizontal{'\n'}
            • pagingEnabled: Desplazamiento por páginas{'\n'}
            • bounces: Efecto rebote (iOS){'\n'}
            • scrollEnabled: Habilita/deshabilita scroll{'\n'}
            • onScroll: Callback cuando se desplaza
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuándo Usar ScrollView</Text>
          <Text style={styles.usage}>
            ✅ Contenido limitado y conocido{'\n'}
            ✅ Diseños complejos con diferentes componentes{'\n'}
            ✅ Cuando necesitas control total sobre el scroll{'\n\n'}
            ❌ Listas grandes (usar FlatList){'\n'}
            ❌ Datos dinámicos que pueden crecer mucho
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
  scrollContainer: {
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
  },
  verticalScroll: {
    flex: 1,
  },
  scrollItem: {
    backgroundColor: '#2196f3',
    padding: 16,
    margin: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  horizontalScroll: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
  },
  horizontalItem: {
    backgroundColor: '#4caf50',
    width: 80,
    height: 80,
    margin: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  longContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'justify',
  },
  card: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
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
  usage: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
  },
});

export default ScrollViewExample;
