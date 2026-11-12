import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Palette, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export interface ProductDeliveryInfoProps {
  estimatedDays?: string;
  feeNote?: string;
}

export function ProductDeliveryInfo({
  estimatedDays = '1 - 3 business days',
  feeNote = 'Delivery fee calculated after address selection.',
}: ProductDeliveryInfoProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { borderColor: theme.border }]}>
      <Text style={[styles.title, { color: theme.text }]}>Delivery & Shipping</Text>
      <View style={[styles.card, { backgroundColor: theme.backgroundSecondary }]}>
        <Text style={styles.icon}>🚚</Text>
        <View style={styles.textColumn}>
          <Text style={[styles.estimateTitle, { color: theme.text }]}>
            {estimatedDays}
          </Text>
          <Text style={[styles.note, { color: theme.textSecondary }]}>
            {feeNote}
          </Text>
          <Text style={[styles.nationwideNote, { color: Palette.brandNavy }]}>
            • Nationwide delivery across all 36 Nigerian States & FCT
          </Text>
        </View>
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
  card: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.md,
    alignItems: 'flex-start',
  },
  icon: {
    fontSize: 24,
  },
  textColumn: {
    flex: 1,
  },
  estimateTitle: {
    ...Typography.bodySmall,
    fontWeight: '700',
    marginBottom: 2,
  },
  note: {
    ...Typography.supporting,
    lineHeight: 18,
  },
  nationwideNote: {
    ...Typography.supporting,
    fontWeight: '600',
    marginTop: 4,
  },
});
