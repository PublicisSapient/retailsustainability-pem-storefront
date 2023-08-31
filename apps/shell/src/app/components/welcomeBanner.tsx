import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Grid from '@mui/material/Grid';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const welcomeBanner = () => {
  const isMobileScreen = useMediaQuery('(max-width:599px)');
  const navigate = useNavigate();
  const gotoShop = () => {
    navigate("/product/shop");
  }
  return (
    <Box
      sx={{
        height: {
          xs: '284px',
          sm: '281px',
          md: '422px',
          lg: '563px',
          xl: '720px',
        },
        backgroundImage: {
          xs: 'url(https://storage.googleapis.com/p2p-product-images-dev/product/930d9241-7679-4845-a1e0-f8e0da421520-Header-mobile.png)',
          sm: 'url(https://storage.googleapis.com/p2p-product-images-dev/product/17026bb8-cfa3-4487-a09a-2fe7f1f5eb11-Header-desktop.png)',
        },
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '0 24px',
      }}
    >
      <Grid container spacing={0}>
        <Grid item xs={0} sm={2} lg={3} xl={4}></Grid>
        <Grid item xs={12} sm={8} lg={6} xl={4}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography variant="overline" color="initial">
              WELCOME TO
            </Typography>
            <Typography
              sx={{ margin: '16px 0 8px 0' }}
              variant={isMobileScreen ? 'h4' : 'h3'}
              color="initial"
              align="center"
            >
              Peer to Peer Marketplace
            </Typography>
            <Typography variant="body1" color="initial" align="center">
              Share, sell and find what’s available in our marketplace
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: '24px' }}
              onClick={gotoShop}
            >
              View All <KeyboardArrowRightIcon />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={0} sm={2} lg={3} xl={4}></Grid>
      </Grid>
    </Box>
  );
};

export default welcomeBanner;
