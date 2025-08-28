import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
}

interface TodosState {
  items: Todo[];
  filter: 'all' | 'active' | 'completed';
  isLoading: boolean;
  error: string | null;
  isAdding: boolean;
  isUpdating: boolean;
}

const initialState: TodosState = {
  items: [],
  filter: 'all',
  isLoading: false,
  error: null,
  isAdding: false,
  isUpdating: false,
};

const todosSagaSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Sync actions
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
        createdAt: new Date().toISOString(),
        priority: 'medium',
      };
      state.items.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<TodosState['filter']>) => {
      state.filter = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    
    // Async actions that trigger sagas
    fetchTodosRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchTodosSuccess: (state, action: PayloadAction<Todo[]>) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    fetchTodosFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    
    addTodoRequest: (state, action: PayloadAction<string>) => {
      state.isAdding = true;
      state.error = null;
    },
    addTodoSuccess: (state, action: PayloadAction<Todo>) => {
      state.isAdding = false;
      state.items.push(action.payload);
    },
    addTodoFailure: (state, action: PayloadAction<string>) => {
      state.isAdding = false;
      state.error = action.payload;
    },
    
    updateTodoRequest: (state, action: PayloadAction<{ id: string; updates: Partial<Todo> }>) => {
      state.isUpdating = true;
      state.error = null;
    },
    updateTodoSuccess: (state, action: PayloadAction<{ id: string; updates: Partial<Todo> }>) => {
      state.isUpdating = false;
      const todo = state.items.find(todo => todo.id === action.payload.id);
      if (todo) {
        Object.assign(todo, action.payload.updates);
      }
    },
    updateTodoFailure: (state, action: PayloadAction<string>) => {
      state.isUpdating = false;
      state.error = action.payload;
    },
    
    // Batch operations
    markAllCompletedRequest: (state) => {
      state.isUpdating = true;
    },
    markAllCompletedSuccess: (state) => {
      state.isUpdating = false;
      state.items.forEach(todo => {
        todo.completed = true;
      });
    },
    markAllCompletedFailure: (state, action: PayloadAction<string>) => {
      state.isUpdating = false;
      state.error = action.payload;
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
  clearError,
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoRequest,
  addTodoSuccess,
  addTodoFailure,
  updateTodoRequest,
  updateTodoSuccess,
  updateTodoFailure,
  markAllCompletedRequest,
  markAllCompletedSuccess,
  markAllCompletedFailure,
} = todosSagaSlice.actions;

export default todosSagaSlice.reducer;
