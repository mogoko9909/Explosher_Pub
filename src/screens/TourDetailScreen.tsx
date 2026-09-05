import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, radius, spacing, typography } from '../theme/theme';
import { tours } from '../data/tours';
import { formatDate, formatDateShort } from '../utils/date';
import ItineraryDayCard from '../components/ItineraryDayCard';
import { MyToursStackParamList } from '../navigation/types';

const STATUS_LABEL: Record<string, string> = {
  upcoming: 'Upcoming',
  active: 'Active',
  completed: 'Completed',
};

export default function TourDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MyToursStackParamList>>();
  const route = useRoute<RouteProp<MyToursStackParamList, 'TourDetail'>>();
  const tour = tours.find((t) => t.id === route.params.tourId);

  if (!tour) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={{ padding: spacing.md }}>Tour not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View>
        <Image source={{ uri: tour.image }} style={styles.hero} />
        <SafeAreaView edges={['top']} style={styles.heroOverlay}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color={colors.text} />
          </Pressable>
        </SafeAreaView>
        <View style={styles.heroBottomOverlay}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{STATUS_LABEL[tour.status]}</Text>
          </View>
          <Text style={styles.heroTitle}>{tour.title}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color={colors.textMuted} />
            <View>
              <Text style={styles.infoLabel}>Destination</Text>
              <Text style={styles.infoValue}>
                {tour.city}, {tour.country}
              </Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={16} color={colors.textMuted} />
            <View>
              <Text style={styles.infoLabel}>Dates</Text>
              <Text style={styles.infoValue}>
                {formatDateShort(tour.startDate)} - {formatDateShort(tour.endDate)}
              </Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="people-outline" size={16} color={colors.textMuted} />
            <View>
              <Text style={styles.infoLabel}>Travelers</Text>
              <Text style={styles.infoValue}>{tour.travelers}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.overview}>{tour.overview}</Text>

        <View style={styles.advisorCard}>
          <View style={styles.advisorHeader}>
            <Ionicons name="document-text-outline" size={16} color={colors.orangeDark} />
            <Text style={styles.advisorTitle}>Notes from your advisor</Text>
          </View>
          <Text style={styles.advisorBody}>{tour.advisorNote}</Text>
        </View>

        <Text style={styles.sectionTitle}>Itinerary</Text>
        {tour.itinerary.map((day, idx) => (
          <ItineraryDayCard key={day.id} day={day} defaultOpen={idx === 0} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  hero: { width: '100%', height: 260 },
  heroOverlay: { position: 'absolute', top: 0, left: 0, right: 0, paddingHorizontal: spacing.md },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  heroBottomOverlay: { position: 'absolute', bottom: spacing.md, left: spacing.md, right: spacing.md },
  badge: {
    backgroundColor: colors.orange,
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 8,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  heroTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
  body: { padding: spacing.md, marginTop: -28 },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: spacing.lg,
  },
  infoRow: { flexDirection: 'row', gap: 6, flex: 1 },
  infoLabel: { ...typography.small, color: colors.textMuted },
  infoValue: { ...typography.h3, fontSize: 13, color: colors.text, marginTop: 1 },
  sectionTitle: { ...typography.h2, color: colors.text, marginBottom: spacing.sm },
  overview: { ...typography.body, color: colors.textMuted, lineHeight: 20, marginBottom: spacing.lg },
  advisorCard: {
    backgroundColor: colors.chipBg,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  advisorHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  advisorTitle: { fontWeight: '700', color: colors.orangeDark, fontSize: 14 },
  advisorBody: { ...typography.body, color: colors.text, lineHeight: 20 },
});
