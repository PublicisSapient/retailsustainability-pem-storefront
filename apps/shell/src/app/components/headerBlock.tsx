import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useMediaQuery } from '@mui/material';

type HeaderBlockProps = {
  headerTxt: String;
  subHeaderTxt: String;
  viewALL: Function;
};
const headerBlock = ({
  headerTxt,
  subHeaderTxt,
  viewALL,
}: HeaderBlockProps) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '0 24px',
      }}
    >
      <Typography
        variant={isSmallScreen ? 'h5' : 'h4'}
        color="initial"
        sx={{ paddingTop: '48px', marginBottom: '8px' }}
      >
        {headerTxt}
      </Typography>
      <Typography
        variant={isSmallScreen ? 'body2' : 'body1'}
        color="initial"
        align="center"
      >
        {subHeaderTxt}
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => viewALL()}
        sx={{ margin: '16px 0 24px 0' }}
      >
        View All <KeyboardArrowRightIcon />
      </Button>
    </Box>
  );
};

export default headerBlock;
