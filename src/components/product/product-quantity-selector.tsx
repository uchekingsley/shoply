import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export interface ProductQuantitySelectorProps {
  quantity: number;
  maxStock: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export function ProductQuantitySelector({
  quantity,
  maxStock,
  onIncrease,
  onDecrease,
}: ProductQuantitySelectorProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { borderColor: theme.border }]}>
      <Text style={[styles.title, { color: theme.text }]}>Quantity</Text>
      <View style={styles.row}>
        <View style={styles.stepperWrapper}>
          <Pressable
            onPress={onDecrease}
            disabled={quantity <= 1}
            style={[
              styles.stepperBtn,
              {
                backgroundColor: theme.backgroundSecondary,
                opacity: quantity <= 1 ? 0.4 : 1,
              },
            ]}
          >
            <Text style={[styles.stepperBtnText, { color: theme.text }]}>−</Text>
          </Pressable>

          <Text style={[styles.stepperValue, { color: theme.text }]}>
            {quantity}
          </Text>

          <Pressable
            onPress={onIncrease}
            disabled={quantity >= maxStock}
            style={[
              styles.stepperBtn,
              {
                backgroundColor: theme.backgroundSecondary,
                opacity: quantity >= maxStock ? 0.4 : 1,
              },
            ]}
          >
            <Text style={[styles.stepperBtnText, { color: theme.text }]}>+</Text>
          </Pressable>
        </View>

        <Text style={[styles.maxNote, { color: theme.textSecondary }]}>
          {quantity >= maxStock
            ? `Max stock reached (${maxStock})`
            : `Up to ${maxStock} units available`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  title: {
    ...Typography.sectionHeading,
    fontSize: 16,
    marginBottom: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  stepperWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  stepperBtn: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperBtnText: {
    fontSize: 20,
    fontWeight: '700',
  },
  stepperValue: {
    ...Typography.body,
    fontWeight: '700',
    minWidth: 24,
    textAlign: 'center',
  },
  maxNote: {
    ...Typography.supporting,
  },
});
