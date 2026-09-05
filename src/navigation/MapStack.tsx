import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MapStackParamList } from './types';
import MapScreen from '../screens/MapScreen';
import TourDetailScreen from '../screens/TourDetailScreen';

const Stack = createNativeStackNavigator<MapStackParamList>();

export default function MapStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MapView" component={MapScreen} />
      <Stack.Screen name="TourDetail" component={TourDetailScreen} />
    </Stack.Navigator>
  );
}
