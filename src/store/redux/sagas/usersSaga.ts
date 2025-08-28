// Import redux-saga effects with React Native compatibility
const { call, put, delay, takeEvery, takeLatest, race, select } = require('redux-saga/effects');
import { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  refreshUsersRequest,
  refreshUsersSuccess,
  refreshUsersFailure,
  User,
} from '../slices/usersSagaSlice';

// Mock API functions
function* mockFetchUsers() {
  yield delay(2000); // Longer delay to demonstrate loading
  
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'Ana García',
      email: 'ana@example.com',
      avatar: '👩‍💻',
      isActive: true,
      lastSeen: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Carlos López',
      email: 'carlos@example.com',
      avatar: '👨‍💼',
      isActive: false,
      lastSeen: '2024-01-10T10:30:00Z',
    },
    {
      id: '3',
      name: 'María Silva',
      email: 'maria@example.com',
      avatar: '👩‍🎨',
      isActive: true,
      lastSeen: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'Juan Pérez',
      email: 'juan@example.com',
      avatar: '👨‍🔬',
      isActive: false,
      lastSeen: '2024-01-09T15:45:00Z',
    },
  ];
  
  return mockUsers;
}

function* mockUpdateUser(userId: string, updates: Partial<User>) {
  yield delay(1000);
  
  // Simulate random failure
  if (Math.random() < 0.15) {
    throw new Error('Network error - update failed');
  }
  
  return { userId, updates: { ...updates, lastSeen: new Date().toISOString() } };
}

// Worker sagas
function* fetchUsersSaga() {
  try {
    const users: User[] = yield call(mockFetchUsers);
    yield put(fetchUsersSuccess(users));
  } catch (error) {
    yield put(fetchUsersFailure('Failed to fetch users'));
  }
}

function* updateUserSaga(action: PayloadAction<{ userId: string; updates: Partial<User> }>) {
  try {
    const { userId, updates } = action.payload;
    const result: { userId: string; updates: Partial<User> } = yield call(mockUpdateUser, userId, updates);
    yield put(updateUserSuccess(result));
  } catch (error) {
    yield put(updateUserFailure(error instanceof Error ? error.message : 'Update failed'));
  }
}

// Race condition example - refresh with timeout
function* refreshUsersSaga(action: PayloadAction<string>) {
  try {
    const { response, timeout } = yield race({
      response: call(mockFetchUsers),
      timeout: delay(5000), // 5 second timeout
    });
    
    if (timeout) {
      throw new Error('Request timeout');
    }
    
    yield put(refreshUsersSuccess(response));
  } catch (error) {
    yield put(refreshUsersFailure(error instanceof Error ? error.message : 'Refresh failed'));
  }
}

// Complex saga that fetches users and updates their status in parallel
function* fetchAndUpdateUsersSaga() {
  try {
    // First fetch users
    const users: User[] = yield call(mockFetchUsers);
    yield put(fetchUsersSuccess(users));
    
    // Then update all inactive users to simulate checking their status
    const inactiveUsers = users.filter(user => !user.isActive);
    
    if (inactiveUsers.length > 0) {
      // Update users in parallel
      const updateTasks = inactiveUsers.map(user =>
        call(mockUpdateUser, user.id, { lastSeen: new Date().toISOString() })
      );
      
      const results: Array<{ userId: string; updates: Partial<User> }> = yield Promise.all(updateTasks);
      
      // Dispatch updates
      for (const result of results) {
        yield put(updateUserSuccess(result));
      }
    }
  } catch (error) {
    yield put(fetchUsersFailure('Failed to fetch and update users'));
  }
}

// Watcher sagas
function* watchFetchUsers() {
  yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
}

function* watchUpdateUser() {
  yield takeEvery(updateUserRequest.type, updateUserSaga);
}

function* watchRefreshUsers() {
  yield takeLatest(refreshUsersRequest.type, refreshUsersSaga);
}

export {
  watchFetchUsers,
  watchUpdateUser,
  watchRefreshUsers,
  fetchAndUpdateUsersSaga,
};
