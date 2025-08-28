import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ApiFlowsExample: React.FC = () => {
  const [selectedFlow, setSelectedFlow] = useState<string>('redux-thunk');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const flows = [
    {
      id: 'redux-thunk',
      title: 'Redux Thunk Flow',
      store: 'Redux Toolkit + Thunk',
      color: '#764ABC'
    },
    {
      id: 'zustand',
      title: 'Zustand Flow',
      store: 'Zustand',
      color: '#FF6B6B'
    },
    {
      id: 'context',
      title: 'Context API Flow',
      store: 'React Context',
      color: '#4ECDC4'
    },
    {
      id: 'local-state',
      title: 'Local State Flow',
      store: 'useState + useEffect',
      color: '#45B7D1'
    }
  ];

  const stepsByFlow = {
    'redux-thunk': [
      {
        step: 1,
        title: 'Trigger (Component)',
        code: `// UserList.tsx
const dispatch = useAppDispatch();

const handleLoadUsers = () => {
  dispatch(fetchUsers());
};

<Button onPress={handleLoadUsers} title="Load Users" />`,
        description: 'Usuario hace clic en botón, componente despacha action'
      },
      {
        step: 2,
        title: 'Action Creator (Thunk)',
        code: `// userSlice.ts
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getUsers();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);`,
        description: 'createAsyncThunk maneja automáticamente pending/fulfilled/rejected'
      },
      {
        step: 3,
        title: 'API Service',
        code: `// userService.ts
export const userService = {
  async getUsers(): Promise<User[]> {
    const response = await fetch('/api/users', {
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    
    return response.json();
  }
};`,
        description: 'Servicio hace llamada HTTP con headers y manejo de errores'
      },
      {
        step: 4,
        title: 'Store Update (Reducer)',
        code: `// userSlice.ts
const userSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});`,
        description: 'Store se actualiza automáticamente según el estado de la promesa'
      },
      {
        step: 5,
        title: 'UI Update (Component)',
        code: `// UserList.tsx
const { data: users, loading, error } = useAppSelector(
  state => state.users
);

if (loading) return <ActivityIndicator />;
if (error) return <Text>Error: {error}</Text>;

return (
  <FlatList
    data={users}
    renderItem={({ item }) => <UserCard user={item} />}
  />
);`,
        description: 'Componente se re-renderiza automáticamente cuando cambia el store'
      }
    ],
    'zustand': [
      {
        step: 1,
        title: 'Trigger (Component)',
        code: `// UserList.tsx
const { users, loading, error, fetchUsers } = useUserStore();

const handleLoadUsers = () => {
  fetchUsers();
};

<Button onPress={handleLoadUsers} title="Load Users" />`,
        description: 'Componente llama directamente al método del store'
      },
      {
        step: 2,
        title: 'Store Action',
        code: `// userStore.ts
interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: false,
  error: null,
  
  fetchUsers: async () => {
    set({ loading: true, error: null });
    
    try {
      const users = await userService.getUsers();
      set({ users, loading: false });
    } catch (error) {
      set({ 
        error: error.message, 
        loading: false 
      });
    }
  }
}));`,
        description: 'Store contiene tanto estado como acciones en un solo lugar'
      },
      {
        step: 3,
        title: 'API Service (Shared)',
        code: `// userService.ts - Mismo que Redux
export const userService = {
  async getUsers(): Promise<User[]> {
    // Same implementation as Redux example
  }
};`,
        description: 'Servicios son independientes del store usado'
      },
      {
        step: 4,
        title: 'UI Update (Automatic)',
        code: `// UserList.tsx
const { users, loading, error } = useUserStore();

// Zustand automatically re-renders when subscribed state changes
if (loading) return <ActivityIndicator />;
if (error) return <Text>Error: {error}</Text>;

return (
  <FlatList
    data={users}
    renderItem={({ item }) => <UserCard user={item} />}
  />
);`,
        description: 'Zustand re-renderiza automáticamente los componentes suscritos'
      }
    ],
    'context': [
      {
        step: 1,
        title: 'Provider Setup',
        code: `// UserProvider.tsx
const UserContext = createContext<UserContextType>(null!);

export const UserProvider: React.FC = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <UserContext.Provider value={{ 
      users, loading, error, fetchUsers 
    }}>
      {children}
    </UserContext.Provider>
  );
};`,
        description: 'Context Provider encapsula estado y lógica'
      },
      {
        step: 2,
        title: 'Custom Hook',
        code: `// useUser.ts
export const useUser = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  
  return context;
};`,
        description: 'Hook personalizado para acceder al context de forma segura'
      },
      {
        step: 3,
        title: 'Component Usage',
        code: `// UserList.tsx
const { users, loading, error, fetchUsers } = useUser();

const handleLoadUsers = () => {
  fetchUsers();
};

// Same UI logic as other examples`,
        description: 'Componente usa el hook personalizado como cualquier otro'
      }
    ],
    'local-state': [
      {
        step: 1,
        title: 'Component State',
        code: `// UserList.tsx
const [users, setUsers] = useState<User[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const fetchUsers = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const data = await userService.getUsers();
    setUsers(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};`,
        description: 'Estado y lógica completamente local al componente'
      },
      {
        step: 2,
        title: 'Effect Hook',
        code: `// UserList.tsx
useEffect(() => {
  fetchUsers();
}, []); // Load on mount

const handleRefresh = () => {
  fetchUsers();
};`,
        description: 'useEffect para cargar datos iniciales'
      },
      {
        step: 3,
        title: 'Custom Hook (Optional)',
        code: `// useUsers.ts
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);
  
  return { users, loading, error, fetchUsers };
};`,
        description: 'Hook reutilizable para lógica de usuarios'
      }
    ]
  };

  const simulateApiCall = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/error
      if (Math.random() > 0.3) {
        const mockData = [
          { id: 1, name: 'Ana García', email: 'ana@example.com' },
          { id: 2, name: 'Carlos López', email: 'carlos@example.com' },
          { id: 3, name: 'María Silva', email: 'maria@example.com' }
        ];
        setData(mockData);
        Alert.alert('Éxito', 'Datos cargados correctamente');
      } else {
        throw new Error('Network error: Unable to connect to server');
      }
    } catch (err: any) {
      setError(err.message);
      Alert.alert('Error', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const currentSteps = stepsByFlow[selectedFlow as keyof typeof stepsByFlow] || [];

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Flujos de API</Text>
          <Text style={styles.subtitle}>
            Desde el trigger hasta el almacenamiento según el store que uses
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>🌐 Anatomía de un Flujo de API</Text>
          <Text style={styles.infoText}>
            Todo flujo de API sigue estos pasos básicos:{'\n\n'}
            1. <Text style={styles.infoBold}>Trigger:</Text> Evento que inicia la llamada{'\n'}
            2. <Text style={styles.infoBold}>Loading State:</Text> Indicador de carga{'\n'}
            3. <Text style={styles.infoBold}>API Call:</Text> Petición HTTP al endpoint{'\n'}
            4. <Text style={styles.infoBold}>Response Handling:</Text> Success o error{'\n'}
            5. <Text style={styles.infoBold}>State Update:</Text> Actualización del store{'\n'}
            6. <Text style={styles.infoBold}>UI Refresh:</Text> Re-render automático
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔄 Selecciona tu Store</Text>
          <Text style={styles.sectionSubtitle}>
            Cada store maneja el flujo de forma diferente
          </Text>
          
          <View style={styles.flowSelector}>
            {flows.map((flow) => (
              <Pressable
                key={flow.id}
                style={[
                  styles.flowButton,
                  { borderColor: flow.color },
                  selectedFlow === flow.id && { backgroundColor: flow.color }
                ]}
                onPress={() => setSelectedFlow(flow.id)}
              >
                <Text style={[
                  styles.flowButtonText,
                  selectedFlow === flow.id && styles.selectedFlowText
                ]}>
                  {flow.title}
                </Text>
                <Text style={[
                  styles.flowButtonSubtext,
                  selectedFlow === flow.id && styles.selectedFlowText
                ]}>
                  {flow.store}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ Demo Interactivo</Text>
          <Pressable
            style={[styles.demoButton, isLoading && styles.disabledButton]}
            onPress={simulateApiCall}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.demoButtonText}>Simular Llamada API</Text>
            )}
          </Pressable>
          
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>❌ {error}</Text>
            </View>
          )}
          
          {data && (
            <View style={styles.successContainer}>
              <Text style={styles.successTitle}>✅ Datos cargados:</Text>
              {data.map((item: any) => (
                <Text key={item.id} style={styles.dataItem}>
                  • {item.name} ({item.email})
                </Text>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            📋 Flujo Paso a Paso: {flows.find(f => f.id === selectedFlow)?.title}
          </Text>
          
          {currentSteps.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <View style={styles.stepHeader}>
                <View style={[styles.stepNumber, { backgroundColor: flows.find(f => f.id === selectedFlow)?.color }]}>
                  <Text style={styles.stepNumberText}>{step.step}</Text>
                </View>
                <Text style={styles.stepTitle}>{step.title}</Text>
              </View>
              
              <Text style={styles.stepDescription}>{step.description}</Text>
              
              <View style={styles.codeBlock}>
                <Text style={styles.codeText}>{step.code}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.comparisonSection}>
          <Text style={styles.comparisonTitle}>⚡ Comparación de Stores</Text>
          
          <View style={styles.comparisonTable}>
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonHeader}>Store</Text>
              <Text style={styles.comparisonHeader}>Complejidad</Text>
              <Text style={styles.comparisonHeader}>Boilerplate</Text>
              <Text style={styles.comparisonHeader}>DevTools</Text>
            </View>
            
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonCell}>Redux Toolkit</Text>
              <Text style={styles.comparisonCell}>Media</Text>
              <Text style={styles.comparisonCell}>Medio</Text>
              <Text style={styles.comparisonCell}>Excelente</Text>
            </View>
            
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonCell}>Zustand</Text>
              <Text style={styles.comparisonCell}>Baja</Text>
              <Text style={styles.comparisonCell}>Mínimo</Text>
              <Text style={styles.comparisonCell}>Bueno</Text>
            </View>
            
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonCell}>Context API</Text>
              <Text style={styles.comparisonCell}>Media</Text>
              <Text style={styles.comparisonCell}>Medio</Text>
              <Text style={styles.comparisonCell}>Básico</Text>
            </View>
            
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonCell}>Local State</Text>
              <Text style={styles.comparisonCell}>Baja</Text>
              <Text style={styles.comparisonCell}>Mínimo</Text>
              <Text style={styles.comparisonCell}>React DevTools</Text>
            </View>
          </View>
        </View>

        <View style={styles.bestPracticesSection}>
          <Text style={styles.bestPracticesTitle}>💡 Mejores Prácticas</Text>
          
          <View style={styles.practiceCard}>
            <Text style={styles.practiceTitle}>🎯 Separation of Concerns</Text>
            <Text style={styles.practiceText}>
              • Servicios separados del store{'\n'}
              • Lógica de negocio en el store/hook{'\n'}
              • UI solo se preocupa por renderizar
            </Text>
          </View>

          <View style={styles.practiceCard}>
            <Text style={styles.practiceTitle}>⚡ Loading States</Text>
            <Text style={styles.practiceText}>
              • Siempre mostrar loading durante API calls{'\n'}
              • Deshabilitar botones durante carga{'\n'}
              • Skeleton screens para mejor UX
            </Text>
          </View>

          <View style={styles.practiceCard}>
            <Text style={styles.practiceTitle}>🚨 Error Handling</Text>
            <Text style={styles.practiceText}>
              • Manejo consistente de errores{'\n'}
              • Mensajes user-friendly{'\n'}
              • Retry mechanisms cuando sea apropiado
            </Text>
          </View>

          <View style={styles.practiceCard}>
            <Text style={styles.practiceTitle}>🗂️ Data Normalization</Text>
            <Text style={styles.practiceText}>
              • Normalizar datos complejos{'\n'}
              • Evitar duplicación en el store{'\n'}
              • Usar selectors para datos derivados
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🌐 La consistencia en flujos de API es clave para mantenibilidad
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
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
  infoBold: {
    fontWeight: 'bold',
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
  },
  flowSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  flowButton: {
    flex: 1,
    minWidth: 120,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  flowButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  flowButtonSubtext: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
    textAlign: 'center',
  },
  selectedFlowText: {
    color: '#fff',
  },
  demoButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  disabledButton: {
    opacity: 0.6,
  },
  demoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  errorText: {
    color: '#C62828',
    fontSize: 14,
  },
  successContainer: {
    backgroundColor: '#e8f5e8',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  successTitle: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dataItem: {
    color: '#2E7D32',
    fontSize: 13,
    marginLeft: 8,
  },
  stepContainer: {
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  codeBlock: {
    backgroundColor: '#2d3748',
    padding: 12,
    borderRadius: 8,
  },
  codeText: {
    color: '#a0aec0',
    fontFamily: 'Courier',
    fontSize: 10,
    lineHeight: 14,
  },
  comparisonSection: {
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
  comparisonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  comparisonTable: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
  },
  comparisonRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  comparisonHeader: {
    flex: 1,
    padding: 12,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
  },
  comparisonCell: {
    flex: 1,
    padding: 12,
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  bestPracticesSection: {
    backgroundColor: '#fff3e0',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  bestPracticesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 16,
  },
  practiceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  practiceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 6,
  },
  practiceText: {
    fontSize: 12,
    color: '#FF8F00',
    lineHeight: 16,
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

export default ApiFlowsExample;
