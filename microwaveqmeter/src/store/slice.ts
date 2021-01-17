import { createSlice } from '@reduxjs/toolkit';
import { SavedResult } from '../types/SavedResult';

type ResultState = {
    currentResults: SavedResult[];
}

const initialState: ResultState = {
    currentResults: [],
}

export const resultSlice = createSlice({
    name: 'result',
    initialState: initialState,
    reducers: {
      saveResult: (state, action) => {
        state.currentResults = [...state.currentResults, action.payload]
      }
    }
  })
  
  export const { saveResult } = resultSlice.actions
  export const selectCurrentResults = (state: any) => state.result.currentResults;
  
  export default resultSlice.reducer