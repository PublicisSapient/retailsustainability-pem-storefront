import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {
  decrementLoaderCounter,
  incrementLoaderCounter,
} from './globalLoaderSlice';
import { getErrorMessage } from '../../utils/errorMap';
import { Config } from '../../utils/interface';
interface UserState {
  output: any;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneno: string;
  isLoading: boolean;
  error: boolean;
  errorText: string;
  statusCode: number;
}

const initialState: UserState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  isLoading: false,
  error: false,
  errorText: '',
  output: undefined,
  phoneno: '',
  statusCode: 0,
};

export const fetchCreateUser = createAsyncThunk<UserState, any>(
  'createUser/fetchCreateUser',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(incrementLoaderCounter());
      let config: Config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.NX_API_URL}/profile-service/profile`,
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

export const accountSlice = createSlice({
  name: 'createUser',
  initialState,
  reducers: {
    setCreateUserError: (state) => {
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCreateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCreateUser.fulfilled, (state, action) => {
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
      };
    });
    builder.addCase(fetchCreateUser.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: true,
        errorText: getErrorMessage(action.payload as AxiosError),
      };
    });
  },
});
export const { setCreateUserError } = accountSlice.actions;
export default accountSlice.reducer;
