import * as React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  styled,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import { AlertBar, PageTitle } from '@p2p-exchange/shared';
import { encryptPassword } from './utils/helperFunction';
import {
  useAppDispatch,
  useAppSelector,
  fetchCreateUser,
  setCreateUserError,
} from '@p2p-exchange/core';

// add props to change color according to a condition
const StyledTextField = styled(TextField)((props) => ({
  '	.MuiFormHelperText-root': {
    position: 'none',
    color:
      props.helperText === 'Your password is ready to go!' ? '#2E7D32' : '',
  },
}));

const createAccount = () => {
  const isSmallScreen = useMediaQuery('(max-width:532px)');
  const navigate = useNavigate();
  const createUser = useAppSelector((state) => state.createUser);
  const dispatch = useAppDispatch();

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
      setInputValueEmail({
        ...inputValueEmail,
        email: value,
        error: false,
      });
    } else {
      setInputValueEmail({
        ...inputValueEmail,
        email: value,
        error: true,
        helperText: 'Invalid email address',
      });
    }
  };

  //Name Validation
  const regexName = /^[a-zA-Z]{1,20}$/g;
  const [inputValueFirstName, setInputValueFirstName] = React.useState({
    firstName: '',
    error: false,
    helperText: 'Invalid first name',
  });
  const [inputValueLastName, setInputValueLastName] = React.useState({
    lastName: '',
    error: false,
    helperText: 'Invalid last name',
  });
  const handleChangeFirstName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    if (regexName.test(value)) {
      setInputValueFirstName({
        ...inputValueFirstName,
        firstName: value,
        error: false,
      });
    } else {
      setInputValueFirstName({
        ...inputValueFirstName,
        firstName: value,
        error: true,
        helperText:
          inputValueFirstName.firstName.length > 19
            ? 'Maximum 20 characters allowed'
            : 'Invalid first name',
      });
    }
  };
  const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (regexName.test(value)) {
      setInputValueLastName({
        ...inputValueLastName,
        lastName: value,
        error: false,
      });
    } else {
      setInputValueLastName({
        ...inputValueLastName,
        lastName: value,
        error: true,
        helperText:
          inputValueLastName.lastName.length > 19
            ? 'Maximum 20 characters allowed'
            : 'Invalid last name',
      });
    }
  };

  //Mobile Number Validation
  const regexMobileNumber = /^[0-9]{10}$/g;
  const [inputValueMobileNumber, setInputValueMobileNumber] = React.useState({
    mobileNumber: '',
    error: false,
    helperText: 'Invalid mobile number',
  });
  const handleChangeMobileNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    if (regexMobileNumber.test(value)) {
      setInputValueMobileNumber({
        ...inputValueMobileNumber,
        mobileNumber: value,
        error: false,
      });
    } else {
      setInputValueMobileNumber({
        ...inputValueMobileNumber,
        mobileNumber: value,
        error: true,
        helperText: 'Invalid mobile number',
      });
    }
  };

  //Password Validation
  const regexPassword =
    /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/g;
  const [inputValuePassword, setInputValuePassword] = React.useState({
    password: '',
    error: false,
    helperText:
      'The password should contain at least 1 lowercase letters, 1 uppercase letters, 1 digits, 1 special character and should be at least 8 characters long',
  });
  const [inputValueConfirmPassword, setInputValueConfirmPassword] =
    React.useState({
      confirmPassword: '',
      error: false,
      helperText: 'Passwords do not match',
    });
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
          helperText:
            'The password should contain at least 1 lowercase letters, 1 uppercase letters, 1 digits, 1 special character and should be at least 8 characters long',
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
          'The password should contain at least 1 lowercase letters, 1 uppercase letters, 1 digits, 1 special character and should be at least 8 characters long',
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

  // Show Password
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Terms and Conditions
  const [checkedTermsAndConditions, setCheckedTermsAndConditions] =
    React.useState(false);
  const [showTermsAndConditionsError, setShowTermsAndConditionsError] =
    React.useState(false);
  const handleCheckedTermsAndConditions = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckedTermsAndConditions(event.target.checked);
    if (event.target.checked) {
      setShowTermsAndConditionsError(false);
    }
  };

  // Sign Up
  const handleSignUp = () => {
    if (inputValueEmail.email === '') {
      setInputValueEmail({
        ...inputValueEmail,
        error: true,
        helperText: 'Please enter your email address',
      });
    }
    if (inputValueFirstName.firstName === '') {
      setInputValueFirstName({
        ...inputValueFirstName,
        error: true,
        helperText: 'Please enter your first name',
      });
    }
    if (inputValueLastName.lastName === '') {
      setInputValueLastName({
        ...inputValueLastName,
        error: true,
        helperText: 'Please enter your last name',
      });
    }
    if (inputValueMobileNumber.mobileNumber === '') {
      setInputValueMobileNumber({
        ...inputValueMobileNumber,
        error: true,
        helperText: 'Please enter your mobile number',
      });
    }
    if (inputValuePassword.password === '') {
      setInputValuePassword({
        ...inputValuePassword,
        error: true,
        helperText: 'Please enter a valid password',
      });
    }
    if (!checkedTermsAndConditions) {
      setShowTermsAndConditionsError(true);
    }

    if (
      inputValueEmail.email !== '' &&
      inputValueEmail.error === false &&
      inputValueFirstName.firstName !== '' &&
      inputValueFirstName.error === false &&
      inputValueLastName.lastName !== '' &&
      inputValueLastName.error === false &&
      inputValueMobileNumber.mobileNumber !== '' &&
      inputValueMobileNumber.error === false &&
      inputValuePassword.password !== '' &&
      inputValuePassword.error === false &&
      checkedTermsAndConditions
    ) {
      const encryptedPassword = encryptPassword(inputValuePassword.password);
      dispatch(
        fetchCreateUser({
          email: inputValueEmail.email,
          password: encryptedPassword,
          firstName: inputValueFirstName.firstName,
          lastName: inputValueLastName.lastName,
          phoneno: inputValueMobileNumber.mobileNumber,
        })
      ).then((res: any) => {
        if (res.payload && !res.error) {
          navigate('/confirm-email');
        }
      });
    }
  };

  React.useEffect(() => {
    return () => {
      dispatch(setCreateUserError());
    };
  }, []);

  return (
    <>
      <PageTitle title={'Create Account'} />
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
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: isSmallScreen ? '0px' : '0px',
            zIndex: 0,
          }}
        >
          <ArrowBackIosIcon
            sx={{
              height: '16px',
              color: '#0000008F',
              marginLeft: isSmallScreen ? '10px' : '-387px',
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
            marginTop: isSmallScreen ? '-60px' : '-20px',
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
            Create a New Account
          </Typography>
          {createUser.error && (
            <AlertBar
              severity="error"
              message={createUser.errorText}
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
          placeholder="First Name*"
          required
          onChange={handleChangeFirstName}
          InputProps={{
            inputProps: {
              pattern: regexName.source,
            },
          }}
          error={inputValueFirstName.error}
          helperText={
            inputValueFirstName.error ? inputValueFirstName.helperText : ''
          }
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
          placeholder="Last Name*"
          required
          onChange={handleChangeLastName}
          InputProps={{
            inputProps: {
              pattern: regexName.source,
            },
          }}
          error={inputValueLastName.error}
          helperText={
            inputValueLastName.error ? inputValueLastName.helperText : ''
          }
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
          placeholder="Mobile Number*"
          type="number"
          required
          onChange={handleChangeMobileNumber}
          InputProps={{
            inputProps: {
              pattern: regexMobileNumber.source,
            },
          }}
          error={inputValueMobileNumber.error}
          helperText={
            inputValueMobileNumber.error
              ? inputValueMobileNumber.helperText
              : ''
          }
        />
        <StyledTextField
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
            inputProps: {
              pattern: regexPassword.source,
            },
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
          helperText={inputValuePassword.helperText}
        />
        {/* <TextField
        sx={{
          maxWidth: '540px',
          width: '100%',
          paddingLeft: '10px',
          paddingRight: '10px',
          mt: isSmallScreen ? 4.7 : 2.7,
        }}
        type={showConfirmPassword ? 'text' : 'password'}
        id="outlined-basic"
        variant="outlined"
        placeholder="Confirm Password"
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmPassword}
                edge="end"
              >
                {showConfirmPassword ? (
                  <VisibilityIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={handleChangeConfirmPassword}
        error={inputValueConfirmPassword.error}
        helperText={
          inputValueConfirmPassword.error
            ? inputValueConfirmPassword.helperText
            : ''
        }
      /> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: isSmallScreen ? '10px' : '-84px',
            marginTop: isSmallScreen ? '40px' : '25px',
            width: '100%',
            justifyContent: isSmallScreen ? 'flex-start' : 'center',
            alignItems: isSmallScreen ? 'flex-start' : 'center',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Checkbox
              checked={checkedTermsAndConditions}
              onChange={handleCheckedTermsAndConditions}
            />
            <Typography sx={{ padding: '10px' }}>
              I accept the Terms or Conditions and Privacy Policy{' '}
              <span style={{ color: 'red' }}>*</span>
            </Typography>
          </Box>
          {showTermsAndConditionsError ? (
            <FormHelperText
              sx={{
                color: '#D32F2F',
                marginTop: '-10px',
                marginLeft: '-232px',
              }}
            >
              This field is required.
            </FormHelperText>
          ) : (
            ''
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginLeft: isSmallScreen ? '10px' : '-21px',
            marginTop: '-30px',
            width: '100%',
            justifyContent: isSmallScreen ? 'flex-start' : 'center',
            alignItems: isSmallScreen ? 'flex-start' : 'center',
          }}
        >
          <Checkbox />
          <Typography sx={{ padding: '10px' }}>
            I agree to receive occasional emails from the P2PM team and{' '}
            {!isSmallScreen ? <br /> : ''}
            understand that I can change my mind at any time
          </Typography>
        </Box>
        <Button
          variant="contained"
          disableElevation
          sx={{
            boxShadow: 'none',
            width: isSmallScreen ? '95%' : '230px',
            marginLeft: isSmallScreen ? '0px' : '-285px',
          }}
          onClick={handleSignUp}
        >
          Create Account
        </Button>
      </Box>
    </>
  );
};

export default createAccount;
