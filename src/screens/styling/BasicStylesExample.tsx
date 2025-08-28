import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BasicStylesExample: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<'stylesheet' | 'inline' | 'composition' | 'inheritance'>('stylesheet');

  // Estilos base para composición
  const baseButtonStyle = {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center' as const,
    marginVertical: 8,
    minWidth: 120,
  };

  const buttonVariants = {
    primary: { backgroundColor: '#007AFF' },
    secondary: { backgroundColor: '#34C759' },
    danger: { backgroundColor: '#FF3B30' },
    warning: { backgroundColor: '#FF9500' },
    outline: { 
      backgroundColor: 'transparent', 
      borderWidth: 2, 
      borderColor: '#007AFF' 
    },
  };

  const textVariants = {
    primary: { color: '#fff' },
    outline: { color: '#007AFF' },
  };

  const renderExampleSelector = () => (
    <View style={styles.selectorContainer}>
      <Pressable
        style={[styles.selectorButton, selectedExample === 'stylesheet' && styles.selectedButton]}
        onPress={() => setSelectedExample('stylesheet')}
      >
        <Text style={[styles.selectorText, selectedExample === 'stylesheet' && styles.selectedText]}>
          📝 StyleSheet
        </Text>
      </Pressable>
      
      <Pressable
        style={[styles.selectorButton, selectedExample === 'inline' && styles.selectedButton]}
        onPress={() => setSelectedExample('inline')}
      >
        <Text style={[styles.selectorText, selectedExample === 'inline' && styles.selectedText]}>
          ✍️ Inline
        </Text>
      </Pressable>
      
      <Pressable
        style={[styles.selectorButton, selectedExample === 'composition' && styles.selectedButton]}
        onPress={() => setSelectedExample('composition')}
      >
        <Text style={[styles.selectorText, selectedExample === 'composition' && styles.selectedText]}>
          🧩 Composición
        </Text>
      </Pressable>
      
      <Pressable
        style={[styles.selectorButton, selectedExample === 'inheritance' && styles.selectedButton]}
        onPress={() => setSelectedExample('inheritance')}
      >
        <Text style={[styles.selectorText, selectedExample === 'inheritance' && styles.selectedText]}>
          🔗 Herencia
        </Text>
      </Pressable>
    </View>
  );

  const renderStyleSheetExample = () => (
    <View style={styles.exampleSection}>
      <Text style={styles.exampleTitle}>📝 StyleSheet.create()</Text>
      <Text style={styles.exampleDescription}>
        Forma recomendada de definir estilos. Mejor performance y validación.
      </Text>
      
      <View style={styles.demoContainer}>
        <Text style={styles.demoLabel}>Ejemplo:</Text>
        <View style={styles.styleSheetDemo}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Tarjeta con StyleSheet</Text>
            <Text style={styles.cardDescription}>
              Este componente usa estilos definidos con StyleSheet.create()
            </Text>
            <Pressable 
              style={styles.cardButton}
              onPress={() => Alert.alert('StyleSheet', 'Botón creado con StyleSheet!')}
            >
              <Text style={styles.cardButtonText}>Presionar</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.codeSection}>
        <Text style={styles.codeTitle}>Código:</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>{`const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

<View style={styles.card}>
  <Text style={styles.cardTitle}>Título</Text>
</View>`}</Text>
        </View>
      </View>

      <View style={styles.advantagesSection}>
        <Text style={styles.advantagesTitle}>✅ Ventajas de StyleSheet:</Text>
        <Text style={styles.advantage}>• Mejor performance (estilos compilados)</Text>
        <Text style={styles.advantage}>• Validación de propiedades en desarrollo</Text>
        <Text style={styles.advantage}>• Reutilización de estilos</Text>
        <Text style={styles.advantage}>• Autocomplete en IDEs</Text>
        <Text style={styles.advantage}>• Menor uso de memoria</Text>
      </View>
    </View>
  );

  const renderInlineExample = () => (
    <View style={styles.exampleSection}>
      <Text style={styles.exampleTitle}>✍️ Estilos Inline</Text>
      <Text style={styles.exampleDescription}>
        Útiles para estilos dinámicos o valores calculados, pero con menor performance.
      </Text>
      
      <View style={styles.demoContainer}>
        <Text style={styles.demoLabel}>Ejemplo:</Text>
        <View style={styles.inlineDemo}>
          <View style={{
            backgroundColor: '#4CAF50',
            padding: 16,
            borderRadius: 8,
            marginVertical: 8,
          }}>
            <Text style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
              Componente con estilos inline
            </Text>
          </View>
          
          {/* Estilos dinámicos */}
          <View style={{
            backgroundColor: Math.random() > 0.5 ? '#FF9800' : '#9C27B0',
            padding: 12,
            borderRadius: 8,
            marginVertical: 4,
          }}>
            <Text style={{ color: '#fff', textAlign: 'center' }}>
              Color dinámico (refresca para cambiar)
            </Text>
          </View>
          
          <View style={{
            backgroundColor: '#2196F3',
            padding: 8,
            borderRadius: 4,
            transform: [{ rotate: '2deg' }],
            marginVertical: 8,
          }}>
            <Text style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 14,
            }}>
              Con transformación
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.codeSection}>
        <Text style={styles.codeTitle}>Código:</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>{`// Estilos inline básicos
<View style={{
  backgroundColor: '#4CAF50',
  padding: 16,
  borderRadius: 8,
}}>
  <Text style={{
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }}>
    Texto con estilos inline
  </Text>
</View>

// Estilos dinámicos
<View style={{
  backgroundColor: isActive ? '#4CAF50' : '#ccc',
  opacity: isVisible ? 1 : 0.5,
}}>
  <Text>Contenido dinámico</Text>
</View>`}</Text>
        </View>
      </View>

      <View style={styles.warningSection}>
        <Text style={styles.warningTitle}>⚠️ Cuándo usar estilos inline:</Text>
        <Text style={styles.warningItem}>• Valores calculados dinámicamente</Text>
        <Text style={styles.warningItem}>• Estilos que dependen del estado</Text>
        <Text style={styles.warningItem}>• Prototipado rápido</Text>
        <Text style={styles.warningNote}>
          Nota: Evita para estilos estáticos - usa StyleSheet para mejor performance
        </Text>
      </View>
    </View>
  );

  const renderCompositionExample = () => (
    <View style={styles.exampleSection}>
      <Text style={styles.exampleTitle}>🧩 Composición de Estilos</Text>
      <Text style={styles.exampleDescription}>
        Combina múltiples estilos usando arrays para crear variaciones.
      </Text>
      
      <View style={styles.demoContainer}>
        <Text style={styles.demoLabel}>Botones con composición:</Text>
        <View style={styles.compositionDemo}>
          {/* Botones usando composición de estilos */}
          <Pressable 
            style={[baseButtonStyle, buttonVariants.primary]}
            onPress={() => Alert.alert('Primary', 'Botón primario presionado')}
          >
            <Text style={[styles.buttonText, textVariants.primary]}>Primary</Text>
          </Pressable>
          
          <Pressable 
            style={[baseButtonStyle, buttonVariants.secondary]}
            onPress={() => Alert.alert('Secondary', 'Botón secundario presionado')}
          >
            <Text style={[styles.buttonText, textVariants.primary]}>Secondary</Text>
          </Pressable>
          
          <Pressable 
            style={[baseButtonStyle, buttonVariants.danger]}
            onPress={() => Alert.alert('Danger', 'Botón de peligro presionado')}
          >
            <Text style={[styles.buttonText, textVariants.primary]}>Danger</Text>
          </Pressable>
          
          <Pressable 
            style={[baseButtonStyle, buttonVariants.outline]}
            onPress={() => Alert.alert('Outline', 'Botón outline presionado')}
          >
            <Text style={[styles.buttonText, textVariants.outline]}>Outline</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.codeSection}>
        <Text style={styles.codeTitle}>Código:</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>{`// Estilo base
const baseButton = {
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 8,
  alignItems: 'center',
};

// Variaciones
const variants = {
  primary: { backgroundColor: '#007AFF' },
  danger: { backgroundColor: '#FF3B30' },
  outline: { 
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#007AFF'
  },
};

// Uso con composición
<Pressable style={[baseButton, variants.primary]}>
  <Text style={[textStyles.base, textStyles.white]}>
    Primary Button
  </Text>
</Pressable>`}</Text>
        </View>
      </View>

      <View style={styles.tipSection}>
        <Text style={styles.tipTitle}>💡 Tips de Composición:</Text>
        <Text style={styles.tipItem}>• Los estilos se aplican de izquierda a derecha</Text>
        <Text style={styles.tipItem}>• Propiedades posteriores sobrescriben las anteriores</Text>
        <Text style={styles.tipItem}>• Usa undefined o null para estilos condicionales</Text>
        <Text style={styles.tipItem}>• Combina StyleSheet con objetos para flexibilidad</Text>
      </View>
    </View>
  );

  const renderInheritanceExample = () => (
    <View style={styles.exampleSection}>
      <Text style={styles.exampleTitle}>🔗 Herencia de Estilos</Text>
      <Text style={styles.exampleDescription}>
        En React Native, solo los componentes Text heredan estilos de sus padres.
      </Text>
      
      <View style={styles.demoContainer}>
        <Text style={styles.demoLabel}>Herencia en Text:</Text>
        <View style={styles.inheritanceDemo}>
          <Text style={styles.parentText}>
            Este texto tiene estilos padre.
            <Text style={styles.childText}> Este texto hereda y añade estilos.</Text>
            <Text style={styles.grandChildText}> Y este tiene más variaciones.</Text>
          </Text>
        </View>
        
        <Text style={styles.demoLabel}>Sin herencia en View:</Text>
        <View style={styles.noInheritanceDemo}>
          <View style={styles.parentView}>
            <View style={styles.childView}>
              <Text style={styles.viewText}>Los View no heredan estilos</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.codeSection}>
        <Text style={styles.codeTitle}>Código:</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>{`// ✅ Text SÍ hereda estilos
<Text style={{fontSize: 16, color: '#333'}}>
  Texto padre
  <Text style={{fontWeight: 'bold'}}>
    Texto hijo (hereda fontSize y color)
  </Text>
</Text>

// ❌ View NO hereda estilos
<View style={{backgroundColor: 'red'}}>
  <View>
    {/* Este View NO hereda backgroundColor */}
  </View>
</View>

// ✅ Solución: aplica estilos explícitamente
<View style={[parentStyles, childStyles]}>
  <Text style={[parentTextStyles, childTextStyles]}>
    Texto con estilos combinados
  </Text>
</View>`}</Text>
        </View>
      </View>

      <View style={styles.rulesSection}>
        <Text style={styles.rulesTitle}>📏 Reglas de Herencia:</Text>
        <View style={styles.ruleItem}>
          <Text style={styles.ruleIcon}>✅</Text>
          <Text style={styles.ruleText}>
            <Text style={styles.bold}>Text components:</Text> Heredan fontSize, color, fontFamily, etc.
          </Text>
        </View>
        <View style={styles.ruleItem}>
          <Text style={styles.ruleIcon}>❌</Text>
          <Text style={styles.ruleText}>
            <Text style={styles.bold}>View components:</Text> NO heredan estilos de padres
          </Text>
        </View>
        <View style={styles.ruleItem}>
          <Text style={styles.ruleIcon}>💡</Text>
          <Text style={styles.ruleText}>
            <Text style={styles.bold}>Solución:</Text> Usa composición de estilos y Context para temas
          </Text>
        </View>
      </View>
    </View>
  );

  const renderCurrentExample = () => {
    switch (selectedExample) {
      case 'stylesheet':
        return renderStyleSheetExample();
      case 'inline':
        return renderInlineExample();
      case 'composition':
        return renderCompositionExample();
      case 'inheritance':
        return renderInheritanceExample();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>🎨 Estilos Básicos</Text>
          <Text style={styles.subtitle}>
            Aprende los fundamentos del styling en React Native
          </Text>
        </View>

        {renderExampleSelector()}

        <View style={styles.content}>
          {renderCurrentExample()}
        </View>

        <View style={styles.performanceSection}>
          <Text style={styles.performanceTitle}>⚡ Consideraciones de Performance</Text>
          <View style={styles.performanceComparison}>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>🏆 StyleSheet.create()</Text>
              <Text style={styles.performanceValue}>Mejor performance</Text>
              <Text style={styles.performanceReason}>
                • Estilos compilados una vez{'\n'}
                • Menor uso de memoria{'\n'}
                • Validación en desarrollo
              </Text>
            </View>
            
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>⚠️ Estilos Inline</Text>
              <Text style={styles.performanceValue}>Performance menor</Text>
              <Text style={styles.performanceReason}>
                • Se crean en cada render{'\n'}
                • Mayor uso de memoria{'\n'}
                • Útil para estilos dinámicos
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bestPracticesSection}>
          <Text style={styles.bestPracticesTitle}>✅ Mejores Prácticas</Text>
          <View style={styles.practicesList}>
            <Text style={styles.practiceItem}>
              🎯 <Text style={styles.bold}>Usa StyleSheet.create()</Text> para estilos estáticos
            </Text>
            <Text style={styles.practiceItem}>
              🧩 <Text style={styles.bold}>Combina estilos</Text> con arrays para reutilización
            </Text>
            <Text style={styles.practiceItem}>
              ⚡ <Text style={styles.bold}>Evita estilos inline</Text> en loops o listas
            </Text>
            <Text style={styles.practiceItem}>
              🔧 <Text style={styles.bold}>Usa constantes</Text> para colores y medidas
            </Text>
            <Text style={styles.practiceItem}>
              📱 <Text style={styles.bold}>Considera Platform.select()</Text> para estilos específicos
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
    backgroundColor: '#fff',
    padding: 20,
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
  selectorContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 12,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  selectorButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#007AFF',
  },
  selectorText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  selectedText: {
    color: '#fff',
  },
  content: {
    margin: 10,
  },
  exampleSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  exampleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  exampleDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  demoContainer: {
    marginBottom: 20,
  },
  demoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  styleSheetDemo: {
    padding: 8,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  inlineDemo: {
    padding: 8,
  },
  compositionDemo: {
    padding: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  inheritanceDemo: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 16,
  },
  parentText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  childText: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  grandChildText: {
    fontStyle: 'italic',
    color: '#4CAF50',
    fontSize: 14,
  },
  noInheritanceDemo: {
    padding: 8,
  },
  parentView: {
    backgroundColor: '#FFE0E0',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  childView: {
    backgroundColor: '#E0F0FF',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  viewText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  codeSection: {
    marginBottom: 20,
  },
  codeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  codeBlock: {
    backgroundColor: '#2d3748',
    padding: 16,
    borderRadius: 8,
  },
  codeText: {
    fontFamily: 'Courier',
    fontSize: 12,
    color: '#a0aec0',
    lineHeight: 18,
  },
  advantagesSection: {
    backgroundColor: '#e8f5e8',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  advantagesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  advantage: {
    fontSize: 13,
    color: '#2E7D32',
    marginBottom: 4,
  },
  warningSection: {
    backgroundColor: '#fff3e0',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 8,
  },
  warningItem: {
    fontSize: 13,
    color: '#E65100',
    marginBottom: 4,
  },
  warningNote: {
    fontSize: 12,
    color: '#E65100',
    fontStyle: 'italic',
    marginTop: 8,
  },
  tipSection: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  tipItem: {
    fontSize: 13,
    color: '#1976D2',
    marginBottom: 4,
  },
  rulesSection: {
    backgroundColor: '#f3e5f5',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0',
  },
  rulesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 8,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    gap: 8,
  },
  ruleIcon: {
    fontSize: 14,
  },
  ruleText: {
    flex: 1,
    fontSize: 13,
    color: '#7B1FA2',
    lineHeight: 18,
  },
  bold: {
    fontWeight: 'bold',
  },
  performanceSection: {
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
  performanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  performanceComparison: {
    flexDirection: 'row',
    gap: 12,
  },
  performanceItem: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  performanceLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  performanceValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  performanceReason: {
    fontSize: 11,
    color: '#999',
    lineHeight: 16,
  },
  bestPracticesSection: {
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
  bestPracticesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  practicesList: {
    gap: 12,
  },
  practiceItem: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default BasicStylesExample;

