import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme/theme';

export default function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <View style={styles.wrap}>
      <Ionicons name="star" size={12} color={colors.star} />
      <Text style={styles.text}>
        {rating}/{max}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  text: { fontSize: 12, fontWeight: '700', color: colors.text },
});
