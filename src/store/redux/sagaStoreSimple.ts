import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Import redux-saga with different syntax for React Native compatibility
const createSagaMiddleware = require('redux-saga').default;

// Simple counter slice for testing
import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
  isLoading: boolean;
}

const initialState: CounterState = {
  value: 0,
  isLoading: false,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    incrementAsync: (state) => {
      state.isLoading = true;
    },
    incrementAsyncSuccess: (state, action) => {
      state.value += action.payload;
      state.isLoading = false;
    },
    incrementAsyncFailure: (state) => {
      state.isLoading = false;
    },
  },
});

// Simple saga
import { put, delay, takeEvery } from 'redux-saga/effects';

const { incrementAsync, incrementAsyncSuccess, incrementAsyncFailure } = counterSlice.actions;

function* incrementAsyncSaga(action: any) {
  try {
    yield delay(1000);
    yield put(incrementAsyncSuccess(action.payload || 1));
  } catch (error) {
    yield put(incrementAsyncFailure());
  }
}

function* watchIncrementAsync() {
  yield takeEvery(incrementAsync.type, incrementAsyncSaga);
}

function* rootSaga() {
  yield watchIncrementAsync();
}

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure store
export const sagaStore = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(sagaMiddleware),
  devTools: __DEV__,
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Export actions
export const { increment, decrement, reset } = counterSlice.actions;
export { incrementAsync };

// Infer types from store
export type SagaRootState = ReturnType<typeof sagaStore.getState>;
export type SagaAppDispatch = typeof sagaStore.dispatch;

// Typed hooks
export const useSagaDispatch = () => useDispatch<SagaAppDispatch>();
export const useSagaSelector: TypedUseSelectorHook<SagaRootState> = useSelector;

export default sagaStore;
