import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Interfaz para definir qué métodos se exponen
interface CustomInputRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  getValue: () => string;
  setValue: (value: string) => void;
  validate: () => boolean;
}

// Componente personalizado con forwardRef + useImperativeHandle
const CustomInput = forwardRef<CustomInputRef, {
  placeholder?: string;
  onValueChange?: (value: string) => void;
  validator?: (value: string) => boolean;
  validationMessage?: string;
}>((props, ref) => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const inputRef = useRef<TextInput>(null);

  // useImperativeHandle define qué métodos están disponibles para el componente padre
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    blur: () => {
      inputRef.current?.blur();
    },
    clear: () => {
      setValue('');
      setIsValid(true);
      props.onValueChange?.('');
    },
    getValue: () => {
      return value;
    },
    setValue: (newValue: string) => {
      setValue(newValue);
      const valid = props.validator ? props.validator(newValue) : true;
      setIsValid(valid);
      props.onValueChange?.(newValue);
    },
    validate: () => {
      const valid = props.validator ? props.validator(value) : true;
      setIsValid(valid);
      return valid;
    }
  }), [value, props.validator, props.onValueChange]);

  const handleChangeText = (text: string) => {
    setValue(text);
    const valid = props.validator ? props.validator(text) : true;
    setIsValid(valid);
    props.onValueChange?.(text);
  };

  return (
    <View style={styles.customInputContainer}>
      <TextInput
        ref={inputRef}
        style={[
          styles.customInput,
          !isValid && styles.invalidInput
        ]}
        value={value}
        onChangeText={handleChangeText}
        placeholder={props.placeholder}
        placeholderTextColor="#999"
      />
      {!isValid && (
        <Text style={styles.errorMessage}>
          {props.validationMessage || 'Valor inválido'}
        </Text>
      )}
    </View>
  );
});

// Contador con métodos imperativos
interface CounterRef {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (count: number) => void;
  getCount: () => number;
}

const ImperativeCounter = forwardRef<CounterRef>((_, ref) => {
  const [count, setCount] = useState(0);

  useImperativeHandle(ref, () => ({
    increment: () => setCount(prev => prev + 1),
    decrement: () => setCount(prev => prev - 1),
    reset: () => setCount(0),
    setCount: (newCount: number) => setCount(newCount),
    getCount: () => count,
  }), [count]);

  return (
    <View style={styles.counterContainer}>
      <Text style={styles.counterDisplay}>Count: {count}</Text>
    </View>
  );
});

// Timer con controles imperativos
interface TimerRef {
  start: () => void;
  stop: () => void;
  reset: () => void;
  getTime: () => number;
}

const ImperativeTimer = forwardRef<TimerRef>((_, ref) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  useImperativeHandle(ref, () => ({
    start: () => {
      if (!isRunning) {
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
          setSeconds(prev => prev + 1);
        }, 1000);
      }
    },
    stop: () => {
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    },
    reset: () => {
      setIsRunning(false);
      setSeconds(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    },
    getTime: () => seconds,
  }), [isRunning, seconds]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerDisplay}>{formatTime(seconds)}</Text>
      <Text style={styles.timerStatus}>
        {isRunning ? '▶️ Ejecutándose' : '⏸️ Pausado'}
      </Text>
    </View>
  );
});

const UseImperativeHandleExample = () => {
  // Referencias para los componentes
  const emailInputRef = useRef<CustomInputRef>(null);
  const phoneInputRef = useRef<CustomInputRef>(null);
  const counterRef = useRef<CounterRef>(null);
  const timerRef = useRef<TimerRef>(null);

  // Estados para mostrar valores
  const [emailValue, setEmailValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');

  // Validadores
  const emailValidator = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const phoneValidator = (phone: string) => {
    return /^\d{10}$/.test(phone.replace(/\D/g, ''));
  };

  // Funciones para controlar los inputs
  const handleFocusEmail = () => {
    emailInputRef.current?.focus();
  };

  const handleClearAll = () => {
    emailInputRef.current?.clear();
    phoneInputRef.current?.clear();
  };

  const handleValidateAll = () => {
    const emailValid = emailInputRef.current?.validate() ?? false;
    const phoneValid = phoneInputRef.current?.validate() ?? false;
    
    if (emailValid && phoneValid) {
      Alert.alert('✅ Validación', 'Todos los campos son válidos');
    } else {
      Alert.alert('❌ Validación', 'Algunos campos son inválidos');
    }
  };

  const handleSetValues = () => {
    emailInputRef.current?.setValue('ejemplo@correo.com');
    phoneInputRef.current?.setValue('1234567890');
  };

  // Funciones para el contador
  const handleCounterOperations = () => {
    Alert.alert(
      'Operaciones de Contador',
      `Valor actual: ${counterRef.current?.getCount()}`,
      [
        { text: 'Incrementar', onPress: () => counterRef.current?.increment() },
        { text: 'Decrementar', onPress: () => counterRef.current?.decrement() },
        { text: 'Reset', onPress: () => counterRef.current?.reset() },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  // Funciones para el timer
  const handleTimerStart = () => timerRef.current?.start();
  const handleTimerStop = () => timerRef.current?.stop();
  const handleTimerReset = () => timerRef.current?.reset();
  const handleGetTimerValue = () => {
    const time = timerRef.current?.getTime() ?? 0;
    Alert.alert('Tiempo Actual', `${time} segundos`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.title}>useImperativeHandle Hook</Text>
          <Text style={styles.description}>
            useImperativeHandle personaliza el valor de la instancia que se expone 
            a los componentes padre cuando usa ref. Se debe usar con forwardRef 
            para crear APIs imperativas controladas.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sintaxis Básica</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              {`// 1. Crear el componente con forwardRef
const MyComponent = forwardRef((props, ref) => {
  
  // 2. Usar useImperativeHandle
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    getValue: () => value,
    customMethod: () => { /* lógica */ }
  }), [dependencies]);
  
  return <input ref={inputRef} />;
});

// 3. Usar desde el padre
const ref = useRef();
ref.current?.focus(); // Llamar método expuesto`}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejemplo 1: Inputs Personalizados</Text>
          <View style={styles.exampleContainer}>
            <Text style={styles.inputLabel}>Email:</Text>
            <CustomInput
              ref={emailInputRef}
              placeholder="correo@ejemplo.com"
              validator={emailValidator}
              validationMessage="Email inválido"
              onValueChange={setEmailValue}
            />

            <Text style={styles.inputLabel}>Teléfono:</Text>
            <CustomInput
              ref={phoneInputRef}
              placeholder="1234567890"
              validator={phoneValidator}
              validationMessage="Teléfono debe tener 10 dígitos"
              onValueChange={setPhoneValue}
            />

            <View style={styles.controlButtons}>
              <Pressable style={styles.controlButton} onPress={handleFocusEmail}>
                <Text style={styles.controlButtonText}>Focus Email</Text>
              </Pressable>
              <Pressable style={styles.controlButton} onPress={handleClearAll}>
                <Text style={styles.controlButtonText}>Limpiar Todo</Text>
              </Pressable>
              <Pressable style={styles.controlButton} onPress={handleValidateAll}>
                <Text style={styles.controlButtonText}>Validar</Text>
              </Pressable>
              <Pressable style={styles.controlButton} onPress={handleSetValues}>
                <Text style={styles.controlButtonText}>Llenar</Text>
              </Pressable>
            </View>

            <View style={styles.valuesDisplay}>
              <Text style={styles.valueText}>Email: {emailValue}</Text>
              <Text style={styles.valueText}>Phone: {phoneValue}</Text>
            </View>
          </View>

          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              {`const CustomInput = forwardRef((props, ref) => {
  const [value, setValue] = useState('');
  
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => setValue(''),
    getValue: () => value,
    validate: () => props.validator?.(value) ?? true
  }), [value]);
  
  return <TextInput ref={inputRef} ... />;
});`}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejemplo 2: Contador Imperativo</Text>
          <View style={styles.exampleContainer}>
            <ImperativeCounter ref={counterRef} />
            
            <View style={styles.controlButtons}>
              <Pressable style={styles.controlButton} onPress={handleCounterOperations}>
                <Text style={styles.controlButtonText}>Controlar Contador</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejemplo 3: Timer Imperativo</Text>
          <View style={styles.exampleContainer}>
            <ImperativeTimer ref={timerRef} />
            
            <View style={styles.controlButtons}>
              <Pressable style={styles.timerButton} onPress={handleTimerStart}>
                <Text style={styles.controlButtonText}>▶️ Start</Text>
              </Pressable>
              <Pressable style={styles.timerButton} onPress={handleTimerStop}>
                <Text style={styles.controlButtonText}>⏸️ Stop</Text>
              </Pressable>
              <Pressable style={styles.timerButton} onPress={handleTimerReset}>
                <Text style={styles.controlButtonText}>🔄 Reset</Text>
              </Pressable>
              <Pressable style={styles.timerButton} onPress={handleGetTimerValue}>
                <Text style={styles.controlButtonText}>⏰ Get Time</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuándo Usar useImperativeHandle</Text>
          <View style={styles.useCasesContainer}>
            <View style={styles.useCaseCard}>
              <Text style={styles.useCaseIcon}>✅</Text>
              <View style={styles.useCaseContent}>
                <Text style={styles.useCaseTitle}>Casos válidos:</Text>
                <Text style={styles.useCaseText}>
                  • Enfocar, hacer scroll o seleccionar texto{'\n'}
                  • Reproducir/pausar animaciones{'\n'}
                  • Integración con librerías de terceros{'\n'}
                  • APIs imperativas necesarias{'\n'}
                  • Componentes de bibliotecas complejas
                </Text>
              </View>
            </View>

            <View style={styles.useCaseCard}>
              <Text style={styles.useCaseIcon}>❌</Text>
              <View style={styles.useCaseContent}>
                <Text style={styles.useCaseTitle}>Evitar cuando:</Text>
                <Text style={styles.useCaseText}>
                  • Se puede hacer con props normales{'\n'}
                  • Solo necesitas pasar datos{'\n'}
                  • El flujo puede ser declarativo{'\n'}
                  • No hay necesidad real de imperativo{'\n'}
                  • Puedes usar callbacks en su lugar
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mejores Prácticas</Text>
          <Text style={styles.bestPractices}>
            ✅ Úsalo solo cuando sea realmente necesario{'\n'}
            ✅ Combínalo siempre con forwardRef{'\n'}
            ✅ Define interfaces TypeScript para mejor tipo{'\n'}
            ✅ Incluye todas las dependencias en el array{'\n'}
            ✅ Mantén la API simple y consistente{'\n\n'}
            ⚠️ No abuses del patrón imperativo{'\n'}
            ⚠️ Prefiere props y callbacks cuando sea posible{'\n'}
            ⚠️ No expongas el estado interno directamente{'\n'}
            ⚠️ Evita refs cuando no sea necesario
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
  section: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 12,
  },
  exampleContainer: {
    marginVertical: 8,
  },
  customInputContainer: {
    marginBottom: 16,
  },
  customInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  invalidInput: {
    borderColor: '#f44336',
    backgroundColor: '#ffeaea',
  },
  errorMessage: {
    color: '#f44336',
    fontSize: 12,
    marginTop: 4,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  controlButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  controlButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  timerButton: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  valuesDisplay: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  valueText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  counterContainer: {
    backgroundColor: '#e3f2fd',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  counterDisplay: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  timerContainer: {
    backgroundColor: '#e8f5e8',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  timerDisplay: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2e7d32',
    fontFamily: 'monospace',
  },
  timerStatus: {
    fontSize: 16,
    color: '#2e7d32',
    marginTop: 8,
  },
  codeContainer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
    marginTop: 8,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#333',
    lineHeight: 16,
  },
  useCasesContainer: {
    gap: 12,
  },
  useCaseCard: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  useCaseIcon: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  useCaseContent: {
    flex: 1,
  },
  useCaseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  useCaseText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bestPractices: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
  },
});

export default UseImperativeHandleExample;
