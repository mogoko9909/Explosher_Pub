import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Tour } from '../types';
import { colors, radius, spacing, typography } from '../theme/theme';
import { formatDate } from '../utils/date';

const STATUS_LABEL: Record<Tour['status'], string> = {
  upcoming: 'Upcoming',
  active: 'Active',
  completed: 'Completed',
};

export default function TourCard({ tour, onPress }: { tour: Tour; onPress: () => void }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View>
        <Image source={{ uri: tour.image }} style={styles.image} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{STATUS_LABEL[tour.status]}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.rowBetween}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{tour.title}</Text>
            <View style={styles.row}>
              <Ionicons name="location-outline" size={13} color={colors.textMuted} />
              <Text style={styles.muted}>
                {tour.city}, {tour.country}
              </Text>
            </View>
            <View style={styles.metaRow}>
              <View style={styles.row}>
                <Ionicons name="calendar-outline" size={13} color={colors.textMuted} />
                <Text style={styles.muted}>{formatDate(tour.startDate)}</Text>
              </View>
              <View style={styles.row}>
                <Ionicons name="people-outline" size={13} color={colors.textMuted} />
                <Text style={styles.muted}>{tour.travelers}</Text>
              </View>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    overflow: 'hidden',
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  image: { width: '100%', height: 150 },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.orange,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  body: { padding: spacing.md },
  rowBetween: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  title: { ...typography.h3, color: colors.text, marginBottom: 4 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaRow: { flexDirection: 'row', gap: spacing.md, marginTop: 6 },
  muted: { ...typography.small, color: colors.textMuted },
});
