import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import {
  Palette,
  Typography,
  Spacing,
  BorderRadius,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Category } from '@/types';
import { INITIAL_CATEGORIES } from '@/data/mock-data';

export interface CategoryGridProps {
  onCategoryPress?: (category: Category) => void;
  selectedCategoryId?: string;
}

export function CategoryGrid({
  onCategoryPress,
  selectedCategoryId,
}: CategoryGridProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <FlatList
        data={INITIAL_CATEGORIES}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const isSelected = selectedCategoryId === item.id;
          return (
            <Pressable
              onPress={() => onCategoryPress?.(item)}
              style={styles.categoryItem}
              accessibilityRole="button"
              accessibilityLabel={`Category: ${item.name}`}
            >
              <View
                style={[
                  styles.imageCircle,
                  {
                    backgroundColor: theme.backgroundSecondary,
                    borderColor: isSelected
                      ? Palette.actionOrange
                      : theme.border,
                    borderWidth: isSelected ? 2 : 1,
                  },
                ]}
              >
                {item.image ? (
                  <ExpoImage
                    source={{ uri: item.image }}
                    style={styles.categoryImage}
                    contentFit="cover"
                  />
                ) : (
                  <Text style={styles.fallbackIcon}>📦</Text>
                )}
              </View>

              <Text
                numberOfLines={2}
                style={[
                  styles.categoryName,
                  {
                    color: isSelected ? Palette.actionOrange : theme.text,
                    fontWeight: isSelected ? '700' : '500',
                  },
                ]}
              >
                {item.name}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  categoryItem: {
    alignItems: 'center',
    width: 76,
  },
  imageCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  fallbackIcon: {
    fontSize: 24,
  },
  categoryName: {
    ...Typography.supporting,
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 14,
  },
});
