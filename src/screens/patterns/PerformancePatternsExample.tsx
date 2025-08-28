import React, { useState, useMemo, useCallback, memo, lazy, Suspense } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PerformancePatternsExample: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<string>('memo');
  const [renderCount, setRenderCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState(() => 
    Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
      value: Math.floor(Math.random() * 100),
      category: ['Tech', 'Design', 'Business'][i % 3]
    }))
  );

  const patterns = [
    {
      id: 'memo',
      title: 'React.memo',
      description: 'Memorización de componentes para evitar re-renders',
      color: '#4CAF50'
    },
    {
      id: 'useMemo',
      title: 'useMemo',
      description: 'Memorización de valores computados costosos',
      color: '#2196F3'
    },
    {
      id: 'useCallback',
      title: 'useCallback',
      description: 'Memorización de funciones para referencias estables',
      color: '#FF9800'
    },
    {
      id: 'lazy-loading',
      title: 'Lazy Loading',
      description: 'Carga diferida de componentes pesados',
      color: '#9C27B0'
    }
  ];

  // ====== REACT.MEMO PATTERN ======
  // Componente normal que se re-renderiza siempre
  const NormalComponent: React.FC<{ name: string; count: number }> = ({ name, count }) => {
    console.log(`NormalComponent rendered for ${name}`);
    return (
      <View style={styles.componentCard}>
        <Text style={styles.componentTitle}>Normal Component</Text>
        <Text style={styles.componentText}>Name: {name}</Text>
        <Text style={styles.componentText}>Renders: {count}</Text>
        <Text style={styles.componentNote}>Se re-renderiza en cada cambio del padre</Text>
      </View>
    );
  };

  // Componente memorizado que solo se re-renderiza si sus props cambian
  const MemoizedComponent = memo<{ name: string; count: number }>(({ name, count }) => {
    console.log(`MemoizedComponent rendered for ${name}`);
    return (
      <View style={styles.componentCard}>
        <Text style={styles.componentTitle}>Memoized Component</Text>
        <Text style={styles.componentText}>Name: {name}</Text>
        <Text style={styles.componentText}>Renders: {count}</Text>
        <Text style={styles.componentNote}>Solo se re-renderiza si props cambian</Text>
      </View>
    );
  });

  // Componente con comparación personalizada
  const CustomMemoComponent = memo<{ user: { id: number; name: string; email: string } }>(
    ({ user }) => {
      console.log(`CustomMemoComponent rendered for ${user.name}`);
      return (
        <View style={styles.componentCard}>
          <Text style={styles.componentTitle}>Custom Memo Component</Text>
          <Text style={styles.componentText}>ID: {user.id}</Text>
          <Text style={styles.componentText}>Name: {user.name}</Text>
          <Text style={styles.componentNote}>Usa comparación personalizada</Text>
        </View>
      );
    },
    (prevProps, nextProps) => {
      // Solo re-renderiza si el ID o name cambian, ignora email
      return prevProps.user.id === nextProps.user.id && 
             prevProps.user.name === nextProps.user.name;
    }
  );

  // ====== USEMEMO PATTERN ======
  // Computación costosa simulada
  const expensiveCalculation = (items: typeof items, searchTerm: string) => {
    console.log('Expensive calculation running...');
    // Simulamos una operación costosa
    let result = 0;
    for (let i = 0; i < 100000; i++) {
      result += i;
    }
    
    return items
      .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  };

  // Sin useMemo - se ejecuta en cada render
  const expensiveResultWithoutMemo = expensiveCalculation(items, searchTerm);

  // Con useMemo - solo se ejecuta cuando cambian las dependencias
  const expensiveResultWithMemo = useMemo(() => {
    return expensiveCalculation(items, searchTerm);
  }, [items, searchTerm]);

  // ====== USECALLBACK PATTERN ======
  // Función sin useCallback - nueva referencia en cada render
  const handleItemPressWithoutCallback = (itemId: number) => {
    console.log(`Item ${itemId} pressed`);
    setRenderCount(prev => prev + 1);
  };

  // Función con useCallback - referencia estable
  const handleItemPressWithCallback = useCallback((itemId: number) => {
    console.log(`Item ${itemId} pressed`);
    setRenderCount(prev => prev + 1);
  }, []);

  // ====== LAZY LOADING PATTERN ======
  // Componente pesado que se carga bajo demanda
  const HeavyComponent = lazy(() => 
    new Promise<{ default: React.ComponentType }>((resolve) => {
      // Simulamos una carga lenta
      setTimeout(() => {
        resolve({
          default: () => (
            <View style={styles.heavyComponent}>
              <Text style={styles.heavyTitle}>Componente Pesado Cargado</Text>
              <Text style={styles.heavyText}>
                Este componente se cargó de forma diferida usando React.lazy()
              </Text>
              {Array.from({ length: 50 }, (_, i) => (
                <Text key={i} style={styles.heavyItem}>
                  Elemento pesado {i + 1}
                </Text>
              ))}
            </View>
          )
        });
      }, 2000);
    })
  );

  // ====== VIRTUAL LIST PATTERN ======
  const VirtualListItem = memo<{ item: typeof items[0] }>(({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemTitle}>{item.name}</Text>
      <Text style={styles.listItemValue}>Value: {item.value}</Text>
      <Text style={styles.listItemCategory}>{item.category}</Text>
    </View>
  ));

  // Estado para demos
  const [showHeavyComponent, setShowHeavyComponent] = useState(false);
  const [staticName] = useState('Usuario Estático');
  const [changingValue, setChangingValue] = useState(0);
  const [user, setUser] = useState({
    id: 1,
    name: 'Ana García',
    email: 'ana@example.com'
  });

  const triggerReRender = () => {
    setRenderCount(prev => prev + 1);
  };

  const changeUserEmail = () => {
    setUser(prev => ({
      ...prev,
      email: `ana${Date.now()}@example.com`
    }));
  };

  const changeUserName = () => {
    setUser(prev => ({
      ...prev,
      name: `Ana García ${Date.now()}`
    }));
  };

  const codeExamples = {
    'memo': `// React.memo Pattern
import React, { memo } from 'react';

// Componente normal - se re-renderiza siempre
const ExpensiveComponent = ({ data, onUpdate }) => {
  console.log('ExpensiveComponent rendered'); // Se ejecuta en cada render del padre
  
  return (
    <View>
      <Text>{data.title}</Text>
      <ComplexVisualization data={data} />
    </View>
  );
};

// Componente memorizado - solo se re-renderiza si props cambian
const MemoizedExpensiveComponent = memo(({ data, onUpdate }) => {
  console.log('MemoizedExpensiveComponent rendered'); // Solo si props cambian
  
  return (
    <View>
      <Text>{data.title}</Text>
      <ComplexVisualization data={data} />
    </View>
  );
});

// Memo con comparación personalizada
const CustomMemoComponent = memo(
  ({ user, settings }) => {
    return (
      <UserProfile user={user} settings={settings} />
    );
  },
  (prevProps, nextProps) => {
    // Solo re-renderiza si cambió el user ID o settings
    return prevProps.user.id === nextProps.user.id && 
           JSON.stringify(prevProps.settings) === JSON.stringify(nextProps.settings);
  }
);

// Cuándo usar:
// ✅ Componentes que reciben props complejas
// ✅ Componentes con renders costosos
// ✅ Componentes que se re-renderizan frecuentemente
// ❌ Componentes simples o que siempre cambian`,

    'useMemo': `// useMemo Pattern
import React, { useMemo, useState } from 'react';

const DataProcessor = ({ items, searchTerm, sortBy }) => {
  // ❌ Sin useMemo - se ejecuta en cada render
  const processedDataBad = items
    .filter(item => item.name.includes(searchTerm))
    .sort((a, b) => a[sortBy] - b[sortBy])
    .map(item => ({
      ...item,
      computed: expensiveCalculation(item) // Función costosa
    }));

  // ✅ Con useMemo - solo se ejecuta cuando cambian dependencias
  const processedDataGood = useMemo(() => {
    console.log('Processing data...'); // Solo cuando sea necesario
    
    return items
      .filter(item => item.name.includes(searchTerm))
      .sort((a, b) => a[sortBy] - b[sortBy])
      .map(item => ({
        ...item,
        computed: expensiveCalculation(item)
      }));
  }, [items, searchTerm, sortBy]); // Dependencias explícitas

  // Memoizar objetos complejos
  const chartConfig = useMemo(() => ({
    type: 'bar',
    data: processedDataGood,
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  }), [processedDataGood]);

  // Memoizar computaciones derivadas
  const statistics = useMemo(() => {
    const total = processedDataGood.length;
    const average = processedDataGood.reduce((sum, item) => sum + item.value, 0) / total;
    const max = Math.max(...processedDataGood.map(item => item.value));
    const min = Math.min(...processedDataGood.map(item => item.value));
    
    return { total, average, max, min };
  }, [processedDataGood]);

  return (
    <View>
      <StatsDisplay stats={statistics} />
      <Chart config={chartConfig} />
      <DataTable data={processedDataGood} />
    </View>
  );
};

// Cuándo usar:
// ✅ Computaciones costosas
// ✅ Transformaciones de arrays grandes
// ✅ Objetos complejos como props
// ❌ Valores primitivos simples`,

    'useCallback': `// useCallback Pattern
import React, { useCallback, useState, memo } from 'react';

const DataList = ({ items }) => {
  const [filter, setFilter] = useState('');

  // ❌ Sin useCallback - nueva función en cada render
  const handleItemClickBad = (itemId) => {
    console.log('Item clicked:', itemId);
    // Lógica de click
  };

  // ✅ Con useCallback - función estable
  const handleItemClickGood = useCallback((itemId) => {
    console.log('Item clicked:', itemId);
    // Misma lógica pero referencia estable
  }, []); // Sin dependencias = función nunca cambia

  // useCallback con dependencias
  const handleItemUpdate = useCallback((itemId, newData) => {
    console.log('Updating item:', itemId, 'with filter:', filter);
    // La función se recrea solo cuando filter cambia
    updateItemWithFilter(itemId, newData, filter);
  }, [filter]); // Se recrea cuando filter cambia

  // Funciones complejas con múltiples dependencias
  const handleBatchOperation = useCallback((operation, selectedIds) => {
    const filteredItems = items.filter(item => 
      selectedIds.includes(item.id) && item.status === filter
    );
    
    return performBatchOperation(operation, filteredItems);
  }, [items, filter]); // Se recrea cuando items o filter cambian

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        // ItemComponent se memorizó, así que no se re-renderiza
        // si handleItemClickGood no cambia
        <ItemComponent 
          item={item}
          onPress={handleItemClickGood}
          onUpdate={handleItemUpdate}
        />
      )}
    />
  );
};

// Componente memo que se beneficia de useCallback
const ItemComponent = memo(({ item, onPress, onUpdate }) => {
  console.log('ItemComponent rendered for:', item.id);
  
  return (
    <Pressable onPress={() => onPress(item.id)}>
      <Text>{item.name}</Text>
      <Button 
        title="Update" 
        onPress={() => onUpdate(item.id, { name: 'Updated' })} 
      />
    </Pressable>
  );
});

// Cuándo usar:
// ✅ Funciones pasadas a componentes memo
// ✅ Dependencias de useEffect
// ✅ Event handlers complejos
// ❌ Funciones simples sin props`,

    'lazy-loading': `// Lazy Loading Pattern
import React, { lazy, Suspense, useState } from 'react';

// Lazy loading de componentes
const HeavyChart = lazy(() => import('./HeavyChart'));
const DataVisualization = lazy(() => import('./DataVisualization'));
const ReportsModule = lazy(() => import('./ReportsModule'));

// Lazy loading con timeout simulado
const AsyncComponent = lazy(() => 
  new Promise(resolve => {
    setTimeout(() => {
      resolve(import('./AsyncComponent'));
    }, 2000);
  })
);

// Lazy loading condicional
const AdminPanel = lazy(() => {
  if (user.role !== 'admin') {
    throw new Error('Unauthorized');
  }
  return import('./AdminPanel');
});

const App = () => {
  const [showChart, setShowChart] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <View>
      {/* Carga diferida con Suspense */}
      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <HeavyChart data={chartData} />
        </Suspense>
      )}

      {/* Lazy loading por pestañas */}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <Suspense fallback={<LoadingSpinner />}>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'reports' && <ReportsModule />}
        {activeTab === 'analytics' && <DataVisualization />}
      </Suspense>

      {/* Lazy loading con error boundary */}
      <ErrorBoundary fallback={<ErrorScreen />}>
        <Suspense fallback={<AdminSkeleton />}>
          {user.isAdmin && <AdminPanel />}
        </Suspense>
      </ErrorBoundary>
    </View>
  );
};

// Skeleton components para mejor UX
const ChartSkeleton = () => (
  <View style={styles.skeleton}>
    <View style={styles.skeletonLine} />
    <View style={styles.skeletonChart} />
    <View style={styles.skeletonLine} />
  </View>
);

// Lazy loading de rutas en React Navigation
const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen 
      name="Profile" 
      component={lazy(() => import('./ProfileScreen'))}
    />
    <Stack.Screen 
      name="Settings" 
      component={lazy(() => import('./SettingsScreen'))}
    />
  </Stack.Navigator>
);

// Cuándo usar:
// ✅ Componentes grandes o complejos
// ✅ Rutas que no son iniciales
// ✅ Modulos con dependencias pesadas
// ✅ Funcionalidades condicionales (admin, premium)
// ❌ Componentes críticos para la primera carga`
  };

  const currentCode = codeExamples[selectedPattern as keyof typeof codeExamples] || '';

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Patrones de Performance</Text>
          <Text style={styles.subtitle}>
            Optimización, memorización y técnicas para renders eficientes
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>⚡ Optimización en React Native</Text>
          <Text style={styles.infoText}>
            La performance es crítica en mobile. Estos patrones te ayudan a:{'\n\n'}
            🎯 <Text style={styles.infoBold}>React.memo:</Text> Evitar re-renders innecesarios{'\n'}
            🧠 <Text style={styles.infoBold}>useMemo:</Text> Memorizar computaciones costosas{'\n'}
            🔗 <Text style={styles.infoBold}>useCallback:</Text> Estabilizar referencias de funciones{'\n'}
            📦 <Text style={styles.infoBold}>Lazy Loading:</Text> Cargar componentes bajo demanda
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Técnicas de Optimización</Text>
          
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
          
          {selectedPattern === 'memo' && (
            <View style={styles.demoContainer}>
              <Text style={styles.demoTitle}>React.memo Demo</Text>
              <Text style={styles.demoNote}>
                Abre la consola para ver qué componentes se re-renderizan
              </Text>
              
              <View style={styles.demoControls}>
                <Pressable style={styles.demoButton} onPress={triggerReRender}>
                  <Text style={styles.demoButtonText}>
                    Trigger Re-render ({renderCount})
                  </Text>
                </Pressable>
                <Pressable style={styles.demoButton} onPress={changeUserEmail}>
                  <Text style={styles.demoButtonText}>Change Email</Text>
                </Pressable>
                <Pressable style={styles.demoButton} onPress={changeUserName}>
                  <Text style={styles.demoButtonText}>Change Name</Text>
                </Pressable>
              </View>

              <NormalComponent name={staticName} count={renderCount} />
              <MemoizedComponent name={staticName} count={renderCount} />
              <CustomMemoComponent user={user} />
            </View>
          )}

          {selectedPattern === 'useMemo' && (
            <View style={styles.demoContainer}>
              <Text style={styles.demoTitle}>useMemo Demo</Text>
              
              <TextInput
                style={styles.searchInput}
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholder="Buscar items..."
              />
              
              <View style={styles.resultsContainer}>
                <Text style={styles.resultsTitle}>
                  Top 10 items encontrados: {expensiveResultWithMemo.length}
                </Text>
                {expensiveResultWithMemo.slice(0, 5).map(item => (
                  <Text key={item.id} style={styles.resultItem}>
                    • {item.name} (Value: {item.value})
                  </Text>
                ))}
              </View>
              
              <Text style={styles.demoNote}>
                La búsqueda solo se ejecuta cuando cambias el término
              </Text>
            </View>
          )}

          {selectedPattern === 'useCallback' && (
            <View style={styles.demoContainer}>
              <Text style={styles.demoTitle}>useCallback Demo</Text>
              
              <FlatList
                data={items.slice(0, 20)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <VirtualListItem item={item} />
                )}
                style={styles.demoList}
                showsVerticalScrollIndicator={false}
              />
              
              <Text style={styles.demoNote}>
                Los items están memorizados y usan useCallback para onPress
              </Text>
            </View>
          )}

          {selectedPattern === 'lazy-loading' && (
            <View style={styles.demoContainer}>
              <Text style={styles.demoTitle}>Lazy Loading Demo</Text>
              
              <Pressable
                style={styles.demoButton}
                onPress={() => setShowHeavyComponent(!showHeavyComponent)}
              >
                <Text style={styles.demoButtonText}>
                  {showHeavyComponent ? 'Ocultar' : 'Cargar'} Componente Pesado
                </Text>
              </Pressable>
              
              {showHeavyComponent && (
                <Suspense fallback={
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#9C27B0" />
                    <Text style={styles.loadingText}>Cargando componente pesado...</Text>
                  </View>
                }>
                  <HeavyComponent />
                </Suspense>
              )}
            </View>
          )}
        </View>

        <View style={styles.performanceSection}>
          <Text style={styles.performanceTitle}>📊 Métricas de Performance</Text>
          
          <View style={styles.metricCard}>
            <Text style={styles.metricTitle}>🎯 Cuándo optimizar</Text>
            <Text style={styles.metricText}>
              • Componentes que se re-renderizan > 5 veces por segundo{'\n'}
              • Listas con > 100 elementos{'\n'}
              • Computaciones que tardan > 16ms{'\n'}
              • Funciones que se crean en cada render
            </Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricTitle}>📱 Herramientas de medición</Text>
            <Text style={styles.metricText}>
              • React DevTools Profiler{'\n'}
              • Flipper Performance{'\n'}
              • console.time() para funciones{'\n'}
              • React Native Performance Monitor
            </Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricTitle}>⚠️ Antipatrones comunes</Text>
            <Text style={styles.metricText}>
              • Optimizar prematuramente{'\n'}
              • Memoizar todo (overhead innecesario){'\n'}
              • useCallback sin dependencies{'\n'}
              • Inline functions en renderItem
            </Text>
          </View>
        </View>

        <View style={styles.bestPracticesSection}>
          <Text style={styles.bestPracticesTitle}>🏆 Mejores Prácticas</Text>
          
          <View style={styles.practiceCard}>
            <Text style={styles.practiceTitle}>🔍 Profile First</Text>
            <Text style={styles.practiceText}>
              Siempre mide antes de optimizar. No asumas dónde están los problemas.
            </Text>
          </View>

          <View style={styles.practiceCard}>
            <Text style={styles.practiceTitle}>🎯 Optimiza lo Critical</Text>
            <Text style={styles.practiceText}>
              Enfócate en la ruta crítica de rendering y componentes frecuentemente utilizados.
            </Text>
          </View>

          <View style={styles.practiceCard}>
            <Text style={styles.practiceTitle}>📏 Mide el Impacto</Text>
            <Text style={styles.practiceText}>
              Confirma que tu optimización realmente mejora la performance.
            </Text>
          </View>

          <View style={styles.practiceCard}>
            <Text style={styles.practiceTitle}>🧹 Clean Dependencies</Text>
            <Text style={styles.practiceText}>
              Mantén las dependency arrays limpias y específicas.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ⚡ La optimización prematura es la raíz de todo mal - mide primero, optimiza después
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
    backgroundColor: '#f3e5f5',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#7B1FA2',
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
    marginBottom: 20,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  demoNote: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  demoControls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  demoButton: {
    backgroundColor: '#9C27B0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  demoButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  componentCard: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
    marginBottom: 8,
  },
  componentTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  componentText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  componentNote: {
    fontSize: 11,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 4,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 12,
  },
  resultsContainer: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3',
  },
  resultsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  resultItem: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  demoList: {
    maxHeight: 200,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 8,
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 6,
    borderLeftWidth: 2,
    borderLeftColor: '#FF9800',
  },
  listItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  listItemValue: {
    fontSize: 12,
    color: '#666',
  },
  listItemCategory: {
    fontSize: 11,
    color: '#999',
    fontStyle: 'italic',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#9C27B0',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  heavyComponent: {
    backgroundColor: '#f3e5f5',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#9C27B0',
    maxHeight: 200,
  },
  heavyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 8,
  },
  heavyText: {
    fontSize: 14,
    color: '#8E24AA',
    marginBottom: 12,
  },
  heavyItem: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  performanceSection: {
    backgroundColor: '#e8f4fd',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  performanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 16,
  },
  metricCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  metricTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 6,
  },
  metricText: {
    fontSize: 12,
    color: '#1976D2',
    lineHeight: 16,
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
    marginBottom: 8,
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

export default PerformancePatternsExample;
