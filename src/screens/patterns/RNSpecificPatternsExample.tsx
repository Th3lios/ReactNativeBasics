import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RNSpecificPatternsExample: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<string>('platform-detection');

  const patterns = [
    {
      id: 'platform-detection',
      title: 'Platform Detection',
      description: 'Detectar plataforma y adaptar comportamiento',
      color: '#4CAF50'
    },
    {
      id: 'responsive-design',
      title: 'Responsive Design',
      description: 'Adaptar UI a diferentes tamaños de pantalla',
      color: '#2196F3'
    },
    {
      id: 'navigation-patterns',
      title: 'Navigation Patterns',
      description: 'Patrones de navegación móvil específicos',
      color: '#FF9800'
    },
    {
      id: 'gesture-patterns',
      title: 'Gesture Patterns',
      description: 'Patrones de gestos y interacciones táctiles',
      color: '#9C27B0'
    }
  ];

  // ====== PLATFORM DETECTION PATTERNS ======
  
  // Hook para detección de plataforma
  const usePlatform = () => {
    return {
      isIOS: Platform.OS === 'ios',
      isAndroid: Platform.OS === 'android',
      isWeb: Platform.OS === 'web',
      version: Platform.Version,
      select: Platform.select,
      OS: Platform.OS
    };
  };

  // Componente que se adapta según la plataforma
  const PlatformSpecificButton: React.FC<{
    title: string;
    onPress: () => void;
  }> = ({ title, onPress }) => {
    const platform = usePlatform();

    const buttonStyle = platform.select({
      ios: styles.iosButton,
      android: styles.androidButton,
      default: styles.defaultButton
    });

    const textStyle = platform.select({
      ios: styles.iosButtonText,
      android: styles.androidButtonText,
      default: styles.defaultButtonText
    });

    return (
      <Pressable
        style={buttonStyle}
        onPress={onPress}
        android_ripple={platform.isAndroid ? { color: '#fff3' } : undefined}
      >
        <Text style={textStyle}>{title}</Text>
      </Pressable>
    );
  };

  // Utilidades de plataforma
  const PlatformUtils = {
    showAlert: (title: string, message: string) => {
      if (Platform.OS === 'web') {
        window.alert(`${title}: ${message}`);
      } else {
        Alert.alert(title, message);
      }
    },

    getStatusBarHeight: () => {
      if (Platform.OS === 'ios') {
        return StatusBar.currentHeight || 44;
      }
      return StatusBar.currentHeight || 24;
    },

    isTablet: () => {
      const { width, height } = Dimensions.get('window');
      const aspectRatio = Math.max(width, height) / Math.min(width, height);
      return aspectRatio < 1.6; // Tablets typically have aspect ratios < 1.6
    },

    getDeviceType: () => {
      const { width } = Dimensions.get('window');
      
      if (width < 768) return 'phone';
      if (width < 1024) return 'tablet';
      return 'desktop';
    }
  };

  // ====== RESPONSIVE DESIGN PATTERNS ======
  
  // Hook para dimensiones responsivas
  const useResponsive = () => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));

    useEffect(() => {
      const subscription = Dimensions.addEventListener('change', ({ window }) => {
        setDimensions(window);
      });

      return () => subscription?.remove();
    }, []);

    const isSmall = dimensions.width < 600;
    const isMedium = dimensions.width >= 600 && dimensions.width < 900;
    const isLarge = dimensions.width >= 900;
    const isLandscape = dimensions.width > dimensions.height;
    const isPortrait = dimensions.height > dimensions.width;

    const responsive = useCallback((values: {
      small?: any;
      medium?: any;
      large?: any;
      default?: any;
    }) => {
      if (isSmall && values.small !== undefined) return values.small;
      if (isMedium && values.medium !== undefined) return values.medium;
      if (isLarge && values.large !== undefined) return values.large;
      return values.default;
    }, [isSmall, isMedium, isLarge]);

    return {
      dimensions,
      isSmall,
      isMedium,
      isLarge,
      isLandscape,
      isPortrait,
      responsive,
      breakpoints: {
        small: 600,
        medium: 900
      }
    };
  };

  // Grid responsivo
  const ResponsiveGrid: React.FC<{
    data: any[];
    renderItem: (item: any, index: number) => React.ReactNode;
  }> = ({ data, renderItem }) => {
    const { responsive } = useResponsive();

    const columns = responsive({
      small: 1,
      medium: 2,
      large: 3,
      default: 1
    });

    const itemWidth = `${100 / columns}%`;

    return (
      <View style={styles.gridContainer}>
        <View style={styles.gridRow}>
          {data.map((item, index) => (
            <View key={index} style={[styles.gridItem, { width: itemWidth }]}>
              {renderItem(item, index)}
            </View>
          ))}
        </View>
      </View>
    );
  };

  // ====== NAVIGATION PATTERNS ======
  
  // Pattern: Back Handler
  const useBackHandler = (handler: () => boolean) => {
    useEffect(() => {
      if (Platform.OS !== 'android') return;

      const backHandler = () => {
        return handler();
      };

      // En una app real usarías BackHandler de react-native
      // BackHandler.addEventListener('hardwareBackPress', backHandler);
      // return () => BackHandler.removeEventListener('hardwareBackPress', backHandler);
      
      console.log('Back handler registered');
      return () => console.log('Back handler removed');
    }, [handler]);
  };

  // Pattern: Deep Linking
  const useDeepLinking = () => {
    const [initialURL, setInitialURL] = useState<string | null>(null);

    useEffect(() => {
      // En una app real usarías Linking de react-native
      // Linking.getInitialURL().then(url => setInitialURL(url));
      
      // const handleURL = (event: any) => {
      //   console.log('Deep link received:', event.url);
      // };
      
      // Linking.addEventListener('url', handleURL);
      // return () => Linking.removeEventListener('url', handleURL);

      setInitialURL('myapp://profile/123'); // Simulado
    }, []);

    const openURL = useCallback((url: string) => {
      console.log('Opening URL:', url);
      // Linking.openURL(url);
    }, []);

    return {
      initialURL,
      openURL
    };
  };

  // Pattern: Modal Stack
  const useModalStack = () => {
    const [modals, setModals] = useState<string[]>([]);

    const pushModal = useCallback((modalId: string) => {
      setModals(prev => [...prev, modalId]);
    }, []);

    const popModal = useCallback(() => {
      setModals(prev => prev.slice(0, -1));
    }, []);

    const clearModals = useCallback(() => {
      setModals([]);
    }, []);

    return {
      modals,
      currentModal: modals[modals.length - 1] || null,
      hasModals: modals.length > 0,
      pushModal,
      popModal,
      clearModals
    };
  };

  // ====== GESTURE PATTERNS ======
  
  // Pattern: Touch Feedback
  const TouchFeedback: React.FC<{
    children: React.ReactNode;
    onPress?: () => void;
    style?: any;
    feedbackType?: 'opacity' | 'highlight' | 'scale';
  }> = ({ 
    children, 
    onPress, 
    style, 
    feedbackType = 'opacity' 
  }) => {
    const [isPressed, setIsPressed] = useState(false);

    const getFeedbackStyle = () => {
      if (!isPressed) return {};
      
      switch (feedbackType) {
        case 'opacity':
          return { opacity: 0.7 };
        case 'highlight':
          return { backgroundColor: 'rgba(0, 0, 0, 0.1)' };
        case 'scale':
          return { transform: [{ scale: 0.95 }] };
        default:
          return {};
      }
    };

    return (
      <Pressable
        style={[style, getFeedbackStyle()]}
        onPress={onPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        android_ripple={{ color: '#e0e0e0' }}
      >
        {children}
      </Pressable>
    );
  };

  // Pattern: Long Press Menu
  const useLongPressMenu = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    const showMenu = useCallback((event: any) => {
      const { pageX, pageY } = event.nativeEvent;
      setMenuPosition({ x: pageX, y: pageY });
      setMenuVisible(true);
    }, []);

    const hideMenu = useCallback(() => {
      setMenuVisible(false);
    }, []);

    return {
      menuVisible,
      menuPosition,
      showMenu,
      hideMenu
    };
  };

  // Pattern: Swipe Actions
  const useSwipeActions = (threshold: number = 100) => {
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);

    const onTouchStart = useCallback((event: any) => {
      setStartX(event.nativeEvent.pageX);
      setCurrentX(event.nativeEvent.pageX);
    }, []);

    const onTouchMove = useCallback((event: any) => {
      setCurrentX(event.nativeEvent.pageX);
    }, []);

    const onTouchEnd = useCallback((callbacks: {
      onSwipeLeft?: () => void;
      onSwipeRight?: () => void;
    }) => {
      const distance = currentX - startX;
      
      if (Math.abs(distance) > threshold) {
        if (distance > 0 && callbacks.onSwipeRight) {
          callbacks.onSwipeRight();
        } else if (distance < 0 && callbacks.onSwipeLeft) {
          callbacks.onSwipeLeft();
        }
      }

      setStartX(0);
      setCurrentX(0);
    }, [startX, currentX, threshold]);

    const swipeDistance = currentX - startX;

    return {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      swipeDistance,
      isSwipingLeft: swipeDistance < -threshold / 2,
      isSwipingRight: swipeDistance > threshold / 2
    };
  };

  // ====== DEMO COMPONENTS ======
  
  const PlatformDetectionDemo: React.FC = () => {
    const platform = usePlatform();

    return (
      <View style={styles.demoCard}>
        <Text style={styles.demoTitle}>Platform Detection Demo</Text>
        
        <View style={styles.platformInfo}>
          <Text style={styles.platformTitle}>Información de Plataforma:</Text>
          <Text style={styles.platformDetail}>OS: {platform.OS}</Text>
          <Text style={styles.platformDetail}>Version: {platform.version}</Text>
          <Text style={styles.platformDetail}>Is iOS: {platform.isIOS ? '✅' : '❌'}</Text>
          <Text style={styles.platformDetail}>Is Android: {platform.isAndroid ? '✅' : '❌'}</Text>
          <Text style={styles.platformDetail}>Is Tablet: {PlatformUtils.isTablet() ? '✅' : '❌'}</Text>
          <Text style={styles.platformDetail}>Device Type: {PlatformUtils.getDeviceType()}</Text>
        </View>

        <View style={styles.platformButtons}>
          <PlatformSpecificButton
            title="Platform Button"
            onPress={() => PlatformUtils.showAlert('Platform', `Running on ${platform.OS}`)}
          />
          
          <View style={platform.select({
            ios: styles.iosContainer,
            android: styles.androidContainer,
            default: styles.defaultContainer
          })}>
            <Text style={styles.platformNote}>
              Este contenedor se ve diferente en cada plataforma
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const ResponsiveDesignDemo: React.FC = () => {
    const { dimensions, isSmall, isMedium, isLarge, responsive, isLandscape } = useResponsive();

    const sampleData = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      title: `Item ${i + 1}`,
      color: `hsl(${i * 40}, 70%, 70%)`
    }));

    const fontSize = responsive({
      small: 14,
      medium: 16,
      large: 18,
      default: 14
    });

    const padding = responsive({
      small: 8,
      medium: 12,
      large: 16,
      default: 8
    });

    return (
      <View style={styles.demoCard}>
        <Text style={styles.demoTitle}>Responsive Design Demo</Text>
        
        <View style={styles.responsiveInfo}>
          <Text style={styles.responsiveTitle}>Información de Pantalla:</Text>
          <Text style={styles.responsiveDetail}>
            Dimensiones: {Math.round(dimensions.width)} x {Math.round(dimensions.height)}
          </Text>
          <Text style={styles.responsiveDetail}>
            Breakpoint: {isSmall ? 'Small' : isMedium ? 'Medium' : 'Large'}
          </Text>
          <Text style={styles.responsiveDetail}>
            Orientación: {isLandscape ? 'Landscape' : 'Portrait'}
          </Text>
        </View>

        <View style={[styles.responsiveContainer, { padding }]}>
          <Text style={[styles.responsiveText, { fontSize }]}>
            Este texto se adapta al tamaño de pantalla
          </Text>
        </View>

        <ResponsiveGrid
          data={sampleData}
          renderItem={(item) => (
            <View style={[styles.gridItemDemo, { backgroundColor: item.color }]}>
              <Text style={styles.gridItemText}>{item.title}</Text>
            </View>
          )}
        />
      </View>
    );
  };

  const NavigationPatternsDemo: React.FC = () => {
    const { initialURL, openURL } = useDeepLinking();
    const { modals, currentModal, hasModals, pushModal, popModal, clearModals } = useModalStack();

    // Back handler demo
    useBackHandler(() => {
      if (hasModals) {
        popModal();
        return true; // Prevent default back behavior
      }
      return false; // Allow default back behavior
    });

    return (
      <View style={styles.demoCard}>
        <Text style={styles.demoTitle}>Navigation Patterns Demo</Text>
        
        {/* Deep Linking */}
        <View style={styles.navSection}>
          <Text style={styles.navSectionTitle}>Deep Linking:</Text>
          <Text style={styles.navDetail}>Initial URL: {initialURL || 'None'}</Text>
          <Pressable
            style={styles.navButton}
            onPress={() => openURL('myapp://settings')}
          >
            <Text style={styles.navButtonText}>Open Deep Link</Text>
          </Pressable>
        </View>

        {/* Modal Stack */}
        <View style={styles.navSection}>
          <Text style={styles.navSectionTitle}>Modal Stack:</Text>
          <Text style={styles.navDetail}>
            Active Modals: {modals.length} | Current: {currentModal || 'None'}
          </Text>
          
          <View style={styles.modalControls}>
            <Pressable
              style={styles.navButton}
              onPress={() => pushModal(`modal-${Date.now()}`)}
            >
              <Text style={styles.navButtonText}>Push Modal</Text>
            </Pressable>
            
            <Pressable
              style={[styles.navButton, !hasModals && styles.disabledButton]}
              onPress={popModal}
              disabled={!hasModals}
            >
              <Text style={styles.navButtonText}>Pop Modal</Text>
            </Pressable>
            
            <Pressable
              style={[styles.navButton, !hasModals && styles.disabledButton]}
              onPress={clearModals}
              disabled={!hasModals}
            >
              <Text style={styles.navButtonText}>Clear All</Text>
            </Pressable>
          </View>

          {hasModals && (
            <View style={styles.modalIndicator}>
              <Text style={styles.modalText}>
                📱 Modal Stack: {modals.join(' → ')}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.navNote}>
          💡 En Android, el botón back manejará el modal stack automáticamente
        </Text>
      </View>
    );
  };

  const GesturePatternsDemo: React.FC = () => {
    const [touchCount, setTouchCount] = useState(0);
    const [lastSwipe, setLastSwipe] = useState<string>('');
    const longPressMenu = useLongPressMenu();
    const swipeActions = useSwipeActions(80);

    const handleSwipeEnd = () => {
      swipeActions.onTouchEnd({
        onSwipeLeft: () => setLastSwipe('Left'),
        onSwipeRight: () => setLastSwipe('Right')
      });
    };

    return (
      <View style={styles.demoCard}>
        <Text style={styles.demoTitle}>Gesture Patterns Demo</Text>
        
        {/* Touch Feedback */}
        <View style={styles.gestureSection}>
          <Text style={styles.gestureSectionTitle}>Touch Feedback:</Text>
          
          <View style={styles.feedbackButtons}>
            <TouchFeedback
              style={styles.feedbackButton}
              feedbackType="opacity"
              onPress={() => setTouchCount(c => c + 1)}
            >
              <Text style={styles.feedbackButtonText}>Opacity</Text>
            </TouchFeedback>
            
            <TouchFeedback
              style={styles.feedbackButton}
              feedbackType="highlight"
              onPress={() => setTouchCount(c => c + 1)}
            >
              <Text style={styles.feedbackButtonText}>Highlight</Text>
            </TouchFeedback>
            
            <TouchFeedback
              style={styles.feedbackButton}
              feedbackType="scale"
              onPress={() => setTouchCount(c => c + 1)}
            >
              <Text style={styles.feedbackButtonText}>Scale</Text>
            </TouchFeedback>
          </View>
          
          <Text style={styles.gestureCounter}>Touches: {touchCount}</Text>
        </View>

        {/* Long Press Menu */}
        <View style={styles.gestureSection}>
          <Text style={styles.gestureSectionTitle}>Long Press Menu:</Text>
          
          <Pressable
            style={styles.longPressArea}
            onLongPress={longPressMenu.showMenu}
            onPress={longPressMenu.hideMenu}
          >
            <Text style={styles.longPressText}>
              {longPressMenu.menuVisible ? '📋 Menu Visible' : '📱 Long Press Me'}
            </Text>
          </Pressable>
          
          {longPressMenu.menuVisible && (
            <View style={[
              styles.contextMenu,
              {
                left: Math.min(longPressMenu.menuPosition.x, 200),
                top: longPressMenu.menuPosition.y - 100
              }
            ]}>
              <Pressable style={styles.menuItem} onPress={longPressMenu.hideMenu}>
                <Text style={styles.menuItemText}>📋 Copy</Text>
              </Pressable>
              <Pressable style={styles.menuItem} onPress={longPressMenu.hideMenu}>
                <Text style={styles.menuItemText}>📤 Share</Text>
              </Pressable>
              <Pressable style={styles.menuItem} onPress={longPressMenu.hideMenu}>
                <Text style={styles.menuItemText}>🗑️ Delete</Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Swipe Actions */}
        <View style={styles.gestureSection}>
          <Text style={styles.gestureSectionTitle}>Swipe Actions:</Text>
          
          <View
            style={[
              styles.swipeArea,
              swipeActions.isSwipingLeft && styles.swipeLeftIndicator,
              swipeActions.isSwipingRight && styles.swipeRightIndicator
            ]}
            onTouchStart={swipeActions.onTouchStart}
            onTouchMove={swipeActions.onTouchMove}
            onTouchEnd={handleSwipeEnd}
          >
            <Text style={styles.swipeText}>
              👈 Swipe Left or Right 👉
            </Text>
            {swipeActions.swipeDistance !== 0 && (
              <Text style={styles.swipeDistance}>
                Distance: {Math.round(swipeActions.swipeDistance)}px
              </Text>
            )}
          </View>
          
          {lastSwipe && (
            <Text style={styles.swipeResult}>
              Last Swipe: {lastSwipe} 
              {lastSwipe === 'Left' ? '👈' : '👉'}
            </Text>
          )}
        </View>
      </View>
    );
  };

  const codeExamples = {
    'platform-detection': `// Platform Detection Patterns

// Hook para detección de plataforma
const usePlatform = () => {
  return {
    isIOS: Platform.OS === 'ios',
    isAndroid: Platform.OS === 'android',
    isWeb: Platform.OS === 'web',
    version: Platform.Version,
    select: Platform.select,
    OS: Platform.OS
  };
};

// Componente específico por plataforma
const PlatformButton = ({ title, onPress }) => {
  const platform = usePlatform();

  const buttonStyle = platform.select({
    ios: {
      backgroundColor: '#007AFF',
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16
    },
    android: {
      backgroundColor: '#2196F3',
      borderRadius: 4,
      paddingVertical: 10,
      paddingHorizontal: 14,
      elevation: 2
    },
    default: {
      backgroundColor: '#666',
      borderRadius: 6,
      paddingVertical: 10,
      paddingHorizontal: 16
    }
  });

  return (
    <Pressable
      style={buttonStyle}
      onPress={onPress}
      android_ripple={platform.isAndroid ? { color: '#fff3' } : undefined}
    >
      <Text style={{ color: '#fff' }}>{title}</Text>
    </Pressable>
  );
};

// Utilidades específicas de plataforma
const PlatformUtils = {
  showAlert: (title, message) => {
    if (Platform.OS === 'web') {
      window.alert(\`\${title}: \${message}\`);
    } else {
      Alert.alert(title, message);
    }
  },

  getStatusBarHeight: () => {
    if (Platform.OS === 'ios') {
      return StatusBar.currentHeight || 44;
    }
    return StatusBar.currentHeight || 24;
  },

  isTablet: () => {
    const { width, height } = Dimensions.get('window');
    const aspectRatio = Math.max(width, height) / Math.min(width, height);
    return aspectRatio < 1.6;
  }
};

// Uso en componentes
const MyComponent = () => {
  const platform = usePlatform();

  return (
    <View>
      <Text>Running on: {platform.OS}</Text>
      <PlatformButton title="Press me" onPress={() => {
        PlatformUtils.showAlert('Hello', 'Platform specific alert!');
      }} />
      
      {platform.isIOS && <IOSSpecificComponent />}
      {platform.isAndroid && <AndroidSpecificComponent />}
    </View>
  );
};`,

    'responsive-design': `// Responsive Design Patterns

// Hook para diseño responsivo
const useResponsive = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const isSmall = dimensions.width < 600;
  const isMedium = dimensions.width >= 600 && dimensions.width < 900;
  const isLarge = dimensions.width >= 900;

  const responsive = useCallback((values) => {
    if (isSmall && values.small !== undefined) return values.small;
    if (isMedium && values.medium !== undefined) return values.medium;
    if (isLarge && values.large !== undefined) return values.large;
    return values.default;
  }, [isSmall, isMedium, isLarge]);

  return {
    dimensions,
    isSmall,
    isMedium,
    isLarge,
    responsive
  };
};

// Grid responsivo
const ResponsiveGrid = ({ data, renderItem }) => {
  const { responsive } = useResponsive();

  const columns = responsive({
    small: 1,
    medium: 2,
    large: 3,
    default: 1
  });

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {data.map((item, index) => (
        <View
          key={index}
          style={{ width: \`\${100 / columns}%\`, padding: 4 }}
        >
          {renderItem(item, index)}
        </View>
      ))}
    </View>
  );
};

// Componente responsivo
const ResponsiveCard = ({ title, content }) => {
  const { responsive, dimensions } = useResponsive();

  const cardStyle = {
    padding: responsive({ small: 8, medium: 12, large: 16, default: 8 }),
    borderRadius: responsive({ small: 4, medium: 6, large: 8, default: 4 }),
    fontSize: responsive({ small: 14, medium: 16, large: 18, default: 14 })
  };

  return (
    <View style={[styles.card, cardStyle]}>
      <Text style={{ fontSize: cardStyle.fontSize }}>{title}</Text>
      <Text>{content}</Text>
      <Text style={{ fontSize: 12, color: '#666' }}>
        Screen: {Math.round(dimensions.width)}x{Math.round(dimensions.height)}
      </Text>
    </View>
  );
};

// Layout responsivo con orientación
const ResponsiveLayout = ({ children }) => {
  const { isLandscape, responsive } = useResponsive();

  const layoutStyle = {
    flexDirection: isLandscape ? 'row' : 'column',
    gap: responsive({ small: 8, medium: 12, large: 16, default: 8 })
  };

  return (
    <View style={layoutStyle}>
      {children}
    </View>
  );
};`,

    'navigation-patterns': `// Navigation Patterns for React Native

// Back Handler Pattern
const useBackHandler = (handler) => {
  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return handler(); // Return true to prevent default back behavior
    });

    return () => backHandler.remove();
  }, [handler]);
};

// Deep Linking Pattern
const useDeepLinking = () => {
  const [initialURL, setInitialURL] = useState(null);

  useEffect(() => {
    // Get initial URL if app was opened via deep link
    Linking.getInitialURL().then(url => {
      if (url) {
        setInitialURL(url);
        handleDeepLink(url);
      }
    });

    // Listen for deep links while app is running
    const handleURL = (event) => {
      handleDeepLink(event.url);
    };

    const linkingListener = Linking.addEventListener('url', handleURL);

    return () => linkingListener.remove();
  }, []);

  const handleDeepLink = (url) => {
    const route = url.replace(/.*?:\\/\\//, '');
    const [screen, ...params] = route.split('/');
    
    // Navigate based on deep link
    navigation.navigate(screen, { params });
  };

  const createDeepLink = (screen, params = {}) => {
    const paramString = Object.keys(params).length > 0 
      ? '/' + Object.values(params).join('/')
      : '';
    return \`myapp://\${screen}\${paramString}\`;
  };

  return { initialURL, createDeepLink };
};

// Modal Stack Pattern
const useModalStack = () => {
  const [modals, setModals] = useState([]);

  const pushModal = useCallback((modalId, props = {}) => {
    setModals(prev => [...prev, { id: modalId, props }]);
  }, []);

  const popModal = useCallback(() => {
    setModals(prev => prev.slice(0, -1));
  }, []);

  const replaceModal = useCallback((modalId, props = {}) => {
    setModals(prev => [...prev.slice(0, -1), { id: modalId, props }]);
  }, []);

  return {
    modals,
    currentModal: modals[modals.length - 1] || null,
    pushModal,
    popModal,
    replaceModal,
    clearModals: () => setModals([])
  };
};

// Navigation with state persistence
const NavigationContainer = () => {
  const { modals, popModal } = useModalStack();
  
  // Handle Android back button for modals
  useBackHandler(() => {
    if (modals.length > 0) {
      popModal();
      return true; // Prevent default back behavior
    }
    return false; // Allow default back behavior
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Your regular screens */}
      </Stack.Navigator>
      
      {/* Modal Stack */}
      {modals.map((modal, index) => (
        <Modal
          key={modal.id}
          visible={true}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <ModalScreen modalId={modal.id} {...modal.props} />
        </Modal>
      ))}
    </NavigationContainer>
  );
};`,

    'gesture-patterns': `// Gesture Patterns for React Native

// Touch Feedback Pattern
const TouchFeedback = ({ children, onPress, feedbackType = 'opacity' }) => {
  const [isPressed, setIsPressed] = useState(false);

  const getFeedbackStyle = () => {
    if (!isPressed) return {};
    
    switch (feedbackType) {
      case 'opacity':
        return { opacity: 0.7 };
      case 'highlight':
        return { backgroundColor: 'rgba(0, 0, 0, 0.1)' };
      case 'scale':
        return { transform: [{ scale: 0.95 }] };
      default:
        return {};
    }
  };

  return (
    <Pressable
      style={getFeedbackStyle()}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      android_ripple={{ color: '#e0e0e0' }}
    >
      {children}
    </Pressable>
  );
};

// Long Press Menu Pattern
const useLongPressMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const showMenu = useCallback((event) => {
    const { pageX, pageY } = event.nativeEvent;
    setMenuPosition({ x: pageX, y: pageY });
    setMenuVisible(true);
  }, []);

  const hideMenu = useCallback(() => {
    setMenuVisible(false);
  }, []);

  return { menuVisible, menuPosition, showMenu, hideMenu };
};

// Swipe Actions Pattern
const useSwipeActions = (threshold = 100) => {
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const onTouchStart = useCallback((event) => {
    setStartX(event.nativeEvent.pageX);
  }, []);

  const onTouchMove = useCallback((event) => {
    setCurrentX(event.nativeEvent.pageX);
  }, []);

  const onTouchEnd = useCallback((callbacks) => {
    const distance = currentX - startX;
    
    if (Math.abs(distance) > threshold) {
      if (distance > 0 && callbacks.onSwipeRight) {
        callbacks.onSwipeRight();
      } else if (distance < 0 && callbacks.onSwipeLeft) {
        callbacks.onSwipeLeft();
      }
    }

    setStartX(0);
    setCurrentX(0);
  }, [startX, currentX, threshold]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    swipeDistance: currentX - startX
  };
};

// Pull to Refresh Pattern
const usePullToRefresh = (onRefresh) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  return { refreshing, onRefresh: handleRefresh };
};

// Gesture-based navigation
const SwipeableScreen = ({ onSwipeBack, children }) => {
  const swipe = useSwipeActions(100);

  const handleSwipeEnd = () => {
    swipe.onTouchEnd({
      onSwipeRight: onSwipeBack // Swipe right to go back
    });
  };

  return (
    <View
      style={{ flex: 1 }}
      onTouchStart={swipe.onTouchStart}
      onTouchMove={swipe.onTouchMove}
      onTouchEnd={handleSwipeEnd}
    >
      {children}
    </View>
  );
};`
  };

  const currentCode = codeExamples[selectedPattern as keyof typeof codeExamples] || '';

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Patrones React Native</Text>
          <Text style={styles.subtitle}>
            Platform-specific, responsive design y patrones móviles
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>📱 Patrones Móviles Específicos</Text>
          <Text style={styles.infoText}>
            React Native tiene patrones únicos para desarrollo móvil:{'\n\n'}
            🔍 <Text style={styles.infoBold}>Platform Detection:</Text> Adaptar según iOS/Android{'\n'}
            📐 <Text style={styles.infoBold}>Responsive Design:</Text> Múltiples tamaños de pantalla{'\n'}
            🧭 <Text style={styles.infoBold}>Navigation:</Text> Patrones de navegación móvil{'\n'}
            👆 <Text style={styles.infoBold}>Gestures:</Text> Interacciones táctiles naturales
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Patrones React Native</Text>
          
          <View style={styles.patternSelector}>
            {patterns.map((pattern) => (
              <Pressable
                key={pattern.id}
                style={[
                  styles.patternButton,
                  { borderColor: pattern.color },
                  selectedPattern === pattern.id && { backgroundColor: pattern.color }
                ]}
                onPress={() => setSelectedPattern(pattern.id)}
              >
                <Text style={[
                  styles.patternTitle,
                  selectedPattern === pattern.id && styles.selectedPatternText
                ]}>
                  {pattern.title}
                </Text>
                <Text style={[
                  styles.patternDescription,
                  selectedPattern === pattern.id && styles.selectedPatternText
                ]}>
                  {pattern.description}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💻 Código del Patrón</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{currentCode}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧪 Demos Interactivos</Text>
          
          {selectedPattern === 'platform-detection' && <PlatformDetectionDemo />}
          {selectedPattern === 'responsive-design' && <ResponsiveDesignDemo />}
          {selectedPattern === 'navigation-patterns' && <NavigationPatternsDemo />}
          {selectedPattern === 'gesture-patterns' && <GesturePatternsDemo />}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            📱 Los patrones React Native aprovechan las capacidades únicas de los dispositivos móviles
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
  infoSection: {
    backgroundColor: '#f3e5f5',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#7B1FA2',
    lineHeight: 20,
  },
  infoBold: {
    fontWeight: 'bold',
  },
  section: {
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
  patternSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  patternButton: {
    flex: 1,
    minWidth: 120,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  patternTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  patternDescription: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  selectedPatternText: {
    color: '#fff',
  },
  codeBlock: {
    backgroundColor: '#2d3748',
    padding: 12,
    borderRadius: 8,
  },
  codeText: {
    color: '#a0aec0',
    fontFamily: 'Courier',
    fontSize: 9,
    lineHeight: 12,
  },
  demoCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#9C27B0',
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  // Platform Detection Styles
  platformInfo: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  platformTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  platformDetail: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  platformButtons: {
    gap: 12,
  },
  iosButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  androidButton: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 14,
    elevation: 2,
    alignItems: 'center',
  },
  defaultButton: {
    backgroundColor: '#666',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  iosButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  androidButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  defaultButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  iosContainer: {
    backgroundColor: '#e8f4fd',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  androidContainer: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 4,
    elevation: 1,
  },
  defaultContainer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  platformNote: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  // Responsive Design Styles
  responsiveInfo: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  responsiveTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  responsiveDetail: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  responsiveContainer: {
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  responsiveText: {
    color: '#1976D2',
    fontWeight: '600',
    textAlign: 'center',
  },
  gridContainer: {
    flex: 1,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    padding: 4,
  },
  gridItemDemo: {
    height: 80,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridItemText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Navigation Patterns Styles
  navSection: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  navSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  navDetail: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  navButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  modalControls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  modalIndicator: {
    backgroundColor: '#fff3e0',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  modalText: {
    fontSize: 12,
    color: '#F57C00',
    textAlign: 'center',
  },
  navNote: {
    fontSize: 11,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
  // Gesture Patterns Styles
  gestureSection: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  gestureSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  feedbackButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  feedbackButton: {
    backgroundColor: '#9C27B0',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  feedbackButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  gestureCounter: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  longPressArea: {
    backgroundColor: '#f3e5f5',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#9C27B0',
    borderStyle: 'dashed',
  },
  longPressText: {
    fontSize: 14,
    color: '#7B1FA2',
    fontWeight: '600',
  },
  contextMenu: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    zIndex: 1000,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    fontSize: 14,
    color: '#333',
  },
  swipeArea: {
    backgroundColor: '#f3e5f5',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#9C27B0',
    marginBottom: 8,
  },
  swipeLeftIndicator: {
    backgroundColor: '#ffebee',
    borderColor: '#F44336',
  },
  swipeRightIndicator: {
    backgroundColor: '#e8f5e8',
    borderColor: '#4CAF50',
  },
  swipeText: {
    fontSize: 14,
    color: '#7B1FA2',
    fontWeight: '600',
    marginBottom: 4,
  },
  swipeDistance: {
    fontSize: 12,
    color: '#666',
  },
  swipeResult: {
    fontSize: 12,
    color: '#4CAF50',
    textAlign: 'center',
    fontWeight: '600',
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

export default RNSpecificPatternsExample;
