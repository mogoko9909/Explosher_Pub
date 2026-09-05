import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RootTabParamList } from './types';
import { colors } from '../theme/theme';
import HomeScreen from '../screens/HomeScreen';
import MyToursStack from './MyToursStack';
import MapStack from './MapStack';
import ContactScreen from '../screens/ContactScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

const ICONS: Record<keyof RootTabParamList, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  MyTours: { active: 'map', inactive: 'map-outline' },
  Map: { active: 'globe', inactive: 'globe-outline' },
  Contact: { active: 'chatbubble-ellipses', inactive: 'chatbubble-ellipses-outline' },
  Profile: { active: 'person', inactive: 'person-outline' },
};

const LABELS: Record<keyof RootTabParamList, string> = {
  Home: 'Home',
  MyTours: 'My Tours',
  Map: 'Map',
  Contact: 'Contact',
  Profile: 'Profile',
};

export default function RootTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.orange,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabel: LABELS[route.name as keyof RootTabParamList],
        tabBarIcon: ({ color, focused, size }) => (
          <Ionicons
            name={focused ? ICONS[route.name as keyof RootTabParamList].active : ICONS[route.name as keyof RootTabParamList].inactive}
            color={color}
            size={size}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="MyTours" component={MyToursStack} />
      <Tab.Screen name="Map" component={MapStack} />
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
