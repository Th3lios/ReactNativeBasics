import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FolderStructure {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bestFor: string[];
  structure: string;
  advantages: string[];
  disadvantages: string[];
  example: string;
}

const FolderStructuresExample: React.FC = () => {
  const [selectedStructure, setSelectedStructure] = useState<string | null>(null);

  const structures: FolderStructure[] = [
    {
      id: 'basic',
      name: 'Estructura Básica',
      description: 'Organización simple por tipos de archivos',
      icon: '📁',
      color: '#4CAF50',
      bestFor: ['Proyectos pequeños', 'Prototipos', 'MVPs', 'Equipos de 1-3 desarrolladores'],
      structure: `src/
  components/
    Button.tsx
    Header.tsx
    Modal.tsx
  screens/
    HomeScreen.tsx
    ProfileScreen.tsx
    SettingsScreen.tsx
  services/
    api.ts
    storage.ts
  utils/
    helpers.ts
    constants.ts
  types/
    index.ts
  navigation/
    AppNavigator.tsx
  styles/
    colors.ts
    typography.ts`,
      advantages: [
        'Fácil de entender para desarrolladores nuevos',
        'Setup rápido',
        'Perfecto para proyectos pequeños',
        'Menos complejidad inicial',
        'Búsqueda de archivos sencilla'
      ],
      disadvantages: [
        'No escala bien con el crecimiento',
        'Carpetas se vuelven muy grandes',
        'Difícil localizar código relacionado',
        'Reutilización complicada',
        'Mantenimiento complejo en proyectos grandes'
      ],
      example: `// Estructura típica para una app de notas simple
src/
  components/
    NoteCard.tsx
    NoteList.tsx
    SearchBar.tsx
  screens/
    NotesListScreen.tsx
    NoteDetailScreen.tsx
    CreateNoteScreen.tsx
  services/
    notesApi.ts
  types/
    Note.ts`
    },
    {
      id: 'feature-based',
      name: 'Estructura por Features',
      description: 'Organización por funcionalidades del negocio',
      icon: '🎯',
      color: '#2196F3',
      bestFor: ['Proyectos medianos/grandes', 'Equipos múltiples', 'Desarrollo en paralelo', 'Microservicios'],
      structure: `src/
  features/
    auth/
      components/
        LoginForm.tsx
        SignUpForm.tsx
      screens/
        LoginScreen.tsx
        SignUpScreen.tsx
      hooks/
        useAuth.ts
      services/
        authApi.ts
      types/
        index.ts
      index.ts
    profile/
      components/
        ProfileCard.tsx
        EditProfileForm.tsx
      screens/
        ProfileScreen.tsx
        EditProfileScreen.tsx
      hooks/
        useProfile.ts
      services/
        profileApi.ts
      types/
        index.ts
      index.ts
  shared/
    components/
      Button.tsx
      Modal.tsx
    utils/
      helpers.ts
    types/
      common.ts
  navigation/
    AppNavigator.tsx`,
      advantages: [
        'Código relacionado agrupado',
        'Escalabilidad horizontal',
        'Equipos independientes por feature',
        'Reutilización de features',
        'Testing aislado',
        'Deploy independiente posible'
      ],
      disadvantages: [
        'Setup inicial más complejo',
        'Curva de aprendizaje',
        'Duplicación de código común',
        'Gestión de dependencias entre features',
        'Overhead en proyectos pequeños'
      ],
      example: `// Feature de E-commerce
src/
  features/
    products/
      components/
        ProductCard.tsx
        ProductList.tsx
        ProductFilters.tsx
      screens/
        ProductsScreen.tsx
        ProductDetailScreen.tsx
      hooks/
        useProducts.ts
        useProductFilters.ts
      services/
        productsApi.ts
      types/
        Product.ts
      index.ts
    cart/
      components/
        CartItem.tsx
        CartSummary.tsx
      screens/
        CartScreen.tsx
        CheckoutScreen.tsx
      hooks/
        useCart.ts
      services/
        cartApi.ts
      types/
        Cart.ts
      index.ts`
    },
    {
      id: 'domain-driven',
      name: 'Domain-Driven Design',
      description: 'Organización basada en dominios del negocio',
      icon: '🏛️',
      color: '#FF9800',
      bestFor: ['Aplicaciones empresariales', 'Lógica compleja de negocio', 'Equipos grandes', 'Long-term projects'],
      structure: `src/
  domains/
    user/
      entities/
        User.ts
        UserProfile.ts
      repositories/
        UserRepository.ts
      services/
        UserService.ts
      useCases/
        CreateUser.ts
        UpdateProfile.ts
      presentation/
        components/
          UserCard.tsx
        screens/
          UserScreen.tsx
        hooks/
          useUser.ts
    order/
      entities/
        Order.ts
        OrderItem.ts
      repositories/
        OrderRepository.ts
      services/
        OrderService.ts
      useCases/
        CreateOrder.ts
        ProcessPayment.ts
      presentation/
        components/
          OrderCard.tsx
        screens/
          OrderScreen.tsx
        hooks/
          useOrder.ts
  shared/
    infrastructure/
      api/
        apiClient.ts
      storage/
        asyncStorage.ts
    ui/
      components/
        Button.tsx
      theme/
        colors.ts`,
      advantages: [
        'Alineado con el negocio',
        'Separación clara de responsabilidades',
        'Reutilización entre dominios',
        'Testing robusto',
        'Mantenibilidad a largo plazo',
        'Escalabilidad por dominio'
      ],
      disadvantages: [
        'Complejidad inicial alta',
        'Requiere experiencia en DDD',
        'Overhead para proyectos simples',
        'Curva de aprendizaje empinada',
        'Setup inicial lento'
      ],
      example: `// Sistema de gestión hospitalaria
src/
  domains/
    patient/
      entities/
        Patient.ts
        MedicalRecord.ts
      useCases/
        RegisterPatient.ts
        UpdateMedicalRecord.ts
      presentation/
        screens/
          PatientListScreen.tsx
    appointment/
      entities/
        Appointment.ts
        Schedule.ts
      useCases/
        BookAppointment.ts
        CancelAppointment.ts
      presentation/
        screens/
          AppointmentScreen.tsx
    billing/
      entities/
        Invoice.ts
        Payment.ts
      useCases/
        GenerateInvoice.ts
        ProcessPayment.ts
      presentation/
        screens/
          BillingScreen.tsx`
    },
    {
      id: 'atomic-design',
      name: 'Atomic Design + Features',
      description: 'Componentes atómicos + organización por features',
      icon: '⚛️',
      color: '#9C27B0',
      bestFor: ['Design Systems', 'UI consistency', 'Reutilización de componentes', 'Equipos de design + dev'],
      structure: `src/
  components/
    atoms/
      Button/
        Button.tsx
        Button.styles.ts
        Button.stories.tsx
        Button.test.tsx
        index.ts
      Input/
        Input.tsx
        Input.styles.ts
        index.ts
      Text/
        Text.tsx
        Text.styles.ts
        index.ts
    molecules/
      SearchBar/
        SearchBar.tsx
        SearchBar.styles.ts
        index.ts
      FormField/
        FormField.tsx
        index.ts
    organisms/
      Header/
        Header.tsx
        Header.styles.ts
        index.ts
      ProductList/
        ProductList.tsx
        index.ts
    templates/
      PageTemplate/
        PageTemplate.tsx
        index.ts
  features/
    home/
      pages/
        HomePage.tsx
      hooks/
        useHome.ts
    products/
      pages/
        ProductsPage.tsx
        ProductDetailPage.tsx
      hooks/
        useProducts.ts
  design-system/
    tokens/
      colors.ts
      spacing.ts
      typography.ts
    theme/
      index.ts`,
      advantages: [
        'Reutilización máxima de componentes',
        'Consistencia de UI garantizada',
        'Design system robusto',
        'Testing granular',
        'Documentación clara',
        'Escalabilidad de UI'
      ],
      disadvantages: [
        'Overhead inicial significativo',
        'Complejidad de setup',
        'Requiere disciplina del equipo',
        'Curva de aprendizaje',
        'Mantenimiento de design system'
      ],
      example: `// E-commerce con design system
src/
  components/
    atoms/
      Button/
        PrimaryButton.tsx
        SecondaryButton.tsx
        IconButton.tsx
      Price/
        Price.tsx
        DiscountPrice.tsx
    molecules/
      ProductCard/
        ProductCard.tsx
        ProductCardSkeleton.tsx
      AddToCartButton/
        AddToCartButton.tsx
    organisms/
      ProductGrid/
        ProductGrid.tsx
      ShoppingCart/
        ShoppingCart.tsx
    templates/
      ShopTemplate/
        ShopTemplate.tsx
  features/
    shop/
      pages/
        ShopPage.tsx
      hooks/
        useShop.ts`
    },
    {
      id: 'monorepo',
      name: 'Monorepo con Workspaces',
      description: 'Múltiples paquetes en un solo repositorio',
      icon: '📦',
      color: '#607D8B',
      bestFor: ['Múltiples apps', 'Shared libraries', 'Microfront-ends', 'Organizaciones grandes'],
      structure: `packages/
  mobile-app/
    src/
      screens/
      components/
      navigation/
    package.json
  web-app/
    src/
      pages/
      components/
    package.json
  shared-ui/
    src/
      components/
        Button/
        Modal/
      theme/
    package.json
  shared-utils/
    src/
      api/
      helpers/
      types/
    package.json
  shared-business-logic/
    src/
      services/
      hooks/
      stores/
    package.json
package.json
lerna.json
nx.json`,
      advantages: [
        'Reutilización entre apps',
        'Versionado conjunto',
        'Refactoring cross-package',
        'Testing integrado',
        'Deploy coordinado',
        'Sharing de código maximizado'
      ],
      disadvantages: [
        'Complejidad de setup muy alta',
        'Tooling especializado requerido',
        'Build times largos',
        'Gestión de dependencias compleja',
        'Requiere experiencia específica'
      ],
      example: `// Fintech con múltiples apps
packages/
  customer-mobile/
    src/
      screens/
        AccountScreen.tsx
        TransferScreen.tsx
  admin-web/
    src/
      pages/
        DashboardPage.tsx
        UsersPage.tsx
  shared-components/
    src/
      Button/
      Modal/
      Charts/
  shared-api/
    src/
      apiClient.ts
      authService.ts
  shared-types/
    src/
      User.ts
      Transaction.ts`
    },
    {
      id: 'micro-frontends',
      name: 'Micro-Frontends',
      description: 'Apps independientes que se componen juntas',
      icon: '🧩',
      color: '#795548',
      bestFor: ['Equipos autónomos', 'Tecnologías mixtas', 'Deploy independiente', 'Scaling teams'],
      structure: `apps/
  shell-app/
    src/
      navigation/
        AppNavigator.tsx
      components/
        Layout.tsx
    package.json
  auth-module/
    src/
      screens/
        LoginScreen.tsx
        SignUpScreen.tsx
      components/
        AuthForm.tsx
    package.json
    webpack.config.js
  products-module/
    src/
      screens/
        ProductsScreen.tsx
        ProductDetailScreen.tsx
      components/
        ProductCard.tsx
    package.json
    webpack.config.js
  shared/
    design-system/
      src/
        components/
        theme/
    utils/
      src/
        helpers/
        types/
module-federation.config.js`,
      advantages: [
        'Desarrollo independiente',
        'Deploy independiente',
        'Tecnologías diferentes por módulo',
        'Escalabilidad de equipos',
        'Fault isolation',
        'Flexibilidad máxima'
      ],
      disadvantages: [
        'Complejidad arquitectural extrema',
        'Overhead de comunicación',
        'Consistency challenges',
        'Performance overhead',
        'Debugging complejo',
        'Requires specialized knowledge'
      ],
      example: `// Banking app con micro-frontends
apps/
  banking-shell/
    src/
      navigation/
        MainNavigator.tsx
  accounts-module/
    src/
      screens/
        AccountsScreen.tsx
        TransactionsScreen.tsx
  investments-module/
    src/
      screens/
        PortfolioScreen.tsx
        TradingScreen.tsx
  loans-module/
    src/
      screens/
        LoansScreen.tsx
        ApplicationScreen.tsx
  shared/
    auth-service/
      src/
        authProvider.ts
    ui-kit/
      src/
        Button/
        Modal/`
    }
  ];

  const renderStructureCard = (structure: FolderStructure) => (
    <Pressable
      key={structure.id}
      style={[
        styles.structureCard,
        { borderLeftColor: structure.color },
        selectedStructure === structure.id && styles.selectedCard
      ]}
      onPress={() => setSelectedStructure(selectedStructure === structure.id ? null : structure.id)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.structureIcon}>{structure.icon}</Text>
        <View style={styles.structureInfo}>
          <Text style={styles.structureName}>{structure.name}</Text>
          <Text style={styles.structureDescription}>{structure.description}</Text>
        </View>
        <Text style={styles.expandIcon}>
          {selectedStructure === structure.id ? '−' : '+'}
        </Text>
      </View>

      <View style={styles.bestForContainer}>
        <Text style={styles.bestForLabel}>🎯 Ideal para:</Text>
        <View style={styles.bestForList}>
          {structure.bestFor.map((item, index) => (
            <View key={index} style={[styles.bestForTag, { borderColor: structure.color }]}>
              <Text style={[styles.bestForText, { color: structure.color }]}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {selectedStructure === structure.id && (
        <View style={styles.expandedContent}>
          <View style={styles.structureCodeContainer}>
            <Text style={styles.structureCodeTitle}>📁 Estructura:</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.structureCode}>{structure.structure}</Text>
            </View>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>💡 Ejemplo práctico:</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.exampleCode}>{structure.example}</Text>
            </View>
          </View>

          <View style={styles.prosConsContainer}>
            <View style={styles.prosContainer}>
              <Text style={styles.prosTitle}>✅ Ventajas:</Text>
              {structure.advantages.map((advantage, index) => (
                <Text key={index} style={styles.proItem}>• {advantage}</Text>
              ))}
            </View>

            <View style={styles.consContainer}>
              <Text style={styles.consTitle}>❌ Desventajas:</Text>
              {structure.disadvantages.map((disadvantage, index) => (
                <Text key={index} style={styles.conItem}>• {disadvantage}</Text>
              ))}
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Estructuras de Carpetas</Text>
          <Text style={styles.subtitle}>
            Diferentes formas de organizar tu proyecto React Native según el contexto y necesidades
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>🏗️ ¿Cómo elegir la estructura correcta?</Text>
          <Text style={styles.infoText}>
            La estructura de carpetas correcta depende de varios factores:{'\n\n'}
            📊 <Text style={styles.infoBold}>Tamaño del proyecto:</Text> Pequeño, mediano, grande{'\n'}
            👥 <Text style={styles.infoBold}>Tamaño del equipo:</Text> 1-3, 4-10, 10+ desarrolladores{'\n'}
            ⏱️ <Text style={styles.infoBold}>Timeline:</Text> Prototipo, MVP, producción a largo plazo{'\n'}
            🎯 <Text style={styles.infoBold}>Complejidad:</Text> Simple CRUD vs. lógica compleja{'\n'}
            🔄 <Text style={styles.infoBold}>Escalabilidad:</Text> Crecimiento esperado del proyecto
          </Text>
        </View>

        <View style={styles.structuresContainer}>
          {structures.map(renderStructureCard)}
        </View>

        <View style={styles.comparisonSection}>
          <Text style={styles.comparisonTitle}>📊 Comparación por Contexto</Text>
          
          <View style={styles.comparisonCategory}>
            <Text style={styles.categoryTitle}>🚀 Startup / MVP</Text>
            <Text style={styles.categoryDescription}>
              <Text style={styles.recommended}>Recomendado:</Text> Estructura Básica{'\n'}
              <Text style={styles.alternative}>Alternativa:</Text> Feature-Based (si crece rápido)
            </Text>
          </View>

          <View style={styles.comparisonCategory}>
            <Text style={styles.categoryTitle}>🏢 Empresa Mediana</Text>
            <Text style={styles.categoryDescription}>
              <Text style={styles.recommended}>Recomendado:</Text> Feature-Based{'\n'}
              <Text style={styles.alternative}>Alternativa:</Text> Domain-Driven Design
            </Text>
          </View>

          <View style={styles.comparisonCategory}>
            <Text style={styles.categoryTitle}>🏛️ Enterprise</Text>
            <Text style={styles.categoryDescription}>
              <Text style={styles.recommended}>Recomendado:</Text> Domain-Driven Design{'\n'}
              <Text style={styles.alternative}>Alternativa:</Text> Monorepo + Micro-frontends
            </Text>
          </View>

          <View style={styles.comparisonCategory}>
            <Text style={styles.categoryTitle}>🎨 Design System</Text>
            <Text style={styles.categoryDescription}>
              <Text style={styles.recommended}>Recomendado:</Text> Atomic Design{'\n'}
              <Text style={styles.alternative}>Alternativa:</Text> Monorepo con shared-ui
            </Text>
          </View>
        </View>

        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Tips para la Organización</Text>
          
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>📝 Naming Conventions</Text>
            <Text style={styles.tipText}>
              • Usa camelCase para archivos: `userProfile.ts`{'\n'}
              • Usa PascalCase para componentes: `UserProfile.tsx`{'\n'}
              • Usa kebab-case para carpetas: `user-profile/`{'\n'}
              • Prefija types con 'I': `IUser.ts`
            </Text>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>📁 File Organization</Text>
            <Text style={styles.tipText}>
              • Co-locate archivos relacionados{'\n'}
              • Usa index.ts para exports limpios{'\n'}
              • Separa concerns (UI, logic, data){'\n'}
              • Mantén depth máximo de 4-5 niveles
            </Text>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>🔄 Migration Strategy</Text>
            <Text style={styles.tipText}>
              • Empieza simple, evoluciona gradualmente{'\n'}
              • Migra feature por feature{'\n'}
              • Mantén backward compatibility{'\n'}
              • Usa tools como `jscodeshift` para refactoring
            </Text>
          </View>
        </View>

        <View style={styles.toolsSection}>
          <Text style={styles.toolsTitle}>🛠️ Tools Recomendadas</Text>
          
          <View style={styles.toolsList}>
            <View style={styles.toolItem}>
              <Text style={styles.toolName}>📦 Lerna/Nx</Text>
              <Text style={styles.toolDescription}>Para monorepos</Text>
            </View>
            
            <View style={styles.toolItem}>
              <Text style={styles.toolName}>🎨 Storybook</Text>
              <Text style={styles.toolDescription}>Para Atomic Design</Text>
            </View>
            
            <View style={styles.toolItem}>
              <Text style={styles.toolName}>🏗️ Module Federation</Text>
              <Text style={styles.toolDescription}>Para micro-frontends</Text>
            </View>
            
            <View style={styles.toolItem}>
              <Text style={styles.toolName}>📋 Plop.js</Text>
              <Text style={styles.toolDescription}>Para scaffolding/templates</Text>
            </View>
            
            <View style={styles.toolItem}>
              <Text style={styles.toolName}>🔍 Madge</Text>
              <Text style={styles.toolDescription}>Para análisis de dependencias</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🏗️ La estructura correcta evoluciona con tu proyecto. Empieza simple y refactoriza cuando sea necesario.
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
    backgroundColor: '#e8f4fd',
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
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
  infoBold: {
    fontWeight: 'bold',
  },
  structuresContainer: {
    padding: 10,
  },
  structureCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    borderLeftWidth: 4,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  structureIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  structureInfo: {
    flex: 1,
  },
  structureName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  structureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  expandIcon: {
    fontSize: 24,
    color: '#999',
    fontWeight: 'bold',
  },
  bestForContainer: {
    marginBottom: 12,
  },
  bestForLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  bestForList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  bestForTag: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  bestForText: {
    fontSize: 11,
    fontWeight: '500',
  },
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  structureCodeContainer: {
    marginBottom: 16,
  },
  structureCodeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  codeBlock: {
    backgroundColor: '#2d3748',
    padding: 12,
    borderRadius: 8,
  },
  structureCode: {
    fontFamily: 'Courier',
    fontSize: 10,
    color: '#a0aec0',
    lineHeight: 14,
  },
  exampleContainer: {
    marginBottom: 16,
  },
  exampleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  exampleCode: {
    fontFamily: 'Courier',
    fontSize: 9,
    color: '#a0aec0',
    lineHeight: 12,
  },
  prosConsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  prosContainer: {
    flex: 1,
  },
  consContainer: {
    flex: 1,
  },
  prosTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  consTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F44336',
    marginBottom: 8,
  },
  proItem: {
    fontSize: 12,
    color: '#4CAF50',
    lineHeight: 16,
    marginBottom: 4,
  },
  conItem: {
    fontSize: 12,
    color: '#F44336',
    lineHeight: 16,
    marginBottom: 4,
  },
  comparisonSection: {
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
  comparisonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  comparisonCategory: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  recommended: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  alternative: {
    fontWeight: 'bold',
    color: '#FF9800',
  },
  tipsSection: {
    backgroundColor: '#fff3e0',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 16,
  },
  tipCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 6,
  },
  tipText: {
    fontSize: 12,
    color: '#FF8F00',
    lineHeight: 16,
  },
  toolsSection: {
    backgroundColor: '#e8f5e8',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  toolsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  toolsList: {
    gap: 12,
  },
  toolItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 12,
    borderRadius: 8,
  },
  toolName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    flex: 1,
  },
  toolDescription: {
    fontSize: 12,
    color: '#388E3C',
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

export default FolderStructuresExample;
