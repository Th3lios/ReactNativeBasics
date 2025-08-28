import { create } from 'zustand';

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
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  clearCompleted: () => void;
  markAllCompleted: () => void;
  loadTodos: () => Promise<void>;
  addTodoAsync: (text: string) => Promise<void>;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  filter: 'all',
  isLoading: false,
  
  addTodo: (text: string) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: Date.now().toString(),
          text,
          completed: false,
          createdAt: new Date(),
          priority: 'medium' as const,
        },
      ],
    })),
  
  toggleTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  
  deleteTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  
  setFilter: (filter) => set({ filter }),
  
  clearCompleted: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    })),
  
  markAllCompleted: () =>
    set((state) => ({
      todos: state.todos.map((todo) => ({ ...todo, completed: true })),
    })),
  
  loadTodos: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));
      
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
          text: 'Build awesome apps',
          completed: false,
          createdAt: new Date(),
          priority: 'medium',
        },
        {
          id: '3',
          text: 'Master React Native',
          completed: true,
          createdAt: new Date(),
          priority: 'low',
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
      await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
      
      const newTodo: Todo = {
        id: Date.now().toString(),
        text,
        completed: false,
        createdAt: new Date(),
        priority: 'medium',
      };
      
      set((state) => ({
        todos: [...state.todos, newTodo],
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
    }
  },
}));
