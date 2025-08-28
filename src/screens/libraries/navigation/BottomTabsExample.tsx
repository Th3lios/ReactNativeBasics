import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

// Home Tab Screen
const HomeTabScreen = () => {
  const [notifications] = useState([
    { id: 1, title: 'Nueva actualización disponible', time: 'Hace 5 min', type: 'info' },
    { id: 2, title: 'Tu pedido ha sido enviado', time: 'Hace 1 hora', type: 'success' },
    { id: 3, title: 'Recordatorio de pago', time: 'Hace 2 horas', type: 'warning' },
  ]);

  const [quickActions] = useState([
    { title: 'Nuevo Proyecto', icon: '➕', color: '#007AFF' },
    { title: 'Escanear QR', icon: '📱', color: '#34C759' },
    { title: 'Contactos', icon: '👥', color: '#FF9500' },
    { title: 'Configuración', icon: '⚙️', color: '#8E44AD' },
  ]);

  return (
    <ScrollView style={styles.tabContent}>
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>¡Bienvenido de vuelta!</Text>
        <Text style={styles.welcomeSubtitle}>Aquí tienes un resumen de tu actividad</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <Pressable key={index} style={styles.actionCard}>
              <Text style={[styles.actionIcon, { color: action.color }]}>{action.icon}</Text>
              <Text style={styles.actionTitle}>{action.title}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notificaciones Recientes</Text>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationCard}>
            <View style={[styles.notificationDot, { backgroundColor: getNotificationColor(notification.type) }]} />
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Search Tab Screen
const SearchTabScreen = () => {
  const [recentSearches] = useState([
    'React Native',
    'JavaScript ES6',
    'TypeScript',
    'Mobile Development',
    'UI/UX Design'
  ]);

  return (
    <View style={styles.tabContent}>
      <View style={styles.searchHeader}>
        <Text style={styles.tabTitle}>Buscar</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Búsquedas Recientes</Text>
        {recentSearches.map((search, index) => (
          <Pressable key={index} style={styles.searchItem}>
            <Text style={styles.searchIcon}>🔍</Text>
            <Text style={styles.searchText}>{search}</Text>
            <Text style={styles.searchArrow}>→</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categorías Populares</Text>
        <View style={styles.categoriesGrid}>
          {['Desarrollo', 'Diseño', 'Marketing', 'Negocios'].map((category, index) => (
            <Pressable key={index} style={styles.categoryCard}>
              <Text style={styles.categoryText}>{category}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

// Profile Tab Screen
const ProfileTabScreen = () => {
  const [user] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    avatar: '👨‍💻',
    level: 'Pro User'
  });

  const [stats] = useState([
    { label: 'Proyectos', value: '12', icon: '📊' },
    { label: 'Colaboradores', value: '45', icon: '👥' },
    { label: 'Tareas', value: '128', icon: '✅' },
  ]);

  return (
    <ScrollView style={styles.tabContent}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileAvatar}>{user.avatar}</Text>
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileEmail}>{user.email}</Text>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>{user.level}</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Text style={styles.statIcon}>{stat.icon}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuración</Text>
        {[
          { title: 'Editar Perfil', icon: '✏️' },
          { title: 'Notificaciones', icon: '🔔' },
          { title: 'Privacidad', icon: '🔒' },
          { title: 'Ayuda', icon: '❓' },
        ].map((item, index) => (
          <Pressable key={index} style={styles.settingItem}>
            <Text style={styles.settingIcon}>{item.icon}</Text>
            <Text style={styles.settingText}>{item.title}</Text>
            <Text style={styles.settingArrow}>→</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

// Favorites Tab Screen
const FavoritesTabScreen = () => {
  const [favorites] = useState([
    { id: 1, title: 'React Native Tutorial', category: 'Desarrollo', rating: 4.8 },
    { id: 2, title: 'UI Design Patterns', category: 'Diseño', rating: 4.9 },
    { id: 3, title: 'JavaScript Advanced', category: 'Programación', rating: 4.7 },
    { id: 4, title: 'Mobile UX Guide', category: 'UX', rating: 4.6 },
  ]);

  return (
    <ScrollView style={styles.tabContent}>
      <View style={styles.tabHeader}>
        <Text style={styles.tabTitle}>Favoritos</Text>
        <Text style={styles.tabSubtitle}>Tus contenidos guardados</Text>
      </View>

      <View style={styles.section}>
        {favorites.map((item) => (
          <View key={item.id} style={styles.favoriteCard}>
            <View style={styles.favoriteContent}>
              <Text style={styles.favoriteTitle}>{item.title}</Text>
              <Text style={styles.favoriteCategory}>{item.category}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
                <Text style={styles.ratingValue}>{item.rating}</Text>
              </View>
            </View>
            <Pressable style={styles.favoriteButton}>
              <Text style={styles.favoriteIcon}>❤️</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Helper function
const getNotificationColor = (type: string) => {
  switch (type) {
    case 'success': return '#34C759';
    case 'warning': return '#FF9500';
    case 'error': return '#FF3B30';
    default: return '#007AFF';
  }
};

// Tab Bar Icons Components
const HomeIcon = ({ color }: { focused: boolean; color: string }) => (
  <Text style={[styles.tabIcon, { color }]}>🏠</Text>
);

const SearchIcon = ({ color }: { focused: boolean; color: string }) => (
  <Text style={[styles.tabIcon, { color }]}>🔍</Text>
);

const FavoritesIcon = ({ focused, color }: { focused: boolean; color: string }) => (
  <Text style={[styles.tabIcon, { color }]}>{focused ? '❤️' : '🤍'}</Text>
);

const ProfileIcon = ({ color }: { focused: boolean; color: string }) => (
  <Text style={[styles.tabIcon, { color }]}>👤</Text>
);

// Bottom Tab Navigator
const BottomTabNavigator = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeTabScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchTabScreen}
        options={{
          tabBarLabel: 'Buscar',
          tabBarIcon: SearchIcon,
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesTabScreen}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: FavoritesIcon,
          tabBarBadge: 4,
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileTabScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ProfileIcon,
        }}
      />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

// Main Example Screen - Just return the navigator directly
const BottomTabsExample = () => {
  return <BottomTabNavigator />;
};

const styles = StyleSheet.create({
  // Safe Area Styles
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  // Tab Content Styles
  tabContent: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  tabHeader: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  tabSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  
  // Home Tab Styles
  welcomeCard: {
    backgroundColor: '#007AFF',
    margin: 15,
    padding: 20,
    borderRadius: 12,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  notificationTime: {
    fontSize: 14,
    color: '#666',
  },
  
  // Search Tab Styles
  searchHeader: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  searchText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchArrow: {
    fontSize: 16,
    color: '#007AFF',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryCard: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  
  // Profile Tab Styles
  profileHeader: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileAvatar: {
    fontSize: 48,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  levelBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  levelText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    margin: 15,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  settingArrow: {
    fontSize: 16,
    color: '#007AFF',
  },
  
  // Favorites Tab Styles
  favoriteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  favoriteContent: {
    flex: 1,
  },
  favoriteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  favoriteCategory: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStars: {
    fontSize: 12,
    marginRight: 8,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  favoriteButton: {
    padding: 8,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  
  // Tab Bar Styles
  tabIcon: {
    fontSize: 20,
  },

});

export default BottomTabsExample;