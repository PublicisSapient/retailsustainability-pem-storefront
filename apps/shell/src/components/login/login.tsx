import * as React from 'react';
import Box from '@mui/material/Box';

import { alpha, styled } from '@mui/material/styles';
import { InputBase, Stack, Button, Drawer, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function Login() {
  const [state, setState] = React.useState(false);

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' && (event as React.KeyboardEvent).key === 'Enter') {
        return;
      }

      setState(open);
    };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
    },
  }));

  const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const list = (anchor: Anchor) => (
    
      <Stack direction="row" spacing={2} minHeight={70} justifyContent="center" alignItems="center">
        <Item sx={{flexGrow:1}}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Item>
        <Item sx={{pr:3}}>
          <Button tabIndex={2} color="primary" variant="contained"  onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}>
            Search
          </Button>
        </Item>
      </Stack>
    
  );

  return (
    <div>
          <Button onClick={toggleDrawer(true)}>top</Button>
          <Drawer
            anchor="top"
            open={state}
            onClose={toggleDrawer(false)}
          >
            {list('top')}
          </Drawer>
    </div>
  );
}
