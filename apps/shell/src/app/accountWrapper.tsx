import React from 'react';
import { Box, Grid } from '@mui/material';
import AccountNav from './components/accountNav';
import ProfileListing from './components/profileListing';
import ProfileEditView from './components/profileEditView';
import {
  useAppSelector,
  useAppDispatch,
  fetchProfileListing,
  fetchProfileData,
  setInfoMsg,
  fetchDonation,
} from '@p2p-exchange/core';
import SecurityContainer from './components/securityContainer';
import { useNavigate } from 'react-router-dom';

const accountWrapper = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUserId = useAppSelector((state) => state.user.id);
  const { pageNumber } = useAppSelector((state) => state.profile.listingData);
  const [selectedNav, setSelectedNav] = React.useState('Profile Info');
  const handleNavChange = (val: string) => {
    setSelectedNav(val);
  };
  React.useEffect(() => {
    if (selectedNav === 'Profile Info')
      dispatch(fetchProfileData({ id: currentUserId, isSelfView: true }));
    if (selectedNav === 'Listings') {
      dispatch(fetchProfileListing(currentUserId));
      dispatch(fetchDonation(currentUserId));
    }
  }, [selectedNav, pageNumber]);

  const screenMapper: {
    [key: string]: React.ReactNode;
  } = {
    'Profile Info': <ProfileEditView />,
    Listings: <ProfileListing isSelfView={true} />,
    'Account Security': <SecurityContainer />,
  };

  React.useEffect(() => {
    if (!currentUserId) {
      dispatch(
        setInfoMsg('To view my account, please login in to your account.')
      );
      navigate('/signin');
    }
  }, [currentUserId]);

  return (
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
      <Grid container>
        <Grid item xs={12} md={3}>
          <AccountNav
            selectedNav={selectedNav}
            handleNavChange={handleNavChange}
          />
        </Grid>
        <Grid item xs={0} md={1}></Grid>
        <Grid item xs={12} md={8}>
          {screenMapper[selectedNav]}
        </Grid>
      </Grid>
    </Box>
  );
};

export default accountWrapper;
