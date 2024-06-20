import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export const HomeScreen = () => {
  return (
    <View style={ styles.homeBackground}>
      <Text>HomeScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  homeBackground: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
