import React from 'react';
import { Box, Divider, Button, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useAppSelector } from '@p2p-exchange/core';
import { formatDate } from '../utils/helperFunction';
import { useNavigate } from 'react-router-dom';

type DonationListingProps = {
  isSelfView: boolean;
};
interface Product {
  id: string;
  name: string;
  description: string;
  category: null | string;
  offerType: string;
  images: null | string[];
  location: string;
  geoLocation: {
    latitude: string;
    longitude: string;
  };
  user: string;
  price: string;
  categories: string[];
  dropLocationType: string;
  dropLocation: string;
  dropDate: number;
  createdTime: number;
}
const donationListing = ({ isSelfView }: DonationListingProps) => {
  const navigate = useNavigate();
  const { isLoading, data, numberOfProducts, error } = useAppSelector(
    (state) => state.donation
  );
  const handleEdit = (itemId: string) => {
    navigate(`/donate-item/edit/${itemId}`);
  };
  const checkContentEditable = (timestamp: number): boolean => {
    const currentDate = new Date();
    const givenDate = new Date(timestamp);
    currentDate.setHours(0, 0, 0, 0);
    givenDate.setHours(0, 0, 0, 0);
    return givenDate > currentDate;
  };
  const enumMapper: { [key: string]: string } = {
    PUBLICIS_SAPIENT_OFFICE: 'Publicis Sapient Office',
    PARTNERED_NGOS: 'Partner NGOs',
  };

  const getEnumValue = (key: string): string => {
    return enumMapper[key] || key;
  };
  const capitalizeWord = (word: string): string => {
    const capitalized =
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    return capitalized;
  };
  if (!isSelfView) {
    return <></>;
  }
  return (
    <Box sx={{ mb: 6 }}>
      {numberOfProducts === 0 && !isLoading ? (
        <>
          <Typography variant="body2" color="initial">
            Not donated anything yet.
          </Typography>
          <Link
            component={'button'}
            variant="body1"
            sx={{ my: 1.5 }}
            onClick={() => navigate('/donate')}
          >
            Donate your Pre-Loved Items
          </Link>
        </>
      ) : (
        <>
          {data.length !== 0 &&
            data.map((ele: Product, index: number) => (
              <Box key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    alignSelf={'flex-start'}
                    fontWeight={600}
                  >
                    {ele.name}
                  </Typography>
                  {checkContentEditable(ele.dropDate) && (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(ele.id)}
                    >
                      EDIT
                    </Button>
                  )}
                </Box>
                <Typography variant="body2" color="initial" sx={{ my: 2 }}>
                  {ele.description}
                </Typography>
                <Stack direction="row" spacing={1}>
                  {ele.categories.length !== 0 &&
                    ele.categories.map((ele: string, index: number) => (
                      <Chip
                        label={capitalizeWord(ele)}
                        color="primary"
                        variant="outlined"
                        size="medium"
                      />
                    ))}
                </Stack>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 3,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    color="initial"
                    fontWeight={'600'}
                  >
                    Drop-Off Location
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="initial"
                    fontWeight={'600'}
                  >
                    Drop-Off Date
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body2" color="initial">
                    {getEnumValue(ele.dropLocationType)} {ele.dropLocation}
                  </Typography>
                  <Typography variant="body2" color="initial">
                    {formatDate(ele.dropDate)}
                  </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />
              </Box>
            ))}
        </>
      )}
    </Box>
  );
};

export default donationListing;
