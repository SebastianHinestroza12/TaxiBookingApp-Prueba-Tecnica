/* eslint-disable no-bitwise */
/**
 * La función `decodePolyline` decodifica una cadena de polilínea codificada en una matriz de
 * coordenadas de latitud y longitud con una precisión especificada.
 * @param {string} encoded - El parámetro "codificado" en la función "decodePolyline" es una cadena que
 * representa los datos de polilínea codificados que deben decodificarse en coordenadas de latitud y
 * longitud. Esta cadena codificada contiene una serie de caracteres que codifican las coordenadas.
 * @param {number} [precision=5] - El parámetro `precision` en la función `decodePolyline` determina el
 * número de decimales que se utilizarán para las coordenadas de latitud y longitud después de
 * decodificar la polilínea. El valor predeterminado es 5 si no se proporciona explícitamente. Este
 * parámetro se utiliza para dividir los valores decodificados por un factor de 10 elevado al
 * @returns La función `decodePolyline` devuelve una matriz de matrices que contienen coordenadas de
 * latitud y longitud. Cada par de coordenadas se decodifica a partir de la cadena codificada
 * proporcionada utilizando un valor de precisión específico.
 */
export const decodePolyline = (
  encoded: string,
  precision: number = 5,
): number[][] => {
  let index = 0;
  let lat = 0;
  let lng = 0;
  const coordinates: number[][] = [];
  const factor = Math.pow(10, precision);

  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    let byte = null;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += deltaLat;

    shift = 0;
    result = 0;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += deltaLng;

    coordinates.push([lat / factor, lng / factor]);
  }

  return coordinates;
};
