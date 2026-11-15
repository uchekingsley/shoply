import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Palette, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useWishlistStore } from '@/store/wishlist-store';
import { useCartStore } from '@/store/cart-store';
import { useAuthStore } from '@/store/auth-store';
import { AppButton, AuthModal } from '@/components/ui';

export default function ProfileScreen() {
  const router = useRouter();
  const theme = useTheme();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const addresses = useAuthStore((state) => state.addresses);

  const [authModalVisible, setAuthModalVisible] = useState(false);
  const wishlistCount = useWishlistStore((state) => state.wishlist.length);
  const cartUnits = useCartStore((state) => state.getTotalUnits());

  const handleOrdersClick = () => {
    if (!isAuthenticated) {
      setAuthModalVisible(true);
    } else {
      Alert.alert(
        'Order History',
        'You have no active orders yet. Orders you place will show here with real-time delivery status.'
      );
    }
  };

  const handleAddressClick = () => {
    if (!isAuthenticated) {
      setAuthModalVisible(true);
    } else {
      Alert.alert(
        'Address Book',
        `You have ${addresses.length} saved addresses:\n\n` +
          addresses
            .map((a) => `• ${a.fullName} (${a.cityOrLGA}, ${a.state})${a.isDefault ? ' [DEFAULT]' : ''}`)
            .join('\n')
      );
    }
  };

  const menuSections = [
    {
      title: 'Shopping',
      items: [
        {
          id: 'orders',
          label: 'My Orders',
          icon: 'receipt-outline' as const,
          badge: isAuthenticated ? '0 Active' : 'Login needed',
          action: handleOrdersClick,
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
          badge: `${addresses.length} Saved`,
          action: handleAddressClick,
        },
        {
          id: 'currency',
          label: 'Market & Currency',
          icon: 'cash-outline' as const,
          badge: 'Nigeria (₦ NGN)',
          action: () => {
            Alert.alert('Market Currency', 'Shoply is configured for Nigeria with Nigerian Naira (₦).');
          },
        },
        {
          id: 'support',
          label: 'Customer Support',
          icon: 'chatbubbles-outline' as const,
          badge: '24/7 Care',
          action: () => {
            Alert.alert(
              'Customer Support',
              'For order queries or delivery assistance, reach our Lagos support team at support@shoply.ng'
            );
          },
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
        {/* User Card: Authenticated vs Guest */}
        {isAuthenticated && user ? (
          <View
            style={[
              styles.userCard,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <View style={styles.userHeader}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarInitials}>
                  {user.fullName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2) || 'SC'}
                </Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={[styles.userName, { color: theme.text }]}>{user.fullName}</Text>
                <Text style={[styles.userEmail, { color: theme.textSecondary }]}>
                  {user.phoneNumber || user.email}
                </Text>
                <View style={styles.badgePill}>
                  <Text style={styles.badgePillText}>Shoply Customer</Text>
                </View>
              </View>
            </View>

            <AppButton
              title="Sign Out"
              variant="destructive"
              size="compact"
              onPress={() => {
                Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Sign Out', style: 'destructive', onPress: logout },
                ]);
              }}
            />
          </View>
        ) : (
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
              <Text style={[styles.guestTitle, { color: theme.text }]}>Welcome to Shoply</Text>
              <Text style={[styles.guestSubtitle, { color: theme.textSecondary }]}>
                Sign in to sync your cart across devices, save wishlists, and track deliveries.
              </Text>
            </View>
            <AppButton
              title="Sign In / Register"
              variant="primary"
              size="compact"
              onPress={() => setAuthModalVisible(true)}
            />
          </View>
        )}

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
                    idx < sec.items.length - 1 && {
                      borderBottomWidth: 1,
                      borderBottomColor: theme.border,
                    },
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
          Shoply Single-Vendor Store • v1.0.0 (Nigeria)
        </Text>
      </ScrollView>

      <AuthModal
        visible={authModalVisible}
        title="Sign In to Shoply"
        onClose={() => setAuthModalVisible(false)}
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
    maxWidth: 260,
    lineHeight: 18,
  },
  userCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.md,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Palette.brandNavy,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    color: Palette.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
    gap: 2,
  },
  userName: {
    ...Typography.productName,
    fontSize: 17,
  },
  userEmail: {
    ...Typography.supporting,
  },
  badgePill: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF2EA',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    marginTop: 4,
  },
  badgePillText: {
    ...Typography.supporting,
    fontSize: 10,
    color: Palette.actionOrange,
    fontWeight: '700',
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
