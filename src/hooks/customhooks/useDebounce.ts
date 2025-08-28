import { useState, useEffect } from 'react';

/**
 * Custom hook para hacer debounce de valores
 * Útil para optimizar búsquedas o llamadas a API que se disparan por input del usuario
 * @param value - Valor a hacer debounce
 * @param delay - Tiempo de delay en milisegundos
 * @returns Valor con debounce aplicado
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
