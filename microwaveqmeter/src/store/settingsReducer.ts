import { createSlice } from '@reduxjs/toolkit';
import { SavedResultDisplay, ConverterInfo } from '../types/Settings';
import configData from "../configuration/config.json";

type SettingsState = {
    savedResultDisplay: SavedResultDisplay;
    converterInfo: ConverterInfo;
}

const initialState: SettingsState = {
    savedResultDisplay: {
        ...configData.settings.savedResultDisplay,
    },
    converterInfo: {
        resonatorName: 'R5138_large',
        resonatorType: 'Split-Post',
    }
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialState,
    reducers: {
          setSavedResultDisplay: (state, action) => {
              state.savedResultDisplay = {
                ...action.payload,
              }
          }
    }
})
export const { setSavedResultDisplay } = settingsSlice.actions;

export const selectSavedResultDisplay = (state: any) => state.settings.savedResultDisplay;
export const selectConverterInfo = (state: any) => state.settings.converterInfo;

export default settingsSlice.reducer