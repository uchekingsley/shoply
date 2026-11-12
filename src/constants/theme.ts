import '@/global.css';
import { Platform } from 'react-native';

/**
 * Shoply Design System Tokens
 * Based on Shoply Colour and UI Design Guidelines & Main PRD v1.0
 */

export const Palette = {
  // Brand & Core
  brandNavy: '#142B4A',
  actionOrange: '#FF7A30',
  white: '#FFFFFF',
  lightGrey: '#F5F6F8',

  // Light Theme Neutrals
  primaryTextLight: '#202631',
  secondaryTextLight: '#737B87',
  borderGreyLight: '#E5E8ED',

  // Dark Theme Neutrals & Accents
  darkBackground: '#101820',
  darkSurface: '#182533',
  elevatedSurfaceDark: '#213244',
  primaryTextDark: '#FFFFFF',
  secondaryTextDark: '#AAB4C0',
  lightBrandAccent: '#8FAACB',
  borderDark: '#344454',

  // Status & Feedback
  successGreen: '#168653',
  successGreenDark: '#22A06B',
  successGreenBgLight: '#EAF7EE',
  successGreenBgDark: '#123824',

  errorRed: '#D93636',
  errorRedDark: '#E04F4F',
  errorRedBgLight: '#FDECEC',
  errorRedBgDark: '#3B1717',

  orangeBgLight: '#FFF2EA',
  orangeBgDark: '#3B2314',

  navyBgLight: '#EEF3F9',
  navyBgDark: '#1E2C3D',
} as const;

export const Colors = {
  light: {
    // Structural backgrounds
    background: Palette.white,
    backgroundSecondary: Palette.lightGrey,
    backgroundElement: Palette.lightGrey,
    backgroundSelected: Palette.borderGreyLight,
    surface: Palette.white,
    surfaceElevated: Palette.white,
    card: Palette.white,

    // Brand and Primary Actions
    brand: Palette.brandNavy,
    brandAccent: Palette.brandNavy,
    primary: Palette.actionOrange,
    primaryPressed: '#E56620',

    // Text & Content
    text: Palette.primaryTextLight,
    textSecondary: Palette.secondaryTextLight,
    textOnPrimary: Palette.white,
    textOnBrand: Palette.white,

    // Borders & Dividers
    border: Palette.borderGreyLight,
    borderFocused: Palette.brandNavy,

    // Status & Feedback
    success: Palette.successGreen,
    successBg: Palette.successGreenBgLight,
    error: Palette.errorRed,
    errorBg: Palette.errorRedBgLight,
    warning: Palette.actionOrange,
    warningBg: Palette.orangeBgLight,

    // Navigation & Tabs
    tabActive: Palette.actionOrange,
    tabInactive: Palette.brandNavy,
    headerBackground: Palette.white,
    headerTint: Palette.brandNavy,
  },
  dark: {
    // Structural backgrounds
    background: Palette.darkBackground,
    backgroundSecondary: Palette.darkSurface,
    backgroundElement: Palette.darkSurface,
    backgroundSelected: Palette.elevatedSurfaceDark,
    surface: Palette.darkSurface,
    surfaceElevated: Palette.elevatedSurfaceDark,
    card: Palette.darkSurface,

    // Brand and Primary Actions
    brand: Palette.lightBrandAccent,
    brandAccent: Palette.brandNavy,
    primary: Palette.actionOrange,
    primaryPressed: '#E56620',

    // Text & Content
    text: Palette.primaryTextDark,
    textSecondary: Palette.secondaryTextDark,
    textOnPrimary: Palette.white,
    textOnBrand: Palette.white,

    // Borders & Dividers
    border: Palette.borderDark,
    borderFocused: Palette.lightBrandAccent,

    // Status & Feedback
    success: Palette.successGreenDark,
    successBg: Palette.successGreenBgDark,
    error: Palette.errorRedDark,
    errorBg: Palette.errorRedBgDark,
    warning: Palette.actionOrange,
    warningBg: Palette.orangeBgDark,

    // Navigation & Tabs
    tabActive: Palette.actionOrange,
    tabInactive: Palette.secondaryTextDark,
    headerBackground: Palette.darkBackground,
    headerTint: Palette.primaryTextDark,
  },
} as const;

export type ThemeColors = typeof Colors.light;
export type ThemeColor = keyof typeof Colors.light;
export type ColorSchemeName = 'light' | 'dark';

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  // Numeric aliases for backward compatibility with template
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BorderRadius = {
  xs: 4,
  sm: 6,
  md: 10, // Inputs and standard buttons (PRD section 6.2 & 6.5)
  lg: 12, // Product cards (PRD section 6.3)
  xl: 16,
  full: 9999,
} as const;

export const Typography = {
  screenTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 30,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600' as const,
    lineHeight: 20,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  supporting: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 20,
  },
  buttonCompact: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 18,
  },
} as const;

export const ButtonDimensions = {
  standardHeight: 52,
  compactHeight: 40,
  borderRadius: 10,
  horizontalPadding: 20,
  compactHorizontalPadding: 14,
  iconSpacing: 8,
} as const;

export const InputDimensions = {
  height: 50,
  borderRadius: 10,
  paddingHorizontal: 16,
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: 'Inter, system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'Inter, Roboto, sans-serif',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

/**
 * Format numeric value in Nigerian Naira (₦)
 */
export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}
