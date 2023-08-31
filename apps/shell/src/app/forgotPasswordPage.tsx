import * as React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AlertBar, PageTitle } from '@p2p-exchange/shared';

const forgotPasswordPage = () => {
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
    <PageTitle title={'Forgot Password'} />
    
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
            marginLeft: isSmallScreen ? '10px' : '-397px',
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
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: isSmallScreen ? 'flex-start' : 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          marginTop: '-20px',
        }}
      >
        <Typography
          sx={{
            fontSize: '28px',
            fontWeight: 500,
            marginLeft: isSmallScreen ? '10px' : '-300px',
            flex: isSmallScreen ? '1 1 auto' : 'none',
          }}
        >
          Forgot Password
        </Typography>
        <Typography
          sx={{
            fontSize: '16px',
            marginLeft: isSmallScreen ? '10px' : '-154px',
            flex: isSmallScreen ? '1 1 auto' : 'none',
          }}
        >
          Enter your email address to reset your password.
        </Typography>
        {/* <AlertBar
          severity="error"
          message="We can't find your account."
          width="520px"
        /> */}
      </Box>
      <TextField
        sx={{
          maxWidth: '540px',
          width: '100%',
          paddingLeft: '10px',
          paddingRight: '10px',
        }}
        id="outlined-basic"
        variant="outlined"
        placeholder="Email Address"
        required
        onChange={handleChangeEmail}
        InputProps={{
          inputProps: {
            pattern: regexEmail.source,
          },
        }}
        error={inputValueEmail.error}
        helperText={inputValueEmail.error ? inputValueEmail.helperText : ''}
      />
      <Button
        variant="contained"
        disableElevation
        sx={{
          boxShadow: 'none',
          width: isSmallScreen ? '96%' : '230px',
          marginLeft: isSmallScreen ? '0px' : '-285px',
          marginTop: '0px',
        }}
      >
        Request new password
      </Button>
    </Box>
    </>
  );
};

export default forgotPasswordPage;
