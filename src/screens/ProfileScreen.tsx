import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Profile} from '../components/Profile';

export const ProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Profile />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFF',
  },
});
