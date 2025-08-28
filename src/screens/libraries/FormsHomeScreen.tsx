import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FormsHomeScreen = ({ navigation }: any) => {
  const formExamples = [
    {
      id: 'formik-basic',
      title: 'Formik Básico',
      description: 'Formulario simple con Formik y validación',
      icon: '📝',
      screen: 'FormikBasicExample',
      complexity: 'Básico',
    },
    {
      id: 'formik-yup',
      title: 'Formik + Yup',
      description: 'Validación avanzada con esquemas Yup',
      icon: '✅',
      screen: 'FormikYupExample',
      complexity: 'Intermedio',
    },
    {
      id: 'formik-advanced',
      title: 'Formulario Avanzado',
      description: 'Arrays, objetos anidados y validación compleja',
      icon: '🚀',
      screen: 'FormikAdvancedExample',
      complexity: 'Avanzado',
    }
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Básico': return '#4caf50';
      case 'Intermedio': return '#ff9800';
      case 'Avanzado': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Formik + Yup</Text>
          <Text style={styles.subtitle}>
            Formularios robustos con validación avanzada
          </Text>
          <Text style={styles.description}>
            Formik simplifica el manejo de formularios en React Native, 
            mientras que Yup proporciona validación declarativa y poderosa.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📦 Instalación</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              {`npm install formik yup
# o
yarn add formik yup`}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ ¿Por qué Formik + Yup?</Text>
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>🎯</Text>
              <Text style={styles.benefitText}>Manejo de estado simplificado</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>✅</Text>
              <Text style={styles.benefitText}>Validación declarativa y reutilizable</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>🔄</Text>
              <Text style={styles.benefitText}>Submit y reset automáticos</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>🚀</Text>
              <Text style={styles.benefitText}>Mejor performance y UX</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛠️ Ejemplo Básico</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              {`import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('Email es requerido'),
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .required('Password es requerido'),
});

export default function LoginForm() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View>
          <TextInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder="Email"
          />
          {errors.email && <Text>{errors.email}</Text>}
          
          <TextInput
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            placeholder="Password"
            secureTextEntry
          />
          {errors.password && <Text>{errors.password}</Text>}
          
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
}`}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Ejemplos Disponibles</Text>
          {formExamples.map((example) => (
            <Pressable
              key={example.id}
              style={styles.exampleCard}
              onPress={() => navigation.navigate(example.screen)}>
              
              <View style={styles.cardHeader}>
                <Text style={styles.exampleIcon}>{example.icon}</Text>
                <View style={styles.exampleInfo}>
                  <Text style={styles.exampleTitle}>{example.title}</Text>
                  <Text style={styles.exampleDescription}>{example.description}</Text>
                  <View style={[
                    styles.complexityBadge,
                    { backgroundColor: getComplexityColor(example.complexity) }
                  ]}>
                    <Text style={styles.complexityText}>{example.complexity}</Text>
                  </View>
                </View>
              </View>
              
              <Text style={styles.arrow}>→</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔧 Validaciones Yup Comunes</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              {`const schema = Yup.object().shape({
  // String validations
  name: Yup.string()
    .min(2, 'Muy corto')
    .max(50, 'Muy largo')
    .required('Requerido'),
    
  // Email
  email: Yup.string()
    .email('Email inválido')
    .required('Requerido'),
    
  // Number
  age: Yup.number()
    .positive('Debe ser positivo')
    .integer('Debe ser entero')
    .max(120, 'Muy alto'),
    
  // Boolean
  terms: Yup.boolean()
    .oneOf([true], 'Debes aceptar los términos'),
    
  // Array
  skills: Yup.array()
    .min(1, 'Selecciona al menos una habilidad'),
    
  // Conditional
  password: Yup.string()
    .when('hasPassword', {
      is: true,
      then: Yup.string().required('Password requerido'),
      otherwise: Yup.string()
    }),
    
  // Custom validation
  username: Yup.string()
    .test('unique', 'Username ya existe', async (value) => {
      return await checkUsernameAvailability(value);
    })
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
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
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
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  benefitIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  benefitText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  exampleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  exampleIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  exampleInfo: {
    flex: 1,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  exampleDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  complexityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  complexityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  arrow: {
    fontSize: 20,
    color: '#007AFF',
    marginLeft: 12,
  },
});

export default FormsHomeScreen;
