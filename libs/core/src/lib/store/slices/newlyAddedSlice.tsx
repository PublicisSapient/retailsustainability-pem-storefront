import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  decrementLoaderCounter,
  incrementLoaderCounter,
} from './globalLoaderSlice';
import { RootState } from '../storeHelper';
import { Config } from '../../utils/interface';
interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  offerType: string;
  images: string[];
  geoLocation: {
    latitude: string;
    longitude: string;
  };
  user: string;
  price: string;
  createdTime: string;
}
interface NewlyAddedState {
  error: string;
  isLoading: boolean;
  data: Product[];
}
const initialState: NewlyAddedState = {
  isLoading: false,
  error: '',
  data: [],
};
type SearchResponse = {
  products: Product[];
  offerTypeListings: string[];
  categoryListings: string[];
  noOfProducts: number;
};
export const fetchNewlyAdded = createAsyncThunk<SearchResponse, any>(
  'newlyAdded/fetchNewlyAdded',
  async (payload, { dispatch, getState, rejectWithValue }) => {
    try {
      //TODO::Send the comented paylod to integrate geo-location
      const store: RootState = getState() as RootState;
      const apiPayload = {
        ...payload,
        ...(store?.user.userPosition.latitude && {
          latitude: store?.user.userPosition.latitude,
          longitude: store?.user.userPosition.longitude,
        }),
      };
      dispatch(incrementLoaderCounter());
      let config: Config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.NX_API_URL}/search-service/search`,
        headers: {
          'Content-Type': 'application/json',
          'X-Frame-Options': 'DENY',
        },
        data: JSON.stringify(apiPayload),
      };
      const response = await axios.request(config);
      dispatch(decrementLoaderCounter());
      return response.data.data;
    } catch (error) {
      dispatch(decrementLoaderCounter());
      return rejectWithValue(error);
    }
  }
);

export const newlyAddedSlice = createSlice({
  name: 'newlyAdded',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNewlyAdded.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchNewlyAdded.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload.products,
        isLoading: false,
        error: '',
      };
    });
    builder.addCase(fetchNewlyAdded.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message
          ? action.error.message
          : 'Something went wrong',
      };
    });
  },
});
export default newlyAddedSlice.reducer;
