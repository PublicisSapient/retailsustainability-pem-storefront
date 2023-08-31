import {
  fetchNewlyAdded,
  fetchProfileData,
  fetchProfileListing,
  flushProfileState,
  flushProfileListingState,
  useAppDispatch,
  useAppSelector,
  fetchDonation,
} from '@p2p-exchange/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { BreadCrumbs, NotFoundPage, PageTitle } from '@p2p-exchange/shared';
import ProfileInfo from './components/profileInfo';
import ProfileListing from './components/profileListing';

const profileWrapper = () => {
  const params = useParams();
  const { id } = params;
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector((state) => state.user.id);
  const { pageNumber } = useAppSelector((state) => state.profile.listingData);
  const errorMsg = useAppSelector((state) => state.profile.error);
  const newlyAddedProducts = useAppSelector((state) => state.newlyAdded.data);
  const isSelfView = id === currentUserId;
  const breadCrumbsConfig = [
    { buttonText: 'Home', buttonUrl: '/' },
    { buttonText: 'Profile', buttonUrl: `/profile/${id}` },
  ];
  React.useEffect(() => {
    dispatch(fetchProfileData({ id, isSelfView }));
    dispatch(fetchDonation(id));
  }, [id]);
  React.useEffect(() => {
    dispatch(fetchProfileListing(id));
  }, [pageNumber, id]);
  React.useEffect(() => {
    if (newlyAddedProducts.length === 0 && errorMsg)
      dispatch(
        fetchNewlyAdded({
          limit: 20,
          pageNumber: 1,
          sortBy: 'DATE',
        })
      );
  }, [errorMsg]);

  React.useEffect(() => {
    return () => {
      dispatch(flushProfileState());
      dispatch(flushProfileListingState());
    };
  }, []);

  if (errorMsg)
    return <NotFoundPage newlyAdded={newlyAddedProducts} infoText={errorMsg} />;
  return (
    <>
      <PageTitle title={'User Profile'} />
      <Box
        sx={{
          width: { lg: '1200px', xs: '100%' },
          display: 'flex',
          flexDirection: 'column',
          mx: 'auto',
          pb: 12,
          p: { md: 3, sm: 2.5, xs: 2 },
        }}
      >
        <BreadCrumbs data={breadCrumbsConfig} />
        <Grid container>
          <Grid item xs={12} md={3}>
            <ProfileInfo isSelfView={isSelfView} />
          </Grid>
          <Grid item xs={0} md={1}></Grid>
          <Grid item xs={12} md={8}>
            <ProfileListing isSelfView={isSelfView} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default profileWrapper;
