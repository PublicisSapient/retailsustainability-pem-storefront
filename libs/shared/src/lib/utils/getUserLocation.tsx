import { setGeoPosition, setGeoPositionError } from '@p2p-exchange/core';
import { Dispatch } from 'redux';
import { getGeocodeAddress } from './getGeocode';
export const getUserLocation = (dispatch: Dispatch<any>) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        const { latitude, longitude } = pos.coords;
        getGeocodeAddress(latitude, longitude).then((address) => {
          dispatch(setGeoPosition({ latitude, longitude, address }));
        });
      },
      (error: GeolocationPositionError) => {
        dispatch(setGeoPositionError(error.message));
      }
    );
  } else {
    dispatch(
      setGeoPositionError('Geolocation is not supported by this browser.')
    );
  }
};
