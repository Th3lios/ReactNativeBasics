import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ComparisonHomeScreen: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('overview');

  const topics = [
    {
      id: 'overview',
      title: 'Visión General',
      description: 'Comparación básica entre Vue 3 y React Native',
      icon: '🔍',
      color: '#4CAF50'
    },
    {
      id: 'syntax',
      title: 'Sintaxis y Conceptos',
      description: 'Templates vs JSX, Composition API vs Hooks',
      icon: '📝',
      color: '#2196F3'
    },
    {
      id: 'state-management',
      title: 'Gestión de Estado',
      description: 'Pinia/Vuex vs Redux/Zustand/Context',
      icon: '🗃️',
      color: '#FF9800'
    },
    {
      id: 'lifecycle',
      title: 'Lifecycle y Efectos',
      description: 'Lifecycle hooks vs useEffect',
      icon: '🔄',
      color: '#9C27B0'
    },
    {
      id: 'routing',
      title: 'Navegación',
      description: 'Vue Router vs React Navigation',
      icon: '🧭',
      color: '#F44336'
    },
    {
      id: 'migration',
      title: 'Guía de Migración',
      description: 'Pasos para migrar de Vue 3 a React Native',
      icon: '🚀',
      color: '#607D8B'
    }
  ];

  const comparisonData = {
    overview: {
      vue3: {
        title: 'Vue 3',
        description: 'Framework progresivo para aplicaciones web',
        features: [
          'Templates declarativas',
          'Composition API',
          'Reactividad automática',
          'SFCs (Single File Components)',
          'Vue Router integrado',
          'DevTools excelentes'
        ],
        pros: [
          'Curva de aprendizaje suave',
          'Templates fáciles de leer',
          'Reactividad automática',
          'Documentación excelente',
          'Ecosistema maduro'
        ],
        cons: [
          'Solo para web',
          'Menor adopción que React',
          'TypeScript es opcional'
        ]
      },
      reactNative: {
        title: 'React Native',
        description: 'Framework para aplicaciones móviles nativas',
        features: [
          'JSX para UI',
          'React Hooks',
          'Estado explícito',
          'Componentes funcionales',
          'React Navigation',
          'Flipper/DevTools'
        ],
        pros: [
          'Desarrollo móvil nativo',
          'Code sharing iOS/Android',
          'Performance nativa',
          'Ecosistema React gigante',
          'TypeScript first-class'
        ],
        cons: [
          'Curva de aprendizaje más alta',
          'JSX puede ser confuso al inicio',
          'Estado manual'
        ]
      }
    },
    syntax: {
      vue3Examples: [
        {
          title: 'Template Syntax',
          vue: `<!-- Vue 3 Template -->
<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="increment">
      Count: {{ count }}
    </button>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const title = ref('Mi App Vue')
const count = ref(0)
const items = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
])

const increment = () => {
  count.value++
}

const doubleCount = computed(() => count.value * 2)
</script>`,
          reactNative: `// React Native JSX
import React, { useState, useMemo } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';

const MyApp = () => {
  const [title] = useState('Mi App React Native');
  const [count, setCount] = useState(0);
  const [items] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ]);

  const increment = () => {
    setCount(prev => prev + 1);
  };

  const doubleCount = useMemo(() => count * 2, [count]);

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={increment}>
        <Text>Count: {count}</Text>
      </Pressable>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
      />
    </View>
  );
};`
        },
        {
          title: 'Composition API vs Hooks',
          vue: `// Vue 3 Composition API
import { ref, computed, watch, onMounted } from 'vue'

export default {
  setup() {
    const user = ref(null)
    const loading = ref(false)
    const error = ref(null)

    const isLoggedIn = computed(() => !!user.value)

    const fetchUser = async () => {
      loading.value = true
      try {
        const response = await api.getUser()
        user.value = response.data
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }

    watch(user, (newUser) => {
      if (newUser) {
        console.log('User loaded:', newUser)
      }
    })

    onMounted(() => {
      fetchUser()
    })

    return {
      user,
      loading,
      error,
      isLoggedIn,
      fetchUser
    }
  }
}`,
          reactNative: `// React Native Hooks
import React, { useState, useMemo, useEffect } from 'react';

const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isLoggedIn = useMemo(() => !!user, [user]);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await api.getUser();
      setUser(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      console.log('User loaded:', user);
    }
  }, [user]);

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    loading,
    error,
    isLoggedIn,
    fetchUser
  };
};

const MyComponent = () => {
  const { user, loading, error, isLoggedIn, fetchUser } = useUser();
  
  // Component JSX here...
};`
        }
      ]
    },
    stateManagement: {
      concepts: [
        {
          concept: 'Estado Local',
          vue: 'ref(), reactive()',
          reactNative: 'useState()',
          example: {
            vue: `const count = ref(0)
const user = reactive({ name: '', email: '' })`,
            rn: `const [count, setCount] = useState(0)
const [user, setUser] = useState({ name: '', email: '' })`
          }
        },
        {
          concept: 'Estado Computado',
          vue: 'computed()',
          reactNative: 'useMemo()',
          example: {
            vue: `const doubleCount = computed(() => count.value * 2)`,
            rn: `const doubleCount = useMemo(() => count * 2, [count])`
          }
        },
        {
          concept: 'Efectos/Watchers',
          vue: 'watch(), watchEffect()',
          reactNative: 'useEffect()',
          example: {
            vue: `watch(count, (newVal) => {
  console.log('Count changed:', newVal)
})`,
            rn: `useEffect(() => {
  console.log('Count changed:', count)
}, [count])`
          }
        },
        {
          concept: 'Estado Global',
          vue: 'Pinia Store',
          reactNative: 'Redux/Zustand/Context',
          example: {
            vue: `// store/user.js
export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const login = (userData) => { user.value = userData }
  return { user, login }
})`,
            rn: `// Zustand
const useUserStore = create((set) => ({
  user: null,
  login: (userData) => set({ user: userData })
}))`
          }
        }
      ]
    },
    lifecycle: {
      mappings: [
        {
          phase: 'Montaje',
          vue: 'onMounted()',
          reactNative: 'useEffect(() => {}, [])',
          description: 'Se ejecuta cuando el componente se monta'
        },
        {
          phase: 'Actualización',
          vue: 'onUpdated()',
          reactNative: 'useEffect(() => {})',
          description: 'Se ejecuta en cada actualización'
        },
        {
          phase: 'Desmontaje',
          vue: 'onUnmounted()',
          reactNative: 'useEffect(() => { return () => {} }, [])',
          description: 'Cleanup cuando el componente se desmonta'
        },
        {
          phase: 'Dependencias',
          vue: 'watch(dependency, callback)',
          reactNative: 'useEffect(() => {}, [dependency])',
          description: 'Se ejecuta cuando cambian las dependencias'
        }
      ]
    },
    routing: {
      features: [
        {
          feature: 'Navegación Básica',
          vue: 'router.push(\'/path\')',
          reactNative: 'navigation.navigate(\'ScreenName\')',
          description: 'Navegar a una nueva pantalla/ruta'
        },
        {
          feature: 'Parámetros',
          vue: 'route.params.id',
          reactNative: 'route.params.id',
          description: 'Acceder a parámetros de la ruta'
        },
        {
          feature: 'Query Params',
          vue: 'route.query.filter',
          reactNative: 'route.params.filter',
          description: 'Parámetros de consulta'
        },
        {
          feature: 'Navegación Programática',
          vue: 'router.push(), router.replace()',
          reactNative: 'navigation.navigate(), navigation.replace()',
          description: 'Navegar desde código'
        },
        {
          feature: 'Rutas Anidadas',
          vue: 'children: [...]',
          reactNative: 'Nested Navigators',
          description: 'Rutas dentro de rutas'
        }
      ]
    },
    migration: {
      steps: [
        {
          step: 1,
          title: 'Preparación Mental',
          description: 'Entender las diferencias conceptuales',
          tasks: [
            'Templates → JSX',
            'Reactividad automática → Estado manual',
            'SFCs → Componentes funcionales',
            'CSS → StyleSheet',
            'DOM → Componentes nativos'
          ]
        },
        {
          step: 2,
          title: 'Setup del Entorno',
          description: 'Configurar herramientas de desarrollo',
          tasks: [
            'Instalar Node.js y npm/yarn',
            'React Native CLI o Expo',
            'Android Studio / Xcode',
            'VS Code con extensiones RN',
            'Flipper para debugging'
          ]
        },
        {
          step: 3,
          title: 'Aprender React Hooks',
          description: 'Equivalentes de Composition API',
          tasks: [
            'useState → ref/reactive',
            'useEffect → watch/onMounted',
            'useMemo → computed',
            'useCallback → funciones estables',
            'Custom hooks → composables'
          ]
        },
        {
          step: 4,
          title: 'Dominar JSX',
          description: 'Sintaxis de templates en React',
          tasks: [
            'JSX expressions { }',
            'Conditional rendering',
            'List rendering con map()',
            'Event handlers',
            'Props passing'
          ]
        },
        {
          step: 5,
          title: 'Componentes RN',
          description: 'Elementos específicos de móvil',
          tasks: [
            'View → div',
            'Text → span/p',
            'ScrollView → contenedor scroll',
            'FlatList → listas optimizadas',
            'Pressable → button'
          ]
        },
        {
          step: 6,
          title: 'Navegación',
          description: 'React Navigation vs Vue Router',
          tasks: [
            'Stack Navigator',
            'Tab Navigator',
            'Drawer Navigator',
            'Params passing',
            'Deep linking'
          ]
        }
      ]
    }
  };

  const renderTopicSelector = () => (
    <View style={styles.topicSelector}>
      {topics.map((topic) => (
        <Pressable
          key={topic.id}
          style={[
            styles.topicButton,
            { borderColor: topic.color },
            selectedTopic === topic.id && { backgroundColor: topic.color }
          ]}
          onPress={() => setSelectedTopic(topic.id)}
        >
          <Text style={styles.topicIcon}>{topic.icon}</Text>
          <Text style={[
            styles.topicTitle,
            selectedTopic === topic.id && styles.selectedTopicText
          ]}>
            {topic.title}
          </Text>
          <Text style={[
            styles.topicDescription,
            selectedTopic === topic.id && styles.selectedTopicText
          ]}>
            {topic.description}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  const renderOverview = () => {
    const { vue3, reactNative } = comparisonData.overview;

    return (
      <View style={styles.comparisonContainer}>
        <Text style={styles.sectionTitle}>Comparación General</Text>
        
        <View style={styles.frameworkComparison}>
          {/* Vue 3 */}
          <View style={styles.frameworkCard}>
            <Text style={[styles.frameworkTitle, { color: '#4FC08D' }]}>
              🍃 {vue3.title}
            </Text>
            <Text style={styles.frameworkDescription}>{vue3.description}</Text>
            
            <Text style={styles.featureTitle}>Características:</Text>
            {vue3.features.map((feature, index) => (
              <Text key={index} style={styles.featureItem}>• {feature}</Text>
            ))}
            
            <Text style={styles.prosTitle}>✅ Ventajas:</Text>
            {vue3.pros.map((pro, index) => (
              <Text key={index} style={styles.prosItem}>• {pro}</Text>
            ))}
            
            <Text style={styles.consTitle}>❌ Desventajas:</Text>
            {vue3.cons.map((con, index) => (
              <Text key={index} style={styles.consItem}>• {con}</Text>
            ))}
          </View>

          {/* React Native */}
          <View style={styles.frameworkCard}>
            <Text style={[styles.frameworkTitle, { color: '#61DAFB' }]}>
              ⚛️ {reactNative.title}
            </Text>
            <Text style={styles.frameworkDescription}>{reactNative.description}</Text>
            
            <Text style={styles.featureTitle}>Características:</Text>
            {reactNative.features.map((feature, index) => (
              <Text key={index} style={styles.featureItem}>• {feature}</Text>
            ))}
            
            <Text style={styles.prosTitle}>✅ Ventajas:</Text>
            {reactNative.pros.map((pro, index) => (
              <Text key={index} style={styles.prosItem}>• {pro}</Text>
            ))}
            
            <Text style={styles.consTitle}>❌ Desventajas:</Text>
            {reactNative.cons.map((con, index) => (
              <Text key={index} style={styles.consItem}>• {con}</Text>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const renderSyntax = () => {
    return (
      <View style={styles.syntaxContainer}>
        <Text style={styles.sectionTitle}>Sintaxis y Conceptos</Text>
        
        {comparisonData.syntax.vue3Examples.map((example, index) => (
          <View key={index} style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>{example.title}</Text>
            
            <View style={styles.codeComparison}>
              <View style={styles.codeBlock}>
                <Text style={styles.codeHeader}>🍃 Vue 3</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <Text style={styles.codeText}>{example.vue}</Text>
                </ScrollView>
              </View>
              
              <View style={styles.codeBlock}>
                <Text style={styles.codeHeader}>⚛️ React Native</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <Text style={styles.codeText}>{example.reactNative}</Text>
                </ScrollView>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderStateManagement = () => {
    return (
      <View style={styles.stateContainer}>
        <Text style={styles.sectionTitle}>Gestión de Estado</Text>
        
        {comparisonData.stateManagement.concepts.map((concept, index) => (
          <View key={index} style={styles.conceptCard}>
            <Text style={styles.conceptTitle}>{concept.concept}</Text>
            
            <View style={styles.conceptComparison}>
              <View style={styles.conceptColumn}>
                <Text style={styles.conceptHeader}>🍃 Vue 3</Text>
                <Text style={styles.conceptMethod}>{concept.vue}</Text>
                <View style={styles.codeExample}>
                  <Text style={styles.exampleCode}>{concept.example.vue}</Text>
                </View>
              </View>
              
              <View style={styles.conceptColumn}>
                <Text style={styles.conceptHeader}>⚛️ React Native</Text>
                <Text style={styles.conceptMethod}>{concept.reactNative}</Text>
                <View style={styles.codeExample}>
                  <Text style={styles.exampleCode}>{concept.example.rn}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderLifecycle = () => {
    return (
      <View style={styles.lifecycleContainer}>
        <Text style={styles.sectionTitle}>Lifecycle y Efectos</Text>
        
        <View style={styles.lifecycleTable}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Fase</Text>
            <Text style={styles.tableHeaderText}>🍃 Vue 3</Text>
            <Text style={styles.tableHeaderText}>⚛️ React Native</Text>
          </View>
          
          {comparisonData.lifecycle.mappings.map((mapping, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellTitle}>{mapping.phase}</Text>
                <Text style={styles.tableCellDesc}>{mapping.description}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellCode}>{mapping.vue}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellCode}>{mapping.reactNative}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderRouting = () => {
    return (
      <View style={styles.routingContainer}>
        <Text style={styles.sectionTitle}>Navegación</Text>
        
        {comparisonData.routing.features.map((feature, index) => (
          <View key={index} style={styles.routingCard}>
            <Text style={styles.routingFeature}>{feature.feature}</Text>
            <Text style={styles.routingDescription}>{feature.description}</Text>
            
            <View style={styles.routingComparison}>
              <View style={styles.routingColumn}>
                <Text style={styles.routingHeader}>🍃 Vue Router</Text>
                <Text style={styles.routingCode}>{feature.vue}</Text>
              </View>
              
              <View style={styles.routingColumn}>
                <Text style={styles.routingHeader}>⚛️ React Navigation</Text>
                <Text style={styles.routingCode}>{feature.reactNative}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderMigration = () => {
    return (
      <View style={styles.migrationContainer}>
        <Text style={styles.sectionTitle}>Guía de Migración</Text>
        <Text style={styles.migrationSubtitle}>
          Pasos para desarrolladores Vue 3 que quieren aprender React Native
        </Text>
        
        {comparisonData.migration.steps.map((step, index) => (
          <View key={index} style={styles.migrationStep}>
            <View style={styles.stepHeader}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{step.step}</Text>
              </View>
              <View style={styles.stepInfo}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
            </View>
            
            <View style={styles.stepTasks}>
              {step.tasks.map((task, taskIndex) => (
                <View key={taskIndex} style={styles.taskItem}>
                  <Text style={styles.taskBullet}>📌</Text>
                  <Text style={styles.taskText}>{task}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderContent = () => {
    switch (selectedTopic) {
      case 'overview':
        return renderOverview();
      case 'syntax':
        return renderSyntax();
      case 'state-management':
        return renderStateManagement();
      case 'lifecycle':
        return renderLifecycle();
      case 'routing':
        return renderRouting();
      case 'migration':
        return renderMigration();
      default:
        return renderOverview();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Vue 3 vs React Native</Text>
          <Text style={styles.subtitle}>
            Guía de transición para desarrolladores Vue 3
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>🚀 Transición Amigable</Text>
          <Text style={styles.infoText}>
            Si ya conoces Vue 3, tienes una gran base para aprender React Native. Los conceptos son similares, solo cambia la sintaxis y algunos patrones. Esta guía te ayudará a hacer la transición de manera suave.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Temas de Comparación</Text>
          {renderTopicSelector()}
        </View>

        <View style={styles.section}>
          {renderContent()}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🍃 ➡️ ⚛️ La transición de Vue 3 a React Native es más fácil de lo que piensas
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
  infoSection: {
    backgroundColor: '#e8f5e8',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#2E7D32',
    lineHeight: 20,
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
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  topicSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  topicButton: {
    flex: 1,
    minWidth: 150,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  topicIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  topicTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  topicDescription: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  selectedTopicText: {
    color: '#fff',
  },
  // Overview Styles
  comparisonContainer: {
    gap: 16,
  },
  frameworkComparison: {
    flexDirection: 'row',
    gap: 12,
  },
  frameworkCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
  },
  frameworkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  frameworkDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  featureItem: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  prosTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 8,
    marginBottom: 6,
  },
  prosItem: {
    fontSize: 12,
    color: '#4CAF50',
    marginBottom: 2,
  },
  consTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F44336',
    marginTop: 8,
    marginBottom: 6,
  },
  consItem: {
    fontSize: 12,
    color: '#F44336',
    marginBottom: 2,
  },
  // Syntax Styles
  syntaxContainer: {
    gap: 20,
  },
  exampleContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  codeComparison: {
    gap: 12,
  },
  codeBlock: {
    backgroundColor: '#2d3748',
    borderRadius: 6,
    overflow: 'hidden',
  },
  codeHeader: {
    backgroundColor: '#4a5568',
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    padding: 8,
  },
  codeText: {
    color: '#a0aec0',
    fontFamily: 'Courier',
    fontSize: 10,
    padding: 12,
    lineHeight: 14,
  },
  // State Management Styles
  stateContainer: {
    gap: 16,
  },
  conceptCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
  },
  conceptTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  conceptComparison: {
    flexDirection: 'row',
    gap: 12,
  },
  conceptColumn: {
    flex: 1,
  },
  conceptHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  conceptMethod: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  codeExample: {
    backgroundColor: '#2d3748',
    padding: 8,
    borderRadius: 4,
  },
  exampleCode: {
    color: '#a0aec0',
    fontFamily: 'Courier',
    fontSize: 9,
    lineHeight: 12,
  },
  // Lifecycle Styles
  lifecycleContainer: {
    gap: 16,
  },
  lifecycleTable: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
  },
  tableHeaderText: {
    flex: 1,
    padding: 12,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableCell: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  tableCellTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  tableCellDesc: {
    fontSize: 10,
    color: '#666',
  },
  tableCellCode: {
    fontSize: 10,
    fontFamily: 'Courier',
    color: '#2196F3',
    textAlign: 'center',
  },
  // Routing Styles
  routingContainer: {
    gap: 16,
  },
  routingCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
  },
  routingFeature: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  routingDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  routingComparison: {
    flexDirection: 'row',
    gap: 12,
  },
  routingColumn: {
    flex: 1,
  },
  routingHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  routingCode: {
    fontSize: 11,
    fontFamily: 'Courier',
    color: '#2196F3',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
  },
  // Migration Styles
  migrationContainer: {
    gap: 16,
  },
  migrationSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  migrationStep: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
  },
  stepTasks: {
    gap: 6,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  taskBullet: {
    fontSize: 12,
    marginRight: 8,
    marginTop: 2,
  },
  taskText: {
    fontSize: 12,
    color: '#333',
    flex: 1,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ComparisonHomeScreen;
