import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Button, CircularProgress, FormHelperText } from '@mui/material';
import {
  GeoPlaceLatLng,
  openSnackBar,
  setGeoPosition,
  useAppDispatch,
  useAppSelector,
} from '@p2p-exchange/core';
import { LocationOn } from '@mui/icons-material';

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = process.env.NX_API_KEY_GOOGLE;

interface FetchLocationProps {
  label?: string;
  location?: GeoPlaceLatLng;
  helperText?: string;
  variant?: 'all' | 'map' | 'field';
  error?: boolean;
  LocationCallback?: ((peoPlaceLatLng: GeoPlaceLatLng) => void) | undefined;
}

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
  description: string;
  structured_formatting?: StructuredFormatting;
  hasLatLng?: boolean;
}
interface AutocompleteService {
  current: null;
}

const autocompleteService: AutocompleteService = { current: null };
let geocoder: any = null;
const libraries: 'places'[] = ['places'];

export default function FetchLocation({
  label = 'Location (zip or city, state)',
  helperText,
  location = { address: '', position: { lat: null, lng: null } },
  error = false,
  LocationCallback = () => {},
  variant = 'all',
}: FetchLocationProps) {
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
  const [selectedLatLng, setSelectedLatLng] = React.useState(null);
  const [locationLoading, setlocationLoading] = React.useState<boolean>(false);
  const defaultErrorMsg =
    'Geolocation API has some issue, please check your browser settings';
  const { latitude, longitude, address } = useAppSelector(
    (state) => state.user.userPosition
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const getLatLng = (value: any) => {
    geocoder.geocode({ address: value }, function (results: any, status: any) {
      // console.log('results', results);
      // console.log('status', status);
      if (status === 'OK' && results.length) {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();

        setSelectedLatLng({ lat, lng });
        LocationCallback({ address: value, position: { lat, lng } });
      }
    });
  };

  const getAddress = (lat: number, lng: number) => {
    if (!geocoder) return;
    geocoder.geocode(
      { location: { lat, lng } },
      function (results: any, status: any) {
        // console.log('Address results', results);
        //  console.log('Address status', status);
        if (status === 'OK' && results.length) {
          const address = results[0]?.formatted_address;
          //    console.log('Address', address);
          setValue({ description: address, hasLatLng: true });
          setSelectedLatLng({ lat, lng });
          LocationCallback({ address, position: { lat, lng } });
          dispatch(setGeoPosition({ latitude: lat, longitude: lng, address }));
        }
      }
    );
  };

  const fetchGeoLocation = () => {
    if (navigator.geolocation) {
      if (latitude && longitude && address) {
        const latlng = { lat: latitude, lng: longitude };
        setValue({ description: address, hasLatLng: true });
        setInputValue('address');
        setSelectedLatLng(latlng);
        LocationCallback({ address, position: latlng });
        return;
      }
      setlocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos: GeolocationPosition) => {
          const { latitude, longitude } = pos.coords;
          setlocationLoading(false);
          getAddress(latitude, longitude);
        },
        (error: GeolocationPositionError) => {
          setlocationLoading(false);
          dispatch(
            openSnackBar({
              message: error?.message || defaultErrorMsg,
              severity: 'error',
            })
          );
        }
      );
    } else {
      dispatch(
        openSnackBar({
          message: defaultErrorMsg,
          severity: 'error',
        })
      );
    }
  };

  const fetch = React.useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback
          );
        },
        400
      ),
    []
  );

  const setLocationState = (address: string, lat: number, lng: number) => {
    setValue({ description: address, hasLatLng: true });
    selectedLatLng({ lat, lng });
    LocationCallback({ address, position: { lat, lng } });
  };

  React.useEffect(() => {
    if (!isLoaded) return;
    if (!geocoder && (window as any).google) {
      geocoder = new (window as any).google.maps.Geocoder();
    }
    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
  }, [isLoaded]);

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      setSelectedLatLng(null);
      LocationCallback({ address: '', position: { lat: 0, lng: 0 } });
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      // console.log('inputValue', inputValue);
      // console.log('results', results);
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (value) {
          newOptions = [value];
          if (!value?.hasLatLng && value.description) {
            getLatLng(value.description);
          }
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });
    if (value) {
      value.description;
    }
    return () => {
      active = false;
    };
  }, [inputValue, fetch]);

  React.useEffect(() => {
    if (location?.address) {
      let hasLatLng = false;
      if (location?.position?.lat && location?.position?.lng) {
        hasLatLng = true;
        setSelectedLatLng({
          lat: location?.position?.lat,
          lng: location?.position?.lng,
        });
      }
      setValue({ description: location.address, hasLatLng });
    }
  }, [location?.address]);

  React.useEffect(() => {
    if (
      variant == 'map' &&
      location?.position &&
      location?.position?.lat &&
      location?.position?.lng
    ) {
      setSelectedLatLng({
        lat: location?.position?.lat,
        lng: location?.position?.lng,
      });
    }
  }, [location?.position]);

  return (
    <>
      {['field', 'all'].includes(variant) && (
        <Autocomplete
          id="google-map-location"
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.description
          }
          filterOptions={(x) => x}
          options={options}
          autoComplete
          includeInputInList
          filterSelectedOptions
          value={value}
          noOptionsText="No locations"
          onChange={(event: any, newValue: PlaceType | null) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setValue(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label={label} fullWidth />
          )}
          renderOption={ListOptions}
        />
      )}

      {['field', 'all'].includes(variant) && helperText && (
        <FormHelperText error={error}> {helperText} </FormHelperText>
      )}
      {['field', 'all'].includes(variant) && (
        <Button
          sx={{ mt: 2 }}
          variant="text"
          onClick={() => {
            fetchGeoLocation();
          }}
        >
          {locationLoading && <CircularProgress size={20} color="primary" />}
          {!locationLoading && <LocationOn color="primary" />}
          <span style={{ paddingLeft: locationLoading ? 9 : 5 }}>
            Use my current location
          </span>
        </Button>
      )}

      {isLoaded && ['map', 'all'].includes(variant) && (
        <Map selectedLatLng={selectedLatLng} />
      )}
    </>
  );
}

function Map({ selectedLatLng }: { selectedLatLng: any }) {
  const center = React.useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const containerStyle = {
    width: '100%',
    height: '400px',
    marginTop: 20,
    marginBottom: 20,
  };

  if (typeof selectedLatLng?.lat === 'string') {
    selectedLatLng.lat = Number(selectedLatLng.lat);
  }

  if (typeof selectedLatLng?.lng === 'string') {
    selectedLatLng.lng = Number(selectedLatLng.lng);
  }

  return (
    <>
      <GoogleMap
        zoom={selectedLatLng ? 15 : 2}
        mapContainerStyle={containerStyle}
        center={selectedLatLng || center}
        mapContainerClassName="map-container"
      >
        {selectedLatLng && <Marker position={selectedLatLng} />}
      </GoogleMap>
    </>
  );
}

const ListOptions = (props: any, option: any) => {
  const matches =
    option.structured_formatting?.main_text_matched_substrings || [];

  const parts = parse(
    option.structured_formatting?.main_text,
    matches.map((match: any) => [match.offset, match.offset + match.length])
  );

  return (
    <li {...props} key={props.key + props.id}>
      <Grid container alignItems="center">
        <Grid item sx={{ display: 'flex', width: 44 }}>
          <LocationOnIcon sx={{ color: 'text.secondary' }} />
        </Grid>
        <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
          {parts.map((part: any, index: number) => (
            <Box
              key={index}
              component="span"
              sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
            >
              {part.text}
            </Box>
          ))}
          <Typography variant="body2" color="text.secondary">
            {option.structured_formatting?.secondary_text}
          </Typography>
        </Grid>
      </Grid>
    </li>
  );
};
