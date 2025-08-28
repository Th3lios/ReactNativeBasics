import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const GestureAnimationsExample = () => {
  const [gestureInfo, setGestureInfo] = React.useState('');

  // Pan Gesture Values
  const panTranslateX = useSharedValue(0);
  const panTranslateY = useSharedValue(0);
  const panContext = useSharedValue({ x: 0, y: 0 });

  // Pinch Gesture Values
  const pinchScale = useSharedValue(1);
  const pinchContext = useSharedValue(1);

  // Swipe to Delete Values
  const swipeTranslateX = useSharedValue(0);
  const swipeOpacity = useSharedValue(1);

  // Card Rotation Values
  const cardRotateX = useSharedValue(0);
  const cardRotateY = useSharedValue(0);

  const showInfo = (info: string) => {
    setGestureInfo(info);
  };

  // 1. Pan Gesture Handler
  const panGesture = Gesture.Pan()
    .onStart(() => {
      runOnJS(showInfo)('Pan started');
    })
    .onUpdate((event) => {
      panTranslateX.value = event.translationX;
      panTranslateY.value = event.translationY;
    })
    .onEnd(() => {
      // Bounce back to center with spring
      panTranslateX.value = withSpring(0, { damping: 10 });
      panTranslateY.value = withSpring(0, { damping: 10 });
      runOnJS(showInfo)('Pan ended - bounced back');
    });

  const panAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: panTranslateX.value },
        { translateY: panTranslateY.value },
      ],
    };
  });

  // 2. Pinch Gesture Handler
  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      runOnJS(showInfo)('Pinch started');
    })
    .onUpdate((event) => {
      pinchScale.value = event.scale;
    })
    .onEnd(() => {
      // Reset to normal size
      pinchScale.value = withSpring(1, { damping: 10 });
      runOnJS(showInfo)('Pinch ended - reset to normal size');
    });

  const pinchAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pinchScale.value }],
    };
  });

  // 3. Swipe to Delete Gesture
  const swipeGesture = Gesture.Pan()
    .onStart(() => {
      runOnJS(showInfo)('Swipe to delete started');
    })
    .onUpdate((event) => {
      if (event.translationX < 0) {
        // Only allow left swipe
        swipeTranslateX.value = event.translationX;
        // Interpolate opacity based on swipe distance
        swipeOpacity.value = interpolate(
          Math.abs(event.translationX),
          [0, width * 0.3],
          [1, 0.3],
          Extrapolate.CLAMP
        );
      }
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > width * 0.4) {
        // Delete the item
        swipeTranslateX.value = withTiming(-width);
        swipeOpacity.value = withTiming(0);
        runOnJS(showInfo)('Item deleted!');
        
        // Reset after 2 seconds
        setTimeout(() => {
          swipeTranslateX.value = withSpring(0);
          swipeOpacity.value = withSpring(1);
        }, 2000);
      } else {
        // Bounce back
        swipeTranslateX.value = withSpring(0);
        swipeOpacity.value = withSpring(1);
        runOnJS(showInfo)('Swipe cancelled - bounced back');
      }
    });

  const swipeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: swipeTranslateX.value }],
      opacity: swipeOpacity.value,
    };
  });

  // 4. 3D Card Rotation Gesture
  const cardGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Convert pan movement to rotation
      cardRotateY.value = interpolate(
        event.translationX,
        [-width / 2, width / 2],
        [-30, 30],
        Extrapolate.CLAMP
      );
      cardRotateX.value = interpolate(
        event.translationY,
        [-height / 2, height / 2],
        [15, -15],
        Extrapolate.CLAMP
      );
      runOnJS(showInfo)(`Rotating card: X=${Math.round(cardRotateX.value)}°, Y=${Math.round(cardRotateY.value)}°`);
    })
    .onEnd(() => {
      cardRotateX.value = withSpring(0);
      cardRotateY.value = withSpring(0);
      runOnJS(showInfo)('Card rotation reset');
    });

  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 800 },
        { rotateX: `${cardRotateX.value}deg` },
        { rotateY: `${cardRotateY.value}deg` },
      ],
    };
  });

  // Double Tap to Like
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      runOnJS(showInfo)('❤️ Double tap detected - Liked!');
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Animaciones con Gestos</Text>
          <Text style={styles.subtitle}>
            Gesture Handler + Reanimated para interacciones fluidas
          </Text>
        </View>

        {/* Info Panel */}
        <View style={styles.infoPanel}>
          <Text style={styles.infoTitle}>👆 Estado de Gestos:</Text>
          <Text style={styles.infoText}>
            {gestureInfo || 'Interactúa con los elementos para ver los gestos en acción'}
          </Text>
        </View>

        {/* 1. Pan Gesture */}
        <View style={styles.exampleSection}>
          <Text style={styles.exampleTitle}>1. Pan Gesture - Arrastrar</Text>
          <Text style={styles.exampleDescription}>
            Arrastra el cuadro y observa cómo regresa al centro automáticamente
          </Text>
          <View style={styles.gestureContainer}>
            <GestureDetector gesture={panGesture}>
              <Animated.View style={[styles.gestureBox, panAnimatedStyle, { backgroundColor: '#FF3B30' }]}>
                <Text style={styles.boxText}>DRAG ME</Text>
              </Animated.View>
            </GestureDetector>
          </View>
        </View>

        {/* 2. Pinch Gesture */}
        <View style={styles.exampleSection}>
          <Text style={styles.exampleTitle}>2. Pinch to Zoom</Text>
          <Text style={styles.exampleDescription}>
            Usa dos dedos para hacer zoom. Se resetea automáticamente
          </Text>
          <View style={styles.gestureContainer}>
            <GestureDetector gesture={pinchGesture}>
              <Animated.View style={[styles.gestureBox, pinchAnimatedStyle, { backgroundColor: '#007AFF' }]}>
                <Text style={styles.boxText}>PINCH ME</Text>
              </Animated.View>
            </GestureDetector>
          </View>
        </View>

        {/* 3. Swipe to Delete */}
        <View style={styles.exampleSection}>
          <Text style={styles.exampleTitle}>3. Swipe to Delete</Text>
          <Text style={styles.exampleDescription}>
            Desliza hacia la izquierda para eliminar. Más del 40% elimina el elemento
          </Text>
          <View style={styles.swipeContainer}>
            <GestureDetector gesture={swipeGesture}>
              <Animated.View style={[styles.swipeItem, swipeAnimatedStyle]}>
                <Text style={styles.swipeText}>← Swipe left to delete</Text>
                <Text style={styles.swipeIcon}>🗑️</Text>
              </Animated.View>
            </GestureDetector>
          </View>
        </View>

        {/* 4. 3D Card Rotation */}
        <View style={styles.exampleSection}>
          <Text style={styles.exampleTitle}>4. 3D Card Rotation</Text>
          <Text style={styles.exampleDescription}>
            Arrastra para rotar la tarjeta en 3D. Efecto de perspectiva realista
          </Text>
          <View style={styles.gestureContainer}>
            <GestureDetector gesture={cardGesture}>
              <Animated.View style={[styles.card, cardAnimatedStyle]}>
                <Text style={styles.cardTitle}>3D Card</Text>
                <Text style={styles.cardSubtitle}>Drag to rotate</Text>
                <View style={styles.cardContent}>
                  <Text style={styles.cardText}>This card rotates in 3D space</Text>
                  <Text style={styles.cardText}>using perspective transforms</Text>
                </View>
              </Animated.View>
            </GestureDetector>
          </View>
        </View>

        {/* 5. Double Tap */}
        <View style={styles.exampleSection}>
          <Text style={styles.exampleTitle}>5. Double Tap to Like</Text>
          <Text style={styles.exampleDescription}>
            Haz doble tap rápidamente para activar el gesto
          </Text>
          <View style={styles.gestureContainer}>
            <GestureDetector gesture={doubleTapGesture}>
              <Animated.View style={[styles.gestureBox, { backgroundColor: '#FF69B4' }]}>
                <Text style={styles.boxText}>❤️</Text>
                <Text style={[styles.boxText, { fontSize: 12, marginTop: 4 }]}>DOUBLE TAP</Text>
              </Animated.View>
            </GestureDetector>
          </View>
        </View>

        {/* Code Example */}
        <View style={styles.codeSection}>
          <Text style={styles.codeTitle}>💡 Código de Ejemplo</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{`// 1. Crear gesture (Nueva API Reanimated 3)
const panGesture = Gesture.Pan()
  .onStart(() => {
    // Inicializar gesto
  })
  .onUpdate((event) => {
    // Manejar gesto activo
    translateX.value = event.translationX;
  })
  .onEnd(() => {
    // Finalizar animación
    translateX.value = withSpring(0);
  });

// 2. Aplicar al componente
<GestureDetector gesture={panGesture}>
  <Animated.View style={animatedStyle}>
    <Text>Gesture Element</Text>
  </Animated.View>
</GestureDetector>`}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🎯 Los gestos crean experiencias de usuario naturales e intuitivas
          </Text>
        </View>
        </ScrollView>
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
  header: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 28,
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
    margin: 10,
    padding: 16,
    borderRadius: 12,
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
  exampleSection: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  exampleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  exampleDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  gestureContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  gestureBox: {
    width: 100,
    height: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  swipeContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    overflow: 'hidden',
  },
  swipeItem: {
    backgroundColor: '#34C759',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  swipeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  swipeIcon: {
    fontSize: 24,
  },
  card: {
    width: 200,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  codeSection: {
    backgroundColor: '#2d3748',
    margin: 10,
    padding: 16,
    borderRadius: 12,
  },
  codeTitle: {
    fontSize: 18,
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
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default GestureAnimationsExample;
