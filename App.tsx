/**
 * React Native Components Demo App
 * Demonstrates basic React Native components with navigation
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import MainMenuScreen from './src/screens/MainMenuScreen';
import ComponentsHomeScreen from './src/screens/ComponentsHomeScreen';
import HooksHomeScreen from './src/screens/HooksHomeScreen';
import LibrariesHomeScreen from './src/screens/LibrariesHomeScreen';
import PlaceholderScreen from './src/screens/PlaceholderScreen';

// Import component examples
import ViewExample from './src/screens/components/ViewExample';
import TextExample from './src/screens/components/TextExample';
import TextInputExample from './src/screens/components/TextInputExample';
import ScrollViewExample from './src/screens/components/ScrollViewExample';
import FlatListExample from './src/screens/components/FlatListExample';
import ButtonExample from './src/screens/components/ButtonExample';
import PressableExample from './src/screens/components/PressableExample';
import TouchableOpacityExample from './src/screens/components/TouchableOpacityExample';
import TouchableHighlightExample from './src/screens/components/TouchableHighlightExample';
import ModalExample from './src/screens/components/ModalExample';
import ImageExample from './src/screens/components/ImageExample';

// Import hook examples
import UseStateExample from './src/screens/hooks/UseStateExample';
import UseEffectExample from './src/screens/hooks/UseEffectExample';
import UseLayoutEffectExample from './src/screens/hooks/UseLayoutEffectExample';
import UseMemoExample from './src/screens/hooks/UseMemoExample';
import UseCallbackExample from './src/screens/hooks/UseCallbackExample';
import UseImperativeHandleExample from './src/screens/hooks/UseImperativeHandleExample';
import MemoExample from './src/screens/hooks/MemoExample';
import CustomHooksExample from './src/screens/hooks/CustomHooksExample';

// Import library examples
import NavigationHomeScreen from './src/screens/libraries/NavigationHomeScreen';
import FormsHomeScreen from './src/screens/libraries/FormsHomeScreen';
import StateManagementHomeScreen from './src/screens/libraries/StateManagementHomeScreen';
import StackNavigationExample from './src/screens/libraries/navigation/StackNavigationExample';
import StackDetailsExample from './src/screens/libraries/navigation/StackDetailsExample';
import BottomTabsExample from './src/screens/libraries/navigation/BottomTabsExample';
import TopTabsExample from './src/screens/libraries/navigation/TopTabsExample';
import DrawerNavigationExample from './src/screens/libraries/navigation/DrawerNavigationExample';
import FormikBasicExample from './src/screens/libraries/forms/FormikBasicExample';
import FormikYupExample from './src/screens/libraries/forms/FormikYupExample';
import FormikAdvancedExample from './src/screens/libraries/forms/FormikAdvancedExample';

// Import state management examples
import ReduxToolkitExample from './src/screens/libraries/state/ReduxToolkitExample';
import ZustandExample from './src/screens/libraries/state/ZustandExample';
import ContextAPIExample from './src/screens/libraries/state/ContextAPIExample';
import JotaiExample from './src/screens/libraries/state/JotaiExample';
import ValtioExample from './src/screens/libraries/state/ValtioExample';

// Import animation examples
import AnimationsHomeScreen from './src/screens/libraries/animations/AnimationsHomeScreen';
import BasicAnimationsExample from './src/screens/libraries/animations/BasicAnimationsExample';
import GestureAnimationsExample from './src/screens/libraries/animations/GestureAnimationsExample';
import LayoutAnimationsExample from './src/screens/libraries/animations/LayoutAnimationsExample';
import ComplexAnimationsExample from './src/screens/libraries/animations/ComplexAnimationsExample';

// Import bottomsheet examples
import BottomSheetHomeScreen from './src/screens/libraries/bottomsheet/BottomSheetHomeScreen';
import BasicBottomSheetExample from './src/screens/libraries/bottomsheet/BasicBottomSheetExample';
import ScrollableBottomSheetExample from './src/screens/libraries/bottomsheet/ScrollableBottomSheetExample';
import CustomBottomSheetExample from './src/screens/libraries/bottomsheet/CustomBottomSheetExample';
import ModalBottomSheetExample from './src/screens/libraries/bottomsheet/ModalBottomSheetExample';

// Import utilities
import UtilitiesHomeScreen from './src/screens/libraries/utilities/UtilitiesHomeScreen';

const Stack = createStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MainMenu"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          
          {/* Main Menu */}
          <Stack.Screen 
            name="MainMenu" 
            component={MainMenuScreen} 
            options={{ title: 'React Native - Guía Completa' }}
          />
          
          {/* Components Section */}
          <Stack.Screen 
            name="ComponentsHome" 
            component={ComponentsHomeScreen} 
            options={{ title: 'Componentes Base' }}
          />
          <Stack.Screen 
            name="ViewExample" 
            component={ViewExample} 
            options={{ title: 'View Component' }}
          />
          <Stack.Screen 
            name="TextExample" 
            component={TextExample} 
            options={{ title: 'Text Component' }}
          />
          <Stack.Screen 
            name="TextInputExample" 
            component={TextInputExample} 
            options={{ title: 'TextInput Component' }}
          />
          <Stack.Screen 
            name="ScrollViewExample" 
            component={ScrollViewExample} 
            options={{ title: 'ScrollView Component' }}
          />
          <Stack.Screen 
            name="FlatListExample" 
            component={FlatListExample} 
            options={{ title: 'FlatList Component' }}
          />
          <Stack.Screen 
            name="ButtonExample" 
            component={ButtonExample} 
            options={{ title: 'Button Component' }}
          />
          <Stack.Screen 
            name="PressableExample" 
            component={PressableExample} 
            options={{ title: 'Pressable Component' }}
          />
          <Stack.Screen 
            name="TouchableOpacityExample" 
            component={TouchableOpacityExample} 
            options={{ title: 'TouchableOpacity Component' }}
          />
          <Stack.Screen 
            name="TouchableHighlightExample" 
            component={TouchableHighlightExample} 
            options={{ title: 'TouchableHighlight Component' }}
          />
          <Stack.Screen 
            name="ModalExample" 
            component={ModalExample} 
            options={{ title: 'Modal Component' }}
          />
          <Stack.Screen 
            name="ImageExample" 
            component={ImageExample} 
            options={{ title: 'Image Component' }}
          />

          {/* Hooks Section */}
          <Stack.Screen 
            name="HooksHome" 
            component={HooksHomeScreen}
            options={{ title: 'Hooks' }}
          />
          <Stack.Screen 
            name="UseStateExample" 
            component={UseStateExample}
            options={{ title: 'useState Hook' }}
          />
          <Stack.Screen 
            name="UseEffectExample" 
            component={UseEffectExample}
            options={{ title: 'useEffect Hook' }}
          />
          <Stack.Screen 
            name="UseLayoutEffectExample" 
            component={UseLayoutEffectExample}
            options={{ title: 'useLayoutEffect Hook' }}
          />
          <Stack.Screen 
            name="UseMemoExample" 
            component={UseMemoExample}
            options={{ title: 'useMemo Hook' }}
          />
          <Stack.Screen 
            name="UseCallbackExample" 
            component={UseCallbackExample}
            options={{ title: 'useCallback Hook' }}
          />
          <Stack.Screen 
            name="UseImperativeHandleExample" 
            component={UseImperativeHandleExample}
            options={{ title: 'useImperativeHandle Hook' }}
          />
          <Stack.Screen 
            name="MemoExample" 
            component={MemoExample}
            options={{ title: 'React.memo' }}
          />
          <Stack.Screen 
            name="CustomHooksExample" 
            component={CustomHooksExample}
            options={{ title: 'Custom Hooks' }}
          />

          {/* Libraries Section */}
          <Stack.Screen 
            name="LibrariesHome" 
            component={LibrariesHomeScreen} 
            options={{ title: 'Librerías' }}
          />
          
          {/* State Management Section */}
          <Stack.Screen 
            name="StateManagementHome" 
            component={StateManagementHomeScreen} 
            options={{ title: 'Gestión de Estados' }}
          />
          <Stack.Screen 
            name="redux-toolkitExample" 
            component={ReduxToolkitExample} 
            options={{ title: 'Redux Toolkit' }}
          />
          <Stack.Screen 
            name="zustandExample" 
            component={ZustandExample} 
            options={{ title: 'Zustand' }}
          />
          <Stack.Screen 
            name="context-apiExample" 
            component={ContextAPIExample} 
            options={{ title: 'Context API' }}
          />
          <Stack.Screen 
            name="jotaiExample" 
            component={JotaiExample} 
            options={{ title: 'Jotai' }}
          />
          <Stack.Screen 
            name="valtioExample" 
            component={ValtioExample} 
            options={{ title: 'Valtio' }}
          />
          
          {/* Navigation Examples */}
          <Stack.Screen 
            name="navigationHome" 
            component={NavigationHomeScreen} 
            options={{ title: 'React Navigation' }}
          />
          <Stack.Screen 
            name="StackNavigationExample" 
            component={StackNavigationExample} 
            options={{ title: 'Stack Navigator' }}
          />
          <Stack.Screen 
            name="StackDetailsExample" 
            component={StackDetailsExample} 
            options={{ title: 'Stack Details' }}
          />
          <Stack.Screen 
            name="BottomTabsExample" 
            component={BottomTabsExample} 
            options={{ title: 'Bottom Tabs' }}
          />
          <Stack.Screen 
            name="TopTabsExample" 
            component={TopTabsExample} 
            options={{ title: 'Top Tabs' }}
          />
          <Stack.Screen 
            name="DrawerNavigationExample" 
            component={DrawerNavigationExample} 
            options={{ title: 'Drawer Navigator' }}
          />
          
          {/* Forms Examples */}
          <Stack.Screen 
            name="formsHome" 
            component={FormsHomeScreen} 
            options={{ title: 'Formik + Yup' }}
          />
          <Stack.Screen 
            name="FormikBasicExample" 
            component={FormikBasicExample} 
            options={{ title: 'Formik Básico' }}
          />
          <Stack.Screen 
            name="FormikYupExample" 
            component={FormikYupExample} 
            options={{ title: 'Formik + Yup' }}
          />
          <Stack.Screen 
            name="FormikAdvancedExample" 
            component={FormikAdvancedExample} 
            options={{ title: 'Formulario Avanzado' }}
          />

          {/* Animation Examples */}
          <Stack.Screen 
            name="animationsHome" 
            component={AnimationsHomeScreen} 
            options={{ title: 'Animaciones' }}
          />
          <Stack.Screen 
            name="basicAnimations" 
            component={BasicAnimationsExample} 
            options={{ title: 'Animaciones Básicas' }}
          />
          <Stack.Screen 
            name="gestureAnimations" 
            component={GestureAnimationsExample} 
            options={{ title: 'Animaciones con Gestos' }}
          />
          <Stack.Screen 
            name="layoutAnimations" 
            component={LayoutAnimationsExample} 
            options={{ title: 'Layout Animations' }}
          />
          <Stack.Screen 
            name="complexAnimations" 
            component={ComplexAnimationsExample} 
            options={{ title: 'Animaciones Complejas' }}
          />

          {/* Bottom Sheet Examples */}
          <Stack.Screen 
            name="bottomsheetHome" 
            component={BottomSheetHomeScreen} 
            options={{ title: 'Bottom Sheets' }}
          />
          <Stack.Screen 
            name="basicBottomSheet" 
            component={BasicBottomSheetExample} 
            options={{ title: 'Bottom Sheet Básico' }}
          />
          <Stack.Screen 
            name="scrollableBottomSheet" 
            component={ScrollableBottomSheetExample} 
            options={{ title: 'Bottom Sheet Scrollable' }}
          />
          <Stack.Screen 
            name="customBottomSheet" 
            component={CustomBottomSheetExample} 
            options={{ title: 'Customización Avanzada' }}
          />
          <Stack.Screen 
            name="modalBottomSheet" 
            component={ModalBottomSheetExample} 
            options={{ title: 'Modal Bottom Sheet' }}
          />

          {/* Utilities */}
          <Stack.Screen 
            name="utilitiesHome" 
            component={UtilitiesHomeScreen} 
            options={{ title: 'Utilidades' }}
          />

          {/* Placeholder screens for remaining sections */}
          

          
          <Stack.Screen 
            name="ArchitectureHome" 
            options={{ title: 'Arquitectura de Proyectos' }}>
            {(props) => (
              <PlaceholderScreen 
                {...props}
                title="Arquitectura de Proyectos"
                description="Estructuras y patrones de organización"
                icon="🏗️"
              />
            )}
          </Stack.Screen>
          
          <Stack.Screen 
            name="WorkflowsHome" 
            options={{ title: 'Flujos de Desarrollo' }}>
            {(props) => (
              <PlaceholderScreen 
                {...props}
                title="Flujos de Desarrollo"
                description="CI/CD, testing, debugging"
                icon="⚙️"
              />
            )}
          </Stack.Screen>
          
          <Stack.Screen 
            name="PatternsHome" 
            options={{ title: 'Patrones Comunes' }}>
            {(props) => (
              <PlaceholderScreen 
                {...props}
                title="Patrones Comunes"
                description="Patrones de diseño y mejores prácticas"
                icon="🎯"
              />
            )}
          </Stack.Screen>
          
          <Stack.Screen 
            name="ComparisonHome" 
            options={{ title: 'Vue 3 vs React Native' }}>
            {(props) => (
              <PlaceholderScreen 
                {...props}
                title="Vue 3 vs React Native"
                description="Comparación de frameworks"
                icon="⚖️"
              />
            )}
          </Stack.Screen>
          
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
