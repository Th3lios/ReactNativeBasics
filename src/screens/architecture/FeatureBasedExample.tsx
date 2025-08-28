import React, { useState } from 'react';
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

// ====== FEATURE-BASED ARCHITECTURE SIMULATION ======
// En una aplicación real, cada feature estaría en su propia carpeta:
// features/
//   auth/
//     components/
//     hooks/
//     services/
//     types/
//     index.ts
//   profile/
//     components/
//     hooks/
//     services/
//     types/
//     index.ts

// ====== AUTH FEATURE ======
namespace AuthFeature {
  // Types
  export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  }

  export interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
  }

  // Service
  export class AuthService {
    private currentUser: User | null = null;

    async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'admin@example.com' && password === 'password') {
        this.currentUser = {
          id: '1',
          email: 'admin@example.com',
          name: 'Administrador',
          avatar: '👨‍💻',
        };
        return { success: true, user: this.currentUser };
      }
      
      return { success: false, error: 'Credenciales inválidas' };
    }

    async logout(): Promise<void> {
      await new Promise(resolve => setTimeout(resolve, 500));
      this.currentUser = null;
    }

    getCurrentUser(): User | null {
      return this.currentUser;
    }
  }

  // Custom Hook
  export const useAuth = () => {
    const [state, setState] = useState<AuthState>({
      user: null,
      isLoading: false,
      error: null,
    });

    const authService = new AuthService();

    const login = async (email: string, password: string) => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      try {
        const result = await authService.login(email, password);
        if (result.success && result.user) {
          setState(prev => ({ ...prev, user: result.user!, isLoading: false }));
        } else {
          setState(prev => ({ ...prev, error: result.error!, isLoading: false }));
        }
      } catch (error) {
        setState(prev => ({ ...prev, error: 'Error de conexión', isLoading: false }));
      }
    };

    const logout = async () => {
      setState(prev => ({ ...prev, isLoading: true }));
      try {
        await authService.logout();
        setState(prev => ({ ...prev, user: null, isLoading: false }));
      } catch (error) {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    const clearError = () => {
      setState(prev => ({ ...prev, error: null }));
    };

    return {
      ...state,
      login,
      logout,
      clearError,
    };
  };

  // Components
  export const LoginForm: React.FC<{ onLogin: (email: string, password: string) => void; loading: boolean }> = ({ onLogin, loading }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
      if (!email.trim() || !password.trim()) {
        Alert.alert('Error', 'Por favor completa todos los campos');
        return;
      }
      onLogin(email, password);
    };

    return (
      <View style={styles.featureContainer}>
        <Text style={styles.featureTitle}>🔐 Autenticación</Text>
        <Text style={styles.featureSubtitle}>Feature: Auth</Text>
        
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email (admin@example.com)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Contraseña (password)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />
          
          <Pressable
            style={[styles.button, loading && styles.disabledButton]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            )}
          </Pressable>
        </View>
      </View>
    );
  };

  export const UserProfile: React.FC<{ user: User; onLogout: () => void; loading: boolean }> = ({ user, onLogout, loading }) => {
    return (
      <View style={styles.featureContainer}>
        <Text style={styles.featureTitle}>👤 Perfil de Usuario</Text>
        <Text style={styles.featureSubtitle}>Feature: Auth</Text>
        
        <View style={styles.profileContainer}>
          <Text style={styles.avatar}>{user.avatar}</Text>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          
          <Pressable
            style={[styles.button, styles.logoutButton, loading && styles.disabledButton]}
            onPress={onLogout}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Cerrar Sesión</Text>
            )}
          </Pressable>
        </View>
      </View>
    );
  };
}

// ====== NOTES FEATURE ======
namespace NotesFeature {
  // Types
  export interface Note {
    id: string;
    title: string;
    content: string;
    category: 'personal' | 'work' | 'ideas';
    createdAt: Date;
    updatedAt: Date;
  }

  export interface NotesState {
    notes: Note[];
    isLoading: boolean;
    error: string | null;
  }

  // Service
  export class NotesService {
    private notes: Note[] = [
      {
        id: '1',
        title: 'Reunión de proyecto',
        content: 'Discutir roadmap Q1 2024',
        category: 'work',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: '2',
        title: 'Lista de compras',
        content: 'Leche, pan, huevos, café',
        category: 'personal',
        createdAt: new Date('2024-01-14'),
        updatedAt: new Date('2024-01-14'),
      },
    ];

    async getNotes(): Promise<Note[]> {
      await new Promise(resolve => setTimeout(resolve, 800));
      return [...this.notes];
    }

    async createNote(noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
      await new Promise(resolve => setTimeout(resolve, 600));
      const note: Note = {
        id: Date.now().toString(),
        ...noteData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.notes.push(note);
      return note;
    }

    async deleteNote(id: string): Promise<boolean> {
      await new Promise(resolve => setTimeout(resolve, 400));
      const index = this.notes.findIndex(note => note.id === id);
      if (index !== -1) {
        this.notes.splice(index, 1);
        return true;
      }
      return false;
    }
  }

  // Custom Hook
  export const useNotes = () => {
    const [state, setState] = useState<NotesState>({
      notes: [],
      isLoading: false,
      error: null,
    });

    const notesService = new NotesService();

    const loadNotes = async () => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      try {
        const notes = await notesService.getNotes();
        setState(prev => ({ ...prev, notes, isLoading: false }));
      } catch (error) {
        setState(prev => ({ ...prev, error: 'Error al cargar notas', isLoading: false }));
      }
    };

    const createNote = async (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
      setState(prev => ({ ...prev, isLoading: true }));
      try {
        await notesService.createNote(noteData);
        await loadNotes(); // Refresh list
      } catch (error) {
        setState(prev => ({ ...prev, error: 'Error al crear nota', isLoading: false }));
      }
    };

    const deleteNote = async (id: string) => {
      setState(prev => ({ ...prev, isLoading: true }));
      try {
        await notesService.deleteNote(id);
        await loadNotes(); // Refresh list
      } catch (error) {
        setState(prev => ({ ...prev, error: 'Error al eliminar nota', isLoading: false }));
      }
    };

    return {
      ...state,
      loadNotes,
      createNote,
      deleteNote,
    };
  };

  // Components
  export const NotesManager: React.FC = () => {
    const { notes, isLoading, error, loadNotes, createNote, deleteNote } = useNotes();
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState<Note['category']>('personal');

    React.useEffect(() => {
      loadNotes();
    }, []);

    const handleCreateNote = async () => {
      if (!title.trim() || !content.trim()) {
        Alert.alert('Error', 'Por favor completa todos los campos');
        return;
      }

      await createNote({ title, content, category });
      setTitle('');
      setContent('');
      setShowForm(false);
    };

    const handleDeleteNote = (id: string) => {
      Alert.alert(
        'Confirmar eliminación',
        '¿Estás seguro de que quieres eliminar esta nota?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Eliminar', style: 'destructive', onPress: () => deleteNote(id) },
        ]
      );
    };

    const getCategoryColor = (cat: Note['category']) => {
      switch (cat) {
        case 'work': return '#2196F3';
        case 'personal': return '#4CAF50';
        case 'ideas': return '#FF9800';
        default: return '#999';
      }
    };

    return (
      <View style={styles.featureContainer}>
        <Text style={styles.featureTitle}>📝 Gestión de Notas</Text>
        <Text style={styles.featureSubtitle}>Feature: Notes</Text>

        <Pressable
          style={styles.addButton}
          onPress={() => setShowForm(!showForm)}
        >
          <Text style={styles.addButtonText}>
            {showForm ? '✕ Cancelar' : '+ Nueva Nota'}
          </Text>
        </Pressable>

        {showForm && (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Título de la nota"
              value={title}
              onChangeText={setTitle}
            />
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Contenido de la nota"
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={3}
            />
            
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryLabel}>Categoría:</Text>
              <View style={styles.categoryButtons}>
                {(['personal', 'work', 'ideas'] as const).map((cat) => (
                  <Pressable
                    key={cat}
                    style={[
                      styles.categoryButton,
                      { backgroundColor: getCategoryColor(cat) },
                      category === cat && styles.selectedCategory
                    ]}
                    onPress={() => setCategory(cat)}
                  >
                    <Text style={styles.categoryButtonText}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            
            <Pressable
              style={[styles.button, isLoading && styles.disabledButton]}
              onPress={handleCreateNote}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>Crear Nota</Text>
            </Pressable>
          </View>
        )}

        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        {isLoading && notes.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#9C27B0" />
            <Text style={styles.loadingText}>Cargando notas...</Text>
          </View>
        ) : (
          <View style={styles.notesList}>
            {notes.map((note) => (
              <View key={note.id} style={[styles.noteCard, { borderLeftColor: getCategoryColor(note.category) }]}>
                <View style={styles.noteHeader}>
                  <Text style={styles.noteTitle}>{note.title}</Text>
                  <Pressable
                    style={styles.deleteNoteButton}
                    onPress={() => handleDeleteNote(note.id)}
                  >
                    <Text style={styles.deleteNoteButtonText}>🗑️</Text>
                  </Pressable>
                </View>
                <Text style={styles.noteContent}>{note.content}</Text>
                <Text style={styles.noteCategory}>{note.category}</Text>
                <Text style={styles.noteDate}>
                  {note.createdAt.toLocaleDateString()}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };
}

// ====== ANALYTICS FEATURE ======
namespace AnalyticsFeature {
  // Types
  export interface AnalyticsData {
    userSessions: number;
    notesCreated: number;
    loginAttempts: number;
    activeFeatures: string[];
  }

  // Service
  export class AnalyticsService {
    private data: AnalyticsData = {
      userSessions: 0,
      notesCreated: 0,
      loginAttempts: 0,
      activeFeatures: [],
    };

    async trackEvent(event: string, data?: any): Promise<void> {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      switch (event) {
        case 'user_login':
          this.data.loginAttempts++;
          this.data.userSessions++;
          break;
        case 'note_created':
          this.data.notesCreated++;
          break;
        case 'feature_accessed':
          if (data?.feature && !this.data.activeFeatures.includes(data.feature)) {
            this.data.activeFeatures.push(data.feature);
          }
          break;
      }
    }

    async getAnalytics(): Promise<AnalyticsData> {
      await new Promise(resolve => setTimeout(resolve, 400));
      return { ...this.data };
    }
  }

  // Custom Hook
  export const useAnalytics = () => {
    const [analytics, setAnalytics] = useState<AnalyticsData>({
      userSessions: 0,
      notesCreated: 0,
      loginAttempts: 0,
      activeFeatures: [],
    });
    const [loading, setLoading] = useState(false);

    const analyticsService = new AnalyticsService();

    const trackEvent = async (event: string, data?: any) => {
      await analyticsService.trackEvent(event, data);
    };

    const loadAnalytics = async () => {
      setLoading(true);
      try {
        const data = await analyticsService.getAnalytics();
        setAnalytics(data);
      } finally {
        setLoading(false);
      }
    };

    return {
      analytics,
      loading,
      trackEvent,
      loadAnalytics,
    };
  };

  // Components
  export const AnalyticsDashboard: React.FC = () => {
    const { analytics, loading, loadAnalytics } = useAnalytics();

    React.useEffect(() => {
      loadAnalytics();
    }, []);

    return (
      <View style={styles.featureContainer}>
        <Text style={styles.featureTitle}>📊 Analytics</Text>
        <Text style={styles.featureSubtitle}>Feature: Analytics</Text>

        <Pressable style={styles.refreshButton} onPress={loadAnalytics}>
          <Text style={styles.refreshButtonText}>🔄 Actualizar</Text>
        </Pressable>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#607D8B" />
            <Text style={styles.loadingText}>Cargando analytics...</Text>
          </View>
        ) : (
          <View style={styles.analyticsContainer}>
            <View style={styles.analyticsCard}>
              <Text style={styles.analyticsNumber}>{analytics.userSessions}</Text>
              <Text style={styles.analyticsLabel}>Sesiones</Text>
            </View>
            
            <View style={styles.analyticsCard}>
              <Text style={styles.analyticsNumber}>{analytics.notesCreated}</Text>
              <Text style={styles.analyticsLabel}>Notas Creadas</Text>
            </View>
            
            <View style={styles.analyticsCard}>
              <Text style={styles.analyticsNumber}>{analytics.loginAttempts}</Text>
              <Text style={styles.analyticsLabel}>Intentos Login</Text>
            </View>
            
            <View style={styles.analyticsCard}>
              <Text style={styles.analyticsNumber}>{analytics.activeFeatures.length}</Text>
              <Text style={styles.analyticsLabel}>Features Activos</Text>
            </View>
          </View>
        )}
      </View>
    );
  };
}

// ====== MAIN COMPONENT ======
const FeatureBasedExample: React.FC = () => {
  const { user, isLoading: authLoading, error: authError, login, logout, clearError } = AuthFeature.useAuth();
  const { trackEvent } = AnalyticsFeature.useAnalytics();

  React.useEffect(() => {
    trackEvent('feature_accessed', { feature: 'feature-based-architecture' });
  }, []);

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
    trackEvent('user_login');
  };

  const handleLogout = async () => {
    await logout();
    trackEvent('user_logout');
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Feature-Based Architecture</Text>
          <Text style={styles.subtitle}>
            Organización por características en lugar de por tipo de archivo
          </Text>
        </View>

        <View style={styles.architectureInfo}>
          <Text style={styles.architectureTitle}>📦 Estructura Feature-Based</Text>
          <View style={styles.structureCard}>
            <Text style={styles.structureTitle}>📁 Organización por Features</Text>
            <Text style={styles.structureCode}>{`features/
  auth/
    components/
      LoginForm.tsx
      UserProfile.tsx
    hooks/
      useAuth.ts
    services/
      AuthService.ts
    types/
      index.ts
    index.ts
  notes/
    components/
      NotesList.tsx
      NoteForm.tsx
    hooks/
      useNotes.ts
    services/
      NotesService.ts
    types/
      index.ts
    index.ts
  analytics/
    components/
      Dashboard.tsx
    hooks/
      useAnalytics.ts
    services/
      AnalyticsService.ts
    index.ts`}</Text>
          </View>
        </View>

        {authError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{authError}</Text>
            <Pressable style={styles.clearErrorButton} onPress={clearError}>
              <Text style={styles.clearErrorText}>✕</Text>
            </Pressable>
          </View>
        )}

        {!user ? (
          <AuthFeature.LoginForm onLogin={handleLogin} loading={authLoading} />
        ) : (
          <>
            <AuthFeature.UserProfile user={user} onLogout={handleLogout} loading={authLoading} />
            <NotesFeature.NotesManager />
            <AnalyticsFeature.AnalyticsDashboard />
          </>
        )}

        <View style={styles.codeSection}>
          <Text style={styles.codeTitle}>💡 Estructura Feature-Based</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{`// Feature: Auth
namespace AuthFeature {
  export interface User {
    id: string;
    email: string;
    name: string;
  }
  
  export class AuthService {
    async login(email: string, password: string): Promise<User> {
      // Authentication logic
    }
  }
  
  export const useAuth = () => {
    // Auth state and actions
  };
  
  export const LoginForm: React.FC = () => {
    // Login UI component
  };
}

// Feature: Notes  
namespace NotesFeature {
  export interface Note {
    id: string;
    title: string;
    content: string;
  }
  
  export class NotesService {
    async getNotes(): Promise<Note[]> {
      // Notes logic
    }
  }
  
  export const useNotes = () => {
    // Notes state and actions
  };
  
  export const NotesManager: React.FC = () => {
    // Notes UI component
  };
}

// Main App imports features
import { AuthFeature } from './features/auth';
import { NotesFeature } from './features/notes';

const App: React.FC = () => {
  const { user, login } = AuthFeature.useAuth();
  
  return (
    <View>
      {!user ? (
        <AuthFeature.LoginForm onLogin={login} />
      ) : (
        <NotesFeature.NotesManager />
      )}
    </View>
  );
};`}</Text>
          </View>
        </View>

        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>📦 Ventajas Feature-Based</Text>
          <View style={styles.benefitsList}>
            <Text style={styles.benefitItem}>✅ Escalabilidad horizontal por características</Text>
            <Text style={styles.benefitItem}>✅ Equipos pueden trabajar independientemente</Text>
            <Text style={styles.benefitItem}>✅ Código relacionado agrupado</Text>
            <Text style={styles.benefitItem}>✅ Fácil localización de funcionalidades</Text>
            <Text style={styles.benefitItem}>✅ Reutilización de features entre proyectos</Text>
            <Text style={styles.benefitItem}>✅ Testing aislado por feature</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            📦 Feature-Based es ideal para equipos grandes y aplicaciones con muchas funcionalidades
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
    backgroundColor: '#f3e5f5',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0',
  },
  architectureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 12,
  },
  structureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 12,
    borderRadius: 8,
  },
  structureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 8,
  },
  structureCode: {
    fontFamily: 'Courier',
    fontSize: 10,
    color: '#8E24AA',
    lineHeight: 14,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    margin: 10,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  errorText: {
    flex: 1,
    color: '#C62828',
    fontSize: 14,
  },
  clearErrorButton: {
    padding: 4,
  },
  clearErrorText: {
    color: '#C62828',
    fontSize: 16,
    fontWeight: 'bold',
  },
  featureContainer: {
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
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 12,
    color: '#9C27B0',
    fontWeight: '600',
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
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#9C27B0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  profileContainer: {
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    fontSize: 48,
    marginBottom: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: '#F44336',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryContainer: {
    gap: 8,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  categoryButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    opacity: 0.7,
  },
  selectedCategory: {
    opacity: 1,
    transform: [{ scale: 1.05 }],
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
  },
  notesList: {
    gap: 8,
    marginTop: 12,
  },
  noteCard: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  deleteNoteButton: {
    padding: 4,
  },
  deleteNoteButtonText: {
    fontSize: 16,
  },
  noteContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  noteCategory: {
    fontSize: 10,
    color: '#999',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  noteDate: {
    fontSize: 10,
    color: '#999',
  },
  refreshButton: {
    backgroundColor: '#607D8B',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  analyticsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  analyticsCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 80,
    flex: 1,
    borderLeftWidth: 3,
    borderLeftColor: '#607D8B',
  },
  analyticsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#607D8B',
  },
  analyticsLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
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
    fontSize: 9,
    lineHeight: 12,
  },
  benefitsSection: {
    backgroundColor: '#f3e5f5',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0',
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 12,
  },
  benefitsList: {
    gap: 8,
  },
  benefitItem: {
    fontSize: 14,
    color: '#7B1FA2',
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

export default FeatureBasedExample;
