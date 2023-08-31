import React from 'react';
import { Box, Grid, useMediaQuery } from '@mui/material';
import SearchHeaderBlock from '../components/searchHeaderBlock';
import Filters from '../components/filter';
import {
  AlertBar,
  BreadCrumbs,
  FeaturedCard,
  LoaderWrapper,
  NotFoundPage,
  PageTitle,
} from '@p2p-exchange/shared';
import ListingContainerHeader from '../components/listingContainerHeader';
import Pagination from '@mui/material/Pagination';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
  fetchSearchResults,
  setPageNumber,
  flushSearchState,
  setCurrentSearchTerm,
  flushSearchFilters,
  fetchNewlyAdded,
} from '@p2p-exchange/core';
import { formatDate, formatPrice } from '../components/helperFunction';
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
const listingWrapper = () => {
  const isTabletScreen = useMediaQuery('(min-width:899px)');
  const isMobileScreen = useMediaQuery('(min-width:599px)');
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const prevProps = React.useRef<any>();
  const breadCrumbsConfig = [
    { buttonText: 'Home', buttonUrl: '/' },
    { buttonText: 'Shop', buttonUrl: '/product/shop' },
  ];
  const cardDimentionConfig = {
    width: { xs: '44vw', sm: '44vw', md: '22.5vw', lg: '270px' },
    height: { xs: '56vw', sm: '56vw', md: '28vw', lg: '337.5px' },
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPageNumber(value));
  };
  const {
    productsData,
    productCount,
    searchTerm,
    pageLimit,
    pageNumber,
    triggerApiCounter,
    apiSuccessMsg,
    isLoading,
    currentSearchTerm,
    error,
  } = useAppSelector((state) => state.search);
  const newlyAddedProducts = useAppSelector((state) => state.newlyAdded.data);

  React.useEffect(() => {
    dispatch(
      fetchSearchResults(
        location.pathname === '/product/search' ? searchTerm : ''
      )
    );
    if (location.pathname === '/product/search')
      dispatch(setCurrentSearchTerm(searchTerm));
  }, [triggerApiCounter, pageNumber, location.pathname]);
  React.useEffect(() => {
    if (location.pathname === '/product/search' && !searchTerm) {
      navigate('/product/shop');
    }
  }, [searchTerm]);
  React.useEffect(() => {
    return () => {
      dispatch(flushSearchState());
    };
  }, []);
  React.useEffect(() => {
    if (prevProps.current !== location.pathname) {
      if (
        prevProps.current === '/product/search' &&
        location.pathname === '/product/shop'
      ) {
        dispatch(flushSearchFilters());
        dispatch(setCurrentSearchTerm(''));
      }
    }
    prevProps.current = location.pathname;
  }, [location.pathname]);
  React.useEffect(() => {
    if (
      newlyAddedProducts.length === 0 &&
      apiSuccessMsg === 'No Products Found'
    )
      dispatch(
        fetchNewlyAdded({
          limit: 20,
          pageNumber: 1,
          sortBy: 'DATE',
        })
      );
  }, [apiSuccessMsg]);
  // if (isLoading) return <LoaderWrapper isLoading={isLoading} bgTransparent />;
  if (apiSuccessMsg === 'No Products Found' && currentSearchTerm)
    return (
      <NotFoundPage
        newlyAdded={newlyAddedProducts}
        infoText={`We could not find anything for "${currentSearchTerm}"`}
      />
    );
  if (error)
    return (
      <>
        <PageTitle title={'Shop: Error'} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80%',
          }}
        >
          <AlertBar
            severity="warning"
            message="Something went wrong"
            width="520px"
          />
        </Box>
      </>
    );
  return (
    <>
      <PageTitle title={'Shop'} />
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
        {location.pathname === '/product/search' ? (
          <SearchHeaderBlock
            searchTerm={currentSearchTerm}
            productCount={productCount}
          />
        ) : (
          <BreadCrumbs data={breadCrumbsConfig} />
        )}
        <Grid container>
          <Grid item xs={0} md={3}>
            {isTabletScreen && <Filters />}
          </Grid>
          <Grid item xs={12} md={9}>
            {isLoading ? (
              <LoaderWrapper isLoading={isLoading} bgTransparent />
            ) : (
              <>
                <ListingContainerHeader productCount={productCount} />
                <Grid container>
                  {productsData &&
                    productsData.map((ele: DataItem, index: number) => (
                      <Grid item xs={6} md={4} key={index}>
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
                </Grid>
                {productsData.length !== 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                      count={Math.ceil(productCount / pageLimit)}
                      page={pageNumber}
                      onChange={handleChange}
                      showFirstButton={isMobileScreen}
                      showLastButton={isMobileScreen}
                    />
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default listingWrapper;
