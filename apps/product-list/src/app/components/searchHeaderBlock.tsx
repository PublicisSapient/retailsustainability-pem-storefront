import React from 'react';
import Typography from '@mui/material/Typography';
import { Box, useMediaQuery } from '@mui/material';
type SearchHeaderProps = {
  searchTerm: string;
  productCount: number;
};
const searchHeaderBlock = ({ searchTerm, productCount }: SearchHeaderProps) => {
  const isMobileScreen = useMediaQuery('(max-width:599px)');
  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Typography variant="body2" color="initial">
        Search results for
      </Typography>
      <Typography variant={isMobileScreen ? 'h5' : 'h4'} color="initial">
        {`${searchTerm} (${productCount})`}
      </Typography>
    </Box>
  );
};

export default searchHeaderBlock;
