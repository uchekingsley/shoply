import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
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
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/data/mock-data';
import { Product } from '@/types';

type SortOption = 'popular' | 'price_low' | 'price_high' | 'rating';

export default function SearchScreen() {
  const router = useRouter();
  const theme = useTheme();

  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);
  const addRecentlyViewed = useRecentlyViewedStore((state) => state.addRecentlyViewed);

  const [query, setQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  const filteredProducts = useMemo(() => {
    let list = [...MOCK_PRODUCTS];

    if (selectedCategoryId) {
      list = list.filter((p) => p.categoryId === selectedCategoryId);
    }

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price_low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return list;
  }, [query, selectedCategoryId, sortBy]);

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

      {/* Header Search Input */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <View style={[styles.searchBar, { backgroundColor: theme.surface }]}>
          <Ionicons name="search" size={20} color={theme.textSecondary} />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Search products, brands, tech..."
            placeholderTextColor={theme.textSecondary}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close-circle" size={18} color={theme.textSecondary} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Categories Horizontal Filter Chips */}
      <View style={styles.categoriesBar}>
        <Pressable
          style={[
            styles.chip,
            {
              backgroundColor: selectedCategoryId === null ? Palette.actionOrange : theme.surface,
              borderColor: selectedCategoryId === null ? Palette.actionOrange : theme.border,
            },
          ]}
          onPress={() => setSelectedCategoryId(null)}
        >
          <Text
            style={[
              styles.chipText,
              { color: selectedCategoryId === null ? Palette.white : theme.text },
            ]}
          >
            All Items
          </Text>
        </Pressable>

        {MOCK_CATEGORIES.map((cat) => {
          const isSelected = selectedCategoryId === cat.id;
          return (
            <Pressable
              key={cat.id}
              style={[
                styles.chip,
                {
                  backgroundColor: isSelected ? Palette.actionOrange : theme.surface,
                  borderColor: isSelected ? Palette.actionOrange : theme.border,
                },
              ]}
              onPress={() => setSelectedCategoryId(isSelected ? null : cat.id)}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: isSelected ? Palette.white : theme.text },
                ]}
              >
                {cat.name}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Sorting / Results bar */}
      <View style={styles.resultsInfoBar}>
        <Text style={[styles.resultsCount, { color: theme.textSecondary }]}>
          {filteredProducts.length} product{filteredProducts.length === 1 ? '' : 's'} found
        </Text>

        <View style={styles.sortContainer}>
          <Text style={[styles.sortLabel, { color: theme.textSecondary }]}>Sort:</Text>
          <Pressable
            style={[styles.sortPill, { borderColor: theme.border }]}
            onPress={() => {
              const options: SortOption[] = ['popular', 'price_low', 'price_high', 'rating'];
              const nextIdx = (options.indexOf(sortBy) + 1) % options.length;
              setSortBy(options[nextIdx]);
            }}
          >
            <Text style={[styles.sortPillText, { color: Palette.actionOrange }]}>
              {sortBy === 'popular'
                ? 'Popular'
                : sortBy === 'price_low'
                ? 'Price: Low'
                : sortBy === 'price_high'
                ? 'Price: High'
                : 'Top Rated'}
            </Text>
            <Ionicons name="swap-vertical" size={14} color={Palette.actionOrange} />
          </Pressable>
        </View>
      </View>

      {/* Product List using @shopify/flash-list */}
      {filteredProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={64} color={theme.textSecondary} />
          <Text style={[styles.emptyTitle, { color: theme.text }]}>No products found</Text>
          <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
            Try checking your spelling or adjusting your category filter.
          </Text>
        </View>
      ) : (
        <View style={styles.listWrapper}>
          <FlashList
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.cardItemWrapper}>
                <ProductCard
                  product={item}
                  onPress={handleOpenProduct}
                  isWishlisted={isInWishlist(item.id)}
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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    height: 44,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    ...Typography.bodySmall,
    height: '100%',
  },
  categoriesBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    gap: Spacing.xs,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  chipText: {
    ...Typography.supporting,
    fontWeight: '600',
  },
  resultsInfoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
  },
  resultsCount: {
    ...Typography.supporting,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  sortLabel: {
    ...Typography.supporting,
  },
  sortPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    gap: 4,
  },
  sortPillText: {
    ...Typography.supporting,
    fontWeight: '600',
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
    padding: Spacing.xl,
    gap: Spacing.sm,
  },
  emptyTitle: {
    ...Typography.sectionHeading,
  },
  emptySubtitle: {
    ...Typography.bodySmall,
    textAlign: 'center',
    maxWidth: 260,
  },
});
