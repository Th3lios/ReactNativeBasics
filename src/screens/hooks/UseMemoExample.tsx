import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UseMemoExample = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(['apple', 'banana', 'cherry', 'date', 'elderberry']);
  const [filter, setFilter] = useState('');
  const [multiplier, setMultiplier] = useState(1);

  // Función costosa para simular cálculo pesado
  const expensiveCalculation = (num: number) => {
    console.log('🔄 Ejecutando cálculo costoso...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += num * i;
    }
    return result;
  };

  // SIN useMemo - se ejecuta en cada render
  const expensiveValueWithoutMemo = expensiveCalculation(count);

  // CON useMemo - solo se ejecuta cuando 'count' cambia  
  const expensiveValueWithMemo = useMemo(() => {
    console.log('💾 Usando useMemo para el cálculo');
    return expensiveCalculation(count);
  }, [count]);

  // Ejemplo con filtrado de array
  const filteredItems = useMemo(() => {
    console.log('🔍 Filtrando items...');
    return items.filter(item => 
      item.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  // Ejemplo con múltiples dependencias
  const complexCalculation = useMemo(() => {
    console.log('🧮 Cálculo complejo ejecutándose...');
    return {
      doubled: count * 2,
      multiplied: count * multiplier,
      squared: count ** 2,
      factorial: count <= 10 ? factorial(count) : 'Muy grande',
    };
  }, [count, multiplier]);

  // Ejemplo sin useMemo para comparación
  const simpleCalculation = count * 2; // Esto es rápido, no necesita useMemo

  function factorial(n: number): number {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  }

  const addItem = () => {
    const newItem = `item-${Date.now()}`;
    setItems(prev => [...prev, newItem]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.title}>useMemo Hook</Text>
          <Text style={styles.description}>
            useMemo memoriza el resultado de un cálculo costoso y solo lo 
            recalcula cuando sus dependencias cambian. Ayuda a optimizar 
            el rendimiento evitando cálculos innecesarios.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sintaxis</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              const memoizedValue = useMemo(() => {'{'}{'\n'}
              {'  '}return expensiveCalculation(a, b);{'\n'}
              {'}'}, [a, b]); // Solo recalcula si a o b cambian
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejemplo 1: Cálculo Costoso</Text>
          <View style={styles.exampleContainer}>
            <Text style={styles.counterDisplay}>Count: {count}</Text>
            <View style={styles.buttonRow}>
              <Pressable
                style={[styles.button, styles.decrementButton]}
                onPress={() => setCount(count - 1)}>
                <Text style={styles.buttonText}>-1</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.resetButton]}
                onPress={() => setCount(0)}>
                <Text style={styles.buttonText}>Reset</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.incrementButton]}
                onPress={() => setCount(count + 1)}>
                <Text style={styles.buttonText}>+1</Text>
              </Pressable>
            </View>

            <View style={styles.resultContainer}>
              <View style={styles.resultCard}>
                <Text style={styles.resultTitle}>Con useMemo 💾</Text>
                <Text style={styles.resultValue}>
                  {expensiveValueWithMemo.toLocaleString()}
                </Text>
                <Text style={styles.resultNote}>
                  Solo recalcula cuando count cambia
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              const expensiveValue = useMemo(() => {'{'}{'\n'}
              {'  '}return expensiveCalculation(count);{'\n'}
              {'}'}, [count]); // Solo cuando count cambia
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejemplo 2: Filtrado de Lista</Text>
          <View style={styles.exampleContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Filtrar items..."
              value={filter}
              onChangeText={setFilter}
            />
            
            <View style={styles.itemsStats}>
              <Text style={styles.statsText}>
                Items totales: {items.length} | 
                Filtrados: {filteredItems.length}
              </Text>
            </View>

            <View style={styles.itemsList}>
              {filteredItems.map((item, index) => (
                <View key={index} style={styles.item}>
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              ))}
            </View>

            <Pressable style={styles.addButton} onPress={addItem}>
              <Text style={styles.addButtonText}>Agregar Item</Text>
            </Pressable>
          </View>

          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              const filteredItems = useMemo(() => {'{'}{'\n'}
              {'  '}return items.filter(item =>{'\n'}
              {'    '}item.toLowerCase().includes(filter.toLowerCase()){'\n'}
              {'  '});{'\n'}
              {'}'}, [items, filter]); // Recalcula si items o filter cambian
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejemplo 3: Múltiples Dependencias</Text>
          <View style={styles.exampleContainer}>
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Multiplicador:</Text>
              <TextInput
                style={styles.numberInput}
                value={multiplier.toString()}
                onChangeText={(text) => setMultiplier(Number(text) || 1)}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.calculationsGrid}>
              <View style={styles.calcCard}>
                <Text style={styles.calcTitle}>Doble</Text>
                <Text style={styles.calcValue}>{complexCalculation.doubled}</Text>
              </View>
              <View style={styles.calcCard}>
                <Text style={styles.calcTitle}>Multiplicado</Text>
                <Text style={styles.calcValue}>{complexCalculation.multiplied}</Text>
              </View>
              <View style={styles.calcCard}>
                <Text style={styles.calcTitle}>Cuadrado</Text>
                <Text style={styles.calcValue}>{complexCalculation.squared}</Text>
              </View>
              <View style={styles.calcCard}>
                <Text style={styles.calcTitle}>Factorial</Text>
                <Text style={styles.calcValue}>{complexCalculation.factorial}</Text>
              </View>
            </View>
          </View>

          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              const complexCalc = useMemo(() => ({'{'}{'\n'}
              {'  '}doubled: count * 2,{'\n'}
              {'  '}multiplied: count * multiplier,{'\n'}
              {'  '}squared: count ** 2{'\n'}
              {'}'}, [count, multiplier]); // Múltiples dependencias
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuándo NO usar useMemo</Text>
          <View style={styles.exampleContainer}>
            <Text style={styles.simpleCalcTitle}>Cálculo Simple (sin useMemo):</Text>
            <Text style={styles.simpleCalcValue}>{simpleCalculation}</Text>
            <Text style={styles.simpleCalcNote}>
              Multiplicar por 2 es rápido, no necesita memorización
            </Text>
          </View>

          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              // ❌ Innecesario para cálculos simples{'\n'}
              const doubled = useMemo(() => count * 2, [count]);{'\n\n'}
              
              // ✅ Mejor para cálculos simples{'\n'}
              const doubled = count * 2;
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuándo Usar useMemo</Text>
          <View style={styles.useCasesContainer}>
            <View style={styles.useCaseCard}>
              <Text style={styles.useCaseIcon}>✅</Text>
              <View style={styles.useCaseContent}>
                <Text style={styles.useCaseTitle}>Usar cuando:</Text>
                <Text style={styles.useCaseText}>
                  • Cálculos computacionalmente costosos{'\n'}
                  • Filtrado/transformación de arrays grandes{'\n'}
                  • Crear objetos o arrays complejos{'\n'}
                  • Evitar recreación de objetos en props{'\n'}
                  • Optimizar re-renders de componentes hijos
                </Text>
              </View>
            </View>

            <View style={styles.useCaseCard}>
              <Text style={styles.useCaseIcon}>❌</Text>
              <View style={styles.useCaseContent}>
                <Text style={styles.useCaseTitle}>No usar cuando:</Text>
                <Text style={styles.useCaseText}>
                  • Cálculos simples (suma, resta, multiplicación){'\n'}
                  • Valores primitivos simples{'\n'}
                  • El cálculo es más rápido que la comparación{'\n'}
                  • Las dependencias cambian constantemente{'\n'}
                  • Optimización prematura
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mejores Prácticas</Text>
          <Text style={styles.bestPractices}>
            ✅ Mide antes de optimizar - no todos los cálculos lo necesitan{'\n'}
            ✅ Incluye todas las dependencias en el array{'\n'}
            ✅ Usa para transformaciones de datos costosas{'\n'}
            ✅ Combina con React.memo para máxima optimización{'\n\n'}
            ⚠️ No abuses de useMemo - tiene su propio overhead{'\n'}
            ⚠️ Evita para valores que cambian frecuentemente{'\n'}
            ⚠️ No uses para optimización prematura{'\n'}
            ⚠️ Recuerda que es solo una sugerencia, React puede ignorarlo
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  incrementButton: { backgroundColor: '#4caf50' },
  decrementButton: { backgroundColor: '#f44336' },
  resetButton: { backgroundColor: '#9e9e9e' },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 16,
  },
  resultCard: {
    backgroundColor: '#e8f5e8',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1b5e20',
    marginBottom: 4,
  },
  resultNote: {
    fontSize: 12,
    color: '#388e3c',
    fontStyle: 'italic',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  itemsStats: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  statsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  itemsList: {
    maxHeight: 150,
    marginBottom: 12,
  },
  item: {
    backgroundColor: '#e3f2fd',
    padding: 8,
    borderRadius: 6,
    marginBottom: 4,
  },
  itemText: {
    fontSize: 14,
    color: '#1976d2',
  },
  addButton: {
    backgroundColor: '#2196f3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 12,
    minWidth: 100,
  },
  numberInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 8,
    fontSize: 16,
    width: 80,
    textAlign: 'center',
  },
  calculationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  calcCard: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
  },
  calcTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  calcValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  simpleCalcTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  simpleCalcValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  simpleCalcNote: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
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

export default UseMemoExample;
