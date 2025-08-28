import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ActivityIndicatorExample: React.FC = () => {
  // Estados para diferentes escenarios
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  // Estados para formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados para datos simulados
  const [userData, setUserData] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);

  // Simulación de carga de datos
  const simulateDataLoad = async () => {
    setDataLoading(true);
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockData = [
        { id: 1, title: 'Post 1', content: 'Contenido del primer post' },
        { id: 2, title: 'Post 2', content: 'Contenido del segundo post' },
        { id: 3, title: 'Post 3', content: 'Contenido del tercer post' },
      ];
      
      setPosts(mockData);
      Alert.alert('Éxito', 'Datos cargados correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los datos');
    } finally {
      setDataLoading(false);
    }
  };

  // Simulación de login
  const simulateLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa email y contraseña');
      return;
    }
    
    setLoginLoading(true);
    try {
      // Simular delay de autenticación
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setUserData({ name: 'Usuario Demo', email });
      Alert.alert('Éxito', 'Login exitoso');
    } catch (error) {
      Alert.alert('Error', 'Credenciales incorrectas');
    } finally {
      setLoginLoading(false);
    }
  };

  // Simulación de subida de archivo
  const simulateUpload = async () => {
    setUploadProgress(true);
    try {
      // Simular progreso de subida
      await new Promise(resolve => setTimeout(resolve, 3000));
      Alert.alert('Éxito', 'Archivo subido correctamente');
    } catch (error) {
      Alert.alert('Error', 'Error al subir archivo');
    } finally {
      setUploadProgress(false);
    }
  };

  // Simulación de refresh
  const simulateRefresh = async () => {
    setRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('Actualizado', 'Contenido actualizado');
    } finally {
      setRefreshing(false);
    }
  };

  // Auto-refresh cada 5 segundos cuando está activo
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (refreshing) {
      interval = setInterval(() => {
        // Simular actualizaciones automáticas
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [refreshing]);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>ActivityIndicator Component</Text>
          <Text style={styles.subtitle}>
            Indicadores de carga y progreso para mejorar la UX
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔄 Indicadores Básicos</Text>
          
          <View style={styles.indicatorRow}>
            <View style={styles.indicatorContainer}>
              <Text style={styles.indicatorLabel}>Pequeño</Text>
              <ActivityIndicator size="small" color="#007AFF" />
            </View>
            
            <View style={styles.indicatorContainer}>
              <Text style={styles.indicatorLabel}>Grande</Text>
              <ActivityIndicator size="large" color="#007AFF" />
            </View>
            
            <View style={styles.indicatorContainer}>
              <Text style={styles.indicatorLabel}>Personalizado</Text>
              <ActivityIndicator size={30} color="#FF6B6B" />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎨 Variaciones de Color</Text>
          
          <View style={styles.colorRow}>
            <ActivityIndicator size="large" color="#007AFF" />
            <ActivityIndicator size="large" color="#4CAF50" />
            <ActivityIndicator size="large" color="#FF9800" />
            <ActivityIndicator size="large" color="#F44336" />
            <ActivityIndicator size="large" color="#9C27B0" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 Casos de Uso Comunes</Text>
          
          {/* Carga de datos */}
          <View style={styles.useCaseContainer}>
            <Text style={styles.useCaseTitle}>📊 Carga de Datos</Text>
            <Pressable
              style={[styles.button, dataLoading && styles.buttonDisabled]}
              onPress={simulateDataLoad}
              disabled={dataLoading}
            >
              {dataLoading ? (
                <View style={styles.buttonContent}>
                  <ActivityIndicator size="small" color="#fff" />
                  <Text style={styles.buttonTextLoading}>Cargando datos...</Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>Cargar Datos</Text>
              )}
            </Pressable>
            
            {posts.length > 0 && (
              <View style={styles.dataContainer}>
                <Text style={styles.dataTitle}>Datos cargados:</Text>
                {posts.map(post => (
                  <Text key={post.id} style={styles.dataItem}>• {post.title}</Text>
                ))}
              </View>
            )}
          </View>

          {/* Login con loading */}
          <View style={styles.useCaseContainer}>
            <Text style={styles.useCaseTitle}>🔐 Formulario de Login</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loginLoading}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loginLoading}
            />
            
            <Pressable
              style={[styles.button, loginLoading && styles.buttonDisabled]}
              onPress={simulateLogin}
              disabled={loginLoading}
            >
              {loginLoading ? (
                <View style={styles.buttonContent}>
                  <ActivityIndicator size="small" color="#fff" />
                  <Text style={styles.buttonTextLoading}>Iniciando sesión...</Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
              )}
            </Pressable>
            
            {userData && (
              <View style={styles.userInfo}>
                <Text style={styles.userInfoText}>✅ Bienvenido, {userData.name}</Text>
              </View>
            )}
          </View>

          {/* Subida de archivos */}
          <View style={styles.useCaseContainer}>
            <Text style={styles.useCaseTitle}>📁 Subida de Archivo</Text>
            <Pressable
              style={[styles.button, styles.uploadButton, uploadProgress && styles.buttonDisabled]}
              onPress={simulateUpload}
              disabled={uploadProgress}
            >
              {uploadProgress ? (
                <View style={styles.buttonContent}>
                  <ActivityIndicator size="small" color="#fff" />
                  <Text style={styles.buttonTextLoading}>Subiendo archivo...</Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>Subir Archivo</Text>
              )}
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔄 Loading States</Text>
          
          {/* Overlay Loading */}
          <View style={styles.overlayDemo}>
            <Text style={styles.overlayTitle}>Overlay de Carga</Text>
            <Pressable
              style={styles.overlayButton}
              onPress={() => {
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 2000);
              }}
            >
              <Text style={styles.overlayButtonText}>Mostrar Overlay</Text>
            </Pressable>
            
            {isLoading && (
              <View style={styles.overlay}>
                <View style={styles.overlayContent}>
                  <ActivityIndicator size="large" color="#007AFF" />
                  <Text style={styles.overlayText}>Procesando...</Text>
                </View>
              </View>
            )}
          </View>

          {/* Pull to Refresh Simulation */}
          <View style={styles.refreshDemo}>
            <Text style={styles.refreshTitle}>Simulación Pull-to-Refresh</Text>
            <Pressable
              style={[styles.refreshButton, refreshing && styles.refreshing]}
              onPress={simulateRefresh}
              disabled={refreshing}
            >
              {refreshing ? (
                <View style={styles.refreshContent}>
                  <ActivityIndicator size="small" color="#4CAF50" />
                  <Text style={styles.refreshText}>Actualizando...</Text>
                </View>
              ) : (
                <Text style={styles.refreshButtonText}>🔄 Actualizar</Text>
              )}
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Estados de Lista</Text>
          
          <View style={styles.listStatesContainer}>
            <View style={styles.listState}>
              <Text style={styles.listStateTitle}>Lista Vacía</Text>
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>📭</Text>
                <Text style={styles.emptyStateMessage}>No hay elementos</Text>
              </View>
            </View>
            
            <View style={styles.listState}>
              <Text style={styles.listStateTitle}>Cargando Lista</Text>
              <View style={styles.loadingState}>
                <ActivityIndicator size="small" color="#666" />
                <Text style={styles.loadingStateText}>Cargando elementos...</Text>
              </View>
            </View>
            
            <View style={styles.listState}>
              <Text style={styles.listStateTitle}>Error de Carga</Text>
              <View style={styles.errorState}>
                <Text style={styles.errorStateText}>❌</Text>
                <Text style={styles.errorStateMessage}>Error al cargar</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>💡 Buenas Prácticas</Text>
          <View style={styles.tipContainer}>
            <Text style={styles.tip}>• Usa loading states para operaciones que toman más de 1 segundo</Text>
            <Text style={styles.tip}>• Proporciona feedback visual inmediato al usuario</Text>
            <Text style={styles.tip}>• Combina con texto descriptivo cuando sea apropiado</Text>
            <Text style={styles.tip}>• Usa colores consistentes con tu diseño</Text>
            <Text style={styles.tip}>• Implementa timeouts para evitar loading infinitos</Text>
            <Text style={styles.tip}>• Considera skeleton screens para mejor UX</Text>
          </View>
        </View>

        <View style={styles.codeSection}>
          <Text style={styles.codeTitle}>📝 Código de Ejemplo</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{`import { ActivityIndicator } from 'react-native';

const [loading, setLoading] = useState(false);

// Uso básico
<ActivityIndicator size="large" color="#007AFF" />

// Con estado de carga
{loading ? (
  <ActivityIndicator size="small" color="#fff" />
) : (
  <Text>Cargar Datos</Text>
)}

// Overlay de carga
{loading && (
  <View style={styles.overlay}>
    <ActivityIndicator size="large" color="#007AFF" />
    <Text>Cargando...</Text>
  </View>
)}`}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ActivityIndicator mejora la experiencia del usuario durante operaciones asíncronas
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  indicatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  indicatorContainer: {
    alignItems: 'center',
    gap: 8,
  },
  indicatorLabel: {
    fontSize: 14,
    color: '#666',
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  useCaseContainer: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  useCaseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextLoading: {
    color: '#fff',
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    fontSize: 16,
  },
  dataContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  dataTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  dataItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  userInfo: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
  },
  userInfoText: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '500',
  },
  overlayDemo: {
    position: 'relative',
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 16,
  },
  overlayTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  overlayButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  overlayButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  overlayContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
  },
  overlayText: {
    fontSize: 16,
    color: '#333',
  },
  refreshDemo: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  refreshTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  refreshButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 150,
    alignItems: 'center',
  },
  refreshing: {
    backgroundColor: '#81C784',
  },
  refreshContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  refreshText: {
    color: '#fff',
    fontSize: 16,
  },
  listStatesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  listState: {
    flex: 1,
    alignItems: 'center',
  },
  listStateTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    minHeight: 80,
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 24,
    marginBottom: 4,
  },
  emptyStateMessage: {
    fontSize: 12,
    color: '#666',
  },
  loadingState: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    minHeight: 80,
    justifyContent: 'center',
    gap: 8,
  },
  loadingStateText: {
    fontSize: 12,
    color: '#666',
  },
  errorState: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    minHeight: 80,
    justifyContent: 'center',
  },
  errorStateText: {
    fontSize: 20,
    marginBottom: 4,
  },
  errorStateMessage: {
    fontSize: 12,
    color: '#c62828',
  },
  infoSection: {
    backgroundColor: '#e3f2fd',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 12,
  },
  tipContainer: {
    gap: 6,
  },
  tip: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
  codeSection: {
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
  codeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  codeBlock: {
    backgroundColor: '#2d3748',
    padding: 16,
    borderRadius: 8,
  },
  codeText: {
    fontFamily: 'Courier',
    fontSize: 12,
    color: '#a0aec0',
    lineHeight: 18,
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

export default ActivityIndicatorExample;
