import { Box, alpha, styled } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { globalTheme as theme } from '@p2p-exchange/core';
import React from 'react';
type LoaderWrapperProps = {
  isLoading: boolean;
  bgTransparent?: boolean;
};

const LoaderWrapper = ({ isLoading, bgTransparent }: LoaderWrapperProps) => {
  return (
    <>
      {isLoading && (
        <Box
          sx={{
            position: 'fixed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: bgTransparent
              ? 'transparent'
              : alpha(theme.palette.common.white, 0.6),
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default LoaderWrapper;
