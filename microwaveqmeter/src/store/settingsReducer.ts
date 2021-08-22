import { createSlice } from '@reduxjs/toolkit';
import { SavedResultDisplay, ConverterInfo } from '../types/Settings';
import configData from "../configuration/config.json";
import { MainSettings, DefaultResonatorType, Algorithm, MeasType, SerialPort } from '../types/MainSettings';

type SettingsState = {
    savedResultDisplay: SavedResultDisplay;
    converterInfo: ConverterInfo;
    mainSettings: MainSettings;
}

const initialState: SettingsState = {
    savedResultDisplay: {
        ...configData.settings.savedResultDisplay,
    },
    converterInfo: {
        resonatorName: 'R5138_large',
        resonatorType: 'Split-Post',
    },
    mainSettings: {
        defaultResonatorType: DefaultResonatorType.splitPost,
        automaticMeasurement: true,
        connection: {
            serialPort: SerialPort.auto
        },
        calculation: {
            measType: MeasType.s21,
            noiseReduction: {
              averaging: '2',
              oversampling: '10',  
            },
            algorithmSettings: {
                algorithm: Algorithm.leastSquaresFit,
                unloadedQCorrection: true,
            }
        }
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
          },
          setMainSettings: (state, action) => {
              state.mainSettings = {
                  ...action.payload,
              }
          }
    }
})
export const { setSavedResultDisplay, setMainSettings } = settingsSlice.actions;

export const selectSavedResultDisplay = (state: any) => state.settings.savedResultDisplay;
export const selectConverterInfo = (state: any) => state.settings.converterInfo;
export const selectMainSettings = (state: any) => state.settings.mainSettings;

export default settingsSlice.reducer