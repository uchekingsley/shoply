import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
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
import { useAuthStore } from '@/store/auth-store';
import { useCartStore } from '@/store/cart-store';
import { AppButton, AppInput, StatusBadge } from '@/components/ui';
import { calculateDeliveryFee } from '@/utils/cart-calculations';
import { DeliveryAddress } from '@/types';

const NIGERIAN_STATES = ['Lagos', 'FCT - Abuja', 'Rivers', 'Oyo', 'Kano'];

export default function AddressesScreen() {
  const router = useRouter();
  const theme = useTheme();

  const addresses = useAuthStore((state) => state.addresses);
  const addAddress = useAuthStore((state) => state.addAddress);
  const deleteAddress = useAuthStore((state) => state.deleteAddress);
  const setDefaultAddress = useAuthStore((state) => state.setDefaultAddress);
  const setSelectedAddress = useCartStore((state) => state.setSelectedAddress);

  const [showAddForm, setShowAddForm] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedState, setSelectedState] = useState('Lagos');
  const [cityOrLGA, setCityOrLGA] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const resetForm = () => {
    setFullName('');
    setPhoneNumber('');
    setSelectedState('Lagos');
    setCityOrLGA('');
    setStreetAddress('');
    setLandmark('');
    setFormError(null);
  };

  const handleSaveAddress = () => {
    setFormError(null);
    if (!fullName.trim()) {
      setFormError('Recipient full name is required.');
      return;
    }
    if (phoneNumber.trim().length < 10) {
      setFormError('Please enter a valid Nigerian phone number.');
      return;
    }
    if (!cityOrLGA.trim()) {
      setFormError('City or LGA is required.');
      return;
    }
    if (!streetAddress.trim()) {
      setFormError('Street address is required.');
      return;
    }

    const created = addAddress({
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      state: selectedState,
      cityOrLGA: cityOrLGA.trim(),
      streetAddress: streetAddress.trim(),
      landmark: landmark.trim() || undefined,
      isDefault: true,
    });

    setSelectedAddress(created);
    resetForm();
    setShowAddForm(false);
  };

  const handleSetDefault = (addr: DeliveryAddress) => {
    setDefaultAddress(addr.id);
    setSelectedAddress({ ...addr, isDefault: true });
  };

  const handleDelete = (addr: DeliveryAddress) => {
    if (addresses.length <= 1) {
      Alert.alert('Cannot Remove', 'You must keep at least one delivery address.');
      return;
    }
    Alert.alert(
      'Delete Address',
      `Remove ${addr.streetAddress}, ${addr.cityOrLGA}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteAddress(addr.id);
            const remaining = useAuthStore.getState().addresses;
            const nextDefault = remaining.find((a) => a.isDefault) ?? remaining[0];
            if (nextDefault) setSelectedAddress(nextDefault);
          },
        },
      ]
    );
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
        <Text style={[styles.headerTitle, { color: theme.text }]}>Address Book</Text>
        <Pressable
          onPress={() => {
            setShowAddForm((prev) => !prev);
            setFormError(null);
          }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.addAction}>
            {showAddForm ? 'Cancel' : '+ Add'}
          </Text>
        </Pressable>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {showAddForm && (
            <View
              style={[
                styles.formCard,
                {
                  backgroundColor: theme.backgroundSecondary,
                  borderColor: theme.border,
                },
              ]}
            >
              <Text style={[styles.formTitle, { color: theme.text }]}>
                New Nigerian Delivery Address
              </Text>

              <AppInput
                label="Recipient Full Name"
                placeholder="e.g. Tunde Bakare"
                value={fullName}
                onChangeText={setFullName}
              />

              <AppInput
                label="Phone Number"
                placeholder="+234 803 123 4567"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />

              <View style={styles.statePickerBlock}>
                <Text style={[styles.fieldLabel, { color: theme.text }]}>
                  State (Determines Delivery Fee)
                </Text>
                <View style={styles.stateChipsRow}>
                  {NIGERIAN_STATES.map((st) => {
                    const active = selectedState === st;
                    return (
                      <Pressable
                        key={st}
                        onPress={() => setSelectedState(st)}
                        style={[
                          styles.stateChip,
                          {
                            backgroundColor: active ? Palette.actionOrange : theme.surface,
                            borderColor: active ? Palette.actionOrange : theme.border,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.stateChipText,
                            { color: active ? Palette.white : theme.text },
                          ]}
                        >
                          {st}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <AppInput
                label="City / LGA"
                placeholder="e.g. Lekki Phase 1, Wuse II"
                value={cityOrLGA}
                onChangeText={setCityOrLGA}
              />

              <AppInput
                label="Street Address"
                placeholder="e.g. 14 Allen Avenue"
                value={streetAddress}
                onChangeText={setStreetAddress}
              />

              <AppInput
                label="Nearest Landmark (Optional)"
                placeholder="e.g. Opposite Oshopey Plaza"
                value={landmark}
                onChangeText={setLandmark}
              />

              {formError && (
                <View style={styles.errorBanner}>
                  <Ionicons name="alert-circle" size={16} color={Palette.errorRed} />
                  <Text style={styles.errorText}>{formError}</Text>
                </View>
              )}

              <AppButton
                title="Save & Set as Default"
                variant="primary"
                size="standard"
                onPress={handleSaveAddress}
              />
            </View>
          )}

          {/* Address List */}
          <Text style={[styles.sectionHeading, { color: theme.textSecondary }]}>
            SAVED ADDRESSES ({addresses.length})
          </Text>

          {addresses.map((addr) => {
            const { fee } = calculateDeliveryFee(addr);
            return (
              <View
                key={addr.id}
                style={[
                  styles.addressCard,
                  {
                    backgroundColor: theme.surface,
                    borderColor: addr.isDefault ? Palette.actionOrange : theme.border,
                    borderWidth: addr.isDefault ? 1.5 : 1,
                  },
                ]}
              >
                <View style={styles.addressHeader}>
                  <Text style={[styles.recipientName, { color: theme.text }]}>
                    {addr.fullName}
                  </Text>
                  {addr.isDefault ? (
                    <StatusBadge label="Default" variant="warning" size="sm" />
                  ) : (
                    <Pressable onPress={() => handleSetDefault(addr)}>
                      <Text style={styles.setDefaultText}>Set Default</Text>
                    </Pressable>
                  )}
                </View>

                <Text style={[styles.phoneText, { color: theme.textSecondary }]}>
                  {addr.phoneNumber}
                </Text>

                <Text style={[styles.streetText, { color: theme.text }]}>
                  {addr.streetAddress}, {addr.cityOrLGA}, {addr.state}
                </Text>

                {addr.landmark && (
                  <Text style={[styles.landmarkText, { color: theme.textSecondary }]}>
                    Landmark: {addr.landmark}
                  </Text>
                )}

                <View style={[styles.cardFooter, { borderTopColor: theme.border }]}>
                  <Text style={[styles.feeText, { color: theme.textSecondary }]}>
                    Delivery Fee: {fee !== undefined ? formatNaira(fee) : 'TBD'}
                  </Text>
                  <Pressable
                    onPress={() => handleDelete(addr)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons name="trash-outline" size={18} color={Palette.errorRed} />
                  </Pressable>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </KeyboardAvoidingView>
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
  headerBack: { width: 48 },
  headerTitle: { ...Typography.sectionHeading },
  addAction: {
    ...Typography.buttonCompact,
    color: Palette.actionOrange,
    minWidth: 48,
    textAlign: 'right',
  },
  scrollContent: {
    padding: Spacing.lg,
    gap: Spacing.md,
    paddingBottom: Spacing.xxxl * 2,
  },
  formCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.md,
  },
  formTitle: {
    ...Typography.productName,
  },
  statePickerBlock: {
    gap: Spacing.xs,
  },
  fieldLabel: {
    ...Typography.supporting,
    fontWeight: '600',
  },
  stateChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  stateChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  stateChipText: {
    ...Typography.supporting,
    fontWeight: '600',
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Palette.errorRedBgLight,
    padding: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  errorText: {
    ...Typography.supporting,
    color: Palette.errorRed,
    flex: 1,
  },
  sectionHeading: {
    ...Typography.supporting,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  addressCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.xs,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recipientName: {
    ...Typography.productName,
  },
  setDefaultText: {
    ...Typography.supporting,
    color: Palette.actionOrange,
    fontWeight: '600',
  },
  phoneText: {
    ...Typography.supporting,
  },
  streetText: {
    ...Typography.bodySmall,
  },
  landmarkText: {
    ...Typography.supporting,
  },
  cardFooter: {
    marginTop: Spacing.xs,
    paddingTop: Spacing.xs,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  feeText: {
    ...Typography.supporting,
    fontWeight: '600',
  },
});

