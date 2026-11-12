import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import {
  Palette,
  Typography,
  Spacing,
  BorderRadius,
  formatNaira,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Product } from '@/types';
import { StatusBadge } from './status-badge';

export interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  onWishlistPress?: (product: Product) => void;
  isWishlisted?: boolean;
  style?: ViewStyle;
}

export function ProductCard({
  product,
  onPress,
  onWishlistPress,
  isWishlisted = false,
  style,
}: ProductCardProps) {
  const theme = useTheme();

  const hasDiscount =
    Boolean(product.originalPrice && product.originalPrice > product.price) ||
    Boolean(product.discountPercentage && product.discountPercentage > 0);

  const discountPercent =
    product.discountPercentage ??
    (product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : 0);

  const primaryImage = product.images?.[0];

  return (
    <Pressable
      onPress={() => onPress(product)}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          opacity: pressed ? 0.94 : 1,
        },
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${product.name}, ${formatNaira(product.price)}`}
    >
      {/* Image Container */}
      <View
        style={[
          styles.imageContainer,
          { backgroundColor: theme.backgroundSecondary },
        ]}
      >
        {primaryImage ? (
          <ExpoImage
            source={{ uri: primaryImage }}
            style={styles.image}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={[styles.placeholderText, { color: theme.textSecondary }]}>
              Shoply
            </Text>
          </View>
        )}

        {/* Discount Badge */}
        {hasDiscount && discountPercent > 0 && (
          <View style={styles.discountBadgeContainer}>
            <StatusBadge
              label={`-${discountPercent}%`}
              variant="warning"
              size="sm"
            />
          </View>
        )}

        {/* Wishlist Button */}
        <Pressable
          onPress={() => onWishlistPress?.(product)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={({ pressed }) => [
            styles.wishlistButton,
            {
              backgroundColor: Palette.white,
              opacity: pressed ? 0.75 : 0.95,
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Ionicons
            name={isWishlisted ? 'heart' : 'heart-outline'}
            size={18}
            color={isWishlisted ? Palette.actionOrange : Palette.secondaryTextLight}
          />
        </Pressable>
      </View>

      {/* Product Details Content */}
      <View style={styles.detailsContainer}>
        {/* Rating Row */}
        <View style={styles.ratingRow}>
          <Text style={styles.starIcon}>★</Text>
          <Text style={[styles.ratingText, { color: theme.text }]}>
            {product.rating > 0 ? product.rating.toFixed(1) : 'New'}
          </Text>
          {product.reviewCount > 0 && (
            <Text style={[styles.reviewCountText, { color: theme.textSecondary }]}>
              ({product.reviewCount})
            </Text>
          )}
        </View>

        {/* Product Title */}
        <Text
          numberOfLines={2}
          style={[styles.productName, { color: theme.text }]}
        >
          {product.name}
        </Text>

        {/* Price Row */}
        <View style={styles.priceRow}>
          <Text style={[styles.priceText, { color: Palette.brandNavy }]}>
            {formatNaira(product.price)}
          </Text>
          {hasDiscount && product.originalPrice ? (
            <Text
              style={[
                styles.originalPriceText,
                { color: theme.textSecondary },
              ]}
            >
              {formatNaira(product.originalPrice)}
            </Text>
          ) : null}
        </View>

        {/* Low Stock Warning */}
        {product.stockStatus === 'low_stock' && (
          <Text style={[styles.lowStockText, { color: Palette.actionOrange }]}>
            Limited stock available
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg, // 12dp corner radius per PRD 6.3
    borderWidth: 1,
    overflow: 'hidden',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    ...Typography.body,
    fontWeight: '700',
    letterSpacing: 1,
  },
  discountBadgeContainer: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
  },
  wishlistButton: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  wishlistIcon: {
    fontSize: 16,
    lineHeight: 18,
  },
  detailsContainer: {
    padding: Spacing.sm + 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  starIcon: {
    fontSize: 12,
    color: '#FFB800',
    marginRight: 4,
  },
  ratingText: {
    ...Typography.supporting,
    fontWeight: '600',
  },
  reviewCountText: {
    ...Typography.supporting,
    marginLeft: 3,
  },
  productName: {
    ...Typography.productName,
    fontSize: 14,
    marginBottom: Spacing.xs + 2,
    minHeight: 36,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: 6,
  },
  priceText: {
    ...Typography.productPrice,
    fontSize: 16,
  },
  originalPriceText: {
    ...Typography.supporting,
    textDecorationLine: 'line-through',
  },
  lowStockText: {
    ...Typography.supporting,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
});
