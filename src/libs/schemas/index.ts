import * as Yup from 'yup';

// Export all authentication schemas and types
export {
  loginSchema,
  registerSchema,
  contactSchema,
  resetPasswordSchema,
  changePasswordSchema,
  type LoginFormData,
  type RegisterFormData,
  type ContactFormData,
  type ResetPasswordFormData,
  type ChangePasswordFormData,
} from './authSchemas';

// Export all user schemas and types
export {
  registrationSchema,
  userProfileSchema,
  accountSettingsSchema,
  addressSchema,
  type RegistrationFormData,
  type UserProfileFormData,
  type AccountSettingsFormData,
  type AddressFormData,
} from './userSchemas';

// Export all professional schemas and types
export {
  advancedSchema,
  experienceSchema,
  projectSchema,
  educationSchema,
  certificationSchema,
  skillsSchema,
  type ProfessionalFormData,
  type Experience,
  type Project,
  type ExperienceFormData,
  type ProjectFormData,
  type EducationFormData,
  type CertificationFormData,
  type SkillsFormData,
} from './professionalSchemas';

// Re-export Yup for convenience
export * as Yup from 'yup';

// Common validation utilities
export const commonValidations = {
  // Email validation
  email: (message = 'Email inválido') => 
    Yup.string().email(message).required('Email es requerido'),
  
  // Password validation (basic)
  password: (minLength = 6, message = `Mínimo ${6} caracteres`) =>
    Yup.string().min(minLength, message).required('Contraseña es requerida'),
  
  // Strong password validation
  strongPassword: (message = 'Debe contener: mayúscula, minúscula, número y símbolo') =>
    Yup.string()
      .min(8, 'Mínimo 8 caracteres')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        message
      )
      .required('Contraseña es requerida'),
  
  // Phone validation
  phone: (message = 'Formato de teléfono inválido') =>
    Yup.string()
      .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, message)
      .required('Teléfono es requerido'),
  
  // Name validation (only letters and spaces)
  name: (minLength = 2, maxLength = 50) =>
    Yup.string()
      .min(minLength, `Muy corto - mínimo ${minLength} caracteres`)
      .max(maxLength, `Muy largo - máximo ${maxLength} caracteres`)
      .matches(/^[a-zA-ZÀ-ÿ\s]*$/, 'Solo se permiten letras y espacios')
      .required('Campo requerido'),
  
  // URL validation
  url: (required = false, message = 'URL inválida') => {
    const schema = Yup.string().url(message);
    return required ? schema.required('URL es requerida') : schema.notRequired();
  },
  
  // Age validation
  age: (minAge = 18, maxAge = 120) =>
    Yup.number()
      .typeError('Debe ser un número')
      .positive('La edad debe ser positiva')
      .integer('La edad debe ser un número entero')
      .min(minAge, `Debes ser mayor de ${minAge} años`)
      .max(maxAge, 'Edad no válida')
      .required('Edad es requerida'),
  
  // Required string with custom length
  requiredString: (minLength = 1, maxLength = 255, fieldName = 'Campo') =>
    Yup.string()
      .min(minLength, `${fieldName} muy corto - mínimo ${minLength} caracteres`)
      .max(maxLength, `${fieldName} muy largo - máximo ${maxLength} caracteres`)
      .required(`${fieldName} es requerido`),
  
  // Optional string with length limits
  optionalString: (maxLength = 255) =>
    Yup.string()
      .max(maxLength, `Muy largo - máximo ${maxLength} caracteres`)
      .notRequired(),
  
  // Date validation (MM/YYYY format)
  monthYear: (message = 'Formato: MM/YYYY') =>
    Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/\d{4}$/, message)
      .required('Fecha es requerida'),
  
  // Array validation
  requiredArray: (minItems = 1, itemName = 'elemento') =>
    Yup.array()
      .min(minItems, `Al menos ${minItems} ${itemName}${minItems > 1 ? 's' : ''} requerido${minItems > 1 ? 's' : ''}`),
  
  // Confirm password validation
  confirmPassword: (passwordField = 'password') =>
    Yup.string()
      .oneOf([Yup.ref(passwordField)], 'Las contraseñas no coinciden')
      .required('Confirmar contraseña es requerido'),
  
  // Terms acceptance
  acceptTerms: (message = 'Debes aceptar los términos y condiciones') =>
    Yup.boolean().oneOf([true], message),
  
  // Select validation
  selectOption: (options: string[], fieldName = 'Campo') =>
    Yup.string()
      .oneOf(options, 'Opción inválida')
      .required(`${fieldName} es requerido`),
};

// Validation messages in Spanish (default)
export const validationMessages = {
  required: 'Este campo es requerido',
  email: 'Email inválido',
  minLength: (min: number) => `Mínimo ${min} caracteres`,
  maxLength: (max: number) => `Máximo ${max} caracteres`,
  min: (min: number) => `Valor mínimo: ${min}`,
  max: (max: number) => `Valor máximo: ${max}`,
  url: 'URL inválida',
  phoneFormat: 'Formato de teléfono inválido',
  passwordMatch: 'Las contraseñas no coinciden',
  invalidOption: 'Opción inválida',
  acceptTerms: 'Debes aceptar los términos y condiciones',
  positiveNumber: 'Debe ser un número positivo',
  integer: 'Debe ser un número entero',
  dateFormat: 'Formato de fecha inválido',
  lettersOnly: 'Solo se permiten letras',
  alphanumeric: 'Solo se permiten letras y números',
  strongPassword: 'Debe contener: mayúscula, minúscula, número y símbolo especial',
  uniqueValue: 'Este valor ya está en uso',
  futureDate: 'La fecha debe ser futura',
  pastDate: 'La fecha debe ser pasada',
  minAge: (age: number) => `Debes ser mayor de ${age} años`,
  maxAge: (age: number) => `Edad máxima: ${age} años`,
  minArrayLength: (min: number, item: string) => 
    `Al menos ${min} ${item}${min > 1 ? 's' : ''} requerido${min > 1 ? 's' : ''}`,
  maxArrayLength: (max: number, item: string) => 
    `Máximo ${max} ${item}${max > 1 ? 's' : ''}`,
};

// Schema presets for common use cases
export const schemaPresets = {
  // Basic login form
  basicLogin: Yup.object().shape({
    email: commonValidations.email(),
    password: commonValidations.password(),
  }),
  
  // Basic registration form
  basicRegistration: Yup.object().shape({
    firstName: commonValidations.name(),
    lastName: commonValidations.name(),
    email: commonValidations.email(),
    password: commonValidations.strongPassword(),
    confirmPassword: commonValidations.confirmPassword(),
    terms: commonValidations.acceptTerms(),
  }),
  
  // Contact form
  basicContact: Yup.object().shape({
    name: commonValidations.requiredString(2, 100, 'Nombre'),
    email: commonValidations.email(),
    subject: commonValidations.requiredString(5, 200, 'Asunto'),
    message: commonValidations.requiredString(10, 1000, 'Mensaje'),
  }),
  
  // Newsletter subscription
  newsletter: Yup.object().shape({
    email: commonValidations.email(),
    preferences: Yup.object().shape({
      frequency: commonValidations.selectOption(['daily', 'weekly', 'monthly'], 'Frecuencia'),
      topics: Yup.array().of(Yup.string()).min(1, 'Selecciona al menos un tema'),
    }),
  }),
};
