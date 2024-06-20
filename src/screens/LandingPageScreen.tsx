import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import { RootStackParams } from '../types';

export const LandingPageScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  return (
    <ImageBackground
      source={{
        uri: 'https://i.postimg.cc/K84YQJ7m/056567c716f04a26d3a7fa7e72df2506.jpg',
      }}
      resizeMode="cover"
      style={styles.backgroundImage}>
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>La Mejor App para Reservar Taxis</Text>
        <Text style={styles.subtitle}>
          Únete a nosotros y gestiona todas tus reservas de manera fácil y
          rápida.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonRegister}>
            <Text style={styles.buttonTextRegister}>Registrarme</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.buttonText}>Iniciar Ahora</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomContainer: {
    backgroundColor: '#1D2734',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 45,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#E38800',
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 7,
    alignItems: 'center',
  },
  buttonRegister: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#E38800',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextRegister: {
    color: '#E38800',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
