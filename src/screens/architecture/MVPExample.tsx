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

// ====== MODEL LAYER ======
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

class UserModel {
  private users: User[] = [
    { id: '1', name: 'Ana García', email: 'ana@example.com', age: 28 },
    { id: '2', name: 'Carlos López', email: 'carlos@example.com', age: 34 },
    { id: '3', name: 'María Silva', email: 'maria@example.com', age: 26 },
  ];

  async getUsers(): Promise<User[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [...this.users];
  }

  async getUserById(id: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.users.find(user => user.id === id) || null;
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
    };
    this.users.push(newUser);
    return newUser;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 600));
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...userData };
      return this.users[index];
    }
    return null;
  }

  async deleteUser(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}

// ====== VIEW INTERFACE ======
interface UserView {
  showUsers(users: User[]): void;
  showLoading(loading: boolean): void;
  showError(message: string): void;
  showSuccess(message: string): void;
  clearForm(): void;
}

// ====== PRESENTER LAYER ======
class UserPresenter {
  private model: UserModel;
  private view: UserView;

  constructor(model: UserModel, view: UserView) {
    this.model = model;
    this.view = view;
  }

  async loadUsers(): Promise<void> {
    try {
      this.view.showLoading(true);
      const users = await this.model.getUsers();
      this.view.showUsers(users);
    } catch (error) {
      this.view.showError('Error al cargar usuarios');
    } finally {
      this.view.showLoading(false);
    }
  }

  async createUser(name: string, email: string, age: string): Promise<void> {
    // Validation
    if (!name.trim() || !email.trim() || !age.trim()) {
      this.view.showError('Todos los campos son obligatorios');
      return;
    }

    const ageNumber = parseInt(age);
    if (isNaN(ageNumber) || ageNumber < 1 || ageNumber > 120) {
      this.view.showError('La edad debe ser un número válido entre 1 y 120');
      return;
    }

    if (!this.isValidEmail(email)) {
      this.view.showError('El email no tiene un formato válido');
      return;
    }

    try {
      this.view.showLoading(true);
      await this.model.createUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        age: ageNumber,
      });
      this.view.showSuccess('Usuario creado exitosamente');
      this.view.clearForm();
      await this.loadUsers(); // Refresh list
    } catch (error) {
      this.view.showError('Error al crear usuario');
    } finally {
      this.view.showLoading(false);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      this.view.showLoading(true);
      const success = await this.model.deleteUser(id);
      if (success) {
        this.view.showSuccess('Usuario eliminado exitosamente');
        await this.loadUsers(); // Refresh list
      } else {
        this.view.showError('No se pudo eliminar el usuario');
      }
    } catch (error) {
      this.view.showError('Error al eliminar usuario');
    } finally {
      this.view.showLoading(false);
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// ====== VIEW COMPONENT ======
const MVPExample: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  // Create model and presenter instances
  const model = new UserModel();
  
  // Implement view interface
  const view: UserView = {
    showUsers: (users: User[]) => setUsers(users),
    showLoading: (loading: boolean) => setLoading(loading),
    showError: (message: string) => Alert.alert('Error', message),
    showSuccess: (message: string) => Alert.alert('Éxito', message),
    clearForm: () => {
      setName('');
      setEmail('');
      setAge('');
    },
  };

  const presenter = new UserPresenter(model, view);

  useEffect(() => {
    presenter.loadUsers();
  }, []);

  const handleCreateUser = () => {
    presenter.createUser(name, email, age);
  };

  const handleDeleteUser = (id: string) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que quieres eliminar este usuario?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => presenter.deleteUser(id) },
      ]
    );
  };

  const renderUser = (user: User) => (
    <View key={user.id} style={styles.userCard}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.userAge}>Edad: {user.age} años</Text>
      </View>
      <Pressable
        style={styles.deleteButton}
        onPress={() => handleDeleteUser(user.id)}
      >
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>MVP Architecture</Text>
          <Text style={styles.subtitle}>
            Model-View-Presenter pattern para separación de responsabilidades
          </Text>
        </View>

        <View style={styles.architectureInfo}>
          <Text style={styles.architectureTitle}>🎭 Componentes de MVP</Text>
          <View style={styles.componentCard}>
            <Text style={styles.componentTitle}>📁 Model</Text>
            <Text style={styles.componentDescription}>
              Maneja datos y lógica de negocio. Independiente de la UI.
            </Text>
          </View>
          <View style={styles.componentCard}>
            <Text style={styles.componentTitle}>👁️ View</Text>
            <Text style={styles.componentDescription}>
              Interfaz de usuario pasiva. Solo muestra datos.
            </Text>
          </View>
          <View style={styles.componentCard}>
            <Text style={styles.componentTitle}>🎯 Presenter</Text>
            <Text style={styles.componentDescription}>
              Mediador entre Model y View. Contiene lógica de presentación.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Crear Usuario</Text>
          
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              value={name}
              onChangeText={setName}
              editable={!loading}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Edad"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              editable={!loading}
            />
            
            <Pressable
              style={[styles.createButton, loading && styles.disabledButton]}
              onPress={handleCreateUser}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.createButtonText}>Crear Usuario</Text>
              )}
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👥 Lista de Usuarios</Text>
          
          {loading && users.length === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Cargando usuarios...</Text>
            </View>
          ) : (
            <View style={styles.usersList}>
              {users.map(renderUser)}
            </View>
          )}
        </View>

        <View style={styles.codeSection}>
          <Text style={styles.codeTitle}>💡 Estructura MVP</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{`// Model - Datos y lógica de negocio
class UserModel {
  async getUsers(): Promise<User[]> {
    // API calls, data processing
  }
}

// View Interface - Contrato de la vista
interface UserView {
  showUsers(users: User[]): void;
  showLoading(loading: boolean): void;
  showError(message: string): void;
}

// Presenter - Lógica de presentación
class UserPresenter {
  constructor(model: UserModel, view: UserView) {
    this.model = model;
    this.view = view;
  }
  
  async loadUsers(): Promise<void> {
    this.view.showLoading(true);
    try {
      const users = await this.model.getUsers();
      this.view.showUsers(users);
    } catch (error) {
      this.view.showError('Error loading users');
    }
    this.view.showLoading(false);
  }
}

// React Component implementa UserView
const MyComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  
  const view: UserView = {
    showUsers: setUsers,
    showLoading: setLoading,
    showError: (msg) => Alert.alert('Error', msg),
  };
  
  const presenter = new UserPresenter(model, view);
};`}</Text>
          </View>
        </View>

        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>🎯 Ventajas de MVP</Text>
          <View style={styles.benefitsList}>
            <Text style={styles.benefitItem}>✅ Separación clara de responsabilidades</Text>
            <Text style={styles.benefitItem}>✅ Fácil testing unitario del Presenter</Text>
            <Text style={styles.benefitItem}>✅ View completamente pasiva</Text>
            <Text style={styles.benefitItem}>✅ Reutilización de Presenters</Text>
            <Text style={styles.benefitItem}>✅ Bajo acoplamiento entre capas</Text>
            <Text style={styles.benefitItem}>✅ Lógica de negocio independiente de UI</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🎭 MVP es ideal para proyectos donde necesitas separación clara y testing robusto
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
    backgroundColor: '#e8f5e8',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  architectureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  componentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  componentTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  componentDescription: {
    fontSize: 12,
    color: '#388E3C',
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
  form: {
    gap: 12,
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
  createButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
  usersList: {
    gap: 8,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  userAge: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    fontSize: 18,
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
    backgroundColor: '#e8f5e8',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  benefitsList: {
    gap: 8,
  },
  benefitItem: {
    fontSize: 14,
    color: '#2E7D32',
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

export default MVPExample;
