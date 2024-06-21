import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useAppSelector} from '../Redux/Store/hook';

export const ProfileScreen = () => {
  const {users, authenticatedUser} = useAppSelector(
    state => state.AuthenticatedSlice,
  );

  const userAuthenticated = users.find(data => data.id === authenticatedUser);

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
  profileItem: {
    width: '100%',
    backgroundColor: '#f5F5F5',
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
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
});
