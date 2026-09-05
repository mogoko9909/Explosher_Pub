import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing, typography } from '../theme/theme';
import { destinations } from '../data/destinations';
import { currentUser, stats } from '../data/user';
import DestinationCard from '../components/DestinationCard';
import { RootTabParamList } from '../navigation/types';

export default function HomeScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();
  const firstName = currentUser.name.split(' ')[0];

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={[colors.navy, colors.navyDark]} style={styles.header}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.welcome}>Welcome back,</Text>
              <Text style={styles.name}>{currentUser.name}</Text>
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{firstName[0]}</Text>
            </View>
          </View>

          <View style={styles.promoCard}>
            <View style={styles.promoIcon}>
              <Ionicons name="sparkles" size={20} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.promoTitle}>AI-Powered Kosher Travel</Text>
              <Text style={styles.promoBody}>
                Discover tailor-made culinary adventures around the world, crafted just for you.
              </Text>
              <Pressable onPress={() => navigation.navigate('MyTours')} hitSlop={8}>
                <Text style={styles.promoLink}>View My Tours →</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Featured Destinations</Text>
          <Pressable>
            <View style={styles.seeAllRow}>
              <Text style={styles.seeAll}>See all</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.orange} />
            </View>
          </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: spacing.md }}>
          {destinations.map((d) => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Explosher AI?</Text>
        <View style={styles.statsGrid}>
          {stats.map((s) => (
            <View key={s.id} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: s.color }]}>
                <Ionicons name={s.icon as any} size={18} color="#fff" />
              </View>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { paddingBottom: spacing.xl }]}>
        <LinearGradient colors={[colors.navy, colors.navyDark]} style={styles.ctaBanner}>
          <Text style={styles.ctaTitle}>Ready for your next kosher adventure?</Text>
          <Text style={styles.ctaBody}>Check out your personalized tour plans crafted by our experts.</Text>
          <Pressable style={styles.ctaButton} onPress={() => navigation.navigate('MyTours')}>
            <Text style={styles.ctaButtonText}>My Tours</Text>
            <Ionicons name="chevron-forward" size={16} color="#fff" />
          </Pressable>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: spacing.sm,
  },
  welcome: { color: 'rgba(255,255,255,0.7)', fontSize: 14 },
  name: { color: '#fff', fontSize: 22, fontWeight: '800', marginTop: 2 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  promoCard: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  promoIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoTitle: { color: '#fff', fontWeight: '800', fontSize: 16 },
  promoBody: { color: 'rgba(255,255,255,0.75)', fontSize: 13, marginTop: 4, lineHeight: 18 },
  promoLink: { color: colors.orange, fontWeight: '700', marginTop: spacing.sm },
  section: { paddingHorizontal: spacing.md, marginTop: spacing.lg },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: { ...typography.h2, color: colors.text, marginBottom: spacing.md },
  seeAllRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  seeAll: { color: colors.orange, fontWeight: '700', fontSize: 13 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  statCard: {
    width: '47%',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  statValue: { fontSize: 20, fontWeight: '800', color: colors.text },
  statLabel: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  ctaBanner: { borderRadius: radius.lg, padding: spacing.lg, overflow: 'hidden' },
  ctaTitle: { color: '#fff', fontSize: 18, fontWeight: '800' },
  ctaBody: { color: 'rgba(255,255,255,0.75)', fontSize: 13, marginTop: 6, lineHeight: 18 },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: colors.orange,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    marginTop: spacing.md,
  },
  ctaButtonText: { color: '#fff', fontWeight: '700' },
});
