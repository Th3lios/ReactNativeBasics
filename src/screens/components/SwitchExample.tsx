import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SwitchExample: React.FC = () => {
  // Estados para diferentes switches
  const [isEnabled, setIsEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(false);
  const [biometrics, setBiometrics] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  // Configuraciones de la app
  const [settings, setSettings] = useState({
    wifi: true,
    bluetooth: false,
    airplane: false,
    hotspot: false,
    nfc: true,
  });

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleNotificationChange = (value: boolean) => {
    setNotifications(value);
    if (value) {
      Alert.alert(
        'Notificaciones Activadas',
        'Ahora recibirás notificaciones de la app',
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        'Notificaciones Desactivadas',
        'Ya no recibirás notificaciones',
        [{ text: 'OK' }]
      );
    }
  };

  const handleBiometricsChange = (value: boolean) => {
    setBiometrics(value);
    if (value) {
      Alert.alert(
        'Autenticación Biométrica',
        'Se ha activado el desbloqueo con huella/Face ID',
        [{ text: 'Entendido' }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Switch Component</Text>
          <Text style={styles.subtitle}>
            Controles de encendido/apagado para opciones binarias
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 Ejemplo Básico</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Switch Simple</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <Text style={styles.description}>
            Estado actual: {isEnabled ? 'Activado' : 'Desactivado'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Configuraciones de App</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>🌙 Modo Oscuro</Text>
              <Text style={styles.settingDescription}>
                Activa el tema oscuro para reducir fatiga visual
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#4CAF50' }}
              thumbColor={darkMode ? '#ffffff' : '#f4f3f4'}
              onValueChange={setDarkMode}
              value={darkMode}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>🔔 Notificaciones</Text>
              <Text style={styles.settingDescription}>
                Recibe alertas y actualizaciones importantes
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#FF9800' }}
              thumbColor={notifications ? '#ffffff' : '#f4f3f4'}
              onValueChange={handleNotificationChange}
              value={notifications}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>📍 Servicios de Ubicación</Text>
              <Text style={styles.settingDescription}>
                Permite a la app acceder a tu ubicación
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#2196F3' }}
              thumbColor={locationServices ? '#ffffff' : '#f4f3f4'}
              onValueChange={setLocationServices}
              value={locationServices}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>🔐 Autenticación Biométrica</Text>
              <Text style={styles.settingDescription}>
                Desbloqueo con huella digital o Face ID
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#9C27B0' }}
              thumbColor={biometrics ? '#ffffff' : '#f4f3f4'}
              onValueChange={handleBiometricsChange}
              value={biometrics}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>💾 Guardado Automático</Text>
              <Text style={styles.settingDescription}>
                Guarda cambios automáticamente
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#4CAF50' }}
              thumbColor={autoSave ? '#ffffff' : '#f4f3f4'}
              onValueChange={setAutoSave}
              value={autoSave}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📶 Conectividad</Text>
          
          {Object.entries(settings).map(([key, value]) => {
            const settingLabels = {
              wifi: { icon: '📶', title: 'Wi-Fi', color: '#2196F3' },
              bluetooth: { icon: '🔵', title: 'Bluetooth', color: '#3F51B5' },
              airplane: { icon: '✈️', title: 'Modo Avión', color: '#FF5722' },
              hotspot: { icon: '📡', title: 'Hotspot', color: '#FF9800' },
              nfc: { icon: '📱', title: 'NFC', color: '#4CAF50' },
            };

            const setting = settingLabels[key as keyof typeof settingLabels];
            
            return (
              <View key={key} style={styles.connectivityItem}>
                <Text style={styles.connectivityLabel}>
                  {setting.icon} {setting.title}
                </Text>
                <Switch
                  trackColor={{ false: '#767577', true: setting.color }}
                  thumbColor={value ? '#ffffff' : '#f4f3f4'}
                  onValueChange={() => handleSettingChange(key as keyof typeof settings)}
                  value={value}
                />
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎨 Variaciones de Estilo</Text>
          
          <View style={styles.styleVariation}>
            <Text style={styles.variationTitle}>Switch Estilo iOS</Text>
            <Switch
              trackColor={{ false: '#E0E0E0', true: '#34C759' }}
              thumbColor="#ffffff"
              ios_backgroundColor="#E0E0E0"
              onValueChange={() => {}}
              value={true}
            />
          </View>

          <View style={styles.styleVariation}>
            <Text style={styles.variationTitle}>Switch Estilo Material</Text>
            <Switch
              trackColor={{ false: '#BDBDBD', true: '#81C784' }}
              thumbColor="#ffffff"
              onValueChange={() => {}}
              value={true}
            />
          </View>

          <View style={styles.styleVariation}>
            <Text style={styles.variationTitle}>Switch Personalizado</Text>
            <Switch
              trackColor={{ false: '#FFE0E0', true: '#E8F5E8' }}
              thumbColor="#FF6B6B"
              onValueChange={() => {}}
              value={false}
            />
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>💡 Buenas Prácticas</Text>
          <View style={styles.tipContainer}>
            <Text style={styles.tip}>• Usa labels claros que describan exactamente qué hace el switch</Text>
            <Text style={styles.tip}>• Proporciona feedback inmediato cuando sea apropiado</Text>
            <Text style={styles.tip}>• Agrupa switches relacionados en secciones</Text>
            <Text style={styles.tip}>• Usa colores consistentes para acciones similares</Text>
            <Text style={styles.tip}>• Considera el estado por defecto cuidadosamente</Text>
            <Text style={styles.tip}>• Haz que el área de toque sea lo suficientemente grande</Text>
          </View>
        </View>

        <View style={styles.codeSection}>
          <Text style={styles.codeTitle}>📝 Código de Ejemplo</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{`import { Switch } from 'react-native';

const [isEnabled, setIsEnabled] = useState(false);

<Switch
  trackColor={{ false: '#767577', true: '#81b0ff' }}
  thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
  ios_backgroundColor="#3e3e3e"
  onValueChange={setIsEnabled}
  value={isEnabled}
/>`}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            El Switch es perfecto para configuraciones on/off y preferencias de usuario
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  connectivityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  connectivityLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  styleVariation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 8,
  },
  variationTitle: {
    fontSize: 16,
    color: '#333',
  },
  infoSection: {
    backgroundColor: '#e3f2fd',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 12,
  },
  tipContainer: {
    gap: 6,
  },
  tip: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
  codeSection: {
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
  codeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  codeBlock: {
    backgroundColor: '#2d3748',
    padding: 16,
    borderRadius: 8,
  },
  codeText: {
    fontFamily: 'Courier',
    fontSize: 12,
    color: '#a0aec0',
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

export default SwitchExample;
