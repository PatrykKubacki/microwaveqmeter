import { createSlice } from '@reduxjs/toolkit';
import { EmptyResonator } from '../types/EmptyResonator';

type ResonatorState = {
    emptyResonator: EmptyResonator;
}

const initialState: ResonatorState = {
    emptyResonator: {
        qFactor: 0,
        centerFrequency: 0,
        peakTransmittance: 0,
    }
}

export const resonatorSlice = createSlice({
    name: 'resonator',
    initialState: initialState,
    reducers: {
        setEmptyResonator: (state, action) => {
            state.emptyResonator = {
                ...action.payload,
            } 
        },
        setQFactor: (state, action) => {
            state.emptyResonator.qFactor = parseFloat(action.payload)
        },
        setCenterFrequency: (state, action) => {
            state.emptyResonator.centerFrequency = parseFloat(action.payload)
        }, 
        setPeakTransmittance: (state, action) => {
            state.emptyResonator.peakTransmittance = parseFloat(action.payload)
        }   
    }
})
export const {
     setEmptyResonator,
     setQFactor,
     setCenterFrequency,
     setPeakTransmittance } = resonatorSlice.actions;

export const selectEmptyResonator = (state: any) => state.resonator.emptyResonator;
export const selectEmptyResonatorCenterFrequency = (state: any) => state.resonator.emptyResonator.centerFrequency;

export default resonatorSlice.reducer