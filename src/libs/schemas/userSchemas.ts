import * as Yup from 'yup';

// Schema para registro completo de usuario (del FormikYupExample)
export const registrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Muy corto - mínimo 2 caracteres')
    .max(50, 'Muy largo - máximo 50 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\s]*$/, 'Solo se permiten letras')
    .required('Nombre es requerido'),

  lastName: Yup.string()
    .min(2, 'Muy corto - mínimo 2 caracteres')
    .max(50, 'Muy largo - máximo 50 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\s]*$/, 'Solo se permiten letras')
    .required('Apellido es requerido'),

  email: Yup.string()
    .email('Email inválido')
    .required('Email es requerido'),

  phone: Yup.string()
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Formato de teléfono inválido')
    .min(10, 'Teléfono muy corto')
    .required('Teléfono es requerido'),

  age: Yup.number()
    .typeError('Debe ser un número')
    .positive('La edad debe ser positiva')
    .integer('La edad debe ser un número entero')
    .min(18, 'Debes ser mayor de 18 años')
    .max(120, 'Edad no válida')
    .required('Edad es requerida'),

  password: Yup.string()
    .min(8, 'Mínimo 8 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Debe contener: mayúscula, minúscula, número y símbolo'
    )
    .required('Password es requerido'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirmar password es requerido'),

  website: Yup.string()
    .url('URL inválida')
    .notRequired(),

  bio: Yup.string()
    .max(500, 'Máximo 500 caracteres')
    .notRequired(),

  terms: Yup.boolean()
    .oneOf([true], 'Debes aceptar los términos y condiciones'),

  newsletter: Yup.boolean(),

  preferredContact: Yup.string()
    .oneOf(['email', 'phone', 'both'], 'Selecciona una opción válida')
    .required('Método de contacto es requerido'),
});

// Schema para perfil de usuario
export const userProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Muy corto')
    .max(50, 'Muy largo')
    .required('Nombre es requerido'),
  
  lastName: Yup.string()
    .min(2, 'Muy corto')
    .max(50, 'Muy largo')
    .required('Apellido es requerido'),
  
  email: Yup.string()
    .email('Email inválido')
    .required('Email es requerido'),
  
  phone: Yup.string()
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Formato inválido')
    .required('Teléfono es requerido'),
  
  bio: Yup.string()
    .max(500, 'Máximo 500 caracteres'),
  
  website: Yup.string()
    .url('URL inválida'),
  
  socialMedia: Yup.object().shape({
    twitter: Yup.string().url('URL inválida'),
    linkedin: Yup.string().url('URL inválida'),
    github: Yup.string().url('URL inválida'),
    instagram: Yup.string().url('URL inválida'),
  }),
  
  preferences: Yup.object().shape({
    notifications: Yup.boolean(),
    newsletter: Yup.boolean(),
    publicProfile: Yup.boolean(),
    language: Yup.string().oneOf(['es', 'en', 'fr', 'pt'], 'Idioma inválido'),
  }),
});

// Schema para configuración de cuenta
export const accountSettingsSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('Email es requerido'),
  
  username: Yup.string()
    .min(3, 'Mínimo 3 caracteres')
    .max(30, 'Máximo 30 caracteres')
    .matches(/^[a-zA-Z0-9_]*$/, 'Solo letras, números y guión bajo')
    .required('Username es requerido'),
  
  displayName: Yup.string()
    .min(2, 'Muy corto')
    .max(50, 'Muy largo')
    .required('Nombre de usuario es requerido'),
  
  privacy: Yup.object().shape({
    profileVisibility: Yup.string()
      .oneOf(['public', 'private', 'friends'], 'Opción inválida')
      .required('Visibilidad requerida'),
    showEmail: Yup.boolean(),
    showPhone: Yup.boolean(),
    allowMessages: Yup.boolean(),
  }),
  
  notifications: Yup.object().shape({
    email: Yup.boolean(),
    push: Yup.boolean(),
    sms: Yup.boolean(),
    marketing: Yup.boolean(),
  }),
});

// Schema para dirección
export const addressSchema = Yup.object().shape({
  street: Yup.string()
    .min(5, 'Dirección muy corta')
    .max(100, 'Dirección muy larga')
    .required('Dirección es requerida'),
  
  city: Yup.string()
    .min(2, 'Ciudad muy corta')
    .max(50, 'Ciudad muy larga')
    .required('Ciudad es requerida'),
  
  state: Yup.string()
    .min(2, 'Estado muy corto')
    .max(50, 'Estado muy largo')
    .required('Estado es requerido'),
  
  zipCode: Yup.string()
    .matches(/^\d{5}(-\d{4})?$/, 'Formato de código postal inválido')
    .required('Código postal es requerido'),
  
  country: Yup.string()
    .min(2, 'País muy corto')
    .max(50, 'País muy largo')
    .required('País es requerido'),
  
  isDefault: Yup.boolean(),
});

// Tipos TypeScript para los schemas de usuario
export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  password: string;
  confirmPassword: string;
  website: string;
  bio: string;
  terms: boolean;
  newsletter: boolean;
  preferredContact: string;
}

export interface UserProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  website: string;
  socialMedia: {
    twitter: string;
    linkedin: string;
    github: string;
    instagram: string;
  };
  preferences: {
    notifications: boolean;
    newsletter: boolean;
    publicProfile: boolean;
    language: string;
  };
}

export interface AccountSettingsFormData {
  email: string;
  username: string;
  displayName: string;
  privacy: {
    profileVisibility: string;
    showEmail: boolean;
    showPhone: boolean;
    allowMessages: boolean;
  };
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketing: boolean;
  };
}

export interface AddressFormData {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}
