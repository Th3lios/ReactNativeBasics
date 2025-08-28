import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
  Alert,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet, { 
  BottomSheetView,
  BottomSheetScrollView,
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const ModalBottomSheetExample = () => {
  // State
  const [modalInfo, setModalInfo] = useState('Modal Bottom Sheets listos para usar');
  const [selectedAction, setSelectedAction] = useState('');
  const [showNativeModal, setShowNativeModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Refs
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const actionSheetRef = useRef<BottomSheetModal>(null);
  const formSheetRef = useRef<BottomSheetModal>(null);
  const confirmationSheetRef = useRef<BottomSheetModal>(null);

  // Snap points
  const modalSnapPoints = useMemo(() => ['50%', '90%'], []);
  const actionSnapPoints = useMemo(() => ['40%'], []);
  const formSnapPoints = useMemo(() => ['70%', '95%'], []);

  // Callbacks
  const handleModalChanges = useCallback((index: number) => {
    setModalInfo(
      index === -1 
        ? 'Modal Bottom Sheet cerrado' 
        : `Modal en posición ${index + 1}`
    );
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.6}
        pressBehavior="close"
      />
    ),
    []
  );

  // Modal Actions
  const openInfoModal = () => {
    bottomSheetModalRef.current?.present();
  };

  const openActionSheet = () => {
    actionSheetRef.current?.present();
  };

  const openFormModal = () => {
    formSheetRef.current?.present();
  };

  const openConfirmationModal = () => {
    confirmationSheetRef.current?.present();
  };

  const openNativeModal = () => {
    setShowNativeModal(true);
  };

  const handleActionSelect = (action: string) => {
    setSelectedAction(action);
    actionSheetRef.current?.dismiss();
    
    setTimeout(() => {
      Alert.alert('Acción Seleccionada', `Has seleccionado: ${action}`);
    }, 300);
  };

  const handleFormSubmit = () => {
    if (!formData.name || !formData.email) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }
    
    formSheetRef.current?.dismiss();
    setTimeout(() => {
      Alert.alert('Éxito', 'Formulario enviado correctamente');
      setFormData({ name: '', email: '', message: '' });
    }, 300);
  };

  const handleConfirmAction = () => {
    confirmationSheetRef.current?.dismiss();
    setTimeout(() => {
      Alert.alert('Confirmado', 'Acción ejecutada exitosamente');
    }, 300);
  };

  return (
    <BottomSheetModalProvider>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>Modal Bottom Sheet</Text>
                <Text style={styles.subtitle}>
                  Bottom sheets como modales con overlay completo
                </Text>
              </View>

              {/* Info Panel */}
              <View style={styles.infoPanel}>
                <Text style={styles.infoTitle}>🔲 Estado Actual:</Text>
                <Text style={styles.infoText}>{modalInfo}</Text>
                {selectedAction && (
                  <Text style={styles.infoDetail}>
                    Última acción: {selectedAction}
                  </Text>
                )}
              </View>

              {/* Modal Types */}
              <View style={styles.modalTypesSection}>
                <Text style={styles.sectionTitle}>Tipos de Modal Bottom Sheets</Text>
                
                <Pressable style={styles.modalButton} onPress={openInfoModal}>
                  <View style={styles.modalButtonContent}>
                    <Text style={styles.modalButtonIcon}>📋</Text>
                    <View style={styles.modalButtonInfo}>
                      <Text style={styles.modalButtonTitle}>Información Modal</Text>
                      <Text style={styles.modalButtonDesc}>Modal básico con información y contenido scrollable</Text>
                    </View>
                    <Text style={styles.modalButtonArrow}>→</Text>
                  </View>
                </Pressable>

                <Pressable style={styles.modalButton} onPress={openActionSheet}>
                  <View style={styles.modalButtonContent}>
                    <Text style={styles.modalButtonIcon}>⚡</Text>
                    <View style={styles.modalButtonInfo}>
                      <Text style={styles.modalButtonTitle}>Action Sheet</Text>
                      <Text style={styles.modalButtonDesc}>Lista de acciones para seleccionar</Text>
                    </View>
                    <Text style={styles.modalButtonArrow}>→</Text>
                  </View>
                </Pressable>

                <Pressable style={styles.modalButton} onPress={openFormModal}>
                  <View style={styles.modalButtonContent}>
                    <Text style={styles.modalButtonIcon}>📝</Text>
                    <View style={styles.modalButtonInfo}>
                      <Text style={styles.modalButtonTitle}>Formulario Modal</Text>
                      <Text style={styles.modalButtonDesc}>Modal con formulario y validación</Text>
                    </View>
                    <Text style={styles.modalButtonArrow}>→</Text>
                  </View>
                </Pressable>

                <Pressable style={styles.modalButton} onPress={openConfirmationModal}>
                  <View style={styles.modalButtonContent}>
                    <Text style={styles.modalButtonIcon}>⚠️</Text>
                    <View style={styles.modalButtonInfo}>
                      <Text style={styles.modalButtonTitle}>Confirmación</Text>
                      <Text style={styles.modalButtonDesc}>Modal de confirmación con acciones</Text>
                    </View>
                    <Text style={styles.modalButtonArrow}>→</Text>
                  </View>
                </Pressable>

                <Pressable style={styles.modalButton} onPress={openNativeModal}>
                  <View style={styles.modalButtonContent}>
                    <Text style={styles.modalButtonIcon}>📱</Text>
                    <View style={styles.modalButtonInfo}>
                      <Text style={styles.modalButtonTitle}>Modal Nativo (Comparación)</Text>
                      <Text style={styles.modalButtonDesc}>Modal nativo de React Native para comparar</Text>
                    </View>
                    <Text style={styles.modalButtonArrow}>→</Text>
                  </View>
                </Pressable>
              </View>

              {/* Features */}
              <View style={styles.featuresSection}>
                <Text style={styles.featuresTitle}>🎯 Características de Modal Bottom Sheets</Text>
                <View style={styles.featuresList}>
                  <Text style={styles.featureItem}>🔲 Presentación modal completa</Text>
                  <Text style={styles.featureItem}>🌐 Overlay de pantalla completa</Text>
                  <Text style={styles.featureItem}>🎭 Animaciones de entrada/salida</Text>
                  <Text style={styles.featureItem}>📱 Mejor UX que modales nativos</Text>
                  <Text style={styles.featureItem}>⌨️ Keyboard handling automático</Text>
                  <Text style={styles.featureItem}>🎨 Personalización completa</Text>
                </View>
              </View>

              {/* Code Example */}
              <View style={styles.codeSection}>
                <Text style={styles.codeTitle}>💡 Código de Ejemplo</Text>
                <View style={styles.codeBlock}>
                  <Text style={styles.codeText}>{`// 1. Setup Provider
<BottomSheetModalProvider>
  <App />
</BottomSheetModalProvider>

// 2. Create Modal Ref
const bottomSheetModalRef = useRef<BottomSheetModal>(null);

// 3. Present Modal
const openModal = () => {
  bottomSheetModalRef.current?.present();
};

// 4. Use BottomSheetModal
<BottomSheetModal
  ref={bottomSheetModalRef}
  snapPoints={['50%', '90%']}
  backdropComponent={renderBackdrop}>
  <BottomSheetView>
    <Text>Modal Content</Text>
  </BottomSheetView>
</BottomSheetModal>`}</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Info Modal */}
          <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={modalSnapPoints}
            onChange={handleModalChanges}
            backdropComponent={renderBackdrop}
            backgroundStyle={styles.modalBackground}>
            
            <BottomSheetScrollView contentContainerStyle={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>📋 Información Modal</Text>
                <Pressable 
                  style={styles.closeButton}
                  onPress={() => bottomSheetModalRef.current?.dismiss()}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </Pressable>
              </View>

              <View style={styles.modalBody}>
                <Text style={styles.modalText}>
                  Los Modal Bottom Sheets son ideales para presentar información 
                  de manera no invasiva, manteniendo el contexto de la pantalla principal.
                </Text>

                <View style={styles.infoCard}>
                  <Text style={styles.infoCardTitle}>Ventajas sobre Modales Nativos:</Text>
                  <Text style={styles.infoCardItem}>• Animaciones más fluidas</Text>
                  <Text style={styles.infoCardItem}>• Mejor integración con gestos</Text>
                  <Text style={styles.infoCardItem}>• Scroll natural y responsivo</Text>
                  <Text style={styles.infoCardItem}>• Personalización completa</Text>
                  <Text style={styles.infoCardItem}>• Mejor performance</Text>
                </View>

                <Text style={styles.modalText}>
                  Este modal bottom sheet puede contener cualquier tipo de contenido, 
                  desde información simple hasta formularios complejos, listas, 
                  imágenes y mucho más.
                </Text>
              </View>
            </BottomSheetScrollView>
          </BottomSheetModal>

          {/* Action Sheet Modal */}
          <BottomSheetModal
            ref={actionSheetRef}
            snapPoints={actionSnapPoints}
            backdropComponent={renderBackdrop}
            backgroundStyle={styles.modalBackground}>
            
            <BottomSheetView style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>⚡ Selecciona una Acción</Text>
              </View>

              <View style={styles.actionsList}>
                {[
                  { icon: '📸', title: 'Tomar Foto', action: 'camera' },
                  { icon: '🖼️', title: 'Seleccionar de Galería', action: 'gallery' },
                  { icon: '📁', title: 'Seleccionar Archivo', action: 'file' },
                  { icon: '🔗', title: 'Pegar desde Clipboard', action: 'paste' },
                ].map((item, index) => (
                  <Pressable
                    key={index}
                    style={styles.actionItem}
                    onPress={() => handleActionSelect(item.title)}>
                    <Text style={styles.actionIcon}>{item.icon}</Text>
                    <Text style={styles.actionTitle}>{item.title}</Text>
                  </Pressable>
                ))}
                
                <Pressable
                  style={[styles.actionItem, styles.cancelAction]}
                  onPress={() => actionSheetRef.current?.dismiss()}>
                  <Text style={styles.actionIcon}>❌</Text>
                  <Text style={[styles.actionTitle, styles.cancelActionText]}>Cancelar</Text>
                </Pressable>
              </View>
            </BottomSheetView>
          </BottomSheetModal>

          {/* Form Modal */}
          <BottomSheetModal
            ref={formSheetRef}
            snapPoints={formSnapPoints}
            backdropComponent={renderBackdrop}
            backgroundStyle={styles.modalBackground}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore">
            
            <BottomSheetView style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>📝 Formulario de Contacto</Text>
                <Pressable 
                  style={styles.closeButton}
                  onPress={() => formSheetRef.current?.dismiss()}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </Pressable>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Nombre *</Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.name}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                    placeholder="Ingresa tu nombre"
                    placeholderTextColor="#999"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email *</Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.email}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                    placeholder="tu@email.com"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Mensaje</Text>
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
                    value={formData.message}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, message: text }))}
                    placeholder="Escribe tu mensaje aquí..."
                    placeholderTextColor="#999"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>

                <Pressable style={styles.submitButton} onPress={handleFormSubmit}>
                  <Text style={styles.submitButtonText}>Enviar Formulario</Text>
                </Pressable>
              </View>
            </BottomSheetView>
          </BottomSheetModal>

          {/* Confirmation Modal */}
          <BottomSheetModal
            ref={confirmationSheetRef}
            snapPoints={['35%']}
            backdropComponent={renderBackdrop}
            backgroundStyle={styles.modalBackground}>
            
            <BottomSheetView style={styles.modalContent}>
              <View style={styles.confirmationContainer}>
                <Text style={styles.confirmationIcon}>⚠️</Text>
                <Text style={styles.confirmationTitle}>Confirmar Acción</Text>
                <Text style={styles.confirmationMessage}>
                  ¿Estás seguro de que quieres ejecutar esta acción? 
                  Esta operación no se puede deshacer.
                </Text>
                
                <View style={styles.confirmationActions}>
                  <Pressable 
                    style={[styles.confirmationButton, styles.cancelButton]}
                    onPress={() => confirmationSheetRef.current?.dismiss()}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                  </Pressable>
                  <Pressable 
                    style={[styles.confirmationButton, styles.confirmButton]}
                    onPress={handleConfirmAction}>
                    <Text style={styles.confirmButtonText}>Confirmar</Text>
                  </Pressable>
                </View>
              </View>
            </BottomSheetView>
          </BottomSheetModal>

          {/* Native Modal for Comparison */}
          <Modal
            visible={showNativeModal}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={() => setShowNativeModal(false)}>
            <SafeAreaView style={styles.nativeModalContainer}>
              <View style={styles.nativeModalHeader}>
                <Text style={styles.nativeModalTitle}>Modal Nativo</Text>
                <Pressable 
                  style={styles.nativeModalClose}
                  onPress={() => setShowNativeModal(false)}>
                  <Text style={styles.nativeModalCloseText}>Cerrar</Text>
                </Pressable>
              </View>
              <View style={styles.nativeModalContent}>
                <Text style={styles.nativeModalText}>
                  Este es un modal nativo de React Native para comparación. 
                  Observa las diferencias en animaciones, gestos y UX.
                </Text>
                <Text style={styles.nativeModalNote}>
                  Los Bottom Sheet Modals ofrecen:
                  {'\n'}• Mejores animaciones
                  {'\n'}• Gestos más naturales
                  {'\n'}• Mayor flexibilidad
                  {'\n'}• Mejor performance
                </Text>
              </View>
            </SafeAreaView>
          </Modal>
        </SafeAreaView>
      </GestureHandlerRootView>
    </BottomSheetModalProvider>
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
  content: {
    padding: 16,
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  infoPanel: {
    backgroundColor: '#ffe6e6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d63031',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#d63031',
    lineHeight: 20,
  },
  infoDetail: {
    fontSize: 12,
    color: '#d63031',
    fontStyle: 'italic',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  modalTypesSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  modalButton: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  modalButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  modalButtonIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  modalButtonInfo: {
    flex: 1,
  },
  modalButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  modalButtonDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  modalButtonArrow: {
    fontSize: 18,
    color: '#007AFF',
  },
  featuresSection: {
    backgroundColor: '#e8f4fd',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: 12,
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    fontSize: 14,
    color: '#0056b3',
    lineHeight: 20,
  },
  codeSection: {
    backgroundColor: '#2d3748',
    padding: 16,
    borderRadius: 12,
  },
  codeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  codeBlock: {
    backgroundColor: '#1a202c',
    padding: 12,
    borderRadius: 8,
  },
  codeText: {
    color: '#a0aec0',
    fontFamily: 'Courier',
    fontSize: 11,
    lineHeight: 16,
  },
  modalBackground: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  modalBody: {
    flex: 1,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoCardItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  actionsList: {
    gap: 8,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  cancelAction: {
    backgroundColor: '#ffe6e6',
    marginTop: 8,
  },
  actionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  cancelActionText: {
    color: '#d63031',
  },
  formContainer: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmationContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  confirmationIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  confirmationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  confirmationMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  confirmationActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  confirmationButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  confirmButton: {
    backgroundColor: '#FF3B30',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  nativeModalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  nativeModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  nativeModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  nativeModalClose: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  nativeModalCloseText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  nativeModalContent: {
    flex: 1,
    padding: 20,
  },
  nativeModalText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  nativeModalNote: {
    fontSize: 14,
    color: '#333',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    lineHeight: 20,
  },
});

export default ModalBottomSheetExample;
