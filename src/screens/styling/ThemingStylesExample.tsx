import React, { useState, createContext, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  Alert,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Definición de temas
const lightTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#4CAF50',
    background: '#FFFFFF',
    surface: '#F8F9FA',
    text: '#333333',
    textSecondary: '#666666',
    border: '#E0E0E0',
    error: '#F44336',
    warning: '#FF9800',
    success: '#4CAF50',
    info: '#2196F3',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    title: 24,
    heading: 28,
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

const darkTheme = {
  ...lightTheme,
  colors: {
    primary: '#0A84FF',
    secondary: '#66BB6A',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
    border: '#333333',
    error: '#EF5350',
    warning: '#FFA726',
    success: '#66BB6A',
    info: '#42A5F5',
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

// Context para el tema
const ThemeContext = createContext({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
});

// Hook personalizado para usar el tema
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Provider del tema
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');
  
  const theme = isDark ? darkTheme : lightTheme;
  
  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  
  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Componente de tarjeta temática
const ThemedCard: React.FC<{ 
  title: string; 
  description: string; 
  type?: 'default' | 'success' | 'warning' | 'error' | 'info';
}> = ({ title, description, type = 'default' }) => {
  const { theme } = useTheme();
  
  const getCardColor = () => {
    switch (type) {
      case 'success': return theme.colors.success;
      case 'warning': return theme.colors.warning;
      case 'error': return theme.colors.error;
      case 'info': return theme.colors.info;
      default: return theme.colors.primary;
    }
  };
  
  return (
    <View style={[
      {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        borderLeftWidth: 4,
        borderLeftColor: getCardColor(),
        ...theme.shadows.medium,
      }
    ]}>
      <Text style={[
        {
          fontSize: theme.fontSizes.lg,
          fontWeight: 'bold',
          color: theme.colors.text,
          marginBottom: theme.spacing.xs,
        }
      ]}>
        {title}
      </Text>
      <Text style={[
        {
          fontSize: theme.fontSizes.md,
          color: theme.colors.textSecondary,
          lineHeight: 20,
        }
      ]}>
        {description}
      </Text>
    </View>
  );
};

// Componente de botón temático
const ThemedButton: React.FC<{
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}> = ({ title, onPress, variant = 'primary', size = 'medium' }) => {
  const { theme } = useTheme();
  
  const getBackgroundColor = () => {
    switch (variant) {
      case 'secondary': return theme.colors.secondary;
      case 'outline': return 'transparent';
      default: return theme.colors.primary;
    }
  };
  
  const getTextColor = () => {
    switch (variant) {
      case 'outline': return theme.colors.primary;
      default: return '#FFFFFF';
    }
  };
  
  const getPadding = () => {
    switch (size) {
      case 'small': return { paddingVertical: theme.spacing.xs, paddingHorizontal: theme.spacing.sm };
      case 'large': return { paddingVertical: theme.spacing.md, paddingHorizontal: theme.spacing.lg };
      default: return { paddingVertical: theme.spacing.sm, paddingHorizontal: theme.spacing.md };
    }
  };
  
  return (
    <Pressable
      style={[
        {
          backgroundColor: getBackgroundColor(),
          borderRadius: theme.borderRadius.md,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: variant === 'outline' ? 2 : 0,
          borderColor: theme.colors.primary,
          ...getPadding(),
        }
      ]}
      onPress={onPress}
    >
      <Text style={[
        {
          color: getTextColor(),
          fontSize: theme.fontSizes.md,
          fontWeight: '600',
        }
      ]}>
        {title}
      </Text>
    </Pressable>
  );
};

const ThemingStylesExample: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<'basic' | 'context' | 'components' | 'system'>('basic');

  const renderExampleSelector = () => (
    <ThemeProvider>
      <ThemedExampleSelector 
        selectedExample={selectedExample}
        setSelectedExample={setSelectedExample}
      />
    </ThemeProvider>
  );

  const renderBasicExample = () => (
    <ThemeProvider>
      <BasicThemeExample />
    </ThemeProvider>
  );

  const renderContextExample = () => (
    <ThemeProvider>
      <ContextThemeExample />
    </ThemeProvider>
  );

  const renderComponentsExample = () => (
    <ThemeProvider>
      <ComponentsThemeExample />
    </ThemeProvider>
  );

  const renderSystemExample = () => (
    <ThemeProvider>
      <SystemThemeExample />
    </ThemeProvider>
  );

  const renderCurrentExample = () => {
    switch (selectedExample) {
      case 'basic':
        return renderBasicExample();
      case 'context':
        return renderContextExample();
      case 'components':
        return renderComponentsExample();
      case 'system':
        return renderSystemExample();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>🌙 Temas y Contextos</Text>
          <Text style={styles.subtitle}>
            Implementa dark mode y sistemas de temas dinámicos
          </Text>
        </View>

        {renderExampleSelector()}

        <View style={styles.content}>
          {renderCurrentExample()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ThemedExampleSelector: React.FC<{
  selectedExample: string;
  setSelectedExample: (example: any) => void;
}> = ({ selectedExample, setSelectedExample }) => {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.selectorContainer, { backgroundColor: theme.colors.surface }]}>
      <Pressable
        style={[
          styles.selectorButton,
          { backgroundColor: selectedExample === 'basic' ? theme.colors.primary : 'transparent' }
        ]}
        onPress={() => setSelectedExample('basic')}
      >
        <Text style={[
          styles.selectorText,
          { color: selectedExample === 'basic' ? '#fff' : theme.colors.text }
        ]}>
          🎨 Básico
        </Text>
      </Pressable>
      
      <Pressable
        style={[
          styles.selectorButton,
          { backgroundColor: selectedExample === 'context' ? theme.colors.primary : 'transparent' }
        ]}
        onPress={() => setSelectedExample('context')}
      >
        <Text style={[
          styles.selectorText,
          { color: selectedExample === 'context' ? '#fff' : theme.colors.text }
        ]}>
          🔗 Context
        </Text>
      </Pressable>
      
      <Pressable
        style={[
          styles.selectorButton,
          { backgroundColor: selectedExample === 'components' ? theme.colors.primary : 'transparent' }
        ]}
        onPress={() => setSelectedExample('components')}
      >
        <Text style={[
          styles.selectorText,
          { color: selectedExample === 'components' ? '#fff' : theme.colors.text }
        ]}>
          🧩 Componentes
        </Text>
      </Pressable>
      
      <Pressable
        style={[
          styles.selectorButton,
          { backgroundColor: selectedExample === 'system' ? theme.colors.primary : 'transparent' }
        ]}
        onPress={() => setSelectedExample('system')}
      >
        <Text style={[
          styles.selectorText,
          { color: selectedExample === 'system' ? '#fff' : theme.colors.text }
        ]}>
          📱 Sistema
        </Text>
      </Pressable>
    </View>
  );
};

const BasicThemeExample: React.FC = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  
  return (
    <View style={[styles.exampleSection, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.exampleTitle, { color: theme.colors.text }]}>
        🎨 Tema Básico
      </Text>
      <Text style={[styles.exampleDescription, { color: theme.colors.textSecondary }]}>
        Implementación básica de dark/light mode con switch manual.
      </Text>
      
      {/* Theme Toggle */}
      <View style={[styles.toggleContainer, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        <Text style={[styles.toggleLabel, { color: theme.colors.text }]}>
          🌙 Modo Oscuro
        </Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
          thumbColor={isDark ? '#ffffff' : '#f4f3f4'}
        />
      </View>

      {/* Theme Colors Preview */}
      <View style={styles.colorsContainer}>
        <Text style={[styles.colorsTitle, { color: theme.colors.text }]}>
          🎨 Paleta de Colores
        </Text>
        <View style={styles.colorsGrid}>
          {Object.entries(theme.colors).map(([key, color]) => (
            <View key={key} style={styles.colorItem}>
              <View style={[styles.colorSwatch, { backgroundColor: color }]} />
              <Text style={[styles.colorLabel, { color: theme.colors.textSecondary }]}>
                {key}
              </Text>
              <Text style={[styles.colorValue, { color: theme.colors.textSecondary }]}>
                {color}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Theme Demonstration */}
      <View style={styles.demoContainer}>
        <Text style={[styles.demoTitle, { color: theme.colors.text }]}>
          🎭 Demostración del Tema
        </Text>
        <View style={[styles.demoCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Text style={[styles.demoCardTitle, { color: theme.colors.text }]}>
            Tarjeta de Ejemplo
          </Text>
          <Text style={[styles.demoCardText, { color: theme.colors.textSecondary }]}>
            Esta tarjeta cambia automáticamente según el tema seleccionado.
          </Text>
          <View style={styles.demoButtons}>
            <Pressable style={[styles.demoButton, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.demoButtonText}>Primario</Text>
            </Pressable>
            <Pressable style={[styles.demoButton, { backgroundColor: theme.colors.secondary }]}>
              <Text style={styles.demoButtonText}>Secundario</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.codeSection}>
        <Text style={[styles.codeTitle, { color: theme.colors.text }]}>Código de ejemplo:</Text>
        <View style={[styles.codeBlock, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
          <Text style={[styles.codeText, { color: isDark ? '#a0aec0' : '#2d3748' }]}>{`const lightTheme = {
  colors: {
    primary: '#007AFF',
    background: '#FFFFFF',
    text: '#333333',
    surface: '#F8F9FA',
  },
};

const darkTheme = {
  colors: {
    primary: '#0A84FF',
    background: '#121212',
    text: '#FFFFFF',
    surface: '#1E1E1E',
  },
};

const [isDark, setIsDark] = useState(false);
const theme = isDark ? darkTheme : lightTheme;

<View style={{ backgroundColor: theme.colors.background }}>
  <Text style={{ color: theme.colors.text }}>
    Texto temático
  </Text>
</View>`}</Text>
        </View>
      </View>
    </View>
  );
};

const ContextThemeExample: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.exampleSection, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.exampleTitle, { color: theme.colors.text }]}>
        🔗 Context API para Temas
      </Text>
      <Text style={[styles.exampleDescription, { color: theme.colors.textSecondary }]}>
        Usa Context API para compartir el tema en toda la aplicación.
      </Text>

      <ThemedCard
        title="Tarjeta con Tema"
        description="Esta tarjeta usa el tema del contexto automáticamente."
      />

      <ThemedCard
        title="Tarjeta de Éxito"
        description="Variación con color de éxito del tema."
        type="success"
      />

      <ThemedCard
        title="Tarjeta de Advertencia"
        description="Variación con color de advertencia del tema."
        type="warning"
      />

      <ThemedCard
        title="Tarjeta de Error"
        description="Variación con color de error del tema."
        type="error"
      />

      <View style={styles.codeSection}>
        <Text style={[styles.codeTitle, { color: theme.colors.text }]}>Código de ejemplo:</Text>
        <View style={[styles.codeBlock, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.codeText, { color: theme.colors.textSecondary }]}>{`const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;
  
  return (
    <ThemeContext.Provider value={{ theme, isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// En cualquier componente
const MyComponent = () => {
  const { theme } = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>
        Texto temático
      </Text>
    </View>
  );
};`}</Text>
        </View>
      </View>
    </View>
  );
};

const ComponentsThemeExample: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.exampleSection, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.exampleTitle, { color: theme.colors.text }]}>
        🧩 Componentes Temáticos
      </Text>
      <Text style={[styles.exampleDescription, { color: theme.colors.textSecondary }]}>
        Crea componentes que se adaptan automáticamente al tema.
      </Text>

      <View style={styles.componentsDemo}>
        <Text style={[styles.componentsDemoTitle, { color: theme.colors.text }]}>
          🎯 Botones Temáticos
        </Text>
        <View style={styles.buttonsRow}>
          <ThemedButton
            title="Primario"
            onPress={() => Alert.alert('Botón', 'Botón primario presionado')}
            variant="primary"
          />
          <ThemedButton
            title="Secundario"
            onPress={() => Alert.alert('Botón', 'Botón secundario presionado')}
            variant="secondary"
          />
          <ThemedButton
            title="Outline"
            onPress={() => Alert.alert('Botón', 'Botón outline presionado')}
            variant="outline"
          />
        </View>

        <View style={styles.buttonsRow}>
          <ThemedButton
            title="Pequeño"
            onPress={() => {}}
            size="small"
          />
          <ThemedButton
            title="Mediano"
            onPress={() => {}}
            size="medium"
          />
          <ThemedButton
            title="Grande"
            onPress={() => {}}
            size="large"
          />
        </View>
      </View>

      <View style={styles.codeSection}>
        <Text style={[styles.codeTitle, { color: theme.colors.text }]}>Código de ejemplo:</Text>
        <View style={[styles.codeBlock, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.codeText, { color: theme.colors.textSecondary }]}>{`const ThemedButton = ({ title, variant = 'primary' }) => {
  const { theme } = useTheme();
  
  const getBackgroundColor = () => {
    switch (variant) {
      case 'secondary': return theme.colors.secondary;
      case 'outline': return 'transparent';
      default: return theme.colors.primary;
    }
  };
  
  const getTextColor = () => {
    switch (variant) {
      case 'outline': return theme.colors.primary;
      default: return '#FFFFFF';
    }
  };
  
  return (
    <Pressable style={{
      backgroundColor: getBackgroundColor(),
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      borderWidth: variant === 'outline' ? 2 : 0,
      borderColor: theme.colors.primary,
    }}>
      <Text style={{
        color: getTextColor(),
        fontSize: theme.fontSizes.md,
        fontWeight: '600',
      }}>
        {title}
      </Text>
    </Pressable>
  );
};`}</Text>
        </View>
      </View>
    </View>
  );
};

const SystemThemeExample: React.FC = () => {
  const { theme } = useTheme();
  const systemColorScheme = useColorScheme();
  
  return (
    <View style={[styles.exampleSection, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.exampleTitle, { color: theme.colors.text }]}>
        📱 Tema del Sistema
      </Text>
      <Text style={[styles.exampleDescription, { color: theme.colors.textSecondary }]}>
        Detecta y responde al tema del sistema operativo automáticamente.
      </Text>

      <View style={[styles.systemInfo, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        <Text style={[styles.systemInfoTitle, { color: theme.colors.text }]}>
          📱 Información del Sistema
        </Text>
        <Text style={[styles.systemInfoText, { color: theme.colors.textSecondary }]}>
          Tema del sistema: <Text style={{ fontWeight: 'bold' }}>
            {systemColorScheme || 'No detectado'}
          </Text>
        </Text>
        <Text style={[styles.systemInfoText, { color: theme.colors.textSecondary }]}>
          Tema actual: <Text style={{ fontWeight: 'bold' }}>
            {theme === darkTheme ? 'Oscuro' : 'Claro'}
          </Text>
        </Text>
      </View>

      <View style={styles.codeSection}>
        <Text style={[styles.codeTitle, { color: theme.colors.text }]}>Código de ejemplo:</Text>
        <View style={[styles.codeBlock, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.codeText, { color: theme.colors.textSecondary }]}>{`import { useColorScheme } from 'react-native';

const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [followSystem, setFollowSystem] = useState(true);
  const [manualTheme, setManualTheme] = useState('light');
  
  const isDark = followSystem 
    ? systemColorScheme === 'dark'
    : manualTheme === 'dark';
    
  const theme = isDark ? darkTheme : lightTheme;
  
  // Escuchar cambios del sistema automáticamente
  useEffect(() => {
    if (followSystem) {
      // El tema se actualiza automáticamente
      // cuando el usuario cambia el tema del sistema
    }
  }, [systemColorScheme, followSystem]);
  
  return (
    <ThemeContext.Provider value={{ 
      theme, 
      isDark, 
      followSystem,
      setFollowSystem,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};`}</Text>
        </View>
      </View>
    </View>
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
    margin: 10,
    borderRadius: 12,
    padding: 6,
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
  selectorText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    margin: 10,
  },
  exampleSection: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  exampleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  exampleDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 20,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  colorsContainer: {
    marginBottom: 20,
  },
  colorsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  colorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorItem: {
    alignItems: 'center',
    minWidth: '30%',
    marginBottom: 12,
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  colorLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  colorValue: {
    fontSize: 10,
    fontFamily: 'Courier',
  },
  demoContainer: {
    marginBottom: 20,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  demoCard: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  demoCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  demoCardText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  demoButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  demoButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  demoButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  componentsDemo: {
    marginBottom: 20,
  },
  componentsDemoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  systemInfo: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 20,
  },
  systemInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  systemInfoText: {
    fontSize: 14,
    marginBottom: 6,
  },
  codeSection: {
    marginTop: 20,
  },
  codeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  codeBlock: {
    padding: 16,
    borderRadius: 8,
  },
  codeText: {
    fontFamily: 'Courier',
    fontSize: 11,
    lineHeight: 16,
  },
});

export default ThemingStylesExample;

