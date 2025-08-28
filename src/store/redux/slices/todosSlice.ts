import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

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
}

const initialState: TodosState = {
  items: [],
  filter: 'all',
  isLoading: false,
  error: null,
};

// Async thunk for simulating API call
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockTodos: Todo[] = [
        {
          id: '1',
          text: 'Learn Redux Toolkit',
          completed: false,
          createdAt: new Date().toISOString(),
          priority: 'high',
        },
        {
          id: '2',
          text: 'Build a React Native app',
          completed: true,
          createdAt: new Date().toISOString(),
          priority: 'medium',
        },
      ];
      
      return mockTodos;
    } catch (error) {
      return rejectWithValue('Failed to fetch todos');
    }
  }
);

// Async thunk for adding todo
export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (todoText: string, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: todoText,
        completed: false,
        createdAt: new Date().toISOString(),
        priority: 'medium',
      };
      
      return newTodo;
    } catch (error) {
      return rejectWithValue('Failed to add todo');
    }
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
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
    updateTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.items.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    setPriority: (state, action: PayloadAction<{ id: string; priority: Todo['priority'] }>) => {
      const todo = state.items.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.priority = action.payload.priority;
      }
    },
    setFilter: (state, action: PayloadAction<TodosState['filter']>) => {
      state.filter = action.payload;
    },
    clearCompleted: (state) => {
      state.items = state.items.filter(todo => !todo.completed);
    },
    markAllCompleted: (state) => {
      state.items.forEach(todo => {
        todo.completed = true;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchTodos
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // addTodoAsync
      .addCase(addTodoAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodo,
  setPriority,
  setFilter,
  clearCompleted,
  markAllCompleted,
} = todosSlice.actions;

export default todosSlice.reducer;
