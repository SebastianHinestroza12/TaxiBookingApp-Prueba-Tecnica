/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from './HomeScreen';
import {BookingScreen} from './BookingScreen';
import {ProfileScreen} from './ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export const TabBottomScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: () => {
          let iconName: string = '';

          if (route.name === 'Mapa') {
            iconName = 'map';
          } else if (route.name === 'Reservas') {
            iconName = 'calendar';
          } else if (route.name === 'Perfil') {
            iconName = 'user';
          }

          return <Icon name={iconName} size={30} color={'#FFF'} />;
        },
        tabBarActiveTintColor: '#E38800',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#101010',
          height: 65,
        },
      })}>
      <Tab.Screen name="Mapa" component={HomeScreen} />
      <Tab.Screen name="Reservas" component={BookingScreen} />
      <Tab.Screen
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          },
        }}
        name="Perfil"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};
