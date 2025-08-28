import * as Yup from 'yup';

// Schema para login básico
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('Email es requerido'),
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .required('Contraseña es requerida'),
});

// Schema para registro básico
export const registerSchema = Yup.object().shape({
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
  password: Yup.string()
    .min(8, 'Mínimo 8 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Debe contener al menos una minúscula, una mayúscula y un número'
    )
    .required('Contraseña es requerida'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirmar contraseña es requerido'),
});

// Schema para contacto básico
export const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Muy corto')
    .max(100, 'Muy largo')
    .required('Nombre es requerido'),
  email: Yup.string()
    .email('Email inválido')
    .required('Email es requerido'),
  subject: Yup.string()
    .min(5, 'Muy corto')
    .max(200, 'Muy largo')
    .required('Asunto es requerido'),
  message: Yup.string()
    .min(10, 'Mensaje muy corto')
    .max(1000, 'Mensaje muy largo')
    .required('Mensaje es requerido'),
});

// Schema para restablecimiento de contraseña
export const resetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('Email es requerido'),
});

// Schema para cambio de contraseña
export const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Contraseña actual es requerida'),
  newPassword: Yup.string()
    .min(8, 'Mínimo 8 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Debe contener: mayúscula, minúscula, número y símbolo especial'
    )
    .required('Nueva contraseña es requerida'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Las contraseñas no coinciden')
    .required('Confirmar nueva contraseña es requerido'),
});

// Tipos TypeScript para los schemas
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ResetPasswordFormData {
  email: string;
}

export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
