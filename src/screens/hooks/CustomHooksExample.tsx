import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import custom hooks from separate files
import {
  useCounter,
  useToggle,
  useLocalStorage,
  useFetch,
  useDebounce,
  useInterval,
  useForm,
} from '../../hooks/customhooks';

const CustomHooksExample = () => {
  // Using the custom hooks
  const counter = useCounter(0);
  const toggle = useToggle(false);
  const [name, setName] = useLocalStorage('userName', '');
  const { data: users, loading: usersLoading, error: usersError } = useFetch('/api/users');
  
  // For debounce example
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // For interval example
  const [time, setTime] = useState(new Date());
  useInterval(() => {
    setTime(new Date());
  }, 1000);

  // For form example
  const form = useForm({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleFormSubmit = () => {
    const isValid = form.validate({
      email: (value) => {
        if (!value) return 'Email es requerido';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Email inválido';
        return undefined;
      },
      password: (value) => {
        if (!value) return 'Contraseña es requerida';
        if (value.length < 6) return 'Mínimo 6 caracteres';
        return undefined;
      },
      confirmPassword: (value) => {
        if (value !== form.values.password) return 'Contraseñas no coinciden';
        return undefined;
      },
    });

    if (isValid) {
      Alert.alert('✅ Formulario válido', 'Datos enviados correctamente');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.title}>Custom Hooks</Text>
          <Text style={styles.description}>
            Los Custom Hooks son funciones JavaScript que empiezan con "use" y 
            pueden llamar a otros hooks. Permiten reutilizar lógica con estado 
            entre diferentes componentes.
          </Text>
          <Text style={styles.note}>
            🗂️ Ahora cada hook está en su propio archivo para mejor organización
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>¿Por qué Custom Hooks?</Text>
          <Text style={styles.benefits}>
            ✅ Reutilización de lógica entre componentes{'\n'}
            ✅ Separación de concerns{'\n'}
            ✅ Código más limpio y mantenible{'\n'}
            ✅ Testing más fácil{'\n'}
            ✅ Abstracción de complejidad{'\n'}
            ✅ Composición de funcionalidad{'\n'}
            ✅ Mejor organización en archivos separados
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estructura de Archivos</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              {`src/hooks/customhooks/
├── index.ts          // Exporta todos los hooks
├── useCounter.ts     // Hook contador
├── useToggle.ts      // Hook toggle
├── useLocalStorage.ts// Hook persistencia
├── useFetch.ts       // Hook API calls
├── useDebounce.ts    // Hook debounce
├── useInterval.ts    // Hook interval
└── useForm.ts        // Hook formularios`}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. useCounter - Contador Reutilizable</Text>
          <View style={styles.exampleContainer}>
            <Text style={styles.counterDisplay}>Count: {counter.count}</Text>
            <View style={styles.buttonRow}>
              <Pressable style={styles.button} onPress={counter.decrement}>
                <Text style={styles.buttonText}>-1</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={counter.reset}>
                <Text style={styles.buttonText}>Reset</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={counter.increment}>
                <Text style={styles.buttonText}>+1</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              {`// useCounter.ts
import { useState } from 'react';

export const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
};

// Uso en componente
import { useCounter } from '../hooks/customhooks';
const counter = useCounter(0);`}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. useToggle - Toggle de Estados</Text>
          <View style={styles.exampleContainer}>
            <Text style={styles.toggleStatus}>
              Estado: {toggle.value ? '🟢 Activado' : '🔴 Desactivado'}
            </Text>
            <View style={styles.buttonRow}>
              <Pressable style={styles.button} onPress={toggle.toggle}>
                <Text style={styles.buttonText}>Toggle</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={toggle.setTrue}>
                <Text style={styles.buttonText}>Activar</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={toggle.setFalse}>
                <Text style={styles.buttonText}>Desactivar</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. useLocalStorage - Persistencia</Text>
          <View style={styles.exampleContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Tu nombre"
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.storageInfo}>
              Nombre guardado: "{name}" (persiste entre sesiones)
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. useFetch - Llamadas a API</Text>
          <View style={styles.exampleContainer}>
            {usersLoading ? (
              <Text style={styles.loadingText}>🔄 Cargando usuarios...</Text>
            ) : usersError ? (
              <Text style={styles.errorText}>❌ Error: {usersError}</Text>
            ) : (
              <View style={styles.usersList}>
                {users?.map((user: any) => (
                  <View key={user.id} style={styles.userItem}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. useDebounce - Optimización de Búsqueda</Text>
          <View style={styles.exampleContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Buscar... (debounce 500ms)"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            <Text style={styles.debounceInfo}>
              Término actual: "{searchTerm}"{'\n'}
              Término debounced: "{debouncedSearchTerm}"
            </Text>
            <Text style={styles.note}>
              El valor debounced se actualiza 500ms después de dejar de escribir
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. useInterval - Timer Automático</Text>
          <View style={styles.exampleContainer}>
            <Text style={styles.timeDisplay}>
              ⏰ {time.toLocaleTimeString()}
            </Text>
            <Text style={styles.note}>Se actualiza cada segundo automáticamente</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. useForm - Manejo de Formularios</Text>
          <View style={styles.exampleContainer}>
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Email:</Text>
              <TextInput
                style={[styles.textInput, form.errors.email && styles.inputError]}
                placeholder="email@ejemplo.com"
                value={form.values.email}
                onChangeText={(text) => form.setValue('email', text)}
                keyboardType="email-address"
              />
              {form.errors.email && (
                <Text style={styles.errorText}>{form.errors.email}</Text>
              )}
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Contraseña:</Text>
              <TextInput
                style={[styles.textInput, form.errors.password && styles.inputError]}
                placeholder="********"
                value={form.values.password}
                onChangeText={(text) => form.setValue('password', text)}
                secureTextEntry
              />
              {form.errors.password && (
                <Text style={styles.errorText}>{form.errors.password}</Text>
              )}
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Confirmar Contraseña:</Text>
              <TextInput
                style={[styles.textInput, form.errors.confirmPassword && styles.inputError]}
                placeholder="********"
                value={form.values.confirmPassword}
                onChangeText={(text) => form.setValue('confirmPassword', text)}
                secureTextEntry
              />
              {form.errors.confirmPassword && (
                <Text style={styles.errorText}>{form.errors.confirmPassword}</Text>
              )}
            </View>

            <View style={styles.buttonRow}>
              <Pressable style={styles.submitButton} onPress={handleFormSubmit}>
                <Text style={styles.buttonText}>Enviar</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={form.reset}>
                <Text style={styles.buttonText}>Limpiar</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ventajas de la Separación</Text>
          <View style={styles.benefitsContainer}>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>🔧</Text>
              <Text style={styles.benefitText}>
                <Text style={styles.benefitTitle}>Reutilización:</Text>{'\n'}
                Cada hook puede importarse independientemente
              </Text>
            </View>
            
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>🧪</Text>
              <Text style={styles.benefitText}>
                <Text style={styles.benefitTitle}>Testing:</Text>{'\n'}
                Fácil de testear cada hook por separado
              </Text>
            </View>
            
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>📚</Text>
              <Text style={styles.benefitText}>
                <Text style={styles.benefitTitle}>Mantenimiento:</Text>{'\n'}
                Código más organizado y legible
              </Text>
            </View>
            
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>⚡</Text>
              <Text style={styles.benefitText}>
                <Text style={styles.benefitTitle}>Tree Shaking:</Text>{'\n'}
                Solo importa los hooks que necesitas
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reglas para Custom Hooks</Text>
          <Text style={styles.rules}>
            📋 <Text style={styles.ruleTitle}>Reglas importantes:</Text>{'\n'}{'\n'}
            • Siempre empezar el nombre con "use"{'\n'}
            • Solo llamar desde componentes React o otros hooks{'\n'}
            • Seguir las reglas de los hooks (nivel superior){'\n'}
            • Pueden llamar a otros hooks{'\n'}
            • Retornar valores o funciones útiles{'\n'}
            • Mantener la lógica simple y enfocada{'\n'}
            • Documentar el propósito y parámetros{'\n'}
            • Un archivo por hook para mejor organización
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mejores Prácticas</Text>
          <Text style={styles.bestPractices}>
            ✅ Un hook, una responsabilidad{'\n'}
            ✅ Nombres descriptivos y claros{'\n'}
            ✅ Retorna objetos para APIs complejas{'\n'}
            ✅ Usa TypeScript para mejor tipado{'\n'}
            ✅ Incluye cleanup cuando sea necesario{'\n'}
            ✅ Testea los hooks independientemente{'\n'}
            ✅ Organiza en archivos separados{'\n'}
            ✅ Crea un index.ts para exports{'\n\n'}
            ⚠️ No hagas hooks demasiado complejos{'\n'}
            ⚠️ Evita efectos secundarios inesperados{'\n'}
            ⚠️ No copies lógica solo por reutilizar{'\n'}
            ⚠️ Considera si realmente necesitas un hook
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
    marginBottom: 8,
  },
  note: {
    fontSize: 14,
    color: '#007AFF',
    fontStyle: 'italic',
    backgroundColor: '#f0f8ff',
    padding: 8,
    borderRadius: 6,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 12,
  },
  benefits: {
    fontSize: 14,
    color: '#2e7d32',
    lineHeight: 20,
    backgroundColor: '#e8f5e8',
    padding: 12,
    borderRadius: 6,
  },
  exampleContainer: {
    marginVertical: 8,
  },
  counterDisplay: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  toggleStatus: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  inputError: {
    borderColor: '#f44336',
    backgroundColor: '#ffeaea',
  },
  storageInfo: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 12,
    color: '#f44336',
    marginTop: 4,
  },
  usersList: {
    gap: 8,
  },
  userItem: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  debounceInfo: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  timeDisplay: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 8,
  },
  formField: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  benefitsContainer: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  benefitIcon: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  benefitTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  rules: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 6,
  },
  ruleTitle: {
    fontWeight: 'bold',
    color: '#1976d2',
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
  bestPractices: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
  },
});

export default CustomHooksExample;