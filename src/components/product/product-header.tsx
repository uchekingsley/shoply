import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Palette, Typography, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export interface ProductHeaderProps {
  title?: string;
  isWishlisted: boolean;
  onBack: () => void;
  onShare: () => void;
  onWishlist: () => void;
}

export function ProductHeader({
  title = 'Details',
  isWishlisted,
  onBack,
  onShare,
  onWishlist,
}: ProductHeaderProps) {
  const theme = useTheme();

  return (
    <View style={[styles.header, { borderBottomColor: theme.border }]}>
      <Pressable
        onPress={onBack}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        style={styles.headerButton}
        accessibilityLabel="Back"
      >
        <Ionicons name="arrow-back" size={24} color={theme.text} />
      </Pressable>

      <Text numberOfLines={1} style={[styles.headerTitle, { color: theme.text }]}>
        {title}
      </Text>

      <View style={styles.headerActions}>
        <Pressable
          onPress={onShare}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.headerButton}
          accessibilityLabel="Share Product"
        >
          <Ionicons name="share-social-outline" size={22} color={theme.text} />
        </Pressable>

        <Pressable
          onPress={onWishlist}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.headerButton}
          accessibilityLabel="Wishlist"
        >
          <Ionicons
            name={isWishlisted ? 'heart' : 'heart-outline'}
            size={22}
            color={isWishlisted ? Palette.actionOrange : theme.text}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
  },
  headerButton: {
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
  headerTitle: {
    ...Typography.body,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  actionIcon: {
    fontSize: 20,
  },
});
