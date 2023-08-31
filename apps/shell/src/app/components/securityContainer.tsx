import React from 'react';
import { Box, Button, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import {
  globalTheme as theme,
  useAppDispatch,
  useAppSelector,
  deleteProfile,
  getUserLogout,
} from '@p2p-exchange/core';
import { useNavigate } from 'react-router-dom';

const securityContainer = () => {
  const userEmail = useAppSelector((state) => state.user.email);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showCnfDelBtn, setShowCnfDelBtn] = React.useState(false);
  const handleChangePassword = () => {
    navigate('/account/change-password');
  };
  const handleDeleteAccount = () => {
    dispatch(deleteProfile()).then((res: any) => {
      if (res.payload && !res.error) {
        dispatch(getUserLogout());
        navigate('/');
      }
    });
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mb: 6 }}>
      <Typography variant="h5" color="initial">
        Email Address
      </Typography>
      <Typography
        variant="body1"
        color="initial"
        sx={{
          mr: 3,
          width: '100%',
          bgcolor: theme.palette.grey[100],
          p: 1.5,
          mt: 3,
          mb: 2,
        }}
      >
        {userEmail}
      </Typography>
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="Receive notifications"
      />
      <Button variant="outlined" color="primary" sx={{ maxWidth: 343, mt: 3 }}>
        Save Changes
      </Button>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h5" color="initial">
        Password
      </Typography>
      <Box sx={{ mt: 3, display: 'flex', flexDirection: 'row' }}>
        <Typography variant="body1" color="initial">
          **************
        </Typography>
        <Link
          component="button"
          onClick={handleChangePassword}
          variant="body1"
          sx={{ mx: 2 }}
        >
          Change Password
        </Link>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h5" color="initial">
        Delete Account
      </Typography>
      <Typography variant="body1" color="initial" sx={{ my: 3 }}>
        If you delete your account, your personal information (name, phone
        number, address, email, profile picture, etc.) and all the listings will
        be deleted permanently and can’t be recovered. You won’t be able to
        reactivate your account.
      </Typography>
      {!showCnfDelBtn && (
        <Button
          variant="outlined"
          color="primary"
          sx={{ maxWidth: 343, mt: 3 }}
          onClick={() => setShowCnfDelBtn(true)}
        >
          Permanently delete my account
        </Button>
      )}
      {showCnfDelBtn && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: '24px',
            mt: 3,
          }}
        >
          <Button
            variant="contained"
            color="warning"
            fullWidth
            onClick={handleDeleteAccount}
          >
            Confirm Account Deletion
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => setShowCnfDelBtn(false)}
          >
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default securityContainer;
