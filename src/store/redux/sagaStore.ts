import { configureStore } from '@reduxjs/toolkit';
// Import redux-saga with React Native compatibility
const createSagaMiddleware = require('redux-saga').default;
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Import slices that work with sagas
import counterSlice from './slices/counterSagaSlice';
import todosSlice from './slices/todosSagaSlice';
import usersSlice from './slices/usersSagaSlice';
import weatherSlice from './slices/weatherSagaSlice';

// Import root saga
import rootSaga from './sagas/rootSaga';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure store with Redux Toolkit and Saga middleware
export const sagaStore = configureStore({
  reducer: {
    counter: counterSlice,
    todos: todosSlice,
    users: usersSlice,
    weather: weatherSlice,
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

// Infer types from store
export type SagaRootState = ReturnType<typeof sagaStore.getState>;
export type SagaAppDispatch = typeof sagaStore.dispatch;

// Typed hooks for Redux Saga
export const useSagaDispatch = () => useDispatch<SagaAppDispatch>();
export const useSagaSelector: TypedUseSelectorHook<SagaRootState> = useSelector;

export default sagaStore;
