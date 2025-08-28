import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
  isLoading: boolean;
  history: number[];
}

const initialState: CounterState = {
  value: 0,
  isLoading: false,
  history: [],
};

const counterSagaSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // Synchronous actions
    increment: (state) => {
      state.history.push(state.value);
      state.value += 1;
    },
    decrement: (state) => {
      state.history.push(state.value);
      state.value -= 1;
    },
    reset: (state) => {
      state.history.push(state.value);
      state.value = 0;
    },
    clearHistory: (state) => {
      state.history = [];
    },
    
    // Actions that trigger sagas
    incrementAsync: (state, action: PayloadAction<number>) => {
      state.isLoading = true;
    },
    incrementAsyncSuccess: (state, action: PayloadAction<number>) => {
      state.history.push(state.value);
      state.value += action.payload;
      state.isLoading = false;
    },
    incrementAsyncFailure: (state) => {
      state.isLoading = false;
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  reset,
  clearHistory,
  incrementAsync,
  incrementAsyncSuccess,
  incrementAsyncFailure,
  setLoading,
} = counterSagaSlice.actions;

export default counterSagaSlice.reducer;
