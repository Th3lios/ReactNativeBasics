// Import redux-saga effects with React Native compatibility
const { put, delay, takeEvery, takeLatest } = require('redux-saga/effects');
import { PayloadAction } from '@reduxjs/toolkit';
import {
  incrementAsync,
  incrementAsyncSuccess,
  incrementAsyncFailure,
} from '../slices/counterSagaSlice';

// Worker saga: will be fired on incrementAsync actions
function* incrementAsyncSaga(action: PayloadAction<number>) {
  try {
    // Simulate async operation (API call, etc.)
    yield delay(1000);
    
    // Dispatch success action
    yield put(incrementAsyncSuccess(action.payload));
  } catch (error) {
    // Dispatch failure action
    yield put(incrementAsyncFailure());
  }
}

// Watcher saga: spawns a new incrementAsyncSaga task on each incrementAsync action
function* watchIncrementAsync() {
  yield takeEvery(incrementAsync.type, incrementAsyncSaga);
}

// Alternative watcher that cancels previous request if new one comes in
function* watchIncrementAsyncLatest() {
  yield takeLatest(incrementAsync.type, incrementAsyncSaga);
}

export { watchIncrementAsync, watchIncrementAsyncLatest };
