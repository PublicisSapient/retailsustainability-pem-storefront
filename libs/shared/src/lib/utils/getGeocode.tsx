import axios from 'axios';

export const getGeocodeAddress = async (lat: number, long: number) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${'AIzaSyCUMfi4OQnxVWweWBTAkp7-hy5lV203cFY'}`
    );
    return response.data.results[0]?.formatted_address;
  } catch (error) {
    throw error;
  }
};
