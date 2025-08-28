import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UseLayoutEffectExample = () => {
  const [showComparison, setShowComparison] = useState(false);
  const [measurements, setMeasurements] = useState({ width: 0, height: 0 });
  const [useLayoutEffectTime, setUseLayoutEffectTime] = useState(0);
  const [useEffectTime, setUseEffectTime] = useState(0);
  
  const animatedValue = useRef(new Animated.Value(0)).current;
  const measuredViewRef = useRef<View>(null);

  // useLayoutEffect - se ejecuta síncronamente después de todas las mutaciones del DOM
  // pero ANTES de que el navegador pinte
  useLayoutEffect(() => {
    const startTime = Date.now();
    
    // Simular medición de layout
    if (measuredViewRef.current) {
      measuredViewRef.current.measure((x, y, width, height) => {
        setMeasurements({ width, height });
      });
    }
    
    const endTime = Date.now();
    setUseLayoutEffectTime(endTime - startTime);
    
    console.log('useLayoutEffect ejecutado - síncronamente antes del paint');
  }, [showComparison]);

  // useEffect - se ejecuta asíncronamente después de que el navegador pinta
  useEffect(() => {
    const startTime = Date.now();
    
    // Esto se ejecuta después del paint, puede causar parpadeo visual
    console.log('useEffect ejecutado - asíncronamente después del paint');
    
    const endTime = Date.now();
    setUseEffectTime(endTime - startTime);
  }, [showComparison]);

  // Ejemplo con animaciones - useLayoutEffect es mejor para animaciones síncronas
  useLayoutEffect(() => {
    if (showComparison) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showComparison]);

  const toggleComparison = () => {
    setShowComparison(!showComparison);
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.title}>useLayoutEffect Hook</Text>
          <Text style={styles.description}>
            useLayoutEffect funciona idénticamente a useEffect, pero se ejecuta 
            síncronamente después de todas las mutaciones del DOM. Es útil para 
            mediciones del DOM y prevenir parpadeos visuales.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diferencias con useEffect</Text>
          <View style={styles.comparisonContainer}>
            <View style={styles.comparisonCard}>
              <Text style={styles.comparisonTitle}>🔄 useEffect</Text>
              <Text style={styles.comparisonText}>
                • Asíncrono{'\n'}
                • Se ejecuta después del paint{'\n'}
                • No bloquea el render{'\n'}
                • Puede causar parpadeo visual{'\n'}
                • Mejor para efectos secundarios generales
              </Text>
            </View>
            
            <View style={styles.comparisonCard}>
              <Text style={styles.comparisonTitle}>⚡ useLayoutEffect</Text>
              <Text style={styles.comparisonText}>
                • Síncrono{'\n'}
                • Se ejecuta antes del paint{'\n'}
                • Puede bloquear el render{'\n'}
                • Previene parpadeo visual{'\n'}
                • Mejor para mediciones del DOM
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejemplo: Medición de Componente</Text>
          <View style={styles.exampleContainer}>
            <Pressable style={styles.toggleButton} onPress={toggleComparison}>
              <Text style={styles.toggleButtonText}>
                {showComparison ? 'Ocultar' : 'Mostrar'} Mediciones
              </Text>
            </Pressable>

            {showComparison && (
              <Animated.View 
                ref={measuredViewRef}
                style={[
                  styles.measuredView,
                  {
                    opacity: animatedValue,
                    transform: [{
                      translateY: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    }],
                  }
                ]}>
                <Text style={styles.measuredViewText}>
                  📏 Vista medida con useLayoutEffect
                </Text>
                <Text style={styles.measurementText}>
                  Ancho: {measurements.width.toFixed(2)}px
                </Text>
                <Text style={styles.measurementText}>
                  Alto: {measurements.height.toFixed(2)}px
                </Text>
              </Animated.View>
            )}
          </View>
          
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              useLayoutEffect(() => {'{'}{'\n'}
              {'  '}if (measuredViewRef.current) {'{'}{'\n'}
              {'    '}measuredViewRef.current.measure((x, y, width, height) => {'{'}{'\n'}
              {'      '}setMeasurements({'{'} width, height {'}'});{'\n'}
              {'    '}{'}'});{'\n'}
              {'  }'}{'}'}{'\n'}
              {'}'}, [showComparison]);
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timing Comparison</Text>
          <View style={styles.timingContainer}>
            <View style={styles.timingCard}>
              <Text style={styles.timingTitle}>useLayoutEffect</Text>
              <Text style={styles.timingValue}>{useLayoutEffectTime.toFixed(3)}ms</Text>
              <Text style={styles.timingLabel}>Tiempo de ejecución</Text>
            </View>
            
            <View style={styles.timingCard}>
              <Text style={styles.timingTitle}>useEffect</Text>
              <Text style={styles.timingValue}>{useEffectTime.toFixed(3)}ms</Text>
              <Text style={styles.timingLabel}>Tiempo de ejecución</Text>
            </View>
          </View>
          <Text style={styles.timingNote}>
            * useLayoutEffect puede ser más lento porque bloquea el paint
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuándo Usar useLayoutEffect</Text>
          <View style={styles.useCasesContainer}>
            <View style={styles.useCaseCard}>
              <Text style={styles.useCaseIcon}>✅</Text>
              <Text style={styles.useCaseTitle}>Usar cuando:</Text>
              <Text style={styles.useCaseText}>
                • Necesitas medir elementos del DOM{'\n'}
                • Quieres evitar parpadeo visual{'\n'}
                • Necesitas mutaciones síncronas del DOM{'\n'}
                • Calculas posiciones para tooltips o modales{'\n'}
                • Ajustas el layout basado en mediciones
              </Text>
            </View>

            <View style={styles.useCaseCard}>
              <Text style={styles.useCaseIcon}>❌</Text>
              <Text style={styles.useCaseTitle}>Evitar cuando:</Text>
              <Text style={styles.useCaseText}>
                • Realizas llamadas a APIs{'\n'}
                • Actualizas estado sin afectar el layout{'\n'}
                • Tienes efectos secundarios pesados{'\n'}
                • No necesitas sincronización con el render{'\n'}
                • Trabajas con subscripciones
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejemplo Práctico: Tooltip Positioning</Text>
          <View style={styles.tooltipExample}>
            <TooltipComponent />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sintaxis</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
              import {'{'} useLayoutEffect {'}'} from 'react';{'\n\n'}
              
              // Idéntica a useEffect en sintaxis{'\n'}
              useLayoutEffect(() => {'{'}{'\n'}
              {'  '}// código que se ejecuta síncronamente{'\n'}
              {'  '}// antes de que el navegador pinte{'\n\n'}
              {'  '}return () => {'{'}{'\n'}
              {'    '}// función de limpieza (opcional){'\n'}
              {'  }'}{'}'}{'\n'}
              {'}'}, [dependencies]); // array de dependencias
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mejores Prácticas</Text>
          <Text style={styles.bestPractices}>
            ✅ Úsalo solo cuando realmente necesites sincronización{'\n'}
            ✅ Prefiere useEffect para la mayoría de casos{'\n'}
            ✅ Ideal para mediciones de DOM y posicionamiento{'\n'}
            ✅ Perfecto para prevenir layout shift{'\n\n'}
            ⚠️ Puede afectar el rendimiento si se abusa{'\n'}
            ⚠️ Bloquea el paint del navegador{'\n'}
            ⚠️ No usar para efectos secundarios pesados{'\n'}
            ⚠️ Evitar para llamadas a APIs o timers
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Componente de ejemplo para tooltip
const TooltipComponent = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<View>(null);

  useLayoutEffect(() => {
    if (showTooltip && buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        setTooltipPosition({
          top: pageY - 40, // Posicionar arriba del botón
          left: pageX + width / 2 - 50, // Centrar horizontalmente
        });
      });
    }
  }, [showTooltip]);

  return (
    <View style={styles.tooltipContainer}>
      <Pressable
        ref={buttonRef}
        style={styles.tooltipButton}
        onPress={() => setShowTooltip(!showTooltip)}>
        <Text style={styles.tooltipButtonText}>
          {showTooltip ? 'Ocultar' : 'Mostrar'} Tooltip
        </Text>
      </Pressable>

      {showTooltip && (
        <View style={[styles.tooltip, { top: tooltipPosition.top, left: tooltipPosition.left }]}>
          <Text style={styles.tooltipText}>¡Posicionado con useLayoutEffect!</Text>
        </View>
      )}
    </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 12,
  },
  comparisonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  comparisonCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  comparisonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  comparisonText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  exampleContainer: {
    marginVertical: 8,
  },
  toggleButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  measuredView: {
    backgroundColor: '#e3f2fd',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2196f3',
  },
  measuredViewText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 12,
  },
  measurementText: {
    fontSize: 16,
    color: '#1976d2',
    marginBottom: 4,
  },
  timingContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  timingCard: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  timingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  timingValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  timingLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  timingNote: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  useCasesContainer: {
    gap: 12,
  },
  useCaseCard: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  useCaseIcon: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  useCaseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    minWidth: 100,
  },
  useCaseText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    flex: 1,
  },
  tooltipExample: {
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 20,
  },
  tooltipContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  tooltipButton: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  tooltipButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    width: 100,
    alignItems: 'center',
  },
  tooltipText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  codeContainer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
    marginTop: 8,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
  bestPractices: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
  },
});

export default UseLayoutEffectExample;
