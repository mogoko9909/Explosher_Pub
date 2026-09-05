import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyToursStackParamList } from './types';
import MyToursScreen from '../screens/MyToursScreen';
import TourDetailScreen from '../screens/TourDetailScreen';

const Stack = createNativeStackNavigator<MyToursStackParamList>();

export default function MyToursStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyToursList" component={MyToursScreen} />
      <Stack.Screen name="TourDetail" component={TourDetailScreen} />
    </Stack.Navigator>
  );
}
