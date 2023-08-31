import * as React from 'react';
import { useEffect } from 'react';
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
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { AlertBar, PageTitle } from '@p2p-exchange/shared';
import { encryptPassword } from './utils/helperFunction';
import {
  useAppDispatch,
  useAppSelector,
  fetchUserDetails,
  flushUserData,
  setUserError,
  setTriggerCookieCheck,
} from '@p2p-exchange/core';
import ReCAPTCHA from 'react-google-recaptcha';

const signinPage = () => {
  // TODO:: change hostname configuration with dev or prod env condition
  const SITE_KEY =
    window.location.hostname === 'p2pmarket.dev'
      ? '6LfRw-0mAAAAAMlVuV1D6OklT350BG0bwzTvUZ7n'
      : '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
  // TODO:: set isCaptchaNeeded = false; to remove captcha verification
  const isCaptchaNeeded = false;
  const isSmallScreen = useMediaQuery('(max-width:532px)');
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

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
      setInputValueEmail({
        ...inputValueEmail,
        email: value,
        helperText: 'Invalid email address',
        error: true,
      });
    }
  };
  const [inputValuePassword, setInputValuePassword] = React.useState({
    password: '',
    error: false,
    helperText: '',
  });
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValuePassword({
      ...inputValuePassword,
      password: value,
      error: false,
    });
  };
  // Show Password
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [isCaptchaVerified, setIsCaptchaVerified] = React.useState(false);

  const handleCaptchaVerify = (token: string | null) => {
    if (token) {
      setIsCaptchaVerified(true);
    }
  };
  const handleCaptchaExpired = () => {
    setIsCaptchaVerified(false);
  };

  const handleLogin = () => {
    let isError: Boolean = inputValueEmail.error || inputValuePassword.error;
    if (!inputValueEmail.email) {
      setInputValueEmail({
        ...inputValueEmail,
        helperText: 'Please enter an email',
        error: true,
      });
      isError = true;
    }
    if (!inputValuePassword.password) {
      setInputValuePassword({
        ...inputValuePassword,
        helperText: 'Please enter a password',
        error: true,
      });
      isError = true;
    }
    if (!isError) {
      if (isCaptchaNeeded) {
        if (!isCaptchaVerified) {
          isError = true;
        }
      }
    }
    if (!isError) {
      const encryptedPassword = encryptPassword(inputValuePassword.password);
      dispatch(
        fetchUserDetails({
          email: inputValueEmail.email,
          password: encryptedPassword,
        })
      ).then((res: any) => {
        if (res.payload && !res.error) {
          dispatch(setTriggerCookieCheck());
          navigate(redirect);
        }
      });
    }
  };

  React.useEffect(() => {
    dispatch(flushUserData());
    return () => {
      dispatch(setUserError());
    };
  }, []);

  return (
    <>
      <PageTitle title={'Sign In'} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '25px',
          width: '100%',
          height: '100%',
          paddingTop: '20px',
          paddingBottom: '20px',
        }}
      >
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
              marginTop: isSmallScreen ? '40px' : '0px',
            }}
          >
            Log in to Your Account
          </Typography>
          {(user.error || user.infoMsg.isInfoMsg) && (
            <AlertBar
              severity={user.error ? 'error' : 'info'}
              message={user.error ? user.errorText : user.infoMsg.message}
              width="520px"
            />
          )}
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
          placeholder="Email Address*"
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
        <TextField
          sx={{
            maxWidth: '540px',
            width: '100%',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
          id="outlined-basic"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          required
          onChange={handleChangePassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={inputValuePassword.error}
          helperText={
            inputValuePassword.error ? inputValuePassword.helperText : ''
          }
        />
        {/* <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          marginLeft: isSmallScreen ? '10px' : '-388px',
          width: '100%',
          justifyContent: isSmallScreen ? 'flex-start' : 'center',
          alignItems: isSmallScreen ? 'flex-start' : 'center',
        }}
      >
        <Checkbox />
        <Typography sx={{ paddingTop: '10px', paddingBottom: '10px' }}>
          Remember me
        </Typography>
      </Box> */}
        {isCaptchaNeeded && (
          <ReCAPTCHA
            sitekey={SITE_KEY}
            onChange={handleCaptchaVerify}
            style={{ width: 'inherit', maxWidth: '540px', padding: '0 10px' }}
            onExpired={handleCaptchaExpired}
          />
        )}
        <Button
          variant="contained"
          disableElevation
          sx={{
            boxShadow: 'none',
            width: isSmallScreen ? '96%' : '230px',
            marginLeft: isSmallScreen ? '0px' : '-285px',
            marginTop: '0px',
          }}
          onClick={handleLogin}
        >
          LOG IN
        </Button>
        <Link
          to="/register"
          style={{
            marginLeft: isSmallScreen ? '0px' : '-355px',
          }}
        >
          Create a new account
        </Link>
        <Link
          to="/forgot-password"
          style={{
            marginLeft: isSmallScreen ? '0px' : '-390px',
            marginTop: '-15px',
          }}
        >
          Forgot password
        </Link>
      </Box>
    </>
  );
};

export default signinPage;
