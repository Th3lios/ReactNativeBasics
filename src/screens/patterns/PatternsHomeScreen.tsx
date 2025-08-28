import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';

type PatternsHomeScreenProps = {
  navigation: StackNavigationProp<any>;
};

const PatternsHomeScreen: React.FC<PatternsHomeScreenProps> = ({ navigation }) => {
  const patterns = [
    {
      id: 'component-patterns',
      title: 'Patrones de Componentes',
      description: 'Props functions, children patterns, compound components',
      icon: '🧩',
      color: '#4CAF50',
      features: [
        'Render props pattern',
        'Children as functions',
        'Compound components',
        'Controlled components'
      ],
      route: 'ComponentPatternsExample'
    },
    {
      id: 'hoc-patterns',
      title: 'Higher-Order Components',
      description: 'HOCs para reutilización de lógica entre componentes',
      icon: '🔗',
      color: '#2196F3',
      features: [
        'Enhance components',
        'Cross-cutting concerns',
        'Reusable logic',
        'Props manipulation'
      ],
      route: 'HOCPatternsExample'
    },
    {
      id: 'state-patterns',
      title: 'Patrones de Estado',
      description: 'State lifting, prop drilling, context patterns',
      icon: '🔄',
      color: '#FF9800',
      features: [
        'Lift state up',
        'Prop drilling solutions',
        'Context optimization',
        'State colocation'
      ],
      route: 'StatePatternsExample'
    },
    {
      id: 'performance-patterns',
      title: 'Patrones de Performance',
      description: 'Optimización, memorización y renders eficientes',
      icon: '⚡',
      color: '#9C27B0',
      features: [
        'React.memo usage',
        'useMemo & useCallback',
        'Lazy loading',
        'Virtual lists'
      ],
      route: 'PerformancePatternsExample'
    },
    {
      id: 'hook-patterns',
      title: 'Patrones de Hooks',
      description: 'Custom hooks y composición de lógica',
      icon: '🪝',
      color: '#F44336',
      features: [
        'Custom hooks design',
        'Logic composition',
        'State sharing',
        'Side effects'
      ],
      route: 'HookPatternsExample'
    },
    {
      id: 'rn-specific-patterns',
      title: 'Patrones React Native',
      description: 'Platform-specific, navigation y mobile patterns',
      icon: '📱',
      color: '#607D8B',
      features: [
        'Platform detection',
        'Responsive design',
        'Navigation patterns',
        'Gesture handling'
      ],
      route: 'RNSpecificPatternsExample'
    }
  ];

  const categories = [
    {
      title: 'Composition Patterns',
      description: 'Cómo componer componentes de manera efectiva',
      patterns: ['Render Props', 'Children Functions', 'Compound Components'],
      color: '#4CAF50'
    },
    {
      title: 'Logic Reuse Patterns',
      description: 'Reutilización de lógica entre componentes',
      patterns: ['HOCs', 'Custom Hooks', 'Context Providers'],
      color: '#2196F3'
    },
    {
      title: 'Performance Patterns',
      description: 'Optimización y rendimiento en React Native',
      patterns: ['Memoization', 'Lazy Loading', 'Virtual Lists'],
      color: '#9C27B0'
    },
    {
      title: 'Mobile-Specific Patterns',
      description: 'Patrones específicos para desarrollo móvil',
      patterns: ['Platform Detection', 'Responsive Design', 'Gesture Handling'],
      color: '#FF9800'
    }
  ];

  const principles = [
    {
      title: 'Composition over Inheritance',
      description: 'Prefiere composición de componentes sobre herencia',
      example: 'function Button({ children, ...props }) { return <Pressable {...props}>{children}</Pressable>; }'
    },
    {
      title: 'Single Responsibility',
      description: 'Cada componente/hook debe tener una responsabilidad específica',
      example: 'const useApi = () => { /* solo maneja API calls */ }; const useAuth = () => { /* solo maneja auth */ };'
    },
    {
      title: 'Explicit Dependencies',
      description: 'Las dependencias deben ser explícitas y claras',
      example: 'useEffect(() => { fetchData(userId); }, [userId]); // userId es dependencia explícita'
    },
    {
      title: 'Fail Fast',
      description: 'Detecta errores lo antes posible con validaciones',
      example: 'if (!user) throw new Error("User is required"); // Falla rápido y claro'
    }
  ];

  const renderPatternCard = (pattern: typeof patterns[0]) => (
    <Pressable
      key={pattern.id}
      style={[styles.patternCard, { borderLeftColor: pattern.color }]}
      onPress={() => navigation.navigate(pattern.route)}
      android_ripple={{ color: '#e0e0e0' }}>
      
      <View style={styles.cardHeader}>
        <Text style={styles.patternIcon}>{pattern.icon}</Text>
        <View style={styles.patternInfo}>
          <Text style={styles.patternTitle}>{pattern.title}</Text>
          <Text style={styles.patternDescription}>{pattern.description}</Text>
        </View>
        <Text style={styles.arrow}>→</Text>
      </View>

      <View style={styles.featuresContainer}>
        {pattern.features.map((feature, index) => (
          <View key={index} style={styles.featureTag}>
            <Text style={[styles.featureTagText, { color: pattern.color }]}>
              {feature}
            </Text>
          </View>
        ))}
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Patrones Comunes</Text>
          <Text style={styles.subtitle}>
            Patrones de diseño, técnicas de performance y mejores prácticas para React Native
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>🎯 ¿Qué son los patrones?</Text>
          <Text style={styles.infoText}>
            Los patrones son soluciones probadas a problemas comunes en desarrollo:{'\n\n'}
            🧩 <Text style={styles.infoBold}>Component Patterns:</Text> Cómo estructurar y componer componentes{'\n'}
            🔗 <Text style={styles.infoBold}>Logic Reuse:</Text> Reutilizar lógica entre componentes{'\n'}
            ⚡ <Text style={styles.infoBold}>Performance:</Text> Optimizar renders y memoria{'\n'}
            📱 <Text style={styles.infoBold}>Mobile-Specific:</Text> Patrones únicos de React Native
          </Text>
        </View>

        <View style={styles.patternsContainer}>
          {patterns.map(renderPatternCard)}
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.categoriesTitle}>📂 Categorías de Patrones</Text>
          
          {categories.map((category, index) => (
            <View key={index} style={[styles.categoryCard, { borderLeftColor: category.color }]}>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
              <View style={styles.categoryPatterns}>
                {category.patterns.map((pattern, patternIndex) => (
                  <View key={patternIndex} style={[styles.categoryPatternTag, { backgroundColor: category.color }]}>
                    <Text style={styles.categoryPatternText}>{pattern}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.principlesSection}>
          <Text style={styles.principlesTitle}>💡 Principios Fundamentales</Text>
          
          {principles.map((principle, index) => (
            <View key={index} style={styles.principleCard}>
              <Text style={styles.principleTitle}>{principle.title}</Text>
              <Text style={styles.principleDescription}>{principle.description}</Text>
              <View style={styles.codeBlock}>
                <Text style={styles.codeText}>{principle.example}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.bestPracticesSection}>
          <Text style={styles.bestPracticesTitle}>⭐ Mejores Prácticas</Text>
          
          <View style={styles.practiceGrid}>
            <View style={styles.practiceCard}>
              <Text style={styles.practiceTitle}>🎨 Component Design</Text>
              <Text style={styles.practiceText}>
                • Props interface clara{'\n'}
                • Componentes pequeños y enfocados{'\n'}
                • Default props cuando sea apropiado{'\n'}
                • Consistent naming conventions
              </Text>
            </View>

            <View style={styles.practiceCard}>
              <Text style={styles.practiceTitle}>🔄 State Management</Text>
              <Text style={styles.practiceText}>
                • Estado lo más cerca posible de uso{'\n'}
                • Lift state up cuando sea necesario{'\n'}
                • Avoid unnecessary re-renders{'\n'}
                • Use context sparingly
              </Text>
            </View>

            <View style={styles.practiceCard}>
              <Text style={styles.practiceTitle}>⚡ Performance</Text>
              <Text style={styles.practiceText}>
                • Memo components cuando sea útil{'\n'}
                • Optimize heavy computations{'\n'}
                • Lazy load when possible{'\n'}
                • Profile before optimizing
              </Text>
            </View>

            <View style={styles.practiceCard}>
              <Text style={styles.practiceTitle}>🧪 Testing</Text>
              <Text style={styles.practiceText}>
                • Test behavior, not implementation{'\n'}
                • Mock external dependencies{'\n'}
                • Test custom hooks separately{'\n'}
                • Integration tests for flows
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.antiPatternsSection}>
          <Text style={styles.antiPatternsTitle}>❌ Anti-Patterns Comunes</Text>
          
          <View style={styles.antiPatternCard}>
            <Text style={styles.antiPatternTitle}>Props Drilling Excesivo</Text>
            <Text style={styles.antiPatternDescription}>
              Pasar props a través de muchos niveles sin usar context
            </Text>
          </View>

          <View style={styles.antiPatternCard}>
            <Text style={styles.antiPatternTitle}>Inline Functions en JSX</Text>
            <Text style={styles.antiPatternDescription}>
              Crear funciones nuevas en cada render causa re-renders innecesarios
            </Text>
          </View>

          <View style={styles.antiPatternCard}>
            <Text style={styles.antiPatternTitle}>Estado en Props</Text>
            <Text style={styles.antiPatternDescription}>
              Duplicar estado que ya existe en props del padre
            </Text>
          </View>

          <View style={styles.antiPatternCard}>
            <Text style={styles.antiPatternTitle}>useEffect Abuse</Text>
            <Text style={styles.antiPatternDescription}>
              Usar useEffect para todo cuando hay alternativas más simples
            </Text>
          </View>
        </View>

        <View style={styles.quickReferenceSection}>
          <Text style={styles.quickReferenceTitle}>🚀 Referencia Rápida</Text>
          
          <View style={styles.referenceGrid}>
            <View style={styles.referenceCard}>
              <Text style={styles.referenceTitle}>Cuando usar HOC</Text>
              <Text style={styles.referenceText}>
                • Cross-cutting concerns{'\n'}
                • Legacy code integration{'\n'}
                • Third-party library wrapping
              </Text>
            </View>

            <View style={styles.referenceCard}>
              <Text style={styles.referenceTitle}>Cuando usar Hooks</Text>
              <Text style={styles.referenceText}>
                • State logic reuse{'\n'}
                • Side effects management{'\n'}
                • Modern React preferred
              </Text>
            </View>

            <View style={styles.referenceCard}>
              <Text style={styles.referenceTitle}>Cuando usar Context</Text>
              <Text style={styles.referenceText}>
                • Global app state{'\n'}
                • Theme/language settings{'\n'}
                • Authentication state
              </Text>
            </View>

            <View style={styles.referenceCard}>
              <Text style={styles.referenceTitle}>Cuando memorizar</Text>
              <Text style={styles.referenceText}>
                • Expensive computations{'\n'}
                • Stable references needed{'\n'}
                • Proven performance issue
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🎯 Los patrones son herramientas - úsalos cuando resuelvan problemas reales
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
    backgroundColor: '#e8f4fd',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
  infoBold: {
    fontWeight: 'bold',
  },
  patternsContainer: {
    padding: 10,
  },
  patternCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    borderLeftWidth: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  patternIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  patternInfo: {
    flex: 1,
  },
  patternTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  patternDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  arrow: {
    fontSize: 24,
    color: '#999',
    fontWeight: 'bold',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureTag: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  featureTagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  categoriesSection: {
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
  categoriesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  categoryPatterns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  categoryPatternTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryPatternText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  principlesSection: {
    backgroundColor: '#e8f5e8',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  principlesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  principleCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  principleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  principleDescription: {
    fontSize: 12,
    color: '#388E3C',
    marginBottom: 8,
  },
  codeBlock: {
    backgroundColor: '#2d3748',
    padding: 8,
    borderRadius: 6,
  },
  codeText: {
    color: '#a0aec0',
    fontFamily: 'Courier',
    fontSize: 9,
    lineHeight: 12,
  },
  bestPracticesSection: {
    backgroundColor: '#fff3e0',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  bestPracticesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 16,
  },
  practiceGrid: {
    gap: 12,
  },
  practiceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 12,
    borderRadius: 8,
  },
  practiceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 6,
  },
  practiceText: {
    fontSize: 12,
    color: '#FF8F00',
    lineHeight: 16,
  },
  antiPatternsSection: {
    backgroundColor: '#ffebee',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  antiPatternsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C62828',
    marginBottom: 16,
  },
  antiPatternCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  antiPatternTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#C62828',
    marginBottom: 4,
  },
  antiPatternDescription: {
    fontSize: 12,
    color: '#D32F2F',
  },
  quickReferenceSection: {
    backgroundColor: '#f3e5f5',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0',
  },
  quickReferenceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 16,
  },
  referenceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  referenceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    minWidth: 140,
  },
  referenceTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 6,
  },
  referenceText: {
    fontSize: 10,
    color: '#8E24AA',
    lineHeight: 14,
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

export default PatternsHomeScreen;
