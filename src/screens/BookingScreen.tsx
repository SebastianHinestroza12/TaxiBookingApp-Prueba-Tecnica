import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';

export const BookingScreen = () => {
  const [routeInfo, setRouteInfo] = useState({
    distance: '15 km',
    estimatedTime: '25 mins',
  });
  console.log(setRouteInfo);
  const handleConfirmBooking = () => {
    Alert.alert(
      'Reserva Confirmada',
      'Su reserva ha sido confirmada con éxito.',
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmación de Reserva</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Distancia:</Text>
        <Text style={styles.value}>{routeInfo.distance}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Tiempo Estimado:</Text>
        <Text style={styles.value}>{routeInfo.estimatedTime}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Confirmar Reserva"
          onPress={handleConfirmBooking}
          color="#E38800"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    marginTop: 30,
    width: '80%',
  },
});
