import { createSlice } from '@reduxjs/toolkit';
import { SavedResult } from '../types/SavedResult';
import { ResultBackend } from '../types/Result';

type ResultState = {
    currentResult: ResultBackend;
    currentResults: SavedResult[];
}

const initialState: ResultState = {
    currentResult: {
      Q_factor: 0,
      CenterFrequency: 0,
      CenterFrequencyDifference: 0,
      Bandwidth: 0,
      PeakTransmittance: 0,
    },
    currentResults: [],
}

export const resultSlice = createSlice({
    name: 'result',
    initialState: initialState,
    reducers: {
      setCurrentResult: (state, action) => {
        state.currentResult = {
          Q_factor: Math.round(action.payload.q_factor * 1000) / 1000,
          CenterFrequency: Math.round((action.payload.centerFrequency/1000000) * 1000) / 1000,
          Bandwidth: Math.round((action.payload.bandwidth/1000000) * 1000) / 1000,
          PeakTransmittance: Math.round(action.payload.peakTransmittance * 1000) / 1000,
          CenterFrequencyDifference: Math.round((((action.payload.centerFrequency -10000) /1000000)) * 1000 ) / 1000,
        }
      },
      saveResult: (state, action) => {
        state.currentResults = [...state.currentResults, action.payload]
      }
    }
  })
  
  export const { saveResult, setCurrentResult } = resultSlice.actions;
  
  export const selectCurrentResults = (state: any) => state.result.currentResults;
  export const selectCurrentResult = (state: any) => state.result.currentResult;

  export default resultSlice.reducer