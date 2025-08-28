import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Switch,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet, { 
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetHandle,
  BottomSheetFooter,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const CustomBottomSheetExample = () => {
  // State
  const [sheetInfo, setSheetInfo] = useState('Bottom Sheet personalizado listo');
  const [backdropStyle, setBackdropStyle] = useState<'blur' | 'solid' | 'gradient'>('blur');
  const [handleStyle, setHandleStyle] = useState<'default' | 'custom' | 'hidden'>('default');
  const [showFooter, setShowFooter] = useState(true);
  const [animationConfig, setAnimationConfig] = useState<'spring' | 'timing'>('spring');

  // Refs
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Animated values
  const animatedIndex = useSharedValue(-1);
  const animatedPosition = useSharedValue(0);

  // Snap points
  const snapPoints = useMemo(() => ['30%', '60%', '90%'], []);

  // Callbacks
  const handleSheetChanges = useCallback((index: number) => {
    animatedIndex.value = index;
    setSheetInfo(
      index === -1 
        ? 'Bottom Sheet cerrado' 
        : `Posición ${index + 1}: ${snapPoints[index]}`
    );
  }, [snapPoints]);

  // Custom Backdrop Components
  const renderBlurBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.7}
        pressBehavior="close"
        style={[props.style, { backgroundColor: 'rgba(0,0,0,0.4)' }]}
      />
    ),
    []
  );

  const renderSolidBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.9}
        pressBehavior="close"
        style={[props.style, { backgroundColor: '#1a1a1a' }]}
      />
    ),
    []
  );

  const renderGradientBackdrop = useCallback(
    (props: any) => {
      const animatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
          props.animatedIndex.value,
          [-1, 0],
          [0, 0.8],
          Extrapolate.CLAMP
        );
        return { opacity };
      });

      return (
        <Animated.View
          style={[
            props.style,
            animatedStyle,
            {
              backgroundColor: 'transparent',
              background: 'linear-gradient(180deg, rgba(138,43,226,0.8) 0%, rgba(30,144,255,0.8) 100%)',
            }
          ]}
          onTouchStart={props.onPress}
        />
      );
    },
    []
  );

  // Custom Handle Components
  const renderDefaultHandle = useCallback(
    (props: any) => (
      <BottomSheetHandle
        {...props}
        style={styles.defaultHandle}
        indicatorStyle={styles.defaultIndicator}
      />
    ),
    []
  );

  const renderCustomHandle = useCallback(
    (props: any) => {
      const animatedStyle = useAnimatedStyle(() => {
        const rotate = interpolate(
          animatedIndex.value,
          [-1, 0, 2],
          [0, 0, 180],
          Extrapolate.CLAMP
        );
        return {
          transform: [{ rotate: `${rotate}deg` }],
        };
      });

      return (
        <View style={styles.customHandle}>
          <Animated.View style={[styles.customIndicator, animatedStyle]}>
            <Text style={styles.handleText}>⌃</Text>
          </Animated.View>
          <Text style={styles.handleTitle}>Customización Avanzada</Text>
        </View>
      );
    },
    []
  );

  // Custom Footer Component
  const renderFooter = useCallback(
    (props: any) => (
      <BottomSheetFooter {...props} bottomInset={24}>
        <View style={styles.footer}>
          <Pressable style={styles.footerButton} onPress={() => bottomSheetRef.current?.close()}>
            <Text style={styles.footerButtonText}>Cerrar</Text>
          </Pressable>
          <Pressable style={[styles.footerButton, styles.primaryFooterButton]} onPress={() => bottomSheetRef.current?.expand()}>
            <Text style={[styles.footerButtonText, styles.primaryFooterButtonText]}>Expandir</Text>
          </Pressable>
        </View>
      </BottomSheetFooter>
    ),
    []
  );

  // Actions
  const openBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const getBackdropComponent = () => {
    switch (backdropStyle) {
      case 'blur': return renderBlurBackdrop;
      case 'solid': return renderSolidBackdrop;
      case 'gradient': return renderGradientBackdrop;
      default: return renderBlurBackdrop;
    }
  };

  const getHandleComponent = () => {
    switch (handleStyle) {
      case 'default': return renderDefaultHandle;
      case 'custom': return renderCustomHandle;
      case 'hidden': return undefined;
      default: return renderDefaultHandle;
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Customización Avanzada</Text>
              <Text style={styles.subtitle}>
                Backdrops personalizados, handles custom y animaciones
              </Text>
            </View>

            {/* Info Panel */}
            <View style={styles.infoPanel}>
              <Text style={styles.infoTitle}>🎨 Estado Actual:</Text>
              <Text style={styles.infoText}>{sheetInfo}</Text>
            </View>

            {/* Customization Controls */}
            <View style={styles.controlsSection}>
              <Text style={styles.controlsTitle}>Personalización</Text>
              
              {/* Backdrop Style */}
              <View style={styles.controlGroup}>
                <Text style={styles.groupTitle}>Estilo de Backdrop:</Text>
                <View style={styles.segmentedControl}>
                  {['blur', 'solid', 'gradient'].map((style) => (
                    <Pressable
                      key={style}
                      style={[
                        styles.segmentButton,
                        backdropStyle === style && styles.segmentButtonActive
                      ]}
                      onPress={() => setBackdropStyle(style as any)}>
                      <Text style={[
                        styles.segmentButtonText,
                        backdropStyle === style && styles.segmentButtonTextActive
                      ]}>
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Handle Style */}
              <View style={styles.controlGroup}>
                <Text style={styles.groupTitle}>Estilo de Handle:</Text>
                <View style={styles.segmentedControl}>
                  {[
                    { key: 'default', label: 'Default' },
                    { key: 'custom', label: 'Custom' },
                    { key: 'hidden', label: 'Hidden' }
                  ].map((style) => (
                    <Pressable
                      key={style.key}
                      style={[
                        styles.segmentButton,
                        handleStyle === style.key && styles.segmentButtonActive
                      ]}
                      onPress={() => setHandleStyle(style.key as any)}>
                      <Text style={[
                        styles.segmentButtonText,
                        handleStyle === style.key && styles.segmentButtonTextActive
                      ]}>
                        {style.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Footer Toggle */}
              <View style={styles.controlGroup}>
                <View style={styles.toggleControl}>
                  <Text style={styles.groupTitle}>Footer personalizado:</Text>
                  <Switch
                    value={showFooter}
                    onValueChange={setShowFooter}
                    trackColor={{ false: '#ccc', true: '#007AFF' }}
                    thumbColor="#fff"
                  />
                </View>
              </View>

              {/* Animation Config */}
              <View style={styles.controlGroup}>
                <Text style={styles.groupTitle}>Tipo de Animación:</Text>
                <View style={styles.segmentedControl}>
                  {['spring', 'timing'].map((config) => (
                    <Pressable
                      key={config}
                      style={[
                        styles.segmentButton,
                        animationConfig === config && styles.segmentButtonActive
                      ]}
                      onPress={() => setAnimationConfig(config as any)}>
                      <Text style={[
                        styles.segmentButtonText,
                        animationConfig === config && styles.segmentButtonTextActive
                      ]}>
                        {config.charAt(0).toUpperCase() + config.slice(1)}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>

            {/* Action Button */}
            <View style={styles.actionSection}>
              <Pressable style={styles.openButton} onPress={openBottomSheet}>
                <Text style={styles.openButtonText}>Abrir Bottom Sheet Personalizado</Text>
              </Pressable>
            </View>

            {/* Features Showcase */}
            <View style={styles.featuresSection}>
              <Text style={styles.featuresTitle}>🎯 Características Demostradas</Text>
              <View style={styles.featuresList}>
                <Text style={styles.featureItem}>🎨 Backdrops personalizados (blur, sólido, gradiente)</Text>
                <Text style={styles.featureItem}>🔧 Handles customizables con animaciones</Text>
                <Text style={styles.featureItem}>📋 Footer component con botones</Text>
                <Text style={styles.featureItem}>⚡ Animaciones interpoladas</Text>
                <Text style={styles.featureItem}>🎭 Configuración dinámica en tiempo real</Text>
                <Text style={styles.featureItem}>📱 Responsive design</Text>
              </View>
            </View>

            {/* Code Example */}
            <View style={styles.codeSection}>
              <Text style={styles.codeTitle}>💡 Código de Ejemplo</Text>
              <View style={styles.codeBlock}>
                <Text style={styles.codeText}>{`// Custom Backdrop
const renderCustomBackdrop = useCallback((props) => (
  <BottomSheetBackdrop
    {...props}
    opacity={0.7}
    style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
  />
), []);

// Custom Handle
const renderCustomHandle = useCallback((props) => (
  <View style={styles.customHandle}>
    <Animated.View style={animatedStyle}>
      <Text>⌃</Text>
    </Animated.View>
  </View>
), []);

// Custom Footer
const renderFooter = useCallback((props) => (
  <BottomSheetFooter {...props}>
    <View style={styles.footer}>
      <Button title="Action" />
    </View>
  </BottomSheetFooter>
), []);`}</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Custom Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={getBackdropComponent()}
          handleComponent={getHandleComponent()}
          footerComponent={showFooter ? renderFooter : undefined}
          backgroundStyle={styles.bottomSheetBackground}
          style={styles.bottomSheet}
          animationConfigs={{
            ...(animationConfig === 'spring' 
              ? { damping: 80, stiffness: 500 }
              : { duration: 300 }
            )
          }}>
          
          <BottomSheetView style={styles.bottomSheetContent}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>🎨 Personalización Completa</Text>
              <Text style={styles.sheetSubtitle}>
                Bottom Sheet con elementos customizados
              </Text>
            </View>

            <View style={styles.sheetBody}>
              <View style={styles.customizationInfo}>
                <Text style={styles.customizationTitle}>Configuración Actual:</Text>
                <Text style={styles.customizationDetail}>• Backdrop: {backdropStyle}</Text>
                <Text style={styles.customizationDetail}>• Handle: {handleStyle}</Text>
                <Text style={styles.customizationDetail}>• Footer: {showFooter ? 'Visible' : 'Oculto'}</Text>
                <Text style={styles.customizationDetail}>• Animación: {animationConfig}</Text>
              </View>

              <View style={styles.demoContent}>
                <Text style={styles.demoTitle}>Contenido del Bottom Sheet</Text>
                <Text style={styles.demoText}>
                  Este bottom sheet demuestra las capacidades avanzadas de personalización 
                  que ofrece Gorhom Bottom Sheet. Puedes modificar los controles externos 
                  para ver los cambios en tiempo real.
                </Text>
                
                <View style={styles.demoActions}>
                  <Pressable style={styles.demoButton} onPress={() => bottomSheetRef.current?.snapToIndex(1)}>
                    <Text style={styles.demoButtonText}>Posición Media</Text>
                  </Pressable>
                  <Pressable style={styles.demoButton} onPress={() => bottomSheetRef.current?.expand()}>
                    <Text style={styles.demoButtonText}>Expandir</Text>
                  </Pressable>
                </View>
              </View>
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
    backgroundColor: '#fff3e6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#cc6600',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#cc6600',
    lineHeight: 20,
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
  controlGroup: {
    marginBottom: 16,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 2,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  segmentButtonActive: {
    backgroundColor: '#007AFF',
  },
  segmentButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  segmentButtonTextActive: {
    color: '#fff',
  },
  toggleControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionSection: {
    marginBottom: 16,
  },
  openButton: {
    backgroundColor: '#FF9500',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  openButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomSheetBackground: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  defaultHandle: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  defaultIndicator: {
    backgroundColor: '#ccc',
    width: 40,
    height: 4,
  },
  customHandle: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  customIndicator: {
    marginBottom: 8,
  },
  handleText: {
    fontSize: 20,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  handleTitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    gap: 12,
  },
  footerButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  primaryFooterButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  primaryFooterButtonText: {
    color: '#fff',
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
  customizationInfo: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  customizationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  customizationDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  demoContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  demoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  demoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  demoActions: {
    flexDirection: 'row',
    gap: 12,
  },
  demoButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  demoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CustomBottomSheetExample;
