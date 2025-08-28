import { useState } from 'react';

export interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  setValue: (name: keyof T, value: any) => void;
  setError: (name: keyof T, error: string) => void;
  reset: () => void;
  validate: (validationRules: Partial<Record<keyof T, (value: any) => string | undefined>>) => boolean;
}

/**
 * Custom hook para manejar formularios con validación
 * @param initialValues - Valores iniciales del formulario
 * @returns Objeto con valores, errores y funciones para manejar el formulario
 */
export const useForm = <T extends Record<string, any>>(
  initialValues: T
): UseFormReturn<T> => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const setValue = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const setError = (name: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  const validate = (validationRules: Partial<Record<keyof T, (value: any) => string | undefined>>) => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(validationRules).forEach(key => {
      const rule = validationRules[key as keyof T];
      if (rule) {
        const error = rule(values[key as keyof T]);
        if (error) {
          newErrors[key as keyof T] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  return {
    values,
    errors,
    setValue,
    setError,
    reset,
    validate,
  };
};
