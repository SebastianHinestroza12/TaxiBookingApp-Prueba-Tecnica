import React, {useEffect} from 'react';
import { View, StyleSheet, Text , Image} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import {RootStackParams} from '../types';

export const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('LandingPageScreen');
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.containerTaxi}>
          <Image
            source={{
              uri: 'https://i.postimg.cc/R08d1hBC/freepik-minimalist-professional-bitcoin-crypto-logo-20240620063533-Ire-W.png"',
            }}
            width={50}
            height={50}
          />
        </View>
        <Text style={styles.title}>Taxi Booking</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E38800',
    justifyContent: 'center',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTaxi: {
    backgroundColor: '#FFF',
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taxiContent: {
    fontSize: 50,
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingTop: 10,
  },
});
