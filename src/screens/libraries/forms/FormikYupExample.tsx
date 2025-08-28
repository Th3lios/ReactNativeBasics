import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { 
  registrationSchema, 
  type RegistrationFormData 
} from '../../../libs/schemas';

// Schema importado desde libs/schemas

const FormikYupExample = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const initialValues: RegistrationFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    password: '',
    confirmPassword: '',
    website: '',
    bio: '',
    terms: false,
    newsletter: false,
    preferredContact: '',
  };

  const handleSubmit = async (values: RegistrationFormData) => {
    setSubmitStatus('loading');
    
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', values);
      setSubmitStatus('success');
      
      Alert.alert(
        'Registro Exitoso',
        `¡Bienvenido ${values.firstName} ${values.lastName}!\n\nDatos registrados correctamente.`,
        [{ text: 'OK', onPress: () => setSubmitStatus('idle') }]
      );
    } catch (error) {
      setSubmitStatus('error');
      Alert.alert('Error', 'Hubo un problema al registrar. Intenta nuevamente.');
    }
  };

  const getFieldError = (errors: any, touched: any, field: string): string | undefined => {
    return errors[field] && touched[field] ? errors[field] : undefined;
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Formik + Yup</Text>
          <Text style={styles.subtitle}>
            Validación avanzada con esquemas declarativos
          </Text>
        </View>

        <Formik
          initialValues={initialValues}
          validationSchema={registrationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
            isValid,
            dirty,
            isSubmitting,
          }) => (
            <View style={styles.formContainer}>
              {/* Personal Information Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>📋 Información Personal</Text>
                
                <View style={styles.row}>
                  <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.label}>Nombre *</Text>
                    <TextInput
                      style={[
                        styles.input,
                        getFieldError(errors, touched, 'firstName') && styles.inputError
                      ]}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                      placeholder="Juan"
                      placeholderTextColor="#999"
                    />
                    {getFieldError(errors, touched, 'firstName') && (
                      <Text style={styles.errorText}>
                        {getFieldError(errors, touched, 'firstName')}
                      </Text>
                    )}
                  </View>

                  <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.label}>Apellido *</Text>
                    <TextInput
                      style={[
                        styles.input,
                        getFieldError(errors, touched, 'lastName') && styles.inputError
                      ]}
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      value={values.lastName}
                      placeholder="Pérez"
                      placeholderTextColor="#999"
                    />
                    {getFieldError(errors, touched, 'lastName') && (
                      <Text style={styles.errorText}>
                        {getFieldError(errors, touched, 'lastName')}
                      </Text>
                    )}
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Edad *</Text>
                  <TextInput
                    style={[
                      styles.input,
                      getFieldError(errors, touched, 'age') && styles.inputError
                    ]}
                    onChangeText={handleChange('age')}
                    onBlur={handleBlur('age')}
                    value={values.age}
                    placeholder="25"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                  />
                  {getFieldError(errors, touched, 'age') && (
                    <Text style={styles.errorText}>
                      {getFieldError(errors, touched, 'age')}
                    </Text>
                  )}
                </View>
              </View>

              {/* Contact Information Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>📞 Información de Contacto</Text>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email *</Text>
                  <TextInput
                    style={[
                      styles.input,
                      getFieldError(errors, touched, 'email') && styles.inputError
                    ]}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholder="juan@ejemplo.com"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {getFieldError(errors, touched, 'email') && (
                    <Text style={styles.errorText}>
                      {getFieldError(errors, touched, 'email')}
                    </Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Teléfono *</Text>
                  <TextInput
                    style={[
                      styles.input,
                      getFieldError(errors, touched, 'phone') && styles.inputError
                    ]}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    placeholder="+56 9 1234 5678"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                  />
                  {getFieldError(errors, touched, 'phone') && (
                    <Text style={styles.errorText}>
                      {getFieldError(errors, touched, 'phone')}
                    </Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Método de Contacto Preferido *</Text>
                  <View style={styles.radioGroup}>
                    {[
                      { value: 'email', label: 'Email' },
                      { value: 'phone', label: 'Teléfono' },
                      { value: 'both', label: 'Ambos' }
                    ].map((option) => (
                      <Pressable
                        key={option.value}
                        style={styles.radioOption}
                        onPress={() => setFieldValue('preferredContact', option.value)}
                      >
                        <View style={[
                          styles.radioCircle,
                          values.preferredContact === option.value && styles.radioSelected
                        ]}>
                          {values.preferredContact === option.value && (
                            <View style={styles.radioInner} />
                          )}
                        </View>
                        <Text style={styles.radioLabel}>{option.label}</Text>
                      </Pressable>
                    ))}
                  </View>
                  {getFieldError(errors, touched, 'preferredContact') && (
                    <Text style={styles.errorText}>
                      {getFieldError(errors, touched, 'preferredContact')}
                    </Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Sitio Web (Opcional)</Text>
                  <TextInput
                    style={[
                      styles.input,
                      getFieldError(errors, touched, 'website') && styles.inputError
                    ]}
                    onChangeText={handleChange('website')}
                    onBlur={handleBlur('website')}
                    value={values.website}
                    placeholder="https://miportfolio.com"
                    placeholderTextColor="#999"
                    keyboardType="url"
                    autoCapitalize="none"
                  />
                  {getFieldError(errors, touched, 'website') && (
                    <Text style={styles.errorText}>
                      {getFieldError(errors, touched, 'website')}
                    </Text>
                  )}
                </View>
              </View>

              {/* Security Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🔒 Seguridad</Text>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Contraseña *</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={[
                        styles.passwordInput,
                        getFieldError(errors, touched, 'password') && styles.inputError
                      ]}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      placeholder="Mínimo 8 caracteres"
                      placeholderTextColor="#999"
                      secureTextEntry={!showPassword}
                    />
                    <Pressable
                      style={styles.eyeButton}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
                    </Pressable>
                  </View>
                  {getFieldError(errors, touched, 'password') && (
                    <Text style={styles.errorText}>
                      {getFieldError(errors, touched, 'password')}
                    </Text>
                  )}
                  <Text style={styles.helpText}>
                    Debe contener: mayúscula, minúscula, número y símbolo
                  </Text>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Confirmar Contraseña *</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={[
                        styles.passwordInput,
                        getFieldError(errors, touched, 'confirmPassword') && styles.inputError
                      ]}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                      placeholder="Repite la contraseña"
                      placeholderTextColor="#999"
                      secureTextEntry={!showConfirmPassword}
                    />
                    <Pressable
                      style={styles.eyeButton}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <Text style={styles.eyeIcon}>{showConfirmPassword ? '🙈' : '👁️'}</Text>
                    </Pressable>
                  </View>
                  {getFieldError(errors, touched, 'confirmPassword') && (
                    <Text style={styles.errorText}>
                      {getFieldError(errors, touched, 'confirmPassword')}
                    </Text>
                  )}
                </View>
              </View>

              {/* Additional Information Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>📝 Información Adicional</Text>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Biografía (Opcional)</Text>
                  <TextInput
                    style={[
                      styles.textArea,
                      getFieldError(errors, touched, 'bio') && styles.inputError
                    ]}
                    onChangeText={handleChange('bio')}
                    onBlur={handleBlur('bio')}
                    value={values.bio}
                    placeholder="Cuéntanos sobre ti..."
                    placeholderTextColor="#999"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                  <Text style={styles.characterCount}>
                    {values.bio.length}/500 caracteres
                  </Text>
                  {getFieldError(errors, touched, 'bio') && (
                    <Text style={styles.errorText}>
                      {getFieldError(errors, touched, 'bio')}
                    </Text>
                  )}
                </View>
              </View>

              {/* Terms and Newsletter Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>✅ Confirmaciones</Text>
                
                <View style={styles.checkboxContainer}>
                  <Pressable
                    style={styles.checkbox}
                    onPress={() => setFieldValue('terms', !values.terms)}
                  >
                    <View style={[
                      styles.checkboxBox,
                      values.terms && styles.checkboxChecked
                    ]}>
                      {values.terms && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <Text style={styles.checkboxLabel}>
                      Acepto los términos y condiciones *
                    </Text>
                  </Pressable>
                  {getFieldError(errors, touched, 'terms') && (
                    <Text style={styles.errorText}>
                      {getFieldError(errors, touched, 'terms')}
                    </Text>
                  )}
                </View>

                <View style={styles.switchContainer}>
                  <View style={styles.switchContent}>
                    <Text style={styles.switchLabel}>Recibir newsletter</Text>
                    <Text style={styles.switchDescription}>
                      Mantente al día con nuestras novedades
                    </Text>
                  </View>
                  <Switch
                    value={values.newsletter}
                    onValueChange={(value) => setFieldValue('newsletter', value)}
                    trackColor={{ false: '#ccc', true: '#007AFF' }}
                    thumbColor="#fff"
                  />
                </View>
              </View>

              {/* Form Status */}
              <View style={styles.statusSection}>
                <Text style={styles.statusTitle}>Estado del Formulario:</Text>
                <View style={styles.statusGrid}>
                  <View style={styles.statusItem}>
                    <Text style={styles.statusLabel}>Válido</Text>
                    <Text style={[styles.statusValue, isValid ? styles.statusSuccess : styles.statusError]}>
                      {isValid ? '✅' : '❌'}
                    </Text>
                  </View>
                  <View style={styles.statusItem}>
                    <Text style={styles.statusLabel}>Modificado</Text>
                    <Text style={[styles.statusValue, dirty ? styles.statusSuccess : styles.statusError]}>
                      {dirty ? '✅' : '❌'}
                    </Text>
                  </View>
                  <View style={styles.statusItem}>
                    <Text style={styles.statusLabel}>Enviando</Text>
                    <Text style={[styles.statusValue, isSubmitting ? styles.statusWarning : styles.statusSuccess]}>
                      {isSubmitting ? '⏳' : '✅'}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Submit Button */}
              <Pressable
                style={[
                  styles.submitButton,
                  (!isValid || !dirty || isSubmitting) && styles.submitButtonDisabled
                ]}
                onPress={() => handleSubmit()}
                disabled={!isValid || !dirty || isSubmitting}
              >
                <Text style={[
                  styles.submitButtonText,
                  (!isValid || !dirty || isSubmitting) && styles.submitButtonTextDisabled
                ]}>
                  {isSubmitting ? 'Registrando...' : 'Crear Cuenta'}
                </Text>
              </Pressable>

              {/* Validation Summary */}
              {Object.keys(errors).length > 0 && dirty && (
                <View style={styles.validationSummary}>
                  <Text style={styles.validationTitle}>❌ Errores de Validación:</Text>
                  {Object.entries(errors).map(([field, error]) => (
                    <Text key={field} style={styles.validationError}>
                      • {error as string}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          )}
        </Formik>
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
  formContainer: {
    padding: 16,
    gap: 16,
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    padding: 4,
  },
  eyeIcon: {
    fontSize: 20,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    height: 100,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
  },
  helpText: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
  },
  characterCount: {
    color: '#666',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 16,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#007AFF',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  radioLabel: {
    fontSize: 14,
    color: '#333',
  },
  checkboxContainer: {
    marginBottom: 16,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchContent: {
    flex: 1,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  switchDescription: {
    fontSize: 14,
    color: '#666',
  },
  statusSection: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  statusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statusItem: {
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 20,
  },
  statusSuccess: {
    color: '#34C759',
  },
  statusError: {
    color: '#FF3B30',
  },
  statusWarning: {
    color: '#FF9500',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitButtonTextDisabled: {
    color: '#999',
  },
  validationSummary: {
    backgroundColor: '#ffe6e6',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  validationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d63031',
    marginBottom: 8,
  },
  validationError: {
    fontSize: 14,
    color: '#d63031',
    marginBottom: 4,
  },
});

export default FormikYupExample;
