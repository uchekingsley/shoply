import React, { useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
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
import { useOrderStore } from '@/store/order-store';
import { AppButton, BadgeVariant, StatusBadge } from '@/components/ui';
import { Order } from '@/types';

type OrderFilter = 'All' | 'Active' | 'Delivered';

function getStatusVariant(status: Order['status']): BadgeVariant {
  if (status === 'Delivered') return 'success';
  if (status === 'Cancelled') return 'error';
  if (status === 'In Transit') return 'brand';
  return 'warning';
}

export default function OrdersScreen() {
  const router = useRouter();
  const theme = useTheme();
  const orders = useOrderStore((state) => state.orders);

  const [filter, setFilter] = useState<OrderFilter>('All');

  const filteredOrders = useMemo(() => {
    if (filter === 'All') return orders;
    if (filter === 'Delivered') return orders.filter((o) => o.status === 'Delivered');
    return orders.filter((o) => o.status !== 'Delivered' && o.status !== 'Cancelled');
  }, [orders, filter]);

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('en-NG', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return iso;
    }
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
        <Text style={[styles.headerTitle, { color: theme.text }]}>My Orders</Text>
        <View style={styles.headerBack} />
      </View>

      {/* Filter Pills */}
      <View style={styles.filterRow}>
        {(['All', 'Active', 'Delivered'] as OrderFilter[]).map((tab) => {
          const active = filter === tab;
          return (
            <Pressable
              key={tab}
              onPress={() => setFilter(tab)}
              style={[
                styles.filterChip,
                {
                  backgroundColor: active ? Palette.brandNavy : theme.surface,
                  borderColor: active ? Palette.brandNavy : theme.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: active ? Palette.white : theme.text },
                ]}
              >
                {tab}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* List or Empty State */}
      {filteredOrders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={56} color={theme.textSecondary} />
          <Text style={[styles.emptyTitle, { color: theme.text }]}>No orders found</Text>
          <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
            Orders you place on Shoply will appear here with real-time tracking.
          </Text>
          <View style={styles.emptyBtn}>
            <AppButton
              title="Browse Shop"
              variant="primary"
              onPress={() => router.push('/')}
            />
          </View>
        </View>
      ) : (
        <View style={styles.listWrapper}>
          <FlashList
            data={filteredOrders}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => router.push(`/order/${item.id}`)}
                style={({ pressed }) => [
                  styles.orderCard,
                  {
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <View style={styles.cardTop}>
                  <Text style={[styles.orderId, { color: theme.text }]}>{item.id}</Text>
                  <StatusBadge
                    label={item.status}
                    variant={getStatusVariant(item.status)}
                    size="sm"
                  />
                </View>

                <Text style={[styles.metaText, { color: theme.textSecondary }]}>
                  {formatDate(item.createdAt)} • {item.items.length} item
                  {item.items.length === 1 ? '' : 's'} • {item.paymentLabel}
                </Text>

                <Text
                  numberOfLines={1}
                  style={[styles.itemsPreview, { color: theme.text }]}
                >
                  {item.items.map((i) => `${i.quantity}x ${i.productName}`).join(', ')}
                </Text>

                <View style={[styles.cardFooter, { borderTopColor: theme.border }]}>
                  <Text style={[styles.totalText, { color: theme.text }]}>
                    {formatNaira(item.total)}
                  </Text>
                  <View style={styles.trackRow}>
                    <Text style={styles.trackText}>Track Order</Text>
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color={Palette.actionOrange}
                    />
                  </View>
                </View>
              </Pressable>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
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
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  filterText: {
    ...Typography.supporting,
    fontWeight: '600',
  },
  listWrapper: { flex: 1 },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxxl * 2,
  },
  orderCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderId: {
    ...Typography.productName,
  },
  metaText: {
    ...Typography.supporting,
  },
  itemsPreview: {
    ...Typography.bodySmall,
  },
  cardFooter: {
    marginTop: Spacing.xs,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalText: {
    ...Typography.productName,
    fontWeight: '700',
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  trackText: {
    ...Typography.supporting,
    color: Palette.actionOrange,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxl,
    gap: Spacing.sm,
  },
  emptyTitle: { ...Typography.sectionHeading },
  emptySubtitle: {
    ...Typography.bodySmall,
    textAlign: 'center',
    maxWidth: 260,
  },
  emptyBtn: { width: 180, marginTop: Spacing.sm },
});
