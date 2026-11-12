import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Palette,
  Typography,
  Spacing,
  BorderRadius,
  formatNaira,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { CartSummary } from '@/types';

export interface CartOrderSummaryProps {
  summary: CartSummary;
}

export function CartOrderSummary({ summary }: CartOrderSummaryProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <Text style={[styles.title, { color: theme.text }]}>Order Summary</Text>

      <View style={styles.row}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>
          Items Subtotal
        </Text>
        <Text style={[styles.value, { color: theme.text }]}>
          {formatNaira(summary.subtotal)}
        </Text>
      </View>

      {summary.discount > 0 && (
        <View style={styles.row}>
          <Text style={[styles.label, { color: Palette.actionOrange }]}>
            Promotional Discount
          </Text>
          <Text style={[styles.value, { color: Palette.actionOrange }]}>
            −{formatNaira(summary.discount)}
          </Text>
        </View>
      )}

      <View style={styles.row}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>
          Delivery Fee
        </Text>
        <Text style={[styles.value, { color: theme.text }]}>
          {summary.deliveryFee !== undefined
            ? formatNaira(summary.deliveryFee)
            : 'Calculated at checkout'}
        </Text>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      <View style={styles.row}>
        <View>
          <Text style={[styles.totalLabel, { color: theme.text }]}>
            {summary.isEstimatedTotal ? 'Estimated Total' : 'Total'}
          </Text>
          <Text style={[styles.taxNote, { color: theme.textSecondary }]}>
            Includes all applicable VAT & fees
          </Text>
        </View>
        <Text style={[styles.totalAmount, { color: Palette.brandNavy }]}>
          {formatNaira(summary.total)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  title: {
    ...Typography.sectionHeading,
    fontSize: 16,
    marginBottom: Spacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    ...Typography.bodySmall,
  },
  value: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: Spacing.xs,
  },
  totalLabel: {
    ...Typography.sectionHeading,
    fontSize: 17,
  },
  taxNote: {
    ...Typography.supporting,
    fontSize: 11,
  },
  totalAmount: {
    ...Typography.productPrice,
    fontSize: 20,
  },
});
