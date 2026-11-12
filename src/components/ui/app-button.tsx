import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  Palette,
  ButtonDimensions,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'destructive';
export type ButtonSize = 'standard' | 'compact';

export interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function AppButton({
  title,
  onPress,
  variant = 'primary',
  size = 'standard',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
}: AppButtonProps) {
  const theme = useTheme();
  const isCompact = size === 'compact';

  const getContainerStyle = (pressed: boolean): ViewStyle => {
    const height = isCompact
      ? ButtonDimensions.compactHeight
      : ButtonDimensions.standardHeight;
    const paddingHorizontal = isCompact
      ? ButtonDimensions.compactHorizontalPadding
      : ButtonDimensions.horizontalPadding;

    const base: ViewStyle = {
      height,
      paddingHorizontal,
      borderRadius: ButtonDimensions.borderRadius,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: fullWidth ? 'stretch' : 'flex-start',
      opacity: disabled ? 0.45 : pressed ? 0.88 : 1,
    };

    switch (variant) {
      case 'primary':
        return {
          ...base,
          backgroundColor: pressed ? theme.primaryPressed : theme.primary,
        };
      case 'secondary':
        return {
          ...base,
          backgroundColor: theme.surface,
          borderWidth: 1.5,
          borderColor: theme.brand,
        };
      case 'text':
        return {
          ...base,
          backgroundColor: 'transparent',
          paddingHorizontal: isCompact ? 8 : 12,
        };
      case 'destructive':
        return {
          ...base,
          backgroundColor: theme.error,
        };
      default:
        return base;
    }
  };

  const getTextStyle = (): TextStyle => {
    const font = isCompact ? Typography.buttonCompact : Typography.button;

    switch (variant) {
      case 'primary':
      case 'destructive':
        return {
          ...font,
          color: Palette.white,
        };
      case 'secondary':
        return {
          ...font,
          color: theme.brand,
        };
      case 'text':
        return {
          ...font,
          color: theme.brand,
        };
      default:
        return {
          ...font,
          color: Palette.white,
        };
    }
  };

  const getSpinnerColor = (): string => {
    if (variant === 'secondary' || variant === 'text') {
      return theme.brand;
    }
    return Palette.white;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [getContainerStyle(pressed), style]}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getSpinnerColor()} />
      ) : (
        <View style={styles.contentRow}>
          {icon && iconPosition === 'left' && (
            <View style={styles.iconLeft}>{icon}</View>
          )}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <View style={styles.iconRight}>{icon}</View>
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: ButtonDimensions.iconSpacing,
  },
  iconRight: {
    marginLeft: ButtonDimensions.iconSpacing,
  },
});
