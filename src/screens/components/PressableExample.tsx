import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PressableExample = () => {
  const [pressCount, setPressCount] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  const showAlert = (message: string) => {
    Alert.alert('Pressable', message);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.title}>Pressable Component</Text>
          <Text style={styles.description}>
            Pressable es un componente altamente personalizable que detecta 
            diferentes estados de presión. Reemplaza a TouchableOpacity, 
            TouchableHighlight y TouchableWithoutFeedback.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pressable Básico</Text>
          <Pressable
            style={styles.basicPressable}
            onPress={() => showAlert('Pressable básico presionado!')}>
            <Text style={styles.pressableText}>Presiona aquí</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estados de Presión</Text>
          <Pressable
            style={({ pressed }) => [
              styles.statePressable,
              pressed && styles.pressedState
            ]}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={() => showAlert('Estado de presión detectado!')}>
            <Text style={styles.pressableText}>
              {isPressed ? '🔥 Presionado' : '👆 Presiona aquí'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contador de Presiones</Text>
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>Presiones: {pressCount}</Text>
            <Pressable
              style={styles.counterPressable}
              onPress={() => setPressCount(pressCount + 1)}
              android_ripple={{ color: '#ffffff50' }}>
              <Text style={styles.counterButtonText}>+ Incrementar</Text>
            </Pressable>
            <Pressable
              style={styles.resetPressable}
              onPress={() => setPressCount(0)}>
              <Text style={styles.resetButtonText}>🔄 Reset</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diferentes Estilos</Text>
          <View style={styles.buttonGroup}>
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.primaryPressed
              ]}
              onPress={() => showAlert('Botón primario presionado!')}>
              <Text style={styles.primaryButtonText}>Primario</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.secondaryButton,
                pressed && styles.secondaryPressed
              ]}
              onPress={() => showAlert('Botón secundario presionado!')}>
              <Text style={styles.secondaryButtonText}>Secundario</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.outlineButton,
                pressed && styles.outlinePressed
              ]}
              onPress={() => showAlert('Botón outline presionado!')}>
              <Text style={styles.outlineButtonText}>Outline</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Presión Larga</Text>
          <Pressable
            style={styles.longPressPressable}
            onLongPress={() => showAlert('¡Presión larga detectada!')}
            delayLongPress={1000}>
            <Text style={styles.longPressText}>
              Mantén presionado por 1 segundo
            </Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Área de Presión Extendida</Text>
          <Pressable
            style={styles.hitSlopPressable}
            hitSlop={20}
            pressRetentionOffset={20}
            onPress={() => showAlert('Área extendida funciona!')}>
            <Text style={styles.hitSlopText}>
              Área táctil extendida (+20px)
            </Text>
          </Pressable>
          <Text style={styles.note}>
            El área táctil es más grande que el elemento visual
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Propiedades Principales</Text>
          <Text style={styles.properties}>
            • onPress: Presión simple{'\n'}
            • onLongPress: Presión larga{'\n'}
            • onPressIn/onPressOut: Inicio/fin de presión{'\n'}
            • hitSlop: Extiende área táctil{'\n'}
            • pressRetentionOffset: Mantiene presión al salir{'\n'}
            • delayLongPress: Tiempo para presión larga{'\n'}
            • disabled: Deshabilita interacciones{'\n'}
            • android_ripple: Efecto ripple en Android
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ventajas de Pressable</Text>
          <Text style={styles.advantages}>
            ✅ Altamente personalizable{'\n'}
            ✅ Mejor rendimiento{'\n'}
            ✅ Estados de presión dinámicos{'\n'}
            ✅ Soporte para presión larga{'\n'}
            ✅ Control de área táctil{'\n'}
            ✅ Efectos de plataforma nativos{'\n'}
            ✅ Reemplaza múltiples componentes TouchableX
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
  section: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 16,
    borderRadius: 12,
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
  basicPressable: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  pressableText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statePressable: {
    backgroundColor: '#4caf50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  pressedState: {
    backgroundColor: '#2e7d32',
    transform: [{ scale: 0.98 }],
  },
  counterContainer: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  counterText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  counterPressable: {
    backgroundColor: '#2196f3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 8,
  },
  counterButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resetPressable: {
    backgroundColor: '#ff9800',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  buttonGroup: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryPressed: {
    backgroundColor: '#0056cc',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryPressed: {
    backgroundColor: '#545b62',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  outlinePressed: {
    backgroundColor: '#e3f2fd',
  },
  outlineButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  longPressPressable: {
    backgroundColor: '#9c27b0',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  longPressText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  hitSlopPressable: {
    backgroundColor: '#ff5722',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    alignSelf: 'center',
  },
  hitSlopText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  note: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
  properties: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    fontFamily: 'monospace',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
  },
  advantages: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    backgroundColor: '#e8f5e8',
    padding: 12,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
});

export default PressableExample;
