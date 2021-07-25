import { createSlice } from '@reduxjs/toolkit';
import { SavedResult } from '../types/SavedResult';
import { ResultBackend } from '../types/Result';
import { formatQFactor } from '../formatters/formatQFactor';

const initialQfactorResult = {
  Q_factor: 0,
  CenterFrequency: 0,
  CenterFrequencyDifference: 0,
  Bandwidth: 0,
  PeakTransmittance: 0,
  NumberOfPoints: 0,
}

type ResultState = {
    activeResult: ResultBackend;
    currentResult: ResultBackend[];
    currentResults: SavedResult[];
    indexOfCurrentResult: number;
    lastSessionsNames: string[];
    currentSesion: string;
}

const initialState: ResultState = {
    activeResult: initialQfactorResult,
    currentResult: [ initialQfactorResult ],
    currentResults: [],
    lastSessionsNames: [],
    indexOfCurrentResult: 0,
    currentSesion: 'New',
}

export const resultSlice = createSlice({
    name: 'result',
    initialState: initialState,
    reducers: {
      setCurrentResult: (state, action) => {
        const mappedResultBackend = mapCurrentResult(action.payload);
        const index = state.indexOfCurrentResult <= (mappedResultBackend.length - 1) ? state.indexOfCurrentResult : 0;
        state.indexOfCurrentResult = index;
        state.currentResult = mappedResultBackend;
        state.activeResult = mappedResultBackend[index];
      },
      saveResult: (state, action) => {
        state.currentResults = [...state.currentResults, action.payload];
      },
      setIndexOfCurrentResult: (state, action) => {
        state.indexOfCurrentResult = action.payload;
      },
      setLastSessionsNames: (state, action) => {
        state.lastSessionsNames = action.payload;
      },
      setCurrentResultFromSavedSession: (state, action) => {
        state.currentResults = action.payload;
      },
      setCurrentSession: (state, action) => {
        state.currentSesion = action.payload;
      },
    }
  })

  const mapCurrentResult = (payload: any) => {
    var result = [];

    if(payload) { 
      for (const qFactorResult of payload) {
        const qFactorState = mapQFactorResult(qFactorResult);
        result.push(qFactorState)
      }
    }
    return result;
  }
  
  const mapQFactorResult = (qFactorBackend: any) => ({
    Q_factor: formatQFactor(qFactorBackend.q_factor),
    CenterFrequency: Math.round((qFactorBackend.centerFrequency) * 1000) / 1000,
    Bandwidth: Math.round((qFactorBackend.bandwidth) * 1000) / 1000,
    PeakTransmittance: Math.round(qFactorBackend.peakTransmittance * 10) / 10,
    CenterFrequencyDifference: Math.round((((qFactorBackend.centerFrequency -10000) /1000000)) * 1000 ) / 1000,
    NumberOfPoints: qFactorBackend.numberOfPoints,
  })

  export const {
    saveResult,
    setCurrentResult,
    setIndexOfCurrentResult,
    setLastSessionsNames,
    setCurrentResultFromSavedSession,
    setCurrentSession,
} = resultSlice.actions;
  
  export const selectCurrentResults = (state: any) => state.result.currentResults;
  export const selectCurrentResult = (state: any) => state.result.currentResult;
  export const selectActiveCurrentResult = (state: any) => state.result.activeResult;
  export const selectIndexOfCurrentResult = (state: any) => state.result.indexOfCurrentResult;
  export const selectLastSessionsNames = (state: any) => state.result.lastSessionsNames;
  export const selectCurrentSession = (state: any) => state.result.currentSesion;

  export default resultSlice.reducer