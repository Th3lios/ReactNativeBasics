# React Native Sandbox 📱

Un proyecto **completo y exhaustivo** de aprendizaje para React Native que incluye **+100 ejemplos funcionales**, cubriendo desde componentes básicos hasta arquitecturas avanzadas, state management y patrones profesionales.

## 🎯 Objetivo del Proyecto

Este proyecto sirve como la **guía más completa** para desarrolladores que quieren:

- **Dominar React Native** desde lo básico hasta lo avanzado
- **Aprender state management** con múltiples soluciones (Redux, Zustand, Context)
- **Implementar animaciones** profesionales con Reanimated 3
- **Estructurar proyectos** con arquitecturas escalables
- **Aplicar patrones** de desarrollo modernos
- **Transicionar desde Vue 3** con guías comparativas
- **Acceder rápidamente** a comandos esenciales con CheatSheet integrado

## 📚 Contenido Implementado

### 🧩 **Componentes Básicos**
Ejemplos interactivos de todos los componentes fundamentales:

- **View** - Contenedor básico con ejemplos de layout
- **Text** - Renderizado de texto con estilos y propiedades
- **ScrollView** - Scroll vertical y horizontal con contenido
- **FlatList** - Listas optimizadas con datos dinámicos
- **SectionList** - Listas con secciones para organizar datos
- **Button** - Botones básicos con diferentes estados
- **Pressable** - Componente de presión avanzado
- **TouchableOpacity** - Botones con feedback visual
- **TouchableHighlight** - Botones con highlight personalizable
- **Switch** - Controles toggle con configuraciones
- **ActivityIndicator** - Indicadores de carga animados
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

#### 🎬 **Animations (React Native Reanimated 3)**
- **Animaciones Básicas** - withTiming, withSpring, interpolaciones
- **Animaciones con Gestos** - Pan, Pinch, Tap con Gesture Handler
- **Layout Animations** - Transiciones automáticas con entering/exiting
- **Animaciones Complejas** - Physics, 3D transforms, parallax scrolling

#### 📋 **Bottom Sheets (Gorhom Bottom Sheet)**
- **Basic Bottom Sheet** - Implementación básica con snap points
- **Scrollable Content** - Bottom sheets con FlatList y ScrollView
- **Customización Avanzada** - Backdrops, handles y footers personalizados
- **Modal Bottom Sheet** - Sheets modales con formularios y acciones

#### 🔧 **Utility Libraries**
Lista de librerías útiles para referencia:
- **Jail Monkey** - Detección de jailbreak/root
- **React Native Camera** - Cámara y galería
- **Splash Screen** - Pantalla de carga nativa
- **SVG** - Gráficos vectoriales
- **WebView** - Vista web embebida

### 🗃️ **Gestión de Estados**
Implementación completa de las principales soluciones de state management:

#### **Redux Ecosystem**
- **Redux Toolkit** - Setup moderno con createSlice y createAsyncThunk
- **Redux Sagas** - Manejo de side effects con generators
- **Ejemplos Completos** - Counters, Todos, Users, Weather APIs

#### **Modern State Solutions**
- **Zustand** - Store minimalista con persistencia y computed values
- **Context API** - Contextos para temas, carrito y notificaciones
- **Jotai** - Atomic state management con átomos primitivos y derivados
- **Valtio** - Proxy-based state con snapshots reactivos

### 🏗️ **Arquitectura de Proyectos**
Guías completas sobre estructuras y organización:

#### **Folder Structures**
- **Estructura Básica** - Organización por tipos de archivos
- **Feature-Based** - Organización por funcionalidades del negocio
- **Atomic Design** - Estructura basada en componentes atómicos
- **Domain-Driven** - Organización por dominios del negocio
- **Layered Architecture** - Separación por capas de responsabilidad
- **Modular Structure** - Módulos independientes y reutilizables

#### **Best Practices**
- **Comparación detallada** de ventajas y desventajas
- **Casos de uso** para cada estructura
- **Consejos** para elegir la arquitectura correcta

### 🔄 **Flujos de Desarrollo**
Patrones comunes de desarrollo y comunicación:

#### **API Flows**
- **Redux Toolkit** - Llamadas con createAsyncThunk
- **Zustand** - API calls con async/await
- **Context API** - Manejo de estados de API
- **Local State** - useState para casos simples

#### **State Communication**
- **Parent → Child** - Paso de props
- **Child → Parent** - Callbacks y lifting state up
- **Sibling Components** - Lifted state y context
- **Distant Components** - Context API y stores globales

### 🎯 **Patrones Comunes**
Patrones esenciales y mejores prácticas de React Native:

#### **Component Patterns**
- **Render Props** - Componentes flexibles con función render
- **Children as Functions** - Patterns con children dinámicos
- **Compound Components** - Componentes compuestos
- **Controlled Components** - Control total del estado

#### **Higher-Order Components (HOCs)**
- **withLoading** - HOC para estados de carga
- **withAuth** - HOC para autenticación
- **withErrorBoundary** - HOC para manejo de errores
- **withLogger** - HOC para logging automático

#### **Performance Patterns**
- **React.memo** - Optimización de re-renders
- **useMemo** - Memoización de valores costosos
- **useCallback** - Optimización de funciones
- **Lazy Loading** - Carga diferida de componentes

#### **Hook Patterns**
- **Custom Hooks** - Hooks reutilizables
- **Hook Composition** - Combinación de hooks
- **State Machines** - Hooks con máquinas de estado
- **Async Hooks** - Manejo de operaciones asíncronas

#### **React Native Specific**
- **Platform Detection** - Código específico por plataforma
- **Responsive Design** - Adaptación a pantallas
- **Navigation Patterns** - Patrones de navegación
- **Gesture Patterns** - Manejo de gestos

### 🎨 **Styling**
Sistema completo de estilos para React Native:

#### **Basic Styles**
- **StyleSheet.create()** - Creación de estilos optimizados
- **Inline Styles** - Estilos dinámicos
- **Style Composition** - Reutilización y herencia

#### **Layout & Positioning**
- **Flexbox** - Sistema de layout principal
- **Positioning** - Absolute, relative positioning
- **Dimensions** - Responsive dimensions
- **Spacing** - Margin, padding, gaps

#### **Responsive Design**
- **Screen Dimensions** - Adaptación a tamaños
- **Breakpoints** - Puntos de quiebre
- **Orientation** - Landscape/Portrait
- **Adaptive Layouts** - Layouts que se adaptan

#### **Theming**
- **Dark/Light Mode** - Temas dinámicos
- **Theme Context** - Context API para temas
- **Dynamic Styling** - Estilos basados en tema
- **Theme Provider** - Proveedor de temas global

#### **Styling Frameworks**
Comparación de frameworks populares:
- **NativeBase** - Biblioteca de componentes completa
- **Tamagui** - Sistema UI universal optimizado
- **styled-components** - CSS-in-JS con props
- **Restyle** - Sistema de temas de Shopify
- **React Native Elements** - UI toolkit maduro
- **NativeWind** - Tailwind CSS para React Native

### ⚖️ **Vue 3 vs React Native**
Guía de transición para desarrolladores Vue:

#### **Comparación Conceptual**
- **Sintaxis y Structure** - Diferencias fundamentales
- **State Management** - Vuex/Pinia vs Redux/Zustand
- **Lifecycle** - Composition API vs Hooks
- **Templates** - Vue templates vs JSX

#### **Migration Guide**
- **Conceptos equivalentes** entre frameworks
- **Patrones de migración** paso a paso
- **Ejemplos lado a lado** para comparar
- **Mejores prácticas** para la transición

### 📚 **CheatSheet**
Comandos esenciales para desarrollo React Native:

#### **Gestión de Proyecto**
- Crear proyectos nuevos (con/sin TypeScript)
- Instalar dependencias y limpiar caché
- Configuración inicial del entorno

#### **Desarrollo Diario**
- Comandos de Metro bundler
- Ejecutar en Android/iOS
- Debugging y logs en tiempo real
- Recarga de aplicaciones

#### **Build & Distribution**
- **Android**: APK/AAB generation, keystore management
- **iOS**: Pod installation, Xcode builds, DerivedData cleanup
- **Testing**: Test execution, linting, debugging tools

#### **Utilidades Avanzadas**
- Bundle analysis, Hermes bytecode
- Dependency management y updates
- System information y diagnostics

## 🏗️ Arquitectura del Proyecto

```
src/
├── screens/
│   ├── components/          # Ejemplos de componentes básicos
│   ├── hooks/              # Ejemplos de hooks  
│   ├── libraries/          # Ejemplos de librerías
│   │   ├── navigation/     # React Navigation
│   │   ├── forms/          # Formik + Yup
│   │   ├── animations/     # Reanimated + Gesture Handler
│   │   ├── bottomsheet/    # Gorhom Bottom Sheet
│   │   ├── state/          # State Management (Redux, Zustand, etc.)
│   │   └── utilities/      # Utilidades varias
│   ├── architecture/       # Estructuras de proyectos
│   ├── flows/             # Flujos de desarrollo
│   ├── patterns/          # Patrones comunes
│   ├── styling/           # Estilos y theming
│   ├── comparison/        # Vue 3 vs React Native
│   ├── MainMenuScreen.tsx # Menú principal
│   ├── CheatSheetScreen.tsx # Comandos de React Native
│   └── PlaceholderScreen.tsx
├── hooks/
│   └── customhooks/        # Custom hooks modulares
├── store/                  # State management stores
│   ├── redux/             # Redux Toolkit + Sagas
│   ├── zustand/           # Zustand stores
│   └── context/           # React Context implementations
├── libs/
│   └── schemas/           # Yup validation schemas
└── components/
    └── ui/                # Componentes reutilizables
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

#### State Management
```bash
@reduxjs/toolkit@2.3.0
redux-saga@1.3.0
zustand@5.0.1
jotai@2.11.0
valtio@2.1.2
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
- **Navegación intuitiva** entre 10 secciones principales
- **Ejemplos interactivos** con código funcional
- **Explicaciones detalladas** con casos de uso
- **Mejores prácticas** documentadas en cada área
- **CheatSheet integrado** con comandos esenciales

### 💡 **Ejemplos Prácticos**
- **+100 ejemplos funcionales** en vivo
- **Casos de uso reales** del mundo profesional
- **Patrones comunes** y avanzados de desarrollo
- **Optimizaciones** de performance documentadas
- **Código comparativo** entre diferentes approaches

### 🔧 **Características Técnicas**
- **TypeScript** en todo el proyecto
- **State Management** completo (Redux, Zustand, Context)
- **Animations** avanzadas con Reanimated 3
- **Arquitectura modular** y escalable
- **Linting** y validación automática
- **Schemas centralizados** para validación

## 🎓 Uso Educativo

Este proyecto está diseñado para:

### 👨‍🎓 **Estudiantes**
- Aprender React Native desde componentes básicos hasta arquitecturas
- Entender patrones de desarrollo modernos
- Practicar con +100 ejemplos reales y funcionales
- Transición desde Vue 3 con guía comparativa

### 👨‍💻 **Desarrolladores**
- Referencia completa de componentes y librerías
- State management con múltiples soluciones
- Patrones de performance y optimización
- CheatSheet con comandos esenciales para desarrollo

### 🏢 **Equipos**
- Onboarding estructurado de nuevos desarrolladores
- Estándares de código y arquitectura documentados
- Base sólida para proyectos React Native
- Comparación de tecnologías para decisiones técnicas

## 🚧 Estado de Desarrollo

### ✅ **Completado (100%)**
- [x] **Componentes Básicos** - Todos los componentes fundamentales con ejemplos
- [x] **Hooks Completos** - useState, useEffect, useMemo, useCallback, custom hooks
- [x] **React Navigation** - Stack, Bottom Tabs, Top Tabs, Drawer Navigator
- [x] **Formik + Yup** - Validación completa con esquemas centralizados
- [x] **React Native Reanimated 3** - Animaciones básicas, gestos, layout, complejas
- [x] **Gorhom Bottom Sheet** - Basic, scrollable, custom, modal implementations
- [x] **State Management** - Redux Toolkit, Redux Sagas, Zustand, Context API, Jotai, Valtio
- [x] **Arquitectura de Proyectos** - 6 estructuras diferentes con comparación
- [x] **Flujos de Desarrollo** - API flows, state communication patterns
- [x] **Patrones Comunes** - Component, HOC, State, Performance, Hook, RN-specific patterns
- [x] **Styling Completo** - Basic, Layout, Responsive, Theming + Framework comparison
- [x] **Vue 3 vs React Native** - Guía completa de transición
- [x] **CheatSheet** - Comandos esenciales organizados por categorías

### 🎯 **Proyecto Completo**
El proyecto ahora incluye **+100 ejemplos funcionales** que cubren:
- **14 componentes básicos** con casos de uso
- **8 hooks fundamentales** + 7 custom hooks modulares
- **6 soluciones de state management** con ejemplos comparativos
- **4 tipos de animaciones** con Reanimated 3
- **6 estructuras de proyecto** con ventajas/desventajas
- **6 categorías de patrones** de desarrollo
- **4 sistemas de styling** + 6 frameworks comparados
- **7 categorías de comandos** en CheatSheet

### 🔧 **Funcionalidades Técnicas**
- **TypeScript** en todo el código
- **Navegación modular** entre todas las secciones
- **Arquitectura escalable** y bien documentada
- **Validación centralizada** con Yup schemas
- **Performance optimizado** con mejores prácticas

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