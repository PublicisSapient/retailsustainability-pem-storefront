import {
  Avatar,
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  Popover,
  Typography,
  styled,
  useMediaQuery,
  IconButton,
  Divider,
} from '@mui/material';
import {
  MapCordinates,
  openSnackBar,
  setCategoryFilter,
  setSortByOption,
  useAppDispatch,
  useAppSelector,
} from '@p2p-exchange/core';
import {
  CardCarousel,
  ChatArea,
  FetchLocation,
  SocialShare,
} from '@p2p-exchange/shared';
import React from 'react';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

import {
  fetchProduct,
  removeProduct,
} from 'libs/core/src/lib/store/slices/productSlice';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { flushProductState } from 'libs/core/src/lib/store/slices/productSlice';
import CloseIcon from '@mui/icons-material/Close';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';

type DataItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  offerType: string;
  images: string[];
  geoLocation: {
    latitude: string;
    longitude: string;
  };
  user: string;
  createdTime: string;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const containerStyle = {
  width: '100%',
  height: '400px',
};

const onLoad = (marker: any) => {
  console.log('marker: ', marker);
};

const productDetailWrapper = () => {
  const dispatch = useAppDispatch();
  const newlyAdded = useAppSelector((state) => state.newlyAdded);
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const navigate = useNavigate();

  const match = useMatch('/product/:id');
  const productId = match?.params.id;

  const productState = useAppSelector((state) => state.product);
  const user = useAppSelector((state) => state.user);

  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);
  const [address, setAddress] = React.useState('');
  const [mapCordinates, setMapCordinates] = React.useState<MapCordinates>({
    position: { lat: latitude as number, lng: longitude as number },
    location: address,
  });

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchProduct({ id: productId as string })).then((res) => {
      const response = res.payload as any;
      setMapCordinates({
        position: {
          lat: Number(response.data.product.geoLocation.latitude),
          lng: Number(response.data.product.geoLocation.longitude),
        },
        location: address,
      });
    });
    return () => {
      dispatch(flushProductState());
    };
  }, []);

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${mapCordinates.position.lat},${mapCordinates.position.lng}`;
    window.open(url);
  };

  const handleRemoveProduct = () => {
    setAnchorEl(null);
    dispatch(removeProduct({ id: productId as string })).then((res) => {
      dispatch(
        openSnackBar({
          message: 'Product Removed Successfully',
        })
      );
      navigate('/');
    });
  };

  //Popper
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const StyledPopover = styled(Popover)(({ theme }) => ({
    '& .MuiPaper-root': {
      backgroundColor: '#fff',
      marginTop: '10px',
      padding: '5px',
    },
    ':after': {
      content: '""',
      position: 'absolute',
      top: '-10px',
      left: '50%',
      width: '10px',
      height: '10px',
      background: 'red',
      borderLeft: '1px solid #fffff',
      borderRight: '1px solid #fffff',
      borderBottom: '1px solid #fffff',
    },
  }));
  const openPopover = Boolean(anchorEl);
  const id = openPopover ? 'simple-popover' : undefined;

  //Scroll Element
  const [marginTop, setMarginTop] = React.useState(0);
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 68) {
        setMarginTop(scrollTop - 60);
      } else {
        setMarginTop(0);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClickProductCategoryLink = () => {
    dispatch(setCategoryFilter([productState.product.category.toLowerCase()]));
    dispatch(setSortByOption('Date'));
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const [openChatBox, setOpenChatBox] = React.useState(false);
  const [openShareBox, setOpenShareBox] = React.useState(false);
  const handleEditListing = () => {
    navigate(`/post-item/edit/${productState.product.id}`);
  };

  const handleSendNotification = () => {
    setOpenChatBox(true);
  };
  const handleClose = () => {
    setOpenChatBox(false);
    setOpenShareBox(false);
  };
  const handleCallback = (result: any) => {
    // console.log(result);
    dispatch(
      openSnackBar({
        message: 'Message sent Successfully, Check inbox to see seller message',
      })
    );
    setOpenChatBox(false);
    // setTimeout(() => {
    //   navigate(`/inbox/${productState.user.id}/${productState.product.id}`);
    // },1000)
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        background: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '8px',
          width: '100%',
        }}
      >
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '500',
            marginTop: '24px',
            marginLeft: isSmallScreen ? '10px' : '425px',
          }}
        >
          <Link to="/" style={{ textDecoration: 'none' }}>
            Home
          </Link>{' '}
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '500',
            marginTop: '24px',
          }}
        >
          /
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '500',
            marginTop: '24px',
          }}
        >
          <Link
            to="/product/shop"
            style={{ textDecoration: 'none' }}
            onClick={handleClickProductCategoryLink}
          >
            {capitalizeFirstLetter(productState.product.category)}
          </Link>
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '500',
            marginTop: '24px',
          }}
        >
          /
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '500',
            marginTop: '24px',
          }}
        >
          {productState.product.name}
        </Typography>
      </Box>

      <Grid
        sx={{
          marginTop: '24px',
          paddingBottom: '68px',
        }}
        container
      >
        <Grid
          sx={{
            display: 'flex',
          }}
          item
          md={7}
          xs={12}
        >
          <Box
            sx={{
              display: 'flex',
              width: isSmallScreen ? '100%' : '662px',
              height: '476px',
              background: '#fff',
              marginLeft: 'auto',
              marginRight: !isSmallScreen ? '24px' : '0px',
              transition: 'margin-top 0s ease-in-out',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'sticky',
              top: '130px',
            }}
          >
            {productState.product.images.length > 0 && (
              <CardCarousel
                itemLength={productState.product.images.length}
                slidesToDisplay={1}
                isPdp={true}
              >
                {productState.product.images.map(
                  (image: string, index: number) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          width: '100% !important',
                          height: '100% !important',
                          display: 'flex !important',
                          justifyContent: 'center !important',
                          alignItems: 'center !important',
                        }}
                      >
                        <img
                          style={{
                            width: '320px',
                            height: '400px',
                            objectFit: 'revert',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          src={image}
                        />
                      </Box>
                    );
                  }
                )}
              </CardCarousel>
            )}
          </Box>
        </Grid>
        <Grid
          item
          container
          md={5}
          sx={{
            display: 'flex',
          }}
          gap={1}
        >
          <Grid item md={12} xs={12}>
            <Box
              sx={{
                display: 'flex',
                width: isSmallScreen ? '100%' : '466px',
                background: '#fff',
                padding: '24px 16px 24px 16px',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  sx={{ fontSize: '24px', fontWeight: '500', width: '270px' }}
                >
                  {productState.product.name}
                </Typography>
                <Box
                  sx={{
                    width: '65px',
                    display: 'flex',
                    mr: 1,
                    justifyContent: 'flex-end',
                  }}
                >
                  {/* <FavoriteBorderIcon
                    sx={{
                      color: '#0A0B11',
                      scale: '1.2',
                      cursor: 'pointer',
                      ':hover': {
                        color: '#fc2b4e',
                      },
                    }}
                  /> */}
                  <IconButton
                    onClick={() => setOpenShareBox(true)}
                    aria-label="social share"
                  >
                    <ShareOutlinedIcon
                      sx={{ color: '#0A0B11', scale: '1.2', cursor: 'pointer' }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: '12px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '20px',
                    fontWeight: '500',
                    color: 'rgba(0, 0, 0, 0.87)',
                    marginTop: '12px',
                  }}
                >
                  $ {parseFloat(productState.product.price).toFixed(2)}
                </Typography>
                <Box
                  sx={{
                    padding: '8px 12px',
                    width: '105px',
                    height: '38px',
                    background: '#F5F5F5',
                    border: '1px solid #E0E0E0',
                    borderRadius: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '400',
                      color: 'rgba(0, 0, 0, 0.87)',
                    }}
                  >
                    {productState.product.offerType}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #f5f5f5',
                  marginTop: '20px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '400',
                    color: '#575757',
                    marginTop: '17px',
                  }}
                >
                  {productState.product.location}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '400',
                    color: '#575757',
                    marginTop: '17px',
                  }}
                >
                  {new Date(
                    productState.product.createdTime
                  ).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item md={12} xs={12}>
            <Box
              sx={{
                display: 'flex',
                width: isSmallScreen ? '100%' : '466px',
                minHeight: '132px',
                height: 'auto',
                background: '#fff',
                padding: '24px 16px 24px 16px',
                flexDirection: 'column',
              }}
            >
              <Typography
                sx={{
                  fontSize: '24px',
                  fontWeight: '500',
                  color: '#000000',
                }}
              >
                Description
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#575757',
                  marginTop: '12px',
                }}
              >
                {productState.product.description}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={12} xs={12}>
            <Box
              sx={{
                display: 'flex',
                width: isSmallScreen ? '100%' : '466px',
                background: '#fff',
                padding: '24px 16px 24px 16px',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Avatar
                      sx={{
                        width: '40px',
                        height: '40px',
                        background: '#C4C4C4',
                        cursor: 'pointer',
                      }}
                      onClick={() =>
                        navigate(`/profile/${productState.user.id}`)
                      }
                    />
                    <Typography
                      sx={{
                        fontSize: '20px',
                        fontWeight: '500',
                        color: '#0A4894',
                        marginLeft: '8px',
                        marginTop: '2px',
                        cursor: 'pointer',
                      }}
                      onClick={() =>
                        navigate(`/profile/${productState.user.id}`)
                      }
                    >
                      {productState.user.firstName} {productState.user.lastName}
                    </Typography>
                  </Box>
                  {/* <Box
                    sx={{
                      display: 'flex',
                      padding: '8px 12px',
                      width: '79px',
                      height: '42px',
                      border: '1px solid #E0E0E0',
                      borderRadius: '50px',
                      gap: '8px',
                      cursor: 'pointer',
                    }}
                    onClick={() => navigate(`/profile/${productState.user.id}`)}
                  >
                    <StarOutlinedIcon sx={{ color: '#0A4894' }} />
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: '600',
                        color: 'rgba(0, 0, 0, 0.87)',
                      }}
                    >
                      {productState.avgRating}
                    </Typography>
                  </Box> */}
                </Box>
                <Box sx={{ width: '100%', display: 'flex', gap: '6px' }}>
                  {productState.user.id !== user.id && (
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        gap: '6px',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Button
                        disabled={!user.id}
                        variant="outlined"
                        sx={{
                          width:
                            productState.user.id === user.id ? '50%' : '100%',
                          height: '38px',
                          borderRadius: '5px',
                          color: '#0A4894',
                          marginTop: '29px',
                        }}
                        onClick={handleSendNotification}
                      >
                        Chat With Seller
                      </Button>
                      {!user.id && (
                        <Typography
                          sx={{ fontSize: '16px', textDecoration: 'none' }}
                        >
                          <Link to="/signin">Sign in</Link> to chat with the
                          seller
                        </Typography>
                      )}
                    </Box>
                  )}

                  {productState.user.id === user.id && (
                    <>
                      <Button
                        variant="outlined"
                        sx={{
                          width: '50%',
                          height: '38px',
                          borderRadius: '5px',
                          color: '#0A4894',
                          marginTop: '29px',
                        }}
                        onClick={handleEditListing}
                      >
                        Edit Listing
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{
                          width: '50%',
                          height: '38px',
                          borderRadius: '5px',
                          color: '#0A4894',
                          marginTop: '29px',
                        }}
                        onClick={handleClickPopover}
                      >
                        Remove
                      </Button>
                      <StyledPopover
                        id={id}
                        open={openPopover}
                        anchorEl={anchorEl}
                        onClose={handleClosePopover}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                      >
                        <Typography sx={{ p: 2 }}>Are you sure?</Typography>
                        <Button
                          sx={{
                            ':hover': {
                              backgroundColor: '#f7253a',
                              color: '#fff',
                            },
                          }}
                          onClick={handleRemoveProduct}
                        >
                          Yes
                        </Button>
                        <Button onClick={handleClosePopover}>No</Button>
                      </StyledPopover>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item md={12} xs={12}>
            <Box
              sx={{
                display: 'flex',
                width: isSmallScreen ? '100%' : '466px',
                height: '468px',
                background: '#fff',
                flexDirection: 'column',
                padding: '24px 16px 24px 16px',
              }}
            >
              <Typography
                sx={{
                  fontSize: '24px',
                  fontWeight: '500',
                  color: '#000000',
                }}
              >
                Map Location
              </Typography>

              <FetchLocation
                variant="map"
                location={{ address: '', position: mapCordinates.position }}
              />

              {/* <LoadScript googleMapsApiKey="AIzaSyCUMfi4OQnxVWweWBTAkp7-hy5lV203cFY">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  zoom={15}
                  center={mapCordinates.position}
                >
                  <Marker
                    onLoad={onLoad}
                    position={mapCordinates.position}
                    onClick={openInGoogleMaps}
                  />
                </GoogleMap>
              </LoadScript> 
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row-reverse',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '400',
                    color: '#1A73E8',
                    marginTop: '12px',
                    cursor: 'pointer',
                  }}
                  onClick={openInGoogleMaps}
                >
                  Open in Google Maps
                </Typography> 
              </Box>*/}
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Modal
        open={openChatBox}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <Box
            display="flex"
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography component="h5" variant="h5" mb={2} mt={1}>
              Send Message to Seller{' '}
            </Typography>
            <IconButton
              aria-label="close Modal"
              sx={{ width: 40, height: 40 }}
              onClick={handleClose}
            >
              <CloseIcon fontSize="medium" />
            </IconButton>
          </Box>

          <Divider component="hr" />

          <ChatArea
            fromUserId={user.id}
            toUserId={productState.user.id}
            productId={productState.product.id}
            inboxUserName={`${productState.user.firstName} 
      ${productState.user.lastName}`}
            onCallback={handleCallback}
          />
        </Box>
      </Modal>

      <Modal
        open={openShareBox}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, maxWidth: 400 }}>
          <Box
            display="flex"
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography component="h5" variant="h5" mb={2} mt={1}>
              Share{' '}
            </Typography>
            <IconButton
              aria-label="close Modal"
              sx={{ width: 40, height: 40 }}
              onClick={handleClose}
            >
              <CloseIcon fontSize="medium" />
            </IconButton>
          </Box>

          <Divider component="hr" sx={{ mb: 2 }} />
          <SocialShare
            imageUrl={
              productState.product.images.length
                ? productState.product.images[0]
                : ''
            }
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default productDetailWrapper;
