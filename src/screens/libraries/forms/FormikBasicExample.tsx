import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { 
  loginSchema, 
  registerSchema
} from '../../../libs/schemas';

// Schemas importados desde libs/schemas

// Login Form Component
const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values: any) => {
    setIsLoading(true);
    // Simular llamada API
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Login Exitoso',
        `Bienvenido ${values.email}`,
        [{ text: 'OK' }]
      );
    }, 2000);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Iniciar Sesión</Text>
      
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.email && errors.email && styles.inputError
                ]}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="tu@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.password && errors.password && styles.inputError
                ]}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="Tu contraseña"
                secureTextEntry
                autoComplete="password"
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <Pressable
              style={[
                styles.submitButton,
                (!isValid || isLoading) && styles.submitButtonDisabled
              ]}
              onPress={handleSubmit}
              disabled={!isValid || isLoading}
            >
              <Text style={[
                styles.submitButtonText,
                (!isValid || isLoading) && styles.submitButtonTextDisabled
              ]}>
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

// Register Form Component
const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (values: any) => {
    setIsLoading(true);
    // Simular llamada API
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Registro Exitoso',
        `¡Bienvenido ${values.firstName}! Tu cuenta ha sido creada.`,
        [{ text: 'OK' }]
      );
    }, 2000);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Crear Cuenta</Text>
      
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          age: '',
          terms: false
        }}
        validationSchema={registerSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldValue }) => (
          <View>
            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.firstName && errors.firstName && styles.inputError
                  ]}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  placeholder="Juan"
                  autoComplete="given-name"
                />
                {touched.firstName && errors.firstName && (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                )}
              </View>

              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={styles.label}>Apellido</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.lastName && errors.lastName && styles.inputError
                  ]}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  placeholder="Pérez"
                  autoComplete="family-name"
                />
                {touched.lastName && errors.lastName && (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                )}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.email && errors.email && styles.inputError
                ]}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="tu@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Edad</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.age && errors.age && styles.inputError
                ]}
                onChangeText={handleChange('age')}
                onBlur={handleBlur('age')}
                value={values.age}
                placeholder="25"
                keyboardType="numeric"
              />
              {touched.age && errors.age && (
                <Text style={styles.errorText}>{errors.age}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.password && errors.password && styles.inputError
                ]}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="Contraseña segura"
                secureTextEntry
                autoComplete="new-password"
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirmar Contraseña</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.confirmPassword && errors.confirmPassword && styles.inputError
                ]}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                placeholder="Repite tu contraseña"
                secureTextEntry
                autoComplete="new-password"
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>

            <Pressable
              style={styles.checkboxContainer}
              onPress={() => setFieldValue('terms', !values.terms)}
            >
              <View style={[styles.checkbox, values.terms && styles.checkboxChecked]}>
                {values.terms && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>
                Acepto los términos y condiciones
              </Text>
            </Pressable>
            {touched.terms && errors.terms && (
              <Text style={styles.errorText}>{errors.terms}</Text>
            )}

            <Pressable
              style={[
                styles.submitButton,
                (!isValid || isLoading) && styles.submitButtonDisabled
              ]}
              onPress={handleSubmit}
              disabled={!isValid || isLoading}
            >
              <Text style={[
                styles.submitButtonText,
                (!isValid || isLoading) && styles.submitButtonTextDisabled
              ]}>
                {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

// Main Component
const FormikBasicExample = () => {
  const [activeForm, setActiveForm] = useState<'login' | 'register'>('login');

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Formik Básico</Text>
          <Text style={styles.subtitle}>
            Formularios con validación usando Formik + Yup
          </Text>
        </View>

        <View style={styles.tabContainer}>
          <Pressable
            style={[styles.tab, activeForm === 'login' && styles.activeTab]}
            onPress={() => setActiveForm('login')}
          >
            <Text style={[styles.tabText, activeForm === 'login' && styles.activeTabText]}>
              Login
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeForm === 'register' && styles.activeTab]}
            onPress={() => setActiveForm('register')}
          >
            <Text style={[styles.tabText, activeForm === 'register' && styles.activeTabText]}>
              Registro
            </Text>
          </Pressable>
        </View>

        {activeForm === 'login' ? <LoginForm /> : <RegisterForm />}

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>💡 Características Implementadas</Text>
          <Text style={styles.infoText}>
            ✅ Validación en tiempo real con Yup{'\n'}
            ✅ Estados de formulario manejados por Formik{'\n'}
            ✅ Mensajes de error dinámicos{'\n'}
            ✅ Botones deshabilitados cuando hay errores{'\n'}
            ✅ Loading states durante submit{'\n'}
            ✅ Diferentes tipos de input (email, password, numeric){'\n'}
            ✅ Checkbox personalizado{'\n'}
            ✅ Formularios complejos con múltiples campos
          </Text>
        </View>

        <View style={styles.codeSection}>
          <Text style={styles.codeTitle}>📝 Esquema de Validación</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              {`const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Muy corto')
    .required('Nombre es requerido'),
  email: Yup.string()
    .email('Email inválido')
    .required('Email es requerido'),
  password: Yup.string()
    .min(8, 'Mínimo 8 caracteres')
    .matches(/(?=.*[a-z])/, 'Minúscula requerida')
    .matches(/(?=.*[A-Z])/, 'Mayúscula requerida')
    .matches(/(?=.*\\d)/, 'Número requerido')
    .required('Contraseña es requerida'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'No coinciden')
    .required('Confirmar contraseña'),
  terms: Yup.boolean()
    .oneOf([true], 'Debes aceptar términos'),
});`}
            </Text>
          </View>
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
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  formContainer: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  inputContainer: {
    marginBottom: 16,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  inputError: {
    borderColor: '#FF3B30',
    backgroundColor: '#fff5f5',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonTextDisabled: {
    color: '#888',
  },
  infoSection: {
    backgroundColor: '#e8f5e8',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#2e7d32',
    lineHeight: 20,
  },
  codeSection: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  codeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  codeContainer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#333',
    lineHeight: 18,
  },
});

export default FormikBasicExample;
