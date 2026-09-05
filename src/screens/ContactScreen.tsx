import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing, typography } from '../theme/theme';
import { contactInfo } from '../data/user';

const DEFAULT_GREETING = "Hi Explosher! I'd like to plan a kosher trip.";

export default function ContactScreen() {
  const [message, setMessage] = useState('');

  const openWhatsApp = async () => {
    const text = message.trim() || DEFAULT_GREETING;
    const phone = contactInfo.phone.replace(/[^\d]/g, '');
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('WhatsApp not available', 'Please install WhatsApp to use this feature.');
    }
  };

  const callPhone = () => {
    Linking.openURL(`tel:${contactInfo.phone}`);
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.subtitle}>We're here to help plan your perfect kosher journey</Text>

        <View style={styles.companyBanner}>
          <View style={styles.logoCircle}>
            <Ionicons name="earth" size={22} color="#fff" />
          </View>
          <View>
            <Text style={styles.companyName}>Explosher AI</Text>
            <Text style={styles.companyTagline}>Kosher Culinary Tourism Experts</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.whatsappIcon}>
              <Ionicons name="chatbubble-ellipses" size={18} color="#fff" />
            </View>
            <View>
              <Text style={styles.cardTitle}>Chat on WhatsApp</Text>
              <Text style={styles.cardSubtitle}>Fastest way to reach us</Text>
            </View>
          </View>
          <Text style={styles.instructions}>
            Compose your message below or tap the button to open WhatsApp with a default greeting.
          </Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            placeholder="E.g. Hi! I'd like to plan a kosher trip to Paris for 2 people in July..."
            placeholderTextColor={colors.textMuted}
            value={message}
            onChangeText={setMessage}
          />
          <Pressable style={styles.whatsappButton} onPress={openWhatsApp}>
            <Ionicons name="chatbubble-ellipses-outline" size={18} color="#fff" />
            <Text style={styles.whatsappButtonText}>Open WhatsApp</Text>
            <Ionicons name="send" size={16} color="#fff" />
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Other Ways to Reach Us</Text>
          <Pressable style={styles.infoRow} onPress={callPhone}>
            <View style={styles.infoIcon}>
              <Ionicons name="call-outline" size={16} color={colors.orangeDark} />
            </View>
            <View>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{contactInfo.phone}</Text>
            </View>
          </Pressable>
          <View style={styles.infoRow}>
            <View style={[styles.infoIcon, { backgroundColor: colors.pillBg }]}>
              <Ionicons name="globe-outline" size={16} color={colors.navy} />
            </View>
            <View>
              <Text style={styles.infoLabel}>Available</Text>
              <Text style={styles.infoValue}>{contactInfo.availability}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.quickTitle}>Quick messages</Text>
        <View style={styles.chipsWrap}>
          {contactInfo.quickMessages.map((q) => (
            <Pressable key={q} style={styles.chip} onPress={() => setMessage(q)}>
              <Text style={styles.chipText}>{q}</Text>
            </Pressable>
          ))}
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
  companyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.navy,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  companyName: { color: '#fff', fontWeight: '800', fontSize: 16 },
  companyTagline: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  whatsappIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: { ...typography.h3, color: colors.text },
  cardSubtitle: { ...typography.small, color: colors.textMuted, marginTop: 1 },
  instructions: { ...typography.small, color: colors.textMuted, marginBottom: spacing.sm },
  textArea: {
    backgroundColor: colors.pillBg,
    borderRadius: radius.sm,
    padding: spacing.sm,
    minHeight: 90,
    textAlignVertical: 'top',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.success,
    borderRadius: radius.sm,
    paddingVertical: 12,
  },
  whatsappButtonText: { color: '#fff', fontWeight: '700' },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoLabel: { ...typography.small, color: colors.textMuted },
  infoValue: { ...typography.h3, fontSize: 14, color: colors.text, marginTop: 1 },
  quickTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.sm },
  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
  },
  chipText: { fontSize: 12, color: colors.text },
});
