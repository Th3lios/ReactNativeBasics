import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HooksHomeScreen = ({ navigation }: any) => {
  const hooks = [
    { 
      name: 'useState', 
      screen: 'UseStateExample', 
      description: 'Maneja el estado local de componentes',
      icon: '🔄',
      difficulty: 'Básico'
    },
    { 
      name: 'useEffect', 
      screen: 'UseEffectExample', 
      description: 'Efectos secundarios y ciclo de vida',
      icon: '⚡',
      difficulty: 'Básico'
    },
    { 
      name: 'useLayoutEffect', 
      screen: 'UseLayoutEffectExample', 
      description: 'Efectos síncronos antes del render',
      icon: '🎨',
      difficulty: 'Intermedio'
    },
    { 
      name: 'useMemo', 
      screen: 'UseMemoExample', 
      description: 'Memorización de valores calculados',
      icon: '🧠',
      difficulty: 'Intermedio'
    },
    { 
      name: 'useCallback', 
      screen: 'UseCallbackExample', 
      description: 'Memorización de funciones',
      icon: '📞',
      difficulty: 'Intermedio'
    },
    { 
      name: 'useImperativeHandle', 
      screen: 'UseImperativeHandleExample', 
      description: 'Control imperativo con forwardRef',
      icon: '🎯',
      difficulty: 'Avanzado'
    },
    { 
      name: 'memo', 
      screen: 'MemoExample', 
      description: 'Memorización de componentes React',
      icon: '💾',
      difficulty: 'Intermedio'
    },
    { 
      name: 'Custom Hooks', 
      screen: 'CustomHooksExample', 
      description: 'Creación de hooks personalizados',
      icon: '🛠️',
      difficulty: 'Avanzado'
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Básico':
        return '#4caf50';
      case 'Intermedio':
        return '#ff9800';
      case 'Avanzado':
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  };

  const renderHookCard = (hook: any, index: number) => (
    <Pressable
      key={index}
      style={styles.hookCard}
      onPress={() => navigation.navigate(hook.screen)}
      android_ripple={{ color: '#e0e0e0' }}>
      
      <View style={styles.cardHeader}>
        <Text style={styles.hookIcon}>{hook.icon}</Text>
        <View style={styles.hookInfo}>
          <Text style={styles.hookName}>{hook.name}</Text>
          <Text style={styles.hookDescription}>{hook.description}</Text>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(hook.difficulty), marginTop: 12 }]}>
            <Text style={styles.difficultyText}>{hook.difficulty}</Text>
          </View>
        </View>
      </View>      
      <Text style={styles.arrow}>→</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>React Hooks</Text>
          <Text style={styles.subtitle}>
            Aprende los hooks fundamentales de React con ejemplos prácticos
          </Text>
          <Text style={styles.description}>
            Los hooks te permiten usar estado y otras características de React 
            en componentes funcionales de manera simple y potente.
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>💡 ¿Qué son los Hooks?</Text>
          <Text style={styles.infoText}>
            Los hooks son funciones especiales que te permiten "engancharte" 
            a características de React como el estado y el ciclo de vida desde 
            componentes funcionales.
          </Text>
          
          <View style={styles.rulesContainer}>
            <Text style={styles.rulesTitle}>📋 Reglas de los Hooks:</Text>
            <Text style={styles.ruleItem}>• Solo llama hooks en el nivel superior</Text>
            <Text style={styles.ruleItem}>• Solo llama hooks desde componentes React</Text>
            <Text style={styles.ruleItem}>• Los nombres de hooks personalizados deben empezar con "use"</Text>
          </View>
        </View>

        <View style={styles.hooksContainer}>
          <Text style={styles.hooksTitle}>Hooks Disponibles</Text>
          {hooks.map((hook, index) => renderHookCard(hook, index))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🚀 Cada hook incluye ejemplos interactivos y explicaciones detalladas
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
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  infoSection: {
    backgroundColor: '#e8f5e8',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#2e7d32',
    lineHeight: 24,
    marginBottom: 16,
  },
  rulesContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  rulesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 8,
  },
  ruleItem: {
    fontSize: 14,
    color: '#2e7d32',
    marginBottom: 4,
  },
  hooksContainer: {
    padding: 10,
  },
  hooksTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  hookCard: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  hookIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  hookInfo: {
    flex: 1,
  },
  hookName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  difficultyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  hookDescription: {
    fontSize: 14,
    color: '#666',
    flex: 2,
  },
  arrow: {
    fontSize: 20,
    color: '#007AFF',
    marginLeft: 12,
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

export default HooksHomeScreen;
