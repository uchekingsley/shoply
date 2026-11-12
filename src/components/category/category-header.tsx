import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Palette, Typography, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export interface CategoryHeaderProps {
  title: string;
  itemCount: number;
  description?: string;
  onBack: () => void;
  onSearchPress?: () => void;
}

export function CategoryHeader({
  title,
  itemCount,
  description,
  onBack,
  onSearchPress,
}: CategoryHeaderProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { borderBottomColor: theme.border }]}>
      <View style={styles.topRow}>
        <Pressable
          onPress={onBack}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.backButton}
          accessibilityLabel="Back"
        >
          <Text style={[styles.backIcon, { color: theme.text }]}>‹</Text>
        </Pressable>

        <View style={styles.titleColumn}>
          <Text numberOfLines={1} style={[styles.title, { color: theme.text }]}>
            {title}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {itemCount} {itemCount === 1 ? 'product' : 'products'}
          </Text>
        </View>

        {onSearchPress ? (
          <Pressable
            onPress={onSearchPress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.searchButton}
            accessibilityLabel="Search in category"
          >
            <Text style={styles.searchIcon}>🔍</Text>
          </Pressable>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>

      {description && (
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          {description}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
  topRow: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 30,
  },
  titleColumn: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...Typography.sectionHeading,
    fontSize: 17,
  },
  subtitle: {
    ...Typography.supporting,
    fontSize: 11,
  },
  searchButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    fontSize: 18,
  },
  placeholder: {
    width: 36,
  },
  description: {
    ...Typography.supporting,
    fontSize: 12,
    marginTop: 4,
    marginBottom: 4,
    textAlign: 'center',
  },
});
