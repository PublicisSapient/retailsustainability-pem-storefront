import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useMediaQuery, Button, Drawer } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Filter from './filter';
import {
  globalTheme,
  setSortByOption,
  triggerSearch,
  useAppDispatch,
  useAppSelector,
} from '@p2p-exchange/core';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },

    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },

      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
type ListingHeaderProps = {
  productCount: number;
};
const listingContainerHeader = ({ productCount }: ListingHeaderProps) => {
  const isTabletScreen = useMediaQuery('(min-width:899px)');
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isDrawerOpen, setDrawerState] = React.useState(false);
  const offerTypeFilters = useAppSelector(
    (state) => state?.search.offerTypeFilters
  );
  const updatedSort = useAppSelector(
    (state) => state?.search?.selectedFilters?.selectedSort
  );
  const open = Boolean(anchorEl);
  const isOnlyGiveAwayProducts =
    offerTypeFilters.length === 1 && offerTypeFilters[0] === 'giveaway';
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuChange = (event: any) => {
    dispatch(setSortByOption(event.target.innerText));
    dispatch(triggerSearch());
    setAnchorEl(null);
  };
  const toggleDrawer = (value: boolean) => {
    setDrawerState(value);
  };
  const handleDrawerClose = () => {
    setDrawerState(false);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: { sm: 2, md: 0 },
      }}
    >
      <Typography variant="body2" color="initial">
        {productCount} Results
      </Typography>
      {!isTabletScreen && (
        <>
          <Button
            startIcon={<FilterListIcon />}
            onClick={() => toggleDrawer(true)}
          >
            Filter
          </Button>
          <Drawer
            anchor="bottom"
            open={isDrawerOpen}
            onClose={() => toggleDrawer(false)}
            sx={{
              '.MuiDrawer-paper': {
                backgroundColor: globalTheme.palette.background.default,
                height: '100%',
              },
            }}
          >
            <Box
              sx={{
                width: '100vw',
                px: 2.5,
                py: 3,
              }}
            >
              <Filter handleDrawerClose={handleDrawerClose} />
            </Box>
          </Drawer>
        </>
      )}
      {isTabletScreen && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="subtitle2"
            color="initial"
            sx={{ mr: 0.5, fontWeight: 600 }}
          >
            Sort By :
          </Typography>
          <Typography variant="body2" color="initial">
            {updatedSort}
          </Typography>
          <IconButton aria-label="arrow" onClick={handleClick}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleMenuChange} disableRipple>
              Date
            </MenuItem>
            <MenuItem onClick={handleMenuChange} disableRipple>
              Relevance
            </MenuItem>
            {!isOnlyGiveAwayProducts && (
              <>
                <MenuItem onClick={handleMenuChange} disableRipple>
                  Price (Low to High)
                </MenuItem>
                <MenuItem onClick={handleMenuChange} disableRipple>
                  Price (High to Low)
                </MenuItem>
              </>
            )}
          </StyledMenu>
        </Box>
      )}
    </Box>
  );
};

export default listingContainerHeader;
