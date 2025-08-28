import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Command {
  title: string;
  command: string;
  description: string;
  example?: string;
  category: string;
}

interface CommandCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  commands: Command[];
}

const CheatSheetScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('project');

  const commandCategories: CommandCategory[] = [
    {
      id: 'project',
      title: 'Gestión de Proyecto',
      icon: '🚀',
      color: '#4CAF50',
      commands: [
        {
          title: 'Crear nuevo proyecto',
          command: 'npx react-native@latest init MyApp',
          description: 'Crea un nuevo proyecto React Native con la última versión',
          category: 'project'
        },
        {
          title: 'Crear proyecto con TypeScript',
          command: 'npx react-native@latest init MyApp --template react-native-template-typescript',
          description: 'Crea un proyecto con TypeScript configurado',
          category: 'project'
        },
        {
          title: 'Instalar dependencias',
          command: 'npm install # o yarn install',
          description: 'Instala todas las dependencias del proyecto',
          category: 'project'
        },
        {
          title: 'Limpiar caché',
          command: 'npx react-native start --reset-cache',
          description: 'Reinicia Metro bundler limpiando toda la caché',
          category: 'project'
        }
      ]
    },
    {
      id: 'development',
      title: 'Desarrollo',
      icon: '⚡',
      color: '#FF9800',
      commands: [
        {
          title: 'Iniciar Metro bundler',
          command: 'npm start',
          description: 'Inicia el servidor de desarrollo Metro',
          example: 'También: npx react-native start',
          category: 'development'
        },
        {
          title: 'Metro con reset de caché',
          command: 'npm start -- --reset-cache',
          description: 'Inicia Metro limpiando toda la caché',
          category: 'development'
        },
        {
          title: 'Ejecutar en Android',
          command: 'npx react-native run-android',
          description: 'Compila y ejecuta la app en dispositivo/emulador Android',
          category: 'development'
        },
        {
          title: 'Ejecutar en iOS',
          command: 'npx react-native run-ios',
          description: 'Compila y ejecuta la app en simulador iOS',
          category: 'development'
        },
        {
          title: 'iOS en simulador específico',
          command: "npx react-native run-ios --simulator='iPhone 16'",
          description: 'Ejecuta en un simulador específico de iOS',
          example: "Otros: 'iPhone 15 Pro', 'iPad Air'",
          category: 'development'
        },
        {
          title: 'Recargar app remotamente',
          command: 'adb shell input keyevent 82',
          description: 'Abre el menú de desarrollo en Android vía ADB',
          category: 'development'
        }
      ]
    },
    {
      id: 'android',
      title: 'Android Build',
      icon: '🤖',
      color: '#4CAF50',
      commands: [
        {
          title: 'Generar APK Debug',
          command: 'cd android && ./gradlew assembleDebug',
          description: 'Genera un APK de debug para pruebas',
          category: 'android'
        },
        {
          title: 'Generar APK Release',
          command: 'cd android && ./gradlew assembleRelease',
          description: 'Genera un APK firmado para distribución',
          category: 'android'
        },
        {
          title: 'Generar AAB Release',
          command: 'cd android && ./gradlew bundleRelease',
          description: 'Genera un Android App Bundle para Google Play Store',
          category: 'android'
        },
        {
          title: 'Limpiar build Android',
          command: 'cd android && ./gradlew clean',
          description: 'Limpia todos los archivos de build de Android',
          category: 'android'
        },
        {
          title: 'Crear Keystore',
          command: 'keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000',
          description: 'Genera un keystore para firmar APKs de release',
          category: 'android'
        },
        {
          title: 'Ver certificado Keystore',
          command: 'keytool -list -v -keystore my-upload-key.keystore -alias my-key-alias',
          description: 'Muestra información del certificado en el keystore',
          category: 'android'
        }
      ]
    },
    {
      id: 'ios',
      title: 'iOS Build',
      icon: '🍎',
      color: '#007AFF',
      commands: [
        {
          title: 'Instalar pods',
          command: 'cd ios && pod install',
          description: 'Instala las dependencias nativas de iOS',
          category: 'ios'
        },
        {
          title: 'Actualizar pods',
          command: 'cd ios && pod update',
          description: 'Actualiza todas las dependencias de CocoaPods',
          category: 'ios'
        },
        {
          title: 'Limpiar pods',
          command: 'cd ios && pod deintegrate && pod install',
          description: 'Limpia e reinstala todas las dependencias',
          category: 'ios'
        },
        {
          title: 'Build desde Xcode',
          command: 'open ios/YourApp.xcworkspace',
          description: 'Abre el proyecto en Xcode para build manual',
          category: 'ios'
        },
        {
          title: 'Limpiar DerivedData',
          command: 'rm -rf ~/Library/Developer/Xcode/DerivedData',
          description: 'Limpia la caché de build de Xcode',
          category: 'ios'
        }
      ]
    },
    {
      id: 'debugging',
      title: 'Debug & Testing',
      icon: '🐛',
      color: '#F44336',
      commands: [
        {
          title: 'Logs en tiempo real',
          command: 'npx react-native log-android',
          description: 'Muestra logs en tiempo real para Android',
          example: 'iOS: npx react-native log-ios',
          category: 'debugging'
        },
        {
          title: 'Flipper debugger',
          command: 'npx flipper',
          description: 'Abre Flipper para debugging avanzado',
          category: 'debugging'
        },
        {
          title: 'ADB devices',
          command: 'adb devices',
          description: 'Lista dispositivos Android conectados',
          category: 'debugging'
        },
        {
          title: 'Reverse port (Android)',
          command: 'adb reverse tcp:8081 tcp:8081',
          description: 'Configura port forwarding para Metro en Android',
          category: 'debugging'
        },
        {
          title: 'Ejecutar tests',
          command: 'npm test',
          description: 'Ejecuta la suite de tests del proyecto',
          example: 'También: yarn test',
          category: 'debugging'
        },
        {
          title: 'Lint código',
          command: 'npm run lint',
          description: 'Ejecuta ESLint para verificar calidad del código',
          category: 'debugging'
        }
      ]
    },
    {
      id: 'dependencies',
      title: 'Dependencias',
      icon: '📦',
      color: '#9C27B0',
      commands: [
        {
          title: 'Instalar librería',
          command: 'npm install react-native-library',
          description: 'Instala una nueva dependencia',
          example: 'yarn add react-native-library',
          category: 'dependencies'
        },
        {
          title: 'Instalar dependencia dev',
          command: 'npm install --save-dev library',
          description: 'Instala dependencia solo para desarrollo',
          category: 'dependencies'
        },
        {
          title: 'Auto-link dependencias',
          command: 'npx react-native unlink && npx react-native link',
          description: 'Re-vincula automáticamente las dependencias nativas',
          category: 'dependencies'
        },
        {
          title: 'Verificar dependencias',
          command: 'npx react-native doctor',
          description: 'Verifica la configuración del entorno de desarrollo',
          category: 'dependencies'
        },
        {
          title: 'Actualizar React Native',
          command: 'npx react-native upgrade',
          description: 'Actualiza React Native a la última versión',
          category: 'dependencies'
        }
      ]
    },
    {
      id: 'useful',
      title: 'Comandos Útiles',
      icon: '🛠️',
      color: '#607D8B',
      commands: [
        {
          title: 'Información del sistema',
          command: 'npx react-native info',
          description: 'Muestra información del entorno de desarrollo',
          category: 'useful'
        },
        {
          title: 'Generar icono splash',
          command: 'npx react-native generate-bootsplash',
          description: 'Genera splash screen (requiere react-native-bootsplash)',
          category: 'useful'
        },
        {
          title: 'Bundle analyzer',
          command: 'npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android-release.bundle --assets-dest ./assets',
          description: 'Genera bundle para analizar tamaño',
          category: 'useful'
        },
        {
          title: 'Hermes bytecode',
          command: 'npx hermesc -emit-binary source.js -out output.hbc',
          description: 'Compila JavaScript a bytecode de Hermes',
          category: 'useful'
        },
        {
          title: 'Limpiar todo',
          command: 'npx react-native clean',
          description: 'Limpia caché de Metro, node_modules, builds Android/iOS',
          category: 'useful'
        }
      ]
    }
  ];

  const selectedCategoryData = commandCategories.find(cat => cat.id === selectedCategory);

  const copyToClipboard = async (command: string) => {
    try {
      await Share.share({
        message: command,
      });
    } catch (error) {
      Alert.alert('Info', `Comando: ${command}`);
    }
  };

  const renderCategoryTabs = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
      {commandCategories.map((category) => (
        <Pressable
          key={category.id}
          style={[
            styles.tab,
            selectedCategory === category.id && { backgroundColor: category.color + '20', borderColor: category.color }
          ]}
          onPress={() => setSelectedCategory(category.id)}
        >
          <Text style={styles.tabIcon}>{category.icon}</Text>
          <Text style={[
            styles.tabText,
            selectedCategory === category.id && { color: category.color, fontWeight: 'bold' }
          ]}>
            {category.title}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );

  const renderCommand = (command: Command) => (
    <Pressable
      key={command.title}
      style={styles.commandCard}
      onPress={() => copyToClipboard(command.command)}
      android_ripple={{ color: '#e0e0e0' }}
    >
      <View style={styles.commandHeader}>
        <Text style={styles.commandTitle}>{command.title}</Text>
        <Text style={styles.copyIcon}>📋</Text>
      </View>
      
      <View style={styles.commandCodeContainer}>
        <Text style={styles.commandCode}>{command.command}</Text>
      </View>
      
      <Text style={styles.commandDescription}>{command.description}</Text>
      
      {command.example && (
        <View style={styles.exampleContainer}>
          <Text style={styles.exampleLabel}>💡 Ejemplo/Nota:</Text>
          <Text style={styles.exampleText}>{command.example}</Text>
        </View>
      )}
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>📚 React Native CheatSheet</Text>
        <Text style={styles.subtitle}>
          Comandos esenciales para desarrollo React Native
        </Text>
      </View>

      {renderCategoryTabs()}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedCategoryData && (
          <View style={styles.categorySection}>
            <View style={[styles.categoryHeader, { backgroundColor: selectedCategoryData.color + '15' }]}>
              <Text style={styles.categoryIcon}>{selectedCategoryData.icon}</Text>
              <View style={styles.categoryInfo}>
                <Text style={[styles.categoryTitle, { color: selectedCategoryData.color }]}>
                  {selectedCategoryData.title}
                </Text>
                <Text style={styles.categoryCount}>
                  {selectedCategoryData.commands.length} comandos
                </Text>
              </View>
            </View>

            <View style={styles.commandsList}>
              {selectedCategoryData.commands.map(renderCommand)}
            </View>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            💡 Toca cualquier comando para copiarlo o compartirlo
          </Text>
          <Text style={styles.footerSubtext}>
            Asegúrate de estar en la carpeta correcta del proyecto antes de ejecutar comandos
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  tabsContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#f5f5f5',
    gap: 6,
  },
  tabIcon: {
    fontSize: 16,
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    flex: 1,
  },
  categorySection: {
    margin: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 14,
    color: '#666',
  },
  commandsList: {
    gap: 12,
  },
  commandCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  commandHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  commandTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  copyIcon: {
    fontSize: 16,
    opacity: 0.6,
  },
  commandCodeContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  commandCode: {
    fontFamily: 'Courier',
    fontSize: 13,
    color: '#4CAF50',
    lineHeight: 18,
  },
  commandDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  exampleContainer: {
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  exampleLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 4,
  },
  exampleText: {
    fontSize: 13,
    color: '#1976D2',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default CheatSheetScreen;
