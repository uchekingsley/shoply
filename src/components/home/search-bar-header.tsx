import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  Palette,
  Typography,
  Spacing,
  InputDimensions,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useCart } from '@/context/cart-context';

export interface SearchBarHeaderProps {
  onSearchPress?: () => void;
  onCartPress?: () => void;
}

export function SearchBarHeader({
  onSearchPress,
  onCartPress,
}: SearchBarHeaderProps) {
  const theme = useTheme();
  const { totalUnits } = useCart();

  return (
    <View style={[styles.headerContainer, { backgroundColor: theme.background }]}>
      <Pressable
        onPress={onSearchPress}
        style={[
          styles.searchBar,
          {
            backgroundColor: theme.backgroundSecondary,
            borderColor: theme.border,
          },
        ]}
        accessibilityRole="search"
        accessibilityLabel="Search products, brands and categories"
      >
        <Text style={styles.searchIcon}>🔍</Text>
        <Text style={[styles.searchPlaceholder, { color: theme.textSecondary }]}>
          Search products, brands, categories...
        </Text>
      </Pressable>

      {onCartPress && (
        <Pressable
          onPress={onCartPress}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.cartButton}
          accessibilityRole="button"
          accessibilityLabel={`Shopping cart with ${totalUnits} items`}
        >
          <Text style={styles.cartIcon}>🛒</Text>
          {totalUnits > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {totalUnits > 99 ? '99+' : totalUnits}
              </Text>
            </View>
          )}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  searchBar: {
    flex: 1,
    height: InputDimensions.height - 4,
    borderRadius: InputDimensions.borderRadius,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: Spacing.sm,
  },
  searchPlaceholder: {
    ...Typography.bodySmall,
    flex: 1,
  },
  cartButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cartIcon: {
    fontSize: 22,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 2,
    backgroundColor: Palette.actionOrange,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: Palette.white,
    fontSize: 10,
    fontWeight: '700',
  },
});
