import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Palette, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useCartStore } from '@/store/cart-store';
import { useAuthStore } from '@/store/auth-store';
import { AppButton, AuthModal } from '@/components/ui';
import {
  CartEmptyState,
  CartItemRow,
  CartPromoCode,
  CartOrderSummary,
} from '@/components/cart';

export default function CartScreen() {
  const theme = useTheme();
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const selectedAddress = useCartStore((state) => state.selectedAddress);
  const applyPromoCode = useCartStore((state) => state.applyPromoCode);
  const removePromoCode = useCartStore((state) => state.removePromoCode);
  const appliedPromo = useCartStore((state) => state.appliedPromo);
  const summary = useCartStore((state) => state.getSummary());
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [authModalVisible, setAuthModalVisible] = useState(false);

  const handleCheckoutPress = () => {
    if (!isAuthenticated) {
      setAuthModalVisible(true);
      return;
    }
    router.push('/checkout');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.background === Palette.white ? 'dark-content' : 'light-content'}
        backgroundColor={theme.background}
      />

      {/* Screen Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Shopping Cart</Text>
        {items.length > 0 && (
          <Pressable
            onPress={clearCart}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel="Clear cart"
          >
            <Text style={styles.clearText}>Clear</Text>
          </Pressable>
        )}
      </View>

      {items.length === 0 ? (
        <CartEmptyState onStartShopping={() => router.push('/')} />
      ) : (
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. Cart Items List */}
          <View style={styles.section}>
            <Text style={[styles.sectionHeading, { color: theme.textSecondary }]}>
              ITEMS ({items.length})
            </Text>
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onIncrease={(id, currentQty) => updateQuantity(id, currentQty + 1)}
                onDecrease={(id, currentQty) => updateQuantity(id, currentQty - 1)}
                onRemove={(id) => removeFromCart(id)}
              />
            ))}
          </View>

          {/* 2. Promo Code Input */}
          <CartPromoCode
            appliedPromo={appliedPromo}
            onApplyPromo={applyPromoCode}
            onRemovePromo={removePromoCode}
          />

          {/* 3. Delivery Address Preview */}
          <Pressable
            onPress={() => router.push('/addresses')}
            style={[
              styles.addressCard,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={styles.addressHeader}>
              <Text style={[styles.addressTitle, { color: theme.text }]}>
                Delivery Destination
              </Text>
              <Text style={styles.badge}>Change ›</Text>
            </View>
            <Text style={[styles.addressText, { color: theme.textSecondary }]}>
              {selectedAddress?.fullName} • {selectedAddress?.streetAddress},{' '}
              {selectedAddress?.cityOrLGA}, {selectedAddress?.state}
            </Text>
          </Pressable>

          {/* 4. Order Summary */}
          <CartOrderSummary summary={summary} />

          {/* 5. Checkout CTA (Requires Sign-In check as per PRD Rule 3) */}
          <View style={styles.checkoutContainer}>
            <AppButton
              title="Proceed to Checkout"
              variant="primary"
              size="standard"
              onPress={handleCheckoutPress}
            />
            <Text style={[styles.checkoutHint, { color: theme.textSecondary }]}>
              By proceeding, prices and stock will be revalidated
            </Text>
          </View>
        </ScrollView>
      )}

      {/* Guest checkout prompt modal */}
      <AuthModal
        visible={authModalVisible}
        title="Sign in to Checkout"
        description="Checkout, order tracking, and delivery preferences require a Shoply account."
        onClose={() => setAuthModalVisible(false)}
        onConfirm={() => {
          setAuthModalVisible(false);
          router.push('/checkout');
        }}
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
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    borderBottomWidth: 1,
  },
  headerTitle: {
    ...Typography.sectionHeading,
  },
  clearText: {
    ...Typography.supporting,
    color: Palette.errorRed,
    fontWeight: '600',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.lg,
    paddingBottom: Spacing.xxxl * 2,
  },
  section: {
    gap: Spacing.xs,
  },
  sectionHeading: {
    ...Typography.supporting,
    fontWeight: '600',
    letterSpacing: 0.8,
    marginBottom: Spacing.xs,
  },
  addressCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.xs,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addressTitle: {
    ...Typography.productName,
  },
  badge: {
    ...Typography.supporting,
    color: Palette.actionOrange,
    fontWeight: '600',
  },
  addressText: {
    ...Typography.bodySmall,
  },
  checkoutContainer: {
    marginTop: Spacing.sm,
    gap: Spacing.xs,
  },
  checkoutHint: {
    ...Typography.supporting,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  modalContent: {
    width: '100%',
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.md,
  },
  successIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successCheck: {
    fontSize: 28,
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  modalTitle: {
    ...Typography.screenTitle,
  },
  modalDesc: {
    ...Typography.bodySmall,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
});
