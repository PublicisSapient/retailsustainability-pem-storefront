import * as React from 'react';
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { AlertBar, PageTitle } from '@p2p-exchange/shared';

const confirmEmailPage = () => {
  const isSmallScreen = useMediaQuery('(max-width:532px)');
  const navigate = useNavigate();

  //Email Validation
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; // regex for email validation
  const [inputValueEmail, setInputValueEmail] = React.useState({
    email: '',
    error: false,
    helperText: 'Invalid email address',
  });
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (regexEmail.test(value)) {
      setInputValueEmail({ ...inputValueEmail, email: value, error: false });
    } else {
      setInputValueEmail({ ...inputValueEmail, email: value, error: true });
    }
  };

  return (
    <>
    <PageTitle title={'Email Confirmation'} />
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '25px',
        width: '100%',
        height: '100%',
        paddingTop: '20px',
        paddingBottom: '20px',
        marginTop: '3%',
      }}
    >
      <AlertBar
        severity="success"
        message="Your account was created successfully."
        width="760px"
      />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: isSmallScreen ? 'flex-start' : 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          sx={{
            fontSize: '28px',
            fontWeight: 500,
            marginLeft: isSmallScreen ? '10px' : '-220px',
            flex: isSmallScreen ? '1 1 auto' : 'none',
          }}
        >
          Confirm Email Address
        </Typography>
        <Typography
          sx={{
            fontSize: '16px',
            marginLeft: isSmallScreen ? '10px' : '-15px',
            flex: isSmallScreen ? '1 1 auto' : 'none',
            maxWidth: '500px',
            width: '100%',
            paddingLeft: isSmallScreen ? '5px' : '0px',
            paddingRight: isSmallScreen ? '15px' : '0px',
          }}
        >
          You will soon receive an email with a verification link in your email
          address. You can join P2PM after verifying the email address.
        </Typography>
      </Box>
      <Button
        variant="contained"
        disableElevation
        sx={{
          boxShadow: 'none',
          width: isSmallScreen ? '96%' : '330px',
          marginLeft: isSmallScreen ? '0px' : '-185px',
        }}
      >
        Resend conffirmation Email
      </Button>
    </Box>
    </>
  );
};

export default confirmEmailPage;
