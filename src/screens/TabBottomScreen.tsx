/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from './HomeScreen';
import {BookingScreen} from './BookingScreen';
import {ProfileScreen} from './ProfileScreen';
import {Button} from 'react-native';
import {useAppDispatch} from '../Redux/Store/hook';
import {setAuthenticated} from '../Redux/ReducerConfig/Reducers/Aunthenticated';

const Tab = createBottomTabNavigator();

export const TabBottomScreen = ({navigation}: any) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(setAuthenticated(null));
    navigation.navigate('LoginScreen');
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#E38800',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#101010',
        },
      }}>
      <Tab.Screen
        options={{
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
        name="Map"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
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
        name="Booking"
        component={BookingScreen}
      />
      <Tab.Screen
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          },
          headerRight: () => (
            <Button onPress={handleLogout} title="Logout" color="#E38800" />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};
