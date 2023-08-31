import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { CardCarousel } from '../cardCarousel';
import { BoxImageCard } from '../boxImageCard';
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
interface NotFoundContainerProps {
  newlyAdded: DataItem[];
  infoText: string;
}
const NotFoundContainer = ({
  newlyAdded,
  infoText,
}: NotFoundContainerProps) => {
  const isMobileScreen = useMediaQuery('(min-width:599px)');
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {infoText && (
        <Typography
          variant={isMobileScreen ? 'h6' : 'h5'}
          color="initial"
          sx={{ fontWeight: 500, my: 6 }}
        >
          {infoText}
        </Typography>
      )}
      {newlyAdded?.length !== 0 && (
        <>
          <Typography
            variant={isMobileScreen ? 'h5' : 'h4'}
            color="initial"
            sx={{ fontWeight: 500, mb: 3 }}
          >
            These popular items might interest you
          </Typography>
          <CardCarousel
            itemLength={newlyAdded.length}
            slidesToDisplay={newlyAdded.length > 4 ? 4 : newlyAdded.length}
          >
            {newlyAdded.map((ele: DataItem, index: number) => (
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
    </Box>
  );
};

export default NotFoundContainer;
