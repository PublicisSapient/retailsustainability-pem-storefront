import * as React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AlertBar, PageTitle } from '@p2p-exchange/shared';

const confirmForgotPasswordPage = () => {
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
    <PageTitle title={'Confirm Forgot Password'} />
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
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ArrowBackIosIcon
          sx={{
            height: '16px',
            color: '#0000008F',
            marginLeft: isSmallScreen ? '10px' : '-437px',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/signin')}
        />
        <Link
          to="/signin"
          style={{
            textDecoration: 'none',
            flex: isSmallScreen ? '1 1 auto' : 'none',
            marginLeft: '-4px',
          }}
        >
          Back to Log in
        </Link>
      </Box>
      <AlertBar
        severity="success"
        message="Password reset instructions sent on your email."
        width="564px"
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
            marginLeft: isSmallScreen ? '10px' : '-290px',
            flex: isSmallScreen ? '1 1 auto' : 'none',
          }}
        >
          Check your Inbox
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
          If you have a registered account with us, you’ll receive an email with
          instructions on how to reset your password.
        </Typography>
      </Box>
      {/* <Button
        variant="contained"
        disableElevation
        sx={{
          boxShadow: 'none',
          width: isSmallScreen ? '96%' : '330px',
          marginLeft: isSmallScreen ? '0px' : '-185px',
          marginTop: '0px',
        }}
      >
        Resend conffirmation Email
      </Button> */}
    </Box>
    </>
  );
};

export default confirmForgotPasswordPage;
