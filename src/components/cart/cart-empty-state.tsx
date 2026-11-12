import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Typography, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { AppButton } from '@/components/ui';

export interface CartEmptyStateProps {
  onStartShopping: () => void;
}

export function CartEmptyState({ onStartShopping }: CartEmptyStateProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🛒</Text>
      <Text style={[styles.title, { color: theme.text }]}>Your cart is empty</Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        Looks like you haven't added anything to your cart yet. Discover flash deals and best sellers across Nigeria!
      </Text>
      <AppButton
        title="Start Shopping"
        variant="primary"
        onPress={onStartShopping}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  icon: {
    fontSize: 64,
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.sectionHeading,
    fontSize: 22,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 22,
  },
  button: {
    minWidth: 180,
  },
});
