import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Booking} from '../components/Booking';

export const BookingScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Booking />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
});
