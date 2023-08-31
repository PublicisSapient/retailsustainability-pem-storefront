import React from 'react';
import {
  Button,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  ListItemIcon,
} from '@mui/material';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import HeaderLogo from '../assets/logo.svg';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { globalTheme as theme } from '../../../themes/theme';
import styles from '../header.module.scss';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ApartmentIcon from '@mui/icons-material/Apartment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Email, Person, Settings } from '@mui/icons-material';

type DrawerProps = {
  isDrawerOpen: boolean;
  toggleDrawer: (isOpen: boolean) => void;
  handleNavigation: (url: string) => () => void;
  handlePostItemClick: () => void;
  userName: string;
  handleLogout: any;
  userID: string;
};

type IconMapperProps = {
  [key: string]: React.ReactNode;
};

const drawer: React.FC<DrawerProps> = ({
  isDrawerOpen,
  toggleDrawer,
  handleNavigation,
  handlePostItemClick,
  userName,
  userID,
  handleLogout,
}) => {
  const iconMapper: IconMapperProps = {
    Shop: <ShoppingCartIcon />,
    Sell: <SwapHorizIcon />,
    'About Us': <ApartmentIcon />,
    favourite: <FavoriteBorderIcon />,
    'My Account': <Settings />,
    'View Profile': <Person />,
    Inbox: <Email />,
    Donate: <VolunteerActivismIcon />,
  };
  const listLinks = [
    { name: 'Shop', url: 'product/shop' },
    { name: 'About Us', url: 'about' },
  ];

  const accountLink = [
    { name: 'Donate', url: 'donate' },
    { name: 'My Account', url: '' },
    { name: 'View Profile', url: `profile/${userID}` },
    { name: 'Inbox', url: 'inbox' },
  ];

  return (
    <Drawer
      anchor="left"
      open={isDrawerOpen}
      onClose={() => toggleDrawer(false)}
      sx={{
        '.MuiDrawer-paper': {
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      <Box
        sx={{
          width: 375,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 3,
          }}
        >
          <NavLink to="/">
            <img src={HeaderLogo} />
          </NavLink>
          <IconButton size="medium" onClick={() => toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ p: 3, display: 'flex' }}>
          <AccountCircleIcon
            fontSize="large"
            sx={{ color: theme.palette.grey[700] }}
          />
          <Box sx={{ ml: 2.5 }}>
            <Typography variant="h5" color="initial">
              {userName.length > 0 ? `Hi ${userName}` : 'Welcome to P2PM'}
            </Typography>
            <Typography variant="body1" color="initial">
              Creating sustainable future
            </Typography>
            {userName && (
              <Link onClick={handleNavigation('account')} variant="body1">
                My Account
              </Link>
            )}
          </Box>
        </Box>
        <Divider />

        <List>
          {listLinks.map((page, index) => (
            <ListItem key={page.url} disablePadding>
              <ListItemButton onClick={handleNavigation(page.url)}>
                <ListItemIcon>{iconMapper[page.name]}</ListItemIcon>
                <ListItemText primary={page.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
        {userName && (
          <>
            <List>
              {accountLink.map((page, index) => (
                <ListItem key={page.url} disablePadding>
                  <ListItemButton onClick={handleNavigation(page.url)}>
                    <ListItemIcon>{iconMapper[page.name]}</ListItemIcon>
                    <ListItemText primary={page.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </>
        )}
        <Button
          onClick={handlePostItemClick}
          color="primary"
          variant="contained"
          className={styles.postbtn}
          sx={{ m: 3, width: '-webkit-fill-available' }}
        >
          + Post a new listing
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {userName.length > 0 ? (
            <Link onClick={handleLogout} variant="body1">
              Logout
            </Link>
          ) : (
            <>
              <Link
                onClick={handleNavigation('signin')}
                sx={{ mx: 1 }}
                variant="body1"
              >
                Login
              </Link>
              <Link
                onClick={handleNavigation('register')}
                sx={{ mx: 1 }}
                variant="body1"
              >
                Sign Up
              </Link>
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default drawer;
