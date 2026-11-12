import React, { useState, useMemo } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Palette, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useRecentlyViewedStore } from '@/store/recently-viewed-store';
import { useWishlistStore } from '@/store/wishlist-store';
import {
  LocationSelector,
  SearchBarHeader,
  PromoCarousel,
  CategoryGrid,
  SectionHeader,
  FlashDealsSection,
} from '@/components/home';
import { ProductCard, AuthModal } from '@/components/ui';
import { MOCK_PRODUCTS } from '@/data/mock-data';
import { Category, Product } from '@/types';

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const recentlyViewed = useRecentlyViewedStore((state) => state.recentlyViewed);
  const addRecentlyViewed = useRecentlyViewedStore((state) => state.addRecentlyViewed);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);

  // Selected category filter
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [authModalVisible, setAuthModalVisible] = useState(false);

  // Filtered lists
  const flashDeals = useMemo(() => MOCK_PRODUCTS.filter((p) => p.isFlashDeal), []);
  const bestSellers = useMemo(() => MOCK_PRODUCTS.filter((p) => p.isBestSeller), []);

  const displayedProducts = useMemo(() => {
    if (selectedCategory) {
      return MOCK_PRODUCTS.filter((p) => p.categoryId === selectedCategory.id);
    }
    return MOCK_PRODUCTS;
  }, [selectedCategory]);

  const handleOpenProduct = (product: Product) => {
    addRecentlyViewed(product);
    router.push(`/product/${product.id}`);
  };

  const handleCategoryPress = (category: Category) => {
    setSelectedCategory((prev) => (prev?.id === category.id ? null : category));
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.background === Palette.white ? 'dark-content' : 'light-content'}
        backgroundColor={theme.background}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Delivery Location Selector */}
        <LocationSelector />

        {/* 2. Search Bar Header */}
        <SearchBarHeader
          onSearchPress={() => router.push('/search' as any)}
          onCartPress={() => router.push('/explore')}
        />

        {/* 3. Promotional Carousel */}
        <PromoCarousel
          onBannerPress={(_, catId) => {
            const found = MOCK_PRODUCTS.find((p) => p.categoryId === catId);
            if (found) {
              setSelectedCategory({
                id: catId!,
                name: found.categoryName ?? 'Category',
                slug: catId!,
              });
            }
          }}
        />

        {/* 4. Product Categories */}
        <SectionHeader
          title="Categories"
          subtitle="Explore curated collections"
          actionText={selectedCategory ? 'Show All' : undefined}
          onActionPress={selectedCategory ? () => setSelectedCategory(null) : undefined}
        />
        <CategoryGrid
          onCategoryPress={handleCategoryPress}
          selectedCategoryId={selectedCategory?.id}
        />

        {/* 5. Flash Deals (Real-time countdown timer) */}
        {!selectedCategory && flashDeals.length > 0 && (
          <FlashDealsSection
            products={flashDeals}
            onProductPress={handleOpenProduct}
            onWishlistPress={() => setAuthModalVisible(true)}
          />
        )}

        {/* 6. Best Sellers */}
        {!selectedCategory && bestSellers.length > 0 && (
          <View style={styles.sectionBlock}>
            <SectionHeader
              title="Best Sellers"
              subtitle="Most popular items in Nigeria"
            />
            <FlatList
              data={bestSellers}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              renderItem={({ item }) => (
                <View style={styles.horizontalCardWrapper}>
                  <ProductCard
                    product={item}
                    onPress={handleOpenProduct}
                    isWishlisted={isInWishlist(item.id)}
                    onWishlistPress={() => toggleWishlist(item)}
                  />
                </View>
              )}
            />
          </View>
        )}

        {/* 7. Recommended Products / Filtered Category Grid */}
        <View style={styles.sectionBlock}>
          <SectionHeader
            title={selectedCategory ? selectedCategory.name : 'Recommended For You'}
            subtitle={
              selectedCategory
                ? `${displayedProducts.length} items found`
                : 'Top picks tailored to your style'
            }
          />
          <View style={styles.productGrid}>
            {displayedProducts.map((product) => (
              <View key={product.id} style={styles.gridCardWrapper}>
                <ProductCard
                  product={product}
                  onPress={handleOpenProduct}
                  onWishlistPress={() => setAuthModalVisible(true)}
                />
              </View>
            ))}
          </View>
        </View>

        {/* 8. Recently Viewed Products */}
        {recentlyViewed.length > 0 && (
          <View style={styles.sectionBlock}>
            <SectionHeader
              title="Recently Viewed"
              subtitle="Quickly return to items you inspected"
            />
            <FlatList
              data={recentlyViewed}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              renderItem={({ item }) => (
                <View style={styles.horizontalCardWrapper}>
                  <ProductCard
                    product={item}
                    onPress={handleOpenProduct}
                    isWishlisted={isInWishlist(item.id)}
                    onWishlistPress={() => toggleWishlist(item)}
                  />
                </View>
              )}
            />
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Guest Wishlist Auth Prompt */}
      <AuthModal
        visible={authModalVisible}
        title="Account Required"
        description="Guests can freely browse and build a cart, but wishlists, saved orders, and checkout require signing in."
        onClose={() => setAuthModalVisible(false)}
        onConfirm={() => setAuthModalVisible(false)}
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
    paddingBottom: Spacing.xxxl,
  },
  sectionBlock: {
    marginVertical: Spacing.xs,
  },
  horizontalList: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  horizontalCardWrapper: {
    width: 170,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  gridCardWrapper: {
    width: '47.5%',
  },
  bottomSpacer: {
    height: 70,
  },
});
