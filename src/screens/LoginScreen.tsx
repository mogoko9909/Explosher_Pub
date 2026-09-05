import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing, typography } from '../theme/theme';
import { useAuth } from '../context/AuthContext';
import logo from '../../assets/logo.png';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isSignUp = mode === 'signUp';

  const handleSubmit = async () => {
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError('Enter your email and password to continue.');
      return;
    }
    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = () => {
    Alert.alert('Coming soon', 'Google sign-in will be available in a future update.');
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot password', 'Password reset will be available in a future update.');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Image source={logo} style={styles.logo} />
          <Text style={styles.title}>Welcome to Explosher-AI</Text>
          <Text style={styles.subtitle}>{isSignUp ? 'Create your account' : 'Sign in to continue'}</Text>

          <Pressable style={styles.googleButton} onPress={handleGoogle}>
            <AntDesign name="google" size={18} color="#4285F4" />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </Pressable>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <Text style={styles.label}>Email</Text>
          <View style={styles.inputRow}>
            <Ionicons name="mail-outline" size={18} color={colors.textMuted} />
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputRow}>
            <Ionicons name="lock-closed-outline" size={18} color={colors.textMuted} />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
            />
          </View>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <Pressable style={styles.submitButton} onPress={handleSubmit} disabled={submitting}>
            <Text style={styles.submitButtonText}>{submitting ? 'Please wait…' : isSignUp ? 'Sign Up' : 'Sign in'}</Text>
          </Pressable>

          <View style={styles.footerRow}>
            {!isSignUp && (
              <Pressable onPress={handleForgotPassword}>
                <Text style={styles.footerLink}>Forgot password?</Text>
              </Pressable>
            )}
            <Pressable onPress={() => setMode(isSignUp ? 'signIn' : 'signUp')} style={styles.footerRightLink}>
              <Text style={styles.footerMuted}>
                {isSignUp ? 'Already have an account? ' : 'Need an account? '}
                <Text style={styles.footerLinkBold}>{isSignUp ? 'Sign in' : 'Sign up'}</Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, alignItems: 'center', padding: spacing.lg, paddingTop: spacing.xl },
  logo: { width: 96, height: 96, borderRadius: 48, marginBottom: spacing.lg },
  title: { ...typography.h1, color: colors.text, textAlign: 'center' },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: spacing.xs, marginBottom: spacing.lg },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignSelf: 'stretch',
  },
  googleButtonText: { fontWeight: '700', color: colors.text, fontSize: 15 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch', marginVertical: spacing.lg, gap: spacing.sm },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { ...typography.small, color: colors.textMuted, fontWeight: '700' },
  label: { ...typography.h3, fontSize: 13, color: colors.text, alignSelf: 'flex-start', marginBottom: spacing.xs },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: Platform.select({ ios: 14, android: 4, default: 10 }),
    alignSelf: 'stretch',
    marginBottom: spacing.md,
  },
  input: { flex: 1, color: colors.text, fontSize: 15 },
  errorText: { color: '#D6303C', fontSize: 13, alignSelf: 'flex-start', marginBottom: spacing.sm },
  submitButton: {
    backgroundColor: colors.navy,
    borderRadius: radius.pill,
    paddingVertical: 16,
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: spacing.sm,
  },
  submitButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginTop: spacing.md,
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  footerRightLink: { marginLeft: 'auto' },
  footerLink: { color: colors.textMuted, fontSize: 13 },
  footerMuted: { color: colors.textMuted, fontSize: 13 },
  footerLinkBold: { color: colors.text, fontWeight: '700' },
});
