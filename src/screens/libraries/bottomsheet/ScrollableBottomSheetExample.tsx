import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet, { 
  BottomSheetView,
  BottomSheetScrollView,
  BottomSheetFlatList,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  image: string;
}

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const ScrollableBottomSheetExample = () => {
  const [currentSheet, setCurrentSheet] = useState<'none' | 'products' | 'details'>('none');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Refs
  const productsSheetRef = useRef<BottomSheet>(null);
  const detailsSheetRef = useRef<BottomSheet>(null);

  // Snap points
  const productsSnapPoints = useMemo(() => ['40%', '80%'], []);
  const detailsSnapPoints = useMemo(() => ['60%', '95%'], []);

  // Mock data
  const products: Product[] = [
    {
      id: '1',
      name: 'iPhone 14 Pro',
      price: 999,
      description: 'The most advanced iPhone with Pro camera system',
      category: 'Smartphones',
      rating: 4.8,
      image: '📱'
    },
    {
      id: '2',
      name: 'MacBook Pro 16"',
      price: 2499,
      description: 'Supercharged for pros with M2 Pro chip',
      category: 'Laptops',
      rating: 4.9,
      image: '💻'
    },
    {
      id: '3',
      name: 'AirPods Pro',
      price: 249,
      description: 'Active Noise Cancellation and Spatial Audio',
      category: 'Audio',
      rating: 4.7,
      image: '🎧'
    },
    {
      id: '4',
      name: 'iPad Air',
      price: 599,
      description: 'Serious performance. Serious fun.',
      category: 'Tablets',
      rating: 4.6,
      image: '📱'
    },
    {
      id: '5',
      name: 'Apple Watch Ultra',
      price: 799,
      description: 'The most rugged and capable Apple Watch',
      category: 'Wearables',
      rating: 4.8,
      image: '⌚'
    },
    {
      id: '6',
      name: 'Studio Display',
      price: 1599,
      description: '27-inch 5K Retina display',
      category: 'Monitors',
      rating: 4.5,
      image: '🖥️'
    },
  ];

  const reviews: Review[] = [
    {
      id: '1',
      user: 'John Doe',
      rating: 5,
      comment: 'Absolutely amazing! The camera quality is incredible.',
      date: '2024-01-15'
    },
    {
      id: '2',
      user: 'Jane Smith',
      rating: 4,
      comment: 'Great device, but battery could be better.',
      date: '2024-01-10'
    },
    {
      id: '3',
      user: 'Mike Johnson',
      rating: 5,
      comment: 'Best phone I\'ve ever owned. Highly recommended!',
      date: '2024-01-08'
    },
    {
      id: '4',
      user: 'Sarah Wilson',
      rating: 4,
      comment: 'Love the design and performance. Face ID works perfectly.',
      date: '2024-01-05'
    },
    {
      id: '5',
      user: 'David Brown',
      rating: 5,
      comment: 'The Pro camera system is a game changer for photography.',
      date: '2024-01-02'
    },
  ];

  // Callbacks
  const handleProductsSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setCurrentSheet('none');
    } else {
      setCurrentSheet('products');
    }
  }, []);

  const handleDetailsSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setCurrentSheet(selectedProduct ? 'products' : 'none');
    } else {
      setCurrentSheet('details');
    }
  }, [selectedProduct]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  // Actions
  const openProductsList = () => {
    productsSheetRef.current?.snapToIndex(0);
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    detailsSheetRef.current?.snapToIndex(0);
  };

  const closeAllSheets = () => {
    productsSheetRef.current?.close();
    detailsSheetRef.current?.close();
  };

  // Pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Render functions
  const renderProductItem = ({ item }: { item: Product }) => (
    <Pressable
      style={styles.productItem}
      onPress={() => openProductDetails(item)}>
      <Text style={styles.productEmoji}>{item.image}</Text>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <View style={styles.productFooter}>
          <Text style={styles.productPrice}>${item.price}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingStar}>⭐</Text>
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.arrowIcon}>→</Text>
    </Pressable>
  );

  const renderReviewItem = ({ item }: { item: Review }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewUser}>{item.user}</Text>
        <Text style={styles.reviewDate}>{item.date}</Text>
      </View>
      <View style={styles.reviewRating}>
        {[...Array(5)].map((_, i) => (
          <Text key={i} style={[styles.star, i < item.rating && styles.starFilled]}>⭐</Text>
        ))}
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Scrollable Bottom Sheets</Text>
            <Text style={styles.subtitle}>
              ScrollView y FlatList integrados con bottom sheets
            </Text>
          </View>

          {/* Info Panel */}
          <View style={styles.infoPanel}>
            <Text style={styles.infoTitle}>📜 Estado Actual:</Text>
            <Text style={styles.infoText}>
              {currentSheet === 'none' && 'No hay bottom sheets abiertos'}
              {currentSheet === 'products' && 'Lista de productos visible'}
              {currentSheet === 'details' && `Detalles de: ${selectedProduct?.name}`}
            </Text>
          </View>

          {/* Controls */}
          <View style={styles.controlsSection}>
            <Text style={styles.controlsTitle}>Controles</Text>
            
            <View style={styles.buttonRow}>
              <Pressable
                style={[styles.button, styles.primaryButton]}
                onPress={openProductsList}>
                <Text style={styles.buttonText}>Ver Productos</Text>
              </Pressable>
              
              <Pressable
                style={[styles.button, styles.dangerButton]}
                onPress={closeAllSheets}>
                <Text style={styles.buttonText}>Cerrar Todo</Text>
              </Pressable>
            </View>
          </View>

          {/* Features */}
          <View style={styles.featuresSection}>
            <Text style={styles.featuresTitle}>🎯 Características Demostradas</Text>
            <View style={styles.featuresList}>
              <Text style={styles.featureItem}>📱 FlatList con renderizado optimizado</Text>
              <Text style={styles.featureItem}>📜 ScrollView con contenido extenso</Text>
              <Text style={styles.featureItem}>🔄 Pull to refresh functionality</Text>
              <Text style={styles.featureItem}>🎨 Navegación entre bottom sheets</Text>
              <Text style={styles.featureItem}>📊 Datos dinámicos y estados</Text>
              <Text style={styles.featureItem}>⚡ Performance optimizada</Text>
            </View>
          </View>

          {/* Code Example */}
          <View style={styles.codeSection}>
            <Text style={styles.codeTitle}>💡 Código de Ejemplo</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>{`<BottomSheet
  ref={bottomSheetRef}
  snapPoints={snapPoints}>
  <BottomSheetFlatList
    data={data}
    renderItem={renderItem}
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }
  />
</BottomSheet>`}</Text>
            </View>
          </View>
          </View>
        </ScrollView>

        {/* Products Bottom Sheet */}
        <BottomSheet
          ref={productsSheetRef}
          index={-1}
          snapPoints={productsSnapPoints}
          onChange={handleProductsSheetChanges}
          backdropComponent={renderBackdrop}
          backgroundStyle={styles.bottomSheetBackground}>
          
          <BottomSheetFlatList
            data={products}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>🛍️ Productos</Text>
                <Text style={styles.sheetSubtitle}>
                  Lista scrollable con pull to refresh
                </Text>
              </View>
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#007AFF"
              />
            }
          />
        </BottomSheet>

        {/* Product Details Bottom Sheet */}
        <BottomSheet
          ref={detailsSheetRef}
          index={-1}
          snapPoints={detailsSnapPoints}
          onChange={handleDetailsSheetChanges}
          backdropComponent={renderBackdrop}
          backgroundStyle={styles.bottomSheetBackground}>
          
          <BottomSheetScrollView
            contentContainerStyle={styles.detailsContainer}
            showsVerticalScrollIndicator={false}>
            
            {selectedProduct && (
              <>
                <View style={styles.productHeader}>
                  <Text style={styles.productDetailEmoji}>{selectedProduct.image}</Text>
                  <Text style={styles.productDetailName}>{selectedProduct.name}</Text>
                  <Text style={styles.productDetailPrice}>${selectedProduct.price}</Text>
                  <View style={styles.productDetailRating}>
                    <Text style={styles.ratingStar}>⭐</Text>
                    <Text style={styles.ratingText}>{selectedProduct.rating}</Text>
                    <Text style={styles.ratingCount}>(124 reviews)</Text>
                  </View>
                </View>

                <View style={styles.descriptionSection}>
                  <Text style={styles.sectionTitle}>Descripción</Text>
                  <Text style={styles.descriptionText}>{selectedProduct.description}</Text>
                  <Text style={styles.descriptionText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                    commodo consequat.
                  </Text>
                </View>

                <View style={styles.specificationsSection}>
                  <Text style={styles.sectionTitle}>Especificaciones</Text>
                  <View style={styles.specItem}>
                    <Text style={styles.specLabel}>Categoría:</Text>
                    <Text style={styles.specValue}>{selectedProduct.category}</Text>
                  </View>
                  <View style={styles.specItem}>
                    <Text style={styles.specLabel}>SKU:</Text>
                    <Text style={styles.specValue}>{selectedProduct.id}</Text>
                  </View>
                  <View style={styles.specItem}>
                    <Text style={styles.specLabel}>Disponibilidad:</Text>
                    <Text style={[styles.specValue, styles.available]}>En stock</Text>
                  </View>
                </View>

                <View style={styles.reviewsSection}>
                  <Text style={styles.sectionTitle}>Reseñas de Clientes</Text>
                  {reviews.map((review) => (
                    <View key={review.id}>
                      {renderReviewItem({ item: review })}
                    </View>
                  ))}
                </View>

                <View style={styles.actionsSection}>
                  <Pressable style={styles.addToCartButton}>
                    <Text style={styles.addToCartText}>Agregar al Carrito</Text>
                  </Pressable>
                  <Pressable style={styles.buyNowButton}>
                    <Text style={styles.buyNowText}>Comprar Ahora</Text>
                  </Pressable>
                </View>
              </>
            )}
          </BottomSheetScrollView>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
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
  content: {
    padding: 16,
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  title: {
    fontSize: 24,
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
    backgroundColor: '#e8f4fd',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#0056b3',
    lineHeight: 20,
  },
  controlsSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  controlsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  featuresSection: {
    backgroundColor: '#fff9e6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#cc6600',
    marginBottom: 12,
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    fontSize: 14,
    color: '#cc6600',
    lineHeight: 20,
  },
  codeSection: {
    backgroundColor: '#2d3748',
    padding: 16,
    borderRadius: 12,
  },
  codeTitle: {
    fontSize: 16,
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
  bottomSheetBackground: {
    backgroundColor: '#fff',
  },
  sheetHeader: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sheetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sheetSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  productEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34C759',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStar: {
    fontSize: 16,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  arrowIcon: {
    fontSize: 20,
    color: '#007AFF',
    marginLeft: 8,
  },
  detailsContainer: {
    padding: 20,
  },
  productHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  productDetailEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  productDetailName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  productDetailPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34C759',
    marginBottom: 12,
  },
  productDetailRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 12,
  },
  specificationsSection: {
    marginBottom: 24,
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  specLabel: {
    fontSize: 16,
    color: '#666',
  },
  specValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  available: {
    color: '#34C759',
  },
  reviewsSection: {
    marginBottom: 24,
  },
  reviewItem: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reviewDate: {
    fontSize: 14,
    color: '#666',
  },
  reviewRating: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  star: {
    fontSize: 16,
    color: '#ccc',
  },
  starFilled: {
    color: '#FFD700',
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  actionsSection: {
    gap: 12,
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  buyNowButton: {
    backgroundColor: '#34C759',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buyNowText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ScrollableBottomSheetExample;
