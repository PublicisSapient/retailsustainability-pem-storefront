import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Paper,
  styled,
  TextField,
  Typography,
  Card,
  CardContent,
  Link,
  Autocomplete,
} from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Formik } from 'formik';
import {
  FetchLocation,
  ImageList,
  MultipleFileUploadField,
  PageTitle,
} from '@p2p-exchange/shared';
import { InfoOutlined } from '@mui/icons-material';
import FormHelperText from '@mui/material/FormHelperText';
import * as yup from 'yup';
import Select from './select';
import { GeoLocations, categoryList, offerTypeList } from './data';
import {
  MapCordinates,
  openSnackBar,
  setInfoMsg,
  postNewListing,
  useAppDispatch,
  useAppSelector,
  PostItemForm,
  addProduct,
  GeoLocation,
  updateProduct,
  flushPostItemState,
  GeoPlaceLatLng,
} from '@p2p-exchange/core';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProduct } from 'libs/core/src/lib/store/slices/productSlice';

/* eslint-disable-next-line */

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const PageWrapper = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const containerStyle = {
  width: '100%',
  height: '400px',
};

const onLoad = (marker: any) => {
  console.log('marker: ', marker);
};

export function PostItem() {
  const { itemId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.user?.id);
  const product = useAppSelector((state) => state.product.product);

  const {
    category,
    offerType,
    name,
    description,
    files,
    images,
    price,
    user,
    geoLocation,
    location,
  } = useAppSelector((state) => state.postItem);

  let initialValues: PostItemForm = {
    category: category,
    offerType: offerType,
    name: name,
    description: description,
    geoLocation: {
      address: location,
      position: {
        lat: geoLocation.latitude,
        lng: geoLocation.longitude,
      },
    },
    files: files,
    images: images,
    price: price,
    user: user,
  };

  React.useEffect(() => {
    return () => {
      dispatch(flushPostItemState());
    };
  }, []);

  React.useEffect(() => {
    if (itemId) {
      dispatch(fetchProduct({ id: itemId as string }));
    }
    return () => {
      dispatch(flushPostItemState());
    };
  }, [itemId]);

  React.useEffect(() => {
    if (itemId && product) {
      dispatch(addProduct({ ...initialValues, ...product }));
    }
  }, [product]);

  const fileSchema = yup
    .mixed()
    .test({
      message: 'An image is required',
      test: (val: any) => {
        return val.length !== 0;
      },
    })
    .test({
      message:
        'There could be an error with the uploaded image. Please validate it and upload a proper image!',
      test: (val: any) => {
        return val.filter((i: any) => i.url).length !== 0;
      },
    })
    .test({
      message:
        'You are allowed to upload only five valid images. Please remove any additional images',
      test: (val: any) => {
        return val.filter((i: any) => i.url).length < 6;
      },
    });

  const validationSchema = yup.object({
    category: yup.string().required('Category is required'),
    offerType: yup.string().required('Listing Type is required'),
    name: yup
      .string()
      .max(60, 'Title has a maximum limit of 32 characters.')
      .required('Title is required'),
    geoLocation: yup
      .mixed()
      .test({
        message: 'Location is required',
        test: (val: any) => {
          return !!val.address;
        },
      })
      .test({
        message: 'Latitude and longitude of location is required',
        test: (val: any) => {
          return !!val?.position.lat || !!val?.position.lat;
        },
      }),
    description: yup.string().notRequired(),
    files: !itemId ? fileSchema : yup.array().notRequired(),
    price: yup.number().when('offerType', ([offerType], schema) => {
      return offerType == 'SELL'
        ? schema.required('You must enter Price').test(
          'Is positive?', 
          'The number must be greater than 0', 
          (value) => value > 0
        )
        : schema.notRequired();
    }),
  });

  const handleSubmit = (values: PostItemForm) => {
    const images = values.files
      .filter((image: any) => image.url)
      .map((image: any) => image.url);

    if (!itemId) {
      postNewItem(values, images);
    } else {
      updateItem(values, images);
    }
  };

  const postNewItem = (values: PostItemForm, images: string[]) => {
    dispatch(postNewListing({ ...values, images, user })).then((res: any) => {
      if (res.payload && !res.error) {
        dispatch(
          openSnackBar({
            message: 'Item is successfully submited',
          })
        );
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        dispatch(
          openSnackBar({
            message: 'Something went wrong !',
            severity: 'error',
          })
        );
      }
    });
  };

  const updateItem = (values: PostItemForm, imageList: string[]) => {
    const images = [...values.images, ...imageList];
    dispatch(updateProduct({ ...values, images, user, itemId })).then(
      (res: any) => {
        if (res.payload && !res.error) {
          dispatch(
            openSnackBar({
              message: 'Item is successfully Updated',
            })
          );
          setTimeout(() => {
            navigate('/');
          }, 1000);
        } else {
          dispatch(
            openSnackBar({
              message: 'Something went wrong !',
              severity: 'error',
            })
          );
        }
      }
    );
  };

  // const fetchGeoLocation = (GeoPlaceLatLng:GeoPlaceLatLng) => {
  //   setFieldValue('geoLocation', GeoPlaceLatLng);
  // };
  useEffect(() => {
    if (!currentUser) {
      dispatch(
        setInfoMsg('To post a new listing, please login in to your account.')
      );
      navigate('/signin');
    }
  }, [currentUser]);

  return (
    <>
      <PageTitle title={'Post New Listing'} />

      {/* <FetchLocation /> */}

      <PageWrapper fixed>
        <Grid container spacing={2} justifyContent="center">
          <Grid
            item
            xs={12}
            md={8}
            lg={6}
            sx={{
              '.MuiFormHelperText-root.Mui-error': { position: 'static' },
            }}
          >
            <Typography mb={4} variant="h5">
              Post a new listing
            </Typography>

            <Formik
              initialValues={{
                ...initialValues,
              }}
              enableReinitialize={itemId ? true : false}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                setFieldValue,
                touched,
                handleBlur,
                handleChange,
                submitForm,
                errors,
              }) => (
                <form noValidate>
                  <Select
                    name="category"
                    label="Select Category"
                    options={categoryList}
                  />

                  <Select
                    name="offerType"
                    label="Select Listing Type"
                    options={offerTypeList}
                  />

                  {values.offerType == 'SELL' && (
                    <FormControl sx={{ mb: 3, minWidth: 120, width: '100%' }}>
                      <TextField
                        sx={{ width: '100%' }}
                        type="number"
                        label="Price ($)"
                        name="price"
                        variant="outlined"
                        required
                        inputProps={{min:0}}
                        value={values.price}
                        onChange={handleChange}
                        error={touched.price && Boolean(errors.price)}
                        helperText={touched.price && errors.price}
                      />
                    </FormControl>
                  )}

                  <FormControl sx={{ mb: 3, minWidth: 120, width: '100%' }}>
                    <TextField
                      sx={{ width: '100%' }}
                      type="text"
                      label="Listing Title"
                      name="name"
                      variant="outlined"
                      required
                      value={values.name}
                      onChange={handleChange}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </FormControl>

                  <FormControl sx={{ mb: 3, minWidth: 120, width: '100%' }}>
                    <TextField
                      size="medium"
                      sx={{ width: '100%' }}
                      type="text"
                      label="Detailed Description (optional)"
                      name="description"
                      variant="outlined"
                      multiline
                      onChange={handleChange}
                      value={values.description}
                      minRows={4}
                      maxRows={6}
                    />
                  </FormControl>

                  {/* <Autocomplete
                    value={values.geoLocation} // the part of state what holds the user input
                    options={GeoLocations.length > 0 ? GeoLocations : []} // part of state that holds Autocomplete options
                    getOptionLabel={(option) => option.name || ''}
                    onChange={(_, value) =>
                      setFieldValue(
                        'geoLocation',
                        value || { latitude: null, longitude: null, name: '' }
                      )
                    }
                    onBlur={handleBlur} // so formik can see the forms touched state
                    renderInput={(params) => (
                      <TextField
                        name="geoLocation"
                        {...params}
                        id="geoLocation"
                        value={values.geoLocation}
                        onBlur={handleBlur}
                        label="Location (zip or city, state)"
                        error={
                          touched.geoLocation && Boolean(errors.geoLocation)
                        }
                        helperText={
                          touched.geoLocation && (errors.geoLocation as any)
                        }
                      />
                    )}
                  /> */}

                  <FetchLocation
                    LocationCallback={(GeoPlaceLatLng) => {
                      setFieldValue('geoLocation', GeoPlaceLatLng);
                    }}
                    location={values.geoLocation}
                    error={touched.geoLocation && Boolean(errors.geoLocation)}
                    helperText={
                      touched.geoLocation && (errors.geoLocation as any)
                    }
                  />

                  {/* <Box display={'flex'} mb={2}>
                    <Button
                      variant="text"
                      onClick={() => {
                        fetchGeoLocation(GeoLocations[0], setFieldValue);
                      }}
                    >
                      <LocationOn color="primary" />
                      Use my current location
                    </Button>
                  </Box>

                  <Box mb={2}>
                    <LoadScript
                      googleMapsApiKey={process.env.NX_API_KEY_GOOGLE}
                    >
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        zoom={15}
                        center={mapCordinates.position}
                      >
                        <Marker
                          onLoad={onLoad}
                          position={mapCordinates.position}
                        />
                      </GoogleMap>
                    </LoadScript>
                  </Box> */}
                  <Typography variant="h6">Upload images</Typography>
                  <Typography
                    variant="body2"
                    display="flex"
                    alignItems="center"
                    py={1}
                  >
                    <InfoOutlined />
                    For best results, use 440x550 px images
                  </Typography>

                  <Grid container direction="column">
                    {/* {JSON.stringify(errors)} <br />
                    {JSON.stringify(values)} <br /> */}
                    <FormControl
                      sx={{ minWidth: 120, width: '100%' }}
                      error={touched.files && Boolean(errors.files)}
                    >
                      <MultipleFileUploadField
                        name="files"
                        isEditForm={!!itemId}
                      />
                      {touched.files && (
                        <FormHelperText> {errors.files as any}</FormHelperText>
                      )}

                      {values.images.map((item, index) => (
                        <ImageList key={item} image={item} />
                      ))}
                    </FormControl>
                  </Grid>

                  <Button
                    sx={{ mt: 5 }}
                    fullWidth
                    onClick={submitForm}
                    variant="contained"
                    color="primary"
                  >
                    {!itemId ? 'Post Listing' : 'Update Listing'}
                  </Button>
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </PageWrapper>
    </>
  );
}

export default PostItem;
