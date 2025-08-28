import { useState } from 'react';

export type UseLocalStorageReturn<T> = [
  T,
  (value: T | ((val: T) => T)) => void
];

/**
 * Custom hook para persistir estado en localStorage (simulado para React Native)
 * En una app real de React Native, usarías AsyncStorage
 * @param key - Clave para identificar el valor en localStorage
 * @param initialValue - Valor inicial si no existe en localStorage
 * @returns Tupla con el valor actual y función para actualizarlo
 */
export const useLocalStorage = <T>(
  key: string, 
  initialValue: T
): UseLocalStorageReturn<T> => {
  // En React Native real, usarías AsyncStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Simular localStorage
      const item = `localStorage_${key}`;
      return initialValue; // En real: JSON.parse(AsyncStorage.getItem(item)) || initialValue
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      // En real: AsyncStorage.setItem(key, JSON.stringify(valueToStore))
      console.log(`localStorage simulation: ${key} =`, valueToStore);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
};
