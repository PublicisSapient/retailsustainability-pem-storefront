import styles from './header.module.scss';

import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Badge, Menu, Paper } from '@mui/material';
import HeaderLogo from '../../assets/logo.svg';
import { globalTheme as theme } from '../../themes/theme';
import SearchBar from './components/searchBar';
import Drawer from './components/drawer';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  fetchNotificationCount,
  setInfoMsg,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import { Email, Logout, Person, Settings } from '@mui/icons-material';

const pages = [
  { name: 'Shop', url: 'product/shop' },
  { name: 'Donate', url: 'donate' },
  { name: 'About Us', url: '' },
];

const settings = ['My Account', 'Favourite', 'Logout'];

export interface HeaderProps {
  handleLogout: any;
}

export function Header(props: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isDrawerOpen, setDrawerState] = React.useState(false);
  const [isSearchOpen, setSearchState] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const searchState = useAppSelector((state) => state.search);
  const { inboxcount } = useAppSelector((state) => state.inbox);
  const handleSearchBar = (value: boolean) => {
    setSearchState(value);
  };
  const toggleDrawer = (value: boolean) => {
    setDrawerState(value);
  };

  const handleNavigation = (url: any) => () => {
    toggleDrawer(false);
    setAnchorElUser(null);
    navigate('/' + url);
  };

  const userName = useAppSelector((state) => state.user?.firstName);
  const userID = useAppSelector((state) => state.user?.id);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    if (userName) {
      dispatch(fetchNotificationCount());
      setAnchorElUser(event.currentTarget);
    } else {
      navigate('/signin');
    }
  };
  const handleMenuLogout = () => {
    props.handleLogout();
    setAnchorElUser(null);
  };
  const handlePostItemClick = () => {
    toggleDrawer(false);
    // if (!userName)
    // dispatch(
    //   setInfoMsg('To post a new listing, please login in to your account.')
    // );
    navigate('/post-item');
  };
  React.useEffect(() => {
    if (
      searchState.triggerApiCounter > 0 &&
      searchState.searchTerm &&
      location.pathname !== 'product/search'
    ) {
      navigate('product/search');
    }
  }, [searchState.triggerApiCounter]);

  return (
    <Box className={styles.header} sx={{ position: { lg: 'sticky' } }}>
      <Box className={styles.offer}>Limited Time Black Friday Sale!</Box>
      <Box className={styles.headerbar}>
        <Paper
          elevation={2}
          sx={{ backgroundColor: theme.palette.background.default }}
        >
          <SearchBar
            isSearchOpen={isSearchOpen}
            handleSearchBar={handleSearchBar}
          />
          <Toolbar
            disableGutters
            sx={{ px: { xs: 2, sm: 4, md: 6 } }}
            className={styles.toolbar}
          >
            <Box
              sx={{
                flexGrow: 0,
                paddingTop: '6px',
                display: { xs: 'none', sm: 'flex' },
              }}
            >
              <NavLink to="/">
                <img src={HeaderLogo} />
              </NavLink>
            </Box>
            <Box
              sx={{ flexGrow: { md: 1 }, display: { sm: 'flex', md: 'none' } }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => toggleDrawer(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <IconButton
                sx={{ mr: 2, display: { sm: 'none' } }}
                onClick={() => handleSearchBar(true)}
              >
                <SearchIcon />
              </IconButton>
            </Box>
            <Box
              flexGrow={1}
              justifyContent="center"
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              <NavLink to="/">
                <Box
                  sx={{
                    mr: 2,
                    display: { xs: 'flex', sm: 'none' },
                    flexGrow: 1,
                  }}
                >
                  <img src={HeaderLogo} />
                </Box>
              </NavLink>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                ml: 3,
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.url} sx={{ margin: '0 4px' }}>
                  <NavLink to={`/${page.url}`}>{page.name}</NavLink>
                </MenuItem>
              ))}
            </Box>

            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <IconButton sx={{ mr: 2 }} onClick={() => handleSearchBar(true)}>
                <SearchIcon />
              </IconButton>
              <Button
                onClick={handlePostItemClick}
                color="primary"
                variant="contained"
                className={styles.postbtn}
              >
                + Post a new listing
              </Button>
            </Box>
            <Box sx={{ flexGrow: 0, ml: 2 }}>
              <Button
                variant="text"
                color="primary"
                onClick={handleAvatarClick}
              >
                <Badge badgeContent={inboxcount} color="primary">
                  <AccountCircleIcon
                    fontSize="large"
                    sx={{ color: theme.palette.grey[700] }}
                  />
                </Badge>
                {!userName && (
                  <Typography
                    variant="body2"
                    color="initial"
                    sx={{
                      textTransform: 'none',
                      marginLeft: '8px',
                      display: { xs: 'none', md: 'flex' },
                    }}
                  >
                    Login/Register
                  </Typography>
                )}
              </Button>
              <Menu
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 6,
                    ml: -1.5,
                    background: theme.palette.background.default,
                    '& .MuiAvatar-root': {
                      width: 45,
                      height: 32,
                      ml: -0.5,
                      mr: 1.5,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: theme.palette.background.default,
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleNavigation(`account`)}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  My Account
                </MenuItem>
                <MenuItem onClick={handleNavigation(`profile/${userID}`)}>
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  View Profile
                </MenuItem>
                <MenuItem onClick={handleNavigation('inbox')}>
                  <ListItemIcon>
                    <Badge badgeContent={inboxcount} color="primary">
                      <Email fontSize="small" />
                    </Badge>
                  </ListItemIcon>
                  Inbox
                </MenuItem>

                <MenuItem onClick={handleMenuLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
          <Drawer
            isDrawerOpen={isDrawerOpen}
            toggleDrawer={toggleDrawer}
            handleNavigation={handleNavigation}
            handlePostItemClick={handlePostItemClick}
            userName={userName ?? ''}
            handleLogout={props.handleLogout}
            userID={userID}
          />
        </Paper>
      </Box>
    </Box>
  );
}

export default Header;
