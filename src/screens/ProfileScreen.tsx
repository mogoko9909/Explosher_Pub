import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing, typography } from '../theme/theme';
import { currentUser } from '../data/user';
import { useAuth } from '../context/AuthContext';
import logo from '../../assets/logo.png';

export default function ProfileScreen() {
  const { email: sessionEmail, signOut } = useAuth();
  const email = sessionEmail ?? currentUser.email;
  const initial = currentUser.name.trim()[0]?.toUpperCase() ?? 'U';

  const handleSignOut = () => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: signOut },
    ]);
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Manage your account</Text>

        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <Text style={styles.name}>{currentUser.name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Account Details</Text>

          <View style={styles.row}>
            <Ionicons name="person-outline" size={16} color={colors.textMuted} />
            <View>
              <Text style={styles.label}>Full Name</Text>
              <Text style={styles.value}>{currentUser.name}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Ionicons name="mail-outline" size={16} color={colors.textMuted} />
            <View>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{email}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Ionicons name="shield-outline" size={16} color={colors.textMuted} />
            <View>
              <Text style={styles.label}>Role</Text>
              <Text style={styles.value}>{currentUser.role}</Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.signOutButton} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={18} color="#D6303C" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>

        <View style={styles.footerCard}>
          <Image source={logo} style={styles.footerLogo} />
          <View>
            <Text style={styles.footerTitle}>Explosher AI</Text>
            <Text style={styles.footerSubtitle}>Kosher Culinary Tourism · v1.0</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  title: { ...typography.h1, color: colors.text },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: 2, marginBottom: spacing.md },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  avatarText: { color: '#fff', fontSize: 28, fontWeight: '800' },
  name: { ...typography.h2, color: colors.text },
  email: { ...typography.body, color: colors.textMuted, marginTop: 2 },
  sectionTitle: { ...typography.h3, color: colors.text, alignSelf: 'flex-start', marginBottom: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, alignSelf: 'stretch', paddingVertical: spacing.sm },
  divider: { height: 1, backgroundColor: colors.border, alignSelf: 'stretch' },
  label: { ...typography.small, color: colors.textMuted },
  value: { ...typography.h3, fontSize: 14, color: colors.text, marginTop: 1 },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  signOutText: { color: '#D6303C', fontWeight: '700' },
  footerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
  },
  footerLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  footerTitle: { ...typography.h3, color: colors.text },
  footerSubtitle: { ...typography.small, color: colors.textMuted, marginTop: 1 },
});
