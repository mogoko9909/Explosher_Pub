import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, radius, spacing, typography } from '../theme/theme';
import { tours } from '../data/tours';
import { formatDate } from '../utils/date';
import { MapStackParamList } from '../navigation/types';

// react-native-maps has no web target; this platform-specific file (resolved
// automatically over MapScreen.tsx on web) shows the destination list without
// the native map so the app doesn't crash when bundled for web.
export default function MapScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MapStackParamList>>();

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.headerBlock}>
        <Text style={styles.title}>My Tour Map</Text>
        <Text style={styles.subtitle}>{tours.length} destinations on your map</Text>
      </View>

      <View style={styles.mapPlaceholder}>
        <Ionicons name="map-outline" size={28} color={colors.textMuted} />
        <Text style={styles.mapPlaceholderText}>Map view is available on the Android app</Text>
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        {tours.map((tour) => (
          <Pressable
            key={tour.id}
            style={styles.tourRow}
            onPress={() => navigation.navigate('TourDetail', { tourId: tour.id })}
          >
            <View style={styles.tourIcon}>
              <Ionicons name="location" size={16} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.tourTitle}>{tour.title}</Text>
              <Text style={styles.tourMeta}>{tour.city}</Text>
              <View style={styles.dateRow}>
                <Ionicons name="calendar-outline" size={12} color={colors.textMuted} />
                <Text style={styles.tourMeta}>{formatDate(tour.startDate)}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  headerBlock: { paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.sm },
  title: { ...typography.h1, color: colors.text },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: 2 },
  mapPlaceholder: {
    height: 160,
    marginHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.pillBg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  mapPlaceholderText: { ...typography.small, color: colors.textMuted },
  listContent: { padding: spacing.md, gap: spacing.sm },
  tourRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  tourIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tourTitle: { ...typography.h3, fontSize: 14, color: colors.text },
  tourMeta: { ...typography.small, color: colors.textMuted, marginTop: 1 },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 },
});
