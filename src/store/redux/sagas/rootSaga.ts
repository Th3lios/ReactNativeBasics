// Import redux-saga effects with React Native compatibility
const { all, fork } = require('redux-saga/effects');

// Import watcher sagas
import { watchIncrementAsync } from './counterSaga';
import {
  watchFetchTodos,
  watchAddTodo,
  watchUpdateTodo,
  watchMarkAllCompleted,
} from './todosSaga';
import {
  watchFetchUsers,
  watchUpdateUser,
  watchRefreshUsers,
} from './usersSaga';
import {
  watchFetchWeather,
  watchFetchForecast,
  watchRefreshAllWeather,
} from './weatherSaga';

// Root saga that combines all watchers
export default function* rootSaga() {
  yield all([
    // Counter sagas
    fork(watchIncrementAsync),
    
    // Todos sagas
    fork(watchFetchTodos),
    fork(watchAddTodo),
    fork(watchUpdateTodo),
    fork(watchMarkAllCompleted),
    
    // Users sagas
    fork(watchFetchUsers),
    fork(watchUpdateUser),
    fork(watchRefreshUsers),
    
    // Weather sagas
    fork(watchFetchWeather),
    fork(watchFetchForecast),
    fork(watchRefreshAllWeather),
  ]);
}
