import { createSlice } from '@reduxjs/toolkit';
import { SnackBarState } from '../../utils/interface';



interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}

export interface LocationPlaceType {
  description: string;
  structured_formatting?: StructuredFormatting;
  hasLatLng?: boolean; 
}

interface LocationProps {
  inputValue:string,
  value:LocationPlaceType,
  mapLatLng:{lat:number,lng:number}
}

const initialState:LocationProps =  { 
  inputValue:'',
  value: { description:'' },
  mapLatLng:null
 }



const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocationValue: (state,action) => {
      state.value = action.payload;
    },
    setLocationInputValue: (state,action) => {
      state.inputValue = action.payload;
    },
    setMapLatLng: (state,action) => {
      state.mapLatLng = action.payload;
    },
    flushLocation:(state) => {
      state.value = {description:''};
      state.inputValue = initialState.inputValue;
      state.mapLatLng = null;
    }
  },
});

export const { setLocationInputValue, setLocationValue,setMapLatLng,flushLocation } = locationSlice.actions;
export default locationSlice.reducer;
