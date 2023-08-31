import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { getErrorMessage } from '../../utils/errorMap';
import {
  decrementLoaderCounter,
  incrementLoaderCounter,
} from './globalLoaderSlice';
import { GeoPosition } from '../../utils/interface';
import { Config } from '../../utils/interface';

interface UserState {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneno: string;
  isLoading: boolean;
  error: boolean;
  errorText: string;
  userPosition: GeoPosition;
  triggerCookieCheck: number;
  infoMsg: {
    isInfoMsg: boolean;
    message: string;
  };
}

const initialState: UserState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  isLoading: false,
  error: false,
  errorText: '',
  phoneno: '',
  triggerCookieCheck: 0,
  infoMsg: {
    isInfoMsg: false,
    message: '',
  },
  userPosition: {
    latitude: null,
    longitude: null,
    address: '',
    error: '',
  },
};
type UserRes = {
  output: any;
  statusCode: number;
};

export const fetchUserDetails = createAsyncThunk<UserRes, any>(
  'user/fetchUserDetails',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(incrementLoaderCounter());
      let config: Config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.NX_API_URL}/authentication-service/authenticate`,
        headers: {
          'Content-Type': 'application/json',
          'X-Frame-Options': 'DENY',
        },
        data: JSON.stringify(payload),
      };
      const response = await axios.request(config);
      dispatch(decrementLoaderCounter());
      return response.data;
    } catch (error) {
      dispatch(decrementLoaderCounter());
      return rejectWithValue(error);
    }
  }
);
export const getUserLogout = createAsyncThunk(
  'user/getUserLogout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(incrementLoaderCounter());
      let config: Config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NX_API_URL}/authentication-service/authenticate`,
        headers: {
          'Content-Type': 'application/json',
          'X-Frame-Options': 'DENY',
        },
      };
      const response = await axios.request(config);
      dispatch(decrementLoaderCounter());
    } catch (error) {
      dispatch(decrementLoaderCounter());
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserError: (state) => {
      state.error = false;
      state.infoMsg = {
        isInfoMsg: false,
        message: '',
      };
    },
    setInfoMsg: (state, action) => {
      state.infoMsg = {
        isInfoMsg: true,
        message: action.payload,
      };
    },
    setGeoPosition: (state, action) => {
      state.userPosition = {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        address: action.payload.address,
        error: '',
      };
    },
    setGeoPositionError: (state, action) => {
      state.userPosition.error = action.payload;
    },
    flushUserData: (state) => {
      state.id = '';
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.isLoading = false;
      state.error = false;
      state.errorText = '';
      state.phoneno = '';
      state.triggerCookieCheck = 0;
    },
    setTriggerCookieCheck: (state) => {
      state.triggerCookieCheck++;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.isLoading = true;
        state.infoMsg.isInfoMsg = false;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        return {
          ...state,
          id: action.payload.output.id,
          firstName: action.payload.output.firstName,
          lastName: action.payload.output.lastName,
          email: action.payload.output.email,
          phoneno: action.payload.output.phoneno,
          isLoading: false,
          error: false,
          statusCode: action.payload.statusCode,
          infoMsg: {
            isInfoMsg: false,
            message: '',
          },
        };
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: true,
          errorText: getErrorMessage(action.payload as AxiosError),
          infoMsg: {
            isInfoMsg: false,
            message: '',
          },
        };
      });
    builder
      .addCase(getUserLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserLogout.fulfilled, (state) => {
        return initialState;
      })
      .addCase(getUserLogout.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: true,
          errorText: getErrorMessage(action.payload as AxiosError),
        };
      });
  },
});
export const {
  setUserError,
  flushUserData,
  setGeoPosition,
  setGeoPositionError,
  setInfoMsg,
  setTriggerCookieCheck,
} = userSlice.actions;
export default userSlice.reducer;
