import React, { useState } from 'react';
import {
  Modal,
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
import { useCart } from '@/context/cart-context';
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
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    summary,
    selectedAddress,
    applyPromoCode,
    removePromoCode,
    appliedPromo,
  } = useCart();

  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.background === Palette.white ? 'dark-content' : 'light-content'}
        backgroundColor={theme.background}
      />

      {/* Screen Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Shopping Cart ({items.length})
        </Text>
        {items.length > 0 && (
          <Pressable onPress={clearCart} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={[styles.clearText, { color: theme.error }]}>Clear</Text>
          </Pressable>
        )}
      </View>

      {items.length === 0 ? (
        <CartEmptyState onStartShopping={() => router.push('/')} />
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Cart Items List */}
          <View style={styles.itemsSection}>
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onIncrease={(itemId, currentQty) => updateQuantity(itemId, currentQty + 1)}
                onDecrease={(itemId, currentQty) => updateQuantity(itemId, currentQty - 1)}
                onRemove={(itemId) => removeFromCart(itemId)}
              />
            ))}
          </View>

          {/* Delivery Location Banner */}
          {selectedAddress && (
            <View
              style={[
                styles.deliveryBanner,
                {
                  backgroundColor: theme.backgroundSecondary,
                  borderColor: theme.border,
                },
              ]}
            >
              <Text style={styles.deliveryBannerIcon}>📍</Text>
              <View style={styles.deliveryBannerText}>
                <Text style={[styles.deliveryBannerTitle, { color: theme.text }]}>
                  Delivery to {selectedAddress.cityOrLGA}, {selectedAddress.state}
                </Text>
                <Text style={[styles.deliveryBannerSub, { color: theme.textSecondary }]}>
                  {selectedAddress.streetAddress}
                </Text>
              </View>
            </View>
          )}

          {/* Promo Code Input Section */}
          <CartPromoCode
            appliedPromo={appliedPromo}
            onApplyPromo={applyPromoCode}
            onRemovePromo={removePromoCode}
          />

          {/* Order Summary */}
          <CartOrderSummary summary={summary} />

          {/* Checkout CTA */}
          <View style={styles.checkoutActionContainer}>
            <AppButton
              title="Proceed to Checkout"
              variant="primary"
              fullWidth
              onPress={() => setAuthModalVisible(true)}
            />
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      )}

      {/* Guest Authentication Modal on Checkout */}
      <AuthModal
        visible={authModalVisible}
        title="Sign In to Complete Checkout"
        description="Per Shoply requirements, guests can build and manage a cart freely, but completing payment and delivery requires an authenticated account. Your cart items will be preserved!"
        confirmLabel="Sign In with Phone / Email"
        cancelLabel="Back to Cart"
        onClose={() => setAuthModalVisible(false)}
        onConfirm={() => {
          setAuthModalVisible(false);
          setCheckoutSuccess(true);
        }}
      />

      {/* Demo Checkout Order Placed Feedback */}
      <Modal
        visible={checkoutSuccess}
        transparent
        animationType="slide"
        onRequestClose={() => setCheckoutSuccess(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.authModalCard, { backgroundColor: theme.surface }]}>
            <Text style={styles.authModalIcon}>🎉</Text>
            <Text style={[styles.authModalTitle, { color: theme.text }]}>
              Order Initiated!
            </Text>
            <Text style={[styles.authModalDesc, { color: theme.textSecondary }]}>
              Cart items validated with backend stock authority. Ready for payment via Card, Bank Transfer, or Cash on Delivery.
            </Text>
            <AppButton
              title="Return to Store"
              variant="primary"
              fullWidth
              onPress={() => {
                clearCart();
                setCheckoutSuccess(false);
                router.push('/');
              }}
              style={{ marginTop: Spacing.md }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
  },
  headerTitle: {
    ...Typography.sectionHeading,
    fontSize: 18,
  },
  clearText: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  itemsSection: {
    gap: Spacing.md,
  },
  deliveryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  deliveryBannerIcon: {
    fontSize: 20,
  },
  deliveryBannerText: {
    flex: 1,
  },
  deliveryBannerTitle: {
    ...Typography.bodySmall,
    fontWeight: '700',
  },
  deliveryBannerSub: {
    ...Typography.supporting,
  },
  checkoutActionContainer: {
    marginTop: Spacing.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  authModalCard: {
    width: '100%',
    maxWidth: 380,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  authModalIcon: {
    fontSize: 40,
    marginBottom: Spacing.sm,
  },
  authModalTitle: {
    ...Typography.sectionHeading,
    fontSize: 19,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  authModalDesc: {
    ...Typography.bodySmall,
    textAlign: 'center',
    marginBottom: Spacing.sm,
    lineHeight: 20,
  },
});
