import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
  ActivityIndicator,
  Text,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
  LatLng,
  Region,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {useAppDispatch} from '../Redux/Store/hook';
import {createBooking} from '../Redux/ReducerConfig/Reducers/Bookings';
import {decodePolyline} from '../services/locationService';
import {GOOGLE_MAPS_API_KEY} from '@env';

interface Coordinate extends LatLng {
  latitudeDelta: number;
  longitudeDelta: number;
}

export const HomeScreen = () => {
  const [currentLocation, setCurrentLocation] = useState<Coordinate | null>(
    null,
  );
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [destination, setDestination] = useState<LatLng | null>(null);
  const [destinationAddress, setDestinationAddress] = useState<string | null>(
    null,
  );
  const [route, setRoute] = useState<LatLng[]>([]);
  const [duration, setDuration] = useState<string | null>(null);
  const [distance, setDistance] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    /**
     * La función `checkPermission` busca y solicita acceso a permisos de ubicación
     * finos en Android, mostrando mensajes apropiados según la respuesta del usuario.
     */
    const checkPermission = async () => {
      if (Platform.OS === 'android') {
        const status = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (!status) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getLocation();
          } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
            console.warn('Location permission denied');
          } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            Alert.alert(
              'Permiso de ubicación necesario',
              'La aplicación necesita acceso a tu ubicación. Por favor, habilita los permisos desde la configuración de la aplicación.',
              [
                {
                  text: 'Cancelar',
                  style: 'cancel',
                },
                {
                  text: 'Abrir Configuración',
                  onPress: () => Linking.openSettings(),
                },
              ],
            );
          }
        } else {
          getLocation();
        }
      } else {
        getLocation();
      }
    };

    /**
     * La función `getLocation` recupera las coordenadas de geolocalización actuales, establece el
     * estado de la ubicación y recupera la dirección en función de las coordenadas.
     */
    const getLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          const location: Coordinate = {
            latitude,
            longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          };
          setCurrentLocation(location);
          fetchAddress(location, setCurrentAddress);
        },
        error => {
          console.error(error);
          Alert.alert(
            'Error al obtener ubicación',
            'No se pudo obtener la ubicación. Por favor, asegúrate de que los servicios de ubicación estén habilitados y vuelve a intentarlo.',
          );
        },
        {enableHighAccuracy: true, timeout: 30000, maximumAge: 10000},
      );
    };

    checkPermission();
  }, []);

  useEffect(() => {
    if (currentLocation && destination) {
      fetchRoute(currentLocation, destination);
      fetchAddress(destination, setDestinationAddress);
    }
  }, [currentLocation, destination]);

  /**
   * La función fetchAddress es una función asincrónica que recupera la dirección correspondiente a una
   * latitud y longitud determinadas utilizando la API de codificación geográfica de Google Maps y
   * actualiza el estado de la dirección en un componente de React.
   * @param {LatLng} location - El parámetro "ubicación" es de tipo "LatLng", que probablemente
   * representa una ubicación geográfica con coordenadas de latitud y longitud.
   * @param setAddress - El parámetro `setAddress` es una función que le permite actualizar el estado de
   * una dirección en un componente de React. Es una función `React.Dispatch` que toma
   * `React.SetStateAction` como argumento. Esta función se utiliza normalmente para actualizar el
   * estado de un componente con el valor obtenido
   */
  const fetchAddress = async (
    location: LatLng,
    setAddress: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/geocode/json',
        {
          params: {
            latlng: `${location.latitude},${location.longitude}`,
            key: GOOGLE_MAPS_API_KEY,
          },
        },
      );
      const address = response.data.results[0]?.formatted_address;
      setAddress(address || 'Dirección no disponible');
    } catch (error) {
      console.error(error);
      setAddress('Error al obtener dirección');
    }
  };

  /**
   * La función busca una ruta utilizando la API de direcciones de Google Maps en función de la ubicación
   * actual y el destino proporcionado.
   * @param {LatLng} currentLocationData - El parámetro `currentLocationData` es un objeto que contiene
   * las coordenadas de latitud y longitud de la ubicación actual. Tiene la siguiente estructura:
   * @param {LatLng} destinationData - El parámetro `destinationData` en la función `fetchRoute`
   * representa las coordenadas de latitud y longitud del destino donde desea buscar la ruta. Es de tipo
   * "LatLng", que normalmente contiene los valores de latitud y longitud de una ubicación en el mapa.
   */
  const fetchRoute = async (
    currentLocationData: LatLng,
    destinationData: LatLng,
  ) => {
    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/directions/json',
        {
          params: {
            origin: `${currentLocationData.latitude},${currentLocationData.longitude}`,
            destination: `${destinationData.latitude},${destinationData.longitude}`,
            key: GOOGLE_MAPS_API_KEY,
          },
        },
      );
      const points = decodePolyline(
        response.data.routes[0].overview_polyline.points,
      );
      setRoute(
        points.map(point => ({latitude: point[0], longitude: point[1]})),
      );

      const leg = response.data.routes[0].legs[0];
      setDuration(leg.duration.text);
      setDistance(leg.distance.text);
    } catch (error) {
      console.error(error);
    }
  };

  if (!currentLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={'#E38800'} size={70} />
      </View>
    );
  }

  const handleBookingGenerate = (e: any) => {
    //Actualizar coordenadas
    setDestination(e.nativeEvent.coordinate);
    //Crear la reserva
    const randomNumber = Math.floor(Math.random() * 1000000000) + 1;
    const booking = {
      id: randomNumber,
      status: 'pending',
      origin: currentAddress,
      destination: destinationAddress,
      duration: duration,
      estimatedDistance: distance,
    };
    dispatch(createBooking(booking));
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={currentLocation as Region}
        onPress={e => handleBookingGenerate(e)}>
        <Marker coordinate={currentLocation} title="Ubicación Actual" />
        {destination && <Marker coordinate={destination} title="Destino" />}
        {route.length > 0 && (
          <Polyline coordinates={route} strokeWidth={4} strokeColor="blue" />
        )}
      </MapView>

      <View style={styles.containerInfo}>
        {currentAddress && <Text>Dirección Actual: {currentAddress}</Text>}
        {destinationAddress && (
          <Text>Dirección de Destino: {destinationAddress}</Text>
        )}
        {duration && <Text>Duración Estimada: {duration}</Text>}
        {distance && <Text>Distancia: {distance}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  containerInfo: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#101010',
    alignItems: 'center',
  },
});
