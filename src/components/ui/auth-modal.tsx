import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Palette, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { AppButton } from './app-button';

export interface AuthModalProps {
  visible: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function AuthModal({
  visible,
  title = 'Account Required',
  description = 'Guests can browse and build a cart, but wishlists, saved orders, and checkout require signing in.',
  confirmLabel = 'Sign In / Register',
  cancelLabel = 'Continue as Guest',
  onClose,
  onConfirm,
}: AuthModalProps) {
  const theme = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          style={[styles.card, { backgroundColor: theme.surface }]}
          onPress={(e) => e.stopPropagation()}
        >
          <Text style={styles.icon}>🔒</Text>
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.desc, { color: theme.textSecondary }]}>
            {description}
          </Text>

          <AppButton
            title={confirmLabel}
            variant="primary"
            fullWidth
            onPress={onConfirm}
            style={styles.confirmBtn}
          />
          <AppButton
            title={cancelLabel}
            variant="text"
            fullWidth
            onPress={onClose}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  icon: {
    fontSize: 40,
    marginBottom: Spacing.sm,
  },
  title: {
    ...Typography.sectionHeading,
    fontSize: 19,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  desc: {
    ...Typography.bodySmall,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    lineHeight: 20,
  },
  confirmBtn: {
    marginBottom: Spacing.sm,
  },
});
