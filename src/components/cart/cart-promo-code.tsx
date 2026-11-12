import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { AppButton, AppInput, StatusBadge } from '@/components/ui';

export interface CartPromoCodeProps {
  appliedPromo: string | null;
  onApplyPromo: (code: string) => { success: boolean; message: string };
  onRemovePromo: () => void;
}

export function CartPromoCode({
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
}: CartPromoCodeProps) {
  const theme = useTheme();
  const [promoInput, setPromoInput] = useState('');
  const [feedback, setFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleApply = () => {
    if (!promoInput.trim()) return;
    const res = onApplyPromo(promoInput);
    setFeedback(res);
    if (res.success) {
      setPromoInput('');
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <Text style={[styles.title, { color: theme.text }]}>Promotional Code</Text>

      {appliedPromo ? (
        <View style={styles.appliedRow}>
          <StatusBadge
            label={`Code Applied: ${appliedPromo} (-10%)`}
            variant="success"
            size="md"
          />
          <Pressable onPress={onRemovePromo}>
            <Text style={[styles.removeText, { color: theme.error }]}>Remove</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.inputRow}>
          <View style={{ flex: 1 }}>
            <AppInput
              placeholder="Enter coupon (e.g. SHOPLY10)"
              value={promoInput}
              onChangeText={setPromoInput}
              autoCapitalize="characters"
              containerStyle={{ marginBottom: 0 }}
            />
          </View>
          <AppButton
            title="Apply"
            variant="secondary"
            size="compact"
            onPress={handleApply}
            style={styles.applyBtn}
          />
        </View>
      )}

      {feedback && !appliedPromo && (
        <Text
          style={[
            styles.feedbackText,
            { color: feedback.success ? theme.success : theme.error },
          ]}
        >
          {feedback.message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  title: {
    ...Typography.sectionHeading,
    fontSize: 16,
    marginBottom: Spacing.sm,
  },
  appliedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  removeText: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  applyBtn: {
    height: 48,
  },
  feedbackText: {
    ...Typography.supporting,
    marginTop: Spacing.xs,
    fontWeight: '600',
  },
});
