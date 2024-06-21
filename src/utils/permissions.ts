import {PermissionsAndroid, Platform, Alert, Linking} from 'react-native';

/**
 * La función `checkLocationPermission` verifica y devuelve el estado del permiso de ubicación precisa
 * en dispositivos Android.
 * @returns La función `checkLocationPermission` devuelve una Promesa que se resuelve en un valor de
 * cadena. El valor de cadena devuelto puede ser `PermissionsAndroid.RESULTS.DENIED` si no se concede
 * el permiso de ubicación, o `PermissionsAndroid.RESULTS.GRANTED` si se concede el permiso de
 * ubicación.
 */
export const checkLocationPermission = async (): Promise<string> => {
  if (Platform.OS === 'android') {
    const status = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (!status) {
      return PermissionsAndroid.RESULTS.DENIED;
    }
    return PermissionsAndroid.RESULTS.GRANTED;
  }
  return PermissionsAndroid.RESULTS.GRANTED;
};

/**
 * La función `requestLocationPermission` en TypeScript solicita acceso a permisos de ubicación
 * precisos en Android y maneja diferentes resultados de permisos.
 */
export const requestLocationPermission = async (): Promise<void> => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // Permisos Ok
    } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
      console.warn('Location permission denied');
    } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Alert.alert(
        'Permiso de ubicación necesario',
        'La aplicación necesita acceso a tu ubicación. Por favor, habilita los permisos desde la configuración de la aplicación.',
        [
          {text: 'Cancelar', style: 'cancel'},
          {text: 'Abrir Configuración', onPress: () => Linking.openSettings()},
        ],
      );
    }
  }
};
