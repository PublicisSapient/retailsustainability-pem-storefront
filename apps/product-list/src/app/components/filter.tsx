import React from 'react';
import {
  Box,
  Link,
  Typography,
  useMediaQuery,
  Button,
  TextField,
} from '@mui/material';
import List from '@mui/material/List';
import {
  ExpandableNavItem,
  FetchLocation,
  StickyContainer,
  getUserLocation,
} from '@p2p-exchange/shared';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import {
  arraySlicer,
  stringFormatter,
  toggleWordInArray,
} from './helperFunction';
import {
  setOfferTypeFilter,
  useAppDispatch,
  useAppSelector,
  setCategoryFilter,
  triggerSearch,
  setSortByOption,
  GeoPlaceLatLng,
  setSearchLoaction,
  setMapLatLng,
  setLocationInputValue,
  setLocationValue,
} from '@p2p-exchange/core';
import LocationOnIcon from '@mui/icons-material/LocationOn';

type FilterProps = {
  handleDrawerClose?: Function;
};
const filter = ({ handleDrawerClose }: FilterProps) => {
  const isTabletScreen = useMediaQuery('(max-width:899px)');
  const dispatch = useAppDispatch();
  const isInitialRender = React.useRef(true);
  const { offerTypeFilters, categoryFilters, selectedFilters, isLoading } =
    useAppSelector((state) => state.search);
  const { latitude, longitude, address } = useAppSelector(
    (state) => state.user.userPosition
  );
  const [location, setLocation] = React.useState<GeoPlaceLatLng>(null);

  const [isListingShowAll, setListingShowAll] = React.useState(
    offerTypeFilters.length > 4 && selectedFilters.offerTypeFilters.length === 0
  );
  const listingFilter = arraySlicer(offerTypeFilters, isListingShowAll);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setOfferTypeFilter(
        toggleWordInArray(selectedFilters.offerTypeFilters, event.target.name)
      )
    );
    !isTabletScreen && dispatch(triggerSearch());
  };

  const handleListingShowAll = () => {
    setListingShowAll(false);
  };
  const [isProductShowAll, setProductShowAll] = React.useState(
    categoryFilters.length > 4 && selectedFilters.categoryFilters.length === 0
  );
  const productTypeFilter = arraySlicer(categoryFilters, isProductShowAll);
  const handleProductFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      setCategoryFilter(
        toggleWordInArray(selectedFilters.categoryFilters, event.target.name)
      )
    );
    !isTabletScreen && dispatch(triggerSearch());
  };
  const handleProductShowAll = () => {
    setProductShowAll(false);
  };
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSortByOption((event.target as HTMLInputElement).value));
  };
  const handleApplyFilters = () => {
    dispatch(triggerSearch());
    handleDrawerClose && handleDrawerClose();
  };

  const isOnlyGiveAwayProducts =
    offerTypeFilters.length === 1 && offerTypeFilters[0] === 'giveaway';

  React.useEffect(() => {
    const userLocatioin: GeoPlaceLatLng = {
      address,
      position: { lat: latitude, lng: longitude },
    };
    setLocation(userLocatioin);
    dispatch(setMapLatLng({ lat: latitude, lng: longitude }));
    dispatch(setLocationValue({ description: address }));
  }, []);

  React.useEffect(() => {
    if (!isLoading) {
      setListingShowAll(
        offerTypeFilters.length > 4 &&
          selectedFilters.offerTypeFilters.length === 0
      );
      setProductShowAll(
        categoryFilters.length > 4 &&
          selectedFilters.categoryFilters.length === 0
      );
    }
  }, [isLoading]);

  const setGeoCode = (location: GeoPlaceLatLng) => {
    dispatch(setSearchLoaction(location.position));
    !isTabletScreen && dispatch(triggerSearch());
  };

  return (
    <Box
      sx={{
        ...(isTabletScreen && {
          marginBottom: { xs: '90px', sm: 0 },
        }),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant={isTabletScreen ? 'h5' : 'subtitle1'}
          color="initial"
          sx={{ fontWeight: 600 }}
        >
          Filters
        </Typography>
        {isTabletScreen && (
          <IconButton
            onClick={() => handleDrawerClose && handleDrawerClose()}
            size="large"
          >
            <CancelIcon fontSize="large" />
          </IconButton>
        )}
      </Box>
      {isTabletScreen && (
        <ExpandableNavItem listHeaderTxt="Sort By" enableDivider>
          <List component="div" disablePadding>
            <FormControl
              sx={{ m: 1.5, width: '100%' }}
              component="fieldset"
              variant="standard"
            >
              <RadioGroup
                defaultValue="Date"
                name="radio-buttons-group"
                value={selectedFilters.selectedSort}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="Date"
                  control={<Radio />}
                  label="Date"
                />
                <FormControlLabel
                  value="Relevance"
                  control={<Radio />}
                  label="Relevance"
                />
                {!isOnlyGiveAwayProducts && (
                  <>
                    <FormControlLabel
                      value="Price (Low to High)Price (Low to High)"
                      control={<Radio />}
                      label="Price (Low to High)"
                    />
                    <FormControlLabel
                      value="Price (High to Low)"
                      control={<Radio />}
                      label="Price (High to Low)"
                    />
                  </>
                )}
              </RadioGroup>
            </FormControl>
          </List>
        </ExpandableNavItem>
      )}
      <ExpandableNavItem listHeaderTxt="Listing Type" enableDivider>
        <List component="div" disablePadding>
          <FormControl
            sx={{ m: 1.5, width: '100%' }}
            component="fieldset"
            variant="standard"
          >
            <FormGroup>
              {listingFilter.map((ele: string, index: number) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={selectedFilters.offerTypeFilters.includes(ele)}
                      onChange={handleChange}
                      name={ele}
                    />
                  }
                  label={stringFormatter(ele)}
                />
              ))}
            </FormGroup>
          </FormControl>
          {isListingShowAll && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link
                onClick={handleListingShowAll}
                variant="body2"
                sx={{
                  pr: 2,
                  cursor: 'pointer',
                }}
              >
                Show All
              </Link>
            </Box>
          )}
        </List>
      </ExpandableNavItem>
      <ExpandableNavItem listHeaderTxt="Product Type" enableDivider>
        <List component="div" disablePadding>
          <FormControl
            sx={{ m: 1.5, width: '100%' }}
            component="fieldset"
            variant="standard"
          >
            <FormGroup>
              {productTypeFilter.map((ele: string, index: number) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={selectedFilters.categoryFilters.includes(ele)}
                      onChange={handleProductFilterChange}
                      name={ele}
                    />
                  }
                  label={stringFormatter(ele)}
                />
              ))}
            </FormGroup>
          </FormControl>
          {isProductShowAll && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link
                onClick={handleProductShowAll}
                variant="body2"
                sx={{
                  pr: 2,
                  cursor: 'pointer',
                }}
              >
                Show All
              </Link>
            </Box>
          )}
        </List>
      </ExpandableNavItem>
      <ExpandableNavItem listHeaderTxt="Location" enableDivider={false}>
        <Box mt={2}>
          <FetchLocation
            variant="field"
            location={location}
            LocationCallback={(geoPlaceLatLng) => {
              setLocation(geoPlaceLatLng);
              setGeoCode(geoPlaceLatLng);
            }}
          />
        </Box>
      </ExpandableNavItem>
      {isTabletScreen && (
        <StickyContainer>
          <Button
            onClick={handleApplyFilters}
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
            Apply
          </Button>
        </StickyContainer>
      )}
    </Box>
  );
};

export default filter;
