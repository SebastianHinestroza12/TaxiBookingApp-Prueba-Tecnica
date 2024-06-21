/* eslint-disable no-bitwise */
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
