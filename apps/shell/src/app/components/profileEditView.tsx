import React from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  FormControl,
  TextField,
  Link,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonIcon from '@mui/icons-material/Person';
import Divider from '@mui/material/Divider';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  openSnackBar,
  globalTheme as theme,
  updateProfileInfo,
  uploadProfilePic,
  useAppDispatch,
  useAppSelector,
  getUserLogout,
  flushProfileState,
} from '@p2p-exchange/core';
import { FetchLocation, getUserLocation } from '@p2p-exchange/shared';
import DefaultAvatar from '../../assets/defaultprofile.svg';
import { UploadFile } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { Formik } from 'formik';
import {
  validateFileSize,
  validateFileExtension,
  profileValidationSchema,
} from '../utils/helperFunction';
import { useNavigate } from 'react-router-dom';

const profileEditView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    firstName,
    lastName,
    email,
    phoneno,
    profileImage,
    location,
    description,
    socialUrls,
    imageApiErrorText,
    error,
  } = useAppSelector((state) => state.profile);
  const currentUserId = useAppSelector((state) => state.user.id);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = React.useState<string | null>(null);
  const [uploadTimeError, setError] = React.useState<string | null>(null);
  const [isProfileUpdated, setProfileUpdated] = React.useState<any>(null);

  let initialValues = {
    fname: firstName,
    lname: lastName,
    userName: email,
    mNumber: phoneno,
    sLink: socialUrls.length > 0 ? socialUrls[0] : '',
    location: location,
    description: description,
  };

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length !== 1) {
      setError('Only one file can be uploaded.');
    } else {
      const file = acceptedFiles[0];
      if (!validateFileSize(file)) {
        setError('File size exceeds the limit (3 MB).');
      } else if (!validateFileExtension(file)) {
        setError('Only SVG, PNG, JPG, or GIF files can be uploaded.');
      } else {
        setSelectedFile(file);
        setError(null);
        const imageUrl = URL.createObjectURL(file);
        setUploadedImage(imageUrl);
      }
    }
  }, []);

  const handleSubmit = <T extends typeof initialValues>(values: T) => {
    if (
      uploadedImage === profileImage &&
      JSON.stringify(values) === JSON.stringify(initialValues)
    )
      return;
    let socialUrl = values.sLink.replace(/^https?:\/\//, '');
    const apiPayload = {
      firstName: values.fname,
      lastName: values.lname,
      phoneno: values.mNumber,
      description: values.description,
      location: values.location,
      profileImage: uploadedImage,
      socialUrls: [socialUrl],
    };

    const handleProfileUpdate = () => {
      if (JSON.stringify(apiPayload) !== JSON.stringify(isProfileUpdated))
        dispatch(updateProfileInfo(apiPayload)).then((res: any) => {
          if (res.payload && !res.error) {
            dispatch(openSnackBar({ message: 'Profile Updated' }));
            setProfileUpdated(apiPayload);
          }
        });
    };

    if (uploadedImage !== profileImage && uploadedImage) {
      dispatch(uploadProfilePic(selectedFile)).then((res: any) => {
        if (res.payload && !res.error) {
          apiPayload.profileImage = res.payload as string;
          handleProfileUpdate();
        }
      });
    } else {
      handleProfileUpdate();
    }
  };

  const handlePicDelete = () => {
    setUploadedImage('');
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  React.useEffect(() => {
    setUploadedImage(profileImage);
  }, [profileImage]);

  React.useEffect(() => {
    if (error)
      dispatch(
        openSnackBar({
          message: error,
          severity: 'error',
        })
      );
    if (error === 'User Not Logged In')
      setTimeout(() => {
        dispatch(getUserLogout());
      }, 1000);
  }, [error]);

  React.useEffect(() => {
    return () => {
      dispatch(flushProfileState());
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Formik
        initialValues={initialValues}
        validationSchema={profileValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
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
          <>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(`/profile/${currentUserId}`)}
              startIcon={<PersonIcon />}
            >
              View Profile
            </Button>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h5" color="initial" sx={{ mb: 2 }}>
              Profile Info
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <TextField
                    type="text"
                    label="First Name"
                    name="fname"
                    variant="outlined"
                    required
                    fullWidth
                    value={values.fname}
                    onChange={handleChange}
                    error={touched.fname && Boolean(errors.fname)}
                    helperText={touched.fname && errors.fname}
                    inputProps={{
                      maxLength: 30,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <TextField
                    type="text"
                    label="Last Name"
                    name="lname"
                    variant="outlined"
                    required
                    fullWidth
                    value={values.lname}
                    onChange={handleChange}
                    error={touched.lname && Boolean(errors.lname)}
                    helperText={touched.lname && errors.lname}
                    inputProps={{
                      maxLength: 30,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <TextField
                    type="text"
                    label="User Name"
                    name="userName"
                    variant="outlined"
                    disabled
                    fullWidth
                    value={values.userName}
                    onChange={handleChange}
                    error={touched.userName && Boolean(errors.userName)}
                    helperText={touched.userName && errors.userName}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <TextField
                    type="text"
                    label="Mobile Number"
                    name="mNumber"
                    variant="outlined"
                    required
                    fullWidth
                    value={values.mNumber}
                    onChange={handleChange}
                    error={touched.mNumber && Boolean(errors.mNumber)}
                    helperText={touched.mNumber && errors.mNumber}
                    inputProps={{
                      maxLength: 10,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    type="text"
                    label="Social Media Link or Website URL"
                    name="sLink"
                    variant="outlined"
                    fullWidth
                    value={values.sLink}
                    onChange={handleChange}
                    inputProps={{
                      maxLength: 30,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {/* <FormControl fullWidth>
                  <TextField
                    type="text"
                    label="Location (zip or city, state)"
                    name="location"
                    variant="outlined"
                    fullWidth
                    value={values.location}
                    onChange={handleChange}
                  />
                  <Box sx={{ mt: 1, display: 'flex' }}>
                    <Button
                      variant="text"
                      onClick={() => getUserLocation(dispatch)}
                      sx={{
                        '&.MuiButtonBase-root:hover': {
                          bgcolor: 'transparent',
                        },
                      }}
                    >
                      <LocationOnIcon color="primary" />
                      <Typography
                        variant="body2"
                        color="primary"
                        sx={{
                          textTransform: 'none',
                        }}
                      >
                        Use my current location
                      </Typography>
                    </Button>
                  </Box>
                </FormControl> */}

                <FetchLocation
                  variant="field"
                  location={{ address: values.location, position: null }}
                  LocationCallback={(geoPlaceLatLng) => {
                    setFieldValue('geoLocation', geoPlaceLatLng?.address);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    type="text"
                    label="About You (Description in 1000 charecters)"
                    name="description"
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={4}
                    maxRows={6}
                    value={values.description}
                    onChange={handleChange}
                    inputProps={{
                      maxLength: 1000,
                    }}
                    error={touched.description && Boolean(errors.description)}
                  />
                </FormControl>
                <Typography
                  variant="body1"
                  color={
                    touched.description && Boolean(errors.description)
                      ? 'error'
                      : theme.palette.grey[500]
                  }
                  sx={{ mx: 1.5 }}
                >
                  {values.description ? values.description.length : 0}/1000
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="h5" color="initial" sx={{ mt: 3 }}>
              Profile Picture
            </Typography>
            <Box sx={{ my: 2, display: 'flex' }}>
              <InfoOutlinedIcon sx={{ mr: 0.7 }} />
              <Typography variant="body2" color="initial">
                For best results, use images with square format (1:1 ratio), for
                example 800x800 pixels. Otherwise it will be cropped to fit.
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                mb: 3.5,
                gap: '16px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 1.5,
                  pb: 0,
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: '150px',
                    width: '150px',
                    mb: 1.5,
                    borderRadius: '50%',
                    ...((imageApiErrorText || uploadTimeError) && {
                      border: `2px solid ${theme.palette.error.main}`,
                    }),
                  }}
                  src={uploadedImage || DefaultAvatar}
                />
                {uploadedImage && (
                  <Link
                    component="button"
                    onClick={handlePicDelete}
                    variant="body2"
                    sx={{ mx: 2 }}
                  >
                    Remove Picture
                  </Link>
                )}
              </Box>
              <Box
                {...getRootProps()}
                sx={{
                  border: `1px dashed ${
                    imageApiErrorText || uploadTimeError
                      ? theme.palette.error.main
                      : 'rgba(0, 0, 0, 0.87)'
                  }`,
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  width: '100%',
                  minHeight: '152px',
                }}
              >
                <input {...getInputProps()} />
                <UploadFile color="primary" sx={{ mb: 2 }} />
                <Box textAlign="center">
                  <Link component="button">Click to upload </Link>
                  <Typography display="inline" variant="body1">
                    {' '}
                    or drag and drop
                  </Typography>
                </Box>
                <Typography
                  textAlign="center"
                  variant="subtitle2"
                  sx={{ mt: 1 }}
                >
                  SVG, PNG, JPG or GIF (max. 3MB)
                </Typography>
                <Box
                  sx={{
                    position: 'relative',
                    bottom: { xs: '-40px', sm: '-60px' },
                    display: 'flex',
                    alignSelf: 'baseline',
                  }}
                >
                  <Typography variant="body2" color="error">
                    {imageApiErrorText || uploadTimeError}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: '24px',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={submitForm}
                fullWidth
              >
                Save Information
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={() => navigate(`/profile/${currentUserId}`)}
                startIcon={<PersonIcon />}
              >
                View Profile
              </Button>
            </Box>
          </>
        )}
      </Formik>
    </Box>
  );
};

export default profileEditView;
