import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const BasicAnimationsExample = () => {
  // SharedValues para diferentes animaciones
  const fadeValue = useSharedValue(1);
  const scaleValue = useSharedValue(1);
  const rotationValue = useSharedValue(0);
  const translateXValue = useSharedValue(0);
  const colorProgress = useSharedValue(0);

  // Estado para mostrar información
  const [animationInfo, setAnimationInfo] = React.useState('');

  // Función para mostrar información (debe ejecutarse en JS thread)
  const showInfo = (info: string) => {
    setAnimationInfo(info);
  };

  // 1. Fade In/Out Animation
  const fadeAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeValue.value,
    };
  });

  const triggerFade = () => {
    fadeValue.value = withTiming(
      fadeValue.value === 1 ? 0.2 : 1,
      { duration: 500 },
      (finished) => {
        if (finished) {
          runOnJS(showInfo)('Fade animation completed!');
        }
      }
    );
  };

  // 2. Scale Animation
  const scaleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
    };
  });

  const triggerScale = () => {
    scaleValue.value = withSpring(
      scaleValue.value === 1 ? 1.5 : 1,
      {
        damping: 10,
        stiffness: 100,
      },
      (finished) => {
        if (finished) {
          runOnJS(showInfo)('Scale animation with spring completed!');
        }
      }
    );
  };

  // 3. Rotation Animation
  const rotationAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotationValue.value}deg`,
        },
      ],
    };
  });

  const triggerRotation = () => {
    rotationValue.value = withRepeat(
      withTiming(360, { duration: 1000 }),
      3, // Repeat 3 times
      false, // Don't reverse
      (finished) => {
        if (finished) {
          runOnJS(showInfo)('Rotation animation completed 3 times!');
          rotationValue.value = 0; // Reset rotation
        }
      }
    );
  };

  // 4. Translation Animation
  const translationAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateXValue.value,
        },
      ],
    };
  });

  const triggerTranslation = () => {
    const targetX = translateXValue.value === 0 ? width - 150 : 0;
    translateXValue.value = withTiming(
      targetX,
      { duration: 800 },
      (finished) => {
        if (finished) {
          runOnJS(showInfo)(`Moved to ${targetX === 0 ? 'start' : 'end'} position!`);
        }
      }
    );
  };

  // 5. Color Interpolation
  const colorAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolate(
      colorProgress.value,
      [0, 0.5, 1],
      [0xff3b30, 0x007aff, 0x34c759] // Red -> Blue -> Green
    );

    return {
      backgroundColor: `rgb(${Math.floor(backgroundColor / 0x10000)}, ${
        Math.floor((backgroundColor % 0x10000) / 0x100)
      }, ${backgroundColor % 0x100})`,
    };
  });

  const triggerColorChange = () => {
    colorProgress.value = withTiming(
      colorProgress.value >= 1 ? 0 : colorProgress.value + 0.5,
      { duration: 600 },
      (finished) => {
        if (finished) {
          const colors = ['Red', 'Blue', 'Green'];
          const colorIndex = Math.round(colorProgress.value * 2);
          runOnJS(showInfo)(`Color changed to ${colors[colorIndex]}!`);
        }
      }
    );
  };

  // Reset all animations
  const resetAnimations = () => {
    fadeValue.value = withTiming(1, { duration: 300 });
    scaleValue.value = withTiming(1, { duration: 300 });
    rotationValue.value = withTiming(0, { duration: 300 });
    translateXValue.value = withTiming(0, { duration: 300 });
    colorProgress.value = withTiming(0, { duration: 300 });
    setAnimationInfo('All animations reset!');
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Animaciones Básicas</Text>
          <Text style={styles.subtitle}>
            SharedValue, withTiming, withSpring e interpolaciones
          </Text>
        </View>

        {/* Info Panel */}
        <View style={styles.infoPanel}>
          <Text style={styles.infoTitle}>📱 Estado de Animaciones:</Text>
          <Text style={styles.infoText}>
            {animationInfo || 'Toca cualquier botón para ver animaciones en acción'}
          </Text>
        </View>

        {/* 1. Fade Animation */}
        <View style={styles.exampleSection}>
          <Text style={styles.exampleTitle}>1. Fade In/Out</Text>
          <Text style={styles.exampleDescription}>
            Usa useSharedValue y withTiming para controlar la opacidad
          </Text>
          <View style={styles.animationContainer}>
            <Animated.View style={[styles.animatedBox, fadeAnimatedStyle, { backgroundColor: '#FF3B30' }]}>
              <Text style={styles.boxText}>FADE</Text>
            </Animated.View>
          </View>
          <Pressable style={styles.button} onPress={triggerFade}>
            <Text style={styles.buttonText}>Trigger Fade</Text>
          </Pressable>
        </View>

        {/* 2. Scale Animation */}
        <View style={styles.exampleSection}>
          <Text style={styles.exampleTitle}>2. Scale Animation</Text>
          <Text style={styles.exampleDescription}>
            withSpring proporciona animaciones elásticas naturales
          </Text>
          <View style={styles.animationContainer}>
            <Animated.View style={[styles.animatedBox, scaleAnimatedStyle, { backgroundColor: '#007AFF' }]}>
              <Text style={styles.boxText}>SCALE</Text>
            </Animated.View>
          </View>
          <Pressable style={styles.button} onPress={triggerScale}>
            <Text style={styles.buttonText}>Trigger Scale</Text>
          </Pressable>
        </View>

        {/* 3. Rotation Animation */}
        <View style={styles.exampleSection}>
          <Text style={styles.exampleTitle}>3. Rotation Animation</Text>
          <Text style={styles.exampleDescription}>
            withRepeat permite repetir animaciones múltiples veces
          </Text>
          <View style={styles.animationContainer}>
            <Animated.View style={[styles.animatedBox, rotationAnimatedStyle, { backgroundColor: '#34C759' }]}>
              <Text style={styles.boxText}>ROTATE</Text>
            </Animated.View>
          </View>
          <Pressable style={styles.button} onPress={triggerRotation}>
            <Text style={styles.buttonText}>Trigger Rotation (3x)</Text>
          </Pressable>
        </View>

        {/* 4. Translation Animation */}
        <View style={styles.exampleSection}>
          <Text style={styles.exampleTitle}>4. Translation Animation</Text>
          <Text style={styles.exampleDescription}>
            Transform translateX para mover elementos horizontalmente
          </Text>
          <View style={styles.animationContainer}>
            <Animated.View style={[styles.animatedBox, translationAnimatedStyle, { backgroundColor: '#FF9500' }]}>
              <Text style={styles.boxText}>MOVE</Text>
            </Animated.View>
          </View>
          <Pressable style={styles.button} onPress={triggerTranslation}>
            <Text style={styles.buttonText}>Trigger Translation</Text>
          </Pressable>
        </View>

        {/* 5. Color Interpolation */}
        <View style={styles.exampleSection}>
          <Text style={styles.exampleTitle}>5. Color Interpolation</Text>
          <Text style={styles.exampleDescription}>
            interpolate permite transiciones suaves entre valores
          </Text>
          <View style={styles.animationContainer}>
            <Animated.View style={[styles.animatedBox, colorAnimatedStyle]}>
              <Text style={styles.boxText}>COLOR</Text>
            </Animated.View>
          </View>
          <Pressable style={styles.button} onPress={triggerColorChange}>
            <Text style={styles.buttonText}>Change Color</Text>
          </Pressable>
        </View>

        {/* Reset Button */}
        <View style={styles.resetSection}>
          <Pressable style={[styles.button, styles.resetButton]} onPress={resetAnimations}>
            <Text style={[styles.buttonText, styles.resetButtonText]}>🔄 Reset All Animations</Text>
          </Pressable>
        </View>

        {/* Code Examples */}
        <View style={styles.codeSection}>
          <Text style={styles.codeTitle}>💡 Código de Ejemplo</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{`// 1. Crear SharedValue
const fadeValue = useSharedValue(1);

// 2. Crear estilo animado
const animatedStyle = useAnimatedStyle(() => {
  return {
    opacity: fadeValue.value,
  };
});

// 3. Triggear animación
const animate = () => {
  fadeValue.value = withTiming(0.2, { duration: 500 });
};`}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🎯 Estos son los conceptos fundamentales de Reanimated 3
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
    backgroundColor: '#e8f5e8',
    margin: 10,
    padding: 16,
    borderRadius: 12,
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
  animationContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 16,
  },
  animatedBox: {
    width: 80,
    height: 80,
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
    fontSize: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resetSection: {
    margin: 10,
  },
  resetButton: {
    backgroundColor: '#FF3B30',
  },
  resetButtonText: {
    fontSize: 18,
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
    fontSize: 12,
    lineHeight: 18,
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

export default BasicAnimationsExample;
