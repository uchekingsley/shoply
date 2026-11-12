import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { AppButton } from '@/components/ui';

export interface ProductPurchaseFooterProps {
  isAvailable: boolean;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

export function ProductPurchaseFooter({
  isAvailable,
  onAddToCart,
  onBuyNow,
}: ProductPurchaseFooterProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.footer,
        {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
        },
      ]}
    >
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <AppButton
            title="Add to Cart"
            variant="secondary"
            fullWidth
            onPress={onAddToCart}
            disabled={!isAvailable}
          />
        </View>
        <View style={{ flex: 1.2 }}>
          <AppButton
            title="Buy Now"
            variant="primary"
            fullWidth
            onPress={onBuyNow}
            disabled={!isAvailable}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 8,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
});
