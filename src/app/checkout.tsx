import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  BorderRadius,
  formatNaira,
  Palette,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useCartStore } from '@/store/cart-store';
import { useAuthStore } from '@/store/auth-store';
import { useOrderStore } from '@/store/order-store';
import { AppButton, AuthModal } from '@/components/ui';
import { PaymentMethod } from '@/types';

const PAYMENT_OPTIONS: {
  id: PaymentMethod;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    id: 'card',
    title: 'Paystack Card / USSD',
    subtitle: 'Visa, Mastercard, Verve, or instant USSD',
    icon: 'card-outline',
  },
  {
    id: 'transfer',
    title: 'Instant Bank Transfer',
    subtitle: 'Pay directly via Nigerian bank transfer',
    icon: 'business-outline',
  },
  {
    id: 'cod',
    title: 'Cash on Delivery (COD)',
    subtitle: 'Available for Lagos & Abuja deliveries',
    icon: 'cash-outline',
  },
];

export default function CheckoutScreen() {
  const router = useRouter();
  const theme = useTheme();

  const items = useCartStore((state) => state.items);
  const selectedAddress = useCartStore((state) => state.selectedAddress);
  const appliedPromo = useCartStore((state) => state.appliedPromo);
  const summary = useCartStore((state) => state.getSummary());
  const clearCart = useCartStore((state) => state.clearCart);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const addresses = useAuthStore((state) => state.addresses);
  const placeOrder = useOrderStore((state) => state.placeOrder);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [authModalVisible, setAuthModalVisible] = useState(false);

  const activeAddress =
    selectedAddress ?? addresses.find((a) => a.isDefault) ?? addresses[0];

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      Alert.alert('Cart Empty', 'Add items to your cart before placing an order.');
      return;
    }

    if (!isAuthenticated) {
      setAuthModalVisible(true);
      return;
    }

    if (!activeAddress) {
      Alert.alert('Address Required', 'Please add a delivery address first.');
      router.push('/addresses');
      return;
    }

    const createdOrder = placeOrder({
      items,
      deliveryAddress: activeAddress,
      paymentMethod,
      subtotal: summary.subtotal,
      discount: summary.discount,
      deliveryFee: summary.deliveryFee ?? 0,
      total: summary.total,
      promoCode: appliedPromo ?? undefined,
    });

    clearCart();
    router.replace(`/order/${createdOrder.id}`);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.background === Palette.white ? 'dark-content' : 'light-content'}
        backgroundColor={theme.background}
      />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.headerBack}
        >
          <Ionicons name="arrow-back" size={22} color={theme.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Checkout</Text>
        <View style={styles.headerBack} />
      </View>

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Delivery Address */}
        <View
          style={[
            styles.card,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              1. Delivery Address
            </Text>
            <Pressable onPress={() => router.push('/addresses')}>
              <Text style={styles.changeLink}>Change</Text>
            </Pressable>
          </View>

          {activeAddress ? (
            <View style={styles.addressBody}>
              <Text style={[styles.addressName, { color: theme.text }]}>
                {activeAddress.fullName} • {activeAddress.phoneNumber}
              </Text>
              <Text style={[styles.addressLine, { color: theme.textSecondary }]}>
                {activeAddress.streetAddress}, {activeAddress.cityOrLGA},{' '}
                {activeAddress.state}
              </Text>
              {activeAddress.landmark && (
                <Text style={[styles.landmark, { color: theme.textSecondary }]}>
                  Landmark: {activeAddress.landmark}
                </Text>
              )}
            </View>
          ) : (
            <AppButton
              title="Add Delivery Address"
              variant="secondary"
              size="compact"
              onPress={() => router.push('/addresses')}
            />
          )}
        </View>

        {/* 2. Payment Method */}
        <View
          style={[
            styles.card,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            2. Payment Method
          </Text>

          <View style={styles.paymentList}>
            {PAYMENT_OPTIONS.map((option) => {
              const selected = paymentMethod === option.id;
              return (
                <Pressable
                  key={option.id}
                  onPress={() => setPaymentMethod(option.id)}
                  style={[
                    styles.paymentOption,
                    {
                      backgroundColor: selected
                        ? theme.warningBg
                        : theme.backgroundSecondary,
                      borderColor: selected ? Palette.actionOrange : theme.border,
                      borderWidth: selected ? 1.5 : 1,
                    },
                  ]}
                >
                  <Ionicons
                    name={option.icon}
                    size={22}
                    color={selected ? Palette.actionOrange : theme.textSecondary}
                  />
                  <View style={styles.paymentText}>
                    <Text style={[styles.paymentTitle, { color: theme.text }]}>
                      {option.title}
                    </Text>
                    <Text style={[styles.paymentSub, { color: theme.textSecondary }]}>
                      {option.subtitle}
                    </Text>
                  </View>
                  <Ionicons
                    name={selected ? 'radio-button-on' : 'radio-button-off'}
                    size={20}
                    color={selected ? Palette.actionOrange : theme.textSecondary}
                  />
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* 3. Order Summary */}
        <View
          style={[
            styles.card,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            3. Order Summary
          </Text>

          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              Items ({items.length})
            </Text>
            <Text style={[styles.summaryVal, { color: theme.text }]}>
              {formatNaira(summary.subtotal)}
            </Text>
          </View>

          {summary.discount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.success }]}>
                Promo Discount {appliedPromo ? `(${appliedPromo})` : ''}
              </Text>
              <Text style={[styles.summaryVal, { color: theme.success }]}>
                -{formatNaira(summary.discount)}
              </Text>
            </View>
          )}

          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              Delivery Fee ({activeAddress?.state ?? 'Standard'})
            </Text>
            <Text style={[styles.summaryVal, { color: theme.text }]}>
              {summary.deliveryFee !== undefined
                ? formatNaira(summary.deliveryFee)
                : 'TBD'}
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.summaryRow}>
            <Text style={[styles.totalLabel, { color: theme.text }]}>
              Payable Total
            </Text>
            <Text style={styles.totalAmount}>{formatNaira(summary.total)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Footer */}
      <View
        style={[
          styles.footer,
          { backgroundColor: theme.surface, borderTopColor: theme.border },
        ]}
      >
        <AppButton
          title={`Place Order • ${formatNaira(summary.total)}`}
          variant="primary"
          size="standard"
          onPress={handlePlaceOrder}
        />
      </View>

      <AuthModal
        visible={authModalVisible}
        title="Sign In to Complete Order"
        description="Per Shoply rules, completing checkout and order tracking requires an account. Your cart is preserved."
        onClose={() => setAuthModalVisible(false)}
        onConfirm={() => {
          setAuthModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  flex: { flex: 1 },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
  },
  headerBack: { width: 40 },
  headerTitle: { ...Typography.sectionHeading },
  scrollContent: {
    padding: Spacing.lg,
    gap: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  card: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    ...Typography.productName,
  },
  changeLink: {
    ...Typography.supporting,
    color: Palette.actionOrange,
    fontWeight: '600',
  },
  addressBody: {
    gap: 2,
  },
  addressName: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  addressLine: {
    ...Typography.bodySmall,
  },
  landmark: {
    ...Typography.supporting,
  },
  paymentList: {
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.md,
  },
  paymentText: {
    flex: 1,
  },
  paymentTitle: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  paymentSub: {
    ...Typography.supporting,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    ...Typography.bodySmall,
  },
  summaryVal: {
    ...Typography.bodySmall,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginVertical: Spacing.xs,
  },
  totalLabel: {
    ...Typography.productName,
  },
  totalAmount: {
    ...Typography.productPrice,
    color: Palette.actionOrange,
  },
  footer: {
    padding: Spacing.lg,
    borderTopWidth: 1,
  },
});

