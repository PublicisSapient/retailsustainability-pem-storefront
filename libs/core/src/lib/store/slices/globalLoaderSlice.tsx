import { createSlice } from '@reduxjs/toolkit';

const globalLoaderSlice = createSlice({
  name: 'globalLoader',
  initialState: { counter: 0 },
  reducers: {
    incrementLoaderCounter: (state) => {
      state.counter++;
    },
    decrementLoaderCounter: (state) => {
      if (state.counter > 0) {
        state.counter--;
      }
    },
  },
});

export const { incrementLoaderCounter, decrementLoaderCounter } =
  globalLoaderSlice.actions;
export default globalLoaderSlice.reducer;
