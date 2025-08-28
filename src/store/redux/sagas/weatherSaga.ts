// Import redux-saga effects with React Native compatibility
const { call, put, delay, takeLatest, fork, all, cancelled } = require('redux-saga/effects');
import { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  fetchForecastRequest,
  fetchForecastSuccess,
  fetchForecastFailure,
  refreshAllWeatherRequest,
  WeatherData,
} from '../slices/weatherSagaSlice';

// Mock weather conditions
const weatherConditions = [
  { condition: 'Sunny', icon: '☀️', temp: 25 },
  { condition: 'Cloudy', icon: '☁️', temp: 18 },
  { condition: 'Rainy', icon: '🌧️', temp: 15 },
  { condition: 'Stormy', icon: '⛈️', temp: 12 },
  { condition: 'Snowy', icon: '❄️', temp: -2 },
];

// Mock API functions
function* mockFetchWeather(location: string) {
  yield delay(1200);
  
  // Simulate API failure occasionally
  if (Math.random() < 0.1) {
    throw new Error('Weather service unavailable');
  }
  
  const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
  
  const weatherData: WeatherData = {
    location,
    temperature: randomWeather.temp + Math.floor(Math.random() * 10) - 5,
    condition: randomWeather.condition,
    humidity: Math.floor(Math.random() * 40) + 40,
    windSpeed: Math.floor(Math.random() * 20) + 5,
    icon: randomWeather.icon,
    lastUpdated: new Date().toISOString(),
  };
  
  return weatherData;
}

function* mockFetchForecast(location: string) {
  yield delay(1800);
  
  const forecast: WeatherData[] = [];
  
  for (let i = 1; i <= 5; i++) {
    const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + i);
    
    forecast.push({
      location,
      temperature: randomWeather.temp + Math.floor(Math.random() * 8) - 4,
      condition: randomWeather.condition,
      humidity: Math.floor(Math.random() * 30) + 50,
      windSpeed: Math.floor(Math.random() * 15) + 5,
      icon: randomWeather.icon,
      lastUpdated: futureDate.toISOString(),
    });
  }
  
  return forecast;
}

// Worker sagas
function* fetchWeatherSaga(action: PayloadAction<string>) {
  try {
    const location = action.payload;
    const weatherData: WeatherData = yield call(mockFetchWeather, location);
    yield put(fetchWeatherSuccess(weatherData));
  } catch (error) {
    yield put(fetchWeatherFailure(error instanceof Error ? error.message : 'Weather fetch failed'));
  } finally {
    if (yield cancelled()) {
      console.log('Weather fetch was cancelled');
    }
  }
}

function* fetchForecastSaga(action: PayloadAction<string>) {
  try {
    const location = action.payload;
    const forecastData: WeatherData[] = yield call(mockFetchForecast, location);
    yield put(fetchForecastSuccess(forecastData));
  } catch (error) {
    yield put(fetchForecastFailure(error instanceof Error ? error.message : 'Forecast fetch failed'));
  }
}

// Complex saga that fetches both weather and forecast in parallel
function* refreshAllWeatherSaga(action: PayloadAction<string>) {
  try {
    const location = action.payload;
    
    // Fork both requests to run in parallel
    const weatherTask = yield fork(fetchWeatherSaga, { type: '', payload: location });
    const forecastTask = yield fork(fetchForecastSaga, { type: '', payload: location });
    
    // Wait for both to complete
    yield all([weatherTask, forecastTask]);
    
  } catch (error) {
    yield put(fetchWeatherFailure('Failed to refresh weather data'));
    yield put(fetchForecastFailure('Failed to refresh forecast data'));
  }
}

// Polling saga example - fetch weather every 30 seconds
function* weatherPollingLoop(location: string) {
  try {
    while (true) {
      yield call(fetchWeatherSaga, { type: '', payload: location });
      yield delay(30000); // Wait 30 seconds
    }
  } finally {
    if (yield cancelled()) {
      console.log('Weather polling stopped');
    }
  }
}

// Watcher sagas
function* watchFetchWeather() {
  yield takeLatest(fetchWeatherRequest.type, fetchWeatherSaga);
}

function* watchFetchForecast() {
  yield takeLatest(fetchForecastRequest.type, fetchForecastSaga);
}

function* watchRefreshAllWeather() {
  yield takeLatest(refreshAllWeatherRequest.type, refreshAllWeatherSaga);
}

export {
  watchFetchWeather,
  watchFetchForecast,
  watchRefreshAllWeather,
  weatherPollingLoop,
};
