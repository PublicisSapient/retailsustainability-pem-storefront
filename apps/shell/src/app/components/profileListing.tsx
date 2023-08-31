import React from 'react';
import Typography from '@mui/material/Typography';
import { Grid, Link, Box, useMediaQuery, Divider } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { FeaturedCard } from '@p2p-exchange/shared';
import {
  useAppSelector,
  useAppDispatch,
  setListingPagination,
} from '@p2p-exchange/core';
import { formatDate, formatPrice } from '../utils/helperFunction';
import { useNavigate } from 'react-router-dom';
import DonationListing from './donationListing';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

type DataItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  offerType: string;
  images: string[];
  location: string;
  geoLocation: {
    latitude: string;
    longitude: string;
  };
  user: string;
  price: string;
  createdTime: string;
};
type ProfileListingProps = {
  isSelfView: boolean;
};
const profileListing = ({ isSelfView }: ProfileListingProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isTabletScreen = useMediaQuery('(min-width:899px)');
  const isMobileScreen = useMediaQuery('(min-width:599px)');
  const cardDimentionConfig = {
    width: { xs: '44vw', sm: '30vw', md: '20vw', lg: '236px' },
    height: { xs: '56vw', sm: '37.5vw', md: '25vw', lg: '295px' },
  };
  const { data, totalProductCount, pageNumber, pageLimit, isLoading } =
    useAppSelector((state) => state.profile.listingData);

  const handlePostListing = () => {
    navigate('/post-item');
  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setListingPagination(value - 1));
  };
  const [value, setValue] = React.useState(0);

  const handlTabeChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      {isSelfView && (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={value}
            onChange={handlTabeChange}
            aria-label="Listing tabs"
          >
            <Tab
              label={
                <Typography
                  variant={isMobileScreen ? 'h6' : 'subtitle1'}
                  textTransform={'none'}
                >
                  Open Listings ({totalProductCount})
                </Typography>
              }
            />
            <Tab
              label={
                <Typography
                  variant={isMobileScreen ? 'h6' : 'subtitle1'}
                  textTransform={'none'}
                >
                  Donations
                </Typography>
              }
            />
          </Tabs>
        </Box>
      )}
      {value === 0 && (
        <Grid container>
          {!isSelfView && (
            <Grid item xs={12}>
              <Typography variant="h5" color="initial">
                Open Listings ({totalProductCount})
              </Typography>
              <Divider sx={{ my: 3 }} />
            </Grid>
          )}
          {data.length === 0 && !isLoading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body2" color="initial">
                Not posted anything yet.
              </Typography>
              {isSelfView && (
                <Link
                  onClick={handlePostListing}
                  variant="body2"
                  sx={{
                    cursor: 'pointer',
                    my: 1.5,
                  }}
                >
                  Post a New Listing
                </Link>
              )}
            </Box>
          ) : (
            <>
              {data?.map((ele: DataItem, index: number) => (
                <Grid item xs={6} sm={4} key={index}>
                  <FeaturedCard
                    imageURL={(ele.images && ele.images[0]) || ''}
                    productName={ele.name}
                    offerType={ele.offerType}
                    description={ele.description}
                    location={ele.location}
                    price={formatPrice(ele.price)}
                    date={formatDate(ele.createdTime)}
                    cardDimentionConfig={cardDimentionConfig}
                    productID={ele.id}
                  />
                </Grid>
              ))}
              {totalProductCount > 24 && (
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Pagination
                    count={Math.ceil(totalProductCount / pageLimit)}
                    page={pageNumber + 1}
                    onChange={handlePageChange}
                    showFirstButton={isMobileScreen}
                    showLastButton={isMobileScreen}
                  />
                </Grid>
              )}
            </>
          )}
        </Grid>
      )}
      {value === 1 && <DonationListing isSelfView={isSelfView} />}
    </>
  );
};

export default profileListing;
