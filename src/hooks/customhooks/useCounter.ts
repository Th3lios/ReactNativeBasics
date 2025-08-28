import { useState } from 'react';

export interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setValue: (value: number) => void;
}

/**
 * Custom hook para manejar un contador con operaciones básicas
 * @param initialValue - Valor inicial del contador (default: 0)
 * @returns Objeto con el valor actual y funciones para manipularlo
 */
export const useCounter = (initialValue: number = 0): UseCounterReturn => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);
  const setValue = (value: number) => setCount(value);

  return {
    count,
    increment,
    decrement,
    reset,
    setValue,
  };
};
