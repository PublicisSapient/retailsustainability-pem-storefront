import React from 'react';
import {
  ClickAwayListener,
  Grid,
  InputAdornment,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import styles from '../header.module.scss';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {
  setSearchTerm,
  useAppDispatch,
  triggerSearch,
  useAppSelector,
  flushSuggestions,
  fetchSearchSuggetions,
} from '../../../store';
import { useNavigate, useLocation } from 'react-router-dom';
import Autocomplete, {
  AutocompleteInputChangeReason,
  AutocompleteRenderOptionState,
} from '@mui/material/Autocomplete';
import { globalTheme } from '../../../themes/theme';

type SearchBarProps = {
  isSearchOpen: boolean;
  handleSearchBar: (isOpen: boolean) => void;
};

const searchBar: React.FC<SearchBarProps> = ({
  isSearchOpen,
  handleSearchBar,
}) => {
  const storeSearchTerm = useAppSelector((state) => state.search.searchTerm);
  const searchSuggestions = useAppSelector(
    (state) => state.search.suggestionState.suggestions
  );
  const isInitialRender = React.useRef(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [isKeyPress, setKeyPress] = React.useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<{}>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => {
    dispatch(setSearchTerm(value));
  };
  const handlePopUpChange = (value: string | null) => {
    dispatch(setSearchTerm(value || ''));
    handleTriggerSearch();
    setOpen(false);
  };
  const handleTriggerSearch = () => {
    if (location.pathname !== 'product/search') navigate('product/search');
    setKeyPress(false);
    dispatch(triggerSearch());
  };
  const clearSearchBar = () => {
    dispatch(setSearchTerm(''));
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setKeyPress(true);
    if (event.key === 'Enter') {
      handleTriggerSearch();
      setOpen(false);
    }
  };
  const handleSearchBarClose = () => {
    handleSearchBar(false);
  };
  const handleSuggestionApiCall = () => {
    dispatch(fetchSearchSuggetions());
    setOpen(storeSearchTerm !== '');
  };
  React.useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else if (isKeyPress) {
      let debounceTimer: NodeJS.Timeout | undefined;
      const debounceSearch = () => {
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }
        debounceTimer = setTimeout(() => {
          handleSuggestionApiCall();
        }, 800);
      };
      debounceSearch();
      return () => {
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }
      };
    }
  }, [storeSearchTerm]);
  React.useEffect(() => {
    !isSearchOpen && dispatch(flushSuggestions());
  }, [isSearchOpen]);

  const renderOption = (
    props: any,
    option: string,
    state: AutocompleteRenderOptionState
  ) => {
    return [
      <ListItem
        key={props.key}
        onClick={() => handlePopUpChange(props.key)}
        sx={{
          cursor: 'pointer',
          '&:hover': {
            bgcolor: globalTheme.palette.grey[100],
          },
        }}
      >
        <ListItemText
          disableTypography
          primary={
            <Typography variant="body2" color="initial">
              {option}
            </Typography>
          }
        />
      </ListItem>,
      props.key !== searchSuggestions.at(-1) && (
        <Divider key={`${props.key}-divider`} variant="inset" sx={{ ml: 0 }} />
      ),
    ];
  };

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={() => handleSearchBarClose()}
    >
      <Toolbar
        disableGutters
        sx={{ px: 3, width: '100%' }}
        className={
          `${styles.toolbar} ${styles.float} ` +
          (isSearchOpen ? styles.searchOpen : '')
        }
      >
        <Grid
          container
          spacing={0}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={8} lg={6}>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Autocomplete
                sx={{
                  display: 'flex',
                  width: '100%',
                }}
                freeSolo
                options={searchSuggestions}
                open={open && searchSuggestions.length > 0}
                onInputChange={handleInputChange}
                // onChange={handlePopUpChange}
                onKeyPress={handleKeyPress}
                value={storeSearchTerm}
                disablePortal
                disableClearable
                ListboxComponent={List}
                renderOption={renderOption}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ width: '100%', m: { xs: 0, sm: 3 } }}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={clearSearchBar}
                            aria-label="toggle password visibility"
                          >
                            {storeSearchTerm ? <CloseIcon /> : <SearchIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{
                      ...params.inputProps,
                      maxLength: 60,
                    }}
                  />
                )}
              />
              <Button
                color="primary"
                variant="contained"
                className={styles.postbtn}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
                onClick={() => handleTriggerSearch()}
              >
                Search
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </ClickAwayListener>
  );
};

export default searchBar;
