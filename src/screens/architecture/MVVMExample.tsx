import React, { useEffect, useState, useCallback } from 'react';
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
interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
}

class TaskModel {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Implementar autenticación',
      description: 'Configurar login y registro de usuarios',
      completed: false,
      priority: 'high',
      dueDate: new Date('2024-02-15'),
    },
    {
      id: '2',
      title: 'Diseñar interfaz principal',
      description: 'Crear wireframes y mockups de la app',
      completed: true,
      priority: 'medium',
      dueDate: new Date('2024-01-30'),
    },
    {
      id: '3',
      title: 'Configurar base de datos',
      description: 'Setup de Firebase/PostgreSQL',
      completed: false,
      priority: 'high',
      dueDate: new Date('2024-02-10'),
    },
  ];

  async getTasks(): Promise<Task[]> {
          await new Promise<void>(resolve => setTimeout(() => resolve(), 800));
    return [...this.tasks];
  }

  async createTask(taskData: Omit<Task, 'id'>): Promise<Task> {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 600));
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task | null> {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 400));
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updates };
      return this.tasks[index];
    }
    return null;
  }

  async deleteTask(id: string): Promise<boolean> {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 300));
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }
}

// ====== VIEWMODEL LAYER ======
class TaskViewModel {
  private model: TaskModel;
  private _tasks: Task[] = [];
  private _loading: boolean = false;
  private _error: string | null = null;
  private _formData: Partial<Task> = {};
  private _filter: 'all' | 'pending' | 'completed' = 'all';

  // Observers for reactive updates
  private observers: Array<() => void> = [];

  constructor(model: TaskModel) {
    this.model = model;
  }

  // Observable pattern for reactive updates
  subscribe(observer: () => void): () => void {
    this.observers.push(observer);
    return () => {
      const index = this.observers.indexOf(observer);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    };
  }

  private notify(): void {
    this.observers.forEach(observer => observer());
  }

  // Getters (computed properties)
  get tasks(): Task[] {
    return this._tasks;
  }

  get loading(): boolean {
    return this._loading;
  }

  get error(): string | null {
    return this._error;
  }

  get formData(): Partial<Task> {
    return this._formData;
  }

  get filter(): 'all' | 'pending' | 'completed' {
    return this._filter;
  }

  get filteredTasks(): Task[] {
    switch (this._filter) {
      case 'pending':
        return this._tasks.filter(task => !task.completed);
      case 'completed':
        return this._tasks.filter(task => task.completed);
      default:
        return this._tasks;
    }
  }

  get taskStats(): { total: number; completed: number; pending: number } {
    return {
      total: this._tasks.length,
      completed: this._tasks.filter(task => task.completed).length,
      pending: this._tasks.filter(task => !task.completed).length,
    };
  }

  get isFormValid(): boolean {
    return !!(
      this._formData.title?.trim() &&
      this._formData.description?.trim() &&
      this._formData.priority
    );
  }

  // Actions
  async loadTasks(): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      const tasks = await this.model.getTasks();
      this.setTasks(tasks);
    } catch (error) {
      this.setError('Error al cargar las tareas');
    } finally {
      this.setLoading(false);
    }
  }

  async createTask(): Promise<void> {
    if (!this.isFormValid) {
      this.setError('Por favor completa todos los campos obligatorios');
      return;
    }

    try {
      this.setLoading(true);
      this.setError(null);
      
      const taskData: Omit<Task, 'id'> = {
        title: this._formData.title!.trim(),
        description: this._formData.description!.trim(),
        priority: this._formData.priority!,
        completed: false,
        dueDate: this._formData.dueDate || new Date(),
      };

      await this.model.createTask(taskData);
      this.clearForm();
      await this.loadTasks(); // Refresh list
    } catch (error) {
      this.setError('Error al crear la tarea');
    } finally {
      this.setLoading(false);
    }
  }

  async toggleTaskCompletion(id: string): Promise<void> {
    const task = this._tasks.find(t => t.id === id);
    if (!task) return;

    try {
      await this.model.updateTask(id, { completed: !task.completed });
      await this.loadTasks(); // Refresh list
    } catch (error) {
      this.setError('Error al actualizar la tarea');
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      this.setLoading(true);
      await this.model.deleteTask(id);
      await this.loadTasks(); // Refresh list
    } catch (error) {
      this.setError('Error al eliminar la tarea');
    } finally {
      this.setLoading(false);
    }
  }

  // Form management
  updateFormField(field: keyof Task, value: any): void {
    this._formData = { ...this._formData, [field]: value };
    this.notify();
  }

  clearForm(): void {
    this._formData = {};
    this.notify();
  }

  setFilter(filter: 'all' | 'pending' | 'completed'): void {
    this._filter = filter;
    this.notify();
  }

  clearError(): void {
    this._error = null;
    this.notify();
  }

  // Private setters
  private setTasks(tasks: Task[]): void {
    this._tasks = tasks;
    this.notify();
  }

  private setLoading(loading: boolean): void {
    this._loading = loading;
    this.notify();
  }

  private setError(error: string | null): void {
    this._error = error;
    this.notify();
  }
}

// ====== VIEW COMPONENT ======
const MVVMExample: React.FC = () => {
  // ViewModel instance
  const [viewModel] = useState(() => new TaskViewModel(new TaskModel()));
  const [, forceUpdate] = useState({});

  // Subscribe to ViewModel changes
  useEffect(() => {
    const unsubscribe = viewModel.subscribe(() => {
      forceUpdate({}); // Force re-render when ViewModel changes
    });
    
    // Load initial data
    viewModel.loadTasks();
    
    return unsubscribe;
  }, [viewModel]);

  // Handlers
  const handleCreateTask = useCallback(() => {
    viewModel.createTask();
  }, [viewModel]);

  const handleToggleTask = useCallback((id: string) => {
    viewModel.toggleTaskCompletion(id);
  }, [viewModel]);

  const handleDeleteTask = useCallback((id: string) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que quieres eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => viewModel.deleteTask(id) },
      ]
    );
  }, [viewModel]);

  const handleFilterChange = useCallback((filter: 'all' | 'pending' | 'completed') => {
    viewModel.setFilter(filter);
  }, [viewModel]);

  // Get computed properties from ViewModel
  const { filteredTasks, taskStats, loading, error, formData, filter, isFormValid } = viewModel;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#FF5722';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#999';
    }
  };

  const renderTask = (task: Task) => (
    <View key={task.id} style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <Pressable
          style={styles.taskCheckbox}
          onPress={() => handleToggleTask(task.id)}
        >
          <Text style={styles.checkboxText}>
            {task.completed ? '✅' : '⭕'}
          </Text>
        </Pressable>
        
        <View style={styles.taskInfo}>
          <Text style={[styles.taskTitle, task.completed && styles.completedTask]}>
            {task.title}
          </Text>
          <Text style={[styles.taskDescription, task.completed && styles.completedTask]}>
            {task.description}
          </Text>
          <Text style={styles.taskDate}>
            Due: {task.dueDate.toLocaleDateString()}
          </Text>
        </View>
        
        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) }]}>
          <Text style={styles.priorityText}>{task.priority}</Text>
        </View>
        
        <Pressable
          style={styles.deleteButton}
          onPress={() => handleDeleteTask(task.id)}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>MVVM Architecture</Text>
          <Text style={styles.subtitle}>
            Model-View-ViewModel con binding reactivo y computed properties
          </Text>
        </View>

        <View style={styles.architectureInfo}>
          <Text style={styles.architectureTitle}>🔄 Componentes de MVVM</Text>
          <View style={styles.componentCard}>
            <Text style={styles.componentTitle}>📁 Model</Text>
            <Text style={styles.componentDescription}>
              Datos y lógica de negocio. Similar a MVP pero más enfocado en datos.
            </Text>
          </View>
          <View style={styles.componentCard}>
            <Text style={styles.componentTitle}>👁️ View</Text>
            <Text style={styles.componentDescription}>
              UI que se enlaza automáticamente al ViewModel a través de bindings.
            </Text>
          </View>
          <View style={styles.componentCard}>
            <Text style={styles.componentTitle}>🧠 ViewModel</Text>
            <Text style={styles.componentDescription}>
              Expone datos y comandos para la View. Maneja estado y computed properties.
            </Text>
          </View>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Pressable
              style={styles.clearErrorButton}
              onPress={() => viewModel.clearError()}
            >
              <Text style={styles.clearErrorText}>✕</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Estadísticas (Computed Properties)</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{taskStats.total}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, styles.completedStatNumber]}>{taskStats.completed}</Text>
              <Text style={styles.statLabel}>Completadas</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, styles.pendingStatNumber]}>{taskStats.pending}</Text>
              <Text style={styles.statLabel}>Pendientes</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Nueva Tarea</Text>
          
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Título de la tarea"
              value={formData.title || ''}
              onChangeText={(text) => viewModel.updateFormField('title', text)}
              editable={!loading}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={formData.description || ''}
              onChangeText={(text) => viewModel.updateFormField('description', text)}
              multiline
              numberOfLines={3}
              editable={!loading}
            />
            
            <View style={styles.priorityContainer}>
              <Text style={styles.priorityLabel}>Prioridad:</Text>
              <View style={styles.priorityButtons}>
                {(['low', 'medium', 'high'] as const).map((priority) => (
                  <Pressable
                    key={priority}
                    style={[
                      styles.priorityButton,
                      { backgroundColor: getPriorityColor(priority) },
                      formData.priority === priority && styles.selectedPriority
                    ]}
                    onPress={() => viewModel.updateFormField('priority', priority)}
                  >
                    <Text style={styles.priorityButtonText}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            
            <Pressable
              style={[
                styles.createButton,
                (!isFormValid || loading) && styles.disabledButton
              ]}
              onPress={handleCreateTask}
              disabled={!isFormValid || loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.createButtonText}>Crear Tarea</Text>
              )}
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Lista de Tareas</Text>
          
          <View style={styles.filterContainer}>
            {(['all', 'pending', 'completed'] as const).map((filterOption) => (
              <Pressable
                key={filterOption}
                style={[
                  styles.filterButton,
                  filter === filterOption && styles.activeFilter
                ]}
                onPress={() => handleFilterChange(filterOption)}
              >
                <Text style={[
                  styles.filterButtonText,
                  filter === filterOption && styles.activeFilterText
                ]}>
                  {filterOption === 'all' ? 'Todas' : filterOption === 'pending' ? 'Pendientes' : 'Completadas'}
                </Text>
              </Pressable>
            ))}
          </View>
          
          {loading && filteredTasks.length === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2196F3" />
              <Text style={styles.loadingText}>Cargando tareas...</Text>
            </View>
          ) : (
            <View style={styles.tasksList}>
              {filteredTasks.map(renderTask)}
            </View>
          )}
        </View>

        <View style={styles.codeSection}>
          <Text style={styles.codeTitle}>💡 Estructura MVVM</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{`// ViewModel - Estado reactivo y computed properties
class TaskViewModel {
  private _tasks: Task[] = [];
  private observers: Array<() => void> = [];
  
  // Computed property
  get filteredTasks(): Task[] {
    return this._tasks.filter(task => 
      this.filter === 'all' || 
      (this.filter === 'pending' && !task.completed)
    );
  }
  
  get taskStats() {
    return {
      total: this._tasks.length,
      completed: this._tasks.filter(t => t.completed).length
    };
  }
  
  // Observable pattern para reactivity
  subscribe(observer: () => void): () => void {
    this.observers.push(observer);
    return () => this.observers.splice(index, 1);
  }
  
  private notify(): void {
    this.observers.forEach(observer => observer());
  }
  
  // Actions que notifican cambios
  async loadTasks(): Promise<void> {
    this._tasks = await this.model.getTasks();
    this.notify(); // Triggers UI update
  }
}

// React Component se enlaza al ViewModel
const Component: React.FC = () => {
  const [viewModel] = useState(() => new TaskViewModel(model));
  const [, forceUpdate] = useState({});
  
  useEffect(() => {
    const unsubscribe = viewModel.subscribe(() => {
      forceUpdate({}); // Re-render on ViewModel changes
    });
    return unsubscribe;
  }, []);
  
  // Direct binding to ViewModel properties
  const { filteredTasks, taskStats, loading } = viewModel;
};`}</Text>
          </View>
        </View>

        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>🔄 Ventajas de MVVM</Text>
          <View style={styles.benefitsList}>
            <Text style={styles.benefitItem}>✅ Data binding automático y reactivo</Text>
            <Text style={styles.benefitItem}>✅ Computed properties para estado derivado</Text>
            <Text style={styles.benefitItem}>✅ Separación completa UI y lógica</Text>
            <Text style={styles.benefitItem}>✅ ViewModels reutilizables</Text>
            <Text style={styles.benefitItem}>✅ Testing fácil de ViewModels</Text>
            <Text style={styles.benefitItem}>✅ Menos código boilerplate en View</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🔄 MVVM es ideal para aplicaciones con UI compleja y mucho estado derivado
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
    backgroundColor: '#e3f2fd',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  architectureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
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
    color: '#1976D2',
    marginBottom: 4,
  },
  componentDescription: {
    fontSize: 12,
    color: '#1976D2',
    lineHeight: 16,
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  completedStatNumber: {
    color: '#4CAF50',
  },
  pendingStatNumber: {
    color: '#FF9800',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
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
  priorityContainer: {
    gap: 8,
  },
  priorityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  priorityButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    opacity: 0.7,
  },
  selectedPriority: {
    opacity: 1,
    transform: [{ scale: 1.05 }],
  },
  priorityButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  createButton: {
    backgroundColor: '#2196F3',
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
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeFilter: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
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
  tasksList: {
    gap: 8,
  },
  taskCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3',
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  taskCheckbox: {
    padding: 4,
  },
  checkboxText: {
    fontSize: 20,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  taskDate: {
    fontSize: 12,
    color: '#999',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 60,
    alignItems: 'center',
  },
  priorityText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
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
    backgroundColor: '#e3f2fd',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 12,
  },
  benefitsList: {
    gap: 8,
  },
  benefitItem: {
    fontSize: 14,
    color: '#1976D2',
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

export default MVVMExample;
