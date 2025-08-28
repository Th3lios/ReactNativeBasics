import React, { useState, createContext, useContext, useReducer, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const StatePatternsExample: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<string>('lift-state-up');

  const patterns = [
    {
      id: 'lift-state-up',
      title: 'Lift State Up',
      description: 'Mover estado al componente padre común',
      color: '#4CAF50'
    },
    {
      id: 'prop-drilling',
      title: 'Props Drilling Solutions',
      description: 'Soluciones al problema de props drilling',
      color: '#F44336'
    },
    {
      id: 'context-patterns',
      title: 'Context Patterns',
      description: 'Patrones avanzados con React Context',
      color: '#2196F3'
    },
    {
      id: 'state-colocation',
      title: 'State Colocation',
      description: 'Estado cerca de donde se usa',
      color: '#FF9800'
    }
  ];

  // ====== LIFT STATE UP PATTERN ======
  const LiftStateUpDemo: React.FC = () => {
    // Estado compartido entre hermanos
    const [temperature, setTemperature] = useState('');
    const [scale, setScale] = useState<'celsius' | 'fahrenheit'>('celsius');

    const handleCelsiusChange = (value: string) => {
      setTemperature(value);
      setScale('celsius');
    };

    const handleFahrenheitChange = (value: string) => {
      setTemperature(value);
      setScale('fahrenheit');
    };

    // Funciones de conversión
    const toCelsius = (fahrenheit: number) => (fahrenheit - 32) * 5 / 9;
    const toFahrenheit = (celsius: number) => (celsius * 9 / 5) + 32;

    const tryConvert = (temperature: string, convert: (temp: number) => number) => {
      const input = parseFloat(temperature);
      if (Number.isNaN(input)) {
        return '';
      }
      const output = convert(input);
      return Math.round(output * 1000) / 1000;
    };

    const celsius = scale === 'fahrenheit' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'celsius' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <View style={styles.demoCard}>
        <Text style={styles.demoTitle}>Temperature Calculator</Text>
        
        <TemperatureInput
          scale="celsius"
          temperature={celsius}
          onTemperatureChange={handleCelsiusChange}
        />
        
        <TemperatureInput
          scale="fahrenheit"
          temperature={fahrenheit}
          onTemperatureChange={handleFahrenheitChange}
        />
        
        <BoilingVerdict celsius={parseFloat(celsius) || 0} />
        
        <Text style={styles.demoNote}>
          ✅ Estado compartido en el padre común{'\n'}
          ✅ Ambos inputs sincronizados automáticamente
        </Text>
      </View>
    );
  };

  const TemperatureInput: React.FC<{
    scale: 'celsius' | 'fahrenheit';
    temperature: string | number;
    onTemperatureChange: (value: string) => void;
  }> = ({ scale, temperature, onTemperatureChange }) => {
    const scaleNames = {
      celsius: 'Celsius',
      fahrenheit: 'Fahrenheit'
    };

    return (
      <View style={styles.temperatureInput}>
        <Text style={styles.temperatureLabel}>
          Temperatura en {scaleNames[scale]}:
        </Text>
        <TextInput
          style={styles.temperatureField}
          value={temperature.toString()}
          onChangeText={onTemperatureChange}
          placeholder="Ingresa temperatura"
          keyboardType="numeric"
        />
      </View>
    );
  };

  const BoilingVerdict: React.FC<{ celsius: number }> = ({ celsius }) => {
    if (celsius >= 100) {
      return <Text style={styles.boiling}>El agua está hirviendo 🔥</Text>;
    }
    return <Text style={styles.notBoiling}>El agua no está hirviendo ❄️</Text>;
  };

  // ====== PROPS DRILLING SOLUTIONS ======
  // Problema: Props drilling
  const BadUserDashboard: React.FC = () => {
    const [user] = useState({ name: 'Ana García', role: 'admin', avatar: '👩‍💼' });
    const [notifications] = useState(3);

    return (
      <View style={styles.demoCard}>
        <Text style={styles.demoTitle}>❌ Props Drilling Problem</Text>
        <BadHeader user={user} notifications={notifications} />
        <BadContent user={user} />
        <Text style={styles.demoNote}>
          Props pasan por componentes que no las necesitan
        </Text>
      </View>
    );
  };

  const BadHeader: React.FC<{ user: any; notifications: number }> = ({ user, notifications }) => (
    <View style={styles.header}>
      <BadNavigation user={user} />
      <BadNotificationBell notifications={notifications} />
    </View>
  );

  const BadNavigation: React.FC<{ user: any }> = ({ user }) => (
    <View style={styles.navigation}>
      <BadUserProfile user={user} />
    </View>
  );

  const BadUserProfile: React.FC<{ user: any }> = ({ user }) => (
    <Text style={styles.userProfile}>{user.avatar} {user.name}</Text>
  );

  const BadNotificationBell: React.FC<{ notifications: number }> = ({ notifications }) => (
    <Text style={styles.notifications}>🔔 {notifications}</Text>
  );

  const BadContent: React.FC<{ user: any }> = ({ user }) => (
    <View style={styles.content}>
      <BadWelcomeMessage user={user} />
    </View>
  );

  const BadWelcomeMessage: React.FC<{ user: any }> = ({ user }) => (
    <Text style={styles.welcome}>Bienvenido, {user.name} ({user.role})</Text>
  );

  // Solución: Context Pattern
  const UserContext = createContext<{
    user: { name: string; role: string; avatar: string };
    notifications: number;
  } | null>(null);

  const GoodUserDashboard: React.FC = () => {
    const [user] = useState({ name: 'Ana García', role: 'admin', avatar: '👩‍💼' });
    const [notifications] = useState(3);

    return (
      <UserContext.Provider value={{ user, notifications }}>
        <View style={styles.demoCard}>
          <Text style={styles.demoTitle}>✅ Context Solution</Text>
          <GoodHeader />
          <GoodContent />
          <Text style={styles.demoNote}>
            Sin props drilling - componentes acceden directamente al contexto
          </Text>
        </View>
      </UserContext.Provider>
    );
  };

  const GoodHeader: React.FC = () => (
    <View style={styles.header}>
      <GoodNavigation />
      <GoodNotificationBell />
    </View>
  );

  const GoodNavigation: React.FC = () => (
    <View style={styles.navigation}>
      <GoodUserProfile />
    </View>
  );

  const GoodUserProfile: React.FC = () => {
    const context = useContext(UserContext);
    const user = context?.user;
    
    return (
      <Text style={styles.userProfile}>{user?.avatar} {user?.name}</Text>
    );
  };

  const GoodNotificationBell: React.FC = () => {
    const context = useContext(UserContext);
    const notifications = context?.notifications;
    
    return (
      <Text style={styles.notifications}>🔔 {notifications}</Text>
    );
  };

  const GoodContent: React.FC = () => (
    <View style={styles.content}>
      <GoodWelcomeMessage />
    </View>
  );

  const GoodWelcomeMessage: React.FC = () => {
    const context = useContext(UserContext);
    const user = context?.user;
    
    return (
      <Text style={styles.welcome}>Bienvenido, {user?.name} ({user?.role})</Text>
    );
  };

  // ====== CONTEXT PATTERNS ======
  // Pattern 1: Provider Pattern con múltiples valores
  interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    colors: {
      primary: string;
      background: string;
      text: string;
    };
  }

  const ThemeContext = createContext<ThemeContextType | null>(null);

  const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const toggleTheme = () => {
      setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const colors = {
      light: {
        primary: '#2196F3',
        background: '#ffffff',
        text: '#333333'
      },
      dark: {
        primary: '#90CAF9',
        background: '#121212',
        text: '#ffffff'
      }
    };

    const value: ThemeContextType = {
      theme,
      toggleTheme,
      colors: colors[theme]
    };

    return (
      <ThemeContext.Provider value={value}>
        {children}
      </ThemeContext.Provider>
    );
  };

  // Custom hook para usar el contexto
  const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
  };

  const ThemedComponent: React.FC = () => {
    const { theme, toggleTheme, colors } = useTheme();

    return (
      <View style={[styles.themedContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.themedText, { color: colors.text }]}>
          Tema actual: {theme}
        </Text>
        <Pressable
          style={[styles.themeButton, { backgroundColor: colors.primary }]}
          onPress={toggleTheme}
        >
          <Text style={styles.themeButtonText}>
            Cambiar a {theme === 'light' ? 'Dark' : 'Light'}
          </Text>
        </Pressable>
      </View>
    );
  };

  // Pattern 2: Compound Context con useReducer
  interface CartState {
    items: Array<{ id: number; name: string; price: number; quantity: number }>;
    total: number;
  }

  type CartAction = 
    | { type: 'ADD_ITEM'; payload: { id: number; name: string; price: number } }
    | { type: 'REMOVE_ITEM'; payload: { id: number } }
    | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
    | { type: 'CLEAR_CART' };

  const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
      case 'ADD_ITEM': {
        const existingItem = state.items.find(item => item.id === action.payload.id);
        
        if (existingItem) {
          const updatedItems = state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          
          return {
            ...state,
            items: updatedItems,
            total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          };
        }

        const newItems = [...state.items, { ...action.payload, quantity: 1 }];
        return {
          ...state,
          items: newItems,
          total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };
      }

      case 'REMOVE_ITEM': {
        const filteredItems = state.items.filter(item => item.id !== action.payload.id);
        return {
          ...state,
          items: filteredItems,
          total: filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };
      }

      case 'UPDATE_QUANTITY': {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0);

        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };
      }

      case 'CLEAR_CART':
        return { items: [], total: 0 };

      default:
        return state;
    }
  };

  const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
  } | null>(null);

  const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

    return (
      <CartContext.Provider value={{ state, dispatch }}>
        {children}
      </CartContext.Provider>
    );
  };

  const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error('useCart must be used within CartProvider');
    }
    return context;
  };

  const CartDemo: React.FC = () => {
    const { state, dispatch } = useCart();

    const addItem = (item: { id: number; name: string; price: number }) => {
      dispatch({ type: 'ADD_ITEM', payload: item });
    };

    const products = [
      { id: 1, name: 'Laptop', price: 999 },
      { id: 2, name: 'Mouse', price: 29 },
      { id: 3, name: 'Keyboard', price: 79 }
    ];

    return (
      <View style={styles.cartDemo}>
        <Text style={styles.cartTitle}>Shopping Cart Demo</Text>
        
        <View style={styles.products}>
          <Text style={styles.productsTitle}>Productos:</Text>
          {products.map(product => (
            <View key={product.id} style={styles.productItem}>
              <Text style={styles.productName}>{product.name} - ${product.price}</Text>
              <Pressable
                style={styles.addButton}
                onPress={() => addItem(product)}
              >
                <Text style={styles.addButtonText}>Agregar</Text>
              </Pressable>
            </View>
          ))}
        </View>

        <View style={styles.cart}>
          <Text style={styles.cartSectionTitle}>Carrito: ({state.items.length} items)</Text>
          {state.items.map(item => (
            <View key={item.id} style={styles.cartItem}>
              <Text style={styles.cartItemText}>
                {item.name} x{item.quantity} = ${item.price * item.quantity}
              </Text>
              <Pressable
                style={styles.removeButton}
                onPress={() => dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } })}
              >
                <Text style={styles.removeButtonText}>✕</Text>
              </Pressable>
            </View>
          ))}
          <Text style={styles.total}>Total: ${state.total}</Text>
          {state.items.length > 0 && (
            <Pressable
              style={styles.clearButton}
              onPress={() => dispatch({ type: 'CLEAR_CART' })}
            >
              <Text style={styles.clearButtonText}>Limpiar Carrito</Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  };

  // ====== STATE COLOCATION PATTERN ======
  const StateColocationDemo: React.FC = () => {
    return (
      <View style={styles.demoCard}>
        <Text style={styles.demoTitle}>State Colocation</Text>
        <ToggleSection />
        <CounterSection />
        <FormSection />
        <Text style={styles.demoNote}>
          ✅ Cada sección maneja su propio estado{'\n'}
          ✅ No hay estado innecesario en el componente padre
        </Text>
      </View>
    );
  };

  const ToggleSection: React.FC = () => {
    const [isOn, setIsOn] = useState(false);

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Toggle Section</Text>
        <Pressable
          style={[styles.toggle, isOn && styles.toggleOn]}
          onPress={() => setIsOn(!isOn)}
        >
          <Text style={styles.toggleText}>
            {isOn ? 'ON' : 'OFF'}
          </Text>
        </Pressable>
      </View>
    );
  };

  const CounterSection: React.FC = () => {
    const [count, setCount] = useState(0);

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Counter Section</Text>
        <View style={styles.counterControls}>
          <Pressable
            style={styles.counterButton}
            onPress={() => setCount(c => c - 1)}
          >
            <Text style={styles.counterButtonText}>-</Text>
          </Pressable>
          <Text style={styles.counterValue}>{count}</Text>
          <Pressable
            style={styles.counterButton}
            onPress={() => setCount(c => c + 1)}
          >
            <Text style={styles.counterButtonText}>+</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const FormSection: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
      Alert.alert('Form Submitted', `Name: ${name}\nEmail: ${email}`);
      setName('');
      setEmail('');
    };

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Form Section</Text>
        <TextInput
          style={styles.formInput}
          value={name}
          onChangeText={setName}
          placeholder="Nombre"
        />
        <TextInput
          style={styles.formInput}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </Pressable>
      </View>
    );
  };

  const codeExamples = {
    'lift-state-up': `// Lift State Up Pattern
const TemperatureCalculator = () => {
  // Estado compartido entre componentes hermanos
  const [temperature, setTemperature] = useState('');
  const [scale, setScale] = useState('celsius');

  const handleCelsiusChange = (value) => {
    setTemperature(value);
    setScale('celsius');
  };

  const handleFahrenheitChange = (value) => {
    setTemperature(value);
    setScale('fahrenheit');
  };

  // Computaciones derivadas
  const celsius = scale === 'fahrenheit' 
    ? tryConvert(temperature, toCelsius) 
    : temperature;
  
  const fahrenheit = scale === 'celsius' 
    ? tryConvert(temperature, toFahrenheit) 
    : temperature;

  return (
    <View>
      <TemperatureInput
        scale="celsius"
        temperature={celsius}
        onTemperatureChange={handleCelsiusChange}
      />
      <TemperatureInput
        scale="fahrenheit"
        temperature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange}
      />
      <BoilingVerdict celsius={parseFloat(celsius)} />
    </View>
  );
};

const TemperatureInput = ({ scale, temperature, onTemperatureChange }) => (
  <View>
    <Text>Temperatura en {scale}:</Text>
    <TextInput
      value={temperature}
      onChangeText={onTemperatureChange}
      keyboardType="numeric"
    />
  </View>
);

// Cuándo usar:
// ✅ Hermanos necesitan compartir estado
// ✅ Estado debe estar sincronizado
// ✅ Computaciones derivadas del estado compartido
// ❌ Estado muy específico de un componente`,

    'prop-drilling': `// Props Drilling Problem & Solutions

// ❌ Props Drilling Problem
const App = () => {
  const [user, setUser] = useState({ name: 'Ana', role: 'admin' });
  
  return <Dashboard user={user} />;
};

const Dashboard = ({ user }) => (
  <div>
    <Header user={user} />
    <Content user={user} />
  </div>
);

const Header = ({ user }) => (
  <nav>
    <UserProfile user={user} /> {/* Solo pasa props */}
  </nav>
);

const UserProfile = ({ user }) => (
  <span>{user.name} ({user.role})</span> /* Finalmente usa props */
);

// ✅ Solution 1: Context Pattern
const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState({ name: 'Ana', role: 'admin' });
  
  return (
    <UserContext.Provider value={user}>
      <Dashboard />
    </UserContext.Provider>
  );
};

const Dashboard = () => (
  <div>
    <Header />
    <Content />
  </div>
);

const Header = () => (
  <nav>
    <UserProfile />
  </nav>
);

const UserProfile = () => {
  const user = useContext(UserContext);
  return <span>{user.name} ({user.role})</span>;
};

// ✅ Solution 2: Composition Pattern
const App = () => {
  const [user, setUser] = useState({ name: 'Ana', role: 'admin' });
  
  return (
    <Dashboard>
      <Header>
        <UserProfile user={user} />
      </Header>
      <Content user={user} />
    </Dashboard>
  );
};

// ✅ Solution 3: Custom Hooks
const useUser = () => {
  const [user, setUser] = useState({ name: 'Ana', role: 'admin' });
  return { user, setUser };
};

const UserProfile = () => {
  const { user } = useUser(); // Hook compartido
  return <span>{user.name} ({user.role})</span>;
};`,

    'context-patterns': `// Advanced Context Patterns

// Pattern 1: Provider Pattern con Custom Hook
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const colors = {
    light: { bg: '#fff', text: '#000' },
    dark: { bg: '#000', text: '#fff' }
  };

  const value = {
    theme,
    toggleTheme,
    colors: colors[theme]
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook con validación
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Pattern 2: Context + useReducer para estado complejo
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price
      };
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        items: filteredItems,
        total: filteredItems.reduce((sum, item) => sum + item.price, 0)
      };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Pattern 3: Context Composition
const AppProviders = ({ children }) => (
  <ThemeProvider>
    <AuthProvider>
      <CartProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </CartProvider>
    </AuthProvider>
  </ThemeProvider>
);

// Pattern 4: Conditional Context
const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const { user } = useAuth();
  
  if (user?.role !== 'admin') {
    return children; // No provider para no-admins
  }

  const [adminData, setAdminData] = useState(null);
  
  return (
    <AdminContext.Provider value={{ adminData, setAdminData }}>
      {children}
    </AdminContext.Provider>
  );
};`,

    'state-colocation': `// State Colocation Pattern

// ❌ Estado demasiado alto
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [toggles, setToggles] = useState({ theme: false, notifications: false });

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Counter count={count} setCount={setCount} />
      <Form formData={formData} setFormData={setFormData} />
      <TogglePanel toggles={toggles} setToggles={setToggles} />
    </div>
  );
};

// ✅ Estado colocado donde se usa
const App = () => (
  <div>
    <ModalSection />
    <CounterSection />
    <FormSection />
    <ToggleSection />
  </div>
);

const ModalSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

const CounterSection = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(c => c - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
};

const FormSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  
  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
        placeholder="Name"
      />
      <input
        value={formData.email}
        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

// Principios:
// ✅ Estado cerca de donde se usa
// ✅ Evitar estado innecesario en padres
// ✅ Cada componente maneja su propia responsabilidad
// ✅ Más fácil de mantener y testear`
  };

  const currentCode = codeExamples[selectedPattern as keyof typeof codeExamples] || '';

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Patrones de Estado</Text>
          <Text style={styles.subtitle}>
            State lifting, prop drilling, context patterns y state colocation
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>🔄 Gestión de Estado en React</Text>
          <Text style={styles.infoText}>
            Estos patrones te ayudan a manejar estado de forma eficiente:{'\n\n'}
            ⬆️ <Text style={styles.infoBold}>Lift State Up:</Text> Compartir estado entre hermanos{'\n'}
            🕳️ <Text style={styles.infoBold}>Props Drilling:</Text> Soluciones al problema{'\n'}
            🌐 <Text style={styles.infoBold}>Context:</Text> Estado global sin drilling{'\n'}
            📍 <Text style={styles.infoBold}>Colocation:</Text> Estado cerca de donde se usa
          </Text>
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
          
          {selectedPattern === 'lift-state-up' && <LiftStateUpDemo />}
          
          {selectedPattern === 'prop-drilling' && (
            <View style={styles.demoContainer}>
              <BadUserDashboard />
              <View style={styles.separator} />
              <GoodUserDashboard />
            </View>
          )}

          {selectedPattern === 'context-patterns' && (
            <View style={styles.demoContainer}>
              <ThemeProvider>
                <View style={styles.demoCard}>
                  <Text style={styles.demoTitle}>Theme Context Demo</Text>
                  <ThemedComponent />
                </View>
              </ThemeProvider>
              
              <CartProvider>
                <CartDemo />
              </CartProvider>
            </View>
          )}

          {selectedPattern === 'state-colocation' && <StateColocationDemo />}
        </View>

        <View style={styles.decisionSection}>
          <Text style={styles.decisionTitle}>🌳 Árbol de Decisión de Estado</Text>
          
          <View style={styles.decisionFlow}>
            <View style={styles.decisionNode}>
              <Text style={styles.decisionQuestion}>¿Qué tipo de estado necesitas?</Text>
            </View>
            
            <View style={styles.decisionBranches}>
              <View style={styles.decisionBranch}>
                <Text style={styles.branchTitle}>Estado Local</Text>
                <Text style={styles.branchDesc}>Solo un componente lo usa</Text>
                <Text style={styles.branchSolution}>→ useState en el componente</Text>
              </View>
              
              <View style={styles.decisionBranch}>
                <Text style={styles.branchTitle}>Estado Compartido</Text>
                <Text style={styles.branchDesc}>Hermanos necesitan el estado</Text>
                <Text style={styles.branchSolution}>→ Lift state up</Text>
              </View>
              
              <View style={styles.decisionBranch}>
                <Text style={styles.branchTitle}>Estado Global</Text>
                <Text style={styles.branchDesc}>Muchos componentes lo usan</Text>
                <Text style={styles.branchSolution}>→ Context o Store global</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🔄 Coloca el estado lo más cerca posible de donde se usa
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
    backgroundColor: '#fff3e0',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#F57C00',
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
    minWidth: 120,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
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
  },
  codeText: {
    color: '#a0aec0',
    fontFamily: 'Courier',
    fontSize: 9,
    lineHeight: 12,
  },
  demoContainer: {
    gap: 16,
  },
  demoCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  demoNote: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 12,
    lineHeight: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  // Temperature Demo
  temperatureInput: {
    marginBottom: 12,
  },
  temperatureLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  temperatureField: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  boiling: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F44336',
    textAlign: 'center',
    marginTop: 12,
  },
  notBoiling: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
    marginTop: 12,
  },
  // Props Drilling Demo
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  navigation: {
    flex: 1,
  },
  userProfile: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976D2',
  },
  notifications: {
    fontSize: 14,
    color: '#1976D2',
  },
  content: {
    backgroundColor: '#f3e5f5',
    padding: 12,
    borderRadius: 6,
  },
  welcome: {
    fontSize: 14,
    color: '#7B1FA2',
    textAlign: 'center',
  },
  // Theme Demo
  themedContainer: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  themedText: {
    fontSize: 16,
    marginBottom: 12,
  },
  themeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  themeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  // Cart Demo
  cartDemo: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3',
  },
  cartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  products: {
    marginBottom: 16,
  },
  productsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  productName: {
    fontSize: 13,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  cart: {
    backgroundColor: '#e8f5e8',
    padding: 12,
    borderRadius: 6,
  },
  cartSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 8,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  cartItemText: {
    fontSize: 12,
    color: '#666',
  },
  removeButton: {
    backgroundColor: '#F44336',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  total: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginVertical: 8,
  },
  clearButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  // State Colocation Demo
  section: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#4CAF50',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  toggle: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  toggleOn: {
    backgroundColor: '#4CAF50',
  },
  toggleText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  counterButton: {
    backgroundColor: '#2196F3',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  counterValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 40,
    textAlign: 'center',
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  // Decision Tree
  decisionSection: {
    backgroundColor: '#e8f4fd',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  decisionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 16,
  },
  decisionFlow: {
    alignItems: 'center',
  },
  decisionNode: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  decisionQuestion: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976D2',
    textAlign: 'center',
  },
  decisionBranches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  decisionBranch: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  branchTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 4,
  },
  branchDesc: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    marginBottom: 6,
  },
  branchSolution: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: '600',
    textAlign: 'center',
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

export default StatePatternsExample;
