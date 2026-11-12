import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Palette, Typography, Spacing, formatNaira } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { useRecentlyViewedStore } from '@/store/recently-viewed-store';
import { AppButton, AuthModal, ProductCard } from '@/components/ui';
import {
  ProductHeader,
  ProductGallery,
  ProductInfo,
  ProductVariations,
  ProductQuantitySelector,
  ProductSpecifications,
  ProductDeliveryInfo,
  ProductReviewsSection,
  ProductPurchaseFooter,
} from '@/components/product';
import { MOCK_PRODUCTS, MOCK_REVIEWS } from '@/data/mock-data';
import { ProductVariation } from '@/types';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const addToCart = useCartStore((state) => state.addToCart);
  const addRecentlyViewed = useRecentlyViewedStore((state) => state.addRecentlyViewed);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);

  // Find product
  const product = useMemo(
    () => MOCK_PRODUCTS.find((p) => p.id === id || p.slug === id) ?? MOCK_PRODUCTS[0],
    [id]
  );

  const isWishlisted = product ? isInWishlist(product.id) : false;

  // Component state
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(
    product?.variations?.[0] ?? null
  );
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [authModalVisible, setAuthModalVisible] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);
  const reviewsSectionY = useRef(0);

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
      setSelectedVariation(product.variations?.[0] ?? null);
      setQuantity(1);
    }
  }, [product, addRecentlyViewed]);

  const reviews = useMemo(() => (product ? MOCK_REVIEWS[product.id] ?? [] : []), [product]);

  const relatedProducts = useMemo(
    () =>
      product
        ? MOCK_PRODUCTS.filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
        : [],
    [product]
  );

  // Pricing & availability calculations
  const currentPrice = selectedVariation ? selectedVariation.price : product.price;
  const originalPrice = selectedVariation?.originalPrice ?? product.originalPrice;
  const isVariationAvailable = selectedVariation ? selectedVariation.isAvailable : product.stockStatus !== 'out_of_stock';
  const availableStock = selectedVariation ? selectedVariation.stock : 99;
  const discountPercent =
    originalPrice && originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleAddToCart = () => {
    const res = addToCart(product, selectedVariation ?? undefined, quantity);
    showToast(res.message);
  };

  const handleBuyNow = () => {
    const res = addToCart(product, selectedVariation ?? undefined, quantity);
    if (res.success) {
      router.push('/explore');
    } else {
      showToast(res.message);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${product.name} on Shoply: ${formatNaira(currentPrice)}!`,
      });
    } catch (e) {
      // Ignore
    }
  };

  const scrollToReviews = () => {
    if (reviewsSectionY.current > 0) {
      scrollViewRef.current?.scrollTo({
        y: reviewsSectionY.current - 60,
        animated: true,
      });
    }
  };

  if (!product) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorTitle, { color: theme.text }]}>Product Not Found</Text>
          <AppButton title="Return to Shop" variant="primary" onPress={() => router.push('/')} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.background === Palette.white ? 'dark-content' : 'light-content'}
        backgroundColor={theme.background}
      />

      {toastMessage && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* 1. Top Header */}
      <ProductHeader
        title={product.categoryName ?? 'Details'}
        isWishlisted={isWishlisted}
        onBack={() => router.back()}
        onShare={handleShare}
        onWishlist={() => {
          const res = toggleWishlist(product);
          showToast(res.message);
        }}
      />

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 2. Swipeable Image Gallery */}
        <ProductGallery images={product.images} discountPercent={discountPercent} />

        {/* 3, 4, 5. Identity, Pricing & Stock Status */}
        <ProductInfo
          product={product}
          currentPrice={currentPrice}
          originalPrice={originalPrice}
          isAvailable={isVariationAvailable}
          availableStock={availableStock}
          onReviewsPress={scrollToReviews}
        />

        {/* 6. Product Variations */}
        {product.variations && product.variations.length > 0 && (
          <ProductVariations
            variations={product.variations}
            selectedVariation={selectedVariation}
            onSelectVariation={(v) => {
              setSelectedVariation(v);
              setQuantity(1);
            }}
          />
        )}

        {/* 7. Quantity Selector */}
        <ProductQuantitySelector
          quantity={quantity}
          maxStock={availableStock}
          onIncrease={() => setQuantity((q) => Math.min(availableStock, q + 1))}
          onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
        />

        {/* 8, 9. Description & Specifications */}
        <ProductSpecifications
          description={product.description}
          specifications={product.specifications}
        />

        {/* 10. Delivery Information */}
        <ProductDeliveryInfo
          estimatedDays={product.deliveryInfo?.estimatedDays}
          feeNote={product.deliveryInfo?.feeNote}
        />

        {/* 11. Customer Reviews */}
        <ProductReviewsSection
          reviews={reviews}
          onLayout={(e) => {
            reviewsSectionY.current = e.nativeEvent.layout.y;
          }}
        />

        {/* 12. Related Products */}
        {relatedProducts.length > 0 && (
          <View style={[styles.relatedSection, { borderColor: theme.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Related Products</Text>
            <FlatList
              data={relatedProducts}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.relatedList}
              renderItem={({ item }) => (
                <View style={styles.cardWrapper}>
                  <ProductCard
                    product={item}
                    onPress={(p) => router.push(`/product/${p.id}`)}
                    onWishlistPress={() => setAuthModalVisible(true)}
                  />
                </View>
              )}
            />
          </View>
        )}

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* 13. Persistent Purchase Footer */}
      <ProductPurchaseFooter
        isAvailable={isVariationAvailable}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Reusable Auth Gate Modal for Wishlist */}
      <AuthModal
        visible={authModalVisible}
        title="Sign In for Wishlist"
        description="Guests can browse and add items to a local cart freely. Saving products to a persistent wishlist requires signing into your Shoply account."
        onClose={() => setAuthModalVisible(false)}
        onConfirm={() => {
          setAuthModalVisible(false);
          toggleWishlist(product);
          showToast('Signed in! Item added to your wishlist.');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  relatedSection: {
    borderTopWidth: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.sectionHeading,
    fontSize: 16,
    marginBottom: Spacing.sm,
  },
  relatedList: {
    gap: Spacing.md,
  },
  cardWrapper: {
    width: 170,
  },
  toast: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    backgroundColor: Palette.brandNavy,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
    borderRadius: 9999,
    zIndex: 9999,
  },
  toastText: {
    color: Palette.white,
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  errorTitle: {
    ...Typography.sectionHeading,
    marginBottom: Spacing.md,
  },
});
