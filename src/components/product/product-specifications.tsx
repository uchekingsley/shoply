import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export interface ProductSpecificationsProps {
  description: string;
  specifications?: Record<string, string>;
}

export function ProductSpecifications({
  description,
  specifications,
}: ProductSpecificationsProps) {
  const theme = useTheme();
  const hasSpecs = specifications && Object.keys(specifications).length > 0;

  return (
    <>
      {/* Description Block */}
      <View style={[styles.container, { borderColor: theme.border }]}>
        <Text style={[styles.title, { color: theme.text }]}>Description</Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          {description}
        </Text>
      </View>

      {/* Specifications Block */}
      {hasSpecs && (
        <View style={[styles.container, { borderColor: theme.border }]}>
          <Text style={[styles.title, { color: theme.text }]}>Specifications</Text>
          <View style={styles.table}>
            {Object.entries(specifications).map(([key, value], idx) => (
              <View
                key={key}
                style={[
                  styles.tableRow,
                  {
                    backgroundColor:
                      idx % 2 === 0 ? theme.backgroundSecondary : 'transparent',
                  },
                ]}
              >
                <Text style={[styles.key, { color: theme.textSecondary }]}>
                  {key}
                </Text>
                <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </>
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
  description: {
    ...Typography.body,
    lineHeight: 22,
  },
  table: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  key: {
    width: '42%',
    ...Typography.supporting,
    fontWeight: '600',
  },
  value: {
    width: '58%',
    ...Typography.bodySmall,
  },
});
