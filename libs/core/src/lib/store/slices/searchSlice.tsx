import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../storeHelper';
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
interface searResults {
  error: string;
  isLoading: boolean;
  productsData: Product[];
  productCount: number;
  offerTypeFilters: string[];
  categoryFilters: string[];
  latitude: number | null;
  longitude: number | null;
  selectedFilters: {
    offerTypeFilters: string[];
    categoryFilters: string[];
    selectedSort: string;
  };
  apiSuccessMsg: string;
  searchTerm: string;
  pageLimit: number;
  pageNumber: number;
  triggerApiCounter: number;
  suggestionState: {
    isLoading: boolean;
    apiSuccessMsg: string;
    suggestions: string[];
  };
  currentSearchTerm: string;
}
const initialState: searResults = {
  isLoading: false,
  error: '',
  productsData: [],
  productCount: 0,
  offerTypeFilters: [],
  categoryFilters: [],
  latitude: null,
  longitude: null,
  selectedFilters: {
    offerTypeFilters: [],
    categoryFilters: [],
    selectedSort: 'Relevance',
  },
  searchTerm: '',
  apiSuccessMsg: '',
  pageLimit: 24,
  pageNumber: 1,
  triggerApiCounter: 0,
  suggestionState: {
    isLoading: false,
    apiSuccessMsg: '',
    suggestions: [],
  },
  currentSearchTerm: '',
};
type SearchResponse = {
  statusCode: number;
  data: {
    products: Product[];
    offerTypeListings: string[];
    categoryListings: string[];
    noOfProducts: number;
  };
  message: string;
};
const sortOptionMapper: {
  [key: string]: string;
} = {
  Date: 'DATE',
  Relevance: 'RELEVANCE',
  'Price (Low to High)': 'PRICE_LOW_HIGH',
  'Price (High to Low)': 'PRICE_HIGH_LOW',
};
export const fetchSearchResults = createAsyncThunk<SearchResponse, any>(
  'search/fetchSearchResults',
  async (payload, { dispatch, getState, rejectWithValue }) => {
    try {
      const store: RootState = getState() as RootState;
      const apiPayload = {
        limit: store?.search?.pageLimit,
        pageNumber: store?.search?.pageNumber,
        offerTypeValue: store?.search?.selectedFilters?.offerTypeFilters,
        categoryValue: store?.search?.selectedFilters?.categoryFilters,
        sortBy: sortOptionMapper[store?.search?.selectedFilters?.selectedSort],
        ...((store?.search?.latitude || store?.user?.userPosition?.latitude) &&
          store?.search?.latitude !== 0 && {
            latitude:
              store?.search?.latitude ?? store?.user?.userPosition?.latitude,
            longitude:
              store?.search?.longitude ?? store?.user?.userPosition?.longitude,
          }),
      };
      const searchQuery = payload !== '' ? `?query=${payload}` : '';
      let config: Config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.NX_API_URL}/search-service/search${searchQuery}`,
        headers: {
          'Content-Type': 'application/json',
          'X-Frame-Options': 'DENY',
        },
        data: JSON.stringify(apiPayload),
      };
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
type SuggestionApiRes = {
  message: string;
  data: string[];
};
export const fetchSearchSuggetions = createAsyncThunk<SuggestionApiRes>(
  'search/fetchSearchSuggetions',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const store: RootState = getState() as RootState;
      const url = `${process.env.NX_API_URL}/search-service/search?query=${
        store?.search?.searchTerm
      }${
        (store?.search?.latitude || store?.user?.userPosition?.latitude) &&
        store?.search?.latitude !== 0
          ? `&latitude=${
              store?.search?.latitude ?? store?.user?.userPosition?.latitude
            }&longitude=${
              store?.search?.longitude ?? store?.user?.userPosition?.longitude
            }`
          : ''
      }`;
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
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setOfferTypeFilter: (state, action) => {
      state.selectedFilters.offerTypeFilters = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.selectedFilters.categoryFilters = action.payload;
    },
    setSortByOption: (state, action) => {
      state.selectedFilters.selectedSort = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    triggerSearch: (state) => {
      if (state.pageNumber === 1) state.triggerApiCounter++;
      else state.pageNumber = 1;
    },
    setCurrentSearchTerm: (state, action) => {
      state.currentSearchTerm = action.payload;
    },
    setSearchLoaction: (state, action) => {
      state.latitude = action.payload.lat;
      state.longitude = action.payload.lng;
    },
    flushSearchState: (state) => {
      state.productsData = [];
      state.latitude = null;
      state.longitude = null;
      state.selectedFilters = {
        offerTypeFilters: [],
        categoryFilters: [],
        selectedSort: 'Relevance',
      };
      state.productCount = 0;
      state.offerTypeFilters = [];
      state.categoryFilters = [];
      state.searchTerm = '';
      state.apiSuccessMsg = '';
      state.pageLimit = 24;
      state.pageNumber = 1;
      state.triggerApiCounter = 0;
      state.currentSearchTerm = '';
    },
    flushSearchFilters: (state) => {
      state.latitude = null;
      state.longitude = null;
      state.selectedFilters = {
        offerTypeFilters: [],
        categoryFilters: [],
        selectedSort: 'Relevance',
      };
    },
    flushSuggestions: (state) => {
      state.suggestionState = {
        isLoading: false,
        apiSuccessMsg: '',
        suggestions: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchResults.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
      return {
        ...state,
        productsData: action.payload.data.products,
        isLoading: false,
        error: '',
        productCount: action.payload.data.noOfProducts,
        offerTypeFilters: action.payload.data.offerTypeListings,
        categoryFilters: action.payload.data.categoryListings,
        apiSuccessMsg: action.payload.message,
      };
    });
    builder.addCase(fetchSearchResults.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message
          ? action.error.message
          : 'Something went wrong',
      };
    });
    builder.addCase(fetchSearchSuggetions.pending, (state) => {
      state.suggestionState.isLoading = true;
    });
    builder.addCase(fetchSearchSuggetions.fulfilled, (state, action) => {
      return {
        ...state,
        suggestionState: {
          isLoading: false,
          apiSuccessMsg: action.payload.message,
          suggestions: action.payload.data,
        },
      };
    });
    builder.addCase(fetchSearchSuggetions.rejected, (state, action) => {
      return {
        ...state,
        suggestionState: {
          isLoading: false,
          apiSuccessMsg: '',
          suggestions: [],
        },
        error: action.error.message
          ? action.error.message
          : 'Something went wrong',
      };
    });
  },
});
export const {
  setOfferTypeFilter,
  setCategoryFilter,
  setSortByOption,
  setPageNumber,
  setSearchTerm,
  flushSearchState,
  triggerSearch,
  flushSearchFilters,
  flushSuggestions,
  setCurrentSearchTerm,
  setSearchLoaction,
} = searchSlice.actions;
export default searchSlice.reducer;
