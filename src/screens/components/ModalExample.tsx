import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ModalExample = () => {
  const [simpleModalVisible, setSimpleModalVisible] = useState(false);
  const [animatedModalVisible, setAnimatedModalVisible] = useState(false);
  const [fullScreenModalVisible, setFullScreenModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const showAlert = (message: string) => {
    Alert.alert('Acción Completada', message);
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.title}>Modal Component</Text>
          <Text style={styles.description}>
            Modal presenta contenido sobre una vista existente. Es útil para 
            alertas, formularios, configuraciones o cualquier contenido que 
            requiera atención completa del usuario.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modal Simple</Text>
          <Pressable
            style={styles.triggerButton}
            onPress={() => setSimpleModalVisible(true)}>
            <Text style={styles.triggerButtonText}>Abrir Modal Simple</Text>
          </Pressable>
          
          <Modal
            animationType="none"
            transparent={true}
            visible={simpleModalVisible}
            onRequestClose={() => setSimpleModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.simpleModalContainer}>
                <Text style={styles.modalTitle}>Modal Simple</Text>
                <Text style={styles.modalText}>
                  Este es un modal básico sin animaciones. Presiona fuera 
                  del modal o el botón cerrar para cerrarlo.
                </Text>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setSimpleModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modal con Animación</Text>
          <Pressable
            style={styles.triggerButton}
            onPress={() => setAnimatedModalVisible(true)}>
            <Text style={styles.triggerButtonText}>Abrir Modal Animado</Text>
          </Pressable>
          
          <Modal
            animationType="slide"
            transparent={true}
            visible={animatedModalVisible}
            onRequestClose={() => setAnimatedModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.animatedModalContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Modal Animado</Text>
                  <Pressable
                    style={styles.headerCloseButton}
                    onPress={() => setAnimatedModalVisible(false)}>
                    <Text style={styles.headerCloseText}>✕</Text>
                  </Pressable>
                </View>
                <Text style={styles.modalText}>
                  Este modal aparece con una animación de deslizamiento. 
                  Incluye un header con botón de cierre y contenido personalizado.
                </Text>
                <View style={styles.modalActions}>
                  <Pressable
                    style={styles.secondaryButton}
                    onPress={() => setAnimatedModalVisible(false)}>
                    <Text style={styles.secondaryButtonText}>Cancelar</Text>
                  </Pressable>
                  <Pressable
                    style={styles.primaryButton}
                    onPress={() => {
                      setAnimatedModalVisible(false);
                      showAlert('Acción confirmada');
                    }}>
                    <Text style={styles.primaryButtonText}>Confirmar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modal Pantalla Completa</Text>
          <Pressable
            style={styles.triggerButton}
            onPress={() => setFullScreenModalVisible(true)}>
            <Text style={styles.triggerButtonText}>Abrir Pantalla Completa</Text>
          </Pressable>
          
          <Modal
            animationType="fade"
            transparent={false}
            visible={fullScreenModalVisible}
            onRequestClose={() => setFullScreenModalVisible(false)}>
            <SafeAreaView style={styles.fullScreenModal}>
              <View style={styles.fullScreenHeader}>
                <Text style={styles.fullScreenTitle}>Pantalla Completa</Text>
                <Pressable
                  style={styles.fullScreenCloseButton}
                  onPress={() => setFullScreenModalVisible(false)}>
                  <Text style={styles.fullScreenCloseText}>Cerrar</Text>
                </Pressable>
              </View>
              <ScrollView style={styles.fullScreenContent}>
                <Text style={styles.fullScreenText}>
                  Este es un modal de pantalla completa que no es transparente. 
                  Ocupa toda la pantalla y puede contener cualquier tipo de contenido.
                </Text>
                <View style={styles.featureList}>
                  <Text style={styles.featureItem}>✅ Pantalla completa</Text>
                  <Text style={styles.featureItem}>✅ Navegación independiente</Text>
                  <Text style={styles.featureItem}>✅ Contenido complejo</Text>
                  <Text style={styles.featureItem}>✅ ScrollView integrado</Text>
                </View>
                <View style={styles.fullScreenActions}>
                  <Pressable
                    style={styles.fullScreenActionButton}
                    onPress={() => showAlert('Configuración guardada')}>
                    <Text style={styles.fullScreenActionText}>Guardar Cambios</Text>
                  </Pressable>
                </View>
              </ScrollView>
            </SafeAreaView>
          </Modal>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modal de Confirmación</Text>
          <Pressable
            style={styles.dangerButton}
            onPress={() => setConfirmModalVisible(true)}>
            <Text style={styles.dangerButtonText}>Eliminar Elemento</Text>
          </Pressable>
          
          <Modal
            animationType="fade"
            transparent={true}
            visible={confirmModalVisible}
            onRequestClose={() => setConfirmModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.confirmModalContainer}>
                <Text style={styles.confirmIcon}>⚠️</Text>
                <Text style={styles.confirmTitle}>¿Estás seguro?</Text>
                <Text style={styles.confirmText}>
                  Esta acción no se puede deshacer. El elemento será eliminado permanentemente.
                </Text>
                <View style={styles.confirmActions}>
                  <Pressable
                    style={styles.cancelButton}
                    onPress={() => setConfirmModalVisible(false)}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                  </Pressable>
                  <Pressable
                    style={styles.deleteButton}
                    onPress={() => {
                      setConfirmModalVisible(false);
                      showAlert('Elemento eliminado');
                    }}>
                    <Text style={styles.deleteButtonText}>Eliminar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Propiedades del Modal</Text>
          <Text style={styles.properties}>
            • visible: Controla si el modal está visible{'\n'}
            • animationType: 'none', 'slide', 'fade'{'\n'}
            • transparent: Modal transparente o pantalla completa{'\n'}
            • onRequestClose: Callback al intentar cerrar (Android){'\n'}
            • onShow: Callback cuando el modal se muestra{'\n'}
            • onDismiss: Callback cuando el modal se cierra{'\n'}
            • presentationStyle: Estilo de presentación (iOS){'\n'}
            • supportedOrientations: Orientaciones soportadas
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mejores Prácticas</Text>
          <Text style={styles.bestPractices}>
            ✅ Siempre proporciona una forma de cerrar el modal{'\n'}
            ✅ Usa transparent={true} para overlays{'\n'}
            ✅ Implementa onRequestClose para Android{'\n'}
            ✅ Considera la accesibilidad{'\n'}
            ✅ Evita modales anidados{'\n\n'}
            ⚠️ Los modales interrumpen el flujo del usuario{'\n'}
            ⚠️ Úsalos solo cuando sea necesario
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
  triggerButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  triggerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dangerButton: {
    backgroundColor: '#f44336',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  dangerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  simpleModalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 12,
    alignItems: 'center',
    maxWidth: 300,
  },
  animatedModalContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    maxWidth: 350,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerCloseButton: {
    padding: 4,
  },
  headerCloseText: {
    fontSize: 18,
    color: '#666',
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    padding: 20,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    gap: 12,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  fullScreenModal: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  fullScreenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  fullScreenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  fullScreenCloseButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  fullScreenCloseText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  fullScreenContent: {
    flex: 1,
    padding: 20,
  },
  fullScreenText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  featureList: {
    backgroundColor: '#e8f5e8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  featureItem: {
    fontSize: 16,
    color: '#2e7d32',
    marginBottom: 8,
  },
  fullScreenActions: {
    marginTop: 20,
  },
  fullScreenActionButton: {
    backgroundColor: '#4caf50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  fullScreenActionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmModalContainer: {
    backgroundColor: '#fff',
    padding: 24,
    margin: 20,
    borderRadius: 12,
    alignItems: 'center',
    maxWidth: 320,
  },
  confirmIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  confirmTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  confirmText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  confirmActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  deleteButtonText: {
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
  bestPractices: {
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

export default ModalExample;
