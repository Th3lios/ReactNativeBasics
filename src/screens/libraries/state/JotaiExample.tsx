import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Basic atoms
const countAtom = atom(0);
const nameAtom = atomWithStorage('name', 'Usuario');

// Derived atom (computed)
const doubleCountAtom = atom((get) => get(countAtom) * 2);

// Write-only atom
const incrementAtom = atom(null, (get, set, amount: number) => {
  set(countAtom, get(countAtom) + amount);
});

// Async atom
const weatherAtom = atom(async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  const conditions = ['☀️ Sunny', '🌧️ Rainy', '☁️ Cloudy', '⛈️ Stormy'];
  return conditions[Math.floor(Math.random() * conditions.length)];
});

// Todo atoms
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const todosAtom = atom<Todo[]>([]);
const filterAtom = atom<'all' | 'active' | 'completed'>('all');

// Derived todo atoms
const filteredTodosAtom = atom((get) => {
  const todos = get(todosAtom);
  const filter = get(filterAtom);
  
  if (filter === 'active') return todos.filter(todo => !todo.completed);
  if (filter === 'completed') return todos.filter(todo => todo.completed);
  return todos;
});

const todoStatsAtom = atom((get) => {
  const todos = get(todosAtom);
  const completed = todos.filter(todo => todo.completed).length;
  return {
    total: todos.length,
    completed,
    active: todos.length - completed,
  };
});

// Basic Counter Section
const CounterSection = () => {
  const [count, setCount] = useAtom(countAtom);
  const doubleCount = useAtomValue(doubleCountAtom);
  const increment = useSetAtom(incrementAtom);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>⚛️ Basic Atoms</Text>
      
      <View style={styles.counterContainer}>
        <Text style={styles.counterValue}>Count: {count}</Text>
        <Text style={styles.doubleValue}>Double: {doubleCount}</Text>
        
        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.button, styles.primaryButton]}
            onPress={() => setCount(c => c + 1)}
          >
            <Text style={styles.buttonText}>+1</Text>
          </Pressable>
          
          <Pressable
            style={[styles.button, styles.secondaryButton]}
            onPress={() => setCount(c => c - 1)}
          >
            <Text style={styles.buttonTextSecondary}>-1</Text>
          </Pressable>
          
          <Pressable
            style={[styles.button, styles.primaryButton]}
            onPress={() => increment(5)}
          >
            <Text style={styles.buttonText}>+5</Text>
          </Pressable>
          
          <Pressable
            style={[styles.button, styles.dangerButton]}
            onPress={() => setCount(0)}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

// Name Section with Storage
const NameSection = () => {
  const [name, setName] = useAtom(nameAtom);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>💾 Persistent Atom</Text>
      
      <View style={styles.nameContainer}>
        <Text style={styles.welcomeText}>¡Hola, {name}!</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Tu nombre"
          value={name}
          onChangeText={setName}
        />
        
        <Text style={styles.helperText}>
          Este nombre se guarda automáticamente y persiste entre sesiones
        </Text>
      </View>
    </View>
  );
};

// Weather Section (Async)
const WeatherSection = () => {
  const weather = useAtomValue(weatherAtom);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🌤️ Async Atom</Text>
      
      <View style={styles.weatherContainer}>
        <React.Suspense fallback={
          <Text style={styles.loadingText}>Cargando clima...</Text>
        }>
          <WeatherDisplay />
        </React.Suspense>
      </View>
    </View>
  );
};

const WeatherDisplay = () => {
  const weather = useAtomValue(weatherAtom);
  
  return (
    <View style={styles.weatherCard}>
      <Text style={styles.weatherText}>Clima actual: {weather}</Text>
    </View>
  );
};

// Todos Section
const TodosSection = () => {
  const [todos, setTodos] = useAtom(todosAtom);
  const [filter, setFilter] = useAtom(filterAtom);
  const filteredTodos = useAtomValue(filteredTodosAtom);
  const stats = useAtomValue(todoStatsAtom);
  const [newTodoText, setNewTodoText] = React.useState('');

  const addTodo = () => {
    if (newTodoText.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: newTodoText.trim(),
        completed: false,
      };
      setTodos(prev => [...prev, newTodo]);
      setNewTodoText('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>📝 Derived Atoms</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Nueva tarea..."
          value={newTodoText}
          onChangeText={setNewTodoText}
          onSubmitEditing={addTodo}
        />
        <Pressable
          style={[styles.button, styles.primaryButton]}
          onPress={addTodo}
        >
          <Text style={styles.buttonText}>Agregar</Text>
        </Pressable>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Total: {stats.total} | Activas: {stats.active} | Completadas: {stats.completed}
        </Text>
      </View>

      <View style={styles.filterRow}>
        {(['all', 'active', 'completed'] as const).map((filterType) => (
          <Pressable
            key={filterType}
            style={[
              styles.filterButton,
              filter === filterType && styles.activeFilter
            ]}
            onPress={() => setFilter(filterType)}
          >
            <Text style={[
              styles.filterButtonText,
              filter === filterType && styles.activeFilterText
            ]}>
              {filterType === 'all' ? 'Todas' : 
               filterType === 'active' ? 'Activas' : 'Completadas'}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.todosContainer}>
        {filteredTodos.map((todo) => (
          <View key={todo.id} style={styles.todoItem}>
            <Pressable
              style={styles.todoCheck}
              onPress={() => toggleTodo(todo.id)}
            >
              <Text style={styles.todoCheckText}>
                {todo.completed ? '✅' : '⭕'}
              </Text>
            </Pressable>
            
            <Text style={[
              styles.todoText,
              todo.completed && styles.todoTextCompleted
            ]}>
              {todo.text}
            </Text>
            
            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteTodo(todo.id)}
            >
              <Text style={styles.deleteButtonText}>🗑️</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

const JotaiExample = () => {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Jotai</Text>
          <Text style={styles.subtitle}>
            Atomic state management de abajo hacia arriba
          </Text>
        </View>

        <CounterSection />
        <NameSection />
        <WeatherSection />
        <TodosSection />

        <View style={styles.codeSection}>
          <Text style={styles.codeTitle}>💡 Jotai Patterns</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{`// 1. Basic Atoms
import { atom, useAtom } from 'jotai';

const countAtom = atom(0);
const nameAtom = atom('John');

const MyComponent = () => {
  const [count, setCount] = useAtom(countAtom);
  const [name, setName] = useAtom(nameAtom);
  
  return <div>{name}: {count}</div>;
};

// 2. Derived Atoms (Read-only)
const doubleCountAtom = atom((get) => get(countAtom) * 2);

// 3. Write-only Atoms
const incrementAtom = atom(
  null, // no read function
  (get, set, amount: number) => {
    set(countAtom, get(countAtom) + amount);
  }
);

// 4. Async Atoms
const weatherAtom = atom(async () => {
  const response = await fetch('/weather');
  return response.json();
});

// 5. Persistent Atoms
import { atomWithStorage } from 'jotai/utils';

const persistentAtom = atomWithStorage('my-key', 'default-value');

// 6. Complex Derived State
const todosAtom = atom([]);
const filterAtom = atom('all');

const filteredTodosAtom = atom((get) => {
  const todos = get(todosAtom);
  const filter = get(filterAtom);
  
  return todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
});

// 7. Computed Values
const todoStatsAtom = atom((get) => {
  const todos = get(todosAtom);
  return {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
  };
});`}</Text>
          </View>
        </View>

        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>⚛️ Ventajas de Jotai</Text>
          <View style={styles.benefitsList}>
            <Text style={styles.benefitItem}>• State management atómico y granular</Text>
            <Text style={styles.benefitItem}>• No providers - usa React Suspense</Text>
            <Text style={styles.benefitItem}>• TypeScript nativo con inferencia automática</Text>
            <Text style={styles.benefitItem}>• Derived state automático y eficiente</Text>
            <Text style={styles.benefitItem}>• Async state sin configuración extra</Text>
            <Text style={styles.benefitItem}>• Optimizaciones automáticas de renders</Text>
            <Text style={styles.benefitItem}>• Ecosystem rico (utils, immer, query, etc.)</Text>
            <Text style={styles.benefitItem}>• Perfect para component-level state</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ⚛️ Jotai permite crear atoms granulares que se combinan para formar estado complejo
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
  counterContainer: {
    alignItems: 'center',
    gap: 16,
  },
  counterValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007ACC',
  },
  doubleValue: {
    fontSize: 18,
    color: '#007ACC',
    opacity: 0.8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  primaryButton: {
    backgroundColor: '#007ACC',
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  buttonTextSecondary: {
    color: '#333',
    fontWeight: '600',
    fontSize: 14,
  },
  nameContainer: {
    alignItems: 'center',
    gap: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007ACC',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    width: '100%',
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  weatherContainer: {
    alignItems: 'center',
  },
  weatherCard: {
    backgroundColor: '#e8f4fd',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007ACC',
  },
  weatherText: {
    fontSize: 18,
    color: '#0056b3',
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  statsContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  statsText: {
    fontSize: 14,
    color: '#666',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeFilter: {
    backgroundColor: '#007ACC',
    borderColor: '#007ACC',
  },
  filterButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
  },
  todosContainer: {
    gap: 8,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  todoCheck: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoCheckText: {
    fontSize: 16,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    padding: 4,
  },
  deleteButtonText: {
    fontSize: 16,
  },
  codeSection: {
    backgroundColor: '#2d3748',
    margin: 10,
    padding: 16,
    borderRadius: 12,
  },
  codeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  codeBlock: {
    backgroundColor: '#1a202c',
    padding: 12,
    borderRadius: 8,
  },
  codeText: {
    color: '#a0aec0',
    fontFamily: 'Courier',
    fontSize: 10,
    lineHeight: 14,
  },
  benefitsSection: {
    backgroundColor: '#e8f6f3',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007ACC',
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007ACC',
    marginBottom: 12,
  },
  benefitsList: {
    gap: 8,
  },
  benefitItem: {
    fontSize: 14,
    color: '#007ACC',
    lineHeight: 20,
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

export default JotaiExample;
