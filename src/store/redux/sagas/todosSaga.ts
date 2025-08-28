// Import redux-saga effects with React Native compatibility
const { call, put, delay, takeEvery, takeLatest, select, fork, cancel, cancelled } = require('redux-saga/effects');
import { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoRequest,
  addTodoSuccess,
  addTodoFailure,
  updateTodoRequest,
  updateTodoSuccess,
  updateTodoFailure,
  markAllCompletedRequest,
  markAllCompletedSuccess,
  markAllCompletedFailure,
  Todo,
} from '../slices/todosSagaSlice';

// Mock API functions
function* mockFetchTodos() {
  yield delay(1500); // Simulate network delay
  
  const mockTodos: Todo[] = [
    {
      id: '1',
      text: 'Learn Redux Saga',
      completed: false,
      createdAt: new Date().toISOString(),
      priority: 'high',
    },
    {
      id: '2',
      text: 'Master Generator Functions',
      completed: true,
      createdAt: new Date().toISOString(),
      priority: 'medium',
    },
    {
      id: '3',
      text: 'Build Saga Examples',
      completed: false,
      createdAt: new Date().toISOString(),
      priority: 'high',
    },
  ];
  
  return mockTodos;
}

function* mockAddTodo(text: string) {
  yield delay(800);
  
  const newTodo: Todo = {
    id: Date.now().toString(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
    priority: 'medium',
  };
  
  return newTodo;
}

function* mockUpdateTodo(id: string, updates: Partial<Todo>) {
  yield delay(600);
  
  // Simulate potential failure
  if (Math.random() < 0.1) {
    throw new Error('Update failed - network error');
  }
  
  return { id, updates };
}

// Worker sagas
function* fetchTodosSaga() {
  try {
    const todos: Todo[] = yield call(mockFetchTodos);
    yield put(fetchTodosSuccess(todos));
  } catch (error) {
    yield put(fetchTodosFailure('Failed to fetch todos'));
  }
}

function* addTodoSaga(action: PayloadAction<string>) {
  try {
    const newTodo: Todo = yield call(mockAddTodo, action.payload);
    yield put(addTodoSuccess(newTodo));
  } catch (error) {
    yield put(addTodoFailure('Failed to add todo'));
  }
}

function* updateTodoSaga(action: PayloadAction<{ id: string; updates: Partial<Todo> }>) {
  try {
    const { id, updates } = action.payload;
    const result: { id: string; updates: Partial<Todo> } = yield call(mockUpdateTodo, id, updates);
    yield put(updateTodoSuccess(result));
  } catch (error) {
    yield put(updateTodoFailure(error instanceof Error ? error.message : 'Update failed'));
  }
}

function* markAllCompletedSaga() {
  try {
    // Get current todos from state
    const todos: Todo[] = yield select((state: any) => state.todos.items);
    
    // Update each todo that's not completed
    const updateTasks: any[] = [];
    for (const todo of todos) {
      if (!todo.completed) {
        const task = yield fork(mockUpdateTodo, todo.id, { completed: true });
        updateTasks.push(task);
      }
    }
    
    // Wait for all updates to complete
    yield updateTasks;
    
    yield put(markAllCompletedSuccess());
  } catch (error) {
    yield put(markAllCompletedFailure('Failed to mark all completed'));
  }
}

// Cancellable saga example
function* cancellableFetchTodosSaga() {
  try {
    const todos: Todo[] = yield call(mockFetchTodos);
    yield put(fetchTodosSuccess(todos));
  } catch (error) {
    yield put(fetchTodosFailure('Failed to fetch todos'));
  } finally {
    if (yield cancelled()) {
      console.log('Fetch todos saga was cancelled');
    }
  }
}

// Watcher sagas
function* watchFetchTodos() {
  yield takeLatest(fetchTodosRequest.type, cancellableFetchTodosSaga);
}

function* watchAddTodo() {
  yield takeEvery(addTodoRequest.type, addTodoSaga);
}

function* watchUpdateTodo() {
  yield takeEvery(updateTodoRequest.type, updateTodoSaga);
}

function* watchMarkAllCompleted() {
  yield takeEvery(markAllCompletedRequest.type, markAllCompletedSaga);
}

export {
  watchFetchTodos,
  watchAddTodo,
  watchUpdateTodo,
  watchMarkAllCompleted,
};
