import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Palette, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useWishlistStore } from '@/store/wishlist-store';
import { useCartStore } from '@/store/cart-store';
import { AppButton, AuthModal } from '@/components/ui';

export default function ProfileScreen() {
  const router = useRouter();
  const theme = useTheme();

  const [authModalVisible, setAuthModalVisible] = useState(false);
  const wishlistCount = useWishlistStore((state) => state.wishlist.length);
  const cartUnits = useCartStore((state) => state.getTotalUnits());

  const menuSections = [
    {
      title: 'Shopping',
      items: [
        {
          id: 'orders',
          label: 'My Orders',
          icon: 'receipt-outline' as const,
          badge: null,
          action: () => setAuthModalVisible(true),
        },
        {
          id: 'wishlist',
          label: 'Saved Items',
          icon: 'heart-outline' as const,
          badge: wishlistCount > 0 ? `${wishlistCount}` : null,
          action: () => router.push('/wishlist'),
        },
        {
          id: 'cart',
          label: 'Shopping Cart',
          icon: 'cart-outline' as const,
          badge: cartUnits > 0 ? `${cartUnits}` : null,
          action: () => router.push('/cart'),
        },
      ],
    },
    {
      title: 'Preferences & Support',
      items: [
        {
          id: 'delivery',
          label: 'Delivery Addresses',
          icon: 'location-outline' as const,
          badge: '1 Saved',
          action: () => setAuthModalVisible(true),
        },
        {
          id: 'currency',
          label: 'Market & Currency',
          icon: 'cash-outline' as const,
          badge: 'Nigeria (₦ NGN)',
          action: () => {},
        },
        {
          id: 'help',
          label: 'Help & Customer Support',
          icon: 'help-circle-outline' as const,
          badge: null,
          action: () => {},
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.background === Palette.white ? 'dark-content' : 'light-content'}
        backgroundColor={theme.background}
      />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>My Account</Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Guest Banner */}
        <View
          style={[
            styles.guestCard,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={32} color={Palette.actionOrange} />
          </View>
          <View style={styles.guestInfo}>
            <Text style={[styles.guestTitle, { color: theme.text }]}>Welcome, Guest</Text>
            <Text style={[styles.guestSubtitle, { color: theme.textSecondary }]}>
              Sign in to sync your cart across devices and view your orders.
            </Text>
          </View>
          <AppButton
            title="Sign In / Register"
            variant="primary"
            size="compact"
            onPress={() => setAuthModalVisible(true)}
          />
        </View>

        {/* Menu Sections */}
        {menuSections.map((sec) => (
          <View key={sec.title} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
              {sec.title}
            </Text>
            <View
              style={[
                styles.menuCard,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}
            >
              {sec.items.map((item, idx) => (
                <Pressable
                  key={item.id}
                  onPress={item.action}
                  style={({ pressed }) => [
                    styles.menuRow,
                    idx < sec.items.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.border },
                    pressed && { opacity: 0.7 },
                  ]}
                >
                  <View style={styles.menuLeft}>
                    <Ionicons name={item.icon} size={22} color={Palette.actionOrange} />
                    <Text style={[styles.menuLabel, { color: theme.text }]}>
                      {item.label}
                    </Text>
                  </View>
                  <View style={styles.menuRight}>
                    {item.badge && (
                      <Text style={[styles.badgeText, { color: theme.textSecondary }]}>
                        {item.badge}
                      </Text>
                    )}
                    <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        <Text style={[styles.footerVersion, { color: theme.textSecondary }]}>
          Shoply Single-Vendor Store • v1.0.0
        </Text>
      </ScrollView>

      <AuthModal
        visible={authModalVisible}
        title="Sign In to Shoply"
        description="Access your saved orders, synced cart, and account profile."
        onClose={() => setAuthModalVisible(false)}
        onConfirm={() => setAuthModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    borderBottomWidth: 1,
  },
  headerTitle: {
    ...Typography.sectionHeading,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
    gap: Spacing.lg,
    paddingBottom: Spacing.xxxl * 2,
  },
  guestCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF0EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestInfo: {
    alignItems: 'center',
    gap: 4,
  },
  guestTitle: {
    ...Typography.productName,
  },
  guestSubtitle: {
    ...Typography.supporting,
    textAlign: 'center',
    maxWidth: 240,
  },
  section: {
    gap: Spacing.xs,
  },
  sectionTitle: {
    ...Typography.supporting,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  menuCard: {
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  menuLabel: {
    ...Typography.bodySmall,
    fontWeight: '500',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  badgeText: {
    ...Typography.supporting,
  },
  footerVersion: {
    ...Typography.supporting,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
