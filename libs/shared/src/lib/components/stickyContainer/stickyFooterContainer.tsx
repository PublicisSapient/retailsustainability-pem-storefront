import React from 'react';
import Paper from '@mui/material/Paper';
import { globalTheme as theme } from '@p2p-exchange/core';

type StickyContainerProps = {
  children: React.ReactNode;
};

const stickyFooterContainer = ({ children }: StickyContainerProps) => {
  return (
    <Paper
      elevation={2}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 90,
        width: '100vw',
        backgroundColor: theme.palette.background.default,
        display: { xs: 'flex', lg: 'none' },
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
      }}
    >
      {children}
    </Paper>
  );
};

export default stickyFooterContainer;
