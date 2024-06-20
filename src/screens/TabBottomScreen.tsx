import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './HomeScreen';
import { BookingScreen} from './BookingScreen';
import {ProfileScreen } from './ProfileScreen';

const Tab = createBottomTabNavigator();

export const TabBottomScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#E38800',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#101010',
        },
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Booking" component={BookingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

