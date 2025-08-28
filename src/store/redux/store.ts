import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import counterSlice from './slices/counterSlice';
import todosSlice from './slices/todosSlice';
import usersSlice from './slices/usersSlice';
import authSlice from './slices/authSlice';

// Configure store with Redux Toolkit
export const reduxStore = configureStore({
  reducer: {
    counter: counterSlice,
    todos: todosSlice,
    users: usersSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  devTools: __DEV__, // Enable Redux DevTools in development
});

// Infer types from store
export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

// Typed hooks for Redux
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default reduxStore;
