import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
  history: number[];
  isLoading: boolean;
}

const initialState: CounterState = {
  value: 0,
  history: [],
  isLoading: false,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.history.push(state.value);
      state.value += 1;
    },
    decrement: (state) => {
      state.history.push(state.value);
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.history.push(state.value);
      state.value += action.payload;
    },
    reset: (state) => {
      state.history.push(state.value);
      state.value = 0;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  reset,
  setLoading,
  clearHistory,
} = counterSlice.actions;

export default counterSlice.reducer;
