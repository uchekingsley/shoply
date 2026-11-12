import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Palette, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { CustomerReview } from '@/types';

export interface ProductReviewsSectionProps {
  reviews: CustomerReview[];
  onLayout?: (e: any) => void;
}

export function ProductReviewsSection({
  reviews,
  onLayout,
}: ProductReviewsSectionProps) {
  const theme = useTheme();

  return (
    <View
      onLayout={onLayout}
      style={[styles.container, { borderColor: theme.border }]}
    >
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: theme.text }]}>Customer Reviews</Text>
        <View style={styles.verifiedTag}>
          <Text style={styles.verifiedTagText}>✓ VERIFIED BUYERS</Text>
        </View>
      </View>

      {reviews.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            No customer reviews yet. Be the first verified buyer to rate this product!
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {reviews.map((rev) => (
            <View
              key={rev.id}
              style={[
                styles.item,
                {
                  backgroundColor: theme.backgroundSecondary,
                  borderColor: theme.border,
                },
              ]}
            >
              <View style={styles.topRow}>
                <View style={styles.starsWrapper}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Text
                      key={star}
                      style={[
                        styles.star,
                        {
                          color:
                            star <= rev.rating
                              ? '#FFB800'
                              : Palette.borderGreyLight,
                        },
                      ]}
                    >
                      ★
                    </Text>
                  ))}
                </View>
                <Text style={[styles.date, { color: theme.textSecondary }]}>
                  {rev.createdAt}
                </Text>
              </View>

              <Text style={[styles.author, { color: theme.text }]}>
                {rev.userName}{' '}
                <Text style={{ color: theme.success, fontSize: 11 }}>
                  • Verified Purchase
                </Text>
              </Text>

              <Text style={[styles.comment, { color: theme.textSecondary }]}>
                {rev.comment}
              </Text>
            </View>
          ))}
        </View>
      )}
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
  verifiedTag: {
    backgroundColor: Palette.navyBgLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  verifiedTagText: {
    color: Palette.brandNavy,
    fontSize: 10,
    fontWeight: '700',
  },
  emptyContainer: {
    paddingVertical: Spacing.md,
  },
  emptyText: {
    ...Typography.bodySmall,
    lineHeight: 20,
  },
  list: {
    gap: Spacing.md,
  },
  item: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  starsWrapper: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 13,
  },
  date: {
    ...Typography.supporting,
    fontSize: 11,
  },
  author: {
    ...Typography.bodySmall,
    fontWeight: '700',
    marginBottom: 4,
  },
  comment: {
    ...Typography.bodySmall,
    lineHeight: 20,
  },
});
