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
import { proxy, useSnapshot } from 'valtio';
import { subscribeKey, watch } from 'valtio/utils';

// Counter state with proxy
const counterState = proxy({
  count: 0,
  history: [] as number[],
  increment() {
    this.history.push(this.count);
    this.count++;
  },
  decrement() {
    this.history.push(this.count);
    this.count--;
  },
  incrementByAmount(amount: number) {
    this.history.push(this.count);
    this.count += amount;
  },
  reset() {
    this.history.push(this.count);
    this.count = 0;
  },
  clearHistory() {
    this.history = [];
  },
});

// User state with nested objects
const userState = proxy({
  profile: {
    name: 'Usuario Demo',
    email: 'demo@example.com',
    avatar: '👤',
  },
  preferences: {
    theme: 'light' as 'light' | 'dark',
    language: 'es',
    notifications: true,
  },
  updateProfile(updates: Partial<typeof userState.profile>) {
    Object.assign(this.profile, updates);
  },
  updatePreferences(updates: Partial<typeof userState.preferences>) {
    Object.assign(this.preferences, updates);
  },
  toggleTheme() {
    this.preferences.theme = this.preferences.theme === 'light' ? 'dark' : 'light';
  },
});

// Shopping cart state
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
}

const cartState = proxy({
  items: [] as CartItem[],
  get totalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },
  get totalPrice() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },
  addItem(product: Omit<CartItem, 'quantity'>) {
    const existingItem = this.items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
  },
  removeItem(productId: string) {
    const index = this.items.findIndex(item => item.id === productId);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  },
  updateQuantity(productId: string, quantity: number) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
      }
    }
  },
  clearCart() {
    this.items = [];
  },
});

// Todo state with complex operations
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
}

const todoState = proxy({
  items: [] as Todo[],
  filter: 'all' as 'all' | 'active' | 'completed',
  get filteredItems() {
    if (this.filter === 'active') return this.items.filter(todo => !todo.completed);
    if (this.filter === 'completed') return this.items.filter(todo => todo.completed);
    return this.items;
  },
  get stats() {
    const completed = this.items.filter(todo => todo.completed).length;
    return {
      total: this.items.length,
      completed,
      active: this.items.length - completed,
    };
  },
  addTodo(text: string, priority: Todo['priority'] = 'medium') {
    this.items.push({
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
      priority,
    });
  },
  toggleTodo(id: string) {
    const todo = this.items.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  },
  deleteTodo(id: string) {
    const index = this.items.findIndex(todo => todo.id === id);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  },
  setFilter(filter: typeof this.filter) {
    this.filter = filter;
  },
  clearCompleted() {
    this.items = this.items.filter(todo => !todo.completed);
  },
});

// Subscribe to changes (for debugging)
subscribeKey(counterState, 'count', (count) => {
  console.log('Counter changed to:', count);
});

// Watch for theme changes
watch((get) => get(userState.preferences.theme), (theme) => {
  console.log('Theme changed to:', theme);
});

// Mock products for cart
const mockProducts = [
  { id: '1', name: 'MacBook Pro', price: 1999, emoji: '💻' },
  { id: '2', name: 'iPhone 15', price: 999, emoji: '📱' },
  { id: '3', name: 'AirPods Pro', price: 249, emoji: '🎧' },
  { id: '4', name: 'iPad Air', price: 599, emoji: '📱' },
];

// Counter Section
const CounterSection = () => {
  const snap = useSnapshot(counterState);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🔄 Proxy Counter</Text>
      
      <View style={styles.counterContainer}>
        <Text style={styles.counterValue}>Count: {snap.count}</Text>
        
        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.button, styles.primaryButton]}
            onPress={() => counterState.increment()}
          >
            <Text style={styles.buttonText}>+1</Text>
          </Pressable>
          
          <Pressable
            style={[styles.button, styles.secondaryButton]}
            onPress={() => counterState.decrement()}
          >
            <Text style={styles.buttonTextSecondary}>-1</Text>
          </Pressable>
          
          <Pressable
            style={[styles.button, styles.primaryButton]}
            onPress={() => counterState.incrementByAmount(5)}
          >
            <Text style={styles.buttonText}>+5</Text>
          </Pressable>
          
          <Pressable
            style={[styles.button, styles.dangerButton]}
            onPress={() => counterState.reset()}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </Pressable>
        </View>

        {snap.history.length > 0 && (
          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>History:</Text>
            <Text style={styles.historyText}>
              {snap.history.slice(-5).join(' → ')} → {snap.count}
            </Text>
            <Pressable
              style={[styles.button, styles.secondaryButton, styles.smallButton]}
              onPress={() => counterState.clearHistory()}
            >
              <Text style={styles.buttonTextSecondary}>Clear History</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

// User Profile Section
const UserSection = () => {
  const snap = useSnapshot(userState);
  const [nameInput, setNameInput] = React.useState(snap.profile.name);
  const [emailInput, setEmailInput] = React.useState(snap.profile.email);

  const updateProfile = () => {
    userState.updateProfile({
      name: nameInput,
      email: emailInput,
    });
  };

  return (
    <View style={[
      styles.section,
      { backgroundColor: snap.preferences.theme === 'dark' ? '#2c2c2e' : '#fff' }
    ]}>
      <Text style={[
        styles.sectionTitle,
        { color: snap.preferences.theme === 'dark' ? '#fff' : '#333' }
      ]}>
        👤 User Profile (Nested Objects)
      </Text>
      
      <View style={styles.profileContainer}>
        <Text style={styles.profileAvatar}>{snap.profile.avatar}</Text>
        
        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: snap.preferences.theme === 'dark' ? '#3c3c3e' : '#fff',
              color: snap.preferences.theme === 'dark' ? '#fff' : '#333',
            }
          ]}
          placeholder="Nombre"
          placeholderTextColor={snap.preferences.theme === 'dark' ? '#999' : '#666'}
          value={nameInput}
          onChangeText={setNameInput}
        />
        
        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: snap.preferences.theme === 'dark' ? '#3c3c3e' : '#fff',
              color: snap.preferences.theme === 'dark' ? '#fff' : '#333',
            }
          ]}
          placeholder="Email"
          placeholderTextColor={snap.preferences.theme === 'dark' ? '#999' : '#666'}
          value={emailInput}
          onChangeText={setEmailInput}
          keyboardType="email-address"
        />
        
        <Pressable
          style={[styles.button, styles.primaryButton]}
          onPress={updateProfile}
        >
          <Text style={styles.buttonText}>Update Profile</Text>
        </Pressable>

        <View style={styles.preferencesContainer}>
          <Text style={[
            styles.preferencesTitle,
            { color: snap.preferences.theme === 'dark' ? '#fff' : '#333' }
          ]}>
            Preferences:
          </Text>
          
          <Pressable
            style={[
              styles.button,
              styles.secondaryButton,
              { backgroundColor: snap.preferences.theme === 'dark' ? '#4c4c4e' : '#f0f0f0' }
            ]}
            onPress={() => userState.toggleTheme()}
          >
            <Text style={[
              styles.buttonTextSecondary,
              { color: snap.preferences.theme === 'dark' ? '#fff' : '#333' }
            ]}>
              Theme: {snap.preferences.theme} {snap.preferences.theme === 'dark' ? '🌙' : '☀️'}
            </Text>
          </Pressable>
          
          <Pressable
            style={[styles.button, styles.secondaryButton]}
            onPress={() => userState.updatePreferences({ 
              notifications: !snap.preferences.notifications 
            })}
          >
            <Text style={styles.buttonTextSecondary}>
              Notifications: {snap.preferences.notifications ? '🔔' : '🔕'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

// Shopping Cart Section
const CartSection = () => {
  const snap = useSnapshot(cartState);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🛒 Shopping Cart (Computed)</Text>

      <View style={styles.cartStats}>
        <Text style={styles.statsText}>Items: {snap.totalItems}</Text>
        <Text style={styles.statsText}>Total: ${snap.totalPrice.toFixed(2)}</Text>
      </View>

      <Text style={styles.subsectionTitle}>Products:</Text>
      <View style={styles.productsGrid}>
        {mockProducts.map((product) => {
          const cartItem = snap.items.find(item => item.id === product.id);
          
          return (
            <View key={product.id} style={styles.productCard}>
              <Text style={styles.productEmoji}>{product.emoji}</Text>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>${product.price}</Text>
              
              {cartItem ? (
                <View style={styles.quantityControls}>
                  <Pressable
                    style={[styles.quantityButton, styles.primaryButton]}
                    onPress={() => cartState.updateQuantity(product.id, cartItem.quantity - 1)}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </Pressable>
                  
                  <Text style={styles.quantityText}>{cartItem.quantity}</Text>
                  
                  <Pressable
                    style={[styles.quantityButton, styles.primaryButton]}
                    onPress={() => cartState.updateQuantity(product.id, cartItem.quantity + 1)}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  style={[styles.button, styles.primaryButton]}
                  onPress={() => cartState.addItem(product)}
                >
                  <Text style={styles.buttonText}>Add to Cart</Text>
                </Pressable>
              )}
            </View>
          );
        })}
      </View>

      {snap.items.length > 0 && (
        <Pressable
          style={[styles.button, styles.dangerButton]}
          onPress={() => cartState.clearCart()}
        >
          <Text style={styles.buttonText}>Clear Cart</Text>
        </Pressable>
      )}
    </View>
  );
};

// Todos Section
const TodosSection = () => {
  const snap = useSnapshot(todoState);
  const [newTodoText, setNewTodoText] = React.useState('');

  const addTodo = () => {
    if (newTodoText.trim()) {
      todoState.addTodo(newTodoText.trim());
      setNewTodoText('');
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>📝 Todos (Getters)</Text>

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
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Total: {snap.stats.total} | Active: {snap.stats.active} | Completed: {snap.stats.completed}
        </Text>
      </View>

      <View style={styles.filterRow}>
        {(['all', 'active', 'completed'] as const).map((filterType) => (
          <Pressable
            key={filterType}
            style={[
              styles.filterButton,
              snap.filter === filterType && styles.activeFilter
            ]}
            onPress={() => todoState.setFilter(filterType)}
          >
            <Text style={[
              styles.filterButtonText,
              snap.filter === filterType && styles.activeFilterText
            ]}>
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.todosContainer}>
        {snap.filteredItems.map((todo) => (
          <View key={todo.id} style={styles.todoItem}>
            <Pressable
              style={styles.todoCheck}
              onPress={() => todoState.toggleTodo(todo.id)}
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
              onPress={() => todoState.deleteTodo(todo.id)}
            >
              <Text style={styles.deleteButtonText}>🗑️</Text>
            </Pressable>
          </View>
        ))}
      </View>

      {snap.items.length > 0 && (
        <Pressable
          style={[styles.button, styles.dangerButton]}
          onPress={() => todoState.clearCompleted()}
        >
          <Text style={styles.buttonText}>Clear Completed</Text>
        </Pressable>
      )}
    </View>
  );
};

const ValtioExample = () => {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Valtio</Text>
          <Text style={styles.subtitle}>
            State management con proxy que permite mutaciones directas
          </Text>
        </View>

        <CounterSection />
        <UserSection />
        <CartSection />
        <TodosSection />

        <View style={styles.codeSection}>
          <Text style={styles.codeTitle}>💡 Valtio Patterns</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{`// 1. Creating Proxy State
import { proxy, useSnapshot } from 'valtio';

const state = proxy({
  count: 0,
  name: 'John',
  increment() {
    this.count++; // Direct mutation!
  },
  updateName(name: string) {
    this.name = name;
  },
});

// 2. Using State in Components
const MyComponent = () => {
  const snap = useSnapshot(state);
  
  return (
    <div>
      <p>{snap.name}: {snap.count}</p>
      <button onClick={() => state.increment()}>
        Increment
      </button>
    </div>
  );
};

// 3. Nested Objects and Arrays
const userState = proxy({
  profile: {
    name: 'John',
    settings: {
      theme: 'light',
      notifications: true,
    },
  },
  updateProfile(updates) {
    Object.assign(this.profile, updates);
  },
  toggleTheme() {
    this.profile.settings.theme = 
      this.profile.settings.theme === 'light' ? 'dark' : 'light';
  },
});

// 4. Computed Values with Getters
const todoState = proxy({
  items: [],
  filter: 'all',
  get filteredItems() {
    return this.items.filter(todo => {
      if (this.filter === 'active') return !todo.completed;
      if (this.filter === 'completed') return todo.completed;
      return true;
    });
  },
  get stats() {
    return {
      total: this.items.length,
      completed: this.items.filter(t => t.completed).length,
    };
  },
});

// 5. Subscriptions and Side Effects
import { subscribeKey, watch } from 'valtio/utils';

// Subscribe to specific key changes
subscribeKey(state, 'count', (count) => {
  console.log('Count changed:', count);
});

// Watch for derived values
watch((get) => get(state).count * 2, (doubleCount) => {
  console.log('Double count:', doubleCount);
});

// 6. Actions with Methods
const cartState = proxy({
  items: [],
  addItem(product) {
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
  },
  removeItem(id) {
    const index = this.items.findIndex(item => item.id === id);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  },
});`}</Text>
          </View>
        </View>

        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>🔄 Ventajas de Valtio</Text>
          <View style={styles.benefitsList}>
            <Text style={styles.benefitItem}>• Mutaciones directas sin reducers</Text>
            <Text style={styles.benefitItem}>• Sintaxis familiar como objetos normales</Text>
            <Text style={styles.benefitItem}>• Getters para computed values automáticos</Text>
            <Text style={styles.benefitItem}>• Subscriptions granulares opcionales</Text>
            <Text style={styles.benefitItem}>• TypeScript nativo con inferencia</Text>
            <Text style={styles.benefitItem}>• Renders optimizados automáticamente</Text>
            <Text style={styles.benefitItem}>• Perfecto para objetos complejos anidados</Text>
            <Text style={styles.benefitItem}>• API simple sin boilerplate</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🔄 Valtio hace que el state management se sienta como trabajar con objetos normales
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
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  counterContainer: {
    alignItems: 'center',
    gap: 16,
  },
  counterValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B6B',
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
  smallButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 50,
  },
  primaryButton: {
    backgroundColor: '#FF6B6B',
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
  profileContainer: {
    alignItems: 'center',
    gap: 16,
  },
  profileAvatar: {
    fontSize: 48,
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
  preferencesContainer: {
    width: '100%',
    gap: 12,
  },
  preferencesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  cartStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statsContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  productCard: {
    width: '48%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  productEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FF6B6B',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    minWidth: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 16,
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
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
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
    backgroundColor: '#fff0f0',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#cc0000',
    marginBottom: 12,
  },
  benefitsList: {
    gap: 8,
  },
  benefitItem: {
    fontSize: 14,
    color: '#cc0000',
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

export default ValtioExample;
