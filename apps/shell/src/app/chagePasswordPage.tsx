import * as React from 'react';
import {
  Box,
  Grid,
  useMediaQuery,
  TextField,
  Typography,
  styled,
  Link,
  Button,
  IconButton,
  InputAdornment,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { AlertBar, PageTitle } from '@p2p-exchange/shared';
import { encryptPassword } from './utils/helperFunction';
import {
  useAppSelector,
  flushProfileState,
  useAppDispatch,
  changeProfilePass,
  setInfoMsg,
  getUserLogout,
} from '@p2p-exchange/core';

const StyledTextField = styled(TextField)((props) => ({
  '	.MuiFormHelperText-root': {
    position: 'none',
    color:
      props.helperText === 'Your password is ready to go!' ? '#2E7D32' : '',
  },
}));

const chagePasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currShowPass, setCurrShowPass] = React.useState(false);
  const [newShowPass, setNewShowPass] = React.useState(false);
  const [cnfShowPass, setCnfShowPass] = React.useState(false);
  const [isApiCallSuccess, setApiCallSuccess] = React.useState(false);
  const profileError = useAppSelector((state) => state.profile.error);
  const currentUserId = useAppSelector((state) => state.user.id);
  const currentUserFirstName = useAppSelector((state) => state.user.firstName);
  const currentUserLastName = useAppSelector((state) => state.user.lastName);

  const regexPassword = new RegExp(
    `^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,})(?!.*${currentUserFirstName})(?!.*${currentUserLastName}).{8,}$`,
    'g'
  );
  const [inputOldPassword, setInputOldPassword] = React.useState({
    password: '',
    error: false,
    helperText: '',
  });
  const [inputValuePassword, setInputValuePassword] = React.useState({
    password: '',
    error: false,
    helperText:
      'The password should contain at least 1 lowercase letters, 1 uppercase letters, 1 digits, 1 special character, at least 8 characters long and should not contain username',
  });
  const [inputValueConfirmPassword, setInputValueConfirmPassword] =
    React.useState({
      confirmPassword: '',
      error: false,
      helperText: 'Passwords do not match',
    });
  const handleChangeOldPass = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputOldPassword({
      ...inputOldPassword,
      password: value,
      error: false,
      helperText: '',
    });
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (regexPassword.test(value)) {
      setInputValuePassword({
        ...inputValuePassword,
        password: value,
        error: false,
        helperText: 'Your password is ready to go!',
      });
      if (
        inputValueConfirmPassword.confirmPassword !== '' &&
        inputValueConfirmPassword.confirmPassword !== value
      ) {
        setInputValueConfirmPassword({
          ...inputValueConfirmPassword,
          error: true,
          helperText: 'Passwords do not match',
        });
      } else {
        setInputValueConfirmPassword({
          ...inputValueConfirmPassword,
          error: false,
        });
      }
    } else {
      setInputValuePassword({
        ...inputValuePassword,
        password: value,
        error: true,
        helperText:
          'The password should contain at least 1 lowercase letters, 1 uppercase letters, 1 digits, 1 special character, at least 8 characters long and should not contain username',
      });
    }
  };
  const handleChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    if (value === inputValuePassword.password) {
      setInputValueConfirmPassword({
        ...inputValueConfirmPassword,
        confirmPassword: value,
        error: false,
      });
      if (
        inputValuePassword.password !== '' &&
        inputValuePassword.password !== value
      ) {
        setInputValuePassword({
          ...inputValuePassword,
          error: true,
        });
      }
    } else {
      setInputValueConfirmPassword({
        ...inputValueConfirmPassword,
        confirmPassword: value,
        error: true,
      });
    }
  };
  const handleUpdatePassword = () => {
    let error = false;
    if (inputOldPassword.password === '') {
      setInputOldPassword({
        ...inputOldPassword,
        error: true,
        helperText: 'Please enter a valid password',
      });
      error = true;
    }
    if (inputValuePassword.password === '') {
      setInputValuePassword({
        ...inputValuePassword,
        error: true,
        helperText: 'Please enter a valid password',
      });
      error = true;
    }
    if (inputValueConfirmPassword.confirmPassword === '') {
      setInputValueConfirmPassword({
        ...inputValueConfirmPassword,
        error: true,
        helperText: 'Please enter a valid password',
      });
      error = true;
    }
    if (inputOldPassword.password === inputValuePassword.password) {
      setInputValuePassword({
        ...inputValuePassword,
        error: true,
        helperText: 'Current Password and New Password should not be same',
      });
      error = true;
    }
    if (
      !(
        inputOldPassword.error ||
        inputValuePassword.error ||
        inputValueConfirmPassword.error ||
        error
      )
    ) {
      const oldPass = encryptPassword(inputOldPassword.password);
      const newPass = encryptPassword(inputValuePassword.password);
      const payload = {
        currentPassword: oldPass,
        newPassword: newPass,
      };
      dispatch(changeProfilePass(payload)).then((res: any) => {
        if (res.payload && !res.error) {
          setApiCallSuccess(true);
          setTimeout(() => {
            dispatch(getUserLogout());
            dispatch(
              setInfoMsg(
                'Password update successful!, please login in to your account.'
              )
            );
            navigate('/signin');
          }, 1000);
        }
      });
    }
  };

  React.useEffect(() => {
    return () => {
      dispatch(flushProfileState());
    };
  }, []);

  React.useEffect(() => {
    if (profileError === 'User Not Logged In')
      setTimeout(() => {
        dispatch(getUserLogout());
      }, 1000);
  }, [profileError]);
  React.useEffect(() => {
    if (!currentUserId) {
      dispatch(
        setInfoMsg('To change your Password, Please login in to your account.')
      );
      navigate('/signin');
    }
  }, [currentUserId]);

  return (
    <>
      <PageTitle title={'Change Password'} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          margin: '0 auto',
          alignItems: 'center',
          width: { xs: '100%', sm: '572px' },
          height: isApiCallSuccess ? '50%' : '100%',
          p: 2,
          mb: 6,
        }}
      >
        <Box sx={{ alignSelf: 'flex-start', mb: 3 }}>
          <ArrowBackIosIcon
            sx={{
              height: '16px',
              color: '#0000008F',
              cursor: 'pointer',
              position: 'relative',
              top: '5px',
            }}
            onClick={() => navigate('/account')}
          />
          <Link
            component="button"
            variant="body1"
            onClick={() => navigate('/account')}
          >
            Back to My Account
          </Link>
        </Box>
        <Typography
          alignSelf="flex-start"
          fontWeight="500"
          variant="h5"
          color="initial"
        >
          Change Password
        </Typography>
        {profileError && <AlertBar severity="error" message={profileError} />}
        {isApiCallSuccess && (
          <AlertBar
            severity="success"
            message={'Password update successful!'}
          />
        )}
        <Box
          sx={{
            display: isApiCallSuccess ? 'none' : 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '0 auto',
            alignItems: 'center',
            width: { xs: '100%', sm: '540px' },
            gap: 3,
            mt: 3,
          }}
        >
          <TextField
            fullWidth
            type={currShowPass ? 'text' : 'password'}
            id="outlined-basic"
            variant="outlined"
            placeholder="Current Password"
            required
            onChange={handleChangeOldPass}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setCurrShowPass(!currShowPass)}
                    edge="end"
                  >
                    {currShowPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            inputProps={{
              maxLength: 16,
            }}
            error={inputOldPassword.error}
            helperText={inputOldPassword.helperText}
          />
          <StyledTextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            type={newShowPass ? 'text' : 'password'}
            placeholder="New Password"
            required
            InputProps={{
              inputProps: {
                pattern: regexPassword.source,
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setNewShowPass(!newShowPass)}
                    edge="end"
                  >
                    {newShowPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            inputProps={{
              maxLength: 16,
            }}
            onChange={handleChangePassword}
            error={inputValuePassword.error}
            helperText={inputValuePassword.helperText}
          />
          <TextField
            fullWidth
            type={cnfShowPass ? 'text' : 'password'}
            id="outlined-basic"
            variant="outlined"
            placeholder="Confirm Password"
            required
            sx={{
              mt:
                inputValuePassword.helperText ===
                'The password should contain at least 1 lowercase letters, 1 uppercase letters, 1 digits, 1 special character and should be at least 8 characters long'
                  ? { xs: 5, sm: 3 }
                  : 1,
              mb: 1,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setCnfShowPass(!cnfShowPass)}
                    edge="end"
                  >
                    {cnfShowPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            inputProps={{
              maxLength: 16,
            }}
            onChange={handleChangeConfirmPassword}
            error={inputValueConfirmPassword.error}
            helperText={
              inputValueConfirmPassword.error
                ? inputValueConfirmPassword.helperText
                : ''
            }
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUpdatePassword}
            sx={{ maxWidth: '343px', alignSelf: 'flex-start' }}
          >
            Update password
          </Button>
          <Link
            component="button"
            variant="body1"
            alignSelf="flex-start"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot password
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default chagePasswordPage;
