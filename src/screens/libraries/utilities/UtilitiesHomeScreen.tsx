import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UtilitiesHomeScreen = ({ navigation }: any) => {
  const utilityLibraries = [
    {
      id: 'jailmonkey',
      title: 'Jail Monkey',
      description: 'Detección de jailbreak/root en dispositivos',
      icon: '🔒',
      color: '#FF3B30',
      installed: true,
      version: '2.8.4',
      features: [
        'Detección de Jailbreak (iOS)',
        'Detección de Root (Android)',
        'Detección de Debug Mode',
        'Detección de Mock Location'
      ],
      useCases: [
        'Apps bancarias y financieras',
        'Apps de seguridad',
        'Validación de integridad',
        'Protección anti-fraude'
      ]
    },
    {
      id: 'camera',
      title: 'React Native Camera',
      description: 'Acceso completo a cámara y galería',
      icon: '📷',
      color: '#007AFF',
      installed: false,
      version: 'TBD',
      features: [
        'Captura de fotos y videos',
        'Scanner de códigos QR/Barcode',
        'Filtros en tiempo real',
        'Acceso a galería'
      ],
      useCases: [
        'Apps de redes sociales',
        'E-commerce (fotos productos)',
        'Apps de documentos',
        'Realidad aumentada básica'
      ]
    },
    {
      id: 'splashscreen',
      title: 'React Native Splash Screen',
      description: 'Pantalla de carga nativa customizable',
      icon: '🚀',
      color: '#34C759',
      installed: true,
      version: '3.3.0',
      features: [
        'Splash screen nativo',
        'Control programático',
        'Customización completa',
        'Animaciones de entrada'
      ],
      useCases: [
        'Branding de aplicación',
        'Carga de recursos iniciales',
        'Transiciones suaves',
        'Experiencia de usuario mejorada'
      ]
    },
    {
      id: 'svg',
      title: 'React Native SVG',
      description: 'Renderizado de gráficos vectoriales SVG',
      icon: '🎨',
      color: '#FF9500',
      installed: true,
      version: '15.12.1',
      features: [
        'Renderizado SVG nativo',
        'Animaciones vectoriales',
        'Iconos escalables',
        'Gráficos complejos'
      ],
      useCases: [
        'Iconografía de aplicación',
        'Gráficos e ilustraciones',
        'Mapas y diagramas',
        'Animaciones vectoriales'
      ]
    },
    {
      id: 'webview',
      title: 'React Native WebView',
      description: 'Vista web embebida con control total',
      icon: '🌐',
      color: '#AF52DE',
      installed: true,
      version: '13.16.0',
      features: [
        'Navegación web completa',
        'JavaScript bridge',
        'Control de navegación',
        'Inyección de código'
      ],
      useCases: [
        'Contenido web embebido',
        'Autenticación OAuth',
        'Documentación in-app',
        'Mini navegador'
      ]
    }
  ];

  const renderUtilityCard = (utility: any) => (
    <View
      key={utility.id}
      style={[styles.utilityCard, { borderLeftColor: utility.color }]}>
      
      <View style={styles.cardHeader}>
        <Text style={styles.utilityIcon}>{utility.icon}</Text>
        <View style={styles.utilityInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.utilityTitle}>{utility.title}</Text>
            {utility.installed ? (
              <View style={styles.installedBadge}>
                <Text style={styles.installedText}>Instalado</Text>
              </View>
            ) : (
              <View style={styles.notInstalledBadge}>
                <Text style={styles.notInstalledText}>Pendiente</Text>
              </View>
            )}
          </View>
          <Text style={styles.utilityDescription}>{utility.description}</Text>
          <Text style={styles.versionText}>Versión: {utility.version}</Text>
        </View>
      </View>

      <View style={styles.featuresSection}>
        <Text style={styles.featuresTitle}>Características:</Text>
        <View style={styles.featuresList}>
          {utility.features.map((feature: string, index: number) => (
            <Text key={index} style={styles.featureItem}>• {feature}</Text>
          ))}
        </View>
      </View>

      <View style={styles.useCasesSection}>
        <Text style={styles.useCasesTitle}>Casos de uso:</Text>
        <View style={styles.useCasesList}>
          {utility.useCases.map((useCase: string, index: number) => (
            <View key={index} style={styles.useCaseTag}>
              <Text style={[styles.useCaseText, { color: utility.color }]}>
                {useCase}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {!utility.installed && (
        <View style={styles.comingSoonSection}>
          <Text style={styles.comingSoonText}>
            🚧 Próximamente: Ejemplos y implementación completa
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Utility Libraries</Text>
          <Text style={styles.subtitle}>
            Herramientas útiles para el desarrollo profesional
          </Text>
          <Text style={styles.description}>
            Librerías especializadas que agregan funcionalidades específicas 
            a tu aplicación React Native. Cada una resuelve problemas comunes 
            del desarrollo móvil.
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>🔧 ¿Por qué usar Utility Libraries?</Text>
          <Text style={styles.infoText}>
            Las utility libraries están especializadas en resolver problemas 
            específicos con implementaciones optimizadas y probadas en producción.
          </Text>
          
          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>💡 Beneficios:</Text>
            <Text style={styles.benefitItem}>• Funcionalidades nativas específicas</Text>
            <Text style={styles.benefitItem}>• Implementaciones optimizadas</Text>
            <Text style={styles.benefitItem}>• Mantenimiento activo</Text>
            <Text style={styles.benefitItem}>• Documentación especializada</Text>
            <Text style={styles.benefitItem}>• Casos de uso bien definidos</Text>
          </View>
        </View>

        <View style={styles.statusSection}>
          <Text style={styles.statusTitle}>📊 Estado de Implementación</Text>
          <View style={styles.statusGrid}>
            <View style={styles.statusItem}>
              <Text style={styles.statusNumber}>3</Text>
              <Text style={styles.statusLabel}>Instaladas</Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={styles.statusNumber}>2</Text>
              <Text style={styles.statusLabel}>Pendientes</Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={styles.statusNumber}>5</Text>
              <Text style={styles.statusLabel}>Total</Text>
            </View>
          </View>
        </View>

        <View style={styles.utilitiesSection}>
          <Text style={styles.utilitiesTitle}>Librerías Disponibles</Text>
          {utilityLibraries.map(renderUtilityCard)}
        </View>

        <View style={styles.roadmapSection}>
          <Text style={styles.roadmapTitle}>🗺️ Roadmap de Implementación</Text>
          <View style={styles.roadmapList}>
            <View style={styles.roadmapItem}>
              <Text style={styles.roadmapIcon}>✅</Text>
              <Text style={styles.roadmapText}>Jail Monkey - Detección de seguridad</Text>
            </View>
            <View style={styles.roadmapItem}>
              <Text style={styles.roadmapIcon}>✅</Text>
              <Text style={styles.roadmapText}>Splash Screen - Pantalla de carga</Text>
            </View>
            <View style={styles.roadmapItem}>
              <Text style={styles.roadmapIcon}>✅</Text>
              <Text style={styles.roadmapText}>SVG - Gráficos vectoriales</Text>
            </View>
            <View style={styles.roadmapItem}>
              <Text style={styles.roadmapIcon}>✅</Text>
              <Text style={styles.roadmapText}>WebView - Navegación web</Text>
            </View>
            <View style={styles.roadmapItem}>
              <Text style={styles.roadmapIcon}>⏳</Text>
              <Text style={styles.roadmapText}>Camera - Próxima implementación</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🚀 Las librerías instaladas están listas para usar en ejemplos prácticos
          </Text>
          <Text style={styles.footerSubtext}>
            Las librerías pendientes se implementarán en futuras versiones
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    fontSize: 18,
    fontWeight: '600',
    color: '#8E44AD',
    marginBottom: 12,
  },
  description: {
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
    borderLeftColor: '#8E44AD',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a1b9a',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#6a1b9a',
    lineHeight: 24,
    marginBottom: 16,
  },
  benefitsContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6a1b9a',
    marginBottom: 8,
  },
  benefitItem: {
    fontSize: 14,
    color: '#6a1b9a',
    marginBottom: 4,
  },
  statusSection: {
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
    elevation: 3,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  statusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statusItem: {
    alignItems: 'center',
  },
  statusNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8E44AD',
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  utilitiesSection: {
    padding: 10,
  },
  utilitiesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  utilityCard: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderLeftWidth: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  utilityIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  utilityInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  utilityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  installedBadge: {
    backgroundColor: '#d4edda',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  installedText: {
    fontSize: 12,
    color: '#155724',
    fontWeight: '600',
  },
  notInstalledBadge: {
    backgroundColor: '#fff3cd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  notInstalledText: {
    fontSize: 12,
    color: '#856404',
    fontWeight: '600',
  },
  utilityDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  featuresSection: {
    marginBottom: 16,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  featuresList: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  featureItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
  useCasesSection: {
    marginBottom: 16,
  },
  useCasesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  useCasesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  useCaseTag: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  useCaseText: {
    fontSize: 12,
    fontWeight: '500',
  },
  comingSoonSection: {
    backgroundColor: '#fff9e6',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#FF9500',
  },
  comingSoonText: {
    fontSize: 14,
    color: '#cc6600',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  roadmapSection: {
    backgroundColor: '#e8f5e8',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  roadmapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 16,
  },
  roadmapList: {
    gap: 12,
  },
  roadmapItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roadmapIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 20,
  },
  roadmapText: {
    fontSize: 14,
    color: '#2e7d32',
    lineHeight: 20,
    flex: 1,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  footerSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default UtilitiesHomeScreen;
