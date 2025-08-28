import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  isLoading: boolean;
  
  // Actions
  addTodo: (text: string, priority?: Todo['priority']) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
  setFilter: (filter: TodoState['filter']) => void;
  clearCompleted: () => void;
  markAllCompleted: () => void;
  
  // Async actions
  loadTodos: () => Promise<void>;
  addTodoAsync: (text: string) => Promise<void>;
  
  // Computed values
  filteredTodos: () => Todo[];
  stats: () => { total: number; active: number; completed: number };
}

export const useTodoStore = create<TodoState>()(
  subscribeWithSelector((set, get) => ({
    todos: [],
    filter: 'all',
    isLoading: false,
    
    addTodo: (text: string, priority: Todo['priority'] = 'medium') => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text,
        completed: false,
        createdAt: new Date(),
        priority,
      };
      set((state) => ({ todos: [...state.todos, newTodo] }));
    },
    
    toggleTodo: (id: string) => {
      set((state) => ({
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      }));
    },
    
    deleteTodo: (id: string) => {
      set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id)
      }));
    },
    
    updateTodo: (id: string, text: string) => {
      set((state) => ({
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, text } : todo
        )
      }));
    },
    
    setFilter: (filter: TodoState['filter']) => {
      set({ filter });
    },
    
    clearCompleted: () => {
      set((state) => ({
        todos: state.todos.filter(todo => !todo.completed)
      }));
    },
    
    markAllCompleted: () => {
      set((state) => ({
        todos: state.todos.map(todo => ({ ...todo, completed: true }))
      }));
    },
    
    loadTodos: async () => {
      set({ isLoading: true });
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockTodos: Todo[] = [
          {
            id: '1',
            text: 'Learn Zustand',
            completed: false,
            createdAt: new Date(),
            priority: 'high',
          },
          {
            id: '2',
            text: 'Build awesome app',
            completed: true,
            createdAt: new Date(),
            priority: 'medium',
          },
        ];
        
        set({ todos: mockTodos, isLoading: false });
      } catch (error) {
        set({ isLoading: false });
      }
    },
    
    addTodoAsync: async (text: string) => {
      set({ isLoading: true });
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const newTodo: Todo = {
          id: Date.now().toString(),
          text,
          completed: false,
          createdAt: new Date(),
          priority: 'medium',
        };
        
        set((state) => ({ 
          todos: [...state.todos, newTodo],
          isLoading: false 
        }));
      } catch (error) {
        set({ isLoading: false });
      }
    },
    
    // Computed values
    filteredTodos: () => {
      const { todos, filter } = get();
      if (filter === 'active') return todos.filter(todo => !todo.completed);
      if (filter === 'completed') return todos.filter(todo => todo.completed);
      return todos;
    },
    
    stats: () => {
      const { todos } = get();
      const completed = todos.filter(todo => todo.completed).length;
      return {
        total: todos.length,
        active: todos.length - completed,
        completed,
      };
    },
  }))
);

// Subscription example - log when todos change
useTodoStore.subscribe(
  (state) => state.todos,
  (todos) => {
    console.log('Todos changed:', todos.length);
  }
);
