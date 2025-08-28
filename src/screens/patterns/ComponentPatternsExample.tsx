import React, { useState, ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ComponentPatternsExample: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<string>('render-props');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const patterns = [
    {
      id: 'render-props',
      title: 'Render Props',
      description: 'Función como children para compartir lógica',
      color: '#4CAF50'
    },
    {
      id: 'children-functions',
      title: 'Children as Functions',
      description: 'Children que son funciones para datos dinámicos',
      color: '#2196F3'
    },
    {
      id: 'compound-components',
      title: 'Compound Components',
      description: 'Componentes que trabajan juntos implícitamente',
      color: '#FF9800'
    },
    {
      id: 'controlled-components',
      title: 'Controlled Components',
      description: 'Componentes controlados por props externas',
      color: '#9C27B0'
    }
  ];

  // ====== RENDER PROPS PATTERN ======
  interface DataFetcherProps {
    url: string;
    children: (data: { loading: boolean; data: any; error: string | null }) => ReactNode;
  }

  const DataFetcher: React.FC<DataFetcherProps> = ({ url, children }) => {
    const [state, setState] = useState({
      loading: false,
      data: null,
      error: null as string | null
    });

    const fetchData = async () => {
      setState({ loading: true, data: null, error: null });
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockData = url.includes('users') 
          ? [{ id: 1, name: 'Ana García' }, { id: 2, name: 'Carlos López' }]
          : [{ id: 1, title: 'React Patterns' }, { id: 2, title: 'Performance Tips' }];
        
        setState({ loading: false, data: mockData, error: null });
      } catch (error: any) {
        setState({ loading: false, data: null, error: error.message });
      }
    };

    React.useEffect(() => {
      fetchData();
    }, [url]);

    return <>{children(state)}</>;
  };

  // ====== CHILDREN AS FUNCTIONS PATTERN ======
  interface SearchProps {
    data: Array<{ id: number; name?: string; title?: string }>;
    children: (filteredData: any[], searchQuery: string, setSearchQuery: (query: string) => void) => ReactNode;
  }

  const Search: React.FC<SearchProps> = ({ data, children }) => {
    const [query, setQuery] = useState('');
    
    const filteredData = data.filter(item => 
      (item.name?.toLowerCase() || item.title?.toLowerCase() || '').includes(query.toLowerCase())
    );

    return <>{children(filteredData, query, setQuery)}</>;
  };

  // ====== COMPOUND COMPONENTS PATTERN ======
  const ModalContext = React.createContext<{
    isOpen: boolean;
    onClose: () => void;
  } | null>(null);

  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
  }

  const Modal: React.FC<ModalProps> & {
    Header: React.FC<{ children: ReactNode }>;
    Body: React.FC<{ children: ReactNode }>;
    Footer: React.FC<{ children: ReactNode }>;
  } = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <ModalContext.Provider value={{ isOpen, onClose }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {children}
          </View>
        </View>
      </ModalContext.Provider>
    );
  };

  Modal.Header = ({ children }) => {
    const context = React.useContext(ModalContext);
    
    return (
      <View style={styles.modalHeader}>
        <Text style={styles.modalHeaderText}>{children}</Text>
        <Pressable style={styles.closeButton} onPress={context?.onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </Pressable>
      </View>
    );
  };

  Modal.Body = ({ children }) => (
    <View style={styles.modalBody}>
      {children}
    </View>
  );

  Modal.Footer = ({ children }) => (
    <View style={styles.modalFooter}>
      {children}
    </View>
  );

  // ====== CONTROLLED COMPONENTS PATTERN ======
  interface ControlledInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    label?: string;
    error?: string;
  }

  const ControlledInput: React.FC<ControlledInputProps> = ({ 
    value, 
    onChangeText, 
    placeholder, 
    label, 
    error 
  }) => (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <TextInput
        style={[styles.textInput, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  // Demos State
  const [modalOpen, setModalOpen] = useState(false);
  const [controlledValue, setControlledValue] = useState('');
  const [inputError, setInputError] = useState('');

  const handleControlledChange = (text: string) => {
    setControlledValue(text);
    if (text.length < 3) {
      setInputError('Mínimo 3 caracteres');
    } else {
      setInputError('');
    }
  };

  // Code examples for each pattern
  const codeExamples = {
    'render-props': `// Render Props Pattern
interface DataFetcherProps {
  url: string;
  children: (data: { loading: boolean; data: any; error: string | null }) => ReactNode;
}

const DataFetcher: React.FC<DataFetcherProps> = ({ url, children }) => {
  const [state, setState] = useState({ loading: false, data: null, error: null });

  const fetchData = async () => {
    setState({ loading: true, data: null, error: null });
    try {
      const response = await fetch(url);
      const data = await response.json();
      setState({ loading: false, data, error: null });
    } catch (error) {
      setState({ loading: false, data: null, error: error.message });
    }
  };

  useEffect(() => { fetchData(); }, [url]);

  return <>{children(state)}</>;
};

// Uso del Render Props
const UsersList = () => (
  <DataFetcher url="/api/users">
    {({ loading, data, error }) => {
      if (loading) return <ActivityIndicator />;
      if (error) return <Text>Error: {error}</Text>;
      return (
        <FlatList
          data={data}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        />
      );
    }}
  </DataFetcher>
);

// Ventajas:
// ✅ Lógica reutilizable
// ✅ Control total sobre el rendering
// ✅ Composición flexible`,

    'children-functions': `// Children as Functions Pattern
interface SearchProps {
  data: Array<any>;
  children: (filteredData: any[], searchQuery: string, setSearchQuery: (q: string) => void) => ReactNode;
}

const Search: React.FC<SearchProps> = ({ data, children }) => {
  const [query, setQuery] = useState('');
  
  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return <>{children(filteredData, query, setQuery)}</>;
};

// Uso
const SearchableList = ({ users }) => (
  <Search data={users}>
    {(filteredUsers, searchQuery, setSearchQuery) => (
      <View>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Buscar usuarios..."
        />
        <FlatList
          data={filteredUsers}
          renderItem={({ item }) => <UserCard user={item} />}
        />
      </View>
    )}
  </Search>
);

// Ventajas:
// ✅ Lógica de filtrado encapsulada
// ✅ UI completamente customizable
// ✅ Estado compartido automáticamente`,

    'compound-components': `// Compound Components Pattern
const ModalContext = createContext();

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <ModalContext.Provider value={{ isOpen, onClose }}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {children}
        </View>
      </View>
    </ModalContext.Provider>
  );
};

Modal.Header = ({ children }) => {
  const { onClose } = useContext(ModalContext);
  return (
    <View style={styles.modalHeader}>
      <Text>{children}</Text>
      <Pressable onPress={onClose}>
        <Text>✕</Text>
      </Pressable>
    </View>
  );
};

Modal.Body = ({ children }) => (
  <View style={styles.modalBody}>{children}</View>
);

Modal.Footer = ({ children }) => (
  <View style={styles.modalFooter}>{children}</View>
);

// Uso limpio y semántico
const App = () => (
  <Modal isOpen={showModal} onClose={handleClose}>
    <Modal.Header>
      Confirmar Acción
    </Modal.Header>
    <Modal.Body>
      ¿Estás seguro de que quieres continuar?
    </Modal.Body>
    <Modal.Footer>
      <Button title="Cancelar" onPress={handleClose} />
      <Button title="Confirmar" onPress={handleConfirm} />
    </Modal.Footer>
  </Modal>
);

// Ventajas:
// ✅ API intuitiva y semántica
// ✅ Componentes cohesivos
// ✅ Context automático entre parts`,

    'controlled-components': `// Controlled Components Pattern
interface ControlledInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
}

const ControlledInput: React.FC<ControlledInputProps> = ({ 
  value, 
  onChangeText, 
  placeholder, 
  label, 
  error 
}) => (
  <View style={styles.inputContainer}>
    {label && <Text style={styles.inputLabel}>{label}</Text>}
    <TextInput
      style={[styles.textInput, error && styles.inputError]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

// Uso con validación
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    if (!email.includes('@')) {
      setErrors(prev => ({ ...prev, email: 'Email inválido' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  return (
    <View>
      <ControlledInput
        label="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          validateEmail(text);
        }}
        error={errors.email}
        placeholder="tu@email.com"
      />
      <ControlledInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
      />
    </View>
  );
};

// Ventajas:
// ✅ Control total sobre el estado
// ✅ Validación en tiempo real
// ✅ Single source of truth`
  };

  const currentCode = codeExamples[selectedPattern as keyof typeof codeExamples] || '';

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Patrones de Componentes</Text>
          <Text style={styles.subtitle}>
            Props functions, children patterns y técnicas de composición
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>🧩 Patrones de Composición</Text>
          <Text style={styles.infoText}>
            Estos patrones te permiten crear componentes flexibles y reutilizables:{'\n\n'}
            🎭 <Text style={styles.infoBold}>Render Props:</Text> Funciones que retornan JSX{'\n'}
            👶 <Text style={styles.infoBold}>Children Functions:</Text> Children como funciones{'\n'}
            🏗️ <Text style={styles.infoBold}>Compound:</Text> Componentes que trabajan juntos{'\n'}
            🎮 <Text style={styles.infoBold}>Controlled:</Text> Estado controlado externamente
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Selecciona un Patrón</Text>
          
          <View style={styles.patternSelector}>
            {patterns.map((pattern) => (
              <Pressable
                key={pattern.id}
                style={[
                  styles.patternButton,
                  { borderColor: pattern.color },
                  selectedPattern === pattern.id && { backgroundColor: pattern.color }
                ]}
                onPress={() => setSelectedPattern(pattern.id)}
              >
                <Text style={[
                  styles.patternTitle,
                  selectedPattern === pattern.id && styles.selectedPatternText
                ]}>
                  {pattern.title}
                </Text>
                <Text style={[
                  styles.patternDescription,
                  selectedPattern === pattern.id && styles.selectedPatternText
                ]}>
                  {pattern.description}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💻 Código del Patrón</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{currentCode}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧪 Demos Interactivos</Text>
          
          {selectedPattern === 'render-props' && (
            <View style={styles.demoContainer}>
              <Text style={styles.demoTitle}>Render Props - Data Fetcher</Text>
              <DataFetcher url="/api/users">
                {({ loading, data, error }) => (
                  <View style={styles.demoCard}>
                    {loading && (
                      <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="#4CAF50" />
                        <Text style={styles.loadingText}>Cargando usuarios...</Text>
                      </View>
                    )}
                    {error && (
                      <Text style={styles.errorText}>Error: {error}</Text>
                    )}
                    {data && (
                      <View>
                        <Text style={styles.demoSubtitle}>Usuarios cargados:</Text>
                        {data.map((user: any) => (
                          <Text key={user.id} style={styles.dataItem}>• {user.name}</Text>
                        ))}
                      </View>
                    )}
                  </View>
                )}
              </DataFetcher>
            </View>
          )}

          {selectedPattern === 'children-functions' && (
            <View style={styles.demoContainer}>
              <Text style={styles.demoTitle}>Children Functions - Search</Text>
              <Search data={[
                { id: 1, name: 'Ana García' },
                { id: 2, name: 'Carlos López' },
                { id: 3, name: 'María Silva' },
                { id: 4, name: 'Juan Pérez' }
              ]}>
                {(filteredData, searchQuery, setSearchQuery) => (
                  <View style={styles.demoCard}>
                    <TextInput
                      style={styles.searchInput}
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                      placeholder="Buscar usuarios..."
                    />
                    <Text style={styles.resultsText}>
                      {filteredData.length} resultado(s) encontrado(s)
                    </Text>
                    {filteredData.map((item) => (
                      <Text key={item.id} style={styles.dataItem}>• {item.name}</Text>
                    ))}
                  </View>
                )}
              </Search>
            </View>
          )}

          {selectedPattern === 'compound-components' && (
            <View style={styles.demoContainer}>
              <Text style={styles.demoTitle}>Compound Components - Modal</Text>
              <Pressable
                style={styles.demoButton}
                onPress={() => setModalOpen(true)}
              >
                <Text style={styles.demoButtonText}>Abrir Modal</Text>
              </Pressable>
              
              <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <Modal.Header>
                  Ejemplo de Modal
                </Modal.Header>
                <Modal.Body>
                  <Text>Este es un ejemplo de compound components.</Text>
                  <Text>Los sub-componentes trabajan juntos automáticamente.</Text>
                </Modal.Body>
                <Modal.Footer>
                  <Pressable
                    style={styles.modalButton}
                    onPress={() => setModalOpen(false)}
                  >
                    <Text style={styles.modalButtonText}>Cerrar</Text>
                  </Pressable>
                </Modal.Footer>
              </Modal>
            </View>
          )}

          {selectedPattern === 'controlled-components' && (
            <View style={styles.demoContainer}>
              <Text style={styles.demoTitle}>Controlled Components - Input</Text>
              <View style={styles.demoCard}>
                <ControlledInput
                  label="Nombre de usuario"
                  value={controlledValue}
                  onChangeText={handleControlledChange}
                  placeholder="Ingresa tu nombre..."
                  error={inputError}
                />
                <Text style={styles.valueDisplay}>
                  Valor actual: "{controlledValue}"
                </Text>
                <Text style={styles.lengthDisplay}>
                  Longitud: {controlledValue.length} caracteres
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.comparisonSection}>
          <Text style={styles.comparisonTitle}>⚖️ Cuándo usar cada patrón</Text>
          
          <View style={styles.comparisonCard}>
            <Text style={styles.comparisonPattern}>Render Props</Text>
            <Text style={styles.comparisonUse}>
              ✅ Lógica compleja reutilizable{'\n'}
              ✅ Control total sobre rendering{'\n'}
              ❌ Puede crear "callback hell"
            </Text>
          </View>

          <View style={styles.comparisonCard}>
            <Text style={styles.comparisonPattern}>Children Functions</Text>
            <Text style={styles.comparisonUse}>
              ✅ Estado simple compartido{'\n'}
              ✅ API clara e intuitiva{'\n'}
              ❌ Limitado a children prop
            </Text>
          </View>

          <View style={styles.comparisonCard}>
            <Text style={styles.comparisonPattern}>Compound Components</Text>
            <Text style={styles.comparisonUse}>
              ✅ UI cohesiva y semántica{'\n'}
              ✅ Componentes relacionados{'\n'}
              ❌ Context overhead
            </Text>
          </View>

          <View style={styles.comparisonCard}>
            <Text style={styles.comparisonPattern}>Controlled Components</Text>
            <Text style={styles.comparisonUse}>
              ✅ Validación en tiempo real{'\n'}
              ✅ Single source of truth{'\n'}
              ❌ Más boilerplate
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🧩 Elige el patrón que mejor se adapte a tu caso de uso específico
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
    marginBottom: 16,
  },
  patternSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  patternButton: {
    flex: 1,
    minWidth: 140,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  patternTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  patternDescription: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  selectedPatternText: {
    color: '#fff',
  },
  codeBlock: {
    backgroundColor: '#2d3748',
    padding: 12,
    borderRadius: 8,
  },
  codeText: {
    color: '#a0aec0',
    fontFamily: 'Courier',
    fontSize: 9,
    lineHeight: 12,
  },
  demoContainer: {
    marginBottom: 20,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  demoCard: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    fontSize: 14,
    color: '#F44336',
  },
  demoSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  dataItem: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
    marginBottom: 2,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 8,
  },
  resultsText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  demoButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  demoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 20,
    maxWidth: 400,
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666',
  },
  modalBody: {
    padding: 16,
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'flex-end',
  },
  modalButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  inputError: {
    borderColor: '#F44336',
  },
  valueDisplay: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
  lengthDisplay: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  comparisonSection: {
    backgroundColor: '#fff3e0',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  comparisonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 16,
  },
  comparisonCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  comparisonPattern: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 4,
  },
  comparisonUse: {
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

export default ComponentPatternsExample;
