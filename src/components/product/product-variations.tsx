import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Palette, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ProductVariation } from '@/types';

export interface ProductVariationsProps {
  variations: ProductVariation[];
  selectedVariation: ProductVariation | null;
  onSelectVariation: (variation: ProductVariation) => void;
}

export function ProductVariations({
  variations,
  selectedVariation,
  onSelectVariation,
}: ProductVariationsProps) {
  const theme = useTheme();

  if (!variations || variations.length === 0) return null;

  return (
    <View style={[styles.container, { borderColor: theme.border }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: theme.text }]}>Choose Options</Text>
        {selectedVariation && (
          <Text style={[styles.selectedLabel, { color: Palette.brandNavy }]}>
            {selectedVariation.name}
          </Text>
        )}
      </View>

      <View style={styles.chipsContainer}>
        {variations.map((v) => {
          const isSelected = selectedVariation?.id === v.id;
          return (
            <Pressable
              key={v.id}
              onPress={() => onSelectVariation(v)}
              disabled={!v.isAvailable}
              style={[
                styles.chip,
                {
                  backgroundColor: isSelected
                    ? Palette.orangeBgLight
                    : theme.backgroundSecondary,
                  borderColor: isSelected
                    ? Palette.actionOrange
                    : theme.border,
                  opacity: v.isAvailable ? 1 : 0.45,
                },
              ]}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected, disabled: !v.isAvailable }}
            >
              <Text
                style={[
                  styles.chipText,
                  {
                    color: isSelected ? Palette.actionOrange : theme.text,
                    fontWeight: isSelected ? '700' : '500',
                  },
                ]}
              >
                {v.name}
              </Text>
              {!v.isAvailable && (
                <Text style={styles.soldOutText}>Out of Stock</Text>
              )}
            </Pressable>
          );
        })}
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  title: {
    ...Typography.sectionHeading,
    fontSize: 16,
  },
  selectedLabel: {
    ...Typography.bodySmall,
    fontWeight: '700',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
  },
  chipText: {
    ...Typography.bodySmall,
  },
  soldOutText: {
    fontSize: 10,
    color: Palette.errorRed,
    marginTop: 2,
  },
});
