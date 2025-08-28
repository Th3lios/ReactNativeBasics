import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TouchableOpacityExample = () => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const showAlert = (message: string) => {
    Alert.alert('TouchableOpacity', message);
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.title}>TouchableOpacity Component</Text>
          <Text style={styles.description}>
            TouchableOpacity es un wrapper que responde a toques disminuyendo 
            la opacidad del elemento hijo. Proporciona retroalimentación visual 
            inmediata al usuario.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TouchableOpacity Básico</Text>
          <TouchableOpacity
            style={styles.basicButton}
            onPress={() => showAlert('TouchableOpacity básico presionado!')}
            activeOpacity={0.7}>
            <Text style={styles.buttonText}>Presiona aquí</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diferentes Valores de Opacidad</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.opacityButton}
              activeOpacity={0.9}
              onPress={() => showAlert('Opacidad 0.9 - Sutil')}>
              <Text style={styles.buttonText}>Opacidad 0.9 (Sutil)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.opacityButton}
              activeOpacity={0.7}
              onPress={() => showAlert('Opacidad 0.7 - Por defecto')}>
              <Text style={styles.buttonText}>Opacidad 0.7 (Default)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.opacityButton}
              activeOpacity={0.3}
              onPress={() => showAlert('Opacidad 0.3 - Dramático')}>
              <Text style={styles.buttonText}>Opacidad 0.3 (Dramático)</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Botón de Me Gusta</Text>
          <View style={styles.likeContainer}>
            <TouchableOpacity
              style={[styles.likeButton, isLiked && styles.likedButton]}
              onPress={handleLike}
              activeOpacity={0.8}>
              <Text style={styles.likeIcon}>{isLiked ? '❤️' : '🤍'}</Text>
              <Text style={[styles.likeText, isLiked && styles.likedText]}>
                {likes} Me gusta
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Botones con Iconos</Text>
          <View style={styles.iconButtonsContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => showAlert('Compartir presionado')}
              activeOpacity={0.6}>
              <Text style={styles.icon}>📤</Text>
              <Text style={styles.iconLabel}>Compartir</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => showAlert('Configurar presionado')}
              activeOpacity={0.6}>
              <Text style={styles.icon}>⚙️</Text>
              <Text style={styles.iconLabel}>Config</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => showAlert('Eliminar presionado')}
              activeOpacity={0.6}>
              <Text style={styles.icon}>🗑️</Text>
              <Text style={styles.iconLabel}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Botones de Navegación</Text>
          <View style={styles.navButtonsContainer}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => showAlert('Ir al perfil')}
              activeOpacity={0.8}>
              <Text style={styles.navIcon}>👤</Text>
              <View style={styles.navTextContainer}>
                <Text style={styles.navTitle}>Mi Perfil</Text>
                <Text style={styles.navSubtitle}>Ver y editar información</Text>
              </View>
              <Text style={styles.navArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navButton}
              onPress={() => showAlert('Ir a configuración')}
              activeOpacity={0.8}>
              <Text style={styles.navIcon}>⚙️</Text>
              <View style={styles.navTextContainer}>
                <Text style={styles.navTitle}>Configuración</Text>
                <Text style={styles.navSubtitle}>Ajustes de la aplicación</Text>
              </View>
              <Text style={styles.navArrow}>→</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TouchableOpacity Deshabilitado</Text>
          <TouchableOpacity
            style={styles.disabledButton}
            disabled={true}
            onPress={() => showAlert('No debería funcionar')}>
            <Text style={styles.disabledText}>Botón Deshabilitado</Text>
          </TouchableOpacity>
          <Text style={styles.note}>
            Cuando está deshabilitado, no responde a toques y mantiene su opacidad normal.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Propiedades Principales</Text>
          <Text style={styles.properties}>
            • activeOpacity: Opacidad cuando está presionado (0-1){'\n'}
            • onPress: Función ejecutada al tocar{'\n'}
            • onPressIn/onPressOut: Eventos inicio/fin de toque{'\n'}
            • onLongPress: Presión larga{'\n'}
            • disabled: Deshabilita el componente{'\n'}
            • hitSlop: Extiende área táctil{'\n'}
            • delayPressIn: Retraso antes de mostrar estado presionado
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuándo Usar TouchableOpacity</Text>
          <Text style={styles.usage}>
            ✅ Botones simples con feedback visual{'\n'}
            ✅ Elementos que necesitan efecto de opacidad{'\n'}
            ✅ Cuando el diseño es simple{'\n\n'}
            ⚠️ Considera Pressable para mayor flexibilidad{'\n'}
            ⚠️ Limitado comparado con Pressable
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
  opacityButton: {
    backgroundColor: '#4caf50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  likeContainer: {
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  likedButton: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
  },
  likeIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  likeText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  likedText: {
    color: '#f44336',
  },
  iconButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconButton: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    minWidth: 80,
  },
  icon: {
    fontSize: 24,
    marginBottom: 8,
  },
  iconLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  navButtonsContainer: {
    gap: 8,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  navIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  navTextContainer: {
    flex: 1,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  navSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  navArrow: {
    fontSize: 20,
    color: '#007AFF',
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledText: {
    color: '#999',
    fontSize: 16,
    fontWeight: '600',
  },
  note: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
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

export default TouchableOpacityExample;
