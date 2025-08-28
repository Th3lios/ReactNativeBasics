import React, { useState, memo, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Componente SIN memo - se re-renderiza siempre
const ExpensiveComponentWithoutMemo = ({ name, count }: { name: string; count: number }) => {
  console.log('🔴 ExpensiveComponentWithoutMemo renderizado');
  
  // Simular operación costosa
  let sum = 0;
  for (let i = 0; i < 100000; i++) {
    sum += i;
  }
  
  return (
    <View style={styles.componentCard}>
      <Text style={styles.componentTitle}>Sin memo</Text>
      <Text style={styles.componentText}>Nombre: {name}</Text>
      <Text style={styles.componentText}>Conteo: {count}</Text>
      <Text style={styles.componentText}>Cálculo: {sum}</Text>
      <Text style={styles.renderIndicator}>🔴 Se renderiza siempre</Text>
    </View>
  );
};

// Componente CON memo - solo se re-renderiza si props cambian
const ExpensiveComponentWithMemo = memo(({ name, count }: { name: string; count: number }) => {
  console.log('🟢 ExpensiveComponentWithMemo renderizado');
  
  // Simular operación costosa
  let sum = 0;
  for (let i = 0; i < 100000; i++) {
    sum += i;
  }
  
  return (
    <View style={styles.componentCard}>
      <Text style={styles.componentTitle}>Con memo</Text>
      <Text style={styles.componentText}>Nombre: {name}</Text>
      <Text style={styles.componentText}>Conteo: {count}</Text>
      <Text style={styles.componentText}>Cálculo: {sum}</Text>
      <Text style={styles.renderIndicator}>🟢 Solo si props cambian</Text>
    </View>
  );
});

// Componente con memo y comparación personalizada
const ComponentWithCustomComparison = memo(
  ({ user, settings }: { user: { name: string; age: number }; settings: any }) => {
    console.log('🟡 ComponentWithCustomComparison renderizado');
    
    return (
      <View style={styles.componentCard}>
        <Text style={styles.componentTitle}>Comparación personalizada</Text>
        <Text style={styles.componentText}>Usuario: {user.name} ({user.age} años)</Text>
        <Text style={styles.renderIndicator}>🟡 Solo si user.name cambia</Text>
      </View>
    );
  },
  // Función de comparación personalizada
  (prevProps, nextProps) => {
    // Solo re-renderizar si el nombre del usuario cambia
    return prevProps.user.name === nextProps.user.name;
  }
);

// Lista de items sin optimización
const UnoptimizedListItem = ({ item, onPress }: { item: string; onPress: () => void }) => {
  console.log(`📋 UnoptimizedListItem "${item}" renderizado`);
  
  return (
    <Pressable style={styles.listItem} onPress={onPress}>
      <Text style={styles.listItemText}>{item}</Text>
      <Text style={styles.listItemIndicator}>📋 Sin optimizar</Text>
    </Pressable>
  );
};

// Lista de items optimizada con memo
const OptimizedListItem = memo(({ item, onPress }: { item: string; onPress: () => void }) => {
  console.log(`⚡ OptimizedListItem "${item}" renderizado`);
  
  return (
    <Pressable style={styles.listItem} onPress={onPress}>
      <Text style={styles.listItemText}>{item}</Text>
      <Text style={styles.listItemIndicator}>⚡ Optimizado</Text>
    </Pressable>
  );
});

const MemoExample = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('React');
  const [unrelatedState, setUnrelatedState] = useState(0);
  const [user, setUser] = useState({ name: 'Juan', age: 25 });
  const [settings] = useState({ theme: 'dark', language: 'es' });
  const [items] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);

  // Función que cambia frecuentemente (problema sin useCallback)
  const handleItemPress = (item: string) => {
    console.log(`Item presionado: ${item}`);
  };

  // Función estable con useCallback
  const handleItemPressOptimized = useCallback((item: string) => {
    console.log(`Item optimizado presionado: ${item}`);
  }, []);

  const toggleName = () => {
    setName(name === 'React' ? 'React Native' : 'React');
  };

  const updateUserAge = () => {
    setUser(prev => ({ ...prev, age: prev.age + 1 }));
  };

  const updateUserName = () => {
    setUser(prev => ({ 
      ...prev, 
      name: prev.name === 'Juan' ? 'Pedro' : 'Juan' 
    }));
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.title}>React.memo</Text>
          <Text style={styles.description}>
            React.memo es un HOC (Higher-Order Component) que memoriza el resultado 
            del renderizado de un componente. Solo re-renderiza si sus props cambian, 
            similar a PureComponent pero para componentes funcionales.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sintaxis</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              {`// Memo básico
const MyComponent = memo((props) => {
  return <div>{props.name}</div>;
});

// Memo con comparación personalizada
const MyComponent = memo((props) => {
  return <div>{props.name}</div>;
}, (prevProps, nextProps) => {
  // Retorna true si props son "iguales"
  // Retorna false si se debe re-renderizar
  return prevProps.name === nextProps.name;
});`}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comparación: Con y Sin memo</Text>
          <Text style={styles.note}>
            Mira la consola para ver cuándo se renderiza cada componente
          </Text>
          
          <View style={styles.controlsContainer}>
            <View style={styles.controlRow}>
              <Text style={styles.controlLabel}>Count: {count}</Text>
              <Pressable style={styles.button} onPress={() => setCount(count + 1)}>
                <Text style={styles.buttonText}>Incrementar Count</Text>
              </Pressable>
            </View>
            
            <View style={styles.controlRow}>
              <Text style={styles.controlLabel}>Name: {name}</Text>
              <Pressable style={styles.button} onPress={toggleName}>
                <Text style={styles.buttonText}>Cambiar Name</Text>
              </Pressable>
            </View>
            
            <View style={styles.controlRow}>
              <Text style={styles.controlLabel}>No relacionado: {unrelatedState}</Text>
              <Pressable style={styles.button} onPress={() => setUnrelatedState(unrelatedState + 1)}>
                <Text style={styles.buttonText}>Estado No Relacionado</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.componentsContainer}>
            <ExpensiveComponentWithoutMemo name={name} count={count} />
            <ExpensiveComponentWithMemo name={name} count={count} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Memo con Comparación Personalizada</Text>
          <View style={styles.controlsContainer}>
            <View style={styles.controlRow}>
              <Text style={styles.controlLabel}>
                Usuario: {user.name} ({user.age} años)
              </Text>
            </View>
            
            <View style={styles.controlRow}>
              <Pressable style={styles.button} onPress={updateUserAge}>
                <Text style={styles.buttonText}>Cambiar Edad</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={updateUserName}>
                <Text style={styles.buttonText}>Cambiar Nombre</Text>
              </Pressable>
            </View>
          </View>

          <ComponentWithCustomComparison user={user} settings={settings} />
          
          <Text style={styles.note}>
            Este componente solo se re-renderiza cuando cambia user.name, 
            no cuando cambia user.age
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lista: Sin Optimización vs Optimizada</Text>
          
          <Text style={styles.listTitle}>❌ Sin optimización:</Text>
          <View style={styles.listContainer}>
            {items.map((item, index) => (
              <UnoptimizedListItem
                key={index}
                item={item}
                onPress={() => handleItemPress(item)}
              />
            ))}
          </View>

          <Text style={styles.listTitle}>✅ Con memo + useCallback:</Text>
          <View style={styles.listContainer}>
            {items.map((item, index) => (
              <OptimizedListItem
                key={index}
                item={item}
                onPress={handleItemPressOptimized}
              />
            ))}
          </View>

          <Pressable 
            style={styles.button} 
            onPress={() => setUnrelatedState(unrelatedState + 1)}>
            <Text style={styles.buttonText}>
              Cambiar Estado (triggerea re-render)
            </Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuándo Usar memo</Text>
          <View style={styles.useCasesContainer}>
            <View style={styles.useCaseCard}>
              <Text style={styles.useCaseIcon}>✅</Text>
              <View style={styles.useCaseContent}>
                <Text style={styles.useCaseTitle}>Usar cuando:</Text>
                <Text style={styles.useCaseText}>
                  • El componente renderiza frecuentemente{'\n'}
                  • Las props rara vez cambian{'\n'}
                  • El componente es computacionalmente costoso{'\n'}
                  • Está en una lista larga{'\n'}
                  • Las props son objetos complejos{'\n'}
                  • Se pasan muchos children
                </Text>
              </View>
            </View>

            <View style={styles.useCaseCard}>
              <Text style={styles.useCaseIcon}>❌</Text>
              <View style={styles.useCaseContent}>
                <Text style={styles.useCaseTitle}>No usar cuando:</Text>
                <Text style={styles.useCaseText}>
                  • Las props cambian frecuentemente{'\n'}
                  • El componente es muy simple{'\n'}
                  • No hay problemas de rendimiento{'\n'}
                  • Las props incluyen functions/objects nuevos{'\n'}
                  • Optimización prematura
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Problemas Comunes</Text>
          <View style={styles.problemsContainer}>
            <View style={styles.problemCard}>
              <Text style={styles.problemTitle}>❌ Funciones como props</Text>
              <View style={styles.codeContainer}>
                <Text style={styles.codeText}>
                  {`// ❌ Problema: función nueva en cada render
<MemoComponent onPress={() => doSomething()} />

// ✅ Solución: useCallback
const handlePress = useCallback(() => doSomething(), []);
<MemoComponent onPress={handlePress} />`}
                </Text>
              </View>
            </View>

            <View style={styles.problemCard}>
              <Text style={styles.problemTitle}>❌ Objetos como props</Text>
              <View style={styles.codeContainer}>
                <Text style={styles.codeText}>
                  {`// ❌ Problema: objeto nuevo en cada render
<MemoComponent user={{ name, age }} />

// ✅ Solución: useMemo
const user = useMemo(() => ({ name, age }), [name, age]);
<MemoComponent user={user} />`}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mejores Prácticas</Text>
          <Text style={styles.bestPractices}>
            ✅ Combina memo con useCallback y useMemo{'\n'}
            ✅ Usa comparación personalizada cuando sea necesario{'\n'}
            ✅ Mide el rendimiento antes y después{'\n'}
            ✅ Evita props que cambien frecuentemente{'\n'}
            ✅ Considera la profundidad del árbol de componentes{'\n\n'}
            ⚠️ No envuelvas todos los componentes en memo{'\n'}
            ⚠️ Ten cuidado con functions y objects como props{'\n'}
            ⚠️ La comparación tiene su propio costo{'\n'}
            ⚠️ No optimices prematuramente
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
  section: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 12,
  },
  note: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 6,
    marginBottom: 16,
    textAlign: 'center',
  },
  controlsContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  controlLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  componentsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  componentCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
  },
  componentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  componentText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  renderIndicator: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  listContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  listItemText: {
    fontSize: 16,
    color: '#333',
  },
  listItemIndicator: {
    fontSize: 12,
    fontWeight: '500',
  },
  codeContainer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
    marginTop: 8,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#333',
    lineHeight: 16,
  },
  useCasesContainer: {
    gap: 12,
  },
  useCaseCard: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  useCaseIcon: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  useCaseContent: {
    flex: 1,
  },
  useCaseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  useCaseText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  problemsContainer: {
    gap: 12,
  },
  problemCard: {
    backgroundColor: '#fff3e0',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800',
  },
  problemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e65100',
    marginBottom: 8,
  },
  bestPractices: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
  },
});

export default MemoExample;
