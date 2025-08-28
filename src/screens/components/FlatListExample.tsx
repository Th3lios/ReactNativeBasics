import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ListItem {
  id: string;
  title: string;
  description: string;
  category: string;
}

const FlatListExample = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<ListItem[]>([
    { id: '1', title: 'Elemento 1', description: 'Primera descripción', category: 'Categoría A' },
    { id: '2', title: 'Elemento 2', description: 'Segunda descripción', category: 'Categoría B' },
    { id: '3', title: 'Elemento 3', description: 'Tercera descripción', category: 'Categoría A' },
    { id: '4', title: 'Elemento 4', description: 'Cuarta descripción', category: 'Categoría C' },
    { id: '5', title: 'Elemento 5', description: 'Quinta descripción', category: 'Categoría B' },
    { id: '6', title: 'Elemento 6', description: 'Sexta descripción', category: 'Categoría A' },
    { id: '7', title: 'Elemento 7', description: 'Séptima descripción', category: 'Categoría C' },
    { id: '8', title: 'Elemento 8', description: 'Octava descripción', category: 'Categoría B' },
    { id: '9', title: 'Elemento 9', description: 'Novena descripción', category: 'Categoría A' },
    { id: '10', title: 'Elemento 10', description: 'Décima descripción', category: 'Categoría C' },
    { id: '11', title: 'Elemento 11', description: 'Undécima descripción', category: 'Categoría B' },
    { id: '12', title: 'Elemento 12', description: 'Duodécima descripción', category: 'Categoría A' },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simular carga de datos
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const renderItem = ({ item, index }: { item: ListItem; index: number }) => (
    <View style={[styles.listItem, index % 2 === 0 ? styles.evenItem : styles.oddItem]}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View style={[styles.categoryBadge, getCategoryColor(item.category)]}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Categoría A':
        return { backgroundColor: '#4caf50' };
      case 'Categoría B':
        return { backgroundColor: '#2196f3' };
      case 'Categoría C':
        return { backgroundColor: '#ff9800' };
      default:
        return { backgroundColor: '#9e9e9e' };
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>FlatList Component</Text>
      <Text style={styles.headerDescription}>
        FlatList es un componente performante para renderizar listas grandes. 
        Solo renderiza los elementos visibles en pantalla.
      </Text>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Fin de la lista • {data.length} elementos</Text>
    </View>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No hay elementos para mostrar</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        ItemSeparatorComponent={renderSeparator}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
      
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Propiedades Clave</Text>
        <Text style={styles.properties}>
          • data: Array de elementos a renderizar{'\n'}
          • renderItem: Función que renderiza cada elemento{'\n'}
          • keyExtractor: Función para extraer keys únicas{'\n'}
          • ListHeaderComponent: Componente header{'\n'}
          • ListFooterComponent: Componente footer{'\n'}
          • ItemSeparatorComponent: Separador entre items{'\n'}
          • refreshControl: Control para pull-to-refresh{'\n'}
          • onEndReached: Callback al llegar al final
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContainer: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 3,
  },
  evenItem: {
    marginLeft: 10,
    marginRight: 20,
  },
  oddItem: {
    marginLeft: 20,
    marginRight: 10,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  separator: {
    height: 8,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  infoSection: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 12,
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

export default FlatListExample;
