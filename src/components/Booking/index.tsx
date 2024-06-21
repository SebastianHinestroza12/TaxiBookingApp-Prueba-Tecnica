import React from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import {useAppSelector, useAppDispatch} from '../../Redux/Store/hook';
import {setStatusBookings} from '../../Redux/ReducerConfig/Reducers/Bookings';

export const Booking = () => {
  const {bookings} = useAppSelector(state => state.BookingSlice);
  const dispatch = useAppDispatch();

  const handleConfirmBooking = (id: number) => {
    dispatch(setStatusBookings(id));
    Alert.alert(
      'Reserva Confirmada',
      'Su reserva ha sido confirmada con éxito.',
    );
  };

  return (
    <>
      <Text style={styles.title}>Confirmación de Reserva</Text>
      {bookings.length > 0 ? (
        bookings.map(booking => (
          <View key={booking.id} style={styles.dataContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Id:</Text>
              <Text style={styles.value}>{booking.id}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Origen:</Text>
              <Text style={styles.value}>{booking.origin}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Destino:</Text>
              <Text style={styles.value}>{booking.destination}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Distancia:</Text>
              <Text style={styles.value}>{booking.estimatedDistance} km</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Tiempo Estimado:</Text>
              <Text style={styles.value}>{booking.duration} minutes</Text>
            </View>
            <View style={styles.buttonContainer}>
              {booking.status === 'pending' ? (
                <Button
                  title="Confirmar"
                  onPress={() => handleConfirmBooking(booking.id)}
                  color="#E38800"
                />
              ) : (
                <Button title="Confirmada" color="green" />
              )}
            </View>
          </View>
        ))
      ) : (
        <View style={styles.dataContainer}>
          <Text style={styles.label}>No hay reservas</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  dataContainer: {
    backgroundColor: '#101010',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    color: '#101010',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
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
    color: '#FFF',
  },
  value: {
    fontSize: 16,
    marginLeft: 10,
    color: '#FFF',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
  },
});
