import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  PixelRatio,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenInfo {
  width: number;
  height: number;
  scale: number;
  fontScale: number;
  pixelRatio: number;
}

const ResponsiveStylesExample: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<'breakpoints' | 'orientation' | 'scale' | 'adaptive'>('breakpoints');
  const [screenData, setScreenData] = useState<ScreenInfo>({
    width: 0,
    height: 0,
    scale: 0,
    fontScale: 0,
    pixelRatio: 0,
  });

  useEffect(() => {
    const updateScreenInfo = () => {
      const { width, height, scale, fontScale } = Dimensions.get('window');
      setScreenData({
        width,
        height,
        scale,
        fontScale,
        pixelRatio: PixelRatio.get(),
      });
    };

    updateScreenInfo();
    
    const subscription = Dimensions.addEventListener('change', updateScreenInfo);
    return () => subscription?.remove();
  }, []);

  // Breakpoints comunes
  const breakpoints = {
    small: 480,
    medium: 768,
    large: 1024,
  };

  const getDeviceType = (width: number) => {
    if (width < breakpoints.small) return 'phone';
    if (width < breakpoints.medium) return 'tablet-portrait';
    if (width < breakpoints.large) return 'tablet-landscape';
    return 'desktop';
  };

  const deviceType = getDeviceType(screenData.width);
  const isPortrait = screenData.height > screenData.width;
  const isTablet = deviceType.includes('tablet');

  const renderExampleSelector = () => (
    <View style={styles.selectorContainer}>
      <Pressable
        style={[styles.selectorButton, selectedExample === 'breakpoints' && styles.selectedButton]}
        onPress={() => setSelectedExample('breakpoints')}
      >
        <Text style={[styles.selectorText, selectedExample === 'breakpoints' && styles.selectedText]}>
          📐 Breakpoints
        </Text>
      </Pressable>
      
      <Pressable
        style={[styles.selectorButton, selectedExample === 'orientation' && styles.selectedButton]}
        onPress={() => setSelectedExample('orientation')}
      >
        <Text style={[styles.selectorText, selectedExample === 'orientation' && styles.selectedText]}>
          🔄 Orientación
        </Text>
      </Pressable>
      
      <Pressable
        style={[styles.selectorButton, selectedExample === 'scale' && styles.selectedButton]}
        onPress={() => setSelectedExample('scale')}
      >
        <Text style={[styles.selectorText, selectedExample === 'scale' && styles.selectedText]}>
          🔍 Escalado
        </Text>
      </Pressable>
      
      <Pressable
        style={[styles.selectorButton, selectedExample === 'adaptive' && styles.selectedButton]}
        onPress={() => setSelectedExample('adaptive')}
      >
        <Text style={[styles.selectorText, selectedExample === 'adaptive' && styles.selectedText]}>
          🎯 Adaptativo
        </Text>
      </Pressable>
    </View>
  );

  const renderBreakpointsExample = () => (
    <View style={styles.exampleSection}>
      <Text style={styles.exampleTitle}>📐 Breakpoints y Dispositivos</Text>
      <Text style={styles.exampleDescription}>
        Adapta el diseño según el tamaño de pantalla usando breakpoints y detección de dispositivo.
      </Text>
      
      {/* Device Info */}
      <View style={styles.deviceInfoContainer}>
        <Text style={styles.deviceInfoTitle}>📱 Información del Dispositivo</Text>
        <View style={styles.deviceInfoGrid}>
          <View style={styles.deviceInfoItem}>
            <Text style={styles.deviceInfoLabel}>Ancho:</Text>
            <Text style={styles.deviceInfoValue}>{Math.round(screenData.width)}px</Text>
          </View>
          <View style={styles.deviceInfoItem}>
            <Text style={styles.deviceInfoLabel}>Alto:</Text>
            <Text style={styles.deviceInfoValue}>{Math.round(screenData.height)}px</Text>
          </View>
          <View style={styles.deviceInfoItem}>
            <Text style={styles.deviceInfoLabel}>Tipo:</Text>
            <Text style={styles.deviceInfoValue}>{deviceType}</Text>
          </View>
          <View style={styles.deviceInfoItem}>
            <Text style={styles.deviceInfoLabel}>Orientación:</Text>
            <Text style={styles.deviceInfoValue}>{isPortrait ? 'Vertical' : 'Horizontal'}</Text>
          </View>
        </View>
      </View>

      {/* Breakpoints Visual */}
      <View style={styles.breakpointsContainer}>
        <Text style={styles.breakpointsTitle}>🎯 Breakpoints Definidos</Text>
        <View style={styles.breakpointsList}>
          <View style={[styles.breakpointItem, deviceType === 'phone' && styles.activeBreakpoint]}>
            <Text style={styles.breakpointLabel}>📱 Teléfono</Text>
            <Text style={styles.breakpointRange}>&lt; {breakpoints.small}px</Text>
          </View>
          <View style={[styles.breakpointItem, deviceType === 'tablet-portrait' && styles.activeBreakpoint]}>
            <Text style={styles.breakpointLabel}>📱 Tablet Vertical</Text>
            <Text style={styles.breakpointRange}>{breakpoints.small}px - {breakpoints.medium}px</Text>
          </View>
          <View style={[styles.breakpointItem, deviceType === 'tablet-landscape' && styles.activeBreakpoint]}>
            <Text style={styles.breakpointLabel}>💻 Tablet Horizontal</Text>
            <Text style={styles.breakpointRange}>{breakpoints.medium}px - {breakpoints.large}px</Text>
          </View>
          <View style={[styles.breakpointItem, deviceType === 'desktop' && styles.activeBreakpoint]}>
            <Text style={styles.breakpointLabel}>🖥️ Desktop</Text>
            <Text style={styles.breakpointRange}>&gt; {breakpoints.large}px</Text>
          </View>
        </View>
      </View>

      {/* Responsive Grid */}
      <View style={styles.responsiveContainer}>
        <Text style={styles.responsiveTitle}>🏗️ Grid Responsivo</Text>
        <View style={[
          styles.responsiveGrid,
          deviceType === 'phone' && styles.gridPhone,
          deviceType === 'tablet-portrait' && styles.gridTabletPortrait,
          deviceType === 'tablet-landscape' && styles.gridTabletLandscape,
          deviceType === 'desktop' && styles.gridDesktop,
        ]}>
          {Array.from({ length: 6 }, (_, i) => (
            <View key={i} style={[
              styles.gridItem,
              { backgroundColor: `hsl(${i * 60}, 70%, 60%)` }
            ]}>
              <Text style={styles.gridItemText}>{i + 1}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.gridDescription}>
          {deviceType === 'phone' && '1 columna en teléfonos'}
          {deviceType === 'tablet-portrait' && '2 columnas en tablet vertical'}
          {deviceType === 'tablet-landscape' && '3 columnas en tablet horizontal'}
          {deviceType === 'desktop' && '4 columnas en desktop'}
        </Text>
      </View>

      <View style={styles.codeSection}>
        <Text style={styles.codeTitle}>Código de ejemplo:</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>{`import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const breakpoints = {
  small: 480,
  medium: 768,
  large: 1024,
};

const getDeviceType = (width) => {
  if (width < breakpoints.small) return 'phone';
  if (width < breakpoints.medium) return 'tablet-portrait';
  return 'tablet-landscape';
};

const deviceType = getDeviceType(width);

// Estilos condicionales
const gridStyles = {
  phone: { flexDirection: 'column' },
  'tablet-portrait': { flexDirection: 'row', flexWrap: 'wrap' },
  'tablet-landscape': { flexDirection: 'row' },
};

<View style={[styles.grid, gridStyles[deviceType]]}>
  {items.map(item => (
    <View style={{
      width: deviceType === 'phone' ? '100%' : '50%'
    }}>
      {item}
    </View>
  ))}
</View>`}</Text>
        </View>
      </View>
    </View>
  );

  const renderOrientationExample = () => (
    <View style={styles.exampleSection}>
      <Text style={styles.exampleTitle}>🔄 Orientación Adaptativa</Text>
      <Text style={styles.exampleDescription}>
        Adapta el layout cuando el dispositivo rota entre vertical y horizontal.
      </Text>
      
      {/* Orientation Status */}
      <View style={styles.orientationStatus}>
        <Text style={styles.orientationTitle}>
          📱 Orientación Actual: {isPortrait ? 'Vertical (Portrait)' : 'Horizontal (Landscape)'}
        </Text>
        <Text style={styles.orientationDimensions}>
          {Math.round(screenData.width)} × {Math.round(screenData.height)}
        </Text>
      </View>

      {/* Adaptive Layout */}
      <View style={styles.adaptiveLayout}>
        <Text style={styles.adaptiveTitle}>📋 Layout Adaptativo</Text>
        <View style={[
          styles.adaptiveContainer,
          isPortrait ? styles.portraitLayout : styles.landscapeLayout
        ]}>
          <View style={[styles.adaptiveMain, { backgroundColor: '#4CAF50' }]}>
            <Text style={styles.adaptiveText}>Contenido Principal</Text>
            <Text style={styles.adaptiveSubtext}>
              {isPortrait ? 'Ocupa el 100% en vertical' : 'Ocupa 70% en horizontal'}
            </Text>
          </View>
          <View style={[styles.adaptiveSidebar, { backgroundColor: '#2196F3' }]}>
            <Text style={styles.adaptiveText}>Sidebar</Text>
            <Text style={styles.adaptiveSubtext}>
              {isPortrait ? 'Debajo en vertical' : '30% a la derecha'}
            </Text>
          </View>
        </View>
      </View>

      {/* Orientation-specific Styling */}
      <View style={styles.orientationDemo}>
        <Text style={styles.orientationDemoTitle}>🎨 Estilos por Orientación</Text>
        <View style={[
          styles.orientationCard,
          isPortrait ? styles.portraitCard : styles.landscapeCard
        ]}>
          <Text style={styles.orientationCardTitle}>Tarjeta Adaptativa</Text>
          <Text style={styles.orientationCardText}>
            {isPortrait 
              ? 'En modo vertical: más alta, columnas apiladas'
              : 'En modo horizontal: más ancha, contenido lado a lado'
            }
          </Text>
          <View style={[
            styles.orientationContent,
            isPortrait ? styles.portraitContent : styles.landscapeContent
          ]}>
            <View style={[styles.orientationBlock, { backgroundColor: '#FF9800' }]}>
              <Text style={styles.blockText}>Bloque 1</Text>
            </View>
            <View style={[styles.orientationBlock, { backgroundColor: '#9C27B0' }]}>
              <Text style={styles.blockText}>Bloque 2</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.codeSection}>
        <Text style={styles.codeTitle}>Código de ejemplo:</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>{`import { Dimensions } from 'react-native';

const [screenData, setScreenData] = useState({});

useEffect(() => {
  const updateDimensions = () => {
    const { width, height } = Dimensions.get('window');
    setScreenData({ width, height });
  };
  
  const subscription = Dimensions.addEventListener(
    'change', 
    updateDimensions
  );
  
  return () => subscription?.remove();
}, []);

const isPortrait = screenData.height > screenData.width;

// Estilos adaptativos
<View style={[
  styles.container,
  isPortrait ? styles.portraitLayout : styles.landscapeLayout
]}>
  <View style={{
    width: isPortrait ? '100%' : '70%',
    height: isPortrait ? '60%' : '100%',
  }}>
    Contenido principal
  </View>
</View>`}</Text>
        </View>
      </View>
    </View>
  );

  const renderScaleExample = () => (
    <View style={styles.exampleSection}>
      <Text style={styles.exampleTitle}>🔍 Escalado y Densidad</Text>
      <Text style={styles.exampleDescription}>
        Maneja diferentes densidades de pantalla y escalado de fuentes.
      </Text>
      
      {/* Scale Info */}
      <View style={styles.scaleInfoContainer}>
        <Text style={styles.scaleInfoTitle}>📊 Información de Escalado</Text>
        <View style={styles.scaleInfoGrid}>
          <View style={styles.scaleInfoItem}>
            <Text style={styles.scaleInfoLabel}>Scale:</Text>
            <Text style={styles.scaleInfoValue}>{screenData.scale.toFixed(1)}</Text>
          </View>
          <View style={styles.scaleInfoItem}>
            <Text style={styles.scaleInfoLabel}>Font Scale:</Text>
            <Text style={styles.scaleInfoValue}>{screenData.fontScale.toFixed(2)}</Text>
          </View>
          <View style={styles.scaleInfoItem}>
            <Text style={styles.scaleInfoLabel}>Pixel Ratio:</Text>
            <Text style={styles.scaleInfoValue}>{screenData.pixelRatio.toFixed(1)}</Text>
          </View>
          <View style={styles.scaleInfoItem}>
            <Text style={styles.scaleInfoLabel}>Plataforma:</Text>
            <Text style={styles.scaleInfoValue}>{Platform.OS}</Text>
          </View>
        </View>
      </View>

      {/* Density Examples */}
      <View style={styles.densityContainer}>
        <Text style={styles.densityTitle}>🎯 Ejemplos de Densidad</Text>
        <View style={styles.densityList}>
          <View style={styles.densityItem}>
            <View style={[styles.densityBox, { width: 50, height: 50, backgroundColor: '#F44336' }]}>
              <Text style={styles.densityText}>50dp</Text>
            </View>
            <Text style={styles.densityLabel}>50 DP (Density Points)</Text>
            <Text style={styles.densityPhysical}>
              = {Math.round(50 * screenData.scale)}px físicos
            </Text>
          </View>
          
          <View style={styles.densityItem}>
            <View style={[styles.densityBox, { 
              width: PixelRatio.getPixelSizeForLayoutSize(40), 
              height: PixelRatio.getPixelSizeForLayoutSize(40), 
              backgroundColor: '#4CAF50' 
            }]}>
              <Text style={styles.densityText}>40px</Text>
            </View>
            <Text style={styles.densityLabel}>40 Píxeles Físicos</Text>
            <Text style={styles.densityPhysical}>
              = {PixelRatio.getPixelSizeForLayoutSize(40)}px layout
            </Text>
          </View>
        </View>
      </View>

      {/* Font Scaling */}
      <View style={styles.fontScalingContainer}>
        <Text style={styles.fontScalingTitle}>🔤 Escalado de Fuentes</Text>
        <View style={styles.fontScalingDemo}>
          <Text style={[styles.fontDemo, { fontSize: 12 }]}>
            Texto 12sp (se escala: {Math.round(12 * screenData.fontScale)}px)
          </Text>
          <Text style={[styles.fontDemo, { fontSize: 16 }]}>
            Texto 16sp (se escala: {Math.round(16 * screenData.fontScale)}px)
          </Text>
          <Text style={[styles.fontDemo, { fontSize: 20 }]}>
            Texto 20sp (se escala: {Math.round(20 * screenData.fontScale)}px)
          </Text>
          <Text style={[styles.fontDemo, { fontSize: PixelRatio.get() * 10 }]}>
            Texto con PixelRatio: {PixelRatio.get() * 10}px
          </Text>
        </View>
      </View>

      <View style={styles.codeSection}>
        <Text style={styles.codeTitle}>Código de ejemplo:</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>{`import { PixelRatio, Platform } from 'react-native';

// Información de escala
const { scale, fontScale } = Dimensions.get('window');
const pixelRatio = PixelRatio.get();

// Convertir DP a píxeles físicos
const dpToPixels = (dp) => dp * scale;

// Convertir píxeles físicos a DP
const pixelsToDp = (pixels) => pixels / scale;

// Tamaño de fuente escalado manualmente
const scaledFontSize = (size) => size * fontScale;

// Línea de 1 píxel real (muy útil para bordes)
const hairlineWidth = StyleSheet.hairlineWidth;

// Estilos responsivos a la densidad
const styles = StyleSheet.create({
  container: {
    borderWidth: Platform.select({
      ios: StyleSheet.hairlineWidth,
      android: 1 / PixelRatio.get(),
    }),
  },
  text: {
    fontSize: Platform.select({
      ios: 16,
      android: 16 * PixelRatio.getFontScale(),
    }),
  },
});`}</Text>
        </View>
      </View>
    </View>
  );

  const renderAdaptiveExample = () => (
    <View style={styles.exampleSection}>
      <Text style={styles.exampleTitle}>🎯 Componentes Adaptativos</Text>
      <Text style={styles.exampleDescription}>
        Crea componentes que se adaptan automáticamente al tamaño de pantalla.
      </Text>
      
      {/* Adaptive Card */}
      <View style={styles.adaptiveCardContainer}>
        <Text style={styles.adaptiveCardTitle}>💳 Tarjeta Adaptativa</Text>
        <View style={[
          styles.adaptiveCard,
          screenData.width < 600 ? styles.adaptiveCardMobile : styles.adaptiveCardDesktop
        ]}>
          <View style={[
            styles.adaptiveCardContent,
            screenData.width < 600 ? styles.adaptiveCardContentMobile : styles.adaptiveCardContentDesktop
          ]}>
            <View style={styles.adaptiveCardImage}>
              <Text style={styles.adaptiveCardImageText}>🖼️</Text>
            </View>
            <View style={styles.adaptiveCardInfo}>
              <Text style={[
                styles.adaptiveCardName,
                { fontSize: screenData.width < 600 ? 16 : 20 }
              ]}>
                Producto Adaptativo
              </Text>
              <Text style={[
                styles.adaptiveCardDescription,
                { fontSize: screenData.width < 600 ? 12 : 14 }
              ]}>
                Esta tarjeta cambia su layout según el tamaño de pantalla
              </Text>
              <Text style={[
                styles.adaptiveCardPrice,
                { fontSize: screenData.width < 600 ? 14 : 18 }
              ]}>
                $99.99
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Adaptive Navigation */}
      <View style={styles.adaptiveNavContainer}>
        <Text style={styles.adaptiveNavTitle}>🧭 Navegación Adaptativa</Text>
        <View style={[
          styles.adaptiveNav,
          isTablet ? styles.adaptiveNavTablet : styles.adaptiveNavMobile
        ]}>
          {['Inicio', 'Productos', 'Servicios', 'Contacto'].map((item, index) => (
            <Pressable
              key={index}
              style={[
                styles.adaptiveNavItem,
                isTablet ? styles.adaptiveNavItemTablet : styles.adaptiveNavItemMobile
              ]}
            >
              <Text style={[
                styles.adaptiveNavText,
                { fontSize: isTablet ? 16 : 12 }
              ]}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.adaptiveNavDescription}>
          {isTablet ? 'Navegación horizontal en tablets' : 'Navegación vertical en móviles'}
        </Text>
      </View>

      {/* Responsive Typography */}
      <View style={styles.responsiveTypographyContainer}>
        <Text style={styles.responsiveTypographyTitle}>📝 Tipografía Responsiva</Text>
        <View style={styles.responsiveTypographyDemo}>
          <Text style={[
            styles.responsiveHeading,
            { 
              fontSize: Math.max(16, Math.min(32, screenData.width * 0.06)),
              lineHeight: Math.max(20, Math.min(40, screenData.width * 0.075))
            }
          ]}>
            Título Responsivo
          </Text>
          <Text style={[
            styles.responsiveBody,
            { 
              fontSize: Math.max(12, Math.min(18, screenData.width * 0.035)),
              lineHeight: Math.max(16, Math.min(24, screenData.width * 0.045))
            }
          ]}>
            Este texto se escala proporcionalmente al ancho de la pantalla. 
            En pantallas más grandes será más legible, y en pantallas pequeñas 
            se mantendrá compacto pero readable.
          </Text>
        </View>
      </View>

      <View style={styles.codeSection}>
        <Text style={styles.codeTitle}>Código de ejemplo:</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>{`// Hook personalizado para responsive
const useResponsive = () => {
  const [screen, setScreen] = useState(Dimensions.get('window'));
  
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', 
      ({ window }) => setScreen(window)
    );
    return () => subscription?.remove();
  }, []);
  
  return {
    width: screen.width,
    height: screen.height,
    isTablet: screen.width >= 768,
    isLandscape: screen.width > screen.height,
  };
};

// Componente adaptativo
const AdaptiveCard = ({ children }) => {
  const { width, isTablet } = useResponsive();
  
  return (
    <View style={[
      styles.card,
      {
        flexDirection: isTablet ? 'row' : 'column',
        padding: width < 400 ? 12 : 20,
      }
    ]}>
      {children}
    </View>
  );
};

// Tipografía escalada
const scaledFontSize = (baseSize, screenWidth) => {
  const scale = screenWidth / 375; // iPhone 8 como base
  return Math.max(12, Math.min(baseSize * scale, baseSize * 1.5));
};`}</Text>
        </View>
      </View>
    </View>
  );

  const renderCurrentExample = () => {
    switch (selectedExample) {
      case 'breakpoints':
        return renderBreakpointsExample();
      case 'orientation':
        return renderOrientationExample();
      case 'scale':
        return renderScaleExample();
      case 'adaptive':
        return renderAdaptiveExample();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>📱 Diseño Responsivo</Text>
          <Text style={styles.subtitle}>
            Crea interfaces que se adaptan a cualquier tamaño de pantalla
          </Text>
        </View>

        {renderExampleSelector()}

        <View style={styles.content}>
          {renderCurrentExample()}
        </View>

        <View style={styles.bestPracticesSection}>
          <Text style={styles.bestPracticesTitle}>✅ Mejores Prácticas Responsivas</Text>
          <View style={styles.practicesList}>
            <Text style={styles.practiceItem}>
              📐 <Text style={styles.bold}>Define breakpoints</Text> claros para diferentes dispositivos
            </Text>
            <Text style={styles.practiceItem}>
              🔄 <Text style={styles.bold}>Escucha cambios</Text> de orientación y dimensiones
            </Text>
            <Text style={styles.practiceItem}>
              📏 <Text style={styles.bold}>Usa porcentajes</Text> y flex para layouts fluidos
            </Text>
            <Text style={styles.practiceItem}>
              🔤 <Text style={styles.bold}>Escala tipografía</Text> apropiadamente
            </Text>
            <Text style={styles.practiceItem}>
              🎯 <Text style={styles.bold}>Testa en dispositivos</Text> reales y simuladores
            </Text>
            <Text style={styles.practiceItem}>
              📱 <Text style={styles.bold}>Considera usabilidad</Text> en diferentes tamaños
            </Text>
          </View>
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
  selectorContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 12,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  selectorButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#007AFF',
  },
  selectorText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  selectedText: {
    color: '#fff',
  },
  content: {
    margin: 10,
  },
  exampleSection: {
    backgroundColor: '#fff',
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
    marginBottom: 20,
  },
  deviceInfoContainer: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  deviceInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 12,
  },
  deviceInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  deviceInfoItem: {
    flex: 1,
    minWidth: '40%',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  deviceInfoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  deviceInfoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  breakpointsContainer: {
    marginBottom: 20,
  },
  breakpointsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  breakpointsList: {
    gap: 8,
  },
  breakpointItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeBreakpoint: {
    backgroundColor: '#e8f5e8',
    borderColor: '#4CAF50',
  },
  breakpointLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  breakpointRange: {
    fontSize: 12,
    color: '#666',
  },
  responsiveContainer: {
    marginBottom: 20,
  },
  responsiveTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  responsiveGrid: {
    gap: 8,
    marginBottom: 8,
  },
  gridPhone: {
    flexDirection: 'column',
  },
  gridTabletPortrait: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridTabletLandscape: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    height: 60,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minWidth: '48%',
  },
  gridItemText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  gridDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  orientationStatus: {
    backgroundColor: '#fff3e0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  orientationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 6,
  },
  orientationDimensions: {
    fontSize: 14,
    color: '#E65100',
  },
  adaptiveLayout: {
    marginBottom: 20,
  },
  adaptiveTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  adaptiveContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    minHeight: 200,
  },
  portraitLayout: {
    flexDirection: 'column',
  },
  landscapeLayout: {
    flexDirection: 'row',
  },
  adaptiveMain: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adaptiveSidebar: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adaptiveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  adaptiveSubtext: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  orientationDemo: {
    marginBottom: 20,
  },
  orientationDemoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  orientationCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
  },
  portraitCard: {
    minHeight: 200,
  },
  landscapeCard: {
    minHeight: 120,
  },
  orientationCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  orientationCardText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  orientationContent: {
    gap: 8,
  },
  portraitContent: {
    flexDirection: 'column',
  },
  landscapeContent: {
    flexDirection: 'row',
  },
  orientationBlock: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  blockText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scaleInfoContainer: {
    backgroundColor: '#f3e5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  scaleInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 12,
  },
  scaleInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  scaleInfoItem: {
    flex: 1,
    minWidth: '40%',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  scaleInfoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  scaleInfoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7B1FA2',
  },
  densityContainer: {
    marginBottom: 20,
  },
  densityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  densityList: {
    gap: 16,
  },
  densityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  densityBox: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  densityText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  densityLabel: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  densityPhysical: {
    fontSize: 12,
    color: '#666',
  },
  fontScalingContainer: {
    marginBottom: 20,
  },
  fontScalingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  fontScalingDemo: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    gap: 12,
  },
  fontDemo: {
    color: '#333',
    textAlign: 'left',
  },
  adaptiveCardContainer: {
    marginBottom: 20,
  },
  adaptiveCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  adaptiveCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  adaptiveCardMobile: {
    padding: 12,
  },
  adaptiveCardDesktop: {
    padding: 20,
  },
  adaptiveCardContent: {
    alignItems: 'center',
  },
  adaptiveCardContentMobile: {
    flexDirection: 'column',
  },
  adaptiveCardContentDesktop: {
    flexDirection: 'row',
    gap: 20,
  },
  adaptiveCardImage: {
    width: 80,
    height: 80,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  adaptiveCardImageText: {
    fontSize: 24,
  },
  adaptiveCardInfo: {
    flex: 1,
    alignItems: 'center',
  },
  adaptiveCardName: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  adaptiveCardDescription: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  adaptiveCardPrice: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  adaptiveNavContainer: {
    marginBottom: 20,
  },
  adaptiveNavTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  adaptiveNav: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  adaptiveNavMobile: {
    flexDirection: 'column',
    gap: 4,
  },
  adaptiveNavTablet: {
    flexDirection: 'row',
    gap: 8,
  },
  adaptiveNavItem: {
    backgroundColor: '#007AFF',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adaptiveNavItemMobile: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  adaptiveNavItemTablet: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  adaptiveNavText: {
    color: '#fff',
    fontWeight: '600',
  },
  adaptiveNavDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  responsiveTypographyContainer: {
    marginBottom: 20,
  },
  responsiveTypographyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  responsiveTypographyDemo: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
  },
  responsiveHeading: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  responsiveBody: {
    color: '#666',
  },
  codeSection: {
    marginTop: 20,
  },
  codeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  codeBlock: {
    backgroundColor: '#2d3748',
    padding: 16,
    borderRadius: 8,
  },
  codeText: {
    fontFamily: 'Courier',
    fontSize: 10,
    color: '#a0aec0',
    lineHeight: 14,
  },
  bestPracticesSection: {
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
  bestPracticesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  practicesList: {
    gap: 12,
  },
  practiceItem: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ResponsiveStylesExample;

