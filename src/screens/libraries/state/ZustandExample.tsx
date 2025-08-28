import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCounterStore } from '../../../store/zustand/counterStore';
import { useTodoStore } from '../../../store/zustand/todoStore';
import { useUserStore } from '../../../store/zustand/userStore';

// Counter Section with Persistence
const CounterSection = () => {
  const {
    count,
    history,
    increment,
    decrement,
    incrementByAmount,
    reset,
    clearHistory,
  } = useCounterStore();
  
  const [customAmount, setCustomAmount] = useState('');

  const handleIncrementByAmount = () => {
    const amount = parseInt(customAmount);
    if (!isNaN(amount)) {
      incrementByAmount(amount);
      setCustomAmount('');
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🐻 Zustand Counter (Persisted)</Text>
      
      <View style={styles.counterContainer}>
        <Text style={styles.counterValue}>Count: {count}</Text>
        
        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.button, styles.primaryButton]}
            onPress={increment}
          >
            <Text style={styles.buttonText}>+1</Text>
          </Pressable>
          
          <Pressable
            style={[styles.button, styles.secondaryButton]}
            onPress={decrement}
          >
            <Text style={styles.buttonTextSecondary}>-1</Text>
          </Pressable>
          
          <Pressable
            style={[styles.button, styles.dangerButton]}
            onPress={reset}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </Pressable>
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Custom amount"
            value={customAmount}
            onChangeText={setCustomAmount}
            keyboardType="numeric"
          />
          <Pressable
            style={[styles.button, styles.primaryButton]}
            onPress={handleIncrementByAmount}
          >
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        </View>

        {history.length > 0 && (
          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>History (Persisted):</Text>
            <Text style={styles.historyText}>
              {history.slice(-5).join(' → ')} → {count}
            </Text>
            <Pressable
              style={[styles.button, styles.secondaryButton, styles.smallButton]}
              onPress={clearHistory}
            >
              <Text style={styles.buttonTextSecondary}>Clear History</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

// Todos Section with Subscriptions
const TodosSection = () => {
  const {
    todos,
    filter,
    isLoading,
    addTodo,
    toggleTodo,
    deleteTodo,
    setFilter,
    clearCompleted,
    markAllCompleted,
    loadTodos,
    addTodoAsync,
    filteredTodos,
    stats,
  } = useTodoStore();
  
  const [newTodoText, setNewTodoText] = useState('');
  const currentStats = stats();
  const currentFilteredTodos = filteredTodos();

  useEffect(() => {
    if (todos.length === 0) {
      loadTodos();
    }
  }, [loadTodos, todos.length]);

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      addTodo(newTodoText.trim());
      setNewTodoText('');
    }
  };

  const handleAddTodoAsync = () => {
    if (newTodoText.trim()) {
      addTodoAsync(newTodoText.trim());
      setNewTodoText('');
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>📝 Todos with Computed Values</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Add new todo..."
          value={newTodoText}
          onChangeText={setNewTodoText}
          onSubmitEditing={handleAddTodo}
        />
        <Pressable
          style={[styles.button, styles.primaryButton]}
          onPress={handleAddTodo}
        >
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>

      <Pressable
        style={[styles.button, styles.secondaryButton]}
        onPress={handleAddTodoAsync}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#333" />
        ) : (
          <Text style={styles.buttonTextSecondary}>Add Async</Text>
        )}
      </Pressable>

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
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.todoStats}>
        <Text style={styles.statsText}>
          Total: {currentStats.total} | Active: {currentStats.active} | Completed: {currentStats.completed}
        </Text>
      </View>

      <View style={styles.todosContainer}>
        {currentFilteredTodos.map((todo) => (
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
            
            <View style={[styles.priorityBadge, styles[`priority${todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}`]]}>
              <Text style={styles.priorityText}>{todo.priority}</Text>
            </View>
            
            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteTodo(todo.id)}
            >
              <Text style={styles.deleteButtonText}>🗑️</Text>
            </Pressable>
          </View>
        ))}
      </View>

      {todos.length > 0 && (
        <View style={styles.todoActions}>
          <Pressable
            style={[styles.button, styles.secondaryButton, styles.smallButton]}
            onPress={markAllCompleted}
          >
            <Text style={styles.buttonTextSecondary}>Complete All</Text>
          </Pressable>
          
          <Pressable
            style={[styles.button, styles.dangerButton, styles.smallButton]}
            onPress={clearCompleted}
          >
            <Text style={styles.buttonText}>Clear Completed</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

// Users Section with Immer
const UsersSection = () => {
  const {
    users,
    currentUser,
    isLoading,
    searchQuery,
    sortBy,
    setCurrentUser,
    setSearchQuery,
    setSortBy,
    fetchUsers,
    updateUserAsync,
    filteredUsers,
    userCount,
    activeUserCount,
  } = useUserStore();

  const currentFilteredUsers = filteredUsers();

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
  }, [fetchUsers, users.length]);

  const handleToggleUserStatus = (id: string, currentStatus: boolean) => {
    updateUserAsync(id, { isActive: !currentStatus });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>👥 Users with Immer</Text>

      <View style={styles.userStats}>
        <Text style={styles.statsText}>
          Total Users: {userCount()} | Active: {activeUserCount()}
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Search users..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.sortButtons}>
        {(['name', 'email', 'status'] as const).map((sortType) => (
          <Pressable
            key={sortType}
            style={[
              styles.button,
              styles.secondaryButton,
              styles.smallButton,
              sortBy === sortType && styles.activeSort
            ]}
            onPress={() => setSortBy(sortType)}
          >
            <Text style={[
              styles.buttonTextSecondary,
              sortBy === sortType && styles.activeSortText
            ]}>
              Sort by {sortType}
            </Text>
          </Pressable>
        ))}
      </View>

      {isLoading && users.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading users...</Text>
        </View>
      ) : (
        <View style={styles.usersContainer}>
          {currentFilteredUsers.map((user) => (
            <Pressable
              key={user.id}
              style={[
                styles.userItem,
                currentUser?.id === user.id && styles.selectedUserItem
              ]}
              onPress={() => setCurrentUser(user)}
            >
              <Text style={styles.userAvatar}>{user.avatar}</Text>
              
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
                <Text style={styles.userSettings}>
                  Theme: {user.settings.theme} | Lang: {user.settings.language}
                </Text>
                <Text style={styles.userStatus}>
                  {user.isActive ? '🟢 Active' : '🔴 Inactive'}
                </Text>
              </View>
              
              <Pressable
                style={[
                  styles.statusButton,
                  user.isActive ? styles.activeStatus : styles.inactiveStatus
                ]}
                onPress={() => handleToggleUserStatus(user.id, user.isActive)}
              >
                <Text style={styles.statusButtonText}>
                  {user.isActive ? 'Deactivate' : 'Activate'}
                </Text>
              </Pressable>
            </Pressable>
          ))}
        </View>
      )}

      {currentUser && (
        <View style={styles.selectedUserDetails}>
          <Text style={styles.selectedUserTitle}>Selected User Settings:</Text>
          <Text style={styles.selectedUserText}>
            Name: {currentUser.name}
          </Text>
          <Text style={styles.selectedUserText}>
            Email: {currentUser.email}
          </Text>
          <Text style={styles.selectedUserText}>
            Theme: {currentUser.settings.theme}
          </Text>
          <Text style={styles.selectedUserText}>
            Notifications: {currentUser.settings.notifications ? 'On' : 'Off'}
          </Text>
          <Text style={styles.selectedUserText}>
            Language: {currentUser.settings.language}
          </Text>
        </View>
      )}
    </View>
  );
};

const ZustandExample = () => {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Zustand</Text>
          <Text style={styles.subtitle}>
            State management ligero y simple sin boilerplate
          </Text>
        </View>

        <CounterSection />
        <TodosSection />
        <UsersSection />

        <View style={styles.codeSection}>
          <Text style={styles.codeTitle}>💡 Zustand Features</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{`// 1. Simple Store Creation
import { create } from 'zustand';

const useStore = create((set, get) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

// 2. Persistence Middleware
import { persist, createJSONStorage } from 'zustand/middleware';

const usePersistedStore = create(
  persist(
    (set) => ({ ... }),
    {
      name: 'my-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// 3. Immer Middleware for Complex Updates
import { immer } from 'zustand/middleware/immer';

const useImmerStore = create(
  immer((set) => ({
    users: [],
    updateUser: (id, updates) => set((state) => {
      const user = state.users.find(u => u.id === id);
      if (user) Object.assign(user, updates);
    }),
  }))
);

// 4. Subscriptions and Computed Values
const useStore = create((set, get) => ({
  todos: [],
  filteredTodos: () => {
    const { todos, filter } = get();
    return todos.filter(todo => 
      filter === 'all' || 
      (filter === 'active' && !todo.completed)
    );
  },
}));

// 5. Usage in Components
const MyComponent = () => {
  const { count, increment } = useStore();
  // Automatically subscribes to changes
  return <button onClick={increment}>{count}</button>;
};`}</Text>
          </View>
        </View>

        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>🐻 Ventajas de Zustand</Text>
          <View style={styles.benefitsList}>
            <Text style={styles.benefitItem}>• Sin boilerplate - configuración mínima</Text>
            <Text style={styles.benefitItem}>• TypeScript nativo sin configuración extra</Text>
            <Text style={styles.benefitItem}>• Múltiples stores sin providers</Text>
            <Text style={styles.benefitItem}>• Middleware ecosystem (persist, immer, etc.)</Text>
            <Text style={styles.benefitItem}>• Subscriptions selectivas para performance</Text>
            <Text style={styles.benefitItem}>• Computed values y getters simples</Text>
            <Text style={styles.benefitItem}>• Solo 2.9kb gzipped</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🐻 Zustand ofrece simplicidad sin sacrificar funcionalidades avanzadas
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
    color: '#2C3E50',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  smallButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 50,
  },
  primaryButton: {
    backgroundColor: '#2C3E50',
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  activeSort: {
    backgroundColor: '#2C3E50',
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
  activeSortText: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  historyContainer: {
    alignItems: 'center',
    gap: 8,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  historyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
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
    backgroundColor: '#2C3E50',
    borderColor: '#2C3E50',
  },
  filterButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
  },
  todoStats: {
    alignItems: 'center',
    marginBottom: 12,
  },
  userStats: {
    alignItems: 'center',
    marginBottom: 12,
  },
  statsText: {
    fontSize: 14,
    color: '#666',
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
  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  priorityLow: {
    backgroundColor: '#e6ffe6',
  },
  priorityMedium: {
    backgroundColor: '#fff3e6',
  },
  priorityHigh: {
    backgroundColor: '#ffe6e6',
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#333',
  },
  deleteButton: {
    padding: 4,
  },
  deleteButtonText: {
    fontSize: 16,
  },
  todoActions: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    marginTop: 16,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  usersContainer: {
    gap: 8,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedUserItem: {
    borderColor: '#2C3E50',
    backgroundColor: '#e8f4fd',
  },
  userAvatar: {
    fontSize: 32,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  userSettings: {
    fontSize: 12,
    color: '#999',
  },
  userStatus: {
    fontSize: 12,
    color: '#999',
  },
  statusButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  activeStatus: {
    backgroundColor: '#ffe6e6',
  },
  inactiveStatus: {
    backgroundColor: '#e6ffe6',
  },
  statusButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  selectedUserDetails: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#e8f4fd',
    borderRadius: 8,
  },
  selectedUserTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0056b3',
    marginBottom: 8,
  },
  selectedUserText: {
    fontSize: 12,
    color: '#0056b3',
    marginBottom: 2,
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
    borderLeftColor: '#2C3E50',
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  benefitsList: {
    gap: 8,
  },
  benefitItem: {
    fontSize: 14,
    color: '#2C3E50',
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

export default ZustandExample;
