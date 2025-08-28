import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { reduxStore, useAppDispatch, useAppSelector } from '../../../store/redux/store';
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
  clearHistory,
} from '../../../store/redux/slices/counterSlice';
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
  fetchTodos,
  addTodoAsync,
  markAllCompleted,
  clearCompleted,
} from '../../../store/redux/slices/todosSlice';
import {
  fetchUsers,
  setSelectedUser,
  setSearchQuery,
  updateUserStatus,
  sortUsers,
} from '../../../store/redux/slices/usersSlice';
import {
  loginUser,
  logoutUser,
  checkAuthStatus,
  clearError,
} from '../../../store/redux/slices/authSlice';

// Counter Component
const CounterSection = () => {
  const dispatch = useAppDispatch();
  const { value, history, isLoading } = useAppSelector((state) => state.counter);
  const [customAmount, setCustomAmount] = useState('');

  const handleIncrementByAmount = () => {
    const amount = parseInt(customAmount);
    if (!isNaN(amount)) {
      dispatch(incrementByAmount(amount));
      setCustomAmount('');
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🔢 Counter State</Text>
      
      <View style={styles.counterContainer}>
        <Text style={styles.counterValue}>Value: {value}</Text>
        
        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.button, styles.primaryButton]}
            onPress={() => dispatch(increment())}
          >
            <Text style={styles.buttonText}>+1</Text>
          </Pressable>
          
          <Pressable
            style={[styles.button, styles.secondaryButton]}
            onPress={() => dispatch(decrement())}
          >
            <Text style={styles.buttonTextSecondary}>-1</Text>
          </Pressable>
          
          <Pressable
            style={[styles.button, styles.dangerButton]}
            onPress={() => dispatch(reset())}
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
            <Text style={styles.historyTitle}>History:</Text>
            <Text style={styles.historyText}>
              {history.slice(-5).join(' → ')} → {value}
            </Text>
            <Pressable
              style={[styles.button, styles.secondaryButton, styles.smallButton]}
              onPress={() => dispatch(clearHistory())}
            >
              <Text style={styles.buttonTextSecondary}>Clear History</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

// Todos Component
const TodosSection = () => {
  const dispatch = useAppDispatch();
  const { items, filter, isLoading, error } = useAppSelector((state) => state.todos);
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      dispatch(addTodoAsync(newTodoText.trim()));
      setNewTodoText('');
    }
  };

  const filteredTodos = items.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = items.filter(todo => todo.completed).length;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>📝 Async Todos State</Text>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      )}

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
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Add</Text>
          )}
        </Pressable>
      </View>

      <View style={styles.filterRow}>
        {(['all', 'active', 'completed'] as const).map((filterType) => (
          <Pressable
            key={filterType}
            style={[
              styles.filterButton,
              filter === filterType && styles.activeFilter
            ]}
            onPress={() => dispatch(setFilter(filterType))}
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
          Total: {items.length} | Active: {items.length - completedCount} | Completed: {completedCount}
        </Text>
      </View>

      {isLoading && items.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading todos...</Text>
        </View>
      ) : (
        <View style={styles.todosContainer}>
          {filteredTodos.map((todo) => (
            <View key={todo.id} style={styles.todoItem}>
              <Pressable
                style={styles.todoCheck}
                onPress={() => dispatch(toggleTodo(todo.id))}
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
                onPress={() => dispatch(deleteTodo(todo.id))}
              >
                <Text style={styles.deleteButtonText}>🗑️</Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}

      {items.length > 0 && (
        <View style={styles.todoActions}>
          <Pressable
            style={[styles.button, styles.secondaryButton, styles.smallButton]}
            onPress={() => dispatch(markAllCompleted())}
          >
            <Text style={styles.buttonTextSecondary}>Complete All</Text>
          </Pressable>
          
          <Pressable
            style={[styles.button, styles.dangerButton, styles.smallButton]}
            onPress={() => dispatch(clearCompleted())}
          >
            <Text style={styles.buttonText}>Clear Completed</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

// Users Component
const UsersSection = () => {
  const dispatch = useAppDispatch();
  const { users, selectedUser, isLoading, error, searchQuery } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>👥 Users State</Text>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Search users..."
        value={searchQuery}
        onChangeText={(text) => dispatch(setSearchQuery(text))}
      />

      <View style={styles.sortButtons}>
        <Pressable
          style={[styles.button, styles.secondaryButton, styles.smallButton]}
          onPress={() => dispatch(sortUsers('name'))}
        >
          <Text style={styles.buttonTextSecondary}>Sort by Name</Text>
        </Pressable>
        
        <Pressable
          style={[styles.button, styles.secondaryButton, styles.smallButton]}
          onPress={() => dispatch(sortUsers('lastSeen'))}
        >
          <Text style={styles.buttonTextSecondary}>Sort by Activity</Text>
        </Pressable>
      </View>

      {isLoading && users.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading users...</Text>
        </View>
      ) : (
        <View style={styles.usersContainer}>
          {filteredUsers.map((user) => (
            <Pressable
              key={user.id}
              style={[
                styles.userItem,
                selectedUser?.id === user.id && styles.selectedUserItem
              ]}
              onPress={() => dispatch(setSelectedUser(user))}
            >
              <Text style={styles.userAvatar}>{user.avatar}</Text>
              
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
                <Text style={styles.userLastSeen}>
                  {user.isActive ? '🟢 Online' : `🔴 ${new Date(user.lastSeen).toLocaleDateString()}`}
                </Text>
              </View>
              
              <Pressable
                style={[
                  styles.statusButton,
                  user.isActive ? styles.activeStatus : styles.inactiveStatus
                ]}
                onPress={() => dispatch(updateUserStatus({ userId: user.id, isActive: !user.isActive }))}
              >
                <Text style={styles.statusButtonText}>
                  {user.isActive ? 'Deactivate' : 'Activate'}
                </Text>
              </Pressable>
            </Pressable>
          ))}
        </View>
      )}

      {selectedUser && (
        <View style={styles.selectedUserDetails}>
          <Text style={styles.selectedUserTitle}>Selected User:</Text>
          <Text style={styles.selectedUserText}>
            {selectedUser.name} ({selectedUser.email})
          </Text>
        </View>
      )}
    </View>
  );
};

// Auth Component
const AuthSection = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleCheckAuth = () => {
    dispatch(checkAuthStatus());
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🔐 Auth State</Text>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <Pressable
            style={[styles.button, styles.secondaryButton, styles.smallButton]}
            onPress={() => dispatch(clearError())}
          >
            <Text style={styles.buttonTextSecondary}>Clear Error</Text>
          </Pressable>
        </View>
      )}

      {!isAuthenticated ? (
        <View style={styles.loginForm}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <Pressable
            style={[styles.button, styles.primaryButton]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </Pressable>

          <Pressable
            style={[styles.button, styles.secondaryButton]}
            onPress={handleCheckAuth}
            disabled={isLoading}
          >
            <Text style={styles.buttonTextSecondary}>Check Stored Auth</Text>
          </Pressable>

          <Text style={styles.demoText}>
            Demo credentials: demo@example.com / password
          </Text>
        </View>
      ) : (
        <View style={styles.userProfile}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.userProfileAvatar}>{user?.avatar}</Text>
          <Text style={styles.userProfileName}>{user?.name}</Text>
          <Text style={styles.userProfileEmail}>{user?.email}</Text>
          <Text style={styles.userProfileRole}>Role: {user?.role}</Text>
          
          <Pressable
            style={[styles.button, styles.dangerButton]}
            onPress={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Logout</Text>
            )}
          </Pressable>
        </View>
      )}
    </View>
  );
};

// Main Content Component
const ReduxContent = () => {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Redux Toolkit</Text>
          <Text style={styles.subtitle}>
            Store moderno con RTK, slices y async thunks
          </Text>
        </View>

        <CounterSection />
        <TodosSection />
        <UsersSection />
        <AuthSection />

        <View style={styles.codeSection}>
          <Text style={styles.codeTitle}>💡 Redux Toolkit Features</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{`// 1. Store Configuration
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    todos: todosSlice,
  },
  devTools: __DEV__,
});

// 2. Slice Creation
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1; // Immer allows mutations
    },
  },
});

// 3. Async Thunks
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getTodos();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 4. Typed Hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;`}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🔴 Redux Toolkit simplifica Redux con menos boilerplate y mejores patterns
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Main Component with Provider
const ReduxToolkitExample = () => {
  return (
    <Provider store={reduxStore}>
      <ReduxContent />
    </Provider>
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
    color: '#007AFF',
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
    backgroundColor: '#007AFF',
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
  errorContainer: {
    backgroundColor: '#ffe6e6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  errorText: {
    color: '#cc0000',
    fontSize: 14,
    marginBottom: 8,
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
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
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
    borderColor: '#007AFF',
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
  userLastSeen: {
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
    marginBottom: 4,
  },
  selectedUserText: {
    fontSize: 14,
    color: '#0056b3',
  },
  loginForm: {
    gap: 12,
  },
  userProfile: {
    alignItems: 'center',
    gap: 12,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34C759',
  },
  userProfileAvatar: {
    fontSize: 48,
  },
  userProfileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userProfileEmail: {
    fontSize: 16,
    color: '#666',
  },
  userProfileRole: {
    fontSize: 14,
    color: '#999',
    textTransform: 'capitalize',
  },
  demoText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
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

export default ReduxToolkitExample;
