import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Config } from '../../utils/interface';
import axios, { AxiosError } from 'axios';
import { getUserLogout, setTriggerCookieCheck } from './userSlice';

interface InboxMessageProps {
  id: string;
  toId: string;
  fromId: string;
  productId: string;
  message: string;
  date: string;
  isReaded: boolean;
}

interface PostMessagePayloadProps {
  toId: string;
  fromId: string;
  productId: string;
  message: string;
}

export interface ProductProps {
  id: string;
  name: string;
  price: string;
  offerType: string;
  images: string;
}

export interface InboxUserDetails {
  userName: string;
}

export interface InboxDetailsProps {
  message: InboxMessageProps[];
  product: ProductProps;
  user: InboxUserDetails;
  count?: number;
}

interface InboxSliceProps {
  inboxcount: number;
  inboxList: any[];
  inboxDetails: InboxDetailsProps;
  isLoading: boolean;
  error?: string;
}

const initialState: InboxSliceProps = {
  inboxcount: 0,
  inboxList: [],
  inboxDetails: {
    message: [],
    user: {
      userName: '',
    },
    product: {
      id: '',
      name: '',
      price: '',
      offerType: '',
      images: '',
    },
  },
  isLoading: false,
};

interface NotificationCountResponse {
  output: number;
  statusCode: string;
  statusMessage: string;
}

interface InboxListProps {
  output: any;
  statusCode: string;
  statusMessage: string;
}

interface InboxListProps {
  output: any;
  statusCode: string;
  statusMessage: string;
}

interface messagePayloadProps {
  userId: string;
  productId: string;
}

export const fetchNotificationCount =
  createAsyncThunk<NotificationCountResponse>(
    'inbox/fetchNotificationCount',
    async (_, { dispatch, getState, rejectWithValue }) => {
      try {
        let config: Config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${process.env.NX_API_URL}/notification-service/notification/newNotification`,
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

export const fetchInboxList = createAsyncThunk<InboxListProps>(
  'inbox/fetchInboxList',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      let config: Config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NX_API_URL}/notification-service/notification/userList`,
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

export const fetchMessages = createAsyncThunk<
  InboxListProps,
  messagePayloadProps
>(
  'inbox/fetchMessages',
  async (payload, { dispatch, getState, rejectWithValue }) => {
    try {
      let config: Config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NX_API_URL}/notification-service/notification/${payload.userId}/${payload.productId}`,
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

export const postMessages = createAsyncThunk<
  InboxListProps,
  PostMessagePayloadProps
>(
  'inbox/postMessages',
  async (payload, { dispatch, getState, rejectWithValue }) => {
    try {
      let config: Config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.NX_API_URL}/notification-service/notification`,
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

export const inboxSlice = createSlice({
  name: 'inbox',
  initialState,
  reducers: {
    flushInbox: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotificationCount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchNotificationCount.fulfilled, (state, action) => {
      return {
        ...state,
        inboxcount: action.payload.output,
      };
    });
    builder.addCase(fetchNotificationCount.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message
          ? action.error.message
          : 'Something went wrong',
      };
    });

    builder.addCase(fetchInboxList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchInboxList.fulfilled, (state, action) => {
      return {
        ...state,
        inboxcount: action.payload.output.count,
        inboxList: action.payload.output.user,
      };
    });
    builder.addCase(fetchInboxList.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message
          ? action.error.message
          : 'Something went wrong',
      };
    });

    builder.addCase(fetchMessages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      const { message, user, product } = action.payload.output;

      return {
        ...state,
        inboxcount: action.payload.output.count,
        inboxDetails: { ...state.inboxDetails, message, user, product },
      };
    });
    builder.addCase(fetchMessages.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message
          ? action.error.message
          : 'Something went wrong',
      };
    });

    builder.addCase(postMessages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postMessages.fulfilled, (state, action) => {
      const messageData = action.payload.output;
      const message = [...state.inboxDetails.message, messageData];

      return {
        ...state,
        inboxDetails: {
          ...state.inboxDetails,
          message,
        },
      };
    });
    builder.addCase(postMessages.rejected, (state, action) => {
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

export const { flushInbox } = inboxSlice.actions;
export default inboxSlice.reducer;
