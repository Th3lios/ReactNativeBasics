import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TouchableHighlightExample = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [tapCount, setTapCount] = useState(0);

  const showAlert = (message: string) => {
    Alert.alert('TouchableHighlight', message);
  };

  const options = ['Opción A', 'Opción B', 'Opción C', 'Opción D'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.title}>TouchableHighlight Component</Text>
          <Text style={styles.description}>
            TouchableHighlight oscurece o colorea el fondo cuando se presiona. 
            Es útil para crear efectos de resaltado personalizados y se usa 
            comúnmente en listas y botones con feedback visual.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TouchableHighlight Básico</Text>
          <TouchableHighlight
            style={styles.basicButton}
            underlayColor="#0056cc"
            onPress={() => showAlert('TouchableHighlight básico presionado!')}>
            <Text style={styles.buttonText}>Presiona aquí</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diferentes Colores de Resaltado</Text>
          <View style={styles.buttonGroup}>
            <TouchableHighlight
              style={styles.colorButton1}
              underlayColor="#c62828"
              onPress={() => showAlert('Botón rojo presionado')}>
              <Text style={styles.buttonText}>Resaltado Rojo</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.colorButton2}
              underlayColor="#2e7d32"
              onPress={() => showAlert('Botón verde presionado')}>
              <Text style={styles.buttonText}>Resaltado Verde</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.colorButton3}
              underlayColor="#6a1b9a"
              onPress={() => showAlert('Botón púrpura presionado')}>
              <Text style={styles.buttonText}>Resaltado Púrpura</Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selector de Opciones</Text>
          <Text style={styles.selectedText}>
            Seleccionado: {selectedOption || 'Ninguno'}
          </Text>
          <View style={styles.optionsContainer}>
            {options.map((option) => (
              <TouchableHighlight
                key={option}
                style={[
                  styles.optionButton,
                  selectedOption === option && styles.selectedOption
                ]}
                underlayColor="#e3f2fd"
                onPress={() => setSelectedOption(option)}>
                <Text style={[
                  styles.optionText,
                  selectedOption === option && styles.selectedOptionText
                ]}>
                  {option}
                </Text>
              </TouchableHighlight>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contador de Toques</Text>
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>Toques: {tapCount}</Text>
            <TouchableHighlight
              style={styles.counterButton}
              underlayColor="#1976d2"
              onPress={() => setTapCount(tapCount + 1)}>
              <Text style={styles.counterButtonText}>+ Tocar</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.resetButton}
              underlayColor="#d84315"
              onPress={() => setTapCount(0)}>
              <Text style={styles.resetButtonText}>🔄 Reset</Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lista de Elementos</Text>
          <View style={styles.listContainer}>
            {['Elemento 1', 'Elemento 2', 'Elemento 3', 'Elemento 4'].map((item, index) => (
              <TouchableHighlight
                key={index}
                style={styles.listItem}
                underlayColor="#f0f0f0"
                onPress={() => showAlert(`${item} seleccionado`)}>
                <View style={styles.listItemContent}>
                  <Text style={styles.listItemIcon}>📄</Text>
                  <View style={styles.listItemText}>
                    <Text style={styles.listItemTitle}>{item}</Text>
                    <Text style={styles.listItemSubtitle}>
                      Descripción del {item.toLowerCase()}
                    </Text>
                  </View>
                  <Text style={styles.listItemArrow}>→</Text>
                </View>
              </TouchableHighlight>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Botones de Acción</Text>
          <View style={styles.actionButtonsContainer}>
            <TouchableHighlight
              style={styles.actionButton}
              underlayColor="#1b5e20"
              onPress={() => showAlert('Guardado exitoso')}>
              <View style={styles.actionButtonContent}>
                <Text style={styles.actionIcon}>💾</Text>
                <Text style={styles.actionText}>Guardar</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.actionButtonDanger}
              underlayColor="#b71c1c"
              onPress={() => showAlert('Elemento eliminado')}>
              <View style={styles.actionButtonContent}>
                <Text style={styles.actionIcon}>🗑️</Text>
                <Text style={styles.actionText}>Eliminar</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Propiedades Principales</Text>
          <Text style={styles.properties}>
            • underlayColor: Color de fondo cuando está presionado{'\n'}
            • onPress: Función ejecutada al tocar{'\n'}
            • onPressIn/onPressOut: Eventos inicio/fin de toque{'\n'}
            • onLongPress: Presión larga{'\n'}
            • activeOpacity: Opacidad cuando está activo{'\n'}
            • disabled: Deshabilita el componente{'\n'}
            • onShowUnderlay/onHideUnderlay: Callbacks del underlay
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuándo Usar TouchableHighlight</Text>
          <Text style={styles.usage}>
            ✅ Elementos de lista con feedback{'\n'}
            ✅ Botones que necesitan resaltado personalizado{'\n'}
            ✅ Cuando quieres cambiar el color de fondo{'\n\n'}
            ⚠️ Requiere un único elemento hijo{'\n'}
            ⚠️ Considera Pressable para mayor flexibilidad
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
  basicButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonGroup: {
    gap: 12,
  },
  colorButton1: {
    backgroundColor: '#f44336',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  colorButton2: {
    backgroundColor: '#4caf50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  colorButton3: {
    backgroundColor: '#9c27b0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 8,
  },
  optionButton: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedOption: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#2196f3',
    fontWeight: '600',
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
  counterButton: {
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
  resetButton: {
    backgroundColor: '#ff5722',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  listContainer: {
    gap: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  listItem: {
    backgroundColor: '#fff',
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  listItemIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  listItemText: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  listItemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  listItemArrow: {
    fontSize: 18,
    color: '#007AFF',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#4caf50',
    flex: 1,
    borderRadius: 8,
    padding: 16,
  },
  actionButtonDanger: {
    backgroundColor: '#f44336',
    flex: 1,
    borderRadius: 8,
    padding: 16,
  },
  actionButtonContent: {
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
  usage: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    backgroundColor: '#fff3e0',
    padding: 12,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800',
  },
});

export default TouchableHighlightExample;
