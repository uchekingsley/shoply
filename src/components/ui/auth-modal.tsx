import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Palette, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/store/auth-store';
import { AppButton } from './app-button';
import { AppInput } from './app-input';

export interface AuthModalProps {
  visible: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onClose: () => void;
  onConfirm?: () => void;
}

export function AuthModal({
  visible,
  title = 'Sign In to Shoply',
  description = 'Enjoy persistent cart across devices, save items to your wishlist, and track your orders.',
  onClose,
  onConfirm,
}: AuthModalProps) {
  const theme = useTheme();
  const loginWithEmail = useAuthStore((state) => state.loginWithEmail);
  const loginWithPhone = useAuthStore((state) => state.loginWithPhone);

  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [isSignUp, setIsSignUp] = useState(false);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setErrorMessage(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      if (isSignUp && !fullName.trim()) {
        setErrorMessage('Please enter your full name.');
        setIsLoading(false);
        return;
      }

      if (authMethod === 'email') {
        if (!email.trim() || !email.includes('@')) {
          setErrorMessage('Please provide a valid email address.');
          setIsLoading(false);
          return;
        }
        if (!password || password.length < 6) {
          setErrorMessage('Password must be at least 6 characters.');
          setIsLoading(false);
          return;
        }

        const res = await loginWithEmail(email, fullName.trim() || undefined);
        if (res.success) {
          handleClose();
          onConfirm?.();
        } else {
          setErrorMessage(res.message);
        }
      } else {
        if (!phone.trim() || phone.trim().length < 10) {
          setErrorMessage('Please enter a valid phone number (e.g. 0803 123 4567).');
          setIsLoading(false);
          return;
        }

        const res = await loginWithPhone(phone, fullName.trim() || undefined);
        if (res.success) {
          handleClose();
          onConfirm?.();
        } else {
          setErrorMessage(res.message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={[styles.dialog, { backgroundColor: theme.surface }]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <View style={styles.iconCircle}>
                <Ionicons name="lock-closed" size={20} color={Palette.actionOrange} />
              </View>
              <Text style={[styles.title, { color: theme.text }]}>
                {isSignUp ? 'Create an Account' : title}
              </Text>
            </View>
            <Pressable
              onPress={handleClose}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close" size={22} color={theme.textSecondary} />
            </Pressable>
          </View>

          <Text style={[styles.description, { color: theme.textSecondary }]}>
            {description}
          </Text>

          {/* Method Switcher (Email vs Phone) */}
          <View style={[styles.tabBar, { backgroundColor: theme.backgroundSecondary }]}>
            <Pressable
              style={[
                styles.tabBtn,
                authMethod === 'email' && [styles.tabBtnActive, { backgroundColor: theme.surface }],
              ]}
              onPress={() => {
                setAuthMethod('email');
                setErrorMessage(null);
              }}
            >
              <Text
                style={[
                  styles.tabBtnText,
                  { color: authMethod === 'email' ? Palette.actionOrange : theme.textSecondary },
                ]}
              >
                Email
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.tabBtn,
                authMethod === 'phone' && [styles.tabBtnActive, { backgroundColor: theme.surface }],
              ]}
              onPress={() => {
                setAuthMethod('phone');
                setErrorMessage(null);
              }}
            >
              <Text
                style={[
                  styles.tabBtnText,
                  { color: authMethod === 'phone' ? Palette.actionOrange : theme.textSecondary },
                ]}
              >
                Phone (Naija)
              </Text>
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.form}>
            {isSignUp && (
              <AppInput
                label="Full Name"
                placeholder="e.g. Chinedu Okafor"
                value={fullName}
                onChangeText={setFullName}
                leftIcon={<Ionicons name="person-outline" size={18} color={theme.textSecondary} />}
              />
            )}

            {authMethod === 'email' ? (
              <>
                <AppInput
                  label="Email Address"
                  placeholder="name@domain.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  leftIcon={<Ionicons name="mail-outline" size={18} color={theme.textSecondary} />}
                />
                <AppInput
                  label="Password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  leftIcon={<Ionicons name="key-outline" size={18} color={theme.textSecondary} />}
                />
              </>
            ) : (
              <>
                <AppInput
                  label="Phone Number"
                  placeholder="0801 234 5678"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  leftIcon={<Ionicons name="call-outline" size={18} color={theme.textSecondary} />}
                  helperText="We'll send you an instant SMS verification code"
                />
              </>
            )}

            {errorMessage && (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={16} color={Palette.errorRed} />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            )}

            <View style={styles.actions}>
              <AppButton
                title={isSignUp ? 'Create Account' : 'Sign In'}
                variant="primary"
                size="standard"
                loading={isLoading}
                onPress={handleSubmit}
              />

              <Pressable
                onPress={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMessage(null);
                }}
                style={styles.toggleRow}
              >
                <Text style={[styles.toggleText, { color: theme.textSecondary }]}>
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <Text style={{ color: Palette.actionOrange, fontWeight: '700' }}>
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </Text>
                </Text>
              </Pressable>

              <AppButton
                title="Continue as Guest"
                variant="text"
                size="compact"
                onPress={handleClose}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  dialog: {
    width: '100%',
    maxWidth: 420,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    gap: Spacing.md,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF2EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...Typography.sectionHeading,
  },
  description: {
    ...Typography.bodySmall,
    lineHeight: 18,
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: BorderRadius.md,
    padding: 3,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: Spacing.xs + 2,
    alignItems: 'center',
    borderRadius: BorderRadius.sm,
  },
  tabBtnActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabBtnText: {
    ...Typography.supporting,
    fontWeight: '600',
  },
  form: {
    gap: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: '#FDECEC',
    padding: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  errorText: {
    ...Typography.supporting,
    color: Palette.errorRed,
    flex: 1,
  },
  actions: {
    marginTop: Spacing.xs,
    gap: Spacing.sm,
  },
  toggleRow: {
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  toggleText: {
    ...Typography.bodySmall,
  },
});
