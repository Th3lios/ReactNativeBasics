import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ====== DOMAIN LAYER (Business Logic) ======

// Entities (Core Business Objects)
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
}

interface Order {
  id: string;
  products: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  customerEmail: string;
  createdAt: Date;
}

interface OrderItem {
  productId: string;
  product: Product;
  quantity: number;
  subtotal: number;
}

// Repository Interfaces (Ports)
interface ProductRepository {
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  createProduct(product: Omit<Product, 'id'>): Promise<Product>;
  updateProduct(id: string, updates: Partial<Product>): Promise<Product | null>;
}

interface OrderRepository {
  getOrders(): Promise<Order[]>;
  createOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order>;
  updateOrderStatus(id: string, status: Order['status']): Promise<Order | null>;
}

interface EmailService {
  sendOrderConfirmation(order: Order): Promise<boolean>;
}

// Use Cases (Business Rules)
class CreateOrderUseCase {
  constructor(
    private productRepo: ProductRepository,
    private orderRepo: OrderRepository,
    private emailService: EmailService
  ) {}

  async execute(
    productIds: string[],
    quantities: number[],
    customerEmail: string
  ): Promise<{ success: boolean; order?: Order; error?: string }> {
    try {
      // Validate input
      if (!customerEmail || !this.isValidEmail(customerEmail)) {
        return { success: false, error: 'Email inválido' };
      }

      if (productIds.length !== quantities.length) {
        return { success: false, error: 'Productos y cantidades no coinciden' };
      }

      // Get products and validate availability
      const orderItems: OrderItem[] = [];
      let totalAmount = 0;

      for (let i = 0; i < productIds.length; i++) {
        const product = await this.productRepo.getProductById(productIds[i]);
        if (!product) {
          return { success: false, error: `Producto ${productIds[i]} no encontrado` };
        }

        if (!product.inStock) {
          return { success: false, error: `Producto ${product.name} no disponible` };
        }

        if (quantities[i] <= 0) {
          return { success: false, error: 'Cantidad debe ser mayor a 0' };
        }

        const subtotal = product.price * quantities[i];
        totalAmount += subtotal;

        orderItems.push({
          productId: product.id,
          product,
          quantity: quantities[i],
          subtotal,
        });
      }

      // Create order
      const order = await this.orderRepo.createOrder({
        products: orderItems,
        totalAmount,
        status: 'pending',
        customerEmail,
      });

      // Send confirmation email
      try {
        await this.emailService.sendOrderConfirmation(order);
      } catch (error) {
        console.warn('Failed to send confirmation email:', error);
      }

      return { success: true, order };
    } catch (error) {
      return { success: false, error: 'Error interno del servidor' };
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

class GetProductsUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(filter?: {
    category?: string;
    inStock?: boolean;
  }): Promise<{ success: boolean; products?: Product[]; error?: string }> {
    try {
      const products = await this.productRepo.getProducts();
      
      let filteredProducts = products;
      
      if (filter?.category) {
        filteredProducts = filteredProducts.filter(p => p.category === filter.category);
      }
      
      if (filter?.inStock !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.inStock === filter.inStock);
      }

      return { success: true, products: filteredProducts };
    } catch (error) {
      return { success: false, error: 'Error al obtener productos' };
    }
  }
}

// ====== INFRASTRUCTURE LAYER (Adapters) ======

// Mock Data Repository (Adapter)
class MockProductRepository implements ProductRepository {
  private products: Product[] = [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      price: 999,
      description: 'Latest iPhone with A17 Pro chip',
      category: 'smartphones',
      inStock: true,
    },
    {
      id: '2',
      name: 'MacBook Pro M3',
      price: 1599,
      description: 'Professional laptop with M3 chip',
      category: 'laptops',
      inStock: true,
    },
    {
      id: '3',
      name: 'AirPods Pro 2',
      price: 249,
      description: 'Wireless earbuds with ANC',
      category: 'audio',
      inStock: false,
    },
    {
      id: '4',
      name: 'iPad Air',
      price: 599,
      description: 'Versatile tablet for work and play',
      category: 'tablets',
      inStock: true,
    },
  ];

  async getProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...this.products];
  }

  async getProductById(id: string): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.products.find(p => p.id === id) || null;
  }

  async createProduct(productData: Omit<Product, 'id'>): Promise<Product> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const product: Product = {
      id: Date.now().toString(),
      ...productData,
    };
    this.products.push(product);
    return product;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updates };
      return this.products[index];
    }
    return null;
  }
}

class MockOrderRepository implements OrderRepository {
  private orders: Order[] = [];

  async getOrders(): Promise<Order[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [...this.orders];
  }

  async createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    await new Promise(resolve => setTimeout(resolve, 600));
    const order: Order = {
      id: Date.now().toString(),
      ...orderData,
      createdAt: new Date(),
    };
    this.orders.push(order);
    return order;
  }

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.orders.findIndex(o => o.id === id);
    if (index !== -1) {
      this.orders[index].status = status;
      return this.orders[index];
    }
    return null;
  }
}

class MockEmailService implements EmailService {
  async sendOrderConfirmation(order: Order): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log(`📧 Order confirmation sent to ${order.customerEmail}`);
    return true;
  }
}

// ====== PRESENTATION LAYER (UI Controllers) ======

interface ProductController {
  loadProducts(): Promise<void>;
  filterProducts(category?: string, inStock?: boolean): Promise<void>;
}

interface OrderController {
  createOrder(productIds: string[], quantities: number[], email: string): Promise<void>;
}

class ProductControllerImpl implements ProductController {
  constructor(
    private getProductsUseCase: GetProductsUseCase,
    private onProductsLoaded: (products: Product[]) => void,
    private onError: (error: string) => void,
    private setLoading: (loading: boolean) => void
  ) {}

  async loadProducts(): Promise<void> {
    this.setLoading(true);
    try {
      const result = await this.getProductsUseCase.execute();
      if (result.success && result.products) {
        this.onProductsLoaded(result.products);
      } else {
        this.onError(result.error || 'Error desconocido');
      }
    } finally {
      this.setLoading(false);
    }
  }

  async filterProducts(category?: string, inStock?: boolean): Promise<void> {
    this.setLoading(true);
    try {
      const result = await this.getProductsUseCase.execute({ category, inStock });
      if (result.success && result.products) {
        this.onProductsLoaded(result.products);
      } else {
        this.onError(result.error || 'Error al filtrar productos');
      }
    } finally {
      this.setLoading(false);
    }
  }
}

class OrderControllerImpl implements OrderController {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private onOrderCreated: (order: Order) => void,
    private onError: (error: string) => void,
    private setLoading: (loading: boolean) => void
  ) {}

  async createOrder(productIds: string[], quantities: number[], email: string): Promise<void> {
    this.setLoading(true);
    try {
      const result = await this.createOrderUseCase.execute(productIds, quantities, email);
      if (result.success && result.order) {
        this.onOrderCreated(result.order);
      } else {
        this.onError(result.error || 'Error al crear orden');
      }
    } finally {
      this.setLoading(false);
    }
  }
}

// ====== VIEW COMPONENT ======
const CleanArchitectureExample: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [filter, setFilter] = useState<{ category?: string; inStock?: boolean }>({});

  // Dependency Injection (DI Container in real app)
  const productRepo = new MockProductRepository();
  const orderRepo = new MockOrderRepository();
  const emailService = new MockEmailService();
  
  const getProductsUseCase = new GetProductsUseCase(productRepo);
  const createOrderUseCase = new CreateOrderUseCase(productRepo, orderRepo, emailService);

  // Controllers
  const productController = new ProductControllerImpl(
    getProductsUseCase,
    setProducts,
    (error) => Alert.alert('Error', error),
    setLoading
  );

  const orderController = new OrderControllerImpl(
    createOrderUseCase,
    (order) => {
      Alert.alert('Éxito', `Orden ${order.id} creada exitosamente`);
      setSelectedProducts(new Map());
      setEmail('');
    },
    (error) => Alert.alert('Error', error),
    setLoading
  );

  useEffect(() => {
    productController.loadProducts();
  }, []);

  const handleProductQuantityChange = (productId: string, quantity: number) => {
    const newSelected = new Map(selectedProducts);
    if (quantity > 0) {
      newSelected.set(productId, quantity);
    } else {
      newSelected.delete(productId);
    }
    setSelectedProducts(newSelected);
  };

  const handleCreateOrder = () => {
    if (selectedProducts.size === 0) {
      Alert.alert('Error', 'Selecciona al menos un producto');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Error', 'Ingresa tu email');
      return;
    }

    const productIds = Array.from(selectedProducts.keys());
    const quantities = Array.from(selectedProducts.values());

    orderController.createOrder(productIds, quantities, email);
  };

  const handleFilter = (category?: string, inStock?: boolean) => {
    const newFilter = { category, inStock };
    setFilter(newFilter);
    productController.filterProducts(category, inStock);
  };

  const getTotalAmount = () => {
    return Array.from(selectedProducts.entries()).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  const renderProduct = (product: Product) => {
    const selectedQuantity = selectedProducts.get(product.id) || 0;
    
    return (
      <View key={product.id} style={[styles.productCard, !product.inStock && styles.outOfStock]}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Text style={styles.productPrice}>${product.price}</Text>
          <Text style={styles.productCategory}>{product.category}</Text>
          {!product.inStock && (
            <Text style={styles.outOfStockText}>Sin stock</Text>
          )}
        </View>
        
        {product.inStock && (
          <View style={styles.quantityControls}>
            <Pressable
              style={styles.quantityButton}
              onPress={() => handleProductQuantityChange(product.id, selectedQuantity - 1)}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </Pressable>
            
            <Text style={styles.quantityText}>{selectedQuantity}</Text>
            
            <Pressable
              style={styles.quantityButton}
              onPress={() => handleProductQuantityChange(product.id, selectedQuantity + 1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Clean Architecture</Text>
          <Text style={styles.subtitle}>
            Arquitectura en capas con dependencias hacia adentro y reglas de negocio aisladas
          </Text>
        </View>

        <View style={styles.architectureInfo}>
          <Text style={styles.architectureTitle}>🎯 Capas de Clean Architecture</Text>
          <View style={styles.layerCard}>
            <Text style={styles.layerTitle}>🏛️ Domain (Entities + Use Cases)</Text>
            <Text style={styles.layerDescription}>
              Core business logic independiente de frameworks. Contiene entidades y reglas de negocio.
            </Text>
          </View>
          <View style={styles.layerCard}>
            <Text style={styles.layerTitle}>🔌 Infrastructure (Adapters)</Text>
            <Text style={styles.layerDescription}>
              Implementaciones concretas de interfaces. DB, APIs, servicios externos.
            </Text>
          </View>
          <View style={styles.layerCard}>
            <Text style={styles.layerTitle}>📱 Presentation (Controllers + UI)</Text>
            <Text style={styles.layerDescription}>
              UI y controladores que orquestan use cases. Capa más externa.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛍️ Tienda de Productos</Text>
          
          <View style={styles.filterContainer}>
            <Text style={styles.filterLabel}>Filtros:</Text>
            <View style={styles.filterButtons}>
              <Pressable
                style={[styles.filterButton, !filter.category && styles.activeFilter]}
                onPress={() => handleFilter(undefined, filter.inStock)}
              >
                <Text style={styles.filterButtonText}>Todos</Text>
              </Pressable>
              
              {['smartphones', 'laptops', 'tablets', 'audio'].map((category) => (
                <Pressable
                  key={category}
                  style={[styles.filterButton, filter.category === category && styles.activeFilter]}
                  onPress={() => handleFilter(category, filter.inStock)}
                >
                  <Text style={styles.filterButtonText}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>
            
            <Pressable
              style={[styles.filterButton, filter.inStock === true && styles.activeFilter]}
              onPress={() => handleFilter(filter.category, filter.inStock === true ? undefined : true)}
            >
              <Text style={styles.filterButtonText}>Solo en stock</Text>
            </Pressable>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF9800" />
              <Text style={styles.loadingText}>Cargando productos...</Text>
            </View>
          ) : (
            <View style={styles.productsList}>
              {products.map(renderProduct)}
            </View>
          )}
        </View>

        {selectedProducts.size > 0 && (
          <View style={styles.cartSection}>
            <Text style={styles.sectionTitle}>🛒 Carrito de Compras</Text>
            
            <View style={styles.cartSummary}>
              <Text style={styles.cartText}>
                Productos seleccionados: {selectedProducts.size}
              </Text>
              <Text style={styles.cartTotal}>
                Total: ${getTotalAmount().toFixed(2)}
              </Text>
            </View>
            
            <TextInput
              style={styles.emailInput}
              placeholder="Tu email para confirmación"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <Pressable
              style={[styles.orderButton, loading && styles.disabledButton]}
              onPress={handleCreateOrder}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.orderButtonText}>Crear Orden</Text>
              )}
            </Pressable>
          </View>
        )}

        <View style={styles.codeSection}>
          <Text style={styles.codeTitle}>💡 Estructura Clean Architecture</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{`// DOMAIN LAYER - Core Business Logic
interface Product {
  id: string;
  name: string;
  price: number;
  // ... business properties
}

// Repository Interface (Port)
interface ProductRepository {
  getProducts(): Promise<Product[]>;
  createProduct(product: Product): Promise<Product>;
}

// Use Case (Business Rule)
class CreateOrderUseCase {
  constructor(
    private productRepo: ProductRepository,
    private orderRepo: OrderRepository,
    private emailService: EmailService
  ) {}
  
  async execute(productIds: string[], email: string) {
    // Business validation
    if (!this.isValidEmail(email)) {
      return { success: false, error: 'Invalid email' };
    }
    
    // Business logic
    const products = await this.productRepo.getProducts();
    const order = await this.orderRepo.createOrder({...});
    await this.emailService.sendConfirmation(order);
    
    return { success: true, order };
  }
}

// INFRASTRUCTURE LAYER - External Adapters
class ApiProductRepository implements ProductRepository {
  async getProducts(): Promise<Product[]> {
    const response = await fetch('/api/products');
    return response.json();
  }
}

// PRESENTATION LAYER - Controllers + UI
class ProductController {
  constructor(private getProductsUseCase: GetProductsUseCase) {}
  
  async loadProducts(): Promise<void> {
    const result = await this.getProductsUseCase.execute();
    if (result.success) {
      this.onProductsLoaded(result.products);
    }
  }
}

// Dependency Injection
const productRepo = new ApiProductRepository();
const useCase = new GetProductsUseCase(productRepo);
const controller = new ProductController(useCase);`}</Text>
          </View>
        </View>

        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>🎯 Ventajas de Clean Architecture</Text>
          <View style={styles.benefitsList}>
            <Text style={styles.benefitItem}>✅ Independencia total de frameworks</Text>
            <Text style={styles.benefitItem}>✅ Reglas de negocio completamente aisladas</Text>
            <Text style={styles.benefitItem}>✅ Testing unitario máximo (>90% coverage)</Text>
            <Text style={styles.benefitItem}>✅ Intercambio fácil de capas externas</Text>
            <Text style={styles.benefitItem}>✅ Mantenimiento y evolución simplificada</Text>
            <Text style={styles.benefitItem}>✅ Dependency Inversion Principle aplicado</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🎯 Clean Architecture es ideal para aplicaciones empresariales complejas con reglas de negocio estrictas
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
  architectureInfo: {
    backgroundColor: '#fff3e0',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  architectureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 12,
  },
  layerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  layerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 4,
  },
  layerDescription: {
    fontSize: 12,
    color: '#FF8F00',
    lineHeight: 16,
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
  filterContainer: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
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
    backgroundColor: '#FF9800',
    borderColor: '#FF9800',
  },
  filterButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
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
  productsList: {
    gap: 12,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#FF9800',
  },
  outOfStock: {
    opacity: 0.6,
    borderLeftColor: '#999',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 2,
  },
  productCategory: {
    fontSize: 10,
    color: '#999',
    textTransform: 'uppercase',
  },
  outOfStockText: {
    fontSize: 10,
    color: '#F44336',
    fontWeight: 'bold',
    marginTop: 4,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF9800',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 20,
    textAlign: 'center',
  },
  cartSection: {
    backgroundColor: '#e8f5e8',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  cartSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cartText: {
    fontSize: 14,
    color: '#2E7D32',
  },
  cartTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  emailInput: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  orderButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
    fontSize: 9,
    lineHeight: 12,
  },
  benefitsSection: {
    backgroundColor: '#fff3e0',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 12,
  },
  benefitsList: {
    gap: 8,
  },
  benefitItem: {
    fontSize: 14,
    color: '#F57C00',
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

export default CleanArchitectureExample;
