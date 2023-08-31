import { createSlice } from '@reduxjs/toolkit';
import { SnackBarState } from '../../utils/interface';



const initialState: SnackBarState =  { open: false, message: '',severity:'success' }



const snackBarSlice = createSlice({
  name: 'snackBar',
  initialState,
  reducers: {
    openSnackBar: (state, action, ) => {
      const { message, severity } = action.payload;
      state.open = true;
      state.message = message;
      state.severity = severity || 'success';
    },
    closeSnackBar: (state) => {
      state.open = false;
    },
  },
});

export const { openSnackBar, closeSnackBar } = snackBarSlice.actions;
export default snackBarSlice.reducer;
