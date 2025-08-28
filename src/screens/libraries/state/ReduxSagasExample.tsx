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
import { Provider } from 'react-redux';
import { sagaStore, useSagaDispatch, useSagaSelector } from '../../../store/redux/sagaStore';
import {
  increment,
  decrement,
  reset,
  incrementAsync,
  clearHistory,
} from '../../../store/redux/slices/counterSagaSlice';
import {
  fetchTodosRequest,
  addTodoRequest,
  updateTodoRequest,
  markAllCompletedRequest,
  setFilter,
  clearError,
} from '../../../store/redux/slices/todosSagaSlice';
import {
  fetchUsersRequest,
  updateUserRequest,
  refreshUsersRequest,
  setSearchQuery,
  setSelectedUser,
} from '../../../store/redux/slices/usersSagaSlice';
import {
  fetchWeatherRequest,
  fetchForecastRequest,
  refreshAllWeatherRequest,
  clearWeatherData,
} from '../../../store/redux/slices/weatherSagaSlice';

// Counter Section with Async Saga
const CounterSection = () => {
  const dispatch = useSagaDispatch();
  const { value, isLoading, history } = useSagaSelector((state) => state.counter);
  const [amount, setAmount] = useState('5');

  const handleAsyncIncrement = () => {
    const incrementValue = parseInt(amount) || 1;
    dispatch(incrementAsync(incrementValue));
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🌀 Async Counter with Sagas</Text>
      
      <View style={styles.counterContainer}>
        <Text style={styles.counterValue}>Value: {value}</Text>
        
        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.button, styles.primaryButton]}
            onPress={() => dispatch(increment())}
          >
            <Text style={styles.buttonText}>+1 Sync</Text>
          </Pressable>
          
          <Pressable
            style={[styles.button, styles.secondaryButton]}
            onPress={() => dispatch(decrement())}
          >
            <Text style={styles.buttonTextSecondary}>-1 Sync</Text>
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
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <Pressable
            style={[styles.button, styles.sagaButton, isLoading && styles.disabledButton]}
            onPress={handleAsyncIncrement}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>+ Async (Saga)</Text>
            )}
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
              <Text style={styles.buttonTextSecondary}>Clear</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

// Todos Section with Complex Sagas
const TodosSection = () => {
  const dispatch = useSagaDispatch();
  const { items, filter, isLoading, isAdding, error } = useSagaSelector((state) => state.todos);
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    dispatch(fetchTodosRequest());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      dispatch(addTodoRequest(newTodoText.trim()));
      setNewTodoText('');
    }
  };

  const handleToggleTodo = (id: string) => {
    const todo = items.find(t => t.id === id);
    if (todo) {
      dispatch(updateTodoRequest({ 
        id, 
        updates: { completed: !todo.completed } 
      }));
    }
  };

  const filteredTodos = items.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>📝 Todos with Saga Effects</Text>

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

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Add new todo with saga..."
          value={newTodoText}
          onChangeText={setNewTodoText}
          onSubmitEditing={handleAddTodo}
        />
        <Pressable
          style={[styles.button, styles.sagaButton, isAdding && styles.disabledButton]}
          onPress={handleAddTodo}
          disabled={isAdding}
        >
          {isAdding ? (
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

      {isLoading && items.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#999999" />
          <Text style={styles.loadingText}>Loading todos with saga...</Text>
        </View>
      ) : (
        <View style={styles.todosContainer}>
          {filteredTodos.map((todo) => (
            <View key={todo.id} style={styles.todoItem}>
              <Pressable
                style={styles.todoCheck}
                onPress={() => handleToggleTodo(todo.id)}
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
            </View>
          ))}
        </View>
      )}

      <View style={styles.sagaActions}>
        <Pressable
          style={[styles.button, styles.sagaButton, styles.smallButton]}
          onPress={() => dispatch(markAllCompletedRequest())}
        >
          <Text style={styles.buttonText}>Mark All (Saga)</Text>
        </Pressable>
        
        <Pressable
          style={[styles.button, styles.secondaryButton, styles.smallButton]}
          onPress={() => dispatch(fetchTodosRequest())}
        >
          <Text style={styles.buttonTextSecondary}>Refresh</Text>
        </Pressable>
      </View>
    </View>
  );
};

// Users Section with Race Conditions
const UsersSection = () => {
  const dispatch = useSagaDispatch();
  const { users, isLoading, error, searchQuery } = useSagaSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const handleToggleStatus = (userId: string, currentStatus: boolean) => {
    dispatch(updateUserRequest({ 
      userId, 
      updates: { isActive: !currentStatus } 
    }));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>👥 Users with Race Conditions</Text>

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

      <View style={styles.buttonRow}>
        <Pressable
          style={[styles.button, styles.sagaButton, styles.smallButton]}
          onPress={() => dispatch(refreshUsersRequest('refresh'))}
        >
          <Text style={styles.buttonText}>Refresh (Race)</Text>
        </Pressable>
        
        <Pressable
          style={[styles.button, styles.secondaryButton, styles.smallButton]}
          onPress={() => dispatch(fetchUsersRequest())}
        >
          <Text style={styles.buttonTextSecondary}>Normal Fetch</Text>
        </Pressable>
      </View>

      {isLoading && users.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#999999" />
          <Text style={styles.loadingText}>Loading users with race condition...</Text>
        </View>
      ) : (
        <View style={styles.usersContainer}>
          {filteredUsers.map((user) => (
            <View key={user.id} style={styles.userItem}>
              <Text style={styles.userAvatar}>{user.avatar}</Text>
              
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
                <Text style={styles.userStatus}>
                  {user.isActive ? '🟢 Online' : '🔴 Offline'}
                </Text>
              </View>
              
              <Pressable
                style={[
                  styles.statusButton,
                  user.isActive ? styles.activeStatus : styles.inactiveStatus
                ]}
                onPress={() => handleToggleStatus(user.id, user.isActive)}
              >
                <Text style={styles.statusButtonText}>
                  {user.isActive ? 'Deactivate' : 'Activate'}
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

// Weather Section with Fork/Join Patterns
const WeatherSection = () => {
  const dispatch = useSagaDispatch();
  const { currentWeather, forecast, isLoading, isForecastLoading, error } = useSagaSelector((state) => state.weather);
  const [location, setLocation] = useState('Madrid');

  const handleFetchWeather = () => {
    dispatch(fetchWeatherRequest(location));
  };

  const handleFetchForecast = () => {
    dispatch(fetchForecastRequest(location));
  };

  const handleRefreshAll = () => {
    dispatch(refreshAllWeatherRequest(location));
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🌤️ Weather with Fork/Join</Text>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      )}

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Enter location"
          value={location}
          onChangeText={setLocation}
        />
        <Pressable
          style={[styles.button, styles.sagaButton]}
          onPress={handleRefreshAll}
        >
          <Text style={styles.buttonText}>Refresh All</Text>
        </Pressable>
      </View>

      <View style={styles.buttonRow}>
        <Pressable
          style={[styles.button, styles.secondaryButton, styles.smallButton]}
          onPress={handleFetchWeather}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#333" />
          ) : (
            <Text style={styles.buttonTextSecondary}>Weather Only</Text>
          )}
        </Pressable>
        
        <Pressable
          style={[styles.button, styles.secondaryButton, styles.smallButton]}
          onPress={handleFetchForecast}
          disabled={isForecastLoading}
        >
          {isForecastLoading ? (
            <ActivityIndicator size="small" color="#333" />
          ) : (
            <Text style={styles.buttonTextSecondary}>Forecast Only</Text>
          )}
        </Pressable>
        
        <Pressable
          style={[styles.button, styles.dangerButton, styles.smallButton]}
          onPress={() => dispatch(clearWeatherData())}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </Pressable>
      </View>

      {currentWeather && (
        <View style={styles.weatherCard}>
          <Text style={styles.weatherTitle}>Current Weather</Text>
          <Text style={styles.weatherLocation}>{currentWeather.location}</Text>
          <Text style={styles.weatherMain}>
            {currentWeather.icon} {currentWeather.temperature}°C
          </Text>
          <Text style={styles.weatherCondition}>{currentWeather.condition}</Text>
          <Text style={styles.weatherDetails}>
            Humidity: {currentWeather.humidity}% | Wind: {currentWeather.windSpeed} km/h
          </Text>
        </View>
      )}

      {forecast.length > 0 && (
        <View style={styles.forecastContainer}>
          <Text style={styles.forecastTitle}>5-Day Forecast</Text>
          <View style={styles.forecastList}>
            {forecast.map((day, index) => (
              <View key={index} style={styles.forecastItem}>
                <Text style={styles.forecastIcon}>{day.icon}</Text>
                <Text style={styles.forecastTemp}>{day.temperature}°</Text>
                <Text style={styles.forecastCondition}>{day.condition}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

// Main Content Component
const SagaContent = () => {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Redux Sagas</Text>
          <Text style={styles.subtitle}>
            Manejo de side effects con generadores y effect handlers
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>🌀 ¿Cuándo usar Redux Sagas?</Text>
          <Text style={styles.infoText}>
            • Apps con lógica asíncrona compleja (race conditions, timeouts){'\n'}
            • Cuando necesitas cancelar operaciones en progreso{'\n'}
            • Testing de flujos asíncronos complejos{'\n'}
            • Background tasks y polling de datos
          </Text>
          
          <Text style={styles.infoTitle}>⚙️ ¿Cómo funciona?</Text>
          <Text style={styles.infoText}>
            Redux Saga usa generadores para crear funciones que pueden pausarse y reanudarse. 
            Los "effects" como call, put, take, fork permiten manejar async operations 
            de forma declarativa y testeable. Los watchers escuchan acciones y spawnan workers.
          </Text>
        </View>

        <CounterSection />
        <TodosSection />
        <UsersSection />
        <WeatherSection />

        <View style={styles.codeSection}>
          <Text style={styles.codeTitle}>💡 Redux Saga Effects</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{`// 1. Basic Saga with Effects
function* fetchUserSaga(action) {
  try {
    // Call API
    const user = yield call(api.fetchUser, action.payload.id);
    
    // Dispatch success action
    yield put(fetchUserSuccess(user));
    
    // Fork background task
    yield fork(trackUserActivity, user.id);
    
  } catch (error) {
    yield put(fetchUserFailure(error.message));
  }
}

// 2. Watcher Saga
function* watchFetchUser() {
  yield takeEvery(FETCH_USER_REQUEST, fetchUserSaga);
}

// 3. Race Conditions
function* fetchWithTimeout(action) {
  const { response, timeout } = yield race({
    response: call(api.fetchData, action.payload),
    timeout: delay(5000)
  });
  
  if (timeout) {
    yield put(fetchTimeout());
  } else {
    yield put(fetchSuccess(response));
  }
}

// 4. Cancellation
function* cancellableFetch() {
  try {
    const data = yield call(api.fetchData);
    yield put(fetchSuccess(data));
  } finally {
    if (yield cancelled()) {
      // Cleanup logic
      yield call(api.cancelRequest);
    }
  }
}

// 5. Parallel Execution
function* fetchAllData() {
  const [users, posts, comments] = yield all([
    call(api.fetchUsers),
    call(api.fetchPosts),
    call(api.fetchComments)
  ]);
  
  yield put(dataLoaded({ users, posts, comments }));
}`}</Text>
          </View>
        </View>

        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>🌀 Ventajas de Redux Sagas</Text>
          <View style={styles.benefitsList}>
            <Text style={styles.benefitItem}>• Control granular de async flows</Text>
            <Text style={styles.benefitItem}>• Cancelación automática de operaciones</Text>
            <Text style={styles.benefitItem}>• Testing declarativo y determinista</Text>
            <Text style={styles.benefitItem}>• Race conditions y timeouts manejables</Text>
            <Text style={styles.benefitItem}>• Background tasks y polling</Text>
            <Text style={styles.benefitItem}>• Fork/join para paralelismo</Text>
            <Text style={styles.benefitItem}>• DevTools integration completa</Text>
            <Text style={styles.benefitItem}>• Separation of concerns clara</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🌀 Redux Sagas convierte operaciones async complejas en código declarativo y testeable
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Main Component with Provider
const ReduxSagasExample = () => {
  return (
    <Provider store={sagaStore}>
      <SagaContent />
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
  infoSection: {
    backgroundColor: '#f0f0f0',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#999999',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
    marginTop: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
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
    color: '#999999',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
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
  sagaButton: {
    backgroundColor: '#999999',
  },
  disabledButton: {
    opacity: 0.6,
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
    backgroundColor: '#999999',
    borderColor: '#999999',
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
    marginBottom: 16,
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
  sagaActions: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
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
  weatherCard: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#999999',
  },
  weatherTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  weatherLocation: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  weatherMain: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  weatherCondition: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  weatherDetails: {
    fontSize: 14,
    color: '#999',
  },
  forecastContainer: {
    marginTop: 16,
  },
  forecastTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  forecastList: {
    flexDirection: 'row',
    gap: 8,
  },
  forecastItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 8,
  },
  forecastIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  forecastTemp: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  forecastCondition: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
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
    backgroundColor: '#f0f0f0',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#999999',
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 12,
  },
  benefitsList: {
    gap: 8,
  },
  benefitItem: {
    fontSize: 14,
    color: '#666',
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

export default ReduxSagasExample;
