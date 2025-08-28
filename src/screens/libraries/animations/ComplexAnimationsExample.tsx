import React, { useRef, useState } from 'react';
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
  withSpring,
  withTiming,
  withDecay,
  withSequence,
  withRepeat,
  runOnJS,
  interpolate,
  Extrapolate,
  useAnimatedScrollHandler,
  useDerivedValue,
  Easing,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const ComplexAnimationsExample = () => {
  const [animationInfo, setAnimationInfo] = useState('Animaciones complejas listas para interactuar');
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Physics Animation Values
  const physicsX = useSharedValue(0);
  const physicsY = useSharedValue(0);
  const physicsVelocityX = useSharedValue(0);
  const physicsVelocityY = useSharedValue(0);

  // Morphing Shape Values
  const morphProgress = useSharedValue(0);
  const morphScale = useSharedValue(1);

  // Card Flip Values
  const cardRotateY = useSharedValue(0);

  // Parallax Scroll Values
  const scrollY = useSharedValue(0);

  // Physics Spring Values
  const springValue = useSharedValue(0);

  const showInfo = (info: string) => {
    setAnimationInfo(info);
  };

  // 1. Physics Animation with Decay
  const physicsGesture = Gesture.Pan()
    .onUpdate((event) => {
      physicsX.value = event.translationX;
      physicsY.value = event.translationY;
      physicsVelocityX.value = event.velocityX;
      physicsVelocityY.value = event.velocityY;
    })
    .onEnd(() => {
      // Physics decay simulation
      physicsX.value = withDecay({
        velocity: physicsVelocityX.value * 0.5,
        clamp: [-width / 2, width / 2],
        deceleration: 0.998,
      });
      physicsY.value = withDecay({
        velocity: physicsVelocityY.value * 0.5,
        clamp: [-height / 4, height / 4],
        deceleration: 0.998,
      });
      runOnJS(showInfo)('Physics decay in motion...');
    });

  const physicsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: physicsX.value },
      { translateY: physicsY.value },
    ],
  }));

  // 2. Morphing Shape Animation
  const startMorphAnimation = () => {
    morphProgress.value = withSequence(
      withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.cubic) }),
      withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.cubic) })
    );
    morphScale.value = withSequence(
      withSpring(1.2, { damping: 10 }),
      withSpring(1, { damping: 10 })
    );
    setAnimationInfo('Morphing from circle to square and back...');
  };

  const morphAnimatedStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      morphProgress.value,
      [0, 1],
      [50, 8],
      Extrapolate.CLAMP
    );
    
    const backgroundColor = interpolate(
      morphProgress.value,
      [0, 0.5, 1],
      [0, 120, 240], // HSL hue values
      Extrapolate.CLAMP
    );

    return {
      borderRadius,
      backgroundColor: `hsl(${backgroundColor}, 70%, 60%)`,
      transform: [{ scale: morphScale.value }],
    };
  });

  // 3. Card Flip Animation
  const flipCard = () => {
    const toValue = isCardFlipped ? 0 : 180;
    cardRotateY.value = withSpring(toValue, {
      damping: 15,
      stiffness: 100,
    });
    setIsCardFlipped(!isCardFlipped);
    setAnimationInfo(`Card flipped to ${isCardFlipped ? 'front' : 'back'}`);
  };

  const cardFrontStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      cardRotateY.value,
      [0, 90],
      [0, 90],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      cardRotateY.value,
      [0, 90],
      [1, 0],
      Extrapolate.CLAMP
    );
    
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity,
      backfaceVisibility: 'hidden',
    };
  });

  const cardBackStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      cardRotateY.value,
      [90, 180],
      [90, 0],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      cardRotateY.value,
      [90, 180],
      [0, 1],
      Extrapolate.CLAMP
    );
    
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity,
      backfaceVisibility: 'hidden',
    };
  });

  // 4. Parallax Scroll Handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Multiple parallax layers with different speeds
  const parallaxLayer1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: scrollY.value * 0.5 }],
  }));

  const parallaxLayer2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: scrollY.value * 0.3 }],
  }));

  const parallaxLayer3Style = useAnimatedStyle(() => ({
    transform: [{ translateY: scrollY.value * 0.1 }],
  }));

  // 5. Advanced Spring Physics
  const triggerSpringPhysics = () => {
    springValue.value = withSequence(
      withSpring(100, {
        damping: 2, // Very bouncy
        stiffness: 100,
        mass: 1,
      }),
      withSpring(0, {
        damping: 20, // More controlled
        stiffness: 150,
        mass: 1,
      })
    );
    setAnimationInfo('Advanced spring physics with custom damping...');
  };

  const springAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: springValue.value },
      { rotate: `${springValue.value * 3.6}deg` },
    ],
  }));

  // 6. Liquid Animation
  const liquidProgress = useSharedValue(0);

  const startLiquidAnimation = () => {
    liquidProgress.value = withRepeat(
      withTiming(1, { 
        duration: 3000, 
        easing: Easing.inOut(Easing.sin) 
      }),
      -1,
      true
    );
    setAnimationInfo('Liquid morphing animation started...');
  };

  const liquidAnimatedStyle = useAnimatedStyle(() => {
    const wave1 = Math.sin(liquidProgress.value * Math.PI * 2) * 20;
    const wave2 = Math.cos(liquidProgress.value * Math.PI * 3) * 15;
    const wave3 = Math.sin(liquidProgress.value * Math.PI * 4) * 10;
    
    return {
      borderRadius: 20 + wave1,
      transform: [
        { scaleX: 1 + wave2 * 0.01 },
        { scaleY: 1 + wave3 * 0.01 },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
        <Animated.ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Animaciones Complejas</Text>
            <Text style={styles.subtitle}>
              Combinación de técnicas avanzadas para efectos únicos
            </Text>
          </View>

          {/* Info Panel */}
          <View style={styles.infoPanel}>
            <Text style={styles.infoTitle}>🎨 Estado de Animación:</Text>
            <Text style={styles.infoText}>{animationInfo}</Text>
          </View>

          {/* 1. Physics Animation */}
          <View style={styles.exampleSection}>
            <Text style={styles.exampleTitle}>1. Physics with Decay</Text>
            <Text style={styles.exampleDescription}>
              Arrastra y suelta para simular física realista con inercia
            </Text>
            <View style={styles.physicsContainer}>
              <GestureDetector gesture={physicsGesture}>
                <Animated.View style={[styles.physicsBox, physicsAnimatedStyle]}>
                  <Text style={styles.boxText}>🏀 PHYSICS</Text>
                </Animated.View>
              </GestureDetector>
            </View>
          </View>

          {/* Parallax Background Layers */}
          <View style={styles.parallaxContainer}>
            <Animated.View style={[styles.parallaxLayer, styles.layer1, parallaxLayer1Style]} />
            <Animated.View style={[styles.parallaxLayer, styles.layer2, parallaxLayer2Style]} />
            <Animated.View style={[styles.parallaxLayer, styles.layer3, parallaxLayer3Style]} />
            
            <View style={styles.parallaxContent}>
              <Text style={styles.parallaxTitle}>Parallax Scrolling</Text>
              <Text style={styles.parallaxText}>
                Las capas de fondo se mueven a diferentes velocidades creando profundidad
              </Text>
            </View>
          </View>

          {/* 2. Morphing Shape */}
          <View style={styles.exampleSection}>
            <Text style={styles.exampleTitle}>2. Morphing Shapes</Text>
            <Text style={styles.exampleDescription}>
              Transformación fluida entre formas geométricas con colores
            </Text>
            <View style={styles.morphContainer}>
              <Animated.View style={[styles.morphShape, morphAnimatedStyle]} />
              <Pressable style={styles.triggerButton} onPress={startMorphAnimation}>
                <Text style={styles.triggerButtonText}>Start Morphing</Text>
              </Pressable>
            </View>
          </View>

          {/* 3. Card Flip */}
          <View style={styles.exampleSection}>
            <Text style={styles.exampleTitle}>3. 3D Card Flip</Text>
            <Text style={styles.exampleDescription}>
              Rotación 3D realista con perspectiva y backface visibility
            </Text>
            <View style={styles.cardContainer}>
              <Pressable onPress={flipCard}>
                <View style={styles.cardWrapper}>
                  <Animated.View style={[styles.card, styles.cardFront, cardFrontStyle]}>
                    <Text style={styles.cardTitle}>Front Side</Text>
                    <Text style={styles.cardText}>Tap to flip</Text>
                    <Text style={styles.cardEmoji}>🌟</Text>
                  </Animated.View>
                  
                  <Animated.View style={[styles.card, styles.cardBack, cardBackStyle]}>
                    <Text style={styles.cardTitle}>Back Side</Text>
                    <Text style={styles.cardText}>Tap to flip back</Text>
                    <Text style={styles.cardEmoji}>🎭</Text>
                  </Animated.View>
                </View>
              </Pressable>
            </View>
          </View>

          {/* 4. Advanced Spring Physics */}
          <View style={styles.exampleSection}>
            <Text style={styles.exampleTitle}>4. Advanced Spring Physics</Text>
            <Text style={styles.exampleDescription}>
              Configuración personalizada de masa, amortiguación y rigidez
            </Text>
            <View style={styles.springContainer}>
              <Animated.View style={[styles.springBox, springAnimatedStyle]}>
                <Text style={styles.boxText}>⚡ SPRING</Text>
              </Animated.View>
              <Pressable style={styles.triggerButton} onPress={triggerSpringPhysics}>
                <Text style={styles.triggerButtonText}>Trigger Spring</Text>
              </Pressable>
            </View>
          </View>

          {/* 5. Liquid Animation */}
          <View style={styles.exampleSection}>
            <Text style={styles.exampleTitle}>5. Liquid Morphing</Text>
            <Text style={styles.exampleDescription}>
              Simulación de comportamiento líquido con ondas matemáticas
            </Text>
            <View style={styles.liquidContainer}>
              <Animated.View style={[styles.liquidShape, liquidAnimatedStyle]}>
                <Text style={styles.boxText}>🌊 LIQUID</Text>
              </Animated.View>
              <Pressable style={styles.triggerButton} onPress={startLiquidAnimation}>
                <Text style={styles.triggerButtonText}>Start Liquid</Text>
              </Pressable>
            </View>
          </View>

          {/* Code Examples */}
          <View style={styles.codeSection}>
            <Text style={styles.codeTitle}>💡 Técnicas Avanzadas</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>{`// 1. Physics with Decay
const gesture = Gesture.Pan()
  .onEnd(() => {
    x.value = withDecay({
      velocity: velocityX.value,
      clamp: [-width, width],
      deceleration: 0.998,
    });
  });

// 2. Morphing with Interpolation
const animatedStyle = useAnimatedStyle(() => ({
  borderRadius: interpolate(
    progress.value,
    [0, 1],
    [50, 8]
  ),
  backgroundColor: \`hsl(\${hue.value}, 70%, 60%)\`,
}));

// 3. 3D Card Flip
const frontStyle = useAnimatedStyle(() => ({
  transform: [{ rotateY: \`\${rotateY.value}deg\` }],
  backfaceVisibility: 'hidden',
}));

// 4. Advanced Spring Configuration
const springConfig = {
  damping: 15,    // Bounce control
  stiffness: 100, // Speed
  mass: 1,        // Weight
};`}</Text>
            </View>
          </View>

          {/* Performance Tips */}
          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>🚀 Tips de Performance</Text>
            <View style={styles.tipsList}>
              <Text style={styles.tipItem}>• Usa runOnUI para cálculos complejos</Text>
              <Text style={styles.tipItem}>• Optimiza interpolaciones con Extrapolate.CLAMP</Text>
              <Text style={styles.tipItem}>• Combina múltiples shared values eficientemente</Text>
              <Text style={styles.tipItem}>• Usa useDerivedValue para valores computados</Text>
              <Text style={styles.tipItem}>• Evita re-renders innecesarios con useAnimatedStyle</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              🎨 Las animaciones complejas combinan múltiples técnicas para crear experiencias únicas
            </Text>
          </View>
        </Animated.ScrollView>
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
    backgroundColor: '#fff',
    padding: 20,
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
  physicsContainer: {
    height: 200,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  physicsBox: {
    width: 80,
    height: 80,
    backgroundColor: '#FF3B30',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  parallaxContainer: {
    height: 300,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  parallaxLayer: {
    position: 'absolute',
    width: '100%',
    height: '120%',
  },
  layer1: {
    backgroundColor: 'rgba(255, 59, 48, 0.3)',
    top: -20,
  },
  layer2: {
    backgroundColor: 'rgba(0, 122, 255, 0.3)',
    top: -10,
  },
  layer3: {
    backgroundColor: 'rgba(52, 199, 89, 0.3)',
    top: 0,
  },
  parallaxContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    margin: 20,
    borderRadius: 12,
  },
  parallaxTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  parallaxText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  morphContainer: {
    alignItems: 'center',
    gap: 20,
  },
  morphShape: {
    width: 100,
    height: 100,
    backgroundColor: '#007AFF',
  },
  cardContainer: {
    alignItems: 'center',
    height: 200,
    justifyContent: 'center',
  },
  cardWrapper: {
    width: 200,
    height: 120,
    position: 'relative',
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  cardFront: {
    backgroundColor: '#007AFF',
  },
  cardBack: {
    backgroundColor: '#FF3B30',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
  cardEmoji: {
    fontSize: 24,
  },
  springContainer: {
    alignItems: 'center',
    gap: 20,
  },
  springBox: {
    width: 80,
    height: 80,
    backgroundColor: '#34C759',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  liquidContainer: {
    alignItems: 'center',
    gap: 20,
  },
  liquidShape: {
    width: 100,
    height: 100,
    backgroundColor: '#FF9500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  triggerButton: {
    backgroundColor: '#FF9500',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  triggerButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
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
    fontSize: 10,
    lineHeight: 14,
  },
  tipsSection: {
    backgroundColor: '#e8f4fd',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: 12,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 14,
    color: '#0056b3',
    lineHeight: 20,
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

export default ComplexAnimationsExample;
