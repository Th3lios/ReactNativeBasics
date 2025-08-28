import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  isUpdating: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  isUpdating: false,
  error: null,
  searchQuery: '',
};

const usersSagaSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Sync actions
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    
    // Async actions that trigger sagas
    fetchUsersRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    
    updateUserRequest: (state, action: PayloadAction<{ userId: string; updates: Partial<User> }>) => {
      state.isUpdating = true;
      state.error = null;
    },
    updateUserSuccess: (state, action: PayloadAction<{ userId: string; updates: Partial<User> }>) => {
      state.isUpdating = false;
      const user = state.users.find(user => user.id === action.payload.userId);
      if (user) {
        Object.assign(user, action.payload.updates);
      }
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.isUpdating = false;
      state.error = action.payload;
    },
    
    // Batch update actions
    refreshUsersRequest: (state) => {
      state.isLoading = true;
    },
    refreshUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    refreshUsersFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setSelectedUser,
  setSearchQuery,
  clearError,
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  refreshUsersRequest,
  refreshUsersSuccess,
  refreshUsersFailure,
} = usersSagaSlice.actions;

export default usersSagaSlice.reducer;
