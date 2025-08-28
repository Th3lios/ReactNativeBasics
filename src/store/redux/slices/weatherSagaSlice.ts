import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  lastUpdated: string;
}

interface WeatherState {
  currentWeather: WeatherData | null;
  forecast: WeatherData[];
  isLoading: boolean;
  isForecastLoading: boolean;
  error: string | null;
  lastLocation: string;
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: [],
  isLoading: false,
  isForecastLoading: false,
  error: null,
  lastLocation: '',
};

const weatherSagaSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    // Current weather actions
    fetchWeatherRequest: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = null;
      state.lastLocation = action.payload;
    },
    fetchWeatherSuccess: (state, action: PayloadAction<WeatherData>) => {
      state.isLoading = false;
      state.currentWeather = action.payload;
    },
    fetchWeatherFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    
    // Forecast actions
    fetchForecastRequest: (state, action: PayloadAction<string>) => {
      state.isForecastLoading = true;
      state.error = null;
    },
    fetchForecastSuccess: (state, action: PayloadAction<WeatherData[]>) => {
      state.isForecastLoading = false;
      state.forecast = action.payload;
    },
    fetchForecastFailure: (state, action: PayloadAction<string>) => {
      state.isForecastLoading = false;
      state.error = action.payload;
    },
    
    // Refresh all weather data
    refreshAllWeatherRequest: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.isForecastLoading = true;
      state.error = null;
      state.lastLocation = action.payload;
    },
    
    // Clear actions
    clearWeatherData: (state) => {
      state.currentWeather = null;
      state.forecast = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  fetchForecastRequest,
  fetchForecastSuccess,
  fetchForecastFailure,
  refreshAllWeatherRequest,
  clearWeatherData,
  clearError,
} = weatherSagaSlice.actions;

export default weatherSagaSlice.reducer;
