import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import { globalTheme as theme } from '@p2p-exchange/core';
type CardBadgeProps = {
  text: String;
};
const cardBadge = ({ text }: CardBadgeProps) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  return (
    <Box sx={{ padding: '12px', width: 'max-content' }}>
      <Typography
        variant={isSmallScreen ? 'body2' : 'body1'}
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: '4px 12px',
          borderRadius: '50px',
          border: `1px solid ${theme.palette.grey[300]}`,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default cardBadge;
