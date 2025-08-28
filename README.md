# React Native Sandbox 📱

Un proyecto completo de aprendizaje y referencia para React Native, que incluye ejemplos interactivos de componentes básicos, hooks, librerías populares y mejores prácticas.

## 🎯 Objetivo del Proyecto

Este proyecto sirve como una **guía completa y práctica** para desarrolladores que quieren aprender o referenciar:

- **Componentes básicos** de React Native
- **Hooks** de React y React Native  
- **Librerías populares** del ecosistema
- **Patrones de desarrollo** y mejores prácticas
- **Ejemplos interactivos** con código funcional

## 📚 Contenido Implementado

### 🧩 **Componentes Básicos**
Ejemplos interactivos de todos los componentes fundamentales:

- **View** - Contenedor básico con ejemplos de layout
- **Text** - Renderizado de texto con estilos y propiedades
- **ScrollView** - Scroll vertical y horizontal con contenido
- **FlatList** - Listas optimizadas con datos dinámicos
- **Button** - Botones básicos con diferentes estados
- **Pressable** - Componente de presión avanzado
- **TouchableOpacity** - Botones con feedback visual
- **TouchableHighlight** - Botones con highlight personalizable
- **Modal** - Modales con diferentes tipos y animaciones
- **Image** - Carga de imágenes locales y remotas
- **TextInput** - Inputs con validación (incluye RUT chileno)

### 🪝 **Hooks Completos**
Ejemplos detallados con casos de uso reales:

- **useState** - Manejo de estado local con contadores y toggles
- **useEffect** - Efectos secundarios y lifecycle
- **useLayoutEffect** - Efectos síncronos para layouts
- **useMemo** - Optimización con memoización de valores
- **useCallback** - Optimización de funciones
- **useImperativeHandle** - Exposición de refs personalizados
- **React.memo** - Optimización de componentes
- **Custom Hooks** - 7 hooks personalizados modulares:
  - `useCounter` - Contador con incremento/decremento
  - `useToggle` - Toggle booleano
  - `useLocalStorage` - Persistencia en AsyncStorage
  - `useFetch` - Llamadas HTTP con estados
  - `useDebounce` - Debounce para inputs
  - `useInterval` - Intervalos con cleanup
  - `useForm` - Manejo de formularios

### 📚 **Librerías Populares**
Implementación y ejemplos de las librerías más utilizadas:

#### 🧭 **React Navigation**
- **Stack Navigator** - Navegación de pila con parámetros
- **Bottom Tabs** - Tabs inferiores personalizables
- **Top Tabs** - Material top tabs con swipe
- **Drawer Navigator** - Menú lateral deslizante
- **Configuración avanzada** - Headers, deep linking, etc.

#### 📝 **Forms & Validation**
- **Formik** - Manejo robusto de formularios
- **Yup** - Validación declarativa con esquemas
- **Ejemplos complejos** - Arrays, objetos anidados, validación async

#### 🎬 **Animations**
- **React Native Reanimated 3** - Animaciones fluidas
- **Gesture Handler** - Gestos interactivos
- **Layout Animations** - Transiciones automáticas

#### 📋 **UI Components**
- **Gorhom Bottom Sheet** - Bottom sheets modernos
- **Custom Backdrops** - Fondos personalizables
- **Snap Points** - Puntos de anclaje dinámicos

#### 🔧 **Utility Libraries**
- **Jail Monkey** - Detección de jailbreak/root
- **React Native Camera** - Cámara y galería
- **Splash Screen** - Pantalla de carga nativa
- **SVG** - Gráficos vectoriales
- **WebView** - Vista web embebida

## 🏗️ Arquitectura del Proyecto

```
src/
├── screens/
│   ├── components/          # Ejemplos de componentes básicos
│   ├── hooks/              # Ejemplos de hooks
│   ├── libraries/          # Ejemplos de librerías
│   │   ├── navigation/     # React Navigation
│   │   ├── forms/          # Formik + Yup
│   │   ├── animations/     # Reanimated
│   │   ├── bottomsheet/    # Gorhom Bottom Sheet
│   │   └── utilities/      # Utilidades varias
│   ├── MainMenuScreen.tsx  # Menú principal
│   └── PlaceholderScreen.tsx
├── hooks/
│   └── customhooks/        # Custom hooks modulares
└── components/
    └── ui/                 # Componentes reutilizables
```

## 🚀 Instalación y Configuración

### Prerrequisitos

Asegúrate de tener configurado tu entorno de desarrollo React Native:
- [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment)
- Node.js 20+ (usar `nvm use 20`)
- CocoaPods para iOS
- Android Studio para Android

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd ReactNativeSandBox

# Usar Node 20
nvm use 20

# Instalar dependencias
npm install

# Para iOS - Instalar pods
cd ios && pod install && cd ..
```

### Librerías Instaladas

#### Navigation
```bash
@react-navigation/native@7.1.17
@react-navigation/stack@7.4.7
@react-navigation/bottom-tabs@7.4.6
@react-navigation/material-top-tabs@7.3.6
@react-navigation/drawer@7.5.7
react-native-gesture-handler@2.28.0
react-native-pager-view@6.9.1
```

#### Forms & Validation
```bash
formik@2.4.6
yup@1.7.0
```

#### Animations
```bash
react-native-reanimated@3.15.0
```

#### UI & Utilities
```bash
@gorhom/bottom-sheet@5.2.3
jail-monkey@2.8.4
react-native-splash-screen@3.3.0
react-native-svg@15.12.1
react-native-webview@13.16.0
```

## 🏃‍♂️ Ejecutar el Proyecto

### Iniciar Metro

```bash
# Con npm
npm start

# Con yarn
yarn start
```

### Ejecutar en iOS

```bash
# Con npm
npm run ios

# Con yarn
yarn ios
```

### Ejecutar en Android

```bash
# Con npm
npm run android

# Con yarn
yarn android
```

## 📱 Funcionalidades Destacadas

### 🎨 **Interfaz Educativa**
- **Navegación intuitiva** entre secciones
- **Ejemplos interactivos** con código en vivo
- **Explicaciones detalladas** de cada concepto
- **Mejores prácticas** documentadas

### 💡 **Ejemplos Prácticos**
- **Código funcional** en todos los ejemplos
- **Casos de uso reales** del mundo real
- **Patrones comunes** de desarrollo
- **Optimizaciones** de performance

### 🔧 **Características Técnicas**
- **TypeScript** en todo el proyecto
- **Linting** configurado con ESLint
- **Arquitectura escalable** y mantenible
- **Comentarios explicativos** en el código

## 🎓 Uso Educativo

Este proyecto está diseñado para:

### 👨‍🎓 **Estudiantes**
- Aprender React Native desde cero
- Entender patrones de desarrollo
- Practicar con ejemplos reales

### 👨‍💻 **Desarrolladores**
- Referencia rápida de componentes
- Ejemplos de librerías populares
- Patrones de arquitectura

### 🏢 **Equipos**
- Onboarding de nuevos desarrolladores
- Estándares de código consistentes
- Base para proyectos nuevos

## 🚧 Estado de Desarrollo

### ✅ **Completado**
- [x] Estructura base del proyecto
- [x] Navegación principal implementada
- [x] Todos los componentes básicos con ejemplos
- [x] Hooks completos con casos de uso
- [x] React Navigation (Stack, Bottom Tabs)
- [x] Formik + Yup documentación
- [x] Instalación y configuración de librerías

### 🔄 **En Desarrollo**
- [ ] Top Tabs y Drawer Navigator
- [ ] Ejemplos interactivos de Formik
- [ ] React Native Reanimated ejemplos
- [ ] Gorhom Bottom Sheet ejemplos
- [ ] Utility libraries ejemplos

### 📋 **Planificado**
- [ ] Gestión de Estados (Redux, Zustand, Context)
- [ ] Arquitectura de Proyectos
- [ ] Flujos de Desarrollo
- [ ] Patrones Comunes
- [ ] Comparación Vue 3 vs React Native

## 🤝 Contribución

Este proyecto está abierto a contribuciones. Si quieres agregar más ejemplos o mejorar los existentes:

1. Fork el proyecto
2. Crea una branch para tu feature
3. Commit tus cambios
4. Push a la branch
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🙏 Agradecimientos

- **React Native Team** por el framework
- **Expo Team** por las herramientas de desarrollo
- **Comunidad Open Source** por las librerías utilizadas

---

**¡Explora, aprende y contribuye!** 🚀

Este proyecto está en constante evolución para mantenerse actualizado con las últimas mejores prácticas de React Native.