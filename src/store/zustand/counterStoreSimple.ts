import { create } from 'zustand';

interface CounterState {
  count: number;
  history: number[];
  increment: () => void;
  decrement: () => void;
  incrementByAmount: (amount: number) => void;
  reset: () => void;
  clearHistory: () => void;
}

export const useCounterStore = create<CounterState>((set, get) => ({
  count: 0,
  history: [],
  
  increment: () =>
    set((state) => {
      const newCount = state.count + 1;
      return {
        count: newCount,
        history: [...state.history, state.count],
      };
    }),
  
  decrement: () =>
    set((state) => {
      const newCount = state.count - 1;
      return {
        count: newCount,
        history: [...state.history, state.count],
      };
    }),
  
  incrementByAmount: (amount: number) =>
    set((state) => {
      const newCount = state.count + amount;
      return {
        count: newCount,
        history: [...state.history, state.count],
      };
    }),
  
  reset: () =>
    set((state) => ({
      count: 0,
      history: [...state.history, state.count],
    })),
  
  clearHistory: () =>
    set((state) => ({
      ...state,
      history: [],
    })),
}));
