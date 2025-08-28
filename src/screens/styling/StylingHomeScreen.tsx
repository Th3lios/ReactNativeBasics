import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface StylingCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
  topics: string[];
}

const StylingHomeScreen = ({ navigation }: any) => {
  const stylingCategories: StylingCategory[] = [
    {
      id: 'basic-styles',
      title: 'Estilos Básicos',
      description: 'StyleSheet, estilos inline, composición y herencia de estilos',
      icon: '🎨',
      route: 'BasicStylesExample',
      color: '#4CAF50',
      difficulty: 'Básico',
      topics: ['StyleSheet.create()', 'Estilos inline', 'Composición de estilos', 'Herencia CSS']
    },
    {
      id: 'layout-styles',
      title: 'Layout y Posicionamiento',
      description: 'Flexbox, posicionamiento absoluto, dimensiones y espaciado',
      icon: '📐',
      route: 'LayoutStylesExample',
      color: '#2196F3',
      difficulty: 'Intermedio',
      topics: ['Flexbox', 'Position', 'Dimensions', 'Margin & Padding']
    },
    {
      id: 'responsive-styles',
      title: 'Diseño Responsivo',
      description: 'Dimensiones de pantalla, breakpoints y layouts adaptativos',
      icon: '📱',
      route: 'ResponsiveStylesExample',
      color: '#FF9800',
      difficulty: 'Intermedio',
      topics: ['Screen Dimensions', 'Breakpoints', 'Adaptive Layouts', 'Orientation']
    },
    {
      id: 'theming-styles',
      title: 'Temas y Contextos',
      description: 'Dark/Light mode, sistema de temas y Context API para estilos',
      icon: '🌙',
      route: 'ThemingStylesExample',
      color: '#9C27B0',
      difficulty: 'Avanzado',
      topics: ['Dark/Light Theme', 'Theme Context', 'Dynamic Styling', 'Theme Provider']
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Básico': return '#4CAF50';
      case 'Intermedio': return '#FF9800';
      case 'Avanzado': return '#F44336';
      default: return '#666';
    }
  };

  const handleCategoryPress = (category: StylingCategory) => {
    if (category.route === 'PlatformStylesExample') {
      Alert.alert(
        'Próximamente',
        'Esta sección estará disponible pronto',
        [{ text: 'OK' }]
      );
      return;
    }
    navigation.navigate(category.route);
  };

  const renderCategoryCard = (category: StylingCategory) => (
    <Pressable
      key={category.id}
      style={[styles.categoryCard, { borderLeftColor: category.color }]}
      onPress={() => handleCategoryPress(category)}
      android_ripple={{ color: category.color + '20' }}
    >
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <Text style={styles.categoryIcon}>{category.icon}</Text>
          <View style={styles.titleContent}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(category.difficulty) }]}>
              <Text style={styles.difficultyText}>{category.difficulty}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.categoryArrow}>→</Text>
      </View>
      
      <Text style={styles.categoryDescription}>{category.description}</Text>
      
      <View style={styles.topicsContainer}>
        <Text style={styles.topicsLabel}>Temas incluidos:</Text>
        <View style={styles.topicsList}>
          {category.topics.map((topic, index) => (
            <View key={index} style={[styles.topicTag, { backgroundColor: category.color + '15' }]}>
              <Text style={[styles.topicText, { color: category.color }]}>{topic}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>🎨 Estilos en React Native</Text>
          <Text style={styles.subtitle}>
            Aprende a crear interfaces atractivas y responsivas con diferentes técnicas de styling
          </Text>
        </View>

        <View style={styles.introSection}>
          <Text style={styles.introTitle}>¿Por qué importa el Styling?</Text>
          <View style={styles.introContent}>
            <Text style={styles.introText}>
              • <Text style={styles.bold}>Experiencia de Usuario:</Text> Los estilos determinan cómo se ve y se siente tu app
            </Text>
            <Text style={styles.introText}>
              • <Text style={styles.bold}>Consistencia:</Text> Un sistema de estilos mantiene coherencia visual
            </Text>
            <Text style={styles.introText}>
              • <Text style={styles.bold}>Responsividad:</Text> Adaptación a diferentes tamaños de pantalla
            </Text>
            <Text style={styles.introText}>
              • <Text style={styles.bold}>Performance:</Text> Estilos optimizados mejoran el rendimiento
            </Text>
            <Text style={styles.introText}>
              • <Text style={styles.bold}>Mantenibilidad:</Text> Código organizado facilita actualizaciones
            </Text>
          </View>
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>📚 Categorías de Styling</Text>
          <View style={styles.categoriesGrid}>
            {stylingCategories.map(renderCategoryCard)}
          </View>
        </View>

        <View style={styles.frameworksSection}>
          <Text style={styles.sectionTitle}>🛠️ Frameworks de Estilos</Text>
          <Text style={styles.frameworksSubtitle}>
            Librerías populares que facilitan el desarrollo de interfaces en React Native
          </Text>
          
          <View style={styles.frameworksList}>
            <View style={styles.frameworkCard}>
              <View style={styles.frameworkHeader}>
                <Text style={styles.frameworkIcon}>🎨</Text>
                <View style={styles.frameworkInfo}>
                  <Text style={styles.frameworkName}>NativeBase</Text>
                  <Text style={styles.frameworkType}>Component Library</Text>
                </View>
                <View style={[styles.popularityBadge, { backgroundColor: '#4CAF50' }]}>
                  <Text style={styles.popularityText}>Popular</Text>
                </View>
              </View>
              <Text style={styles.frameworkDescription}>
                Biblioteca de componentes con temas personalizables y soporte para dark mode nativo.
              </Text>
              <View style={styles.frameworkFeatures}>
                <Text style={styles.frameworkFeature}>• +60 componentes listos</Text>
                <Text style={styles.frameworkFeature}>• Sistema de temas avanzado</Text>
                <Text style={styles.frameworkFeature}>• TypeScript support</Text>
                <Text style={styles.frameworkFeature}>• Accesibilidad integrada</Text>
              </View>
            </View>

            <View style={styles.frameworkCard}>
              <View style={styles.frameworkHeader}>
                <Text style={styles.frameworkIcon}>🧩</Text>
                <View style={styles.frameworkInfo}>
                  <Text style={styles.frameworkName}>Tamagui</Text>
                  <Text style={styles.frameworkType}>Universal UI System</Text>
                </View>
                <View style={[styles.popularityBadge, { backgroundColor: '#FF9800' }]}>
                  <Text style={styles.popularityText}>Trending</Text>
                </View>
              </View>
              <Text style={styles.frameworkDescription}>
                Sistema de UI universal con optimizaciones de performance y compatibilidad web.
              </Text>
              <View style={styles.frameworkFeatures}>
                <Text style={styles.frameworkFeature}>• Optimización automática</Text>
                <Text style={styles.frameworkFeature}>• Web + Native compatible</Text>
                <Text style={styles.frameworkFeature}>• Animations integradas</Text>
                <Text style={styles.frameworkFeature}>• Tree-shaking optimizado</Text>
              </View>
            </View>

            <View style={styles.frameworkCard}>
              <View style={styles.frameworkHeader}>
                <Text style={styles.frameworkIcon}>🎯</Text>
                <View style={styles.frameworkInfo}>
                  <Text style={styles.frameworkName}>styled-components</Text>
                  <Text style={styles.frameworkType}>CSS-in-JS</Text>
                </View>
                <View style={[styles.popularityBadge, { backgroundColor: '#2196F3' }]}>
                  <Text style={styles.popularityText}>Estable</Text>
                </View>
              </View>
              <Text style={styles.frameworkDescription}>
                Estilos dinámicos con sintaxis CSS familiar y soporte para props y temas.
              </Text>
              <View style={styles.frameworkFeatures}>
                <Text style={styles.frameworkFeature}>• Sintaxis CSS tradicional</Text>
                <Text style={styles.frameworkFeature}>• Props-based styling</Text>
                <Text style={styles.frameworkFeature}>• ThemeProvider incluido</Text>
                <Text style={styles.frameworkFeature}>• Server-side rendering</Text>
              </View>
            </View>

            <View style={styles.frameworkCard}>
              <View style={styles.frameworkHeader}>
                <Text style={styles.frameworkIcon}>⚡</Text>
                <View style={styles.frameworkInfo}>
                  <Text style={styles.frameworkName}>Restyle</Text>
                  <Text style={styles.frameworkType}>Theme-based Styling</Text>
                </View>
                <View style={[styles.popularityBadge, { backgroundColor: '#9C27B0' }]}>
                  <Text style={styles.popularityText}>Shopify</Text>
                </View>
              </View>
              <Text style={styles.frameworkDescription}>
                Sistema de estilos basado en temas de Shopify, optimizado para consistency y performance.
              </Text>
              <View style={styles.frameworkFeatures}>
                <Text style={styles.frameworkFeature}>• TypeScript first</Text>
                <Text style={styles.frameworkFeature}>• Design system friendly</Text>
                <Text style={styles.frameworkFeature}>• Responsive breakpoints</Text>
                <Text style={styles.frameworkFeature}>• Variant-based API</Text>
              </View>
            </View>

            <View style={styles.frameworkCard}>
              <View style={styles.frameworkHeader}>
                <Text style={styles.frameworkIcon}>🎨</Text>
                <View style={styles.frameworkInfo}>
                  <Text style={styles.frameworkName}>React Native Elements</Text>
                  <Text style={styles.frameworkType}>UI Toolkit</Text>
                </View>
                <View style={[styles.popularityBadge, { backgroundColor: '#607D8B' }]}>
                  <Text style={styles.popularityText}>Maduro</Text>
                </View>
              </View>
              <Text style={styles.frameworkDescription}>
                Toolkit de UI establecido con componentes bien documentados y amplia comunidad.
              </Text>
              <View style={styles.frameworkFeatures}>
                <Text style={styles.frameworkFeature}>• Componentes cross-platform</Text>
                <Text style={styles.frameworkFeature}>• Customización sencilla</Text>
                <Text style={styles.frameworkFeature}>• Comunidad grande</Text>
                <Text style={styles.frameworkFeature}>• Vector icons incluidos</Text>
              </View>
            </View>

            <View style={styles.frameworkCard}>
              <View style={styles.frameworkHeader}>
                <Text style={styles.frameworkIcon}>💨</Text>
                <View style={styles.frameworkInfo}>
                  <Text style={styles.frameworkName}>NativeWind</Text>
                  <Text style={styles.frameworkType}>Tailwind for RN</Text>
                </View>
                <View style={[styles.popularityBadge, { backgroundColor: '#00BCD4' }]}>
                  <Text style={styles.popularityText}>Nuevo</Text>
                </View>
              </View>
              <Text style={styles.frameworkDescription}>
                Implementación de Tailwind CSS para React Native con utilidades y responsive design.
              </Text>
              <View style={styles.frameworkFeatures}>
                <Text style={styles.frameworkFeature}>• Utility-first approach</Text>
                <Text style={styles.frameworkFeature}>• Tailwind CSS syntax</Text>
                <Text style={styles.frameworkFeature}>• JIT compilation</Text>
                <Text style={styles.frameworkFeature}>• CSS variables support</Text>
              </View>
            </View>
          </View>

          <View style={styles.frameworksComparison}>
            <Text style={styles.comparisonTitle}>📊 Comparación Rápida</Text>
            <View style={styles.comparisonTable}>
              <View style={styles.comparisonRow}>
                <Text style={styles.comparisonCategory}>Setup Complexity</Text>
                <Text style={styles.comparisonValue}>NativeBase: Fácil | Tamagui: Medio | styled-components: Fácil</Text>
              </View>
              <View style={styles.comparisonRow}>
                <Text style={styles.comparisonCategory}>Performance</Text>
                <Text style={styles.comparisonValue}>Tamagui: Excelente | Restyle: Muy bueno | Otros: Bueno</Text>
              </View>
              <View style={styles.comparisonRow}>
                <Text style={styles.comparisonCategory}>Learning Curve</Text>
                <Text style={styles.comparisonValue}>Elements: Baja | NativeBase: Media | Tamagui: Alta</Text>
              </View>
              <View style={styles.comparisonRow}>
                <Text style={styles.comparisonCategory}>Community</Text>
                <Text style={styles.comparisonValue}>Elements: Grande | NativeBase: Grande | styled-components: Muy grande</Text>
              </View>
            </View>
          </View>

          <View style={styles.frameworksTips}>
            <Text style={styles.tipsTitle}>💡 Consejos para Elegir</Text>
            <View style={styles.tipsList}>
              <Text style={styles.tipItem}>
                🚀 <Text style={styles.tipBold}>Para comenzar rápido:</Text> NativeBase o React Native Elements
              </Text>
              <Text style={styles.tipItem}>
                ⚡ <Text style={styles.tipBold}>Para máxima performance:</Text> Tamagui o Restyle
              </Text>
              <Text style={styles.tipItem}>
                🎨 <Text style={styles.tipBold}>Para máxima customización:</Text> styled-components
              </Text>
              <Text style={styles.tipItem}>
                🌐 <Text style={styles.tipBold}>Para compatibilidad web:</Text> Tamagui o NativeWind
              </Text>
              <Text style={styles.tipItem}>
                📱 <Text style={styles.tipBold}>Para design systems:</Text> Restyle o Tamagui
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bestPracticesSection}>
          <Text style={styles.sectionTitle}>✅ Mejores Prácticas</Text>
          <View style={styles.practicesList}>
            <View style={styles.practiceItem}>
              <Text style={styles.practiceIcon}>🎯</Text>
              <View style={styles.practiceContent}>
                <Text style={styles.practiceTitle}>Usa StyleSheet.create()</Text>
                <Text style={styles.practiceDescription}>
                  Mejor performance que estilos inline y detección de errores
                </Text>
              </View>
            </View>
            
            <View style={styles.practiceItem}>
              <Text style={styles.practiceIcon}>🧩</Text>
              <View style={styles.practiceContent}>
                <Text style={styles.practiceTitle}>Composición de Estilos</Text>
                <Text style={styles.practiceDescription}>
                  Reutiliza estilos combinando arrays: [styles.base, styles.variant]
                </Text>
              </View>
            </View>
            
            <View style={styles.practiceItem}>
              <Text style={styles.practiceIcon}>📐</Text>
              <View style={styles.practiceContent}>
                <Text style={styles.practiceTitle}>Flexbox como Base</Text>
                <Text style={styles.practiceDescription}>
                  Aprovecha que Flexbox es el layout por defecto en React Native
                </Text>
              </View>
            </View>
            
            <View style={styles.practiceItem}>
              <Text style={styles.practiceIcon}>🌙</Text>
              <View style={styles.practiceContent}>
                <Text style={styles.practiceTitle}>Sistema de Temas</Text>
                <Text style={styles.practiceDescription}>
                  Implementa dark/light mode y colores consistentes
                </Text>
              </View>
            </View>
            
            <View style={styles.practiceItem}>
              <Text style={styles.practiceIcon}>📱</Text>
              <View style={styles.practiceContent}>
                <Text style={styles.practiceTitle}>Diseño Responsivo</Text>
                <Text style={styles.practiceDescription}>
                  Usa porcentajes, flex y Dimensions para adaptabilidad
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.quickGuideSection}>
          <Text style={styles.sectionTitle}>⚡ Guía Rápida</Text>
          <View style={styles.quickGuideGrid}>
            <View style={styles.quickGuideItem}>
              <Text style={styles.quickGuideTitle}>Colores</Text>
              <Text style={styles.quickGuideCode}>color: '#FF6B6B'</Text>
              <Text style={styles.quickGuideCode}>backgroundColor: 'rgba(0,0,0,0.5)'</Text>
            </View>
            
            <View style={styles.quickGuideItem}>
              <Text style={styles.quickGuideTitle}>Dimensiones</Text>
              <Text style={styles.quickGuideCode}>width: '100%'</Text>
              <Text style={styles.quickGuideCode}>height: 50</Text>
            </View>
            
            <View style={styles.quickGuideItem}>
              <Text style={styles.quickGuideTitle}>Flexbox</Text>
              <Text style={styles.quickGuideCode}>flex: 1</Text>
              <Text style={styles.quickGuideCode}>justifyContent: 'center'</Text>
            </View>
            
            <View style={styles.quickGuideItem}>
              <Text style={styles.quickGuideTitle}>Spacing</Text>
              <Text style={styles.quickGuideCode}>margin: 10</Text>
              <Text style={styles.quickGuideCode}>padding: 15</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🎨 Explora cada categoría para dominar el styling en React Native
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
  },
  introSection: {
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
  introTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  introContent: {
    gap: 8,
  },
  introText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  },
  categoriesSection: {
    margin: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    paddingHorizontal: 6,
  },
  categoriesGrid: {
    gap: 12,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: 12,
  },
  categoryIcon: {
    fontSize: 24,
    marginTop: 2,
  },
  titleContent: {
    flex: 1,
    gap: 6,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  categoryArrow: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  topicsContainer: {
    gap: 8,
  },
  topicsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textTransform: 'uppercase',
  },
  topicsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  topicTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  topicText: {
    fontSize: 11,
    fontWeight: '500',
  },
  comparisonSection: {
    margin: 10,
  },
  comparisonGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  comparisonCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  comparisonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  comparisonList: {
    gap: 6,
  },
  comparisonItem: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  frameworksSection: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  frameworksSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  frameworksList: {
    gap: 16,
    marginBottom: 24,
  },
  frameworkCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  frameworkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  frameworkIcon: {
    fontSize: 24,
  },
  frameworkInfo: {
    flex: 1,
  },
  frameworkName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  frameworkType: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  popularityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularityText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  frameworkDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  frameworkFeatures: {
    gap: 4,
  },
  frameworkFeature: {
    fontSize: 12,
    color: '#333',
    lineHeight: 18,
  },
  frameworksComparison: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  comparisonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 12,
  },
  comparisonTable: {
    gap: 8,
  },
  comparisonRow: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    gap: 6,
  },
  comparisonCategory: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  comparisonValue: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  frameworksTips: {
    backgroundColor: '#e8f5e8',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 14,
    color: '#2E7D32',
    lineHeight: 20,
  },
  tipBold: {
    fontWeight: 'bold',
  },
  bestPracticesSection: {
    margin: 10,
  },
  practicesList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  practiceItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'flex-start',
    gap: 12,
  },
  practiceIcon: {
    fontSize: 20,
    marginTop: 2,
  },
  practiceContent: {
    flex: 1,
    gap: 4,
  },
  practiceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  practiceDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  quickGuideSection: {
    margin: 10,
  },
  quickGuideGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickGuideItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    minWidth: '45%',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickGuideTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  quickGuideCode: {
    fontSize: 12,
    fontFamily: 'Courier',
    color: '#007AFF',
    backgroundColor: '#f0f7ff',
    padding: 4,
    borderRadius: 4,
    marginBottom: 4,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default StylingHomeScreen;
