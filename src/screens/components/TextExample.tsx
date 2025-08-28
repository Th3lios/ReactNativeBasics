import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TextExample = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.title}>Text Component</Text>
          <Text style={styles.description}>
            El componente Text se usa para mostrar texto. Soporta anidación, 
            estilos y eventos táctiles. Es el único componente que puede 
            contener texto directamente.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tamaños de Texto</Text>
          <Text style={styles.smallText}>Texto pequeño (12px)</Text>
          <Text style={styles.mediumText}>Texto mediano (16px)</Text>
          <Text style={styles.largeText}>Texto grande (24px)</Text>
          <Text style={styles.extraLargeText}>Texto extra grande (32px)</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pesos de Fuente</Text>
          <Text style={styles.normalWeight}>Texto normal</Text>
          <Text style={styles.boldWeight}>Texto en negrita</Text>
          <Text style={styles.lightWeight}>Texto ligero</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Colores</Text>
          <Text style={styles.redText}>Texto rojo</Text>
          <Text style={styles.blueText}>Texto azul</Text>
          <Text style={styles.greenText}>Texto verde</Text>
          <Text style={styles.purpleText}>Texto púrpura</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alineación</Text>
          <Text style={styles.leftAlign}>Alineado a la izquierda</Text>
          <Text style={styles.centerAlign}>Alineado al centro</Text>
          <Text style={styles.rightAlign}>Alineado a la derecha</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Decoraciones</Text>
          <Text style={styles.underlineText}>Texto subrayado</Text>
          <Text style={styles.strikethroughText}>Texto tachado</Text>
          <Text style={styles.italicText}>Texto en cursiva</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Texto Anidado</Text>
          <Text style={styles.nestedText}>
            Este es un texto que contiene{' '}
            <Text style={styles.nestedHighlight}>texto resaltado</Text>
            {' '}y también{' '}
            <Text style={styles.nestedBold}>texto en negrita</Text>
            {' '}dentro del mismo componente.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Texto con Límite de Líneas</Text>
          <Text style={styles.limitedText} numberOfLines={2}>
            Este es un texto muy largo que será truncado después de dos líneas. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Propiedades Clave</Text>
          <Text style={styles.properties}>
            • numberOfLines: Limita líneas mostradas{'\n'}
            • ellipsizeMode: Cómo truncar texto{'\n'}
            • selectable: Permite seleccionar texto{'\n'}
            • adjustsFontSizeToFit: Ajusta tamaño automáticamente{'\n'}
            • onPress: Maneja eventos de toque
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
  smallText: {
    fontSize: 12,
    marginVertical: 4,
  },
  mediumText: {
    fontSize: 16,
    marginVertical: 4,
  },
  largeText: {
    fontSize: 24,
    marginVertical: 4,
  },
  extraLargeText: {
    fontSize: 32,
    marginVertical: 4,
  },
  normalWeight: {
    fontWeight: 'normal',
    marginVertical: 4,
  },
  boldWeight: {
    fontWeight: 'bold',
    marginVertical: 4,
  },
  lightWeight: {
    fontWeight: '300',
    marginVertical: 4,
  },
  redText: {
    color: '#f44336',
    marginVertical: 4,
  },
  blueText: {
    color: '#2196f3',
    marginVertical: 4,
  },
  greenText: {
    color: '#4caf50',
    marginVertical: 4,
  },
  purpleText: {
    color: '#9c27b0',
    marginVertical: 4,
  },
  leftAlign: {
    textAlign: 'left',
    marginVertical: 4,
  },
  centerAlign: {
    textAlign: 'center',
    marginVertical: 4,
  },
  rightAlign: {
    textAlign: 'right',
    marginVertical: 4,
  },
  underlineText: {
    textDecorationLine: 'underline',
    marginVertical: 4,
  },
  strikethroughText: {
    textDecorationLine: 'line-through',
    marginVertical: 4,
  },
  italicText: {
    fontStyle: 'italic',
    marginVertical: 4,
  },
  nestedText: {
    fontSize: 16,
    lineHeight: 24,
  },
  nestedHighlight: {
    backgroundColor: '#ffeb3b',
    padding: 2,
  },
  nestedBold: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  limitedText: {
    fontSize: 16,
    lineHeight: 22,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
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
});

export default TextExample;
