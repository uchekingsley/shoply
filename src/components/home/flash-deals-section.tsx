import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Palette,
  Typography,
  Spacing,
  BorderRadius,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Product } from '@/types';
import { ProductCard } from '../ui/product-card';
import { SectionHeader } from './section-header';

export interface FlashDealsSectionProps {
  products: Product[];
  onProductPress: (product: Product) => void;
  onWishlistPress?: (product: Product) => void;
  onSeeAllPress?: () => void;
}

export function FlashDealsSection({
  products,
  onProductPress,
  onWishlistPress,
  onSeeAllPress,
}: FlashDealsSectionProps) {
  const theme = useTheme();

  // Mock countdown timer for flash deals
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatUnit = (num: number) => num.toString().padStart(2, '0');

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <SectionHeader
          title="⚡ Flash Deals"
          actionText="See All"
          onActionPress={onSeeAllPress}
          style={styles.sectionHeader}
        />

        <View style={styles.timerContainer}>
          <Text style={[styles.timerLabel, { color: theme.textSecondary }]}>
            Ends in:
          </Text>
          <View style={styles.timerBadge}>
            <Text style={styles.timerText}>
              {formatUnit(timeLeft.hours)}h : {formatUnit(timeLeft.minutes)}m : {formatUnit(timeLeft.seconds)}s
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ProductCard
              product={item}
              onPress={onProductPress}
              onWishlistPress={onWishlistPress}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  headerRow: {
    flexDirection: 'column',
  },
  sectionHeader: {
    marginBottom: Spacing.xs,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    gap: Spacing.xs,
  },
  timerLabel: {
    ...Typography.supporting,
    fontSize: 12,
  },
  timerBadge: {
    backgroundColor: Palette.orangeBgLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.xs,
  },
  timerText: {
    color: Palette.actionOrange,
    fontSize: 12,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  cardWrapper: {
    width: 170,
  },
});
