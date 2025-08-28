import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ButtonExample = () => {
  const [counter, setCounter] = useState(0);

  const showAlert = (message: string) => {
    Alert.alert('Botón Presionado', message);
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.title}>Button Component</Text>
          <Text style={styles.description}>
            El componente Button es un botón básico del sistema. Es simple y 
            consistente en todas las plataformas, pero con opciones limitadas 
            de personalización.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Botón Básico</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Presiona aquí"
              onPress={() => showAlert('Botón básico presionado!')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Botones con Diferentes Colores</Text>
          <View style={styles.buttonGroup}>
            <View style={styles.buttonWrapper}>
              <Button
                title="Azul"
                color="#2196f3"
                onPress={() => showAlert('Botón azul presionado!')}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Verde"
                color="#4caf50"
                onPress={() => showAlert('Botón verde presionado!')}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Rojo"
                color="#f44336"
                onPress={() => showAlert('Botón rojo presionado!')}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Botón Deshabilitado</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Botón deshabilitado"
              disabled={true}
              onPress={() => showAlert('Este botón no debería funcionar')}
            />
          </View>
          <Text style={styles.note}>
            Los botones deshabilitados no responden a toques y se muestran 
            con una apariencia atenuada.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contador Interactivo</Text>
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>Contador: {counter}</Text>
            <View style={styles.counterButtons}>
              <View style={styles.counterButton}>
                <Button
                  title="- 1"
                  color="#ff9800"
                  onPress={() => setCounter(counter - 1)}
                />
              </View>
              <View style={styles.counterButton}>
                <Button
                  title="Reset"
                  color="#9e9e9e"
                  onPress={() => setCounter(0)}
                />
              </View>
              <View style={styles.counterButton}>
                <Button
                  title="+ 1"
                  color="#4caf50"
                  onPress={() => setCounter(counter + 1)}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diferentes Acciones</Text>
          <View style={styles.buttonGroup}>
            <View style={styles.buttonWrapper}>
              <Button
                title="Guardar"
                color="#4caf50"
                onPress={() => showAlert('Datos guardados correctamente')}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Cancelar"
                color="#f44336"
                onPress={() => showAlert('Operación cancelada')}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Compartir"
                color="#2196f3"
                onPress={() => showAlert('Compartiendo contenido...')}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Propiedades del Button</Text>
          <Text style={styles.properties}>
            • title: Texto mostrado en el botón{'\n'}
            • onPress: Función ejecutada al presionar{'\n'}
            • color: Color del botón (limitado){'\n'}
            • disabled: Deshabilita el botón{'\n'}
            • accessibilityLabel: Etiqueta para accesibilidad{'\n'}
            • testID: Identificador para testing
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Limitaciones del Button</Text>
          <Text style={styles.limitations}>
            ❌ Personalización limitada de estilos{'\n'}
            ❌ No se puede cambiar tamaño o forma{'\n'}
            ❌ Opciones de color limitadas{'\n'}
            ❌ No permite iconos o contenido personalizado{'\n\n'}
            💡 Para mayor flexibilidad, usa Pressable o TouchableOpacity
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
  buttonContainer: {
    marginVertical: 8,
  },
  buttonGroup: {
    gap: 12,
  },
  buttonWrapper: {
    marginVertical: 6,
  },
  note: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 8,
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
  counterButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  counterButton: {
    minWidth: 80,
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
  limitations: {
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

export default ButtonExample;
