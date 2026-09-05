import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { colors, radius, spacing, typography } from '../theme/theme';
import { tours } from '../data/tours';
import { TourStatus } from '../types';
import TourCard from '../components/TourCard';
import { MyToursStackParamList } from '../navigation/types';

const TABS: { key: TourStatus; label: string }[] = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

export default function MyToursScreen() {
  const [activeTab, setActiveTab] = useState<TourStatus>('upcoming');
  const navigation = useNavigation<NativeStackNavigationProp<MyToursStackParamList>>();

  const counts = useMemo(() => {
    const c: Record<TourStatus, number> = { upcoming: 0, active: 0, completed: 0 };
    tours.forEach((t) => c[t.status]++);
    return c;
  }, []);

  const filtered = tours.filter((t) => t.status === activeTab);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.headerBlock}>
        <Text style={styles.title}>My Tours</Text>
        <Text style={styles.subtitle}>Your tailor-made travel plans</Text>
      </View>

      <View style={styles.tabsRow}>
        {TABS.map((tab) => {
          const active = tab.key === activeTab;
          return (
            <Pressable
              key={tab.key}
              style={[styles.tab, active && styles.tabActive]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]}>
                {tab.label} ({counts[tab.key]})
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TourCard tour={item} onPress={() => navigation.navigate('TourDetail', { tourId: item.id })} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No {activeTab} tours yet.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  headerBlock: { paddingHorizontal: spacing.md, paddingTop: spacing.md },
  title: { ...typography.h1, color: colors.text },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: 2 },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: colors.pillBg,
    borderRadius: radius.pill,
    margin: spacing.md,
    padding: 4,
  },
  tab: { flex: 1, paddingVertical: 8, borderRadius: radius.pill, alignItems: 'center' },
  tabActive: { backgroundColor: colors.card },
  tabText: { fontSize: 12, fontWeight: '600', color: colors.textMuted },
  tabTextActive: { color: colors.text },
  listContent: { paddingHorizontal: spacing.md, paddingBottom: spacing.xl },
  empty: { alignItems: 'center', paddingVertical: spacing.xl * 2 },
  emptyText: { color: colors.textMuted },
});
