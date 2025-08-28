import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from '../../../store/context/ThemeContext';
import { CartProvider, useCart } from '../../../store/context/CartContext';
import { NotificationProvider, useNotifications } from '../../../store/context/NotificationContext';

// Mock products
const mockProducts = [
  { id: '1', name: 'MacBook Pro', price: 1999, image: '💻' },
  { id: '2', name: 'iPhone 15', price: 999, image: '📱' },
  { id: '3', name: 'AirPods Pro', price: 249, image: '🎧' },
  { id: '4', name: 'iPad Air', price: 599, image: '📱' },
];

// Theme Section Component
const ThemeSection = () => {
  const { state, toggleTheme, setTheme } = useTheme();

  return (
    <View style={[styles.section, { backgroundColor: state.colors.surface }]}>
      <Text style={[styles.sectionTitle, { color: state.colors.text }]}>
        🎨 Theme Context
      </Text>
      
      <View style={[styles.themePreview, { backgroundColor: state.colors.background }]}>
        <Text style={[styles.themeText, { color: state.colors.text }]}>
          Current Theme: {state.theme}
        </Text>
        <Text style={[styles.themeText, { color: state.colors.textSecondary }]}>
          Background: {state.colors.background}
        </Text>
        <Text style={[styles.themeText, { color: state.colors.primary }]}>
          Primary: {state.colors.primary}
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <Pressable
          style={[styles.button, { backgroundColor: state.colors.primary }]}
          onPress={toggleTheme}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>
            Toggle Theme
          </Text>
        </Pressable>
        
        <Pressable
          style={[styles.button, { backgroundColor: state.colors.secondary }]}
          onPress={() => setTheme('light')}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>
            Light
          </Text>
        </Pressable>
        
        <Pressable
          style={[styles.button, { backgroundColor: state.colors.secondary }]}
          onPress={() => setTheme('dark')}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>
            Dark
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

// Cart Section Component
const CartSection = () => {
  const { state: themeState } = useTheme();
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    getItemQuantity,
    isItemInCart,
  } = useCart();

  return (
    <View style={[styles.section, { backgroundColor: themeState.colors.surface }]}>
      <Text style={[styles.sectionTitle, { color: themeState.colors.text }]}>
        🛒 Cart Context
      </Text>

      <View style={styles.cartStats}>
        <Text style={[styles.statsText, { color: themeState.colors.text }]}>
          Items: {totalItems}
        </Text>
        <Text style={[styles.statsText, { color: themeState.colors.text }]}>
          Total: ${totalPrice.toFixed(2)}
        </Text>
      </View>

      <Text style={[styles.subsectionTitle, { color: themeState.colors.text }]}>
        Products:
      </Text>
      <View style={styles.productsGrid}>
        {mockProducts.map((product) => (
          <View
            key={product.id}
            style={[styles.productCard, { backgroundColor: themeState.colors.background }]}
          >
            <Text style={styles.productEmoji}>{product.image}</Text>
            <Text style={[styles.productName, { color: themeState.colors.text }]}>
              {product.name}
            </Text>
            <Text style={[styles.productPrice, { color: themeState.colors.primary }]}>
              ${product.price}
            </Text>
            
            {isItemInCart(product.id) ? (
              <View style={styles.quantityControls}>
                <Pressable
                  style={[styles.quantityButton, { backgroundColor: themeState.colors.primary }]}
                  onPress={() => updateQuantity(product.id, getItemQuantity(product.id) - 1)}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </Pressable>
                
                <Text style={[styles.quantityText, { color: themeState.colors.text }]}>
                  {getItemQuantity(product.id)}
                </Text>
                
                <Pressable
                  style={[styles.quantityButton, { backgroundColor: themeState.colors.primary }]}
                  onPress={() => updateQuantity(product.id, getItemQuantity(product.id) + 1)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </Pressable>
                
                <Pressable
                  style={[styles.removeButton, { backgroundColor: '#FF3B30' }]}
                  onPress={() => removeItem(product.id)}
                >
                  <Text style={styles.quantityButtonText}>🗑️</Text>
                </Pressable>
              </View>
            ) : (
              <Pressable
                style={[styles.addButton, { backgroundColor: themeState.colors.secondary }]}
                onPress={() => addItem(product)}
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </Pressable>
            )}
          </View>
        ))}
      </View>

      {items.length > 0 && (
        <View style={styles.cartActions}>
          <Text style={[styles.subsectionTitle, { color: themeState.colors.text }]}>
            Cart Items:
          </Text>
          {items.map((item) => (
            <View
              key={item.id}
              style={[styles.cartItem, { backgroundColor: themeState.colors.background }]}
            >
              <Text style={styles.cartItemEmoji}>{item.image}</Text>
              <View style={styles.cartItemInfo}>
                <Text style={[styles.cartItemName, { color: themeState.colors.text }]}>
                  {item.name}
                </Text>
                <Text style={[styles.cartItemPrice, { color: themeState.colors.textSecondary }]}>
                  ${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
          
          <Pressable
            style={[styles.button, { backgroundColor: '#FF3B30' }]}
            onPress={clearCart}
          >
            <Text style={styles.buttonText}>Clear Cart</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

// Notifications Section Component
const NotificationsSection = () => {
  const { state: themeState } = useTheme();
  const { notifications, showNotification, hideNotification, clearAllNotifications } = useNotifications();

  const triggerNotification = (type: 'success' | 'error' | 'warning' | 'info') => {
    const messages = {
      success: { title: 'Success!', message: 'Operation completed successfully' },
      error: { title: 'Error!', message: 'Something went wrong' },
      warning: { title: 'Warning!', message: 'Please check your input' },
      info: { title: 'Info', message: 'Here is some information' },
    };

    showNotification(type, messages[type].title, messages[type].message);
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return '#34C759';
      case 'error': return '#FF3B30';
      case 'warning': return '#FF9500';
      case 'info': return '#007AFF';
      default: return themeState.colors.primary;
    }
  };

  const getNotificationEmoji = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  return (
    <View style={[styles.section, { backgroundColor: themeState.colors.surface }]}>
      <Text style={[styles.sectionTitle, { color: themeState.colors.text }]}>
        🔔 Notifications Context
      </Text>

      <View style={styles.notificationTriggers}>
        {(['success', 'error', 'warning', 'info'] as const).map((type) => (
          <Pressable
            key={type}
            style={[styles.button, { backgroundColor: getNotificationColor(type) }]}
            onPress={() => triggerNotification(type)}
          >
            <Text style={styles.buttonText}>
              {getNotificationEmoji(type)} {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      {notifications.length > 0 && (
        <View style={styles.notificationsContainer}>
          <View style={styles.notificationsHeader}>
            <Text style={[styles.subsectionTitle, { color: themeState.colors.text }]}>
              Active Notifications ({notifications.length}):
            </Text>
            <Pressable
              style={[styles.clearButton, { backgroundColor: '#FF3B30' }]}
              onPress={clearAllNotifications}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
            </Pressable>
          </View>

          {notifications.map((notification) => (
            <View
              key={notification.id}
              style={[
                styles.notificationItem,
                {
                  backgroundColor: themeState.colors.background,
                  borderLeftColor: getNotificationColor(notification.type),
                }
              ]}
            >
              <View style={styles.notificationContent}>
                <Text style={styles.notificationEmoji}>
                  {getNotificationEmoji(notification.type)}
                </Text>
                <View style={styles.notificationText}>
                  <Text style={[styles.notificationTitle, { color: themeState.colors.text }]}>
                    {notification.title}
                  </Text>
                  <Text style={[styles.notificationMessage, { color: themeState.colors.textSecondary }]}>
                    {notification.message}
                  </Text>
                  <Text style={[styles.notificationTime, { color: themeState.colors.textSecondary }]}>
                    {notification.timestamp.toLocaleTimeString()}
                  </Text>
                </View>
                <Pressable
                  style={styles.notificationClose}
                  onPress={() => hideNotification(notification.id)}
                >
                  <Text style={styles.notificationCloseText}>✕</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

// Main Content Component
const ContextContent = () => {
  const { state: themeState } = useTheme();

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: themeState.colors.background }]} 
      edges={['left', 'right', 'bottom']}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { backgroundColor: themeState.colors.surface }]}>
          <Text style={[styles.title, { color: themeState.colors.text }]}>
            Context API
          </Text>
          <Text style={[styles.subtitle, { color: themeState.colors.textSecondary }]}>
            React's built-in state management with multiple contexts
          </Text>
        </View>

        <View style={[styles.infoSection, { backgroundColor: '#fff9e6', borderLeftColor: '#FF9500' }]}>
          <Text style={[styles.infoTitle, { color: '#cc6600' }]}>⚛️ ¿Cuándo usar Context API?</Text>
          <Text style={[styles.infoText, { color: '#cc6600' }]}>
            • Apps que ya usan React y no quieren dependencias extra{'\n'}
            • Estado que cambia poco y se comparte ampliamente (tema, auth){'\n'}
            • Proyectos pequeños con requisitos de estado simples{'\n'}
            • Cuando el presupuesto de bundle es crítico
          </Text>
          
          <Text style={[styles.infoTitle, { color: '#cc6600' }]}>⚙️ ¿Cómo funciona?</Text>
          <Text style={[styles.infoText, { color: '#cc6600' }]}>
            Usa createContext() para crear contextos y Provider para compartir valores. 
            Los componentes consumen datos con useContext(). Requiere optimizaciones 
            manuales (useMemo, useCallback) para evitar re-renders innecesarios.
          </Text>
        </View>

        <ThemeSection />
        <CartSection />
        <NotificationsSection />

        <View style={[styles.codeSection, { backgroundColor: '#2d3748' }]}>
          <Text style={styles.codeTitle}>💡 Context API Patterns</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{`// 1. Creating Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. Custom Hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// 3. Provider Component
export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);
  
  const value = useMemo(() => ({
    state,
    toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
  }), [state]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. Performance Optimization
const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  
  // Memoize expensive computations
  const totalPrice = useMemo(() => 
    items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  
  // Memoize callback functions
  const addItem = useCallback((product) => {
    setItems(prev => [...prev, product]);
  }, []);
  
  const value = useMemo(() => ({
    items, addItem, totalPrice
  }), [items, addItem, totalPrice]);
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// 5. Multiple Context Composition
<ThemeProvider>
  <CartProvider>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </CartProvider>
</ThemeProvider>`}</Text>
          </View>
        </View>

        <View style={[styles.performanceSection, { backgroundColor: '#fff9e6', borderLeftColor: '#FF9500' }]}>
          <Text style={[styles.performanceTitle, { color: '#cc6600' }]}>
            ⚡ Performance Tips
          </Text>
          <View style={styles.tipsList}>
            <Text style={[styles.tipItem, { color: '#cc6600' }]}>
              • Use useMemo for expensive computations
            </Text>
            <Text style={[styles.tipItem, { color: '#cc6600' }]}>
              • Memoize context values to prevent unnecessary re-renders
            </Text>
            <Text style={[styles.tipItem, { color: '#cc6600' }]}>
              • Split contexts by concern (theme, cart, notifications)
            </Text>
            <Text style={[styles.tipItem, { color: '#cc6600' }]}>
              • Use useCallback for function references
            </Text>
            <Text style={[styles.tipItem, { color: '#cc6600' }]}>
              • Consider React.memo for expensive child components
            </Text>
            <Text style={[styles.tipItem, { color: '#cc6600' }]}>
              • Avoid passing objects directly in value prop
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: themeState.colors.textSecondary }]}>
            ⚛️ Context API is perfect for app-wide state without external dependencies
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Main Component with All Providers
const ContextAPIExample = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <NotificationProvider>
          <ContextContent />
        </NotificationProvider>
      </CartProvider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  infoSection: {
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  section: {
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
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  themePreview: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  themeText: {
    fontSize: 14,
    marginBottom: 4,
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
    minWidth: 80,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 14,
  },
  cartStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  statsText: {
    fontSize: 16,
    fontWeight: '600',
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
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
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
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  cartActions: {
    marginTop: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  cartItemEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  cartItemPrice: {
    fontSize: 12,
  },
  notificationTriggers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  notificationsContainer: {
    marginTop: 16,
  },
  notificationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  notificationItem: {
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    overflow: 'hidden',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
  },
  notificationEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  notificationMessage: {
    fontSize: 12,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 10,
  },
  notificationClose: {
    padding: 4,
  },
  notificationCloseText: {
    fontSize: 16,
    color: '#999',
  },
  codeSection: {
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
  performanceSection: {
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  performanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ContextAPIExample;
