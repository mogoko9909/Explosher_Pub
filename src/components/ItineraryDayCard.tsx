import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ItineraryDay, ItineraryStopType } from '../types';
import { colors, radius, spacing, typography } from '../theme/theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const STOP_ICON: Record<ItineraryStopType, keyof typeof Ionicons.glyphMap> = {
  sight: 'location-outline',
  food: 'restaurant-outline',
  hotel: 'business-outline',
  transport: 'car-outline',
};

const STOP_ICON_BG: Record<ItineraryStopType, string> = {
  sight: colors.pillBg,
  food: colors.chipBg,
  hotel: colors.pillBg,
  transport: colors.pillBg,
};

const STOP_ICON_COLOR: Record<ItineraryStopType, string> = {
  sight: colors.navy,
  food: colors.orange,
  hotel: colors.navy,
  transport: colors.navy,
};

export default function ItineraryDayCard({ day, defaultOpen = false }: { day: ItineraryDay; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((o) => !o);
  };

  return (
    <View style={styles.card}>
      <Pressable style={styles.headerRow} onPress={toggle}>
        <View style={styles.dayBadge}>
          <Text style={styles.dayBadgeText}>{day.dayNumber}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.dayTitle}>{day.title}</Text>
          <Text style={styles.dayDate}>{day.date}</Text>
        </View>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textMuted} />
      </Pressable>

      {open && (
        <View style={styles.stopsWrap}>
          {day.stops.map((stop, idx) => (
            <View key={stop.id} style={styles.stopRow}>
              <View style={styles.stopLine}>
                <View style={[styles.stopIcon, { backgroundColor: STOP_ICON_BG[stop.type] }]}>
                  <Ionicons name={STOP_ICON[stop.type]} size={14} color={STOP_ICON_COLOR[stop.type]} />
                </View>
                {idx < day.stops.length - 1 && <View style={styles.connector} />}
              </View>
              <View style={styles.stopBody}>
                <Text style={styles.stopTime}>{stop.time}</Text>
                <Text style={styles.stopTitle}>{stop.title}</Text>
                <View style={styles.stopLocationRow}>
                  <Ionicons name="location-outline" size={12} color={colors.textMuted} />
                  <Text style={styles.stopLocation}>{stop.location}</Text>
                </View>
                {stop.note && <Text style={styles.stopNote}>{stop.note}</Text>}
                {stop.kosherBadge && (
                  <View style={styles.kosherBadge}>
                    <Ionicons name="checkmark" size={11} color={colors.orangeDark} />
                    <Text style={styles.kosherBadgeText}>{stop.kosherBadge}</Text>
                  </View>
                )}
                {stop.tag && <Text style={styles.stopTag}>{stop.tag}</Text>}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
  },
  dayBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBadgeText: { color: '#fff', fontWeight: '800' },
  dayTitle: { ...typography.h3, color: colors.text },
  dayDate: { ...typography.small, color: colors.textMuted, marginTop: 1 },
  stopsWrap: { backgroundColor: colors.background, paddingHorizontal: spacing.md, paddingBottom: spacing.md },
  stopRow: { flexDirection: 'row', gap: spacing.sm },
  stopLine: { alignItems: 'center', width: 28 },
  stopIcon: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  connector: { width: 2, flex: 1, backgroundColor: colors.border, marginTop: 2 },
  stopBody: { flex: 1, paddingBottom: spacing.md },
  stopTime: { ...typography.small, color: colors.textMuted, backgroundColor: colors.pillBg, alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.sm, marginBottom: 4 },
  stopTitle: { ...typography.h3, fontSize: 14, color: colors.text },
  stopLocationRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 },
  stopLocation: { ...typography.small, color: colors.textMuted },
  stopNote: { ...typography.small, color: colors.textMuted, marginTop: 4, fontStyle: 'italic' },
  kosherBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.chipBg,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
    marginTop: 6,
  },
  kosherBadgeText: { fontSize: 11, fontWeight: '700', color: colors.orangeDark },
  stopTag: { ...typography.small, color: colors.textMuted, marginTop: 4 },
});
