import { Alert, useMediaQuery } from '@mui/material';
import { type } from 'os';
import React from 'react';

type AlertBarProps = {
  severity: 'error' | 'warning' | 'info' | 'success';
  message: string;
  width?: string;
};

const alertBar = ({ severity, message, width }: AlertBarProps) => {
  const isSmallScreen = useMediaQuery('(max-width:532px)');

  return (
    <Alert
      severity={severity}
      sx={{
        maxWidth: width,
        width: isSmallScreen ? '100%' : '100%',
        paddingLeft: '10px',
        paddingRight: '10px',
        marginTop: '10px',
        fontWeight: 600,
        transition: 'all 0.5s ease',
      }}
    >
      {message}
    </Alert>
  );
};

export default alertBar;
