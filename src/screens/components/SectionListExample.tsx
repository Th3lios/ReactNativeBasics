import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

interface ContactSection {
  title: string;
  data: Contact[];
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface ProductSection {
  title: string;
  data: Product[];
}

const SectionListExample: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExample, setSelectedExample] = useState<'contacts' | 'products' | 'settings'>('contacts');

  // Datos de contactos
  const contactsData: ContactSection[] = [
    {
      title: 'A',
      data: [
        { id: '1', name: 'Ana García', phone: '+1234567890', email: 'ana@example.com' },
        { id: '2', name: 'Alberto Ruiz', phone: '+1234567891' },
        { id: '3', name: 'Andrea López', phone: '+1234567892', email: 'andrea@example.com' },
      ],
    },
    {
      title: 'B',
      data: [
        { id: '4', name: 'Bruno Silva', phone: '+1234567893' },
        { id: '5', name: 'Beatriz Moreno', phone: '+1234567894', email: 'bea@example.com' },
      ],
    },
    {
      title: 'C',
      data: [
        { id: '6', name: 'Carlos Mendoza', phone: '+1234567895' },
        { id: '7', name: 'Carmen Díaz', phone: '+1234567896', email: 'carmen@example.com' },
        { id: '8', name: 'Cristian Torres', phone: '+1234567897' },
      ],
    },
    {
      title: 'M',
      data: [
        { id: '9', name: 'María Fernández', phone: '+1234567898', email: 'maria@example.com' },
        { id: '10', name: 'Miguel Ángel', phone: '+1234567899' },
      ],
    },
  ];

  // Datos de productos
  const productsData: ProductSection[] = [
    {
      title: 'Electrónicos',
      data: [
        { id: '1', name: 'iPhone 15 Pro', price: 999, description: 'Último modelo con chip A17 Pro' },
        { id: '2', name: 'MacBook Air M2', price: 1199, description: 'Laptop ultradelgada con chip M2' },
        { id: '3', name: 'AirPods Pro', price: 249, description: 'Audífonos con cancelación de ruido' },
      ],
    },
    {
      title: 'Ropa',
      data: [
        { id: '4', name: 'Camiseta Nike', price: 29, description: 'Camiseta deportiva de algodón' },
        { id: '5', name: 'Jeans Levi\'s', price: 89, description: 'Jeans clásicos 501' },
        { id: '6', name: 'Zapatillas Adidas', price: 120, description: 'Zapatillas deportivas Ultraboost' },
      ],
    },
    {
      title: 'Hogar',
      data: [
        { id: '7', name: 'Sofá Moderno', price: 599, description: 'Sofá de 3 plazas en color gris' },
        { id: '8', name: 'Mesa de Centro', price: 199, description: 'Mesa de madera con cristal' },
        { id: '9', name: 'Lámpara LED', price: 79, description: 'Lámpara de pie con regulador' },
      ],
    },
  ];

  // Datos de configuraciones
  const settingsData = [
    {
      title: 'Cuenta',
      data: [
        { id: '1', name: 'Perfil de Usuario', icon: '👤' },
        { id: '2', name: 'Privacidad', icon: '🔒' },
        { id: '3', name: 'Seguridad', icon: '🛡️' },
      ],
    },
    {
      title: 'Aplicación',
      data: [
        { id: '4', name: 'Notificaciones', icon: '🔔' },
        { id: '5', name: 'Tema', icon: '🎨' },
        { id: '6', name: 'Idioma', icon: '🌐' },
      ],
    },
    {
      title: 'Soporte',
      data: [
        { id: '7', name: 'Ayuda', icon: '❓' },
        { id: '8', name: 'Contactar Soporte', icon: '📞' },
        { id: '9', name: 'Acerca de', icon: 'ℹ️' },
      ],
    },
  ];

  const filteredContacts = contactsData.map(section => ({
    ...section,
    data: section.data.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(section => section.data.length > 0);

  const renderContactItem = ({ item }: { item: Contact }) => (
    <Pressable
      style={styles.contactItem}
      onPress={() => Alert.alert('Llamar', `¿Llamar a ${item.name}?`, [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Llamar', onPress: () => Alert.alert('Llamando...', `Llamando a ${item.phone}`) },
      ])}
    >
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phone}</Text>
        {item.email && <Text style={styles.contactEmail}>{item.email}</Text>}
      </View>
      <Text style={styles.contactAction}>📞</Text>
    </Pressable>
  );

  const renderProductItem = ({ item }: { item: Product }) => (
    <Pressable
      style={styles.productItem}
      onPress={() => Alert.alert('Producto', `${item.name}\n\n${item.description}\n\nPrecio: $${item.price}`, [
        { text: 'Cerrar' },
        { text: 'Agregar al Carrito', onPress: () => Alert.alert('Agregado', 'Producto agregado al carrito') },
      ])}
    >
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
      <Text style={styles.productAction}>🛒</Text>
    </Pressable>
  );

  const renderSettingItem = ({ item }: { item: any }) => (
    <Pressable
      style={styles.settingItem}
      onPress={() => Alert.alert('Configuración', `Abrir ${item.name}`)}
    >
      <Text style={styles.settingIcon}>{item.icon}</Text>
      <Text style={styles.settingName}>{item.name}</Text>
      <Text style={styles.settingAction}>→</Text>
    </Pressable>
  );

  const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  const renderExampleSelector = () => (
    <View style={styles.selectorContainer}>
      <Pressable
        style={[styles.selectorButton, selectedExample === 'contacts' && styles.selectedButton]}
        onPress={() => setSelectedExample('contacts')}
      >
        <Text style={[styles.selectorText, selectedExample === 'contacts' && styles.selectedText]}>
          📞 Contactos
        </Text>
      </Pressable>
      
      <Pressable
        style={[styles.selectorButton, selectedExample === 'products' && styles.selectedButton]}
        onPress={() => setSelectedExample('products')}
      >
        <Text style={[styles.selectorText, selectedExample === 'products' && styles.selectedText]}>
          🛍️ Productos
        </Text>
      </Pressable>
      
      <Pressable
        style={[styles.selectorButton, selectedExample === 'settings' && styles.selectedButton]}
        onPress={() => setSelectedExample('settings')}
      >
        <Text style={[styles.selectorText, selectedExample === 'settings' && styles.selectedText]}>
          ⚙️ Ajustes
        </Text>
      </Pressable>
    </View>
  );

  const renderListHeader = () => {
    if (selectedExample === 'contacts') {
      return (
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderTitle}>📱 Lista de Contactos</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar contactos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      );
    }
    
    if (selectedExample === 'products') {
      return (
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderTitle}>🛍️ Catálogo de Productos</Text>
          <Text style={styles.listHeaderSubtitle}>Toca cualquier producto para ver detalles</Text>
        </View>
      );
    }
    
    return (
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderTitle}>⚙️ Configuraciones</Text>
        <Text style={styles.listHeaderSubtitle}>Personaliza tu experiencia</Text>
      </View>
    );
  };

  const renderCurrentList = () => {
    switch (selectedExample) {
      case 'contacts':
        return (
          <SectionList
            sections={filteredContacts}
            keyExtractor={(item) => item.id}
            renderItem={renderContactItem}
            renderSectionHeader={renderSectionHeader}
            ItemSeparatorComponent={renderSeparator}
            ListHeaderComponent={renderListHeader}
            stickySectionHeadersEnabled={true}
            showsVerticalScrollIndicator={false}
            style={styles.sectionList}
          />
        );
        
      case 'products':
        return (
          <SectionList
            sections={productsData}
            keyExtractor={(item) => item.id}
            renderItem={renderProductItem}
            renderSectionHeader={renderSectionHeader}
            ItemSeparatorComponent={renderSeparator}
            ListHeaderComponent={renderListHeader}
            stickySectionHeadersEnabled={true}
            showsVerticalScrollIndicator={false}
            style={styles.sectionList}
          />
        );
        
      case 'settings':
        return (
          <SectionList
            sections={settingsData}
            keyExtractor={(item) => item.id}
            renderItem={renderSettingItem}
            renderSectionHeader={renderSectionHeader}
            ItemSeparatorComponent={renderSeparator}
            ListHeaderComponent={renderListHeader}
            stickySectionHeadersEnabled={true}
            showsVerticalScrollIndicator={false}
            style={styles.sectionList}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>SectionList Component</Text>
        <Text style={styles.subtitle}>
          Listas organizadas por secciones con encabezados
        </Text>
      </View>

      {renderExampleSelector()}

      <View style={styles.content}>
        {renderCurrentList()}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>💡 Características del SectionList</Text>
        <View style={styles.featuresList}>
          <Text style={styles.feature}>• Organización automática por secciones</Text>
          <Text style={styles.feature}>• Headers pegajosos (sticky headers)</Text>
          <Text style={styles.feature}>• Renderizado optimizado para listas grandes</Text>
          <Text style={styles.feature}>• Soporte para búsqueda y filtrado</Text>
          <Text style={styles.feature}>• Separadores personalizables</Text>
          <Text style={styles.feature}>• Headers y footers de lista</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
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
  selectorContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  selectorButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#007AFF',
  },
  selectorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  selectedText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  sectionList: {
    flex: 1,
  },
  listHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  listHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  listHeaderSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  searchInput: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    fontSize: 16,
  },
  sectionHeader: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  contactEmail: {
    fontSize: 12,
    color: '#999',
  },
  contactAction: {
    fontSize: 20,
    marginLeft: 16,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  productAction: {
    fontSize: 20,
    marginLeft: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  settingName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  settingAction: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 16,
  },
  infoSection: {
    backgroundColor: '#e8f5e8',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  featuresList: {
    gap: 6,
  },
  feature: {
    fontSize: 14,
    color: '#2E7D32',
    lineHeight: 20,
  },
});

export default SectionListExample;
