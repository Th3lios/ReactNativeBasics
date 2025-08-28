import React, { useState, useEffect, useCallback, useMemo, useRef, useReducer } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HookPatternsExample: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<string>('custom-hooks');

  const patterns = [
    {
      id: 'custom-hooks',
      title: 'Custom Hooks',
      description: 'Encapsular lógica reutilizable en hooks personalizados',
      color: '#4CAF50'
    },
    {
      id: 'composition-hooks',
      title: 'Hook Composition',
      description: 'Combinar múltiples hooks para funcionalidad compleja',
      color: '#2196F3'
    },
    {
      id: 'state-machine-hooks',
      title: 'State Machine Hooks',
      description: 'Hooks que implementan máquinas de estado',
      color: '#FF9800'
    },
    {
      id: 'async-hooks',
      title: 'Async Hooks',
      description: 'Patrones para manejo asíncrono con hooks',
      color: '#9C27B0'
    }
  ];

  // ====== CUSTOM HOOKS PATTERNS ======
  
  // Hook 1: useCounter - Estado y acciones encapsuladas
  const useCounter = (initialValue: number = 0, step: number = 1) => {
    const [count, setCount] = useState(initialValue);

    const increment = useCallback(() => {
      setCount(prev => prev + step);
    }, [step]);

    const decrement = useCallback(() => {
      setCount(prev => prev - step);
    }, [step]);

    const reset = useCallback(() => {
      setCount(initialValue);
    }, [initialValue]);

    const setValue = useCallback((value: number) => {
      setCount(value);
    }, []);

    return {
      count,
      increment,
      decrement,
      reset,
      setValue,
      isPositive: count > 0,
      isZero: count === 0,
      isNegative: count < 0
    };
  };

  // Hook 2: useToggle - Boolean state management
  const useToggle = (initialValue: boolean = false) => {
    const [value, setValue] = useState(initialValue);

    const toggle = useCallback(() => {
      setValue(prev => !prev);
    }, []);

    const setTrue = useCallback(() => {
      setValue(true);
    }, []);

    const setFalse = useCallback(() => {
      setValue(false);
    }, []);

    return {
      value,
      toggle,
      setTrue,
      setFalse,
      setValue
    };
  };

  // Hook 3: useLocalStorage - Persistent state
  const useLocalStorage = <T,>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
      try {
        // En React Native usarías AsyncStorage aquí
        // const item = await AsyncStorage.getItem(key);
        // return item ? JSON.parse(item) : initialValue;
        return initialValue; // Simulado para este ejemplo
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    });

    const setValue = useCallback((value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        // En React Native:
        // await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
        console.log(`Saved to localStorage[${key}]:`, valueToStore);
      } catch (error) {
        console.log(error);
      }
    }, [key, storedValue]);

    return [storedValue, setValue] as const;
  };

  // Hook 4: useDebounce - Debounced values
  const useDebounce = <T,>(value: T, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

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

  // Hook 5: usePrevious - Access previous value
  const usePrevious = <T,>(value: T): T | undefined => {
    const ref = useRef<T>();
    
    useEffect(() => {
      ref.current = value;
    });
    
    return ref.current;
  };

  // ====== HOOK COMPOSITION PATTERNS ======
  
  // Composed Hook: useForm - Combining multiple hooks
  function useForm<T extends Record<string, any>>(initialValues: T) {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const setValue = useCallback((name: keyof T, value: any) => {
      setValues(prev => ({ ...prev, [name]: value }));
      
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }
    }, [errors]);

    const setError = useCallback((name: keyof T, error: string) => {
      setErrors(prev => ({ ...prev, [name]: error }));
    }, []);

    const setFieldTouched = useCallback((name: keyof T) => {
      setTouched(prev => ({ ...prev, [name]: true }));
    }, []);

    const validateField = useCallback((name: keyof T, value: any) => {
      // Simple validation rules
      if (!value || value.toString().trim() === '') {
        setError(name, 'Este campo es requerido');
        return false;
      }
      
      if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
        setError(name, 'Email inválido');
        return false;
      }
      
      return true;
    }, [setError]);

    const validate = useCallback(() => {
      let isValid = true;
      
      Object.keys(values).forEach(key => {
        const fieldValid = validateField(key as keyof T, values[key as keyof T]);
        if (!fieldValid) {
          isValid = false;
        }
      });
      
      return isValid;
    }, [values, validateField]);

    const handleSubmit = useCallback((onSubmit: (values: T) => Promise<void> | void) => {
      return async () => {
        setIsSubmitting(true);
        
        if (validate()) {
          try {
            await onSubmit(values);
            setValues(initialValues); // Reset form
            setTouched({});
          } catch (error) {
            console.error('Form submission error:', error);
          }
        }
        
        setIsSubmitting(false);
      };
    }, [values, validate, initialValues]);

    const reset = useCallback(() => {
      setValues(initialValues);
      setErrors({});
      setTouched({});
      setIsSubmitting(false);
    }, [initialValues]);

    return {
      values,
      errors,
      touched,
      isSubmitting,
      setValue,
      setError,
      setTouched: setFieldTouched,
      validate,
      handleSubmit,
      reset,
      hasErrors: Object.keys(errors).length > 0,
      isValid: Object.keys(errors).length === 0 && Object.keys(touched).length > 0
    };
  }

  // Composed Hook: useApi - Combining async state management
  const useApi = <T,>(url: string, options?: { autoFetch?: boolean }) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data based on URL
        let mockData: any;
        if (url.includes('users')) {
          mockData = [
            { id: 1, name: 'Ana García', email: 'ana@example.com' },
            { id: 2, name: 'Carlos López', email: 'carlos@example.com' }
          ];
        } else if (url.includes('posts')) {
          mockData = [
            { id: 1, title: 'React Hooks', content: 'Los hooks son geniales...' },
            { id: 2, title: 'React Native', content: 'Desarrollo móvil...' }
          ];
        } else {
          mockData = { message: 'Data loaded successfully' };
        }
        
        setData(mockData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }, [url]);

    const mutate = useCallback((newData: T) => {
      setData(newData);
    }, []);

    const refetch = useCallback(() => {
      return fetchData();
    }, [fetchData]);

    useEffect(() => {
      if (options?.autoFetch !== false) {
        fetchData();
      }
    }, [fetchData, options?.autoFetch]);

    return {
      data,
      loading,
      error,
      refetch,
      mutate,
      isError: !!error,
      isSuccess: !loading && !error && data !== null
    };
  };

  // ====== STATE MACHINE HOOKS ======
  
  // Hook with state machine pattern
  type FetchState = 
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: any }
    | { status: 'error'; error: string };

  type FetchAction = 
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: any }
    | { type: 'FETCH_ERROR'; payload: string }
    | { type: 'RESET' };

  const fetchReducer = (state: FetchState, action: FetchAction): FetchState => {
    switch (action.type) {
      case 'FETCH_START':
        return { status: 'loading' };
      case 'FETCH_SUCCESS':
        return { status: 'success', data: action.payload };
      case 'FETCH_ERROR':
        return { status: 'error', error: action.payload };
      case 'RESET':
        return { status: 'idle' };
      default:
        return state;
    }
  };

  const useFetchMachine = (url: string) => {
    const [state, dispatch] = useReducer(fetchReducer, { status: 'idle' });

    const execute = useCallback(async () => {
      dispatch({ type: 'FETCH_START' });
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockData = { id: 1, title: 'Data from state machine', url };
        dispatch({ type: 'FETCH_SUCCESS', payload: mockData });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' });
      }
    }, [url]);

    const reset = useCallback(() => {
      dispatch({ type: 'RESET' });
    }, []);

    return {
      state,
      execute,
      reset,
      isIdle: state.status === 'idle',
      isLoading: state.status === 'loading',
      isSuccess: state.status === 'success',
      isError: state.status === 'error',
      data: state.status === 'success' ? state.data : null,
      error: state.status === 'error' ? state.error : null
    };
  };

  // ====== ASYNC HOOKS PATTERNS ======
  
  // Hook for handling async operations with cleanup
  const useAsyncEffect = (effect: () => Promise<void> | (() => void), deps: React.DependencyList) => {
    useEffect(() => {
      let cancelled = false;
      let cleanup: (() => void) | undefined;

      const runEffect = async () => {
        try {
          const result = await effect();
          if (!cancelled && typeof result === 'function') {
            cleanup = result;
          }
        } catch (error) {
          if (!cancelled) {
            console.error('Async effect error:', error);
          }
        }
      };

      runEffect();

      return () => {
        cancelled = true;
        if (cleanup) {
          cleanup();
        }
      };
    }, deps);
  };

  // Hook for intervals with cleanup
  const useInterval = (callback: () => void, delay: number | null) => {
    const savedCallback = useRef(callback);

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      if (delay === null) return;

      const tick = () => savedCallback.current();
      const id = setInterval(tick, delay);
      
      return () => clearInterval(id);
    }, [delay]);
  };

  // ====== DEMO COMPONENTS ======
  
  const CustomHooksDemo: React.FC = () => {
    const counter = useCounter(0, 2);
    const toggle = useToggle(false);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const previousSearchTerm = usePrevious(debouncedSearchTerm);
    const [name, setName] = useLocalStorage('userName', 'Usuario');

    return (
      <View style={styles.demoCard}>
        <Text style={styles.demoTitle}>Custom Hooks Demo</Text>
        
        {/* Counter Hook */}
        <View style={styles.hookSection}>
          <Text style={styles.hookTitle}>useCounter Hook</Text>
          <View style={styles.counterControls}>
            <Pressable style={styles.counterBtn} onPress={counter.decrement}>
              <Text style={styles.counterBtnText}>-2</Text>
            </Pressable>
            <Text style={styles.counterValue}>
              {counter.count} 
              {counter.isPositive && ' 📈'}
              {counter.isZero && ' ⚖️'}
              {counter.isNegative && ' 📉'}
            </Text>
            <Pressable style={styles.counterBtn} onPress={counter.increment}>
              <Text style={styles.counterBtnText}>+2</Text>
            </Pressable>
          </View>
          <Pressable style={styles.resetBtn} onPress={counter.reset}>
            <Text style={styles.resetBtnText}>Reset</Text>
          </Pressable>
        </View>

        {/* Toggle Hook */}
        <View style={styles.hookSection}>
          <Text style={styles.hookTitle}>useToggle Hook</Text>
          <Pressable
            style={[styles.toggleBtn, toggle.value && styles.toggleBtnActive]}
            onPress={toggle.toggle}
          >
            <Text style={styles.toggleBtnText}>
              {toggle.value ? 'ON 🔛' : 'OFF 📴'}
            </Text>
          </Pressable>
        </View>

        {/* Debounce Hook */}
        <View style={styles.hookSection}>
          <Text style={styles.hookTitle}>useDebounce Hook</Text>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Escribe para ver debounce..."
          />
          <Text style={styles.debounceText}>
            Término actual: "{searchTerm}"{'\n'}
            Término debounced: "{debouncedSearchTerm}"{'\n'}
            Término anterior: "{previousSearchTerm || 'ninguno'}"
          </Text>
        </View>

        {/* LocalStorage Hook */}
        <View style={styles.hookSection}>
          <Text style={styles.hookTitle}>useLocalStorage Hook</Text>
          <TextInput
            style={styles.searchInput}
            value={name}
            onChangeText={setName}
            placeholder="Tu nombre"
          />
          <Text style={styles.storageText}>Guardado como: {name}</Text>
        </View>
      </View>
    );
  };

  const HookCompositionDemo: React.FC = () => {
    const form = useForm({
      name: '',
      email: '',
      message: ''
    });

    const { data: users, loading, refetch } = useApi<any[]>('/api/users');

    const handleSubmit = form.handleSubmit(async (values) => {
      Alert.alert('Form Submitted', JSON.stringify(values, null, 2));
    });

    return (
      <View style={styles.demoCard}>
        <Text style={styles.demoTitle}>Hook Composition Demo</Text>
        
        {/* Form Hook */}
        <View style={styles.hookSection}>
          <Text style={styles.hookTitle}>useForm Hook</Text>
          
          <TextInput
            style={[styles.formInput, form.errors.name && styles.inputError]}
            value={form.values.name}
            onChangeText={(text) => form.setValue('name', text)}
            onBlur={() => form.setTouched('name')}
            placeholder="Nombre"
          />
          {form.errors.name && (
            <Text style={styles.errorText}>{form.errors.name}</Text>
          )}

          <TextInput
            style={[styles.formInput, form.errors.email && styles.inputError]}
            value={form.values.email}
            onChangeText={(text) => form.setValue('email', text)}
            onBlur={() => form.setTouched('email')}
            placeholder="Email"
            keyboardType="email-address"
          />
          {form.errors.email && (
            <Text style={styles.errorText}>{form.errors.email}</Text>
          )}

          <TextInput
            style={[styles.formInput, styles.textArea]}
            value={form.values.message}
            onChangeText={(text) => form.setValue('message', text)}
            onBlur={() => form.setTouched('message')}
            placeholder="Mensaje"
            multiline
            numberOfLines={3}
          />

          <View style={styles.formButtons}>
            <Pressable
              style={[styles.submitBtn, form.isSubmitting && styles.btnDisabled]}
              onPress={handleSubmit}
              disabled={form.isSubmitting}
            >
              <Text style={styles.submitBtnText}>
                {form.isSubmitting ? 'Enviando...' : 'Enviar'}
              </Text>
            </Pressable>
            
            <Pressable style={styles.resetBtn} onPress={form.reset}>
              <Text style={styles.resetBtnText}>Reset</Text>
            </Pressable>
          </View>

          <Text style={styles.formStatus}>
            Valid: {form.isValid ? '✅' : '❌'} | 
            Has Errors: {form.hasErrors ? '❌' : '✅'}
          </Text>
        </View>

        {/* API Hook */}
        <View style={styles.hookSection}>
          <Text style={styles.hookTitle}>useApi Hook</Text>
          
          <Pressable style={styles.refetchBtn} onPress={refetch}>
            <Text style={styles.refetchBtnText}>
              {loading ? 'Cargando...' : 'Refetch Users'}
            </Text>
          </Pressable>

          {loading && <Text style={styles.loadingText}>Cargando usuarios...</Text>}
          
          {users && (
            <View style={styles.usersList}>
              {users.map((user) => (
                <Text key={user.id} style={styles.userItem}>
                  👤 {user.name} - {user.email}
                </Text>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  const StateMachineDemo: React.FC = () => {
    const fetchMachine = useFetchMachine('/api/data');

    return (
      <View style={styles.demoCard}>
        <Text style={styles.demoTitle}>State Machine Hook Demo</Text>
        
        <View style={styles.stateIndicator}>
          <Text style={styles.stateTitle}>Estado actual:</Text>
          <Text style={[
            styles.stateValue,
            fetchMachine.isLoading && styles.stateLoading,
            fetchMachine.isSuccess && styles.stateSuccess,
            fetchMachine.isError && styles.stateError
          ]}>
            {fetchMachine.state.status.toUpperCase()}
          </Text>
        </View>

        <View style={styles.machineControls}>
          <Pressable
            style={[styles.executeBtn, fetchMachine.isLoading && styles.btnDisabled]}
            onPress={fetchMachine.execute}
            disabled={fetchMachine.isLoading}
          >
            <Text style={styles.executeBtnText}>
              {fetchMachine.isLoading ? 'Ejecutando...' : 'Ejecutar'}
            </Text>
          </Pressable>

          <Pressable style={styles.resetBtn} onPress={fetchMachine.reset}>
            <Text style={styles.resetBtnText}>Reset</Text>
          </Pressable>
        </View>

        {fetchMachine.isSuccess && (
          <View style={styles.successContainer}>
            <Text style={styles.successTitle}>✅ Datos cargados:</Text>
            <Text style={styles.successData}>
              {JSON.stringify(fetchMachine.data, null, 2)}
            </Text>
          </View>
        )}

        {fetchMachine.isError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>❌ Error:</Text>
            <Text style={styles.errorMessage}>{fetchMachine.error}</Text>
          </View>
        )}
      </View>
    );
  };

  const AsyncHooksDemo: React.FC = () => {
    const [count, setCount] = useState(0);
    const [intervalRunning, setIntervalRunning] = useState(false);

    // useInterval demo
    useInterval(() => {
      setCount(c => c + 1);
    }, intervalRunning ? 1000 : null);

    // useAsyncEffect demo
    const [asyncData, setAsyncData] = useState<string>('');
    
    useAsyncEffect(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAsyncData(`Async effect executed at ${new Date().toLocaleTimeString()}`);
      
      return () => {
        console.log('Async effect cleanup');
      };
    }, []);

    return (
      <View style={styles.demoCard}>
        <Text style={styles.demoTitle}>Async Hooks Demo</Text>
        
        {/* Interval Hook */}
        <View style={styles.hookSection}>
          <Text style={styles.hookTitle}>useInterval Hook</Text>
          
          <Text style={styles.intervalCount}>Contador: {count}</Text>
          
          <Pressable
            style={[styles.intervalBtn, intervalRunning && styles.intervalBtnActive]}
            onPress={() => setIntervalRunning(!intervalRunning)}
          >
            <Text style={styles.intervalBtnText}>
              {intervalRunning ? 'Pausar' : 'Iniciar'} Interval
            </Text>
          </Pressable>
          
          <Pressable style={styles.resetBtn} onPress={() => setCount(0)}>
            <Text style={styles.resetBtnText}>Reset Counter</Text>
          </Pressable>
        </View>

        {/* Async Effect Hook */}
        <View style={styles.hookSection}>
          <Text style={styles.hookTitle}>useAsyncEffect Hook</Text>
          <Text style={styles.asyncData}>
            {asyncData || 'Ejecutando async effect...'}
          </Text>
        </View>
      </View>
    );
  };

  const codeExamples = {
    'custom-hooks': `// Custom Hooks Patterns

// Hook 1: useCounter - Encapsulated state logic
const useCounter = (initialValue = 0, step = 1) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(prev => prev + step);
  }, [step]);

  const decrement = useCallback(() => {
    setCount(prev => prev - step);
  }, [step]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return {
    count,
    increment,
    decrement,
    reset,
    isPositive: count > 0,
    isZero: count === 0
  };
};

// Hook 2: useToggle - Boolean state management
const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue(prev => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { value, toggle, setTrue, setFalse, setValue };
};

// Hook 3: useDebounce - Debounced values
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// Hook 4: useLocalStorage - Persistent state
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

// Uso de custom hooks
const MyComponent = () => {
  const counter = useCounter(0, 2);
  const toggle = useToggle(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [name, setName] = useLocalStorage('userName', '');

  return (
    <div>
      <div>Count: {counter.count}</div>
      <button onClick={counter.increment}>+</button>
      <button onClick={counter.decrement}>-</button>
      
      <div>Toggle: {toggle.value ? 'ON' : 'OFF'}</div>
      <button onClick={toggle.toggle}>Toggle</button>
      
      <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      <div>Debounced: {debouncedSearch}</div>
    </div>
  );
};`,

    'composition-hooks': `// Hook Composition Patterns

// Composed Hook: useForm - Combining multiple concerns
const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const validate = useCallback(() => {
    let isValid = true;
    const newErrors = {};

    Object.keys(values).forEach(key => {
      if (!values[key]) {
        newErrors[key] = 'Este campo es requerido';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values]);

  const handleSubmit = useCallback((onSubmit) => {
    return async () => {
      setIsSubmitting(true);
      
      if (validate()) {
        try {
          await onSubmit(values);
          setValues(initialValues);
          setTouched({});
        } catch (error) {
          console.error('Form error:', error);
        }
      }
      
      setIsSubmitting(false);
    };
  }, [values, validate, initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    handleSubmit,
    isValid: Object.keys(errors).length === 0
  };
};

// Composed Hook: useApi - Async state + caching
const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (options.autoFetch !== false) {
      fetchData();
    }
  }, [fetchData, options.autoFetch]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    mutate: setData
  };
};

// Uso de hooks compuestos
const UserForm = () => {
  const form = useForm({ name: '', email: '' });
  const { data: users, loading, refetch } = useApi('/api/users');

  const handleSubmit = form.handleSubmit(async (values) => {
    await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(values)
    });
    refetch(); // Actualizar lista
  });

  return (
    <form>
      <input
        value={form.values.name}
        onChange={e => form.setValue('name', e.target.value)}
      />
      {form.errors.name && <span>{form.errors.name}</span>}
      
      <button onClick={handleSubmit} disabled={form.isSubmitting}>
        {form.isSubmitting ? 'Enviando...' : 'Enviar'}
      </button>
      
      {loading ? 'Cargando...' : users?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </form>
  );
};`,

    'state-machine-hooks': `// State Machine Hook Patterns

// Estado y acciones definidas claramente
type FetchState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: any }
  | { status: 'error'; error: string };

type FetchAction = 
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: any }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'RESET' };

const fetchReducer = (state: FetchState, action: FetchAction): FetchState => {
  switch (action.type) {
    case 'FETCH_START':
      return { status: 'loading' };
    case 'FETCH_SUCCESS':
      return { status: 'success', data: action.payload };
    case 'FETCH_ERROR':
      return { status: 'error', error: action.payload };
    case 'RESET':
      return { status: 'idle' };
    default:
      return state;
  }
};

// Hook que implementa la máquina de estado
const useFetchMachine = (url) => {
  const [state, dispatch] = useReducer(fetchReducer, { status: 'idle' });

  const execute = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  }, [url]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return {
    state,
    execute,
    reset,
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
    data: state.status === 'success' ? state.data : null,
    error: state.status === 'error' ? state.error : null
  };
};

// Uso del hook de máquina de estado
const DataFetcher = () => {
  const {
    execute,
    reset,
    isIdle,
    isLoading,
    isSuccess,
    isError,
    data,
    error
  } = useFetchMachine('/api/data');

  return (
    <div>
      <button onClick={execute} disabled={isLoading}>
        {isLoading ? 'Cargando...' : 'Fetch Data'}
      </button>
      <button onClick={reset}>Reset</button>
      
      {isIdle && <p>Ready to fetch</p>}
      {isLoading && <p>Loading...</p>}
      {isSuccess && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {isError && <p>Error: {error}</p>}
    </div>
  );
};

// Ventajas de state machines:
// ✅ Estados explícitos y predecibles
// ✅ Transiciones controladas
// ✅ Impossible states son imposibles
// ✅ Fácil debugging y testing`,

    'async-hooks': `// Async Hooks Patterns

// Hook 1: useAsyncEffect - Async operations with cleanup
const useAsyncEffect = (effect, deps) => {
  useEffect(() => {
    let cancelled = false;
    let cleanup;

    const runEffect = async () => {
      try {
        const result = await effect();
        if (!cancelled && typeof result === 'function') {
          cleanup = result;
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Async effect error:', error);
        }
      }
    };

    runEffect();

    return () => {
      cancelled = true;
      if (cleanup) cleanup();
    };
  }, deps);
};

// Hook 2: useInterval - Intervals with cleanup
const useInterval = (callback, delay) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const tick = () => savedCallback.current();
    const id = setInterval(tick, delay);
    
    return () => clearInterval(id);
  }, [delay]);
};

// Hook 3: useTimeout - Timeouts with cleanup
const useTimeout = (callback, delay) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setTimeout(() => savedCallback.current(), delay);
    return () => clearTimeout(id);
  }, [delay]);
};

// Hook 4: useWebSocket - WebSocket connection
const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const [readyState, setReadyState] = useState(WebSocket.CONNECTING);

  useEffect(() => {
    const ws = new WebSocket(url);
    setSocket(ws);

    ws.onopen = () => setReadyState(WebSocket.OPEN);
    ws.onclose = () => setReadyState(WebSocket.CLOSED);
    ws.onerror = () => setReadyState(WebSocket.CLOSED);
    ws.onmessage = (event) => setLastMessage(event.data);

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = useCallback((message) => {
    if (socket && readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  }, [socket, readyState]);

  return {
    sendMessage,
    lastMessage,
    readyState,
    isConnected: readyState === WebSocket.OPEN
  };
};

// Uso de async hooks
const AsyncComponent = () => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // Auto-increment counter
  useInterval(() => {
    setCount(c => c + 1);
  }, isRunning ? 1000 : null);

  // Async effect for data loading
  useAsyncEffect(async () => {
    const data = await fetch('/api/data');
    console.log('Data loaded:', data);
    
    return () => {
      console.log('Cleanup async effect');
    };
  }, []);

  // WebSocket connection
  const { sendMessage, lastMessage, isConnected } = useWebSocket('ws://localhost:8080');

  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Stop' : 'Start'} Counter
      </button>
      
      <div>WebSocket: {isConnected ? 'Connected' : 'Disconnected'}</div>
      <div>Last message: {lastMessage}</div>
      <button onClick={() => sendMessage('Hello!')}>Send Message</button>
    </div>
  );
};`
  };

  const currentCode = codeExamples[selectedPattern as keyof typeof codeExamples] || '';

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Patrones de Hooks</Text>
          <Text style={styles.subtitle}>
            Custom hooks, composición de lógica y patrones avanzados
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>🪝 Hooks Avanzados</Text>
          <Text style={styles.infoText}>
            Los hooks personalizados te permiten encapsular y reutilizar lógica:{'\n\n'}
            🎯 <Text style={styles.infoBold}>Custom Hooks:</Text> Lógica encapsulada y reutilizable{'\n'}
            🔗 <Text style={styles.infoBold}>Composition:</Text> Combinar múltiples hooks{'\n'}
            🤖 <Text style={styles.infoBold}>State Machines:</Text> Estados predecibles{'\n'}
            ⚡ <Text style={styles.infoBold}>Async Patterns:</Text> Operaciones asíncronas
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Tipos de Hook Patterns</Text>
          
          <View style={styles.patternSelector}>
            {patterns.map((pattern) => (
              <Pressable
                key={pattern.id}
                style={[
                  styles.patternButton,
                  { borderColor: pattern.color },
                  selectedPattern === pattern.id && { backgroundColor: pattern.color }
                ]}
                onPress={() => setSelectedPattern(pattern.id)}
              >
                <Text style={[
                  styles.patternTitle,
                  selectedPattern === pattern.id && styles.selectedPatternText
                ]}>
                  {pattern.title}
                </Text>
                <Text style={[
                  styles.patternDescription,
                  selectedPattern === pattern.id && styles.selectedPatternText
                ]}>
                  {pattern.description}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💻 Código del Patrón</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{currentCode}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧪 Demos Interactivos</Text>
          
          {selectedPattern === 'custom-hooks' && <CustomHooksDemo />}
          {selectedPattern === 'composition-hooks' && <HookCompositionDemo />}
          {selectedPattern === 'state-machine-hooks' && <StateMachineDemo />}
          {selectedPattern === 'async-hooks' && <AsyncHooksDemo />}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🪝 Los custom hooks son la herramienta más poderosa para reutilizar lógica en React
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  infoSection: {
    backgroundColor: '#e8f5e8',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#2E7D32',
    lineHeight: 20,
  },
  infoBold: {
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  patternSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  patternButton: {
    flex: 1,
    minWidth: 120,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  patternTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  patternDescription: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  selectedPatternText: {
    color: '#fff',
  },
  codeBlock: {
    backgroundColor: '#2d3748',
    padding: 12,
    borderRadius: 8,
  },
  codeText: {
    color: '#a0aec0',
    fontFamily: 'Courier',
    fontSize: 9,
    lineHeight: 12,
  },
  demoCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  hookSection: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  hookTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  // Counter styles
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 8,
  },
  counterBtn: {
    backgroundColor: '#2196F3',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  counterValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 80,
    textAlign: 'center',
  },
  resetBtn: {
    backgroundColor: '#FF9800',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: 'center',
  },
  resetBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  // Toggle styles
  toggleBtn: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
  },
  toggleBtnActive: {
    backgroundColor: '#4CAF50',
  },
  toggleBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  // Search/Input styles
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 8,
  },
  debounceText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  storageText: {
    fontSize: 12,
    color: '#4CAF50',
    fontStyle: 'italic',
  },
  // Form styles
  formInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 8,
  },
  inputError: {
    borderColor: '#F44336',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  errorText: {
    fontSize: 12,
    color: '#F44336',
    marginBottom: 8,
  },
  formButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  submitBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  btnDisabled: {
    opacity: 0.6,
  },
  formStatus: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  // API styles
  refetchBtn: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  refetchBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  usersList: {
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 4,
  },
  userItem: {
    fontSize: 12,
    color: '#333',
    marginBottom: 4,
  },
  // State Machine styles
  stateIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  stateTitle: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
  },
  stateValue: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  stateLoading: {
    backgroundColor: '#FF9800',
    color: '#fff',
  },
  stateSuccess: {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
  stateError: {
    backgroundColor: '#F44336',
    color: '#fff',
  },
  machineControls: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 16,
  },
  executeBtn: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  executeBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  successContainer: {
    backgroundColor: '#e8f5e8',
    padding: 12,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
  },
  successTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  successData: {
    fontSize: 11,
    color: '#388E3C',
    fontFamily: 'Courier',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#F44336',
  },
  errorTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#C62828',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 12,
    color: '#D32F2F',
  },
  // Async hooks styles
  intervalCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  intervalBtn: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'center',
    marginBottom: 8,
  },
  intervalBtnActive: {
    backgroundColor: '#4CAF50',
  },
  intervalBtnText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  asyncData: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default HookPatternsExample;
