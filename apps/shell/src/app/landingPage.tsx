import React from 'react';
import { GlobalStore } from 'redux-micro-frontend';

import {
  BoxImageCard,
  StickyContainer,
  useEffectOnce,
  CardCarousel,
  RoundImageCard,
  PageTitle,
} from '@p2p-exchange/shared';
import Box from '@mui/material/Box';
import HeaderBlock from './components/headerBlock';
import WelcomeBanner from './components/welcomeBanner';
import {
  globalTheme as theme,
  useAppDispatch,
  useAppSelector,
  fetchGiveAway,
  fetchNewlyAdded,
  setOfferTypeFilter,
  setSortByOption,
  setInfoMsg,
} from '@p2p-exchange/core';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { Button, useMediaQuery } from '@mui/material';
import DonationBanner from './components/donationBanner';
import { useSelector, useDispatch } from 'react-redux';

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
const landingPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMobileScreen = useMediaQuery('(max-width:599px)');
  const giveAway = useAppSelector((state) => state.giveAway);
  const newlyAdded = useAppSelector((state) => state.newlyAdded);
  const userName = useAppSelector((state) => state.user?.firstName);
  const userLocation = useAppSelector((state) => state.user?.userPosition);
  useEffectOnce(() => {
    dispatch(
      fetchGiveAway({
        limit: 20,
        pageNumber: 1,
        offerTypeValue: ['giveaway'],
        sortBy: 'DATE',
        ...(userLocation?.latitude && {
          latitude: userLocation?.latitude,
          longitude: userLocation?.longitude,
        }),
      })
    );
    dispatch(
      fetchNewlyAdded({
        limit: 20,
        pageNumber: 1,
        sortBy: 'DATE',
        ...(userLocation?.latitude && {
          latitude: userLocation?.latitude,
          longitude: userLocation?.longitude,
        }),
      })
    );
  });

  const handleNavigation = (url: any) => () => {
    navigate('/' + url);
  };
  const handleViewAllGiveAway = () => {
    dispatch(setOfferTypeFilter(['giveaway']));
    dispatch(setSortByOption('Date'));
    navigate('product/shop');
  };
  const handleViewAllNewAdded = () => {
    dispatch(setSortByOption('Date'));
    navigate('product/shop');
  };
  const handlePostItemClick = () => {
    if (!userName)
      dispatch(
        setInfoMsg('To post a new listing, please login in to your account.')
      );
    navigate(userName ? '/post-item' : '/signin');
  };
  return (
    <>
      <PageTitle title={'Peer to Peer Marketplace'} />
      <WelcomeBanner />
      <Paper
        sx={{ backgroundColor: theme.palette.background.default }}
        elevation={0}
      >
        {giveAway?.data.length !== 0 && (
          <>
            <HeaderBlock
              headerTxt="New Giveaways"
              subHeaderTxt="Explore the exciting new giveways posted by our users"
              viewALL={handleViewAllGiveAway}
            />
            <CardCarousel
              itemLength={giveAway.data.length}
              slidesToDisplay={
                giveAway.data.length > 6 ? 6 : giveAway.data.length
              }
            >
              {giveAway.data.map((ele: DataItem, index: number) => (
                <Box key={index}>
                  <RoundImageCard
                    productID={ele.id}
                    imageURL={(ele.images && ele.images[0]) || ''}
                    productName={ele.name}
                  />
                </Box>
              ))}
            </CardCarousel>
          </>
        )}
        {newlyAdded?.data.length !== 0 && (
          <>
            <HeaderBlock
              headerTxt="Recently Added"
              subHeaderTxt="Check out our recently added new range of exciting products"
              viewALL={handleViewAllNewAdded}
            />
            <CardCarousel
              itemLength={newlyAdded.data.length}
              slidesToDisplay={
                newlyAdded.data.length > 4 ? 4 : newlyAdded.data.length
              }
            >
              {newlyAdded.data.map((ele: DataItem, index: number) => (
                <Box key={index}>
                  <BoxImageCard
                    imageURL={(ele.images && ele.images[0]) || ''}
                    productName={ele.name}
                    offerType={ele.offerType}
                    productID={ele.id}
                  />
                </Box>
              ))}
            </CardCarousel>
          </>
        )}
        <Box sx={{ width: '100%', height: '96px' }}></Box>
      </Paper>
      {isMobileScreen && (
        <StickyContainer>
          <Button
            onClick={handlePostItemClick}
            color="primary"
            variant="contained"
            sx={{
              width: 312,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
              },
            }}
          >
            + Post a new listing
          </Button>
        </StickyContainer>
      )}
      <DonationBanner />
    </>
  );
};

export default landingPage;
