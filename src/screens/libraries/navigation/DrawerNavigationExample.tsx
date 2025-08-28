import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

// Dashboard Screen
const DashboardScreen = ({ navigation }: any) => {
  const [metrics] = useState([
    { title: 'Usuarios Activos', value: '1,248', change: '+12%', color: '#34C759' },
    { title: 'Ventas del Mes', value: '$15,234', change: '+8%', color: '#007AFF' },
    { title: 'Pedidos Pendientes', value: '23', change: '-5%', color: '#FF9500' },
    { title: 'Satisfacción', value: '4.8/5', change: '+0.2%', color: '#AF52DE' },
  ]);

  const [recentActivity] = useState([
    { id: 1, user: 'Juan Pérez', action: 'realizó una compra', time: 'Hace 5 min', icon: '🛒' },
    { id: 2, user: 'María García', action: 'se registró', time: 'Hace 12 min', icon: '👤' },
    { id: 3, user: 'Carlos López', action: 'dejó una reseña', time: 'Hace 20 min', icon: '⭐' },
    { id: 4, user: 'Ana Rodríguez', action: 'actualizó su perfil', time: 'Hace 35 min', icon: '✏️' },
  ]);

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        <Pressable 
          style={styles.menuButton}
          onPress={() => navigation.openDrawer()}>
          <Text style={styles.menuIcon}>☰</Text>
        </Pressable>
        <Text style={styles.screenTitle}>Dashboard</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.metricsContainer}>
        {metrics.map((metric, index) => (
          <View key={index} style={styles.metricCard}>
            <Text style={styles.metricTitle}>{metric.title}</Text>
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={[styles.metricChange, { color: metric.color }]}>
              {metric.change}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actividad Reciente</Text>
        {recentActivity.map((activity) => (
          <View key={activity.id} style={styles.activityItem}>
            <Text style={styles.activityIcon}>{activity.icon}</Text>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>
                <Text style={styles.activityUser}>{activity.user}</Text>
                {' '}{activity.action}
              </Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Settings Screen
const SettingsScreen = ({ navigation }: any) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  const settingsOptions = [
    {
      title: 'Notificaciones',
      subtitle: 'Recibir alertas y actualizaciones',
      value: notifications,
      onToggle: setNotifications,
    },
    {
      title: 'Modo Oscuro',
      subtitle: 'Cambiar apariencia de la app',
      value: darkMode,
      onToggle: setDarkMode,
    },
    {
      title: 'Ubicación',
      subtitle: 'Permitir acceso a la ubicación',
      value: location,
      onToggle: setLocation,
    },
    {
      title: 'Analytics',
      subtitle: 'Compartir datos de uso anónimos',
      value: analytics,
      onToggle: setAnalytics,
    },
  ];

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        <Pressable 
          style={styles.menuButton}
          onPress={() => navigation.openDrawer()}>
          <Text style={styles.menuIcon}>☰</Text>
        </Pressable>
        <Text style={styles.screenTitle}>Configuración</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferencias</Text>
        {settingsOptions.map((option, index) => (
          <View key={index} style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{option.title}</Text>
              <Text style={styles.settingSubtitle}>{option.subtitle}</Text>
            </View>
            <Switch
              value={option.value}
              onValueChange={option.onToggle}
              trackColor={{ false: '#e0e0e0', true: '#007AFF' }}
              thumbColor={option.value ? '#fff' : '#f4f3f4'}
            />
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acciones</Text>
        <Pressable 
          style={styles.actionButton}
          onPress={() => Alert.alert('Exportar', 'Datos exportados exitosamente')}>
          <Text style={styles.actionIcon}>📤</Text>
          <Text style={styles.actionText}>Exportar Datos</Text>
          <Text style={styles.actionArrow}>→</Text>
        </Pressable>
        
        <Pressable 
          style={styles.actionButton}
          onPress={() => Alert.alert('Cache', 'Cache limpiado exitosamente')}>
          <Text style={styles.actionIcon}>🗑️</Text>
          <Text style={styles.actionText}>Limpiar Cache</Text>
          <Text style={styles.actionArrow}>→</Text>
        </Pressable>
        
        <Pressable 
          style={[styles.actionButton, styles.dangerButton]}
          onPress={() => Alert.alert('Logout', '¿Estás seguro que quieres cerrar sesión?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Cerrar Sesión', style: 'destructive' }
          ])}>
          <Text style={styles.actionIcon}>🚪</Text>
          <Text style={[styles.actionText, styles.dangerText]}>Cerrar Sesión</Text>
          <Text style={[styles.actionArrow, styles.dangerText]}>→</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

// Profile Screen
const ProfileScreen = ({ navigation }: any) => {
  const [user] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    role: 'Administrador',
    joined: 'Enero 2023',
    avatar: '👨‍💼',
  });

  const profileStats = [
    { label: 'Posts Creados', value: '156' },
    { label: 'Comentarios', value: '1,248' },
    { label: 'Likes Recibidos', value: '3,567' },
  ];

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        <Pressable 
          style={styles.menuButton}
          onPress={() => navigation.openDrawer()}>
          <Text style={styles.menuIcon}>☰</Text>
        </Pressable>
        <Text style={styles.screenTitle}>Mi Perfil</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>{user.avatar}</Text>
        </View>
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileEmail}>{user.email}</Text>
        <View style={styles.profileBadge}>
          <Text style={styles.profileRole}>{user.role}</Text>
        </View>
        <Text style={styles.profileJoined}>Miembro desde {user.joined}</Text>
      </View>

      <View style={styles.statsContainer}>
        {profileStats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        <Pressable style={styles.quickAction}>
          <Text style={styles.actionIcon}>✏️</Text>
          <Text style={styles.actionText}>Editar Perfil</Text>
          <Text style={styles.actionArrow}>→</Text>
        </Pressable>
        
        <Pressable style={styles.quickAction}>
          <Text style={styles.actionIcon}>🔒</Text>
          <Text style={styles.actionText}>Cambiar Contraseña</Text>
          <Text style={styles.actionArrow}>→</Text>
        </Pressable>
        
        <Pressable style={styles.quickAction}>
          <Text style={styles.actionIcon}>🔔</Text>
          <Text style={styles.actionText}>Preferencias de Notificación</Text>
          <Text style={styles.actionArrow}>→</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

// Custom Drawer Content
const CustomDrawerContent = (props: any) => {
  const [user] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    avatar: '👨‍💼',
  });

  return (
    <DrawerContentScrollView 
      {...props} 
      style={styles.drawerContainer}
      contentContainerStyle={styles.drawerContentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.drawerHeader}>
        <View style={styles.drawerAvatarContainer}>
          <Text style={styles.drawerAvatar}>{user.avatar}</Text>
        </View>
        <Text style={styles.drawerUserName}>{user.name}</Text>
        <Text style={styles.drawerUserEmail}>{user.email}</Text>
      </View>
      
      <View style={styles.drawerContent}>
        <DrawerItemList {...props} />
      </View>
      
      <View style={styles.drawerFooter}>
        <Pressable 
          style={styles.drawerFooterButton}
          onPress={() => Alert.alert('Ayuda', 'Sección de ayuda y soporte')}>
          <Text style={styles.drawerFooterIcon}>❓</Text>
          <Text style={styles.drawerFooterText}>Ayuda y Soporte</Text>
        </Pressable>
        
        <Pressable 
          style={styles.drawerFooterButton}
          onPress={() => Alert.alert('Acerca de', 'Versión 1.0.0\nReact Native Sandbox')}>
          <Text style={styles.drawerFooterIcon}>ℹ️</Text>
          <Text style={styles.drawerFooterText}>Acerca de</Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
};

// Drawer Icon Components
const DashboardIcon = ({ color }: { focused: boolean; color: string }) => (
  <Text style={[styles.drawerIcon, { color }]}>📊</Text>
);

const ProfileIcon = ({ color }: { focused: boolean; color: string }) => (
  <Text style={[styles.drawerIcon, { color }]}>👤</Text>
);

const SettingsIcon = ({ color }: { focused: boolean; color: string }) => (
  <Text style={[styles.drawerIcon, { color }]}>⚙️</Text>
);

// Drawer Content Component wrapper
const DrawerContent = (props: any) => <CustomDrawerContent {...props} />;

// Drawer Navigator Component
const DrawerNavigator = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Drawer.Navigator
        drawerContent={DrawerContent}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: '#fff',
            width: 280,
          },
          drawerActiveTintColor: '#007AFF',
          drawerInactiveTintColor: '#666',
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: '500',
            marginLeft: -20,
          },
          drawerItemStyle: {
            marginVertical: 5,
            borderRadius: 8,
            paddingHorizontal: 10,
          },
          drawerActiveBackgroundColor: 'rgba(0, 122, 255, 0.1)',
          // Configuraciones optimizadas para evitar problemas con worklets
          swipeEnabled: true,
          drawerType: 'front', // Usar 'front' para evitar animaciones complejas
          lazy: true, // Lazy loading para mejor performance
        }}
    >
      <Drawer.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          drawerIcon: DashboardIcon,
          drawerLabel: 'Dashboard',
        }}
      />
      <Drawer.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          drawerIcon: ProfileIcon,
          drawerLabel: 'Mi Perfil',
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          drawerIcon: SettingsIcon,
          drawerLabel: 'Configuración',
        }}
      />
      </Drawer.Navigator>
    </SafeAreaView>
  );
};

// Main Example Screen - Drawer Navigator con manejo de errores
const DrawerNavigationExample = () => {
  // Renderizar directamente el DrawerNavigator optimizado
  return <DrawerNavigator />;
};

const styles = StyleSheet.create({
  // Safe Area Styles
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  // Screen Styles
  screen: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 20,
    color: '#007AFF',
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 36,
  },
  
  // Dashboard Styles
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#fff',
    margin: 10,
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
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 4,
  },
  activityUser: {
    fontWeight: '600',
    color: '#007AFF',
  },
  activityTime: {
    fontSize: 14,
    color: '#666',
  },
  
  // Settings Styles
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  actionArrow: {
    fontSize: 16,
    color: '#007AFF',
  },
  dangerButton: {
    borderBottomWidth: 0,
  },
  dangerText: {
    color: '#FF3B30',
  },
  
  // Profile Styles
  profileCard: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    fontSize: 32,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  profileBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  profileRole: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  profileJoined: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    margin: 10,
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
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  
  // Custom Drawer Styles
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawerContentContainer: {
    flexGrow: 1,
  },
  drawerHeader: {
    backgroundColor: '#007AFF',
    padding: 20,
    alignItems: 'center',
  },
  drawerAvatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  drawerAvatar: {
    fontSize: 24,
  },
  drawerUserName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  drawerUserEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  drawerContent: {
    flex: 1,
    paddingTop: 20,
  },
  drawerIcon: {
    fontSize: 18,
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  drawerFooterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  drawerFooterIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  drawerFooterText: {
    fontSize: 16,
    color: '#666',
  },
});

export default DrawerNavigationExample;
