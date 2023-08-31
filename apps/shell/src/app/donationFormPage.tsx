import * as React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { AlertBar, PageTitle } from '@p2p-exchange/shared';
import {
  useAppDispatch,
  useAppSelector,
  fetchCreateUser,
  setCreateUserError,
  setInfoMsg,
} from '@p2p-exchange/core';
import { InfoOutlined } from '@mui/icons-material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { saveDonation, updateDonation } from '@p2p-exchange/core';
import { openSnackBar } from '@p2p-exchange/core';
import { fetchProduct } from 'libs/core/src/lib/store/slices/productSlice';
import dayjs from 'dayjs';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function convertToTitleCase(str: string) {
  var words = str.split('_');
  for (var i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0) + words[i].slice(1).toLowerCase();
  }
  return words.join(' ');
}

const StyledTextField = styled(TextField)((props) => ({
  '& .MuiFormHelperText-root': {
    position: 'static',
  },
}));

const categories = [
  'Cloth',
  'Electronic',
  'Book',
  'Toy',
  'Mobile',
  'Furniture',
  'Vehicle',
];

const offices = ['Bengaluru', 'Gurgaon', 'Chennai', 'Noida', 'Pune'];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const donationFormPage = () => {
  const isSmallScreen = useMediaQuery('(max-width:532px)');
  const navigate = useNavigate();
  const createUser = useAppSelector((state) => state.createUser);
  const currentUser = useAppSelector((state) => state.user?.id);
  const location = useLocation();

  const dispatch = useAppDispatch();
  const theme = useTheme();

  const match = useMatch('/donate-item/edit/:id');
  const donationId = match?.params.id;

  const tomorrow = dayjs().add(1, 'day');

  React.useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch(setCreateUserError());
    };
  }, []);

  //Title Validation
  const regexTitle = /^.{1,50}$/g;
  const [inputValueTitle, setInputValueTitle] = React.useState({
    title: '',
    error: false,
    helperText: 'Invalid Title',
  });
  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValueTitle({
      ...inputValueTitle,
      title: value,
      error: false,
      helperText: '',
    });
  };

  // Select item Categories
  const [category, setCategory] = React.useState<string[]>([]);
  const [categoryError, setCategoryError] = React.useState(false);

  const handleChangeSelectCategory = (
    event: SelectChangeEvent<typeof category>
  ) => {
    const {
      target: { value },
    } = event;
    const uppercaseValues = typeof value === 'string' ? value.split(',').map((item) => item.trim().toUpperCase()) : value.map((item) => item.toUpperCase()); 
    setCategory(uppercaseValues);
    // setCategory(
    //   // On autofill we get a stringified value.
    //   typeof value === 'string' ? value.split(',') : value
    // );
  };

  // Description
  const [inputValueDescription, setInputValueDescription] = React.useState({
    description: '',
    error: false,
    helperText: 'Invalid Description',
  });
  const wordCount = (inputValueDescription.description.match(/\S+/g) || [])
    .length;
  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    if (wordCount <= 100) {
      setInputValueDescription({
        ...inputValueDescription,
        description: value,
        error: false,
        helperText: '',
      });
    } else {
      setInputValueDescription({
        ...inputValueDescription,
        description: value,
        error: true,
        helperText: 'Maximum 100 words allowed',
      });
    }
  };

  //Radio Group
  const [valueRadio, setValueRadio] = React.useState('PUBLICIS_SAPIENT_OFFICE');

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueRadio((event.target as HTMLInputElement).value);
  };

  // Office Select
  const [office, setOffice] = React.useState<string[]>([]);
  const [officeError, setOfficeError] = React.useState(false);

  const handleChangeSelectOffice = (
    event: SelectChangeEvent<typeof office>
  ) => {
    const {
      target: { value },
    } = event;
    setOffice(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  // Date Picker
  const [selectedDate, setSelectedDate] = React.useState(
    tomorrow.toISOString()
  );
  const [dateError, setDateError] = React.useState(false);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleSubmitDonationForm = () => {
    if (inputValueTitle.title.length === 0) {
      setInputValueTitle({
        ...inputValueTitle,
        error: true,
        helperText: 'Invalid Title',
      });
    }
    if (category.length === 0) {
      setCategoryError(true);
    }
    if (office.length === 0) {
      setOfficeError(true);
    }
    if (selectedDate === null || dayjs(selectedDate).isBefore(dayjs())) {
      setDateError(true);
    }

    if (
      inputValueTitle.title.length !== 0 &&
      category.length !== 0 &&
      office.length !== 0 &&
      selectedDate != null &&
      donationId === undefined &&
      dateError === false
    ) {
      if (location.pathname === '/donate-item') {
        const donationData = {
          name: inputValueTitle.title,
          categories: category,
          description: inputValueDescription.description,
          dropLocationType: valueRadio,
          dropLocation: office[0].toString(),
          dropDate: selectedDate,
        };
        dispatch(saveDonation(donationData)).then((res) => {
          if (res.payload) {
            dispatch(
              openSnackBar({
                message: 'Donation form submitted successfully',
              })
            );
            navigate('/');
          }
        });
      } else {
        const donationData = {
          name: inputValueTitle.title,
          categories: category,
          description: inputValueDescription.description,
          dropLocationType: valueRadio,
          dropLocation: office[0].toString(),
          dropDate: selectedDate,
        };
        dispatch(updateDonation({ id: donationId, data: donationData })).then(
          (res) => {
            if (res.payload) {
              dispatch(
                openSnackBar({
                  message: 'Donation form updated successfully',
                })
              );
              navigate('/');
            }
          }
        );
      }
    }
  };

  React.useEffect(() => {
    if (donationId) {
      dispatch(fetchProduct({ id: donationId as string })).then((res) => {
        const response = res.payload as any;
        if (response) {
          setInputValueTitle({
            ...inputValueTitle,
            title: response.data.product.name,
            error: false,
            helperText: '',
          });
          setCategory(response.data.product.categories);
          setInputValueDescription({
            ...inputValueDescription,
            description: response.data.product.description,
            error: false,
            helperText: '',
          });
          setValueRadio(response.data.product.dropLocationType);
          setOffice([response.data.product.dropLocation]);
          setSelectedDate(dayjs(response.data.product.dropDate).toISOString());
        }
      });
    }
  }, []);
  React.useEffect(() => {
    if (!currentUser) {
      dispatch(setInfoMsg('To donate, please login in to your account.'));
      navigate('/signin');
    }
  }, [currentUser]);

  return (
    <>
      <PageTitle title={'Donate your pre-loved items'} />
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
            marginTop: isSmallScreen ? '-60px' : '-20px',
            flexDirection: 'column',
          }}
        >
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: 500,
              marginLeft: isSmallScreen ? '10px' : '-195px',
              flex: isSmallScreen ? '1 1 auto' : 'none',
              marginTop: isSmallScreen ? '55px' : '48px',
            }}
          >
            Donate your pre-loved items
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
          placeholder="Donation Title*"
          required
          value={inputValueTitle.title}
          onChange={handleChangeTitle}
          inputProps={{
            maxLength: 50,
          }}
          error={inputValueTitle.error}
          helperText={inputValueTitle.error ? inputValueTitle.helperText : ''}
        />
        <FormControl
          sx={{
            maxWidth: '540px',
            width: '100%',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          <Select
            error={categoryError}
            multiple
            displayEmpty
            value={category}
            onChange={handleChangeSelectCategory}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <Typography
                    sx={{ color: 'var(--text-secondary, rgba(0, 0, 0, 0.60))' }}
                  >
                    Select Item Categories (Max 10)
                  </Typography>
                );
              }

              return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              );
            }}
            MenuProps={MenuProps}
          >
            {categories.map((item) => (
              <MenuItem
                key={item}
                value={item}
                style={getStyles(item, category, theme)}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box
          sx={{
            maxWidth: '540px',
            width: '100%',
            paddingLeft: '10px',
            paddingRight: '10px',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '-15px',
          }}
        >
          <InfoOutlined
            sx={{ color: 'var(--text-secondary, rgba(0, 0, 0, 0.60))' }}
          ></InfoOutlined>
          <Typography
            sx={{
              fontSize: '12px',
              fontWeight: '400',
              marginLeft: '5px',
            }}
          >
            In the description, mention the details of the items that you are
            planning to donate.
          </Typography>
        </Box>
        <StyledTextField
          sx={{
            maxWidth: '540px',
            width: '100%',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
          id="outlined-basic"
          variant="outlined"
          placeholder="Detailed Description (optional)"
          required
          multiline
          value={inputValueDescription.description}
          rows={4}
          inputProps={{
            maxLength: 1000,
          }}
          onChange={handleChangeDescription}
          helperText={`${inputValueDescription.description.length}/1000`}
        />
        <FormControl
          sx={{
            maxWidth: '540px',
            width: '100%',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          <FormLabel>Select Drop off Location</FormLabel>
          <RadioGroup value={valueRadio} onChange={handleChangeRadio}>
            <FormControlLabel
              value="PUBLICIS_SAPIENT_OFFICE"
              control={<Radio />}
              label="Publicis Sapient Office"
              sx={{ marginLeft: '0px' }}
            />
            <FormControlLabel
              value="PARTNERED_NGOS"
              control={<Radio />}
              label="Partner NGOs"
              sx={{ marginLeft: '0px' }}
            />
          </RadioGroup>
        </FormControl>
        <FormControl
          sx={{
            maxWidth: '540px',
            width: '100%',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          <Select
            error={officeError}
            displayEmpty
            value={office}
            onChange={handleChangeSelectOffice}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <Typography
                    sx={{ color: 'var(--text-secondary, rgba(0, 0, 0, 0.60))' }}
                  >
                    Select a {convertToTitleCase(valueRadio)}
                  </Typography>
                );
              }

              return selected;
            }}
            MenuProps={MenuProps}
          >
            {offices.map((office) => (
              <MenuItem
                key={office}
                value={office}
                style={getStyles(office, category, theme)}
              >
                {office}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={['DatePicker']}
            sx={{
              maxWidth: '540px',
              width: '100%',
              paddingLeft: '10px',
              paddingRight: '10px',
              height: '90px',
            }}
          >
            <DatePicker
              label="Select Drop Off Date"
              value={dayjs(selectedDate)}
              onChange={(newValue) => handleDateChange(newValue)}
              disablePast
              slotProps={{
                textField: {
                  helperText: dateError ? (
                    <span style={{ color: '#D32F2F' }}>Enter a valid Date</span>
                  ) : (
                    'MM/DD/YYYY'
                  ),
                },
              }}
              sx={{
                maxWidth: '540px',
                width: '100%',
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Button
          variant="contained"
          disableElevation
          sx={{
            boxShadow: 'none',
            width: isSmallScreen ? '95%' : '230px',
            marginLeft: isSmallScreen ? '0px' : '-285px',
            marginTop: '0px',
          }}
          onClick={handleSubmitDonationForm}
        >
          {donationId !== undefined ? 'Edit Donation' : 'Donate'}
        </Button>
        <Box
          sx={{
            maxWidth: '540px',
            width: '100%',
            paddingLeft: '10px',
            paddingRight: '10px',
            display: 'flex',
            alignItems: 'center',
            marginBottom: isSmallScreen ? '20px' : '80px',
          }}
        >
          <InfoOutlined
            sx={{ color: 'var(--text-secondary, rgba(0, 0, 0, 0.60))' }}
          ></InfoOutlined>
          <Typography
            sx={{
              fontSize: '12px',
              fontWeight: '400',
              marginLeft: '5px',
            }}
          >
            Once submitted, you can view/edit your donation details in your
            Account listings section. The donation details are private and not
            visible to your profile viewers.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default donationFormPage;
