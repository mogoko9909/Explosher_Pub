import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Destination } from '../types';
import { colors, radius, spacing, typography } from '../theme/theme';
import StarRating from './StarRating';

export default function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Pressable style={styles.card}>
      <View>
        <Image source={{ uri: destination.image }} style={styles.image} />
        <View style={styles.ratingBadge}>
          <StarRating rating={destination.rating} />
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.city}>{destination.city}</Text>
        <View style={styles.row}>
          <Ionicons name="location-outline" size={13} color={colors.textMuted} />
          <Text style={styles.country}>{destination.country}</Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {destination.description}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 220,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    overflow: 'hidden',
    marginRight: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  image: { width: '100%', height: 130, backgroundColor: colors.pillBg },
  ratingBadge: { position: 'absolute', top: spacing.sm, right: spacing.sm },
  body: { padding: spacing.sm },
  city: { ...typography.h3, color: colors.text },
  row: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  country: { ...typography.small, color: colors.textMuted },
  description: { ...typography.small, color: colors.textMuted, marginTop: spacing.xs, lineHeight: 16 },
});
