import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik, FieldArray, FormikProps } from 'formik';
import { 
  advancedSchema, 
  type ProfessionalFormData
} from '../../../libs/schemas';

// Tipos importados desde libs/schemas

// Schema importado desde libs/schemas

const FormikAdvancedExample = () => {
  const [activeSection, setActiveSection] = useState(0);

  const initialValues: ProfessionalFormData = {
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      portfolio: '',
    },
    experiences: [
      {
        id: '1',
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        skills: [''],
      },
    ],
    projects: [
      {
        id: '1',
        name: '',
        description: '',
        technologies: [''],
        url: '',
        featured: false,
      },
    ],
    skills: [''],
    languages: [''],
    preferences: {
      remote: false,
      travel: false,
      relocate: false,
      salary: {
        min: '',
        max: '',
        currency: 'USD',
      },
    },
    additionalInfo: '',
  };

  const handleSubmit = async (values: ProfessionalFormData) => {
    try {
      console.log('Form submitted:', JSON.stringify(values, null, 2));
      Alert.alert(
        'Formulario Enviado',
        'Perfil profesional creado exitosamente.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al enviar el formulario.');
    }
  };

  const generateId = () => Date.now().toString();

  const sections = [
    { title: 'Información Personal', icon: '👤' },
    { title: 'Experiencia Laboral', icon: '💼' },
    { title: 'Proyectos', icon: '🚀' },
    { title: 'Habilidades', icon: '🛠️' },
    { title: 'Preferencias', icon: '⚙️' },
  ];

  const renderArrayInput = (
    values: string[],
    name: string,
    placeholder: string,
    setFieldValue: any,
    errors: any,
    touched: any
  ) => (
    <FieldArray name={name}>
      {({ push, remove }) => (
        <View>
          {values.map((value, index) => (
            <View key={index} style={styles.arrayInputContainer}>
              <TextInput
                style={[
                  styles.arrayInput,
                  errors?.[name]?.[index] && touched?.[name]?.[index] && styles.inputError
                ]}
                value={value}
                onChangeText={(text) => setFieldValue(`${name}.${index}`, text)}
                placeholder={`${placeholder} ${index + 1}`}
                placeholderTextColor="#999"
              />
              {values.length > 1 && (
                <Pressable
                  style={styles.removeButton}
                  onPress={() => remove(index)}
                >
                  <Text style={styles.removeButtonText}>✕</Text>
                </Pressable>
              )}
            </View>
          ))}
          <Pressable
            style={styles.addButton}
            onPress={() => push('')}
          >
            <Text style={styles.addButtonText}>+ Agregar {placeholder}</Text>
          </Pressable>
          {errors?.[name] && typeof errors[name] === 'string' && (
            <Text style={styles.errorText}>{errors[name]}</Text>
          )}
        </View>
      )}
    </FieldArray>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Formulario Avanzado</Text>
          <Text style={styles.subtitle}>
            Arrays, objetos anidados y validación compleja
          </Text>
        </View>

        {/* Section Navigation */}
        <View style={styles.sectionNav}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {sections.map((section, index) => (
              <Pressable
                key={index}
                style={[
                  styles.navItem,
                  activeSection === index && styles.navItemActive
                ]}
                onPress={() => setActiveSection(index)}
              >
                <Text style={styles.navIcon}>{section.icon}</Text>
                <Text style={[
                  styles.navText,
                  activeSection === index && styles.navTextActive
                ]}>
                  {section.title}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <Formik
          initialValues={initialValues}
          validationSchema={advancedSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            handleSubmit,
            isValid,
            dirty,
          }: FormikProps<ProfessionalFormData>) => (
            <View style={styles.formContainer}>
              {/* Personal Information Section */}
              {activeSection === 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>👤 Información Personal</Text>
                  
                  <View style={styles.row}>
                    <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                      <Text style={styles.label}>Nombre *</Text>
                      <TextInput
                        style={[
                          styles.input,
                          errors.personalInfo?.firstName && touched.personalInfo?.firstName && styles.inputError
                        ]}
                        value={values.personalInfo.firstName}
                        onChangeText={handleChange('personalInfo.firstName')}
                        onBlur={handleBlur('personalInfo.firstName')}
                        placeholder="Juan"
                        placeholderTextColor="#999"
                      />
                      {errors.personalInfo?.firstName && touched.personalInfo?.firstName && (
                        <Text style={styles.errorText}>{errors.personalInfo.firstName}</Text>
                      )}
                    </View>

                    <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                      <Text style={styles.label}>Apellido *</Text>
                      <TextInput
                        style={[
                          styles.input,
                          errors.personalInfo?.lastName && touched.personalInfo?.lastName && styles.inputError
                        ]}
                        value={values.personalInfo.lastName}
                        onChangeText={handleChange('personalInfo.lastName')}
                        onBlur={handleBlur('personalInfo.lastName')}
                        placeholder="Pérez"
                        placeholderTextColor="#999"
                      />
                      {errors.personalInfo?.lastName && touched.personalInfo?.lastName && (
                        <Text style={styles.errorText}>{errors.personalInfo.lastName}</Text>
                      )}
                    </View>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email *</Text>
                    <TextInput
                      style={[
                        styles.input,
                        errors.personalInfo?.email && touched.personalInfo?.email && styles.inputError
                      ]}
                      value={values.personalInfo.email}
                      onChangeText={handleChange('personalInfo.email')}
                      onBlur={handleBlur('personalInfo.email')}
                      placeholder="juan@ejemplo.com"
                      placeholderTextColor="#999"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                    {errors.personalInfo?.email && touched.personalInfo?.email && (
                      <Text style={styles.errorText}>{errors.personalInfo.email}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Teléfono *</Text>
                    <TextInput
                      style={[
                        styles.input,
                        errors.personalInfo?.phone && touched.personalInfo?.phone && styles.inputError
                      ]}
                      value={values.personalInfo.phone}
                      onChangeText={handleChange('personalInfo.phone')}
                      onBlur={handleBlur('personalInfo.phone')}
                      placeholder="+56 9 1234 5678"
                      placeholderTextColor="#999"
                      keyboardType="phone-pad"
                    />
                    {errors.personalInfo?.phone && touched.personalInfo?.phone && (
                      <Text style={styles.errorText}>{errors.personalInfo.phone}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Portfolio *</Text>
                    <TextInput
                      style={[
                        styles.input,
                        errors.personalInfo?.portfolio && touched.personalInfo?.portfolio && styles.inputError
                      ]}
                      value={values.personalInfo.portfolio}
                      onChangeText={handleChange('personalInfo.portfolio')}
                      onBlur={handleBlur('personalInfo.portfolio')}
                      placeholder="https://miportfolio.com"
                      placeholderTextColor="#999"
                      keyboardType="url"
                      autoCapitalize="none"
                    />
                    {errors.personalInfo?.portfolio && touched.personalInfo?.portfolio && (
                      <Text style={styles.errorText}>{errors.personalInfo.portfolio}</Text>
                    )}
                  </View>
                </View>
              )}

              {/* Experience Section */}
              {activeSection === 1 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>💼 Experiencia Laboral</Text>
                  
                  <FieldArray name="experiences">
                    {({ push, remove }) => (
                      <View>
                        {values.experiences.map((experience, index) => (
                          <View key={experience.id} style={styles.experienceCard}>
                            <View style={styles.cardHeader}>
                              <Text style={styles.cardTitle}>Experiencia {index + 1}</Text>
                              {values.experiences.length > 1 && (
                                <Pressable
                                  style={styles.deleteButton}
                                  onPress={() => remove(index)}
                                >
                                  <Text style={styles.deleteButtonText}>Eliminar</Text>
                                </Pressable>
                              )}
                            </View>

                            <View style={styles.row}>
                              <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                                <Text style={styles.label}>Empresa *</Text>
                                <TextInput
                                  style={styles.input}
                                  value={experience.company}
                                  onChangeText={(text) => setFieldValue(`experiences.${index}.company`, text)}
                                  placeholder="Nombre de la empresa"
                                  placeholderTextColor="#999"
                                />
                              </View>

                              <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                                <Text style={styles.label}>Cargo *</Text>
                                <TextInput
                                  style={styles.input}
                                  value={experience.position}
                                  onChangeText={(text) => setFieldValue(`experiences.${index}.position`, text)}
                                  placeholder="Tu cargo"
                                  placeholderTextColor="#999"
                                />
                              </View>
                            </View>

                            <View style={styles.checkboxContainer}>
                              <Pressable
                                style={styles.checkbox}
                                onPress={() => setFieldValue(`experiences.${index}.current`, !experience.current)}
                              >
                                <View style={[
                                  styles.checkboxBox,
                                  experience.current && styles.checkboxChecked
                                ]}>
                                  {experience.current && <Text style={styles.checkmark}>✓</Text>}
                                </View>
                                <Text style={styles.checkboxLabel}>Trabajo actual</Text>
                              </Pressable>
                            </View>

                            <View style={styles.row}>
                              <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                                <Text style={styles.label}>Fecha Inicio *</Text>
                                <TextInput
                                  style={styles.input}
                                  value={experience.startDate}
                                  onChangeText={(text) => setFieldValue(`experiences.${index}.startDate`, text)}
                                  placeholder="MM/YYYY"
                                  placeholderTextColor="#999"
                                />
                              </View>

                              {!experience.current && (
                                <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                                  <Text style={styles.label}>Fecha Fin *</Text>
                                  <TextInput
                                    style={styles.input}
                                    value={experience.endDate}
                                    onChangeText={(text) => setFieldValue(`experiences.${index}.endDate`, text)}
                                    placeholder="MM/YYYY"
                                    placeholderTextColor="#999"
                                  />
                                </View>
                              )}
                            </View>

                            <View style={styles.inputContainer}>
                              <Text style={styles.label}>Descripción *</Text>
                              <TextInput
                                style={styles.textArea}
                                value={experience.description}
                                onChangeText={(text) => setFieldValue(`experiences.${index}.description`, text)}
                                placeholder="Describe tus responsabilidades y logros..."
                                placeholderTextColor="#999"
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                              />
                            </View>

                            <View style={styles.inputContainer}>
                              <Text style={styles.label}>Habilidades Utilizadas *</Text>
                              {renderArrayInput(
                                experience.skills,
                                `experiences.${index}.skills`,
                                'Habilidad',
                                setFieldValue,
                                errors,
                                touched
                              )}
                            </View>
                          </View>
                        ))}

                        <Pressable
                          style={styles.addExperienceButton}
                          onPress={() => push({
                            id: generateId(),
                            company: '',
                            position: '',
                            startDate: '',
                            endDate: '',
                            current: false,
                            description: '',
                            skills: [''],
                          })}
                        >
                          <Text style={styles.addExperienceButtonText}>+ Agregar Experiencia</Text>
                        </Pressable>
                      </View>
                    )}
                  </FieldArray>
                </View>
              )}

              {/* Projects Section */}
              {activeSection === 2 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>🚀 Proyectos</Text>
                  
                  <FieldArray name="projects">
                    {({ push, remove }) => (
                      <View>
                        {values.projects.map((project, index) => (
                          <View key={project.id} style={styles.projectCard}>
                            <View style={styles.cardHeader}>
                              <Text style={styles.cardTitle}>Proyecto {index + 1}</Text>
                              <View style={styles.cardActions}>
                                <Pressable
                                  style={styles.featuredButton}
                                  onPress={() => setFieldValue(`projects.${index}.featured`, !project.featured)}
                                >
                                  <Text style={styles.featuredButtonText}>
                                    {project.featured ? '⭐ Destacado' : '☆ Destacar'}
                                  </Text>
                                </Pressable>
                                {values.projects.length > 1 && (
                                  <Pressable
                                    style={styles.deleteButton}
                                    onPress={() => remove(index)}
                                  >
                                    <Text style={styles.deleteButtonText}>Eliminar</Text>
                                  </Pressable>
                                )}
                              </View>
                            </View>

                            <View style={styles.inputContainer}>
                              <Text style={styles.label}>Nombre del Proyecto *</Text>
                              <TextInput
                                style={styles.input}
                                value={project.name}
                                onChangeText={(text) => setFieldValue(`projects.${index}.name`, text)}
                                placeholder="Mi Proyecto Increíble"
                                placeholderTextColor="#999"
                              />
                            </View>

                            <View style={styles.inputContainer}>
                              <Text style={styles.label}>Descripción *</Text>
                              <TextInput
                                style={styles.textArea}
                                value={project.description}
                                onChangeText={(text) => setFieldValue(`projects.${index}.description`, text)}
                                placeholder="Describe tu proyecto, objetivos y resultados..."
                                placeholderTextColor="#999"
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                              />
                            </View>

                            <View style={styles.inputContainer}>
                              <Text style={styles.label}>URL del Proyecto</Text>
                              <TextInput
                                style={styles.input}
                                value={project.url}
                                onChangeText={(text) => setFieldValue(`projects.${index}.url`, text)}
                                placeholder="https://miproyecto.com"
                                placeholderTextColor="#999"
                                keyboardType="url"
                                autoCapitalize="none"
                              />
                            </View>

                            <View style={styles.inputContainer}>
                              <Text style={styles.label}>Tecnologías Utilizadas *</Text>
                              {renderArrayInput(
                                project.technologies,
                                `projects.${index}.technologies`,
                                'Tecnología',
                                setFieldValue,
                                errors,
                                touched
                              )}
                            </View>
                          </View>
                        ))}

                        <Pressable
                          style={styles.addProjectButton}
                          onPress={() => push({
                            id: generateId(),
                            name: '',
                            description: '',
                            technologies: [''],
                            url: '',
                            featured: false,
                          })}
                        >
                          <Text style={styles.addProjectButtonText}>+ Agregar Proyecto</Text>
                        </Pressable>
                      </View>
                    )}
                  </FieldArray>
                </View>
              )}

              {/* Skills Section */}
              {activeSection === 3 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>🛠️ Habilidades</Text>
                  
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Habilidades Técnicas * (3-10)</Text>
                    {renderArrayInput(values.skills, 'skills', 'Habilidad', setFieldValue, errors, touched)}
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Idiomas *</Text>
                    {renderArrayInput(values.languages, 'languages', 'Idioma', setFieldValue, errors, touched)}
                  </View>
                </View>
              )}

              {/* Preferences Section */}
              {activeSection === 4 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>⚙️ Preferencias</Text>
                  
                  <View style={styles.preferencesContainer}>
                    <View style={styles.switchRow}>
                      <Text style={styles.switchLabel}>Trabajo Remoto</Text>
                      <Switch
                        value={values.preferences.remote}
                        onValueChange={(value) => setFieldValue('preferences.remote', value)}
                        trackColor={{ false: '#ccc', true: '#007AFF' }}
                        thumbColor="#fff"
                      />
                    </View>

                    <View style={styles.switchRow}>
                      <Text style={styles.switchLabel}>Disponible para Viajar</Text>
                      <Switch
                        value={values.preferences.travel}
                        onValueChange={(value) => setFieldValue('preferences.travel', value)}
                        trackColor={{ false: '#ccc', true: '#007AFF' }}
                        thumbColor="#fff"
                      />
                    </View>

                    <View style={styles.switchRow}>
                      <Text style={styles.switchLabel}>Disponible para Relocalización</Text>
                      <Switch
                        value={values.preferences.relocate}
                        onValueChange={(value) => setFieldValue('preferences.relocate', value)}
                        trackColor={{ false: '#ccc', true: '#007AFF' }}
                        thumbColor="#fff"
                      />
                    </View>
                  </View>

                  <View style={styles.salaryContainer}>
                    <Text style={styles.label}>Rango Salarial Esperado *</Text>
                    
                    <View style={styles.row}>
                      <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                        <Text style={styles.sublabel}>Mínimo</Text>
                        <TextInput
                          style={styles.input}
                          value={values.preferences.salary.min}
                          onChangeText={handleChange('preferences.salary.min')}
                          placeholder="50000"
                          placeholderTextColor="#999"
                          keyboardType="numeric"
                        />
                      </View>

                      <View style={[styles.inputContainer, { flex: 1, marginHorizontal: 8 }]}>
                        <Text style={styles.sublabel}>Máximo</Text>
                        <TextInput
                          style={styles.input}
                          value={values.preferences.salary.max}
                          onChangeText={handleChange('preferences.salary.max')}
                          placeholder="100000"
                          placeholderTextColor="#999"
                          keyboardType="numeric"
                        />
                      </View>

                      <View style={[styles.inputContainer, { flex: 0.5, marginLeft: 8 }]}>
                        <Text style={styles.sublabel}>Moneda</Text>
                        <TextInput
                          style={styles.input}
                          value={values.preferences.salary.currency}
                          onChangeText={handleChange('preferences.salary.currency')}
                          placeholder="USD"
                          placeholderTextColor="#999"
                        />
                      </View>
                    </View>
                  </View>

                  {/* Conditional field */}
                  {values.experiences.length < 2 && (
                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Información Adicional * (Perfil Junior)</Text>
                      <TextInput
                        style={styles.textArea}
                        value={values.additionalInfo}
                        onChangeText={handleChange('additionalInfo')}
                        placeholder="Para perfiles junior, cuéntanos sobre tu motivación, proyectos personales, cursos, etc..."
                        placeholderTextColor="#999"
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                      />
                      {errors.additionalInfo && touched.additionalInfo && (
                        <Text style={styles.errorText}>{errors.additionalInfo}</Text>
                      )}
                    </View>
                  )}
                </View>
              )}

              {/* Form Status */}
              <View style={styles.statusSection}>
                <Text style={styles.statusTitle}>Estado del Formulario:</Text>
                <View style={styles.statusRow}>
                  <Text style={[styles.statusText, isValid ? styles.statusSuccess : styles.statusError]}>
                    Válido: {isValid ? '✅' : '❌'}
                  </Text>
                  <Text style={[styles.statusText, dirty ? styles.statusSuccess : styles.statusError]}>
                    Modificado: {dirty ? '✅' : '❌'}
                  </Text>
                </View>
              </View>

              {/* Submit Button */}
              <Pressable
                style={[
                  styles.submitButton,
                  (!isValid || !dirty) && styles.submitButtonDisabled
                ]}
                onPress={() => handleSubmit()}
                disabled={!isValid || !dirty}
              >
                <Text style={[
                  styles.submitButtonText,
                  (!isValid || !dirty) && styles.submitButtonTextDisabled
                ]}>
                  Crear Perfil Profesional
                </Text>
              </Pressable>

              {/* Validation Summary */}
              {Object.keys(errors).length > 0 && dirty && (
                <View style={styles.validationSummary}>
                  <Text style={styles.validationTitle}>❌ Resumen de Errores:</Text>
                  <Text style={styles.validationCount}>
                    Total de errores: {Object.keys(errors).length}
                  </Text>
                  <Text style={styles.validationNote}>
                    Navega por las secciones para corregir los errores.
                  </Text>
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
  sectionNav: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  navItemActive: {
    backgroundColor: '#007AFF',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  navTextActive: {
    color: '#fff',
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
    fontSize: 20,
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
  sublabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 4,
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
  textArea: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
  },
  arrayInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  arrayInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginRight: 8,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  experienceCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  projectCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#34C759',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  featuredButton: {
    backgroundColor: '#FF9500',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  featuredButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
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
  },
  addExperienceButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addExperienceButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  addProjectButton: {
    backgroundColor: '#34C759',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addProjectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  preferencesContainer: {
    gap: 16,
    marginBottom: 24,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  salaryContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
  },
  statusSection: {
    backgroundColor: '#e8f4fd',
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
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusSuccess: {
    color: '#34C759',
  },
  statusError: {
    color: '#FF3B30',
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
  validationCount: {
    fontSize: 14,
    color: '#d63031',
    marginBottom: 4,
  },
  validationNote: {
    fontSize: 12,
    color: '#d63031',
    fontStyle: 'italic',
  },
});

export default FormikAdvancedExample;
