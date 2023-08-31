import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { getUserLogout, setTriggerCookieCheck } from './userSlice';
import { Config } from '../../utils/interface';
interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  offerType: string;
  images: string[];
  location: string;
  geoLocation: {
    latitude: string;
    longitude: string;
  };
  user: string;
  price: string;
  createdTime: number;
}
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneno: string;
  description: string;
  location: string;
  profileImage: string;
  socialUrls: string[];
  createdTime: number;
}

interface ProductData {
  data: any;
  product: Product;
  user: User;
  avgRating: number;
  isLoading: boolean;
  error: boolean;
}

const initialState: ProductData = {
  product: {
    id: '',
    name: '',
    description: '',
    category: '',
    offerType: '',
    images: [],
    location: '',
    geoLocation: {
      latitude: '',
      longitude: '',
    },
    user: '',
    price: '',
    createdTime: 0,
  },
  user: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneno: '',
    description: '',
    location: '',
    profileImage: '',
    socialUrls: [],
    createdTime: 0,
  },
  avgRating: 0,
  isLoading: false,
  error: false,
  data: {},
};

export const fetchProduct = createAsyncThunk<ProductData, any>(
  'product/fetchProduct',
  async (payload, { rejectWithValue }) => {
    const url = `${process.env.NX_API_URL}/product-service/products/pdp/${payload.id}`;
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

export const removeProduct = createAsyncThunk<ProductData, any>(
  'product/removeProduct',
  async (payload, { dispatch, rejectWithValue }) => {
    const url = `${process.env.NX_API_URL}/product-service/products/${payload.id}`;
    try {
      let config: Config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url,
        headers: {
          'Content-Type': 'application/json',
          'X-Frame-Options': 'DENY',
        },
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

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    flushProductState: (state) => {
      state.product = {
        id: '',
        name: '',
        description: '',
        category: '',
        offerType: '',
        images: [],
        location: '',
        geoLocation: {
          latitude: '',
          longitude: '',
        },
        user: '',
        price: '',
        createdTime: 0,
      };
      state.user = {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneno: '',
        description: '',
        location: '',
        profileImage: '',
        socialUrls: [],
        createdTime: 0,
      };
      state.avgRating = 0;
      state.isLoading = false;
      state.error = false;
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = {
        ...state.product,
        ...action.payload.data.product,
      };
      state.user = {
        ...state.user,
        ...action.payload.data.user,
      };
      state.avgRating = action.payload.data.avgRating;
    });
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    });
    builder.addCase(fetchProduct.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(removeProduct.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const { flushProductState } = productSlice.actions;
export default productSlice.reducer;
