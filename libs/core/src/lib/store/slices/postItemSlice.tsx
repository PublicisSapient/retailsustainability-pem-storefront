import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {
  Config,
  DeleteImageResponse,
  PostItem,
  PostItemForm,
  PostItemResponse,
} from '../../utils/interface';
import { RootState } from '../storeHelper';
import { getUserLogout, setTriggerCookieCheck } from './userSlice';

const initialState: PostItem = {
  name: '',
  description: '',
  category: '',
  offerType: '',
  images: [],
  files: [],
  geoLocation: {
    latitude: null,
    longitude: null,
  },
  user: '',
  price: '',
  isLoading: false,
  location: '',
};

export const postNewListing = createAsyncThunk<PostItemResponse, PostItemForm>(
  'postItem/postNewListing',
  async (payload, { dispatch, getState, rejectWithValue }) => {
    try {
      const { address, position } = payload.geoLocation;
      const postItemPayload = {
        ...payload,
        geoLocation: {
          latitude: position.lat,
          longitude: position.lng,
        },
        location: address,
      };

      delete postItemPayload.files;

      let config: any = {
        method: 'post',
        maxBodyLength: Infinity,
        withCredentials: true,
        url: `${process.env.NX_API_URL}/product-service/products`,
        headers: {
          'Content-Type': 'application/json',
          'X-Frame-Options': 'DENY',
        },
        data: JSON.stringify(postItemPayload),
      };
      const response = await axios.request(config);
      dispatch(setTriggerCookieCheck());
      return response.data.data;
    } catch (error) {
      const errorStatusCode = (
        (rejectWithValue(error).payload as AxiosError).response as any
      )?.status;
      if (errorStatusCode === 401) dispatch(getUserLogout());
      if (errorStatusCode === 403) dispatch(setTriggerCookieCheck());
      throw error;
    }
  }
);

export const updateProduct = createAsyncThunk<PostItemResponse, any>(
  'postItem/updateProduct',
  async (payload, { dispatch, getState, rejectWithValue }) => {
    try {
      const { address, position } = payload.geoLocation;
      const postItemPayload = {
        ...payload,
        geoLocation: {
          latitude: position.lat,
          longitude: position.lng,
        },
        location: address,
      };
      const itemId = payload.itemId;

      delete postItemPayload.files;
      delete postItemPayload.itemId;

      let config: any = {
        method: 'patch',
        maxBodyLength: Infinity,
        withCredentials: true,
        url: `${process.env.NX_API_URL}/product-service/products/${itemId}`,
        headers: {
          'Content-Type': 'application/json',
          'X-Frame-Options': 'DENY',
        },
        data: JSON.stringify(postItemPayload),
      };
      const response = await axios.request(config);
      dispatch(setTriggerCookieCheck());
      return response.data.data;
    } catch (error) {
      const errorStatusCode = (
        (rejectWithValue(error).payload as AxiosError).response as any
      )?.status;
      if (errorStatusCode === 401) dispatch(getUserLogout());
      if (errorStatusCode === 403) dispatch(setTriggerCookieCheck());
      throw error;
    }
  }
);

export const fetchListing = createAsyncThunk<PostItemResponse, any>(
  'postItem/postNewListing',
  async (payload, { dispatch, getState, rejectWithValue }) => {
    try {
      const postItemPayload = {
        ...payload,
      };

      delete postItemPayload.files;
      // delete postItemPayload.geoLocation.name;

      let config: Config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.NX_API_URL}/product-service/products`,
        headers: {
          'Content-Type': 'application/json',
          'X-Frame-Options': 'DENY',
        },
        data: JSON.stringify(postItemPayload),
      };
      const response = await axios.request(config);
      dispatch(setTriggerCookieCheck());
      return response.data.data;
    } catch (error) {
      const errorStatusCode = (
        (rejectWithValue(error).payload as AxiosError).response as any
      )?.status;
      if (errorStatusCode === 401) dispatch(getUserLogout());
      if (errorStatusCode === 403) dispatch(setTriggerCookieCheck());
      throw error;
    }
  }
);

export const deleteItemImage = createAsyncThunk<any, any>(
  'postItem/deleteItemImage',
  async (payload, { dispatch, getState }) => {
    try {
      let config: Config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${process.env.NX_API_URL}/image-service/images`,
        headers: {
          'Content-Type': 'application/json',
          'X-Frame-Options': 'DENY',
        },
        data: JSON.stringify(payload),
      };
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const uploadImage = createAsyncThunk<any, any>(
  'postItem/uploadImage',
  async (payload, { dispatch, getState }) => {
    const { file } = payload;
    const formData = new FormData();
    formData.append('files', file);
    try {
      let config: Config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.NX_API_URL}/image-service/images`,
        headers: {
          'Content-Type': 'application/json',
          'X-Frame-Options': 'DENY',
        },
        data: formData,
      };

      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const postItemSlice = createSlice({
  name: 'postItem',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const {
        category,
        offerType,
        name,
        description,
        geoLocation,
        location,
        images,
        price,
        user,
        id,
      } = action.payload;
      state.category = category;
      state.offerType = offerType;
      state.name = name;
      state.description = description;
      state.geoLocation = geoLocation;
      state.location = location;
      state.images = images;
      state.price = price;
      state.user = user;
      state.id = id;
    },
    addImage: (state, action) => {
      state.files = [...state.files, ...action.payload];
      // console.log('add Image:', state.files);
    },

    updateImage(state, action: any) {
      state.files = state.files.map((item) => {
        if (item.file === action.payload.file) {
          return { ...item, ...action.payload };
        }
        return item;
      });
      // console.log('update Image:', state.images);
    },

    deleteImage(state, action) {
      if (action.payload.data) {
        deleteItemImage(action.payload.data);
      } else {
        state.files = state.files.filter((item) => {
          if (item.file !== action.payload.file) {
            return true;
          }
        });
      }
      // console.log('delete Image:', state.images);
    },
    unLinkImage(state, action) {
      state.images = state.images.filter((item) => {
        if (item !== action.payload) {
          return true;
        }
      });
    },
    flushPostItemState: (state) => {
      state.name = '';
      state.description = '';
      state.category = '';
      state.offerType = '';
      state.images = [];
      state.files = [];
      (state.geoLocation = {
        latitude: null,
        longitude: null,
      }),
        (state.user = '');
      state.price = '';
      state.isLoading = false;
      state.location = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteItemImage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteItemImage.fulfilled, (state, action) => {
      const files = state.files.filter(
        (item) => item.url !== action.meta.arg.url[0]
      );
      return {
        ...state,
        files: files,
      };
    });
    builder.addCase(deleteItemImage.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message
          ? action.error.message
          : 'Something went wrong',
      };
    });

    builder.addCase(uploadImage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadImage.fulfilled, (state, action) => {
      const { file } = action.meta.arg;
      const { data, message } = action.payload;
      const result: any = {
        url: data,
        message: message,
      };

      const files = state.files.map((item) => {
        if (item.file === file) {
          return { ...item, ...result, progress: 100 };
        }
        return item;
      });

      // const images = state.images.filter(image => image.url !== action.meta.arg.url[0]);
      return {
        ...state,
        files,
      };
    });
    builder.addCase(uploadImage.rejected, (state, action) => {
      const { file } = action.meta.arg;
      const { requestStatus } = action.meta;
      const { message } = action.error;

      const errorMessage: any = [];
      errorMessage.push({
        message:
          message == 'Request failed with status code 400'
            ? `Unacceptable image, image cannot be uploaded`
            : message,
        code: 400,
      });

      const files = state.files.map((item) => {
        if (item.file === file) {
          return {
            ...item,
            isServerError: true,
            errors: errorMessage,
            progress: 0,
          };
        }
        return item;
      });
      return {
        ...state,
        files,
        isLoading: false,
      };
    });
  },
});
export const {
  addImage,
  addProduct,
  updateImage,
  deleteImage,
  unLinkImage,
  flushPostItemState,
} = postItemSlice.actions;
export default postItemSlice.reducer;
