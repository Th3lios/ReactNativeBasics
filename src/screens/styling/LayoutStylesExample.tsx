import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

const LayoutStylesExample: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<'flexbox' | 'positioning' | 'dimensions' | 'spacing'>('flexbox');

  const renderExampleSelector = () => (
    <View style={styles.selectorContainer}>
      <Pressable
        style={[styles.selectorButton, selectedExample === 'flexbox' && styles.selectedButton]}
        onPress={() => setSelectedExample('flexbox')}
      >
        <Text style={[styles.selectorText, selectedExample === 'flexbox' && styles.selectedText]}>
          📐 Flexbox
        </Text>
      </Pressable>
      
      <Pressable
        style={[styles.selectorButton, selectedExample === 'positioning' && styles.selectedButton]}
        onPress={() => setSelectedExample('positioning')}
      >
        <Text style={[styles.selectorText, selectedExample === 'positioning' && styles.selectedText]}>
          📍 Position
        </Text>
      </Pressable>
      
      <Pressable
        style={[styles.selectorButton, selectedExample === 'dimensions' && styles.selectedButton]}
        onPress={() => setSelectedExample('dimensions')}
      >
        <Text style={[styles.selectorText, selectedExample === 'dimensions' && styles.selectedText]}>
          📏 Dimensions
        </Text>
      </Pressable>
      
      <Pressable
        style={[styles.selectorButton, selectedExample === 'spacing' && styles.selectedButton]}
        onPress={() => setSelectedExample('spacing')}
      >
        <Text style={[styles.selectorText, selectedExample === 'spacing' && styles.selectedText]}>
          📦 Spacing
        </Text>
      </Pressable>
    </View>
  );

  const renderFlexboxExample = () => (
    <View style={styles.exampleSection}>
      <Text style={styles.exampleTitle}>📐 Flexbox Layout</Text>
      <Text style={styles.exampleDescription}>
        Flexbox es el sistema de layout por defecto en React Native. Todo es flex container.
      </Text>
      
      {/* Flex Direction */}
      <View style={styles.demoContainer}>
        <Text style={styles.demoLabel}>flexDirection:</Text>
        
        <View style={styles.flexDemo}>
          <Text style={styles.miniLabel}>row (default en web)</Text>
          <View style={[styles.flexContainer, { flexDirection: 'row' }]}>
            <View style={[styles.flexItem, { backgroundColor: '#FF6B6B' }]}>
              <Text style={styles.flexItemText}>1</Text>
            </View>
            <View style={[styles.flexItem, { backgroundColor: '#4ECDC4' }]}>
              <Text style={styles.flexItemText}>2</Text>
            </View>
            <View style={[styles.flexItem, { backgroundColor: '#45B7D1' }]}>
              <Text style={styles.flexItemText}>3</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.flexDemo}>
          <Text style={styles.miniLabel}>column (default en RN)</Text>
          <View style={[styles.flexContainer, { flexDirection: 'column', height: 120 }]}>
            <View style={[styles.flexItem, { backgroundColor: '#96CEB4' }]}>
              <Text style={styles.flexItemText}>1</Text>
            </View>
            <View style={[styles.flexItem, { backgroundColor: '#FFEAA7' }]}>
              <Text style={styles.flexItemText}>2</Text>
            </View>
            <View style={[styles.flexItem, { backgroundColor: '#DDA0DD' }]}>
              <Text style={styles.flexItemText}>3</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Justify Content */}
      <View style={styles.demoContainer}>
        <Text style={styles.demoLabel}>justifyContent (eje principal):</Text>
        
        {['flex-start', 'center', 'flex-end', 'space-between', 'space-around'].map((justify) => (
          <View key={justify} style={styles.flexDemo}>
            <Text style={styles.miniLabel}>{justify}</Text>
            <View style={[styles.flexContainer, { justifyContent: justify as any, flexDirection: 'row' }]}>
              <View style={[styles.smallFlexItem, { backgroundColor: '#FF9FF3' }]}>
                <Text style={styles.smallFlexText}>A</Text>
              </View>
              <View style={[styles.smallFlexItem, { backgroundColor: '#54A0FF' }]}>
                <Text style={styles.smallFlexText}>B</Text>
              </View>
              <View style={[styles.smallFlexItem, { backgroundColor: '#5F27CD' }]}>
                <Text style={styles.smallFlexText}>C</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Align Items */}
      <View style={styles.demoContainer}>
        <Text style={styles.demoLabel}>alignItems (eje secundario):</Text>
        
        {['flex-start', 'center', 'flex-end', 'stretch'].map((align) => (
          <View key={align} style={styles.flexDemo}>
            <Text style={styles.miniLabel}>{align}</Text>
            <View style={[styles.flexContainer, { alignItems: align as any, flexDirection: 'row', height: 80 }]}>
              <View style={[styles.variableFlexItem, { backgroundColor: '#00D2D3', height: 20 }]}>
                <Text style={styles.smallFlexText}>A</Text>
              </View>
              <View style={[styles.variableFlexItem, { backgroundColor: '#FF9F43', height: 40 }]}>
                <Text style={styles.smallFlexText}>B</Text>
              </View>
              <View style={[styles.variableFlexItem, { backgroundColor: '#FF6B6B', height: 30 }]}>
                <Text style={styles.smallFlexText}>C</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Flex Values */}
      <View style={styles.demoContainer}>
        <Text style={styles.demoLabel}>flex (crecimiento):</Text>
        
        <View style={styles.flexDemo}>
          <Text style={styles.miniLabel}>flex: 1, 2, 1</Text>
          <View style={[styles.flexContainer, { flexDirection: 'row' }]}>
            <View style={[styles.flexItem, { flex: 1, backgroundColor: '#FD79A8' }]}>
              <Text style={styles.flexItemText}>flex: 1</Text>
            </View>
            <View style={[styles.flexItem, { flex: 2, backgroundColor: '#FDCB6E' }]}>
              <Text style={styles.flexItemText}>flex: 2</Text>
            </View>
            <View style={[styles.flexItem, { flex: 1, backgroundColor: '#6C5CE7' }]}>
              <Text style={styles.flexItemText}>flex: 1</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.codeSection}>
        <Text style={styles.codeTitle}>Código de ejemplo:</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>{`// Contenedor flex
<View style={{
  flex: 1,
  flexDirection: 'row', // 'row' | 'column'
  justifyContent: 'center', // eje principal
  alignItems: 'center', // eje secundario
}}>
  <View style={{ flex: 1 }}>Elemento 1</View>
  <View style={{ flex: 2 }}>Elemento 2</View>
</View>

// Flexbox es por defecto en React Native
<View> {/* Este es un flex container automáticamente */}
  <Text>Elemento hijo</Text>
</View>`}</Text>
        </View>
      </View>
    </View>
  );

  const renderPositioningExample = () => (
    <View style={styles.exampleSection}>
      <Text style={styles.exampleTitle}>📍 Posicionamiento</Text>
      <Text style={styles.exampleDescription}>
        Control preciso de la posición de elementos con relative, absolute y z-index.
      </Text>
      
      {/* Position Relative */}
      <View style={styles.demoContainer}>
        <Text style={styles.demoLabel}>position: 'relative' (default)</Text>
        <View style={styles.positionDemo}>
          <View style={styles.relativeContainer}>
            <View style={[styles.positionItem, { backgroundColor: '#FF6B6B' }]}>
              <Text style={styles.positionText}>Normal</Text>
            </View>
            <View style={[styles.positionItem, { backgroundColor: '#4ECDC4', top: 10, left: 20 }]}>
              <Text style={styles.positionText}>top: 10, left: 20</Text>
            </View>
            <View style={[styles.positionItem, { backgroundColor: '#45B7D1' }]}>
              <Text style={styles.positionText}>Normal</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Position Absolute */}
      <View style={styles.demoContainer}>
        <Text style={styles.demoLabel}>position: 'absolute'</Text>
        <View style={styles.positionDemo}>
          <View style={styles.absoluteContainer}>
            <View style={[styles.absoluteItem, { top: 10, left: 10, backgroundColor: '#E17055' }]}>
              <Text style={styles.positionText}>Top-Left</Text>
            </View>
            <View style={[styles.absoluteItem, { top: 10, right: 10, backgroundColor: '#00B894' }]}>
              <Text style={styles.positionText}>Top-Right</Text>
            </View>
            <View style={[styles.absoluteItem, { bottom: 10, left: 10, backgroundColor: '#0984E3' }]}>
              <Text style={styles.positionText}>Bottom-Left</Text>
            </View>
            <View style={[styles.absoluteItem, { bottom: 10, right: 10, backgroundColor: '#6C5CE7' }]}>
              <Text style={styles.positionText}>Bottom-Right</Text>
            </View>
            <View style={[styles.absoluteItem, styles.centered, { backgroundColor: '#FDCB6E' }]}>
              <Text style={styles.positionText}>Centrado</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Z-Index */}
      <View style={styles.demoContainer}>
        <Text style={styles.demoLabel}>zIndex (capas):</Text>
        <View style={styles.positionDemo}>
          <View style={styles.zIndexContainer}>
            <View style={[styles.zIndexItem, { backgroundColor: '#FF6B6B', zIndex: 1, top: 0, left: 0 }]}>
              <Text style={styles.zIndexText}>zIndex: 1</Text>
            </View>
            <View style={[styles.zIndexItem, { backgroundColor: '#4ECDC4', zIndex: 3, top: 20, left: 20 }]}>
              <Text style={styles.zIndexText}>zIndex: 3</Text>
            </View>
            <View style={[styles.zIndexItem, { backgroundColor: '#45B7D1', zIndex: 2, top: 40, left: 40 }]}>
              <Text style={styles.zIndexText}>zIndex: 2</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Overlay Example */}
      <View style={styles.demoContainer}>
        <Text style={styles.demoLabel}>Ejemplo práctico - Overlay:</Text>
        <View style={styles.overlayDemo}>
          <View style={styles.overlayContent}>
            <Text style={styles.overlayContentText}>Contenido principal</Text>
          </View>
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Overlay</Text>
          </View>
        </View>
      </View>

      <View style={styles.codeSection}>
        <Text style={styles.codeTitle}>Código de ejemplo:</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>{`// Position relative (default)
<View style={{
  position: 'relative',
  top: 10,    // desplaza desde posición normal
  left: 20,   // pero mantiene su espacio
}}>
  <Text>Elemento relativo</Text>
</View>

// Position absolute
<View style={{
  position: 'absolute',
  top: 0,     // desde el borde superior del padre
  right: 0,   // desde el borde derecho del padre
  zIndex: 10, // por encima de otros elementos
}}>
  <Text>Elemento absoluto</Text>
</View>

// Centrado absoluto
<View style={{
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: [
    { translateX: -50 },
    { translateY: -50 }
  ],
}}>
  <Text>Centrado</Text>
</View>`}</Text>
        </View>
      </View>
    </View>
  );

  const renderDimensionsExample = () => (
    <View style={styles.exampleSection}>
      <Text style={styles.exampleTitle}>📏 Dimensiones</Text>
      <Text style={styles.exampleDescription}>
        Control de ancho, alto y tamaños con valores absolutos, porcentajes y dinámicos.
      </Text>
      
      {/* Fixed Dimensions */}
      <View style={styles.demoContainer}>
        <Text style={styles.demoLabel}>Dimensiones fijas (pixeles):</Text>
        <View style={styles.dimensionsDemo}>
          <View style={[styles.fixedBox, { width: 80, height: 80, backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.boxText}>80x80</Text>
          </View>
          <View style={[styles.fixedBox, { width: 120, height: 60, backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.boxText}>120x60</Text>
          </View>
          <View style={[styles.fixedBox, { width: 100, height: 100, backgroundColor: '#45B7D1' }]}>
            <Text style={styles.boxText}>100x100</Text>
          </View>
        </View>
      </View>

      {/* Percentage Dimensions */}
      <View style={styles.demoContainer}>
        <Text style={styles.demoLabel}>Dimensiones en porcentaje:</Text>
        <View style={styles.percentageContainer}>
          <View style={[styles.percentageBox, { width: '30%', backgroundColor: '#96CEB4' }]}>
            <Text style={styles.boxText}>30%</Text>
          </View>
          <View style={[styles.percentageBox, { width: '50%', backgroundColor: '#FFEAA7' }]}>
            <Text style={styles.boxText}>50%</Text>
          </View>
          <View style={[styles.percentageBox, { width: '70%', backgroundColor: '#DDA0DD' }]}>
            <Text style={styles.boxText}>70%</Text>
          </View>
        </View>
      </View>

      {/* Min/Max Dimensions */}
      <View style={styles.demoContainer}>
        <Text style={styles.demoLabel}>Dimensiones mínimas y máximas:</Text>
        <View style={styles.minMaxDemo}>
          <View style={[styles.minMaxBox, { 
            minWidth: 100, 
            maxWidth: 200, 
            backgroundColor: '#FD79A8' 
          }]}>
            <Text style={styles.boxText}>minWidth: 100{'\n'}maxWidth: 200</Text>
          </View>
          <View style={[styles.minMaxBox, { 
            minHeight: 80, 
            maxHeight: 120, 
            backgroundColor: '#FDCB6E' 
          }]}>
            <Text style={styles.boxText}>minHeight: 80{'\n'}maxHeight: 120</Text>
          </View>
        </View>
      </View>

      {/* Dynamic Dimensions */}
      <View style={styles.demoContainer}>
        <Text style={styles.demoLabel}>Dimensiones dinámicas:</Text>
        <Text style={styles.miniLabel}>Ancho de pantalla: {Math.round(screenWidth)}px</Text>
        <View style={styles.dynamicDemo}>
          <View style={[styles.dynamicBox, { 
            width: screenWidth * 0.4, 
            backgroundColor: '#00D2D3' 
          }]}>
            <Text style={styles.boxText}>40% pantalla</Text>
          </View>
          <View style={[styles.dynamicBox, { 
            width: screenWidth * 0.6, 
            backgroundColor: '#FF9F43' 
          }]}>
            <Text style={styles.boxText}>60% pantalla</Text>
          </View>
        </View>
      </View>

      {/* Aspect Ratio */}
      <View style={styles.demoContainer}>
        <Text style={styles.demoLabel}>Aspect Ratio:</Text>
        <View style={styles.aspectRatioDemo}>
          <View style={[styles.aspectRatioBox, { aspectRatio: 1, backgroundColor: '#6C5CE7' }]}>
            <Text style={styles.boxText}>1:1{'\n'}(cuadrado)</Text>
          </View>
          <View style={[styles.aspectRatioBox, { aspectRatio: 16/9, backgroundColor: '#E17055' }]}>
            <Text style={styles.boxText}>16:9{'\n'}(video)</Text>
          </View>
          <View style={[styles.aspectRatioBox, { aspectRatio: 3/4, backgroundColor: '#00B894' }]}>
            <Text style={styles.boxText}>3:4{'\n'}(retrato)</Text>
          </View>
        </View>
      </View>

      <View style={styles.codeSection}>
        <Text style={styles.codeTitle}>Código de ejemplo:</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>{`import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Dimensiones fijas
<View style={{
  width: 100,    // pixeles
  height: 50,    // pixeles
}}>

// Dimensiones en porcentaje
<View style={{
  width: '50%',  // del contenedor padre
  height: '100%',
}}>

// Dimensiones mínimas/máximas
<View style={{
  minWidth: 100,
  maxWidth: 300,
  minHeight: 50,
  maxHeight: 200,
}}>

// Dimensiones dinámicas
<View style={{
  width: width * 0.8,    // 80% del ancho de pantalla
  height: height * 0.5,  // 50% del alto de pantalla
}}>

// Aspect ratio
<View style={{
  width: '100%',
  aspectRatio: 16/9,  // mantiene proporción 16:9
}}>`}</Text>
        </View>
      </View>
    </View>
  );

  const renderSpacingExample = () => (
    <View style={styles.exampleSection}>
      <Text style={styles.exampleTitle}>📦 Espaciado (Margin & Padding)</Text>
      <Text style={styles.exampleDescription}>
        Control del espacio interno (padding) y externo (margin) de los elementos.
      </Text>
      
      {/* Padding Example */}
      <View style={styles.demoContainer}>
        <Text style={styles.demoLabel}>Padding (espacio interno):</Text>
        <View style={styles.spacingDemo}>
          <View style={styles.spacingContainer}>
            <View style={[styles.paddingBox, { padding: 20, backgroundColor: '#FF6B6B' }]}>
              <View style={styles.paddingContent}>
                <Text style={styles.spacingText}>padding: 20</Text>
              </View>
            </View>
            
            <View style={[styles.paddingBox, { 
              paddingVertical: 30, 
              paddingHorizontal: 15, 
              backgroundColor: '#4ECDC4' 
            }]}>
              <View style={styles.paddingContent}>
                <Text style={styles.spacingText}>paddingVertical: 30{'\n'}paddingHorizontal: 15</Text>
              </View>
            </View>
            
            <View style={[styles.paddingBox, { 
              paddingTop: 10,
              paddingRight: 20,
              paddingBottom: 30,
              paddingLeft: 40,
              backgroundColor: '#45B7D1' 
            }]}>
              <View style={styles.paddingContent}>
                <Text style={styles.spacingText}>Padding específico{'\n'}top:10, right:20{'\n'}bottom:30, left:40</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Margin Example */}
      <View style={styles.demoContainer}>
        <Text style={styles.demoLabel}>Margin (espacio externo):</Text>
        <View style={styles.spacingDemo}>
          <View style={styles.marginContainer}>
            <View style={[styles.marginBox, { margin: 15, backgroundColor: '#96CEB4' }]}>
              <Text style={styles.spacingText}>margin: 15</Text>
            </View>
            
            <View style={[styles.marginBox, { 
              marginVertical: 20, 
              marginHorizontal: 30, 
              backgroundColor: '#FFEAA7' 
            }]}>
              <Text style={styles.spacingText}>marginVertical: 20{'\n'}marginHorizontal: 30</Text>
            </View>
            
            <View style={[styles.marginBox, { 
              marginTop: 25,
              backgroundColor: '#DDA0DD' 
            }]}>
              <Text style={styles.spacingText}>marginTop: 25</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Combined Example */}
      <View style={styles.demoContainer}>
        <Text style={styles.demoLabel}>Combinando Margin y Padding:</Text>
        <View style={styles.combinedDemo}>
          <View style={styles.combinedContainer}>
            <View style={[styles.combinedBox, { 
              margin: 10, 
              padding: 15, 
              backgroundColor: '#FD79A8' 
            }]}>
              <View style={styles.combinedContent}>
                <Text style={styles.spacingText}>margin: 10{'\n'}padding: 15</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Gap Example */}
      <View style={styles.demoContainer}>
        <Text style={styles.demoLabel}>Gap (espaciado entre elementos):</Text>
        <View style={styles.gapDemo}>
          <View style={[styles.gapContainer, { gap: 10 }]}>
            <View style={[styles.gapItem, { backgroundColor: '#00D2D3' }]}>
              <Text style={styles.gapText}>1</Text>
            </View>
            <View style={[styles.gapItem, { backgroundColor: '#FF9F43' }]}>
              <Text style={styles.gapText}>2</Text>
            </View>
            <View style={[styles.gapItem, { backgroundColor: '#FF6B6B' }]}>
              <Text style={styles.gapText}>3</Text>
            </View>
          </View>
          <Text style={styles.miniLabel}>gap: 10 (espaciado uniforme)</Text>
        </View>
      </View>

      <View style={styles.codeSection}>
        <Text style={styles.codeTitle}>Código de ejemplo:</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>{`// Padding (espacio interno)
<View style={{
  padding: 20,              // todos los lados
  paddingVertical: 15,      // top y bottom
  paddingHorizontal: 10,    // left y right
  paddingTop: 5,           // lado específico
  paddingRight: 8,
  paddingBottom: 12,
  paddingLeft: 16,
}}>

// Margin (espacio externo)
<View style={{
  margin: 20,              // todos los lados
  marginVertical: 15,      // top y bottom
  marginHorizontal: 10,    // left y right
  marginTop: 5,           // lado específico
  marginRight: 8,
  marginBottom: 12,
  marginLeft: 16,
}}>

// Gap (espaciado entre hijos)
<View style={{
  gap: 10,        // espacio entre todos los hijos
  rowGap: 15,     // espacio vertical
  columnGap: 20,  // espacio horizontal
}}>
  <Text>Elemento 1</Text>
  <Text>Elemento 2</Text>
</View>`}</Text>
        </View>
      </View>
    </View>
  );

  const renderCurrentExample = () => {
    switch (selectedExample) {
      case 'flexbox':
        return renderFlexboxExample();
      case 'positioning':
        return renderPositioningExample();
      case 'dimensions':
        return renderDimensionsExample();
      case 'spacing':
        return renderSpacingExample();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>📐 Layout y Posicionamiento</Text>
          <Text style={styles.subtitle}>
            Domina Flexbox, posicionamiento, dimensiones y espaciado
          </Text>
        </View>

        {renderExampleSelector()}

        <View style={styles.content}>
          {renderCurrentExample()}
        </View>

        <View style={styles.cheatSheetSection}>
          <Text style={styles.cheatSheetTitle}>📋 Cheat Sheet</Text>
          <View style={styles.cheatSheetGrid}>
            <View style={styles.cheatSheetCard}>
              <Text style={styles.cheatSheetCardTitle}>🎯 Flexbox</Text>
              <Text style={styles.cheatSheetItem}>flexDirection: 'column' | 'row'</Text>
              <Text style={styles.cheatSheetItem}>justifyContent: main axis</Text>
              <Text style={styles.cheatSheetItem}>alignItems: cross axis</Text>
              <Text style={styles.cheatSheetItem}>flex: 1 (crecimiento)</Text>
            </View>
            
            <View style={styles.cheatSheetCard}>
              <Text style={styles.cheatSheetCardTitle}>📍 Position</Text>
              <Text style={styles.cheatSheetItem}>position: 'relative' | 'absolute'</Text>
              <Text style={styles.cheatSheetItem}>top, right, bottom, left</Text>
              <Text style={styles.cheatSheetItem}>zIndex: número</Text>
              <Text style={styles.cheatSheetItem}>Absolute sale del flujo</Text>
            </View>
            
            <View style={styles.cheatSheetCard}>
              <Text style={styles.cheatSheetCardTitle}>📏 Sizes</Text>
              <Text style={styles.cheatSheetItem}>width, height: número | '%'</Text>
              <Text style={styles.cheatSheetItem}>minWidth, maxWidth</Text>
              <Text style={styles.cheatSheetItem}>aspectRatio: número</Text>
              <Text style={styles.cheatSheetItem}>Dimensions.get('window')</Text>
            </View>
            
            <View style={styles.cheatSheetCard}>
              <Text style={styles.cheatSheetCardTitle}>📦 Spacing</Text>
              <Text style={styles.cheatSheetItem}>margin: externo</Text>
              <Text style={styles.cheatSheetItem}>padding: interno</Text>
              <Text style={styles.cheatSheetItem}>gap: entre elementos</Text>
              <Text style={styles.cheatSheetItem}>Vertical, Horizontal</Text>
            </View>
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
    marginBottom: 20,
  },
  demoContainer: {
    marginBottom: 24,
  },
  demoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  miniLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  flexDemo: {
    marginBottom: 16,
  },
  flexContainer: {
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 8,
    minHeight: 60,
  },
  flexItem: {
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  flexItemText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  smallFlexItem: {
    width: 40,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallFlexText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  variableFlexItem: {
    width: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  positionDemo: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 16,
  },
  relativeContainer: {
    padding: 16,
  },
  positionItem: {
    padding: 12,
    borderRadius: 6,
    marginVertical: 4,
    alignItems: 'center',
  },
  positionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  absoluteContainer: {
    height: 150,
    position: 'relative',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  absoluteItem: {
    position: 'absolute',
    padding: 8,
    borderRadius: 4,
    minWidth: 80,
    alignItems: 'center',
  },
  centered: {
    top: '50%',
    left: '50%',
    transform: [{ translateX: -40 }, { translateY: -15 }],
  },
  zIndexContainer: {
    height: 120,
    position: 'relative',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  zIndexItem: {
    position: 'absolute',
    width: 80,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zIndexText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
  },
  overlayDemo: {
    height: 100,
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  overlayContent: {
    flex: 1,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayContentText: {
    fontSize: 16,
    color: '#1976D2',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dimensionsDemo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  fixedBox: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  percentageContainer: {
    gap: 8,
    marginBottom: 16,
  },
  percentageBox: {
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  minMaxDemo: {
    gap: 12,
    marginBottom: 16,
  },
  minMaxBox: {
    height: 60,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  dynamicDemo: {
    gap: 8,
    marginBottom: 16,
  },
  dynamicBox: {
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aspectRatioDemo: {
    gap: 8,
  },
  aspectRatioBox: {
    width: 100,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacingDemo: {
    marginBottom: 16,
  },
  spacingContainer: {
    gap: 16,
  },
  paddingBox: {
    borderRadius: 8,
  },
  paddingContent: {
    backgroundColor: '#fff',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  spacingText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  marginContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
  },
  marginBox: {
    backgroundColor: 'currentColor',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  combinedDemo: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
  },
  combinedContainer: {
    alignItems: 'center',
  },
  combinedBox: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#333',
    borderStyle: 'dashed',
  },
  combinedContent: {
    backgroundColor: '#fff',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  gapDemo: {
    marginBottom: 16,
  },
  gapContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  gapItem: {
    flex: 1,
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gapText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  codeSection: {
    marginTop: 20,
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
    fontSize: 11,
    color: '#a0aec0',
    lineHeight: 16,
  },
  cheatSheetSection: {
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
  cheatSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  cheatSheetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  cheatSheetCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  cheatSheetCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cheatSheetItem: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
});

export default LayoutStylesExample;

