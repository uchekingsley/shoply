import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Palette,
  Typography,
  Spacing,
  BorderRadius,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useCart } from '@/context/cart-context';
import { MOCK_ADDRESSES } from '@/data/mock-data';
import { DeliveryAddress } from '@/types';
import { AppButton } from '../ui/app-button';

export function LocationSelector() {
  const theme = useTheme();
  const { selectedAddress, setSelectedAddress } = useCart();
  const [modalVisible, setModalVisible] = useState(false);

  const displayLocation = selectedAddress
    ? `${selectedAddress.cityOrLGA}, ${selectedAddress.state}`
    : 'Select delivery location';

  const handleSelect = (addr: DeliveryAddress) => {
    setSelectedAddress(addr);
    setModalVisible(false);
  };

  return (
    <>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={[
          styles.container,
          {
            backgroundColor: theme.background,
            borderBottomColor: theme.border,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel={`Delivery location: ${displayLocation}`}
      >
        <View style={styles.pinIconCircle}>
          <Text style={styles.pinIcon}>📍</Text>
        </View>

        <View style={styles.textColumn}>
          <Text style={[styles.caption, { color: theme.textSecondary }]}>
            Deliver to
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.locationText, { color: theme.text }]}
          >
            {displayLocation}
          </Text>
        </View>

        <Text style={[styles.chevron, { color: theme.textSecondary }]}>▾</Text>
      </Pressable>

      {/* Address Selection Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable
            style={[styles.sheetContent, { backgroundColor: theme.surface }]}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.sheetHandle} />

            <Text style={[styles.sheetTitle, { color: theme.text }]}>
              Choose Delivery Address
            </Text>
            <Text style={[styles.sheetSubtitle, { color: theme.textSecondary }]}>
              Delivery fees and estimates will update based on your Nigerian delivery location.
            </Text>

            <ScrollView style={styles.addressList} showsVerticalScrollIndicator={false}>
              {MOCK_ADDRESSES.map((addr) => {
                const isSelected = selectedAddress?.id === addr.id;
                return (
                  <Pressable
                    key={addr.id}
                    onPress={() => handleSelect(addr)}
                    style={[
                      styles.addressCard,
                      {
                        backgroundColor: isSelected
                          ? Palette.orangeBgLight
                          : theme.backgroundSecondary,
                        borderColor: isSelected
                          ? Palette.actionOrange
                          : theme.border,
                      },
                    ]}
                  >
                    <View style={styles.addressHeader}>
                      <Text style={[styles.addrName, { color: theme.text }]}>
                        {addr.fullName}
                      </Text>
                      {addr.isDefault && (
                        <View style={styles.defaultBadge}>
                          <Text style={styles.defaultBadgeText}>DEFAULT</Text>
                        </View>
                      )}
                    </View>

                    <Text style={[styles.addrDetail, { color: theme.text }]}>
                      {addr.streetAddress}
                      {addr.buildingDetails ? `, ${addr.buildingDetails}` : ''}
                    </Text>
                    <Text style={[styles.addrSub, { color: theme.textSecondary }]}>
                      {addr.cityOrLGA}, {addr.state}
                      {addr.landmark ? ` (Landmark: ${addr.landmark})` : ''}
                    </Text>
                    <Text style={[styles.addrPhone, { color: theme.textSecondary }]}>
                      {addr.phoneNumber}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <AppButton
              title="Done"
              variant="primary"
              fullWidth
              onPress={() => setModalVisible(false)}
              style={styles.doneBtn}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
  pinIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Palette.orangeBgLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  pinIcon: {
    fontSize: 16,
  },
  textColumn: {
    flex: 1,
  },
  caption: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 14,
  },
  locationText: {
    ...Typography.bodySmall,
    fontWeight: '700',
    lineHeight: 18,
  },
  chevron: {
    fontSize: 16,
    marginLeft: Spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheetContent: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    padding: Spacing.lg,
    maxHeight: '80%',
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Palette.borderGreyLight,
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  sheetTitle: {
    ...Typography.sectionHeading,
    fontSize: 19,
    marginBottom: 4,
  },
  sheetSubtitle: {
    ...Typography.supporting,
    marginBottom: Spacing.md,
  },
  addressList: {
    maxHeight: 320,
  },
  addressCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    marginBottom: Spacing.sm,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  addrName: {
    ...Typography.body,
    fontWeight: '700',
  },
  defaultBadge: {
    backgroundColor: Palette.brandNavy,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultBadgeText: {
    color: Palette.white,
    fontSize: 9,
    fontWeight: '700',
  },
  addrDetail: {
    ...Typography.bodySmall,
    lineHeight: 18,
  },
  addrSub: {
    ...Typography.supporting,
    marginTop: 2,
  },
  addrPhone: {
    ...Typography.supporting,
    marginTop: 4,
  },
  doneBtn: {
    marginTop: Spacing.md,
  },
});
