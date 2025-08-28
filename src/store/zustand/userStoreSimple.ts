import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isActive: boolean;
  settings: {
    theme: 'light' | 'dark';
    notifications: boolean;
    language: 'en' | 'es' | 'fr';
  };
}

interface UserState {
  users: User[];
  currentUser: User | null;
  isLoading: boolean;
  searchQuery: string;
  sortBy: 'name' | 'email' | 'status';
  setCurrentUser: (user: User | null) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: 'name' | 'email' | 'status') => void;
  fetchUsers: () => Promise<void>;
  updateUserAsync: (id: string, updates: Partial<User>) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  currentUser: null,
  isLoading: false,
  searchQuery: '',
  sortBy: 'name',
  
  setCurrentUser: (user) => set({ currentUser: user }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortBy: (sortBy) => set({ sortBy }),
  
  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(() => resolve(), 1500));
      
      const mockUsers: User[] = [
        {
          id: '1',
          name: 'Ana García',
          email: 'ana@example.com',
          avatar: '👩‍💻',
          isActive: true,
          settings: {
            theme: 'dark',
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
            theme: 'light',
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
            language: 'fr',
          },
        },
      ];
      
      set({ users: mockUsers, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },
  
  updateUserAsync: async (id: string, updates: Partial<User>) => {
    try {
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(() => resolve(), 800));
      
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? { ...user, ...updates } : user
        ),
        currentUser: state.currentUser?.id === id 
          ? { ...state.currentUser, ...updates } 
          : state.currentUser,
      }));
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  },
}));
