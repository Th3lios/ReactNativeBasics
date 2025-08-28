import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isActive: boolean;
  lastSeen: string;
}

interface UsersState {
  users: User[];
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
  searchQuery: '',
};

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUsers: User[] = [
        {
          id: '1',
          name: 'Ana García',
          email: 'ana@example.com',
          avatar: '👩‍💻',
          isActive: true,
          lastSeen: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Carlos López',
          email: 'carlos@example.com',
          avatar: '👨‍💼',
          isActive: false,
          lastSeen: '2024-01-10T10:30:00Z',
        },
        {
          id: '3',
          name: 'María Silva',
          email: 'maria@example.com',
          avatar: '👩‍🎨',
          isActive: true,
          lastSeen: new Date().toISOString(),
        },
        {
          id: '4',
          name: 'Juan Pérez',
          email: 'juan@example.com',
          avatar: '👨‍🔬',
          isActive: false,
          lastSeen: '2024-01-09T15:45:00Z',
        },
      ];
      
      return mockUsers;
    } catch (error) {
      return rejectWithValue('Failed to fetch users');
    }
  }
);

// Async thunk for updating user status
export const updateUserStatus = createAsyncThunk(
  'users/updateUserStatus',
  async ({ userId, isActive }: { userId: string; isActive: boolean }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return { userId, isActive, lastSeen: new Date().toISOString() };
    } catch (error) {
      return rejectWithValue('Failed to update user status');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    updateUserLocally: (state, action: PayloadAction<Partial<User> & { id: string }>) => {
      const userIndex = state.users.findIndex(user => user.id === action.payload.id);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...action.payload };
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    sortUsers: (state, action: PayloadAction<'name' | 'email' | 'lastSeen'>) => {
      const sortBy = action.payload;
      state.users.sort((a, b) => {
        if (sortBy === 'name' || sortBy === 'email') {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        if (sortBy === 'lastSeen') {
          return new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime();
        }
        return 0;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // updateUserStatus
      .addCase(updateUserStatus.pending, (state) => {
        // Optionally show loading for individual user updates
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const { userId, isActive, lastSeen } = action.payload;
        const user = state.users.find(user => user.id === userId);
        if (user) {
          user.isActive = isActive;
          user.lastSeen = lastSeen;
        }
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedUser,
  setSearchQuery,
  updateUserLocally,
  clearError,
  sortUsers,
} = usersSlice.actions;

export default usersSlice.reducer;
