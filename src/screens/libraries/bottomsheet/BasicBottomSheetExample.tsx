import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Switch,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet, { 
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetHandle,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const BasicBottomSheetExample = () => {
  // State
  const [bottomSheetInfo, setBottomSheetInfo] = useState('Bottom Sheet ready to use');
  const [enableBackdrop, setEnableBackdrop] = useState(true);
  const [enableHandle, setEnableHandle] = useState(true);
  const [currentSnapPoint, setCurrentSnapPoint] = useState(-1);

  // Ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Snap points - pueden ser porcentajes o valores fijos
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  // Callbacks
  const handleSheetChanges = useCallback((index: number) => {
    setCurrentSnapPoint(index);
    if (index === -1) {
      setBottomSheetInfo('Bottom Sheet cerrado');
    } else {
      const points = ['25%', '50%', '90%'];
      setBottomSheetInfo(`Bottom Sheet en posición ${index + 1}: ${points[index]}`);
    }
  }, []);

  // Backdrop component
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  // Handle component
  const renderHandle = useCallback(
    (props: any) => (
      <BottomSheetHandle
        {...props}
        style={styles.handle}
        indicatorStyle={styles.handleIndicator}
      />
    ),
    []
  );

  // Actions
  const openToPosition = (index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const expandToMax = () => {
    bottomSheetRef.current?.expand();
  };

  const collapseToMin = () => {
    bottomSheetRef.current?.collapse();
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Bottom Sheet Básico</Text>
            <Text style={styles.subtitle}>
              Implementación básica con snap points y gestos
            </Text>
          </View>

          {/* Info Panel */}
          <View style={styles.infoPanel}>
            <Text style={styles.infoTitle}>📱 Estado del Bottom Sheet:</Text>
            <Text style={styles.infoText}>{bottomSheetInfo}</Text>
            <Text style={styles.infoDetail}>
              Posición actual: {currentSnapPoint === -1 ? 'Cerrado' : `${currentSnapPoint + 1}/3`}
            </Text>
          </View>

          {/* Controls */}
          <View style={styles.controlsSection}>
            <Text style={styles.controlsTitle}>Controles del Bottom Sheet</Text>
            
            {/* Position Controls */}
            <View style={styles.buttonGroup}>
              <Text style={styles.groupTitle}>Posiciones:</Text>
              <View style={styles.buttonRow}>
                <Pressable
                  style={[styles.button, styles.primaryButton]}
                  onPress={() => openToPosition(0)}>
                  <Text style={styles.buttonText}>25%</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.primaryButton]}
                  onPress={() => openToPosition(1)}>
                  <Text style={styles.buttonText}>50%</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.primaryButton]}
                  onPress={() => openToPosition(2)}>
                  <Text style={styles.buttonText}>90%</Text>
                </Pressable>
              </View>
            </View>

            {/* Action Controls */}
            <View style={styles.buttonGroup}>
              <Text style={styles.groupTitle}>Acciones:</Text>
              <View style={styles.buttonRow}>
                <Pressable
                  style={[styles.button, styles.successButton]}
                  onPress={expandToMax}>
                  <Text style={styles.buttonText}>Expand</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.warningButton]}
                  onPress={collapseToMin}>
                  <Text style={styles.buttonText}>Collapse</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.dangerButton]}
                  onPress={closeBottomSheet}>
                  <Text style={styles.buttonText}>Close</Text>
                </Pressable>
              </View>
            </View>

            {/* Configuration Controls */}
            <View style={styles.configSection}>
              <Text style={styles.groupTitle}>Configuración:</Text>
              
              <View style={styles.configItem}>
                <Text style={styles.configLabel}>Backdrop habilitado</Text>
                <Switch
                  value={enableBackdrop}
                  onValueChange={setEnableBackdrop}
                  trackColor={{ false: '#ccc', true: '#007AFF' }}
                  thumbColor="#fff"
                />
              </View>

              <View style={styles.configItem}>
                <Text style={styles.configLabel}>Handle visible</Text>
                <Switch
                  value={enableHandle}
                  onValueChange={setEnableHandle}
                  trackColor={{ false: '#ccc', true: '#007AFF' }}
                  thumbColor="#fff"
                />
              </View>
            </View>
          </View>

          {/* Usage Instructions */}
          <View style={styles.instructionsSection}>
            <Text style={styles.instructionsTitle}>📖 Instrucciones de Uso</Text>
            <View style={styles.instructionsList}>
              <Text style={styles.instructionItem}>• Usa los botones para abrir en diferentes posiciones</Text>
              <Text style={styles.instructionItem}>• Arrastra el handle para mover manualmente</Text>
              <Text style={styles.instructionItem}>• Toca el backdrop para cerrar (si está habilitado)</Text>
              <Text style={styles.instructionItem}>• Desliza hacia abajo rápidamente para cerrar</Text>
              <Text style={styles.instructionItem}>• Configura backdrop y handle según necesites</Text>
            </View>
          </View>

          {/* Code Example */}
          <View style={styles.codeSection}>
            <Text style={styles.codeTitle}>💡 Código de Ejemplo</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>{`const snapPoints = ['25%', '50%', '90%'];

<BottomSheet
  ref={bottomSheetRef}
  snapPoints={snapPoints}
  onChange={handleSheetChanges}
  backdropComponent={renderBackdrop}
  handleComponent={renderHandle}>
  <BottomSheetView style={styles.content}>
    <Text>Bottom Sheet Content</Text>
  </BottomSheetView>
</BottomSheet>`}</Text>
            </View>
          </View>
          </View>
        </ScrollView>

        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
          backdropComponent={enableBackdrop ? renderBackdrop : undefined}
          handleComponent={enableHandle ? renderHandle : undefined}
          backgroundStyle={styles.bottomSheetBackground}
          style={styles.bottomSheet}>
          
          <BottomSheetView style={styles.bottomSheetContent}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>🎉 Bottom Sheet Content</Text>
              <Text style={styles.sheetSubtitle}>
                Este es el contenido del bottom sheet
              </Text>
            </View>

            <View style={styles.sheetBody}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🎯</Text>
                <View style={styles.featureInfo}>
                  <Text style={styles.featureTitle}>Snap Points</Text>
                  <Text style={styles.featureDescription}>
                    El bottom sheet se ajusta automáticamente a las posiciones definidas
                  </Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>👆</Text>
                <View style={styles.featureInfo}>
                  <Text style={styles.featureTitle}>Gestos Naturales</Text>
                  <Text style={styles.featureDescription}>
                    Arrastra hacia arriba/abajo para controlar la posición
                  </Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🎨</Text>
                <View style={styles.featureInfo}>
                  <Text style={styles.featureTitle}>Customizable</Text>
                  <Text style={styles.featureDescription}>
                    Backdrop, handle y estilos completamente personalizables
                  </Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>⚡</Text>
                <View style={styles.featureInfo}>
                  <Text style={styles.featureTitle}>Performance</Text>
                  <Text style={styles.featureDescription}>
                    Animaciones fluidas ejecutadas en el hilo de UI
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.sheetFooter}>
              <Text style={styles.footerText}>
                Arrastra el handle o usa los controles externos
              </Text>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
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
    backgroundColor: '#e8f5e8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#2e7d32',
    lineHeight: 20,
    marginBottom: 4,
  },
  infoDetail: {
    fontSize: 12,
    color: '#2e7d32',
    fontStyle: 'italic',
  },
  controlsSection: {
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
  controlsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  buttonGroup: {
    marginBottom: 16,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  successButton: {
    backgroundColor: '#34C759',
  },
  warningButton: {
    backgroundColor: '#FF9500',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  configSection: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 16,
  },
  configItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  configLabel: {
    fontSize: 16,
    color: '#333',
  },
  instructionsSection: {
    backgroundColor: '#fff3e6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#cc6600',
    marginBottom: 12,
  },
  instructionsList: {
    gap: 8,
  },
  instructionItem: {
    fontSize: 14,
    color: '#cc6600',
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
    fontSize: 12,
    lineHeight: 18,
  },
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomSheetBackground: {
    backgroundColor: '#fff',
  },
  handle: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  handleIndicator: {
    backgroundColor: '#ccc',
    width: 40,
    height: 4,
  },
  bottomSheetContent: {
    flex: 1,
    padding: 16,
  },
  sheetHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  sheetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sheetSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  sheetBody: {
    flex: 1,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  sheetFooter: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default BasicBottomSheetExample;
