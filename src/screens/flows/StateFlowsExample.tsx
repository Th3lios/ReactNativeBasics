import React, { useState, createContext, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Context para demostración
const CounterContext = createContext<{
  count: number;
  increment: () => void;
  decrement: () => void;
} | null>(null);

const StateFlowsExample: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<string>('props-drilling');
  
  // Estados locales para demos
  const [localCount, setLocalCount] = useState(0);
  const [globalCount, setGlobalCount] = useState(0);
  const [userInput, setUserInput] = useState('');

  const patterns = [
    {
      id: 'props-drilling',
      title: 'Props Drilling',
      description: 'Pasar datos a través de múltiples niveles',
      icon: '⬇️',
      color: '#F44336'
    },
    {
      id: 'state-lifting',
      title: 'State Lifting',
      description: 'Mover estado al componente padre común',
      icon: '⬆️',
      color: '#4CAF50'
    },
    {
      id: 'context-pattern',
      title: 'Context Pattern',
      description: 'Estado compartido sin props drilling',
      icon: '🌐',
      color: '#2196F3'
    },
    {
      id: 'compound-components',
      title: 'Compound Components',
      description: 'Componentes que trabajan juntos',
      icon: '🧩',
      color: '#9C27B0'
    }
  ];

  const communicationTypes = [
    {
      type: 'Parent → Child',
      method: 'Props',
      example: `<ChildComponent data={parentData} />`,
      when: 'Pasar datos o configuración hacia abajo',
      color: '#4CAF50'
    },
    {
      type: 'Child → Parent',
      method: 'Callbacks',
      example: `<ChildComponent onChange={handleChange} />`,
      when: 'Notificar eventos o cambios hacia arriba',
      color: '#FF9800'
    },
    {
      type: 'Sibling → Sibling',
      method: 'Lifted State',
      example: `// Estado en componente padre común`,
      when: 'Hermanos necesitan compartir estado',
      color: '#2196F3'
    },
    {
      type: 'Distant Components',
      method: 'Context/Store',
      example: `const { data } = useContext(MyContext)`,
      when: 'Componentes lejanos necesitan mismo estado',
      color: '#9C27B0'
    }
  ];

  // Ejemplo de Props Drilling
  const PropsDeepChild: React.FC<{ count: number; onIncrement: () => void }> = ({ count, onIncrement }) => (
    <View style={styles.exampleCard}>
      <Text style={styles.exampleTitle}>Nieto (Deep Child)</Text>
      <Text>Count: {count}</Text>
      <Pressable style={styles.button} onPress={onIncrement}>
        <Text style={styles.buttonText}>Increment</Text>
      </Pressable>
    </View>
  );

  const PropsMiddleChild: React.FC<{ count: number; onIncrement: () => void }> = ({ count, onIncrement }) => (
    <View style={styles.exampleCard}>
      <Text style={styles.exampleTitle}>Hijo (Middle Child)</Text>
      <Text style={styles.exampleSubtext}>Solo pasa props, no las usa</Text>
      <PropsDeepChild count={count} onIncrement={onIncrement} />
    </View>
  );

  // Ejemplo de Context
  const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [count, setCount] = useState(0);
    
    const increment = () => setCount(c => c + 1);
    const decrement = () => setCount(c => c - 1);
    
    return (
      <CounterContext.Provider value={{ count, increment, decrement }}>
        {children}
      </CounterContext.Provider>
    );
  };

  const ContextChild: React.FC = () => {
    const context = useContext(CounterContext);
    if (!context) return null;
    
    const { count, increment } = context;
    
    return (
      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>Context Child</Text>
        <Text>Count: {count}</Text>
        <Pressable style={styles.button} onPress={increment}>
          <Text style={styles.buttonText}>Increment</Text>
        </Pressable>
      </View>
    );
  };

  // Ejemplos de código por patrón
  const codeExamples = {
    'props-drilling': `// ❌ Props Drilling Problem
const App = () => {
  const [user, setUser] = useState(null);
  
  return (
    <Header user={user} />
    <Main user={user} />
    <Footer user={user} />
  );
};

const Main = ({ user }) => (
  <Content user={user} />
);

const Content = ({ user }) => (
  <Sidebar user={user} />
);

const Sidebar = ({ user }) => (
  <UserProfile user={user} /> // Finalmente usado aquí
);

// Problema: Props pasan por componentes que no las necesitan`,

    'state-lifting': `// ✅ State Lifting Solution
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  
  return (
    <div>
      <SearchInput 
        value={searchTerm} 
        onChange={setSearchTerm} 
      />
      <SearchResults 
        results={results} 
        searchTerm={searchTerm} 
      />
    </div>
  );
};

// Ambos componentes hermanos acceden al estado compartido
const SearchInput = ({ value, onChange }) => (
  <input value={value} onChange={(e) => onChange(e.target.value)} />
);

const SearchResults = ({ results, searchTerm }) => (
  <div>Results for: {searchTerm}</div>
);`,

    'context-pattern': `// ✅ Context Pattern
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const login = async (credentials) => {
    setLoading(true);
    try {
      const userData = await authService.login(credentials);
      setUser(userData);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <UserContext.Provider value={{ user, login, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Cualquier componente descendiente puede usar el context
const Profile = () => {
  const { user } = useContext(UserContext);
  return <div>{user?.name}</div>;
};

const LoginButton = () => {
  const { login, loading } = useContext(UserContext);
  return (
    <button onClick={() => login(credentials)} disabled={loading}>
      {loading ? 'Logging in...' : 'Login'}
    </button>
  );
};`,

    'compound-components': `// ✅ Compound Components
const Modal = ({ children, ...props }) => {
  return (
    <ModalContext.Provider value={props}>
      <div className="modal">
        {children}
      </div>
    </ModalContext.Provider>
  );
};

Modal.Header = ({ children }) => {
  const { onClose } = useContext(ModalContext);
  return (
    <div className="modal-header">
      {children}
      <button onClick={onClose}>×</button>
    </div>
  );
};

Modal.Body = ({ children }) => (
  <div className="modal-body">{children}</div>
);

Modal.Footer = ({ children }) => (
  <div className="modal-footer">{children}</div>
);

// Uso limpio y flexible
const App = () => (
  <Modal isOpen={true} onClose={handleClose}>
    <Modal.Header>
      <h2>Confirm Action</h2>
    </Modal.Header>
    <Modal.Body>
      <p>Are you sure?</p>
    </Modal.Body>
    <Modal.Footer>
      <button>Cancel</button>
      <button>Confirm</button>
    </Modal.Footer>
  </Modal>
);`
  };

  const currentCode = codeExamples[selectedPattern as keyof typeof codeExamples] || '';

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Flujos de Estado</Text>
          <Text style={styles.subtitle}>
            Comunicación entre componentes y manejo de estado local vs global
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>🔄 ¿Cuándo usar cada tipo de estado?</Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoBold}>Estado Local:</Text> Datos que solo usa un componente{'\n'}
            <Text style={styles.infoBold}>Estado Compartido:</Text> Datos que usan múltiples componentes{'\n'}
            <Text style={styles.infoBold}>Estado Global:</Text> Datos que usa toda la aplicación{'\n'}
            <Text style={styles.infoBold}>Estado del Servidor:</Text> Datos que vienen de APIs
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📡 Tipos de Comunicación</Text>
          
          {communicationTypes.map((comm, index) => (
            <View key={index} style={[styles.commCard, { borderLeftColor: comm.color }]}>
              <View style={styles.commHeader}>
                <Text style={styles.commType}>{comm.type}</Text>
                <Text style={[styles.commMethod, { color: comm.color }]}>{comm.method}</Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={styles.codeText}>{comm.example}</Text>
              </View>
              <Text style={styles.commWhen}>📌 {comm.when}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Patrones de Estado</Text>
          
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
                <Text style={styles.patternIcon}>{pattern.icon}</Text>
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
          <Text style={styles.sectionTitle}>💻 Código del Patrón Seleccionado</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{currentCode}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧪 Demos Interactivos</Text>
          
          {/* Props Drilling Demo */}
          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Props Drilling Example</Text>
            <View style={styles.exampleCard}>
              <Text style={styles.exampleTitle}>Abuelo (Grandparent)</Text>
              <Text>Count: {localCount}</Text>
              <PropsMiddleChild 
                count={localCount} 
                onIncrement={() => setLocalCount(c => c + 1)} 
              />
            </View>
          </View>

          {/* Context Demo */}
          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Context Example</Text>
            <ContextProvider>
              <View style={styles.exampleCard}>
                <Text style={styles.exampleTitle}>Context Parent</Text>
                <Text style={styles.exampleSubtext}>Proveedor de contexto</Text>
                <ContextChild />
              </View>
            </ContextProvider>
          </View>

          {/* State Input Demo */}
          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Controlled Input Example</Text>
            <View style={styles.exampleCard}>
              <Text style={styles.exampleTitle}>Input con Estado Controlado</Text>
              <TextInput
                style={styles.textInput}
                value={userInput}
                onChangeText={setUserInput}
                placeholder="Escribe algo..."
              />
              <Text style={styles.inputDisplay}>Valor: "{userInput}"</Text>
            </View>
          </View>
        </View>

        <View style={styles.decisionTreeSection}>
          <Text style={styles.decisionTitle}>🌳 Árbol de Decisión: ¿Qué usar?</Text>
          
          <View style={styles.decisionNode}>
            <Text style={styles.decisionQuestion}>¿Solo un componente usa el estado?</Text>
            <View style={styles.decisionBranch}>
              <View style={styles.decisionAnswer}>
                <Text style={styles.answerText}>SÍ</Text>
                <Text style={styles.answerRecommendation}>→ useState local</Text>
              </View>
              <View style={styles.decisionAnswer}>
                <Text style={styles.answerText}>NO</Text>
                <Text style={styles.answerRecommendation}>→ Continúa</Text>
              </View>
            </View>
          </View>

          <View style={styles.decisionNode}>
            <Text style={styles.decisionQuestion}>¿Los componentes son hermanos cercanos?</Text>
            <View style={styles.decisionBranch}>
              <View style={styles.decisionAnswer}>
                <Text style={styles.answerText}>SÍ</Text>
                <Text style={styles.answerRecommendation}>→ State lifting</Text>
              </View>
              <View style={styles.decisionAnswer}>
                <Text style={styles.answerText}>NO</Text>
                <Text style={styles.answerRecommendation}>→ Continúa</Text>
              </View>
            </View>
          </View>

          <View style={styles.decisionNode}>
            <Text style={styles.decisionQuestion}>¿Muchos componentes necesitan el estado?</Text>
            <View style={styles.decisionBranch}>
              <View style={styles.decisionAnswer}>
                <Text style={styles.answerText}>SÍ</Text>
                <Text style={styles.answerRecommendation}>→ Context/Store global</Text>
              </View>
              <View style={styles.decisionAnswer}>
                <Text style={styles.answerText}>NO</Text>
                <Text style={styles.answerRecommendation}>→ Props drilling</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bestPracticesSection}>
          <Text style={styles.bestPracticesTitle}>⚡ Optimización de Renders</Text>
          
          <View style={styles.practiceCard}>
            <Text style={styles.practiceTitle}>🎯 React.memo</Text>
            <Text style={styles.practiceText}>
              Evita re-renders innecesarios cuando props no cambian
            </Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>{`const ExpensiveComponent = React.memo(({ data }) => {
  return <ComplexVisualization data={data} />;
});`}</Text>
            </View>
          </View>

          <View style={styles.practiceCard}>
            <Text style={styles.practiceTitle}>🚀 useMemo & useCallback</Text>
            <Text style={styles.practiceText}>
              Memoriza valores computados y funciones
            </Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>{`const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

const handleClick = useCallback(() => {
  onItemClick(id);
}, [id, onItemClick]);`}</Text>
            </View>
          </View>

          <View style={styles.practiceCard}>
            <Text style={styles.practiceTitle}>🔄 Context Splitting</Text>
            <Text style={styles.practiceText}>
              Separa contexts que cambian frecuentemente
            </Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>{`// ❌ Un context grande
const AppContext = { user, theme, language, cart }

// ✅ Contexts específicos
const UserContext = { user, login, logout }
const ThemeContext = { theme, toggleTheme }
const CartContext = { items, addItem, removeItem }`}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🔄 El estado correcto en el lugar correcto = rendimiento óptimo
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
  commCard: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
  },
  commHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  commType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  commMethod: {
    fontSize: 12,
    fontWeight: '600',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  commWhen: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
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
  patternIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  patternTitle: {
    fontSize: 12,
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
    marginVertical: 8,
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
  exampleCard: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3',
    marginBottom: 8,
  },
  exampleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  exampleSubtext: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 8,
  },
  inputDisplay: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  decisionTreeSection: {
    backgroundColor: '#fff3e0',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  decisionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 16,
  },
  decisionNode: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  decisionQuestion: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 8,
  },
  decisionBranch: {
    flexDirection: 'row',
    gap: 12,
  },
  decisionAnswer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  answerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#F57C00',
  },
  answerRecommendation: {
    fontSize: 10,
    color: '#FF8F00',
    marginTop: 2,
  },
  bestPracticesSection: {
    backgroundColor: '#f3e5f5',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0',
  },
  bestPracticesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7B1FA2',
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
    color: '#7B1FA2',
    marginBottom: 4,
  },
  practiceText: {
    fontSize: 12,
    color: '#8E24AA',
    marginBottom: 8,
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

export default StateFlowsExample;
