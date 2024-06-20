import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { LandingPageScreen } from '../screens/LandingPageScreen';
import { SplashScreen} from '../screens/SplashScreen';
import { RootStackParams } from '../types';
import { TabBottomScreen } from '../screens/TabBottomScreen';

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#fff',
        },
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: 'transparent',
          elevation: 0,
        },
      }}>
      <Stack.Screen
        name="LandingPageScreen"
        options={{}}
        component={LandingPageScreen}
      />
      <Stack.Screen name="SplashScreen" options={{}} component={SplashScreen} />
      <Stack.Screen name="LoginScreen" options={{}} component={LoginScreen} />
      <Stack.Screen
        name="TabBottomScreen"
        options={{}}
        component={TabBottomScreen}
      />
    </Stack.Navigator>
  );
};
