import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TextInputExample = () => {
  // Estados para diferentes tipos de input
  const [basicText, setBasicText] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [multilineText, setMultilineText] = useState('');
  const [numericValue, setNumericValue] = useState('');
  const [rut, setRut] = useState('');
  
  // Estados para verificación de 6 dígitos
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Función para manejar cambios en el código de verificación
  const handleVerificationChange = (text: string, index: number) => {
    const newCode = [...verificationCode];
    
    // Si se pega un código completo
    if (text.length > 1) {
      const pastedCode = text.slice(0, 6).split('');
      pastedCode.forEach((digit, i) => {
        if (i < 6) newCode[i] = digit;
      });
      setVerificationCode(newCode);
      
      // Enfocar el último input o el próximo vacío
      const nextIndex = Math.min(pastedCode.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    // Manejar entrada de un solo dígito
    newCode[index] = text;
    setVerificationCode(newCode);

    // Auto-focus al siguiente input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Función para manejar backspace en código de verificación
  const handleVerificationKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Función para formatear teléfono
  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const limited = cleaned.slice(0, 10);
    
    if (limited.length >= 6) {
      return limited.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else if (limited.length >= 3) {
      return limited.replace(/(\d{3})(\d{0,3})/, '($1) $2');
    }
    return limited;
  };

  const handlePhoneChange = (text: string) => {
    setPhone(formatPhoneNumber(text));
  };

  // Funciones para RUT chileno
  const formatRut = (text: string) => {
    // Remover todo lo que no sea número o k/K
    const cleaned = text.replace(/[^0-9kK]/g, '');
    
    if (cleaned.length === 0) return '';
    
    // Si solo hay un carácter, devolverlo sin formato
    if (cleaned.length === 1) return cleaned;
    
    // Siempre separar el último carácter como dígito verificador
    const number = cleaned.slice(0, -1);
    const dv = cleaned.slice(-1).toUpperCase();
    
    // Formatear número con puntos según su longitud
    let formattedNumber = number;
    if (number.length === 7) {
      formattedNumber = number.replace(/(\d{1})(\d{3})(\d{3})/, '$1.$2.$3');
    } else if (number.length === 8) {
      formattedNumber = number.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
    } else if (number.length > 3) {
      formattedNumber = number.replace(/(\d{1,2})(\d{3})/, '$1.$2');
    }
    
    // Siempre agregar guión y dígito verificador
    return `${formattedNumber}-${dv}`;
  };

  const calculateRutDV = (rutNumber: string): string => {
    // Remover puntos y guión, solo números
    const cleanRut = rutNumber.replace(/[^0-9]/g, '');
    
    if (cleanRut.length === 0) return '';
    
    let sum = 0;
    let multiplier = 2;
    
    // Calcular desde el último dígito hacia el primero
    for (let i = cleanRut.length - 1; i >= 0; i--) {
      sum += parseInt(cleanRut[i], 10) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
    
    const remainder = sum % 11;
    const dv = 11 - remainder;
    
    if (dv === 11) return '0';
    if (dv === 10) return 'K';
    return dv.toString();
  };

  const isValidRut = (rutValue: string): boolean => {
    if (!rutValue) return false;
    
    // Dividir RUT en número y dígito verificador
    const parts = rutValue.split('-');
    if (parts.length !== 2) return false;
    
    const rutNumber = parts[0].replace(/\./g, '');
    const providedDV = parts[1].toUpperCase();
    
    // Validar que el número tenga al menos 7 dígitos
    if (rutNumber.length < 7 || rutNumber.length > 8) return false;
    
    // Calcular dígito verificador esperado
    const expectedDV = calculateRutDV(rutNumber);
    
    return providedDV === expectedDV;
  };

  const handleRutChange = (text: string) => {
    const formatted = formatRut(text);
    setRut(formatted);
  };

  // Validaciones
  const isValidEmail = (emailValue: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  };

  const isValidPhone = (phoneValue: string) => {
    const cleaned = phoneValue.replace(/\D/g, '');
    return cleaned.length === 10;
  };

  const isVerificationComplete = () => {
    return verificationCode.every(digit => digit.length === 1);
  };

  const handleVerifyCode = () => {
    if (isVerificationComplete()) {
      const code = verificationCode.join('');
      Alert.alert('Código Verificado', `Código ingresado: ${code}`);
    } else {
      Alert.alert('Error', 'Por favor completa todos los dígitos');
    }
  };

  const clearVerificationCode = () => {
    setVerificationCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.title}>TextInput Component</Text>
          <Text style={styles.description}>
            TextInput es el componente fundamental para capturar entrada de texto 
            del usuario. Soporta diferentes tipos de teclados, validaciones y 
            funcionalidades avanzadas.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TextInput Básico</Text>
          <View style={styles.exampleContainer}>
            <TextInput
              style={styles.basicInput}
              placeholder="Escribe algo aquí..."
              value={basicText}
              onChangeText={setBasicText}
              placeholderTextColor="#999"
            />
            <Text style={styles.inputValue}>
              Valor: "{basicText}"
            </Text>
          </View>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              {'<TextInput'}{'\n'}
              {'  style={styles.input}'}{'\n'}
              {'  placeholder="Escribe algo aquí..."'}{'\n'}
              {'  value={text}'}{'\n'}
              {'  onChangeText={setText}'}{'\n'}
              {'/>'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Verificación de 6 Dígitos 🏦</Text>
          <Text style={styles.bankDescription}>
            Típico en aplicaciones bancarias para verificación de código SMS o autenticación.
          </Text>
          <View style={styles.verificationContainer}>
            <Text style={styles.verificationLabel}>Ingresa el código de verificación:</Text>
            
            <View style={styles.codeInputContainer}>
              {verificationCode.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  style={[
                    styles.codeInput,
                    digit ? styles.codeInputFilled : null
                  ]}
                  value={digit}
                  onChangeText={(text) => handleVerificationChange(text, index)}
                  onKeyPress={({ nativeEvent }) => 
                    handleVerificationKeyPress(nativeEvent.key, index)
                  }
                  keyboardType="numeric"
                  maxLength={1}
                  textAlign="center"
                  selectTextOnFocus
                />
              ))}
            </View>

            <Text style={styles.verificationStatus}>
              {isVerificationComplete() ? '✅ Código completo' : `📱 ${verificationCode.filter(d => d).length}/6 dígitos`}
            </Text>

            <View style={styles.verificationButtons}>
              <Pressable 
                style={[styles.verifyButton, !isVerificationComplete() && styles.disabledButton]}
                onPress={handleVerifyCode}
                disabled={!isVerificationComplete()}>
                <Text style={[styles.verifyButtonText, !isVerificationComplete() && styles.disabledButtonText]}>
                  Verificar Código
                </Text>
              </Pressable>
              
              <Pressable style={styles.clearButton} onPress={clearVerificationCode}>
                <Text style={styles.clearButtonText}>Limpiar</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              {`// Array para cada dígito
const [code, setCode] = useState(['', '', '', '', '', '']);

// Handle change para auto-focus
const handleChange = (text, index) => {
  const newCode = [...code];
  newCode[index] = text;
  setCode(newCode);
  
  // Auto-focus siguiente input
  if (text && index < 5) {
    inputRefs.current[index + 1]?.focus();
  }
};`}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Input de Contraseña</Text>
          <View style={styles.exampleContainer}>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor="#999"
              />
              <Pressable
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.eyeButtonText}>
                  {showPassword ? '🙈' : '👁️'}
                </Text>
              </Pressable>
            </View>
            <Text style={styles.passwordStrength}>
              Fuerza: {password.length < 4 ? 'Débil' : password.length < 8 ? 'Media' : 'Fuerte'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Email con Validación</Text>
          <View style={styles.exampleContainer}>
            <TextInput
              style={[
                styles.emailInput,
                email && !isValidEmail(email) && styles.invalidInput
              ]}
              placeholder="correo@ejemplo.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#999"
            />
            {email && (
              <Text style={[
                styles.validationText,
                isValidEmail(email) ? styles.validText : styles.invalidText
              ]}>
                {isValidEmail(email) ? '✅ Email válido' : '❌ Email inválido'}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Teléfono con Formato</Text>
          <View style={styles.exampleContainer}>
            <TextInput
              style={[
                styles.phoneInput,
                phone && !isValidPhone(phone) && styles.invalidInput
              ]}
              placeholder="(123) 456-7890"
              value={phone}
              onChangeText={handlePhoneChange}
              keyboardType="phone-pad"
              maxLength={14}
              placeholderTextColor="#999"
            />
            {phone && (
              <Text style={[
                styles.validationText,
                isValidPhone(phone) ? styles.validText : styles.invalidText
              ]}>
                {isValidPhone(phone) ? '✅ Teléfono válido' : '❌ Formato incorrecto'}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RUT Chileno 🇨🇱</Text>
          <Text style={styles.rutDescription}>
            Validación de RUT chileno con formato automático. El último dígito siempre será el verificador con guión automático.
          </Text>
          <View style={styles.exampleContainer}>
            <TextInput
              style={[
                styles.rutInput,
                rut && !isValidRut(rut) && styles.invalidInput
              ]}
              placeholder="Ingresa un Rut"
              value={rut}
              onChangeText={handleRutChange}
              maxLength={12}
              placeholderTextColor="#999"
            />
            {rut && (
              <Text style={[
                styles.validationText,
                isValidRut(rut) ? styles.validText : styles.invalidText
              ]}>
                {isValidRut(rut) ? '✅ RUT válido' : '❌ RUT inválido'}
              </Text>
            )}
            {rut && rut.includes('-') && (
              <View style={styles.rutInfo}>
                <Text style={styles.rutInfoText}>
                  Número: {rut.split('-')[0]}
                </Text>
                <Text style={styles.rutInfoText}>
                  Dígito verificador: {rut.split('-')[1]}
                </Text>
                {rut.split('-')[0].replace(/\./g, '').length >= 7 && (
                  <Text style={styles.rutInfoText}>
                    DV calculado: {calculateRutDV(rut.split('-')[0].replace(/\./g, ''))}
                  </Text>
                )}
              </View>
            )}
          </View>
          
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              {`// Algoritmo de validación RUT chileno
const calculateRutDV = (rut) => {
  let sum = 0;
  let multiplier = 2;
  
  for (let i = rut.length - 1; i >= 0; i--) {
    sum += parseInt(rut[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  
  const remainder = sum % 11;
  const dv = 11 - remainder;
  
  if (dv === 11) return '0';
  if (dv === 10) return 'K';
  return dv.toString();
};`}
            </Text>
          </View>

          <View style={styles.rutExamples}>
            <Text style={styles.rutExamplesTitle}>Ejemplos de RUT válidos:</Text>
            <Text style={styles.rutExample}>• 9.469.316-0 (7 dígitos)</Text>
            <Text style={styles.rutExample}>• 12.345.678-5 (8 dígitos)</Text>
            <Text style={styles.rutExample}>• 9.876.543-K (con DV = K)</Text>
            <Text style={styles.rutExample}>• 15.234.567-9 (8 dígitos)</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Solo Números</Text>
          <View style={styles.exampleContainer}>
            <TextInput
              style={styles.numericInput}
              placeholder="Solo números"
              value={numericValue}
              onChangeText={(text) => setNumericValue(text.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
            <Text style={styles.inputValue}>
              Valor numérico: {numericValue || '0'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Texto Multilínea</Text>
          <View style={styles.exampleContainer}>
            <TextInput
              style={styles.multilineInput}
              placeholder="Escribe un mensaje largo aquí..."
              value={multilineText}
              onChangeText={setMultilineText}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor="#999"
            />
            <Text style={styles.characterCount}>
              Caracteres: {multilineText.length}/500
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Propiedades Principales</Text>
          <Text style={styles.properties}>
            • value/onChangeText: Valor controlado{'\n'}
            • placeholder: Texto de ayuda{'\n'}
            • keyboardType: Tipo de teclado ('default', 'numeric', 'email-address', etc.){'\n'}
            • secureTextEntry: Para contraseñas{'\n'}
            • multiline: Permite múltiples líneas{'\n'}
            • maxLength: Límite de caracteres{'\n'}
            • autoCapitalize: Control de mayúsculas{'\n'}
            • autoCorrect: Corrección automática{'\n'}
            • editable: Habilita/deshabilita edición{'\n'}
            • onFocus/onBlur: Eventos de enfoque
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tipos de Teclado</Text>
          <View style={styles.keyboardTypesContainer}>
            <View style={styles.keyboardType}>
              <Text style={styles.keyboardTypeTitle}>default</Text>
              <Text style={styles.keyboardTypeDesc}>Teclado estándar</Text>
            </View>
            <View style={styles.keyboardType}>
              <Text style={styles.keyboardTypeTitle}>numeric</Text>
              <Text style={styles.keyboardTypeDesc}>Solo números</Text>
            </View>
            <View style={styles.keyboardType}>
              <Text style={styles.keyboardTypeTitle}>email-address</Text>
              <Text style={styles.keyboardTypeDesc}>Para emails</Text>
            </View>
            <View style={styles.keyboardType}>
              <Text style={styles.keyboardTypeTitle}>phone-pad</Text>
              <Text style={styles.keyboardTypeDesc}>Para teléfonos</Text>
            </View>
            <View style={styles.keyboardType}>
              <Text style={styles.keyboardTypeTitle}>url</Text>
              <Text style={styles.keyboardTypeDesc}>Para URLs</Text>
            </View>
            <View style={styles.keyboardType}>
              <Text style={styles.keyboardTypeTitle}>number-pad</Text>
              <Text style={styles.keyboardTypeDesc}>Pad numérico</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mejores Prácticas</Text>
          <Text style={styles.bestPractices}>
            ✅ Usa el keyboardType apropiado para cada tipo de dato{'\n'}
            ✅ Implementa validación en tiempo real cuando sea útil{'\n'}
            ✅ Proporciona feedback visual del estado (válido/inválido){'\n'}
            ✅ Usa placeholders descriptivos{'\n'}
            ✅ Considera la accesibilidad con accessibilityLabel{'\n'}
            ✅ Implementa formato automático para datos estructurados (RUT, teléfono){'\n'}
            ✅ Usa algoritmos estándar para validación (módulo 11 para RUT){'\n\n'}
            ⚠️ No valides en cada keystroke para campos complejos{'\n'}
            ⚠️ Evita auto-caps en campos como emails y RUT{'\n'}
            ⚠️ No uses secureTextEntry para campos que no sean contraseñas{'\n'}
            ⚠️ Maneja el estado controlado correctamente{'\n'}
            ⚠️ Valida tanto formato como algoritmo en documentos oficiales
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
  basicInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputValue: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
  // Verificación de 6 dígitos
  bankDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  verificationContainer: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e3f2fd',
  },
  verificationLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  codeInputContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  codeInput: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#fff',
  },
  codeInputFilled: {
    borderColor: '#007AFF',
    backgroundColor: '#e3f2fd',
  },
  verificationStatus: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  verificationButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  verifyButton: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButtonText: {
    color: '#999',
  },
  clearButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Password input
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  eyeButton: {
    padding: 12,
  },
  eyeButtonText: {
    fontSize: 20,
  },
  passwordStrength: {
    fontSize: 14,
    marginTop: 8,
    color: '#666',
  },
  // Email y phone
  emailInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  phoneInput: {
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
  validationText: {
    fontSize: 14,
    marginTop: 8,
  },
  validText: {
    color: '#4caf50',
  },
  invalidText: {
    color: '#f44336',
  },
  // RUT chileno
  rutDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  rutInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  rutInfo: {
    backgroundColor: '#f0f8ff',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  rutInfoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  rutExamples: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  rutExamplesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  rutExample: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  // Numeric input
  numericInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  // Multiline
  multilineInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height: 100,
    backgroundColor: '#fff',
  },
  characterCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
  },
  // Código
  codeContainer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
    marginTop: 8,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
  // Keyboard types
  keyboardTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  keyboardType: {
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 6,
    width: '48%',
  },
  keyboardTypeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 2,
  },
  keyboardTypeDesc: {
    fontSize: 12,
    color: '#666',
  },
  // Properties y best practices
  properties: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    fontFamily: 'monospace',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
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

export default TextInputExample;
