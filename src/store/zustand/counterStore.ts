import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CounterState {
  count: number;
  history: number[];
  increment: () => void;
  decrement: () => void;
  incrementByAmount: (amount: number) => void;
  reset: () => void;
  clearHistory: () => void;
}

export const useCounterStore = create<CounterState>()(
  persist(
    (set, get) => ({
      count: 0,
      history: [],
      
      increment: () => set((state) => ({ 
        count: state.count + 1,
        history: [...state.history, state.count]
      })),
      
      decrement: () => set((state) => ({ 
        count: state.count - 1,
        history: [...state.history, state.count]
      })),
      
      incrementByAmount: (amount: number) => set((state) => ({ 
        count: state.count + amount,
        history: [...state.history, state.count]
      })),
      
      reset: () => set((state) => ({ 
        count: 0,
        history: [...state.history, state.count]
      })),
      
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'counter-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
