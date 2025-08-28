import { useEffect, useRef } from 'react';

/**
 * Custom hook para manejar intervalos con cleanup automático
 * @param callback - Función a ejecutar en cada intervalo
 * @param delay - Tiempo de delay en milisegundos, null para pausar
 */
export const useInterval = (callback: () => void, delay: number | null): void => {
  const savedCallback = useRef(callback);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(interval);
    }
  }, [delay]);
};
