import React from 'react';
import { Link, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { globalTheme as theme, useAppSelector } from '@p2p-exchange/core';
import { useAppDispatch, getUserLogout } from '@p2p-exchange/core';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

type AccountNavProps = {
  selectedNav: string;
  handleNavChange: (val: string) => void;
};

const accountNav = ({ selectedNav, handleNavChange }: AccountNavProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isTabletScreen = useMediaQuery('(min-width:899px)');
  const userName = useAppSelector((state) => state.user.firstName);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    handleNavChange((event.target as HTMLInputElement).textContent);
  };
  const handleChange = (event: SelectChangeEvent) => {
    handleNavChange(event.target.value);
  };
  const handleLogout = () => {
    dispatch(getUserLogout());
    navigate('/');
  };

  const navRoutes = ['Profile Info', 'Listings', 'Account Security'];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1" color={theme.palette.grey[700]}>
          Welcome {userName}
        </Typography>
        {!isTabletScreen && (
          <Link
            component="button"
            onClick={handleLogout}
            variant="body1"
            sx={{ mx: 2 }}
          >
            Logout
          </Link>
        )}
      </Box>

      {isTabletScreen ? (
        <>
          <Typography variant="h6" color="initial">
            My Account
          </Typography>
          <List sx={{ my: 3 }} component="nav" aria-label="myaccount nav">
            {navRoutes?.map((ele: string, index: number) => (
              <ListItemButton
                selected={selectedNav === ele}
                onClick={handleListItemClick}
                key={index}
              >
                <ListItemText primary={ele} />
              </ListItemButton>
            ))}
          </List>
          <Link
            component="button"
            onClick={handleLogout}
            variant="body1"
            sx={{ mx: 2 }}
          >
            Logout
          </Link>
        </>
      ) : (
        <FormControl variant="filled" sx={{ width: '100%', my: 3 }}>
          <InputLabel>My Account</InputLabel>
          <Select value={selectedNav} onChange={handleChange}>
            {navRoutes?.map((ele: string, index: number) => (
              <MenuItem value={ele} key={index}>
                {ele}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default accountNav;
