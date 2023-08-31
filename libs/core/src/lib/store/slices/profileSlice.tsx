import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {
  decrementLoaderCounter,
  incrementLoaderCounter,
} from './globalLoaderSlice';
import { RootState } from '../storeHelper';
import { getErrorMessage } from '../../utils/errorMap';
import { setTriggerCookieCheck, getUserLogout } from './userSlice';
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
  createdTime: string;
}
interface ProfileState {
  error: string;
  imageApiErrorText: string;
  isLoading: boolean;
  listingData: {
    data: Product[];
    error: string;
    isLoading: boolean;
    totalProductCount: number;
    pageNumber: number;
    pageLimit: number;
  };
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneno: string;
  location: null | string;
  description: string;
  profileImage: null | string;
  createdTime: string;
  socialUrls: string[];
}
const initialState: ProfileState = {
  isLoading: false,
  error: '',
  imageApiErrorText: '',
  listingData: {
    data: [],
    error: '',
    isLoading: false,
    totalProductCount: 0,
    pageNumber: 0,
    pageLimit: 24,
  },
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneno: '',
  location: null,
  description: '',
  profileImage: '',
  createdTime: '',
  socialUrls: [],
};
type ProfileResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneno: string;
  profileImage: string;
  description: string;
  location: null | string;
  createdTime: string;
  socialUrls: string[];
};
type ListingResponse = {
  products: Product[];
  numberOfProducts: number;
};
export const fetchProfileData = createAsyncThunk<ProfileResponse, any>(
  'profile/fetchProfileData',
  async (payload, { dispatch, getState, rejectWithValue }) => {
    try {
      const url = `${process.env.NX_API_URL}/profile-service/profile${
        payload.isSelfView ? '' : '/public'
      }/${payload.id}`;
      dispatch(incrementLoaderCounter());
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
      dispatch(decrementLoaderCounter());
      return response.data.data;
    } catch (error) {
      dispatch(decrementLoaderCounter());
      return rejectWithValue(error);
    }
  }
);
export const fetchProfileListing = createAsyncThunk<ListingResponse, any>(
  'profile/fetchProfileListing',
  async (payload, { dispatch, getState, rejectWithValue }) => {
    try {
      const store: RootState = getState() as RootState;
      const url = `${process.env.NX_API_URL}/product-service/products/${payload}?pageNumber=${store.profile.listingData.pageNumber}&pageSize=${store.profile.listingData.pageLimit}`;
      dispatch(incrementLoaderCounter());
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
      dispatch(decrementLoaderCounter());
      return response.data.data;
    } catch (error) {
      dispatch(decrementLoaderCounter());
      return rejectWithValue(error);
    }
  }
);

export const uploadProfilePic = createAsyncThunk<string, any>(
  'profile/uploadProfilePic',
  async (payload, { dispatch, getState, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('files', payload);
      const url = `${process.env.NX_API_URL}/image-service/images`;
      dispatch(incrementLoaderCounter());
      let config: Config = {
        method: 'post',
        maxBodyLength: Infinity,
        url,
        headers: {
          'Content-Type': 'application/json',
          'X-Frame-Options': 'DENY',
        },
        data: formData,
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
export const updateProfileInfo = createAsyncThunk<any, any>(
  'profile/updateProfileInfo',
  async (payload, { dispatch, getState, rejectWithValue }) => {
    try {
      const store: RootState = getState() as RootState;
      const userEmail = store.user.email;
      const url = `${process.env.NX_API_URL}/profile-service/profile/${userEmail}`;
      dispatch(incrementLoaderCounter());
      let config: Config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url,
        headers: {
          'Content-Type': 'application/json',
          'X-Frame-Options': 'DENY',
        },
        data: payload,
      };
      const response = await axios.request(config);
      dispatch(decrementLoaderCounter());
      dispatch(setTriggerCookieCheck());
      return response.data;
    } catch (error) {
      dispatch(decrementLoaderCounter());
      const errorStatusCode = (
        (rejectWithValue(error).payload as AxiosError).response as any
      )?.status;
      if (errorStatusCode === 401) dispatch(getUserLogout());
      if (errorStatusCode === 403) dispatch(setTriggerCookieCheck());
      return rejectWithValue(error);
    }
  }
);
export const changeProfilePass = createAsyncThunk<any, any>(
  'profile/changeProfilePass',
  async (payload, { dispatch, getState, rejectWithValue }) => {
    try {
      const store: RootState = getState() as RootState;
      const userEmail = store.user.email;
      const url = `${process.env.NX_API_URL}/profile-service/profile/pass/${userEmail}`;
      dispatch(incrementLoaderCounter());
      let config: Config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url,
        headers: {
          'Content-Type': 'application/json',
          'X-Frame-Options': 'DENY',
        },
        data: payload,
      };
      const response = await axios.request(config);
      dispatch(decrementLoaderCounter());
      dispatch(setTriggerCookieCheck());
      return response.data;
    } catch (error) {
      dispatch(decrementLoaderCounter());
      const errorStatusCode = (
        (rejectWithValue(error).payload as AxiosError).response as any
      )?.status;
      if (errorStatusCode === 401) dispatch(getUserLogout());
      if (errorStatusCode === 403) dispatch(setTriggerCookieCheck());
      return rejectWithValue(error);
    }
  }
);
export const deleteProfile = createAsyncThunk<any>(
  'profile/deleteProfile',
  async (payload, { dispatch, getState, rejectWithValue }) => {
    try {
      const store: RootState = getState() as RootState;
      const userID = store.user.id;
      const url = `${process.env.NX_API_URL}/profile-service/profile/${userID}`;
      dispatch(incrementLoaderCounter());
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
      dispatch(decrementLoaderCounter());
      dispatch(setTriggerCookieCheck());
      return response.data;
    } catch (error) {
      dispatch(decrementLoaderCounter());
      const errorStatusCode = (
        (rejectWithValue(error).payload as AxiosError).response as any
      )?.status;
      if (errorStatusCode === 401) dispatch(getUserLogout());
      if (errorStatusCode === 403) dispatch(setTriggerCookieCheck());
      return rejectWithValue(error);
    }
  }
);
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setListingPagination: (state, action) => {
      state.listingData.pageNumber = action.payload;
    },
    flushProfileState: (state) => {
      state.id = '';
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.phoneno = '';
      state.profileImage = '';
      state.socialUrls = [];
      state.location = '';
      state.description = '';
      state.createdTime = '';
      state.imageApiErrorText = '';
    },
    flushProfileListingState: (state) => {
      state.listingData.data = [];
      state.listingData.totalProductCount = 0;
      state.listingData.error = '';
      state.listingData.pageNumber = 0;
      state.listingData.pageLimit = 24;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProfileData.fulfilled, (state, action) => {
      return {
        ...state,
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email ?? '',
        phoneno: action.payload.phoneno ?? '',
        profileImage: action.payload.profileImage ?? '',
        location: action.payload.location,
        socialUrls: action.payload.socialUrls,
        description: action.payload.description ?? '',
        createdTime: action.payload.createdTime,
        isLoading: false,
        imageApiErrorText: '',
        error: '',
      };
    });
    builder.addCase(fetchProfileData.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: getErrorMessage(action.payload as AxiosError),
      };
    });
    builder.addCase(uploadProfilePic.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadProfilePic.fulfilled, (state, action) => {
      return {
        ...state,
        profileImage: action.payload ?? '',
        isLoading: false,
        imageApiErrorText: '',
      };
    });
    builder.addCase(uploadProfilePic.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        imageApiErrorText: getErrorMessage(action.payload as AxiosError),
      };
    });
    builder.addCase(updateProfileInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfileInfo.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: '',
      };
    });
    builder.addCase(updateProfileInfo.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: getErrorMessage(action.payload as AxiosError),
      };
    });
    builder.addCase(changeProfilePass.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changeProfilePass.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: '',
      };
    });
    builder.addCase(changeProfilePass.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: getErrorMessage(action.payload as AxiosError),
      };
    });
    builder.addCase(fetchProfileListing.pending, (state) => {
      state.listingData.isLoading = true;
    });
    builder.addCase(fetchProfileListing.fulfilled, (state, action) => {
      return {
        ...state,
        listingData: {
          data: action.payload.products,
          isLoading: false,
          error: '',
          totalProductCount: action.payload.numberOfProducts,
          pageNumber: state.listingData.pageNumber,
          pageLimit: 24,
        },
      };
    });
    builder.addCase(fetchProfileListing.rejected, (state, action) => {
      return {
        ...state,
        listingData: {
          isLoading: false,
          data: [],
          totalProductCount: 0,
          error: action.error.message
            ? action.error.message
            : 'Something went wrong',
          pageNumber: 0,
          pageLimit: 24,
        },
      };
    });
  },
});
export const {
  flushProfileState,
  flushProfileListingState,
  setListingPagination,
} = profileSlice.actions;
export default profileSlice.reducer;
