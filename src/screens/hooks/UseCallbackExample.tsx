import React, { useState, useCallback, memo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Componente hijo que se renderiza innecesariamente sin memo
const ChildComponent = ({ onPress, label }: { onPress: () => void; label: string }) => {
  console.log(`🔄 ChildComponent "${label}" renderizado`);
  return (
    <Pressable style={styles.childButton} onPress={onPress}>
      <Text style={styles.childButtonText}>{label}</Text>
    </Pressable>
  );
};

// Componente hijo optimizado con memo
const OptimizedChildComponent = memo(({ onPress, label }: { onPress: () => void; label: string }) => {
  console.log(`⚡ OptimizedChildComponent "${label}" renderizado`);
  return (
    <Pressable style={styles.optimizedChildButton} onPress={onPress}>
      <Text style={styles.childButtonText}>{label}</Text>
    </Pressable>
  );
});

const UseCallbackExample = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('React');
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  // Función normal - se recrea en cada render
  const handleClickWithoutCallback = () => {
    console.log('Click sin useCallback');
    setCount(count + 1);
  };

  // Función con useCallback - solo se recrea si count cambia
  const handleClickWithCallback = useCallback(() => {
    console.log('Click con useCallback');
    setCount(prevCount => prevCount + 1);
  }, []); // Sin dependencias - función estable

  // useCallback con dependencias
  const handleNameChange = useCallback(() => {
    console.log(`Changing name from ${name}`);
    setName(name === 'React' ? 'React Native' : 'React');
  }, [name]); // Se recrea cuando name cambia

  // Función para agregar items con useCallback
  const addItem = useCallback(() => {
    const newItem = `Item ${items.length + 1}`;
    setItems(prevItems => [...prevItems, newItem]);
  }, [items.length]); // Solo depende de la longitud

  // Mejor versión que no depende del estado actual
  const addItemOptimized = useCallback(() => {
    setItems(prevItems => [...prevItems, `Item ${prevItems.length + 1}`]);
  }, []); // No dependencias - más eficiente

  // Función para remover item
  const removeItem = useCallback((index: number) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  }, []); // Función estable

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.title}>useCallback Hook</Text>
          <Text style={styles.description}>
            useCallback memoriza una función y solo la recrea cuando sus 
            dependencias cambian. Es útil para evitar re-renders innecesarios 
            en componentes hijos que reciben la función como prop.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sintaxis</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              const memoizedCallback = useCallback({'\n'}
              {'  '}() => {'{'}{'\n'}
              {'    '}doSomething(a, b);{'\n'}
              {'  '}{'}'},{'\n'}
              {'  '}[a, b], // Solo recrea si a o b cambian{'\n'}
              );
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejemplo 1: Contador con Estado</Text>
          <View style={styles.exampleContainer}>
            <Text style={styles.counterDisplay}>Count: {count}</Text>
            <Text style={styles.counterDisplay}>Name: {name}</Text>
            
            <View style={styles.buttonGroup}>
              <Text style={styles.groupTitle}>Sin useCallback (se recrea siempre):</Text>
              <ChildComponent 
                onPress={handleClickWithoutCallback}
                label="Sin useCallback"
              />
              
              <Text style={styles.groupTitle}>Con useCallback (función estable):</Text>
              <OptimizedChildComponent 
                onPress={handleClickWithCallback}
                label="Con useCallback"
              />
              
              <Text style={styles.groupTitle}>Con dependencias:</Text>
              <OptimizedChildComponent 
                onPress={handleNameChange}
                label="Cambiar Nombre"
              />
            </View>
            
            <Text style={styles.note}>
              Mira la consola para ver cuándo se renderiza cada componente
            </Text>
          </View>

          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              // ❌ Sin useCallback - se recrea en cada render{'\n'}
              const handleClick = () => setCount(count + 1);{'\n\n'}
              
              // ✅ Con useCallback - función estable{'\n'}
              const handleClick = useCallback(() => {'{'}{'\n'}
              {'  '}setCount(prevCount => prevCount + 1);{'\n'}
              {'}'}, []); // Sin dependencias
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejemplo 2: Lista de Items</Text>
          <View style={styles.exampleContainer}>
            <View style={styles.itemsHeader}>
              <Text style={styles.itemsTitle}>Items ({items.length})</Text>
              <View style={styles.itemsButtons}>
                <Pressable style={styles.addButton} onPress={addItemOptimized}>
                  <Text style={styles.addButtonText}>+ Agregar</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.itemsList}>
              {items.map((item, index) => (
                <ItemComponent 
                  key={index}
                  item={item}
                  index={index}
                  onRemove={removeItem}
                />
              ))}
            </View>
          </View>

          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              // ✅ Función estable para remover items{'\n'}
              const removeItem = useCallback((index) => {'{'}{'\n'}
              {'  '}setItems(prev => prev.filter((_, i) => i !== index));{'\n'}
              {'}'}, []); // Sin dependencias del estado
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comparación: Con y Sin Optimización</Text>
          <View style={styles.comparisonContainer}>
            <View style={styles.comparisonCard}>
              <Text style={styles.comparisonTitle}>❌ Sin Optimización</Text>
              <Text style={styles.comparisonText}>
                • Función se recrea en cada render{'\n'}
                • Componentes hijos se re-renderan{'\n'}
                • Menor rendimiento{'\n'}
                • Más trabajo para el garbage collector
              </Text>
              <ChildComponent 
                onPress={() => console.log('No optimizado')}
                label="No Optimizado"
              />
            </View>

            <View style={styles.comparisonCard}>
              <Text style={styles.comparisonTitle}>✅ Con Optimización</Text>
              <Text style={styles.comparisonText}>
                • Función memorizada{'\n'}
                • Componentes hijos evitan re-renders{'\n'}
                • Mejor rendimiento{'\n'}
                • Menos creación de objetos
              </Text>
              <OptimizedChildComponent 
                onPress={useCallback(() => console.log('Optimizado'), [])}
                label="Optimizado"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dependencias en useCallback</Text>
          <View style={styles.dependenciesContainer}>
            <View style={styles.dependencyExample}>
              <Text style={styles.dependencyTitle}>Sin dependencias []:</Text>
              <Text style={styles.dependencyDescription}>
                La función nunca se recrea. Usa función updater para acceder al estado.
              </Text>
              <View style={styles.codeContainer}>
                <Text style={styles.codeText}>
                  useCallback(() => {'{'}{'\n'}
                  {'  '}setState(prev => prev + 1);{'\n'}
                  {'}'}, []); // Función estable
                </Text>
              </View>
            </View>

            <View style={styles.dependencyExample}>
              <Text style={styles.dependencyTitle}>Con dependencias [value]:</Text>
              <Text style={styles.dependencyDescription}>
                La función se recrea cuando las dependencias cambian.
              </Text>
              <View style={styles.codeContainer}>
                <Text style={styles.codeText}>
                  useCallback(() => {'{'}{'\n'}
                  {'  '}doSomething(value);{'\n'}
                  {'}'}, [value]); // Se recrea si value cambia
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuándo Usar useCallback</Text>
          <View style={styles.useCasesContainer}>
            <View style={styles.useCaseCard}>
              <Text style={styles.useCaseIcon}>✅</Text>
              <View style={styles.useCaseContent}>
                <Text style={styles.useCaseTitle}>Usar cuando:</Text>
                <Text style={styles.useCaseText}>
                  • Pasas funciones a componentes memoizados{'\n'}
                  • La función es dependencia de useEffect/useMemo{'\n'}
                  • Tienes componentes hijos costosos{'\n'}
                  • Event handlers en listas largas{'\n'}
                  • Contextos que se actualizan frecuentemente
                </Text>
              </View>
            </View>

            <View style={styles.useCaseCard}>
              <Text style={styles.useCaseIcon}>❌</Text>
              <View style={styles.useCaseContent}>
                <Text style={styles.useCaseTitle}>No usar cuando:</Text>
                <Text style={styles.useCaseText}>
                  • Funciones simples sin componentes hijos{'\n'}
                  • Las dependencias cambian constantemente{'\n'}
                  • No hay problemas de rendimiento{'\n'}
                  • Optimización prematura{'\n'}
                  • Funciones que no se pasan como props
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mejores Prácticas</Text>
          <Text style={styles.bestPractices}>
            ✅ Combina useCallback con React.memo para máxima eficiencia{'\n'}
            ✅ Usa funciones updater para evitar dependencias del estado{'\n'}
            ✅ Mide el rendimiento antes de optimizar{'\n'}
            ✅ Incluye todas las dependencias en el array{'\n\n'}
            ⚠️ No todos los event handlers necesitan useCallback{'\n'}
            ⚠️ Evita dependencias que cambian frecuentemente{'\n'}
            ⚠️ useCallback tiene su propio overhead{'\n'}
            ⚠️ No optimices prematuramente sin medir
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Componente para mostrar items con memo
const ItemComponent = memo(({ item, index, onRemove }: { 
  item: string; 
  index: number; 
  onRemove: (index: number) => void 
}) => {
  console.log(`📝 ItemComponent "${item}" renderizado`);
  
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item}</Text>
      <Pressable 
        style={styles.removeButton}
        onPress={() => onRemove(index)}>
        <Text style={styles.removeButtonText}>✕</Text>
      </Pressable>
    </View>
  );
});

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
  codeContainer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
    marginTop: 8,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
  exampleContainer: {
    marginVertical: 8,
  },
  counterDisplay: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  buttonGroup: {
    gap: 12,
    marginVertical: 16,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  childButton: {
    backgroundColor: '#f44336',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  optimizedChildButton: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  childButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  note: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 16,
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 6,
  },
  itemsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemsButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  addButton: {
    backgroundColor: '#2196f3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  itemsList: {
    gap: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#f44336',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  comparisonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  comparisonCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  comparisonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  comparisonText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  dependenciesContainer: {
    gap: 16,
  },
  dependencyExample: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  dependencyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  dependencyDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
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
  bestPractices: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
  },
});

export default UseCallbackExample;
