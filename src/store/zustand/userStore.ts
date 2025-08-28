import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isActive: boolean;
  settings: {
    theme: 'light' | 'dark';
    notifications: boolean;
    language: string;
  };
}

interface UserState {
  users: User[];
  currentUser: User | null;
  isLoading: boolean;
  searchQuery: string;
  sortBy: 'name' | 'email' | 'status';
  
  // Actions
  setUsers: (users: User[]) => void;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  setCurrentUser: (user: User | null) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: UserState['sortBy']) => void;
  
  // Async actions
  fetchUsers: () => Promise<void>;
  updateUserAsync: (id: string, updates: Partial<User>) => Promise<void>;
  
  // Computed
  filteredUsers: () => User[];
  userCount: () => number;
  activeUserCount: () => number;
}

export const useUserStore = create<UserState>()(
  immer((set, get) => ({
    users: [],
    currentUser: null,
    isLoading: false,
    searchQuery: '',
    sortBy: 'name',
    
    setUsers: (users: User[]) => {
      set((state) => {
        state.users = users;
      });
    },
    
    addUser: (userData: Omit<User, 'id'>) => {
      set((state) => {
        const newUser: User = {
          ...userData,
          id: Date.now().toString(),
        };
        state.users.push(newUser);
      });
    },
    
    updateUser: (id: string, updates: Partial<User>) => {
      set((state) => {
        const userIndex = state.users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
          Object.assign(state.users[userIndex], updates);
        }
      });
    },
    
    deleteUser: (id: string) => {
      set((state) => {
        state.users = state.users.filter(user => user.id !== id);
      });
    },
    
    setCurrentUser: (user: User | null) => {
      set((state) => {
        state.currentUser = user;
      });
    },
    
    setSearchQuery: (query: string) => {
      set((state) => {
        state.searchQuery = query;
      });
    },
    
    setSortBy: (sortBy: UserState['sortBy']) => {
      set((state) => {
        state.sortBy = sortBy;
      });
    },
    
    fetchUsers: async () => {
      set((state) => {
        state.isLoading = true;
      });
      
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
            settings: {
              theme: 'light',
              notifications: true,
              language: 'es',
            },
          },
          {
            id: '2',
            name: 'Carlos López',
            email: 'carlos@example.com',
            avatar: '👨‍💼',
            isActive: false,
            settings: {
              theme: 'dark',
              notifications: false,
              language: 'en',
            },
          },
          {
            id: '3',
            name: 'María Silva',
            email: 'maria@example.com',
            avatar: '👩‍🎨',
            isActive: true,
            settings: {
              theme: 'light',
              notifications: true,
              language: 'es',
            },
          },
        ];
        
        set((state) => {
          state.users = mockUsers;
          state.isLoading = false;
        });
      } catch (error) {
        set((state) => {
          state.isLoading = false;
        });
      }
    },
    
    updateUserAsync: async (id: string, updates: Partial<User>) => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        set((state) => {
          const userIndex = state.users.findIndex(user => user.id === id);
          if (userIndex !== -1) {
            Object.assign(state.users[userIndex], updates);
          }
        });
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    },
    
    // Computed values
    filteredUsers: () => {
      const { users, searchQuery, sortBy } = get();
      
      let filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      return filtered.sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'email') return a.email.localeCompare(b.email);
        if (sortBy === 'status') return Number(b.isActive) - Number(a.isActive);
        return 0;
      });
    },
    
    userCount: () => get().users.length,
    
    activeUserCount: () => get().users.filter(user => user.isActive).length,
  }))
);
