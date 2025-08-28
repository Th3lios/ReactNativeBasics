import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  Layout,
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
  SlideInUp,
  SlideOutDown,
  ZoomIn,
  ZoomOut,
  RotateInDownLeft,
  RotateOutUpRight,
  BounceIn,
  FlipInEasyX,
  FlipOutEasyX,
} from 'react-native-reanimated';

interface ListItem {
  id: number;
  text: string;
  color: string;
}

const LayoutAnimationsExample = () => {
  const [items, setItems] = useState<ListItem[]>([
    { id: 1, text: 'Item 1', color: '#FF3B30' },
    { id: 2, text: 'Item 2', color: '#007AFF' },
    { id: 3, text: 'Item 3', color: '#34C759' },
  ]);
  const [nextId, setNextId] = useState(4);
  const [animationInfo, setAnimationInfo] = useState('');

  // Shared values for manual animations
  const expandHeight = useSharedValue(60);
  const boxWidth = useSharedValue(100);
  const morphRadius = useSharedValue(8);

  // Add new item with random animation
  const addItem = () => {
    const colors = ['#FF3B30', '#007AFF', '#34C759', '#FF9500', '#AF52DE', '#FF2D92'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newItem: ListItem = {
      id: nextId,
      text: `Item ${nextId}`,
      color: randomColor,
    };
    
    setItems(prev => [...prev, newItem]);
    setNextId(prev => prev + 1);
    setAnimationInfo(`Added ${newItem.text} with automatic layout animation`);
  };

  // Remove item by id
  const removeItem = (id: number) => {
    const item = items.find(item => item.id === id);
    setItems(prev => prev.filter(item => item.id !== id));
    setAnimationInfo(`Removed ${item?.text} with exit animation`);
  };

  // Shuffle items
  const shuffleItems = () => {
    setItems(prev => [...prev].sort(() => Math.random() - 0.5));
    setAnimationInfo('Items shuffled with layout transitions');
  };

  // Clear all items
  const clearItems = () => {
    setItems([]);
    setAnimationInfo('All items cleared');
  };

  // Reset items
  const resetItems = () => {
    setItems([
      { id: 1, text: 'Item 1', color: '#FF3B30' },
      { id: 2, text: 'Item 2', color: '#007AFF' },
      { id: 3, text: 'Item 3', color: '#34C759' },
    ]);
    setNextId(4);
    setAnimationInfo('Items reset');
  };

  // Manual animations
  const toggleExpand = () => {
    expandHeight.value = withSpring(
      expandHeight.value === 60 ? 120 : 60,
      { damping: 15, stiffness: 100 }
    );
    setAnimationInfo(`Expanded to ${expandHeight.value === 60 ? '120px' : '60px'}`);
  };

  const animateWidth = () => {
    boxWidth.value = withSequence(
      withTiming(200, { duration: 300 }),
      withTiming(100, { duration: 300 })
    );
    setAnimationInfo('Width animated with sequence');
  };

  const morphShape = () => {
    morphRadius.value = withTiming(
      morphRadius.value === 8 ? 50 : 8,
      { duration: 500 }
    );
    setAnimationInfo(`Morphed to ${morphRadius.value === 8 ? 'circle' : 'rounded rectangle'}`);
  };

  // Animated styles
  const expandableStyle = useAnimatedStyle(() => ({
    height: expandHeight.value,
  }));

  const widthStyle = useAnimatedStyle(() => ({
    width: boxWidth.value,
  }));

  const morphStyle = useAnimatedStyle(() => ({
    borderRadius: morphRadius.value,
  }));

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Layout Animations</Text>
          <Text style={styles.subtitle}>
            Entering, Exiting y Layout Transitions automáticas
          </Text>
        </View>

        {/* Info Panel */}
        <View style={styles.infoPanel}>
          <Text style={styles.infoTitle}>🎭 Estado de Animaciones:</Text>
          <Text style={styles.infoText}>
            {animationInfo || 'Interactúa con los controles para ver las animaciones'}
          </Text>
        </View>

        {/* List Controls */}
        <View style={styles.controlsSection}>
          <Text style={styles.sectionTitle}>Lista Animada</Text>
          <View style={styles.buttonRow}>
            <Pressable style={[styles.controlButton, { backgroundColor: '#34C759' }]} onPress={addItem}>
              <Text style={styles.controlButtonText}>+ Add</Text>
            </Pressable>
            <Pressable style={[styles.controlButton, { backgroundColor: '#007AFF' }]} onPress={shuffleItems}>
              <Text style={styles.controlButtonText}>🔀 Shuffle</Text>
            </Pressable>
            <Pressable style={[styles.controlButton, { backgroundColor: '#FF9500' }]} onPress={resetItems}>
              <Text style={styles.controlButtonText}>🔄 Reset</Text>
            </Pressable>
            <Pressable style={[styles.controlButton, { backgroundColor: '#FF3B30' }]} onPress={clearItems}>
              <Text style={styles.controlButtonText}>🗑️ Clear</Text>
            </Pressable>
          </View>
        </View>

        {/* Animated List */}
        <View style={styles.listSection}>
          <Text style={styles.listTitle}>Lista con Entering/Exiting Animations</Text>
          <View style={styles.listContainer}>
            {items.map((item, index) => (
              <Animated.View
                key={item.id}
                entering={index % 4 === 0 ? SlideInRight : 
                         index % 4 === 1 ? BounceIn :
                         index % 4 === 2 ? ZoomIn :
                         RotateInDownLeft}
                exiting={index % 4 === 0 ? SlideOutLeft :
                        index % 4 === 1 ? FadeOut :
                        index % 4 === 2 ? ZoomOut :
                        RotateOutUpRight}
                layout={Layout.springify().damping(15).stiffness(100)}
                style={[styles.listItem, { backgroundColor: item.color }]}>
                <Text style={styles.listItemText}>{item.text}</Text>
                <Pressable 
                  style={styles.deleteButton}
                  onPress={() => removeItem(item.id)}>
                  <Text style={styles.deleteButtonText}>✖</Text>
                </Pressable>
              </Animated.View>
            ))}
            {items.length === 0 && (
              <Animated.View 
                entering={FadeIn.delay(200)}
                style={styles.emptyState}>
                <Text style={styles.emptyText}>No items to show</Text>
                <Text style={styles.emptySubtext}>Add some items to see animations</Text>
              </Animated.View>
            )}
          </View>
        </View>

        {/* Manual Layout Animations */}
        <View style={styles.manualSection}>
          <Text style={styles.sectionTitle}>Animaciones Manuales</Text>
          
          {/* Expandable Box */}
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>1. Expand/Collapse</Text>
            <Animated.View style={[styles.expandableBox, expandableStyle]}>
              <Text style={styles.boxText}>Expandable Box</Text>
            </Animated.View>
            <Pressable style={styles.button} onPress={toggleExpand}>
              <Text style={styles.buttonText}>Toggle Height</Text>
            </Pressable>
          </View>

          {/* Width Animation */}
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>2. Width Sequence</Text>
            <Animated.View style={[styles.widthBox, widthStyle]}>
              <Text style={styles.boxText}>Width</Text>
            </Animated.View>
            <Pressable style={styles.button} onPress={animateWidth}>
              <Text style={styles.buttonText}>Animate Width</Text>
            </Pressable>
          </View>

          {/* Shape Morphing */}
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>3. Shape Morphing</Text>
            <Animated.View style={[styles.morphBox, morphStyle]}>
              <Text style={styles.boxText}>Morph</Text>
            </Animated.View>
            <Pressable style={styles.button} onPress={morphShape}>
              <Text style={styles.buttonText}>Morph Shape</Text>
            </Pressable>
          </View>
        </View>

        {/* Entering/Exiting Examples */}
        <View style={styles.animationTypesSection}>
          <Text style={styles.sectionTitle}>Tipos de Animaciones</Text>
          <View style={styles.typesList}>
            <Text style={styles.typeItem}>🚀 SlideInRight/SlideOutLeft</Text>
            <Text style={styles.typeItem}>🎾 BounceIn</Text>
            <Text style={styles.typeItem}>🔍 ZoomIn/ZoomOut</Text>
            <Text style={styles.typeItem}>🌀 RotateInDownLeft/RotateOutUpRight</Text>
            <Text style={styles.typeItem}>👻 FadeIn/FadeOut</Text>
            <Text style={styles.typeItem}>🔄 FlipInEasyX/FlipOutEasyX</Text>
            <Text style={styles.typeItem}>🌸 Layout.springify()</Text>
          </View>
        </View>

        {/* Code Example */}
        <View style={styles.codeSection}>
          <Text style={styles.codeTitle}>💡 Código de Ejemplo</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{`// 1. Importar animaciones
import Animated, {
  Layout,
  FadeIn,
  SlideOutLeft,
  ZoomIn
} from 'react-native-reanimated';

// 2. Aplicar a componentes
<Animated.View
  entering={ZoomIn.delay(200)}
  exiting={SlideOutLeft}
  layout={Layout.springify()}
  style={styles.item}>
  <Text>Animated Item</Text>
</Animated.View>

// 3. Layout transitions automáticas
// Solo agregar/remover elementos del array`}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🎯 Las Layout Animations hacen las transiciones automáticas y fluidas
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
  controlsSection: {
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  controlButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 70,
  },
  controlButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  listSection: {
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
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  listContainer: {
    minHeight: 200,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  listItemText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#ccc',
  },
  manualSection: {
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
  exampleContainer: {
    marginBottom: 24,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  expandableBox: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  widthBox: {
    height: 60,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  morphBox: {
    width: 100,
    height: 100,
    backgroundColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  animationTypesSection: {
    backgroundColor: '#f0f4f8',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  typesList: {
    gap: 8,
  },
  typeItem: {
    fontSize: 14,
    color: '#0056b3',
    fontWeight: '500',
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

export default LayoutAnimationsExample;
