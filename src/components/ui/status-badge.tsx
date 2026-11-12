import React from 'react';
import { StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { Palette, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type BadgeVariant =
  | 'success'
  | 'error'
  | 'warning'
  | 'brand'
  | 'neutral';

export interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: 'sm' | 'md';
}

export function StatusBadge({
  label,
  variant = 'neutral',
  icon,
  style,
  textStyle,
  size = 'sm',
}: StatusBadgeProps) {
  const theme = useTheme();
  const isSmall = size === 'sm';

  const getColors = () => {
    switch (variant) {
      case 'success':
        return {
          bg: theme.successBg,
          text: theme.success,
        };
      case 'error':
        return {
          bg: theme.errorBg,
          text: theme.error,
        };
      case 'warning':
        return {
          bg: theme.warningBg,
          text: theme.warning,
        };
      case 'brand':
        return {
          bg: Palette.navyBgLight,
          text: Palette.brandNavy,
        };
      case 'neutral':
      default:
        return {
          bg: theme.backgroundSecondary,
          text: theme.textSecondary,
        };
    }
  };

  const colors = getColors();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.bg,
          paddingVertical: isSmall ? 2 : 4,
          paddingHorizontal: isSmall ? 6 : 10,
        },
        style,
      ]}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text
        style={[
          isSmall ? styles.textSmall : styles.textMedium,
          { color: colors.text },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: BorderRadius.xs,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 4,
  },
  textSmall: {
    ...Typography.supporting,
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 14,
  },
  textMedium: {
    ...Typography.supporting,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
});
