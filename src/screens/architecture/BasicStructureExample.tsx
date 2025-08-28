import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BasicStructureExample: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const folderStructure = {
    'src/': {
      description: 'Carpeta principal del código fuente',
      color: '#2196F3',
      folders: {
        'components/': {
          description: 'Componentes reutilizables de UI',
          files: [
            'Button.tsx - Botón personalizado',
            'Header.tsx - Barra superior',
            'Modal.tsx - Ventanas modales',
            'Input.tsx - Campo de entrada',
            'Card.tsx - Tarjetas de contenido',
            'Loading.tsx - Indicador de carga',
            'Avatar.tsx - Imagen de perfil',
            'Badge.tsx - Etiquetas pequeñas'
          ],
          color: '#4CAF50'
        },
        'screens/': {
          description: 'Pantallas/páginas de la aplicación',
          files: [
            'HomeScreen.tsx - Pantalla principal',
            'LoginScreen.tsx - Autenticación',
            'ProfileScreen.tsx - Perfil de usuario',
            'SettingsScreen.tsx - Configuraciones',
            'ProductListScreen.tsx - Lista productos',
            'ProductDetailScreen.tsx - Detalle producto',
            'CartScreen.tsx - Carrito compras',
            'CheckoutScreen.tsx - Proceso de pago'
          ],
          color: '#FF9800'
        },
        'services/': {
          description: 'Servicios y APIs para comunicación externa',
          files: [
            'api.ts - Cliente API principal',
            'authService.ts - Autenticación',
            'userService.ts - Gestión usuarios',
            'productService.ts - Productos',
            'paymentService.ts - Pagos',
            'notificationService.ts - Notificaciones',
            'locationService.ts - Geolocalización',
            'cacheService.ts - Cache local'
          ],
          color: '#9C27B0'
        },
        'utils/': {
          description: 'Funciones auxiliares y helpers',
          files: [
            'helpers.ts - Funciones generales',
            'validators.ts - Validaciones',
            'formatters.ts - Formateo datos',
            'constants.ts - Constantes globales',
            'permissions.ts - Permisos device',
            'storage.ts - AsyncStorage helpers',
            'encryption.ts - Cifrado datos',
            'dateUtils.ts - Utilidades fechas'
          ],
          color: '#607D8B'
        },
        'hooks/': {
          description: 'Custom hooks reutilizables',
          files: [
            'useAuth.ts - Hook autenticación',
            'useApi.ts - Hook para APIs',
            'useLocalStorage.ts - Storage local',
            'usePermissions.ts - Permisos',
            'useNetworkStatus.ts - Estado red',
            'useKeyboard.ts - Estado teclado',
            'useOrientation.ts - Orientación',
            'useBackHandler.ts - Botón atrás'
          ],
          color: '#795548'
        },
        'types/': {
          description: 'Definiciones de tipos TypeScript',
          files: [
            'index.ts - Exportaciones principales',
            'api.ts - Tipos para APIs',
            'user.ts - Tipos de usuario',
            'product.ts - Tipos de producto',
            'navigation.ts - Tipos navegación',
            'auth.ts - Tipos autenticación',
            'common.ts - Tipos comunes',
            'responses.ts - Respuestas API'
          ],
          color: '#3F51B5'
        },
        'navigation/': {
          description: 'Configuración de navegación',
          files: [
            'AppNavigator.tsx - Navegador principal',
            'AuthNavigator.tsx - Stack auth',
            'TabNavigator.tsx - Bottom tabs',
            'DrawerNavigator.tsx - Menu lateral',
            'routes.ts - Definición rutas',
            'linking.ts - Deep linking',
            'options.ts - Opciones pantallas',
            'types.ts - Tipos navegación'
          ],
          color: '#E91E63'
        },
        'styles/': {
          description: 'Estilos globales y temas',
          files: [
            'colors.ts - Paleta de colores',
            'typography.ts - Tipografías',
            'spacing.ts - Espaciados',
            'shadows.ts - Sombras',
            'theme.ts - Tema principal',
            'globalStyles.ts - Estilos globales',
            'dimensions.ts - Dimensiones',
            'animations.ts - Animaciones'
          ],
          color: '#FF5722'
        }
      }
    }
  };

  const advantages = [
    'Fácil de entender para desarrolladores nuevos',
    'Estructura intuitiva y predecible',
    'Búsqueda rápida por tipo de archivo',
    'Setup inicial muy simple',
    'Menos complejidad arquitectural',
    'Ideal para proyectos pequeños y MVPs'
  ];

  const disadvantages = [
    'Las carpetas crecen mucho con el proyecto',
    'Difícil localizar código relacionado',
    'No escala bien para equipos grandes',
    'Reutilización de código complicada',
    'Mantenimiento complejo en apps grandes',
    'Acoplamiento alto entre funcionalidades'
  ];

  const bestPractices = [
    {
      title: 'Naming Conventions',
      items: [
        'Usa PascalCase para componentes: UserProfile.tsx',
        'Usa camelCase para utils: formatDate.ts',
        'Usa kebab-case para assets: user-avatar.png',
        'Prefijos claros: useAuth.ts, AuthService.ts'
      ]
    },
    {
      title: 'Organización Interna',
      items: [
        'Máximo 10-15 archivos por carpeta',
        'Usa subcarpetas cuando sea necesario',
        'index.ts para exports limpios',
        'Co-locate archivos relacionados'
      ]
    },
    {
      title: 'Evolución',
      items: [
        'Empieza con esta estructura simple',
        'Migra a features cuando crezca',
        'Refactoriza gradualmente',
        'Mantén consistencia en el equipo'
      ]
    }
  ];

  const renderFolder = (folderName: string, folderData: any, level: number = 0) => {
    const isSelected = selectedFolder === folderName;
    const hasSubfolders = folderData.folders && Object.keys(folderData.folders).length > 0;
    
    return (
      <View key={folderName} style={[styles.folderContainer, { marginLeft: level * 20 }]}>
        <Pressable
          style={[
            styles.folderHeader,
            { borderLeftColor: folderData.color },
            isSelected && styles.selectedFolder
          ]}
          onPress={() => setSelectedFolder(isSelected ? null : folderName)}
        >
          <Text style={styles.folderIcon}>
            {hasSubfolders ? (isSelected ? '📂' : '📁') : '📄'}
          </Text>
          <Text style={styles.folderName}>{folderName}</Text>
          <Text style={styles.folderDescription}>{folderData.description}</Text>
        </Pressable>

        {isSelected && folderData.files && (
          <View style={styles.filesContainer}>
            {folderData.files.map((file: string, index: number) => (
              <Text key={index} style={styles.fileName}>
                📄 {file}
              </Text>
            ))}
          </View>
        )}

        {hasSubfolders && Object.entries(folderData.folders).map(([subFolderName, subFolderData]) =>
          renderFolder(subFolderName, subFolderData, level + 1)
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Estructura Básica por Tipos</Text>
          <Text style={styles.subtitle}>
            Organización tradicional separando archivos por su tipo y funcionalidad
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>📁 ¿Qué es la estructura por tipos?</Text>
          <Text style={styles.infoText}>
            Es la forma más tradicional y simple de organizar un proyecto React Native. 
            Los archivos se agrupan por su tipo o función técnica (componentes, screens, services, etc.) 
            en lugar de por características del negocio.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🗂️ Estructura del Proyecto</Text>
          <Text style={styles.sectionSubtitle}>
            Toca cualquier carpeta para ver su contenido
          </Text>
          
          <View style={styles.treeContainer}>
            {Object.entries(folderStructure).map(([folderName, folderData]) =>
              renderFolder(folderName, folderData)
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✅ Ventajas</Text>
          <View style={styles.listContainer}>
            {advantages.map((advantage, index) => (
              <Text key={index} style={styles.advantageItem}>
                ✅ {advantage}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>❌ Desventajas</Text>
          <View style={styles.listContainer}>
            {disadvantages.map((disadvantage, index) => (
              <Text key={index} style={styles.disadvantageItem}>
                ❌ {disadvantage}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Mejores Prácticas</Text>
          {bestPractices.map((practice, index) => (
            <View key={index} style={styles.practiceContainer}>
              <Text style={styles.practiceTitle}>{practice.title}</Text>
              {practice.items.map((item, itemIndex) => (
                <Text key={itemIndex} style={styles.practiceItem}>
                  • {item}
                </Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.codeSection}>
          <Text style={styles.codeTitle}>📋 Ejemplo Práctico</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{`// src/components/Button.tsx
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary' 
}) => {
  return (
    <Pressable style={[styles.button, styles[variant]]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

// src/screens/HomeScreen.tsx
import { Button } from '../components/Button';
import { userService } from '../services/userService';
import { useAuth } from '../hooks/useAuth';

export const HomeScreen: React.FC = () => {
  const { user } = useAuth();
  
  const handleLogout = async () => {
    await userService.logout();
  };

  return (
    <View style={styles.container}>
      <Text>Welcome {user?.name}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

// src/services/userService.ts
import { api } from './api';
import { User } from '../types/user';

export const userService = {
  async getProfile(): Promise<User> {
    const response = await api.get('/user/profile');
    return response.data;
  },
  
  async logout(): Promise<void> {
    await api.post('/auth/logout');
  }
};`}</Text>
          </View>
        </View>

        <View style={styles.recommendationSection}>
          <Text style={styles.recommendationTitle}>🎯 ¿Cuándo usar esta estructura?</Text>
          <View style={styles.recommendationList}>
            <Text style={styles.recommendationItem}>
              🚀 <Text style={styles.recommendationBold}>Startups y MVPs:</Text> Velocidad de desarrollo
            </Text>
            <Text style={styles.recommendationItem}>
              👨‍💻 <Text style={styles.recommendationBold}>Equipos pequeños:</Text> 1-5 desarrolladores
            </Text>
            <Text style={styles.recommendationItem}>
              📱 <Text style={styles.recommendationBold}>Apps simples:</Text> Pocas funcionalidades
            </Text>
            <Text style={styles.recommendationItem}>
              ⏱️ <Text style={styles.recommendationBold}>Prototipos:</Text> Desarrollo rápido
            </Text>
            <Text style={styles.recommendationItem}>
              🎓 <Text style={styles.recommendationBold}>Aprendizaje:</Text> Proyectos educativos
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            📁 Perfecta para comenzar. Migra a estructuras más complejas cuando el proyecto crezca.
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
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
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
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#2E7D32',
    lineHeight: 20,
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
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  treeContainer: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  folderContainer: {
    marginBottom: 4,
  },
  folderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 2,
    borderLeftWidth: 3,
  },
  selectedFolder: {
    backgroundColor: '#e3f2fd',
  },
  folderIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  folderName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
    minWidth: 100,
  },
  folderDescription: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  filesContainer: {
    backgroundColor: '#f5f5f5',
    padding: 8,
    marginLeft: 20,
    borderRadius: 4,
    marginBottom: 8,
  },
  fileName: {
    fontSize: 11,
    color: '#555',
    marginBottom: 2,
    lineHeight: 16,
  },
  listContainer: {
    gap: 8,
  },
  advantageItem: {
    fontSize: 14,
    color: '#2E7D32',
    lineHeight: 20,
  },
  disadvantageItem: {
    fontSize: 14,
    color: '#C62828',
    lineHeight: 20,
  },
  practiceContainer: {
    marginBottom: 16,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  practiceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  practiceItem: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
    marginLeft: 8,
  },
  codeSection: {
    backgroundColor: '#2d3748',
    margin: 10,
    padding: 16,
    borderRadius: 12,
  },
  codeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  codeBlock: {
    backgroundColor: '#1a202c',
    padding: 12,
    borderRadius: 8,
  },
  codeText: {
    color: '#a0aec0',
    fontFamily: 'Courier',
    fontSize: 9,
    lineHeight: 12,
  },
  recommendationSection: {
    backgroundColor: '#fff3e0',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 12,
  },
  recommendationList: {
    gap: 8,
  },
  recommendationItem: {
    fontSize: 14,
    color: '#F57C00',
    lineHeight: 20,
  },
  recommendationBold: {
    fontWeight: 'bold',
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

export default BasicStructureExample;
