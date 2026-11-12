import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Palette, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useWishlistStore } from '@/store/wishlist-store';
import { useRecentlyViewedStore } from '@/store/recently-viewed-store';
import { ProductCard } from '@/components/ui/product-card';
import { AppButton } from '@/components/ui/app-button';
import { Product } from '@/types';

export default function WishlistScreen() {
  const router = useRouter();
  const theme = useTheme();

  const wishlist = useWishlistStore((state) => state.wishlist);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  const addRecentlyViewed = useRecentlyViewedStore((state) => state.addRecentlyViewed);

  const handleOpenProduct = (product: Product) => {
    addRecentlyViewed(product);
    router.push(`/product/${product.id}`);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.background === Palette.white ? 'dark-content' : 'light-content'}
        backgroundColor={theme.background}
      />

      {/* Screen Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Saved Items</Text>
        {wishlist.length > 0 && (
          <Pressable
            onPress={clearWishlist}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel="Clear wishlist"
          >
            <Text style={styles.clearText}>Clear All</Text>
          </Pressable>
        )}
      </View>

      {wishlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.heartIconCircle}>
            <Ionicons name="heart-outline" size={48} color={Palette.actionOrange} />
          </View>
          <Text style={[styles.emptyTitle, { color: theme.text }]}>Your wishlist is empty</Text>
          <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
            Tap the heart icon on any product to save it here for later.
          </Text>
          <View style={styles.ctaButtonWrapper}>
            <AppButton
              title="Explore Products"
              variant="primary"
              onPress={() => router.push('/')}
            />
          </View>
        </View>
      ) : (
        <View style={styles.listWrapper}>
          <Text style={[styles.countLabel, { color: theme.textSecondary }]}>
            {wishlist.length} item{wishlist.length === 1 ? '' : 's'} saved
          </Text>
          <FlashList
            data={wishlist}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.cardItemWrapper}>
                <ProductCard
                  product={item}
                  onPress={handleOpenProduct}
                  isWishlisted={true}
                  onWishlistPress={() => toggleWishlist(item)}
                />
              </View>
            )}
            contentContainerStyle={styles.listContent}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    borderBottomWidth: 1,
  },
  headerTitle: {
    ...Typography.sectionHeading,
  },
  clearText: {
    ...Typography.supporting,
    color: Palette.errorRed,
    fontWeight: '600',
  },
  countLabel: {
    ...Typography.supporting,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  listWrapper: {
    flex: 1,
    paddingHorizontal: Spacing.sm,
  },
  listContent: {
    paddingBottom: Spacing.xxxl * 2,
  },
  cardItemWrapper: {
    flex: 1,
    padding: Spacing.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxl,
    gap: Spacing.md,
  },
  heartIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF0EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  emptyTitle: {
    ...Typography.sectionHeading,
  },
  emptySubtitle: {
    ...Typography.bodySmall,
    textAlign: 'center',
    maxWidth: 260,
  },
  ctaButtonWrapper: {
    width: 200,
    marginTop: Spacing.sm,
  },
});
