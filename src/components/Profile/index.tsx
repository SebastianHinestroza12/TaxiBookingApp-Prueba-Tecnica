import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useAppSelector} from '../../Redux/Store/hook';

export const Profile = () => {
  const {users, authenticatedUser} = useAppSelector(
    state => state.AuthenticatedSlice,
  );

  const userAuthenticated = users.find(data => data.id === authenticatedUser);

  return (
    <>
      {userAuthenticated ? (
        <>
          <View style={styles.profileItem}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.value}>{userAuthenticated.name}</Text>
          </View>

          <View style={styles.profileItem}>
            <Text style={styles.label}>Apellido:</Text>
            <Text style={styles.value}>{userAuthenticated.lastName}</Text>
          </View>

          <View style={styles.profileItem}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{userAuthenticated.email}</Text>
          </View>

          <View style={styles.profileItem}>
            <Text style={styles.label}>Número de Teléfono:</Text>
            <Text style={styles.value}>{userAuthenticated.phoneNumber}</Text>
          </View>

          <View style={styles.profileItem}>
            <Text style={styles.label}>Edad:</Text>
            <Text style={styles.value}>{userAuthenticated.age}</Text>
          </View>
        </>
      ) : (
        <Text>No user authenticated</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  profileItem: {
    width: '100%',
    backgroundColor: '#101010',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  value: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 5,
  },
});
