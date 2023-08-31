import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from '../storeHelper';
import { getErrorMessage } from '../../utils/errorMap';
import { getUserLogout, setTriggerCookieCheck } from './userSlice';
import { Config } from '../../utils/interface';
interface Product {
  id: string;
  name: string;
  description: string;
  category: null | string;
  offerType: string;
  images: null | string[];
  location: string;
  geoLocation: {
    latitude: string;
    longitude: string;
  };
  user: string;
  price: string;
  categories: string[];
  dropLocationType: string;
  dropLocation: string;
  dropDate: number;
  createdTime: number;
}

interface DonationState {
  error: string;
  isLoading: boolean;
  data: Product[];
  numberOfProducts: number;
}

const initialState: DonationState = {
  isLoading: false,
  error: '',
  data: [],
  numberOfProducts: 0,
};

type DonationResponse = {
  statusCode: number;
  data: {
    products: Product[];
    numberOfProducts: number;
  };
  message: string;
};

export const fetchDonation = createAsyncThunk<DonationResponse, any>(
  'product/fetchProduct',
  async (payload, { rejectWithValue }) => {
    const url = `${process.env.NX_API_URL}/product-service/products/donation/${payload}`;
    try {
      let config: Config = {
        method: 'get',
        maxBodyLength: Infinity,
        url,
        headers: {
          'Content-Type': 'application/json',
          'X-Frame-Options': 'DENY',
        },
      };
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const saveDonation = createAsyncThunk<DonationResponse, any>(
  'product/saveProduct',
  async (payload, { dispatch, rejectWithValue }) => {
    const url = `${process.env.NX_API_URL}/product-service/products/donation`;
    try {
      let config: Config = {
        method: 'post',
        maxBodyLength: Infinity,
        url,
        headers: {
          'Content-Type': 'application/json',
          'X-Frame-Options': 'DENY',
        },
        data: JSON.stringify(payload),
      };
      const response = await axios.request(config);
      dispatch(setTriggerCookieCheck());
      return response.data;
    } catch (error) {
      const errorStatusCode = (
        (rejectWithValue(error).payload as AxiosError).response as any
      )?.status;
      if (errorStatusCode === 401) dispatch(getUserLogout());
      if (errorStatusCode === 403) dispatch(setTriggerCookieCheck());
      return rejectWithValue(error);
    }
  }
);

export const updateDonation = createAsyncThunk<DonationResponse, any>(
  'product/saveProduct',
  async (payload, { dispatch, rejectWithValue }) => {
    const url = `${process.env.NX_API_URL}/product-service/products/donation/${payload.id}`;
    try {
      let config: Config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url,
        headers: {
          'Content-Type': 'application/json',
          'X-Frame-Options': 'DENY',
        },
        data: JSON.stringify(payload.data),
      };
      const response = await axios.request(config);
      dispatch(setTriggerCookieCheck());
      return response.data;
    } catch (error) {
      const errorStatusCode = (
        (rejectWithValue(error).payload as AxiosError).response as any
      )?.status;
      if (errorStatusCode === 401) dispatch(getUserLogout());
      if (errorStatusCode === 403) dispatch(setTriggerCookieCheck());
      return rejectWithValue(error);
    }
  }
);

export const donationSlice = createSlice({
  name: 'donation',
  initialState,
  reducers: {
    flushDonationListing: (state) => {
      state.data = [];
      state.numberOfProducts = 0;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDonation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDonation.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload.data.products,
        numberOfProducts: action.payload.data.numberOfProducts,
        isLoading: false,
        error: '',
      };
    });
    builder.addCase(fetchDonation.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: getErrorMessage(action.payload as AxiosError),
      };
    });
  },
});
export const { flushDonationListing } = donationSlice.actions;
export default donationSlice.reducer;
