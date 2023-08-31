import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import accountSlice from './slices/createUserSlice';
import giveAwaySlice from './slices/giveAwaySlice';
import newlyAddedSlice from './slices/newlyAddedSlice';
import globalLoaderSlice from './slices/globalLoaderSlice';
import searchSlice from './slices/searchSlice';
import postItemSlice from './slices/postItemSlice';
import snackBarSlice from './slices/snackBarSlice';
import inboxSlice from './slices/inboxSlice';
import profileSlice from './slices/profileSlice';
import productSlice from './slices/productSlice';
import locationSlice from './slices/locationSlice';
import donationSlice from './slices/donationSlice';

//Map the slices here
export const rootReducer = combineReducers({
  user: userSlice,
  createUser: accountSlice,
  giveAway: giveAwaySlice,
  newlyAdded: newlyAddedSlice,
  globalLoader: globalLoaderSlice,
  search: searchSlice,
  postItem: postItemSlice,
  snackBar: snackBarSlice,
  inbox: inboxSlice,
  profile: profileSlice,
  product: productSlice,
  location:locationSlice,
  donation: donationSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['user'],
};
export const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunkMiddleware),
});

export default store;
