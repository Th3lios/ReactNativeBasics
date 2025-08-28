import * as Yup from 'yup';

// Interfaces para tipos complejos del perfil profesional
export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  skills: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url: string;
  featured: boolean;
}

export interface ProfessionalFormData {
  // Información básica
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    portfolio: string;
  };
  
  // Arrays de objetos complejos
  experiences: Experience[];
  projects: Project[];
  
  // Arrays simples
  skills: string[];
  languages: string[];
  
  // Configuraciones
  preferences: {
    remote: boolean;
    travel: boolean;
    relocate: boolean;
    salary: {
      min: string;
      max: string;
      currency: string;
    };
  };
  
  // Campo condicional
  additionalInfo: string;
}

// Schema de validación complejo para perfil profesional
export const advancedSchema = Yup.object().shape({
  personalInfo: Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Muy corto')
      .required('Nombre requerido'),
    lastName: Yup.string()
      .min(2, 'Muy corto')
      .required('Apellido requerido'),
    email: Yup.string()
      .email('Email inválido')
      .required('Email requerido'),
    phone: Yup.string()
      .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Formato inválido')
      .required('Teléfono requerido'),
    portfolio: Yup.string()
      .url('URL inválida')
      .required('Portfolio requerido'),
  }),

  experiences: Yup.array()
    .of(
      Yup.object().shape({
        company: Yup.string().required('Empresa requerida'),
        position: Yup.string().required('Cargo requerido'),
        startDate: Yup.string().required('Fecha inicio requerida'),
        endDate: Yup.string().when('current', {
          is: false,
          then: (schema) => schema.required('Fecha fin requerida'),
          otherwise: (schema) => schema.notRequired(),
        }),
        current: Yup.boolean(),
        description: Yup.string()
          .min(50, 'Mínimo 50 caracteres')
          .max(500, 'Máximo 500 caracteres')
          .required('Descripción requerida'),
        skills: Yup.array()
          .of(Yup.string())
          .min(1, 'Al menos una habilidad'),
      })
    )
    .min(1, 'Al menos una experiencia requerida'),

  projects: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('Nombre del proyecto requerido'),
        description: Yup.string()
          .min(30, 'Mínimo 30 caracteres')
          .required('Descripción requerida'),
        technologies: Yup.array()
          .of(Yup.string())
          .min(1, 'Al menos una tecnología'),
        url: Yup.string().url('URL inválida'),
        featured: Yup.boolean(),
      })
    )
    .min(1, 'Al menos un proyecto requerido'),

  skills: Yup.array()
    .of(Yup.string())
    .min(3, 'Mínimo 3 habilidades')
    .max(10, 'Máximo 10 habilidades'),

  languages: Yup.array()
    .of(Yup.string())
    .min(1, 'Al menos un idioma'),

  preferences: Yup.object().shape({
    remote: Yup.boolean(),
    travel: Yup.boolean(),
    relocate: Yup.boolean(),
    salary: Yup.object().shape({
      min: Yup.number()
        .positive('Debe ser positivo')
        .required('Salario mínimo requerido'),
      max: Yup.number()
        .positive('Debe ser positivo')
        .moreThan(Yup.ref('min'), 'Debe ser mayor al mínimo')
        .required('Salario máximo requerido'),
      currency: Yup.string().required('Moneda requerida'),
    }),
  }),

  additionalInfo: Yup.string().when('experiences', {
    is: (experiences: Experience[]) => experiences.length < 2,
    then: (schema) => schema.required('Información adicional requerida para perfiles junior'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

// Schema para experiencia laboral individual
export const experienceSchema = Yup.object().shape({
  company: Yup.string()
    .min(2, 'Muy corto')
    .max(100, 'Muy largo')
    .required('Empresa es requerida'),
  
  position: Yup.string()
    .min(2, 'Muy corto')
    .max(100, 'Muy largo')
    .required('Cargo es requerido'),
  
  startDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Formato: MM/YYYY')
    .required('Fecha de inicio es requerida'),
  
  endDate: Yup.string()
    .when('current', {
      is: false,
      then: (schema) => schema
        .matches(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Formato: MM/YYYY')
        .required('Fecha de fin es requerida'),
      otherwise: (schema) => schema.notRequired(),
    }),
  
  current: Yup.boolean(),
  
  description: Yup.string()
    .min(50, 'Descripción muy corta - mínimo 50 caracteres')
    .max(1000, 'Descripción muy larga - máximo 1000 caracteres')
    .required('Descripción es requerida'),
  
  skills: Yup.array()
    .of(Yup.string().min(1, 'Habilidad no puede estar vacía'))
    .min(1, 'Al menos una habilidad es requerida')
    .max(15, 'Máximo 15 habilidades'),
  
  achievements: Yup.array()
    .of(Yup.string().min(10, 'Logro muy corto'))
    .max(10, 'Máximo 10 logros'),
});

// Schema para proyecto individual
export const projectSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Muy corto')
    .max(100, 'Muy largo')
    .required('Nombre del proyecto es requerido'),
  
  description: Yup.string()
    .min(30, 'Descripción muy corta - mínimo 30 caracteres')
    .max(1000, 'Descripción muy larga - máximo 1000 caracteres')
    .required('Descripción es requerida'),
  
  technologies: Yup.array()
    .of(Yup.string().min(1, 'Tecnología no puede estar vacía'))
    .min(1, 'Al menos una tecnología es requerida')
    .max(20, 'Máximo 20 tecnologías'),
  
  url: Yup.string()
    .url('URL inválida')
    .notRequired(),
  
  repositoryUrl: Yup.string()
    .url('URL inválida')
    .notRequired(),
  
  demoUrl: Yup.string()
    .url('URL inválida')
    .notRequired(),
  
  featured: Yup.boolean(),
  
  status: Yup.string()
    .oneOf(['completed', 'in-progress', 'planned'], 'Estado inválido'),
  
  startDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Formato: MM/YYYY'),
  
  endDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Formato: MM/YYYY'),
});

// Schema para educación
export const educationSchema = Yup.object().shape({
  institution: Yup.string()
    .min(3, 'Muy corto')
    .max(100, 'Muy largo')
    .required('Institución es requerida'),
  
  degree: Yup.string()
    .min(3, 'Muy corto')
    .max(100, 'Muy largo')
    .required('Título es requerido'),
  
  field: Yup.string()
    .min(3, 'Muy corto')
    .max(100, 'Muy largo')
    .required('Campo de estudio es requerido'),
  
  startDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Formato: MM/YYYY')
    .required('Fecha de inicio es requerida'),
  
  endDate: Yup.string()
    .when('current', {
      is: false,
      then: (schema) => schema
        .matches(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Formato: MM/YYYY')
        .required('Fecha de fin es requerida'),
      otherwise: (schema) => schema.notRequired(),
    }),
  
  current: Yup.boolean(),
  
  gpa: Yup.number()
    .min(0, 'GPA no puede ser negativo')
    .max(4, 'GPA máximo es 4.0')
    .notRequired(),
  
  description: Yup.string()
    .max(500, 'Descripción muy larga')
    .notRequired(),
});

// Schema para certificaciones
export const certificationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Muy corto')
    .max(100, 'Muy largo')
    .required('Nombre de la certificación es requerido'),
  
  issuer: Yup.string()
    .min(2, 'Muy corto')
    .max(100, 'Muy largo')
    .required('Emisor es requerido'),
  
  issueDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Formato: MM/YYYY')
    .required('Fecha de emisión es requerida'),
  
  expirationDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Formato: MM/YYYY')
    .notRequired(),
  
  credentialId: Yup.string()
    .max(100, 'ID muy largo')
    .notRequired(),
  
  credentialUrl: Yup.string()
    .url('URL inválida')
    .notRequired(),
  
  neverExpires: Yup.boolean(),
});

// Schema para habilidades técnicas
export const skillsSchema = Yup.object().shape({
  technical: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('Nombre de habilidad requerido'),
        level: Yup.string()
          .oneOf(['beginner', 'intermediate', 'advanced', 'expert'], 'Nivel inválido')
          .required('Nivel requerido'),
        category: Yup.string()
          .oneOf(['frontend', 'backend', 'database', 'devops', 'mobile', 'other'], 'Categoría inválida')
          .required('Categoría requerida'),
      })
    )
    .min(3, 'Mínimo 3 habilidades técnicas')
    .max(20, 'Máximo 20 habilidades técnicas'),
  
  soft: Yup.array()
    .of(Yup.string().min(2, 'Habilidad muy corta'))
    .min(3, 'Mínimo 3 habilidades blandas')
    .max(10, 'Máximo 10 habilidades blandas'),
  
  languages: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('Idioma requerido'),
        level: Yup.string()
          .oneOf(['basic', 'conversational', 'fluent', 'native'], 'Nivel inválido')
          .required('Nivel requerido'),
      })
    )
    .min(1, 'Al menos un idioma es requerido'),
});

// Tipos adicionales para formularios profesionales
export interface ExperienceFormData {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  skills: string[];
  achievements: string[];
}

export interface ProjectFormData {
  name: string;
  description: string;
  technologies: string[];
  url: string;
  repositoryUrl: string;
  demoUrl: string;
  featured: boolean;
  status: string;
  startDate: string;
  endDate: string;
}

export interface EducationFormData {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa: number;
  description: string;
}

export interface CertificationFormData {
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate: string;
  credentialId: string;
  credentialUrl: string;
  neverExpires: boolean;
}

export interface SkillsFormData {
  technical: Array<{
    name: string;
    level: string;
    category: string;
  }>;
  soft: string[];
  languages: Array<{
    name: string;
    level: string;
  }>;
}
