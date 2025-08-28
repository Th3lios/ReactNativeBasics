import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UseEffectExample = () => {
  // Estados para diferentes ejemplos
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Ejemplo 1: useEffect sin dependencias (componentDidMount)
  useEffect(() => {
    console.log('Componente montado - se ejecuta una sola vez');
    Alert.alert('useEffect', 'Componente montado');
  }, []); // Array vacío = solo se ejecuta al montar

  // Ejemplo 2: useEffect con dependencias
  useEffect(() => {
    console.log(`El contador cambió a: ${count}`);
    // Simular algún efecto secundario cuando cambia el count
  }, [count]); // Se ejecuta cuando 'count' cambia

  // Ejemplo 3: useEffect con cleanup (componentWillUnmount)
  useEffect(() => {
    let interval: any;
    
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }

    // Cleanup function - se ejecuta al desmontar o antes del próximo efecto
    return () => {
      if (interval) {
        clearInterval(interval);
        console.log('Interval limpiado');
      }
    };
  }, [isTimerActive]); // Se re-ejecuta cuando cambia isTimerActive

  // Ejemplo 4: useEffect para simular llamada a API
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simular datos de API
        const mockTodos = [
          { id: 1, title: 'Aprender useEffect', completed: false },
          { id: 2, title: 'Practicar React Hooks', completed: true },
          { id: 3, title: 'Construir una app', completed: false },
        ];
        
        setTodos(mockTodos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []); // Solo se ejecuta al montar el componente

  // Ejemplo 5: useEffect sin array de dependencias (componentDidUpdate)
  useEffect(() => {
    // Este se ejecuta después de cada render
    // ¡Cuidado! Puede causar renders infinitos si no se controla
    console.log('Componente se actualizó');
  }); // Sin array de dependencias

  const toggleTimer = () => {
    setIsTimerActive(!isTimerActive);
    if (!isTimerActive) {
      setTimer(0); // Reset timer cuando se inicia
    }
  };

  const resetTimer = () => {
    setIsTimerActive(false);
    setTimer(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.title}>useEffect Hook</Text>
          <Text style={styles.description}>
            useEffect te permite realizar efectos secundarios en componentes 
            funcionales. Es como componentDidMount, componentDidUpdate y 
            componentWillUnmount combinados.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sintaxis y Variaciones</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              // 1. Se ejecuta después de cada render{'\n'}
              useEffect(() => {'{'}{'\n'}
              {'  '}// código del efecto{'\n'}
              {'}'});{'\n\n'}
              
              // 2. Se ejecuta solo al montar (componentDidMount){'\n'}
              useEffect(() => {'{'}{'\n'}
              {'  '}// código del efecto{'\n'}
              {'}'}, []); // Array vacío{'\n\n'}
              
              // 3. Se ejecuta cuando cambian las dependencias{'\n'}
              useEffect(() => {'{'}{'\n'}
              {'  '}// código del efecto{'\n'}
              {'}'}, [dependency1, dependency2]);{'\n\n'}
              
              // 4. Con función de limpieza{'\n'}
              useEffect(() => {'{'}{'\n'}
              {'  '}// código del efecto{'\n'}
              {'  '}return () => {'{'}{'\n'}
              {'    '}// código de limpieza{'\n'}
              {'  }'}{'}'}{'\n'}
              {'}'}, [dependencies]);
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejemplo 1: Efecto con Dependencias</Text>
          <View style={styles.exampleContainer}>
            <Text style={styles.counterDisplay}>Contador: {count}</Text>
            <Text style={styles.note}>
              Mira la consola - useEffect se ejecuta cada vez que cambia el contador
            </Text>
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
          </View>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              useEffect(() => {'{'}{'\n'}
              {'  '}console.log(`El contador cambió a: ${'{'}{count}{'}'}`);{'\n'}
              {'}'}, [count]); // Se ejecuta cuando 'count' cambia
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejemplo 2: Timer con Cleanup</Text>
          <View style={styles.exampleContainer}>
            <Text style={styles.timerDisplay}>
              Timer: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
            </Text>
            <Text style={styles.timerStatus}>
              Estado: {isTimerActive ? '🟢 Activo' : '🔴 Pausado'}
            </Text>
            <View style={styles.buttonRow}>
              <Pressable
                style={[styles.button, isTimerActive ? styles.pauseButton : styles.startButton]}
                onPress={toggleTimer}>
                <Text style={styles.buttonText}>
                  {isTimerActive ? 'Pausar' : 'Iniciar'}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.resetButton]}
                onPress={resetTimer}>
                <Text style={styles.buttonText}>Reset</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              useEffect(() => {'{'}{'\n'}
              {'  '}let interval;{'\n'}
              {'  '}if (isTimerActive) {'{'}{'\n'}
              {'    '}interval = setInterval(() => {'{'}{'\n'}
              {'      '}setTimer(prev => prev + 1);{'\n'}
              {'    '}{'}'}, 1000);{'\n'}
              {'  }'}{'}'}{'\n\n'}
              {'  '}return () => {'{'} // Cleanup{'\n'}
              {'    '}if (interval) clearInterval(interval);{'\n'}
              {'  }'}{'}'}{'\n'}
              {'}'}, [isTimerActive]);
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejemplo 3: Simulación de API Call</Text>
          <View style={styles.exampleContainer}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>🔄 Cargando todos...</Text>
              </View>
            ) : (
              <View style={styles.todosContainer}>
                <Text style={styles.todosTitle}>📝 Lista de Todos</Text>
                {todos.map((todo: any) => (
                  <View key={todo.id} style={styles.todoItem}>
                    <Text style={[
                      styles.todoText,
                      todo.completed && styles.completedTodo
                    ]}>
                      {todo.completed ? '✅' : '⭕'} {todo.title}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              useEffect(() => {'{'}{'\n'}
              {'  '}const fetchTodos = async () => {'{'}{'\n'}
              {'    '}setLoading(true);{'\n'}
              {'    '}try {'{'}{'\n'}
              {'      '}const response = await fetch('/api/todos');{'\n'}
              {'      '}const data = await response.json();{'\n'}
              {'      '}setTodos(data);{'\n'}
              {'    '}{'}'} catch (error) {'{'}{'\n'}
              {'      '}console.error(error);{'\n'}
              {'    '}{'}'} finally {'{'}{'\n'}
              {'      '}setLoading(false);{'\n'}
              {'    }'}{'}'}{'\n'}
              {'  }'}{'}'}{'\n'}
              {'  '}fetchTodos();{'\n'}
              {'}'}, []); // Solo al montar
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tipos de useEffect</Text>
          <View style={styles.typesContainer}>
            <View style={styles.typeCard}>
              <Text style={styles.typeTitle}>Sin Dependencias</Text>
              <Text style={styles.typeCode}>useEffect(() => {'{}'})</Text>
              <Text style={styles.typeDescription}>
                Se ejecuta después de cada render. ¡Cuidado con loops infinitos!
              </Text>
            </View>

            <View style={styles.typeCard}>
              <Text style={styles.typeTitle}>Array Vacío</Text>
              <Text style={styles.typeCode}>useEffect(() => {'{}'}, [])</Text>
              <Text style={styles.typeDescription}>
                Se ejecuta solo una vez al montar (componentDidMount).
              </Text>
            </View>

            <View style={styles.typeCard}>
              <Text style={styles.typeTitle}>Con Dependencias</Text>
              <Text style={styles.typeCode}>useEffect(() => {'{}'}, [dep])</Text>
              <Text style={styles.typeDescription}>
                Se ejecuta cuando cambian las dependencias especificadas.
              </Text>
            </View>

            <View style={styles.typeCard}>
              <Text style={styles.typeTitle}>Con Cleanup</Text>
              <Text style={styles.typeCode}>useEffect(() => ({'{'} return () => {'{}'}; {'}'})</Text>
              <Text style={styles.typeDescription}>
                Incluye función de limpieza para subscripciones, timers, etc.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mejores Prácticas</Text>
          <Text style={styles.bestPractices}>
            ✅ Siempre incluye todas las dependencias en el array{'\n'}
            ✅ Usa múltiples useEffect para separar concerns{'\n'}
            ✅ Limpia subscripciones y timers en la función cleanup{'\n'}
            ✅ Usa ESLint plugin para verificar dependencias{'\n\n'}
            ⚠️ Evita efectos sin dependencias a menos que sea necesario{'\n'}
            ⚠️ No olvides la función cleanup para evitar memory leaks{'\n'}
            ⚠️ Ten cuidado con las dependencias de objetos y funciones
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    marginBottom: 8,
    color: '#333',
  },
  note: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  incrementButton: {
    backgroundColor: '#4caf50',
  },
  decrementButton: {
    backgroundColor: '#f44336',
  },
  resetButton: {
    backgroundColor: '#9e9e9e',
  },
  startButton: {
    backgroundColor: '#4caf50',
  },
  pauseButton: {
    backgroundColor: '#ff9800',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  timerDisplay: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    fontFamily: 'monospace',
  },
  timerStatus: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 8,
    color: '#666',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  todosContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
  },
  todosTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  todoItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  todoText: {
    fontSize: 16,
    color: '#333',
  },
  completedTodo: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  typesContainer: {
    gap: 12,
  },
  typeCard: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  typeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  typeCode: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#007AFF',
    backgroundColor: '#e3f2fd',
    padding: 4,
    borderRadius: 4,
    marginBottom: 6,
  },
  typeDescription: {
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

export default UseEffectExample;
