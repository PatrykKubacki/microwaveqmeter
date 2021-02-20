import { createSlice } from '@reduxjs/toolkit';
import { SavedResultDisplay } from '../types/Settings';
import configData from "../configuration/config.json";

type SettingsState = {
    savedResultDisplay: SavedResultDisplay;
}

const initialState: SettingsState = {
    savedResultDisplay: {
        ...configData.settings.savedResultDisplay,
    }
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialState,
    reducers: {
          setSavedResultDisplay: (state, action) => {
              state.savedResultDisplay = {
                displaySampleName: action.payload.displaySampleName,
                displayH: action.payload.displayH,
                displayPermittivity: action.payload.displayPermittivity,
                displayDielLossTangent: action.payload.displayDielLossTangent,
                displayResistivity: action.payload.displayResistivity,
                displaySheetResistance: action.payload.displaySheetResistance,
                displayQFactor: action.payload.displayQFactor,
                displayFrequencyDifference: action.payload.displayFrequencyDifference,
                displayF0: action.payload.displayF0,
                displayBandwidth: action.payload.displayBandwidth,
                displayPeakTransmittance: action.payload.displayPeakTransmittance,
                displayPointsOnScreen: action.payload.displayPointsOnScreen,
              }
          }
    }
})
export const { setSavedResultDisplay } = settingsSlice.actions;

export const selectSavedResultDisplay = (state: any) => state.settings.savedResultDisplay;

export default settingsSlice.reducer