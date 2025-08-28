import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
}

type ThemeAction = 
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_THEME'; payload: Theme };

const lightTheme: ThemeState = {
  theme: 'light',
  colors: {
    primary: '#007AFF',
    secondary: '#34C759',
    background: '#f8f9fa',
    surface: '#ffffff',
    text: '#333333',
    textSecondary: '#666666',
  },
};

const darkTheme: ThemeState = {
  theme: 'dark',
  colors: {
    primary: '#0A84FF',
    secondary: '#30D158',
    background: '#1c1c1e',
    surface: '#2c2c2e',
    text: '#ffffff',
    textSecondary: '#aeaeb2',
  },
};

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return state.theme === 'light' ? darkTheme : lightTheme;
    case 'SET_THEME':
      return action.payload === 'light' ? lightTheme : darkTheme;
    default:
      return state;
  }
};

interface ThemeContextType {
  state: ThemeState;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = 'light',
}) => {
  const [state, dispatch] = useReducer(
    themeReducer,
    initialTheme === 'light' ? lightTheme : darkTheme
  );

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const setTheme = (theme: Theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const value = {
    state,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
