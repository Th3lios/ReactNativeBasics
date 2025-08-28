import React, { useState, useEffect, ComponentType } from 'react';
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

const HOCPatternsExample: React.FC = () => {
  const [selectedHOC, setSelectedHOC] = useState<string>('withLoading');

  const hocTypes = [
    {
      id: 'withLoading',
      title: 'withLoading',
      description: 'HOC para mostrar estado de carga',
      color: '#4CAF50'
    },
    {
      id: 'withAuth',
      title: 'withAuth',
      description: 'HOC para protección de rutas',
      color: '#F44336'
    },
    {
      id: 'withErrorBoundary',
      title: 'withErrorBoundary',
      description: 'HOC para manejo de errores',
      color: '#FF9800'
    },
    {
      id: 'withLogger',
      title: 'withLogger',
      description: 'HOC para logging de props',
      color: '#2196F3'
    }
  ];

  // ====== WITH LOADING HOC ======
  interface WithLoadingProps {
    isLoading?: boolean;
    loadingText?: string;
  }

  const withLoading = <P extends object>(
    WrappedComponent: ComponentType<P>
  ): ComponentType<P & WithLoadingProps> => {
    const WithLoadingComponent = (props: P & WithLoadingProps) => {
      const { isLoading = false, loadingText = 'Cargando...', ...restProps } = props;

      if (isLoading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>{loadingText}</Text>
          </View>
        );
      }

      return <WrappedComponent {...(restProps as P)} />;
    };

    WithLoadingComponent.displayName = `withLoading(${WrappedComponent.displayName || WrappedComponent.name})`;
    return WithLoadingComponent;
  };

  // ====== WITH AUTH HOC ======
  interface WithAuthProps {
    user?: { id: string; name: string } | null;
    fallback?: React.ReactNode;
  }

  const withAuth = <P extends object>(
    WrappedComponent: ComponentType<P>
  ): ComponentType<P & WithAuthProps> => {
    const WithAuthComponent = (props: P & WithAuthProps) => {
      const { user, fallback, ...restProps } = props;

      if (!user) {
        return (
          <View style={styles.authContainer}>
            {fallback || (
              <View style={styles.unauthorizedContainer}>
                <Text style={styles.unauthorizedIcon}>🔒</Text>
                <Text style={styles.unauthorizedTitle}>Acceso Restringido</Text>
                <Text style={styles.unauthorizedText}>
                  Debes iniciar sesión para ver este contenido
                </Text>
                <Pressable 
                  style={styles.loginButton}
                  onPress={() => Alert.alert('Login', 'Aquí irías a la pantalla de login')}
                >
                  <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                </Pressable>
              </View>
            )}
          </View>
        );
      }

      return <WrappedComponent {...(restProps as P)} user={user} />;
    };

    WithAuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;
    return WithAuthComponent;
  };

  // ====== WITH ERROR BOUNDARY HOC ======
  interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
  }

  const withErrorBoundary = <P extends object>(
    WrappedComponent: ComponentType<P>,
    fallback?: ComponentType<{ error: Error; retry: () => void }>
  ): ComponentType<P> => {
    class WithErrorBoundaryComponent extends React.Component<P, ErrorBoundaryState> {
      constructor(props: P) {
        super(props);
        this.state = { hasError: false };
      }

      static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
      }

      componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by HOC:', error, errorInfo);
      }

      retry = () => {
        this.setState({ hasError: false, error: undefined });
      };

      render() {
        if (this.state.hasError) {
          if (fallback) {
            const FallbackComponent = fallback;
            return <FallbackComponent error={this.state.error!} retry={this.retry} />;
          }

          return (
            <View style={styles.errorContainer}>
              <Text style={styles.errorIcon}>💥</Text>
              <Text style={styles.errorTitle}>¡Oops! Algo salió mal</Text>
              <Text style={styles.errorMessage}>
                {this.state.error?.message || 'Error inesperado'}
              </Text>
              <Pressable style={styles.retryButton} onPress={this.retry}>
                <Text style={styles.retryButtonText}>Intentar de nuevo</Text>
              </Pressable>
            </View>
          );
        }

        return <WrappedComponent {...this.props} />;
      }
    }

    WithErrorBoundaryComponent.displayName = `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;
    return WithErrorBoundaryComponent;
  };

  // ====== WITH LOGGER HOC ======
  const withLogger = <P extends object>(
    WrappedComponent: ComponentType<P>,
    logLevel: 'info' | 'debug' | 'warn' = 'info'
  ): ComponentType<P> => {
    const WithLoggerComponent = (props: P) => {
      const componentName = WrappedComponent.displayName || WrappedComponent.name;

      useEffect(() => {
        console.log(`[${logLevel.toUpperCase()}] ${componentName} mounted with props:`, props);
        
        return () => {
          console.log(`[${logLevel.toUpperCase()}] ${componentName} unmounted`);
        };
      }, []);

      useEffect(() => {
        console.log(`[${logLevel.toUpperCase()}] ${componentName} props updated:`, props);
      });

      return <WrappedComponent {...props} />;
    };

    WithLoggerComponent.displayName = `withLogger(${WrappedComponent.displayName || WrappedComponent.name})`;
    return WithLoggerComponent;
  };

  // ====== DEMO COMPONENTS ======
  const UserProfile: React.FC<{ user: { id: string; name: string } }> = ({ user }) => (
    <View style={styles.profileContainer}>
      <Text style={styles.profileTitle}>Perfil de Usuario</Text>
      <Text style={styles.profileName}>👤 {user.name}</Text>
      <Text style={styles.profileId}>ID: {user.id}</Text>
      <Text style={styles.profileNote}>
        Este componente solo se muestra si el usuario está autenticado
      </Text>
    </View>
  );

  const DataList: React.FC = () => (
    <View style={styles.dataContainer}>
      <Text style={styles.dataTitle}>Lista de Datos</Text>
      {[1, 2, 3, 4, 5].map(item => (
        <Text key={item} style={styles.dataItem}>📄 Elemento {item}</Text>
      ))}
      <Text style={styles.dataNote}>
        Este componente muestra loading automáticamente
      </Text>
    </View>
  );

  const ProblematicComponent: React.FC<{ shouldError: boolean }> = ({ shouldError }) => {
    if (shouldError) {
      throw new Error('Error simulado para demostrar Error Boundary');
    }

    return (
      <View style={styles.problematicContainer}>
        <Text style={styles.problematicTitle}>Componente Funcional</Text>
        <Text style={styles.problematicText}>
          Todo funciona correctamente. El Error Boundary está monitoreando.
        </Text>
      </View>
    );
  };

  const LoggedComponent: React.FC<{ message: string }> = ({ message }) => (
    <View style={styles.loggedContainer}>
      <Text style={styles.loggedTitle}>Componente con Logging</Text>
      <Text style={styles.loggedMessage}>Mensaje: {message}</Text>
      <Text style={styles.loggedNote}>
        Revisa la consola para ver los logs automáticos
      </Text>
    </View>
  );

  // Enhanced components with HOCs
  const EnhancedUserProfile = withAuth(UserProfile);
  const EnhancedDataList = withLoading(DataList);
  const EnhancedProblematicComponent = withErrorBoundary(ProblematicComponent);
  const EnhancedLoggedComponent = withLogger(LoggedComponent, 'debug');

  // Demo state
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const [shouldError, setShouldError] = useState(false);
  const [logMessage, setLogMessage] = useState('Mensaje inicial');

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const toggleUser = () => {
    setUser(user ? null : { id: '1', name: 'Ana García' });
  };

  const codeExamples = {
    'withLoading': `// withLoading HOC
interface WithLoadingProps {
  isLoading?: boolean;
  loadingText?: string;
}

const withLoading = <P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P & WithLoadingProps> => {
  const WithLoadingComponent = (props: P & WithLoadingProps) => {
    const { isLoading = false, loadingText = 'Cargando...', ...restProps } = props;

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text>{loadingText}</Text>
        </View>
      );
    }

    return <WrappedComponent {...(restProps as P)} />;
  };

  WithLoadingComponent.displayName = \`withLoading(\${WrappedComponent.displayName || WrappedComponent.name})\`;
  return WithLoadingComponent;
};

// Uso
const MyComponent = ({ data }) => (
  <View>
    <Text>Datos: {data.length} elementos</Text>
  </View>
);

const EnhancedComponent = withLoading(MyComponent);

// En uso
<EnhancedComponent 
  data={myData} 
  isLoading={fetchingData}
  loadingText="Cargando datos..."
/>

// Ventajas:
// ✅ Reutilizable en cualquier componente
// ✅ Separación de concerns
// ✅ Fácil de testear`,

    'withAuth': `// withAuth HOC
interface WithAuthProps {
  user?: User | null;
  fallback?: React.ReactNode;
}

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P & WithAuthProps> => {
  const WithAuthComponent = (props: P & WithAuthProps) => {
    const { user, fallback, ...restProps } = props;

    if (!user) {
      return (
        <View style={styles.unauthorizedContainer}>
          {fallback || (
            <View>
              <Text>🔒 Acceso Restringido</Text>
              <Text>Debes iniciar sesión</Text>
              <Button title="Login" onPress={goToLogin} />
            </View>
          )}
        </View>
      );
    }

    return <WrappedComponent {...(restProps as P)} user={user} />;
  };

  return WithAuthComponent;
};

// Uso
const ProfileScreen = ({ user }) => (
  <View>
    <Text>Bienvenido, {user.name}</Text>
  </View>
);

const ProtectedProfile = withAuth(ProfileScreen);

// En uso
<ProtectedProfile 
  user={currentUser}
  fallback={<CustomLoginScreen />}
/>

// Ventajas:
// ✅ Protección automática de rutas
// ✅ Fallback customizable
// ✅ Props de usuario inyectadas`,

    'withErrorBoundary': `// withErrorBoundary HOC
const withErrorBoundary = <P extends object>(
  WrappedComponent: ComponentType<P>,
  fallback?: ComponentType<{ error: Error; retry: () => void }>
): ComponentType<P> => {
  class WithErrorBoundaryComponent extends React.Component<P, ErrorBoundaryState> {
    constructor(props: P) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
      return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.error('Error caught by HOC:', error, errorInfo);
      // Enviar a servicio de logging como Sentry
      // logErrorToService(error, errorInfo);
    }

    retry = () => {
      this.setState({ hasError: false, error: undefined });
    };

    render() {
      if (this.state.hasError) {
        if (fallback) {
          const FallbackComponent = fallback;
          return <FallbackComponent error={this.state.error!} retry={this.retry} />;
        }

        return (
          <View style={styles.errorContainer}>
            <Text>💥 ¡Oops! Algo salió mal</Text>
            <Text>{this.state.error?.message}</Text>
            <Button title="Reintentar" onPress={this.retry} />
          </View>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  return WithErrorBoundaryComponent;
};

// Uso
const RiskyComponent = ({ data }) => {
  // Componente que puede fallar
  return <ComplexVisualization data={data} />;
};

const SafeComponent = withErrorBoundary(RiskyComponent);

// Con fallback custom
const SafeComponentWithCustom = withErrorBoundary(
  RiskyComponent,
  ({ error, retry }) => (
    <CustomErrorScreen error={error} onRetry={retry} />
  )
);

// Ventajas:
// ✅ Previene crashes de la app
// ✅ UI graceful degradation
// ✅ Error reporting automático`,

    'withLogger': `// withLogger HOC
const withLogger = <P extends object>(
  WrappedComponent: ComponentType<P>,
  logLevel: 'info' | 'debug' | 'warn' = 'info'
): ComponentType<P> => {
  const WithLoggerComponent = (props: P) => {
    const componentName = WrappedComponent.displayName || WrappedComponent.name;

    useEffect(() => {
      console.log(\`[\${logLevel.toUpperCase()}] \${componentName} mounted with props:\`, props);
      
      return () => {
        console.log(\`[\${logLevel.toUpperCase()}] \${componentName} unmounted\`);
      };
    }, []);

    useEffect(() => {
      console.log(\`[\${logLevel.toUpperCase()}] \${componentName} props updated:\`, props);
    });

    return <WrappedComponent {...props} />;
  };

  WithLoggerComponent.displayName = \`withLogger(\${WrappedComponent.displayName || WrappedComponent.name})\`;
  return WithLoggerComponent;
};

// Uso
const UserCard = ({ user }) => (
  <View>
    <Text>{user.name}</Text>
  </View>
);

// Solo en desarrollo
const LoggedUserCard = __DEV__ 
  ? withLogger(UserCard, 'debug')
  : UserCard;

// Con configuración condicional
const EnhancedUserCard = withLogger(UserCard, 
  process.env.NODE_ENV === 'development' ? 'debug' : 'warn'
);

// Logs automáticos:
// [DEBUG] UserCard mounted with props: { user: { name: "Ana" } }
// [DEBUG] UserCard props updated: { user: { name: "Carlos" } }
// [DEBUG] UserCard unmounted

// Ventajas:
// ✅ Debugging automático
// ✅ Tracking de lifecycle
// ✅ Performance monitoring`
  };

  const currentCode = codeExamples[selectedHOC as keyof typeof codeExamples] || '';

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Higher-Order Components</Text>
          <Text style={styles.subtitle}>
            HOCs para reutilización de lógica y cross-cutting concerns
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>🔗 ¿Qué son los HOCs?</Text>
          <Text style={styles.infoText}>
            Los Higher-Order Components son funciones que toman un componente y retornan un nuevo componente con funcionalidad adicional:{'\n\n'}
            🔄 <Text style={styles.infoBold}>Pattern:</Text> HOC = (Component) => EnhancedComponent{'\n'}
            🧩 <Text style={styles.infoBold}>Cross-cutting:</Text> Funcionalidad que afecta múltiples componentes{'\n'}
            ♻️ <Text style={styles.infoBold}>Reutilización:</Text> Misma lógica aplicada a diferentes componentes{'\n'}
            🎯 <Text style={styles.infoBold}>Separación:</Text> Concerns separados del componente principal
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Tipos de HOCs</Text>
          
          <View style={styles.hocSelector}>
            {hocTypes.map((hoc) => (
              <Pressable
                key={hoc.id}
                style={[
                  styles.hocButton,
                  { borderColor: hoc.color },
                  selectedHOC === hoc.id && { backgroundColor: hoc.color }
                ]}
                onPress={() => setSelectedHOC(hoc.id)}
              >
                <Text style={[
                  styles.hocTitle,
                  selectedHOC === hoc.id && styles.selectedHocText
                ]}>
                  {hoc.title}
                </Text>
                <Text style={[
                  styles.hocDescription,
                  selectedHOC === hoc.id && styles.selectedHocText
                ]}>
                  {hoc.description}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💻 Código del HOC</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{currentCode}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧪 Demos Interactivos</Text>
          
          {selectedHOC === 'withLoading' && (
            <View style={styles.demoContainer}>
              <Text style={styles.demoTitle}>withLoading Demo</Text>
              <Pressable
                style={styles.demoButton}
                onPress={simulateLoading}
                disabled={isLoading}
              >
                <Text style={styles.demoButtonText}>
                  {isLoading ? 'Cargando...' : 'Simular Carga'}
                </Text>
              </Pressable>
              <EnhancedDataList 
                isLoading={isLoading}
                loadingText="Cargando lista de datos..."
              />
            </View>
          )}

          {selectedHOC === 'withAuth' && (
            <View style={styles.demoContainer}>
              <Text style={styles.demoTitle}>withAuth Demo</Text>
              <Pressable
                style={styles.demoButton}
                onPress={toggleUser}
              >
                <Text style={styles.demoButtonText}>
                  {user ? 'Logout' : 'Login'}
                </Text>
              </Pressable>
              <EnhancedUserProfile user={user} />
            </View>
          )}

          {selectedHOC === 'withErrorBoundary' && (
            <View style={styles.demoContainer}>
              <Text style={styles.demoTitle}>withErrorBoundary Demo</Text>
              <Pressable
                style={styles.demoButton}
                onPress={() => setShouldError(!shouldError)}
              >
                <Text style={styles.demoButtonText}>
                  {shouldError ? 'Arreglar Error' : 'Causar Error'}
                </Text>
              </Pressable>
              <EnhancedProblematicComponent shouldError={shouldError} />
            </View>
          )}

          {selectedHOC === 'withLogger' && (
            <View style={styles.demoContainer}>
              <Text style={styles.demoTitle}>withLogger Demo</Text>
              <Pressable
                style={styles.demoButton}
                onPress={() => setLogMessage(`Mensaje ${Date.now()}`)}
              >
                <Text style={styles.demoButtonText}>Cambiar Props</Text>
              </Pressable>
              <Text style={styles.consoleNote}>
                📱 Abre la consola del developer para ver los logs
              </Text>
              <EnhancedLoggedComponent message={logMessage} />
            </View>
          )}
        </View>

        <View style={styles.comparisonSection}>
          <Text style={styles.comparisonTitle}>⚖️ HOCs vs Hooks vs Render Props</Text>
          
          <View style={styles.comparisonTable}>
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonHeader}>Aspecto</Text>
              <Text style={styles.comparisonHeader}>HOCs</Text>
              <Text style={styles.comparisonHeader}>Hooks</Text>
              <Text style={styles.comparisonHeader}>Render Props</Text>
            </View>
            
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonCell}>Reutilización</Text>
              <Text style={styles.comparisonCell}>✅ Excelente</Text>
              <Text style={styles.comparisonCell}>✅ Excelente</Text>
              <Text style={styles.comparisonCell}>✅ Buena</Text>
            </View>
            
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonCell}>Composición</Text>
              <Text style={styles.comparisonCell}>⚠️ Wrapper hell</Text>
              <Text style={styles.comparisonCell}>✅ Natural</Text>
              <Text style={styles.comparisonCell}>⚠️ Callback hell</Text>
            </View>
            
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonCell}>Debugging</Text>
              <Text style={styles.comparisonCell}>⚠️ Complejo</Text>
              <Text style={styles.comparisonCell}>✅ Fácil</Text>
              <Text style={styles.comparisonCell}>✅ Transparente</Text>
            </View>
            
            <View style={styles.comparisonRow}>
              <Text style={styles.comparisonCell}>Props injection</Text>
              <Text style={styles.comparisonCell}>✅ Automático</Text>
              <Text style={styles.comparisonCell}>❌ Manual</Text>
              <Text style={styles.comparisonCell}>✅ Explícito</Text>
            </View>
          </View>
        </View>

        <View style={styles.bestPracticesSection}>
          <Text style={styles.bestPracticesTitle}>💡 Mejores Prácticas para HOCs</Text>
          
          <View style={styles.practiceCard}>
            <Text style={styles.practiceTitle}>🏷️ DisplayName</Text>
            <Text style={styles.practiceText}>
              Siempre establece displayName para debugging
            </Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>{`WithHOC.displayName = \`withHOC(\${Component.name})\`;`}</Text>
            </View>
          </View>

          <View style={styles.practiceCard}>
            <Text style={styles.practiceTitle}>📋 Copy Static Methods</Text>
            <Text style={styles.practiceText}>
              Copia métodos estáticos del componente original
            </Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>{`import hoistNonReactStatics from 'hoist-non-react-statics';
hoistNonReactStatics(WithHOC, WrappedComponent);`}</Text>
            </View>
          </View>

          <View style={styles.practiceCard}>
            <Text style={styles.practiceTitle}>🔗 Forward Refs</Text>
            <Text style={styles.practiceText}>
              Usa forwardRef para pasar refs correctamente
            </Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>{`const withHOC = Component => 
  React.forwardRef((props, ref) => 
    <Component {...props} forwardedRef={ref} />
  );`}</Text>
            </View>
          </View>

          <View style={styles.practiceCard}>
            <Text style={styles.practiceTitle}>⚠️ No usar en render</Text>
            <Text style={styles.practiceText}>
              Nunca apliques HOCs dentro del método render
            </Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>{`// ❌ Incorrecto
render() {
  const Enhanced = withHOC(MyComponent);
  return <Enhanced />;
}

// ✅ Correcto
const Enhanced = withHOC(MyComponent);
render() {
  return <Enhanced />;
}`}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🔗 HOCs son poderosos pero usa Hooks cuando sea posible en código nuevo
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
    marginBottom: 16,
  },
  hocSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  hocButton: {
    flex: 1,
    minWidth: 120,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  hocTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  hocDescription: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  selectedHocText: {
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
  demoButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  demoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  authContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#F44336',
  },
  unauthorizedContainer: {
    alignItems: 'center',
    padding: 20,
  },
  unauthorizedIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  unauthorizedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F44336',
    marginBottom: 8,
  },
  unauthorizedText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  loginButton: {
    backgroundColor: '#F44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  profileContainer: {
    backgroundColor: '#e8f5e8',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
  },
  profileTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  profileName: {
    fontSize: 14,
    color: '#388E3C',
    marginBottom: 4,
  },
  profileId: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  profileNote: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  dataContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  dataItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  dataNote: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 8,
  },
  errorContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#F44336',
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C62828',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#F44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  problematicContainer: {
    backgroundColor: '#e8f5e8',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
  },
  problematicTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  problematicText: {
    fontSize: 14,
    color: '#388E3C',
  },
  loggedContainer: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3',
  },
  loggedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  loggedMessage: {
    fontSize: 14,
    color: '#1976D2',
    marginBottom: 8,
  },
  loggedNote: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  consoleNote: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 8,
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
    fontSize: 18,
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
    padding: 8,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
  },
  comparisonCell: {
    flex: 1,
    padding: 8,
    fontSize: 10,
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
    marginBottom: 4,
  },
  practiceText: {
    fontSize: 12,
    color: '#FF8F00',
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

export default HOCPatternsExample;
