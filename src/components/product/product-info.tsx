import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  Palette,
  Typography,
  Spacing,
  formatNaira,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { StatusBadge } from '@/components/ui';
import { Product } from '@/types';

export interface ProductInfoProps {
  product: Product;
  currentPrice: number;
  originalPrice?: number;
  isAvailable: boolean;
  availableStock: number;
  onReviewsPress: () => void;
}

export function ProductInfo({
  product,
  currentPrice,
  originalPrice,
  isAvailable,
  availableStock,
  onReviewsPress,
}: ProductInfoProps) {
  const theme = useTheme();
  const hasDiscount = Boolean(originalPrice && originalPrice > currentPrice);

  return (
    <View style={styles.container}>
      {/* Rating & Reviews Jump */}
      <Pressable onPress={onReviewsPress} style={styles.ratingRow}>
        <Text style={styles.starIcon}>★</Text>
        <Text style={[styles.ratingNumber, { color: theme.text }]}>
          {product.rating.toFixed(1)}
        </Text>
        <Text style={[styles.reviewCountText, { color: Palette.brandNavy }]}>
          ({product.reviewCount} customer reviews) ›
        </Text>
      </Pressable>

      {/* Product Title */}
      <Text style={[styles.productTitle, { color: theme.text }]}>
        {product.name}
      </Text>

      {/* Price Block */}
      <View style={styles.priceContainer}>
        <Text style={[styles.currentPrice, { color: Palette.brandNavy }]}>
          {formatNaira(currentPrice)}
        </Text>
        {hasDiscount && originalPrice ? (
          <Text style={[styles.originalPrice, { color: theme.textSecondary }]}>
            {formatNaira(originalPrice)}
          </Text>
        ) : null}
      </View>

      {/* Availability / Stock Status */}
      <View style={styles.stockRow}>
        <StatusBadge
          label={
            !isAvailable
              ? 'Out of Stock'
              : product.stockStatus === 'low_stock'
              ? 'Low Stock (Few remaining)'
              : 'In Stock'
          }
          variant={
            !isAvailable
              ? 'error'
              : product.stockStatus === 'low_stock'
              ? 'warning'
              : 'success'
          }
        />
        {isAvailable && (
          <Text style={[styles.stockUnits, { color: theme.textSecondary }]}>
            {availableStock < 10
              ? `Only ${availableStock} left in stock`
              : 'Ready to ship'}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  starIcon: {
    color: '#FFB800',
    fontSize: 15,
    marginRight: 4,
  },
  ratingNumber: {
    ...Typography.bodySmall,
    fontWeight: '700',
  },
  reviewCountText: {
    ...Typography.bodySmall,
    fontWeight: '600',
    marginLeft: 6,
  },
  productTitle: {
    ...Typography.screenTitle,
    fontSize: 21,
    lineHeight: 28,
    marginBottom: Spacing.xs,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.sm,
    marginVertical: Spacing.xs,
  },
  currentPrice: {
    ...Typography.productPrice,
    fontSize: 24,
  },
  originalPrice: {
    ...Typography.body,
    textDecorationLine: 'line-through',
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  stockUnits: {
    ...Typography.supporting,
    fontSize: 12,
  },
});
