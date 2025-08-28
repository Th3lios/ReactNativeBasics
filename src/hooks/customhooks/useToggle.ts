import { useState } from 'react';

export interface UseToggleReturn {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
}

/**
 * Custom hook para alternar valores booleanos
 * @param initialValue - Valor inicial del toggle (default: false)
 * @returns Objeto con el valor actual y funciones para controlarlo
 */
export const useToggle = (initialValue: boolean = false): UseToggleReturn => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(prev => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return {
    value,
    toggle,
    setTrue,
    setFalse,
  };
};
