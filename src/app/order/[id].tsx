import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  BorderRadius,
  formatNaira,
  Palette,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useOrderStore } from '@/store/order-store';
import { AppButton, StatusBadge } from '@/components/ui';

const TIMELINE_STEPS = [
  { step: 1, label: 'Order Confirmed', desc: 'Your order has been received by Shoply' },
  { step: 2, label: 'Packed at Lagos Hub', desc: 'Items inspected and sealed for dispatch' },
  { step: 3, label: 'Out for Delivery', desc: 'With courier en route to your address' },
  { step: 4, label: 'Delivered', desc: 'Package handed over to recipient' },
];

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const getOrderById = useOrderStore((state) => state.getOrderById);
  const order = id ? getOrderById(id) : undefined;

  if (!order) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <View style={styles.notFoundContainer}>
          <Text style={[styles.notFoundTitle, { color: theme.text }]}>Order Not Found</Text>
          <AppButton title="Back to Orders" variant="primary" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

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
        <Text style={[styles.headerTitle, { color: theme.text }]}>{order.id}</Text>
        <View style={styles.headerBack} />
      </View>

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Banner */}
        <View
          style={[
            styles.card,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <View style={styles.statusHeader}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>Delivery Timeline</Text>
            <StatusBadge
              label={order.status}
              variant={order.status === 'Delivered' ? 'success' : 'warning'}
              size="sm"
            />
          </View>

          <View style={styles.timeline}>
            {TIMELINE_STEPS.map((item, idx) => {
              const isCompleted = item.step <= order.timelineStep;
              const isLast = idx === TIMELINE_STEPS.length - 1;
              return (
                <View key={item.step} style={styles.timelineRow}>
                  <View style={styles.timelineTrack}>
                    <View
                      style={[
                        styles.stepCircle,
                        {
                          backgroundColor: isCompleted
                            ? Palette.actionOrange
                            : theme.backgroundSecondary,
                          borderColor: isCompleted ? Palette.actionOrange : theme.border,
                        },
                      ]}
                    >
                      {isCompleted ? (
                        <Ionicons name="checkmark" size={14} color={Palette.white} />
                      ) : (
                        <Text style={[styles.stepNum, { color: theme.textSecondary }]}>
                          {item.step}
                        </Text>
                      )}
                    </View>
                    {!isLast && (
                      <View
                        style={[
                          styles.stepLine,
                          {
                            backgroundColor:
                              item.step < order.timelineStep
                                ? Palette.actionOrange
                                : theme.border,
                          },
                        ]}
                      />
                    )}
                  </View>

                  <View style={styles.timelineInfo}>
                    <Text
                      style={[
                        styles.stepLabel,
                        {
                          color: isCompleted ? theme.text : theme.textSecondary,
                          fontWeight: isCompleted ? '700' : '500',
                        },
                      ]}
                    >
                      {item.label}
                    </Text>
                    <Text style={[styles.stepDesc, { color: theme.textSecondary }]}>
                      {item.desc}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Delivery Address */}
        <View
          style={[
            styles.card,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            Delivery Destination
          </Text>
          <Text style={[styles.addressName, { color: theme.text }]}>
            {order.deliveryAddress.fullName} • {order.deliveryAddress.phoneNumber}
          </Text>
          <Text style={[styles.addressLine, { color: theme.textSecondary }]}>
            {order.deliveryAddress.streetAddress}, {order.deliveryAddress.cityOrLGA},{' '}
            {order.deliveryAddress.state}
          </Text>
        </View>

        {/* Itemized Receipt */}
        <View
          style={[
            styles.card,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.text }]}>Order Receipt</Text>

          <View style={styles.itemsList}>
            {order.items.map((item, i) => (
              <View key={`${item.productId}_${i}`} style={styles.receiptItemRow}>
                <View style={styles.receiptItemInfo}>
                  <Text style={[styles.receiptItemName, { color: theme.text }]}>
                    {item.quantity}x {item.productName}
                  </Text>
                  {item.variationName && (
                    <Text style={[styles.receiptVariant, { color: theme.textSecondary }]}>
                      {item.variationName}
                    </Text>
                  )}
                </View>
                <Text style={[styles.receiptItemPrice, { color: theme.text }]}>
                  {formatNaira(item.subtotal)}
                </Text>
              </View>
            ))}
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.summaryRows}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
                Subtotal
              </Text>
              <Text style={[styles.summaryVal, { color: theme.text }]}>
                {formatNaira(order.subtotal)}
              </Text>
            </View>
            {order.discount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: Palette.successGreen }]}>
                  Discount {order.promoCode ? `(${order.promoCode})` : ''}
                </Text>
                <Text style={[styles.summaryVal, { color: Palette.successGreen }]}>
                  -{formatNaira(order.discount)}
                </Text>
              </View>
            )}
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
                Delivery Fee
              </Text>
              <Text style={[styles.summaryVal, { color: theme.text }]}>
                {formatNaira(order.deliveryFee)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
                Payment Method
              </Text>
              <Text style={[styles.summaryVal, { color: theme.text }]}>
                {order.paymentLabel}
              </Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.summaryRow}>
            <Text style={[styles.totalLabel, { color: theme.text }]}>Total Paid</Text>
            <Text style={styles.totalAmount}>{formatNaira(order.total)}</Text>
          </View>
        </View>
      </ScrollView>
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
    paddingBottom: Spacing.xxxl * 2,
  },
  card: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.md,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    ...Typography.productName,
  },
  timeline: {
    gap: 0,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  timelineTrack: {
    alignItems: 'center',
    width: 24,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNum: {
    fontSize: 11,
    fontWeight: '600',
  },
  stepLine: {
    width: 2,
    height: 28,
    marginVertical: 2,
  },
  timelineInfo: {
    flex: 1,
    paddingBottom: Spacing.md,
  },
  stepLabel: {
    ...Typography.bodySmall,
  },
  stepDesc: {
    ...Typography.supporting,
    marginTop: 2,
  },
  addressName: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  addressLine: {
    ...Typography.bodySmall,
  },
  itemsList: {
    gap: Spacing.sm,
  },
  receiptItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  receiptItemInfo: {
    flex: 1,
  },
  receiptItemName: {
    ...Typography.bodySmall,
    fontWeight: '500',
  },
  receiptVariant: {
    ...Typography.supporting,
  },
  receiptItemPrice: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  divider: {
    height: 1,
  },
  summaryRows: {
    gap: Spacing.xs,
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
  totalLabel: {
    ...Typography.productName,
  },
  totalAmount: {
    ...Typography.productPrice,
    color: Palette.actionOrange,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  notFoundTitle: {
    ...Typography.sectionHeading,
  },
});

