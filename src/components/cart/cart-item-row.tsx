import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import {
  Palette,
  Typography,
  Spacing,
  BorderRadius,
  formatNaira,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { StatusBadge } from '@/components/ui';
import { CartItem } from '@/types';

export interface CartItemRowProps {
  item: CartItem;
  onIncrease: (itemId: string, currentQty: number) => void;
  onDecrease: (itemId: string, currentQty: number) => void;
  onRemove: (itemId: string) => void;
}

export function CartItemRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemRowProps) {
  const theme = useTheme();
  const primaryImg = item.product.images?.[0];
  const variationText = item.selectedVariation?.name ?? null;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.mainRow}>
        {/* Product Image */}
        <View
          style={[
            styles.imageWrapper,
            { backgroundColor: theme.backgroundSecondary },
          ]}
        >
          {primaryImg ? (
            <ExpoImage
              source={{ uri: primaryImg }}
              style={styles.image}
              contentFit="cover"
            />
          ) : (
            <Text style={styles.placeholderIcon}>📦</Text>
          )}
        </View>

        {/* Product Details */}
        <View style={styles.detailsColumn}>
          <View style={styles.titleRow}>
            <Text
              numberOfLines={2}
              style={[styles.title, { color: theme.text }]}
            >
              {item.product.name}
            </Text>
            <Pressable
              onPress={() => onRemove(item.id)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={styles.deleteBtn}
            >
              <Text style={[styles.deleteIcon, { color: theme.textSecondary }]}>
                ✕
              </Text>
            </Pressable>
          </View>

          {variationText && (
            <View style={styles.variationRow}>
              <StatusBadge label={variationText} variant="neutral" size="sm" />
            </View>
          )}

          <Text style={[styles.unitPrice, { color: Palette.brandNavy }]}>
            {formatNaira(item.unitPrice)}
          </Text>
        </View>
      </View>

      {/* Stepper Controls and Subtotal */}
      <View style={[styles.bottomRow, { borderTopColor: theme.border }]}>
        <View style={styles.stepperContainer}>
          <Pressable
            onPress={() => onDecrease(item.id, item.quantity)}
            style={[
              styles.stepperBtn,
              { backgroundColor: theme.backgroundSecondary },
            ]}
          >
            <Text style={[styles.stepperBtnText, { color: theme.text }]}>−</Text>
          </Pressable>
          <Text style={[styles.stepperQty, { color: theme.text }]}>
            {item.quantity}
          </Text>
          <Pressable
            onPress={() => onIncrease(item.id, item.quantity)}
            style={[
              styles.stepperBtn,
              { backgroundColor: theme.backgroundSecondary },
            ]}
          >
            <Text style={[styles.stepperBtnText, { color: theme.text }]}>+</Text>
          </Pressable>
        </View>

        <View style={styles.subtotalBlock}>
          <Text style={[styles.subtotalLabel, { color: theme.textSecondary }]}>
            Subtotal:
          </Text>
          <Text style={[styles.subtotalValue, { color: theme.text }]}>
            {formatNaira(item.subtotal)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.md,
  },
  mainRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderIcon: {
    fontSize: 28,
  },
  detailsColumn: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    ...Typography.productName,
    fontSize: 14,
    flex: 1,
    marginRight: Spacing.xs,
  },
  deleteBtn: {
    padding: 2,
  },
  deleteIcon: {
    fontSize: 14,
    fontWeight: '700',
  },
  variationRow: {
    marginVertical: 4,
  },
  unitPrice: {
    ...Typography.productPrice,
    fontSize: 15,
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  stepperBtn: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperBtnText: {
    fontSize: 18,
    fontWeight: '700',
  },
  stepperQty: {
    ...Typography.body,
    fontWeight: '700',
    minWidth: 20,
    textAlign: 'center',
  },
  subtotalBlock: {
    alignItems: 'flex-end',
  },
  subtotalLabel: {
    ...Typography.supporting,
    fontSize: 11,
  },
  subtotalValue: {
    ...Typography.productPrice,
    fontSize: 15,
  },
});
