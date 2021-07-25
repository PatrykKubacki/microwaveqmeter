import { createSlice } from '@reduxjs/toolkit';

type GraphActionsState = {
    startFrequency: number;
    stopFrequency: number;
    pointsOnScreen: number;
}

export const initialState: GraphActionsState = {
    startFrequency: 8400,
    stopFrequency: 10400,
    pointsOnScreen: 800,
}

export const graphActionsSlice = createSlice({
    name:'graphActions',
    initialState: initialState,
    reducers: {
        setInitialGrphsActions: (state) => {
            state.startFrequency = initialState.startFrequency;
            state.stopFrequency = initialState.stopFrequency;
            state.pointsOnScreen = initialState.pointsOnScreen;
        },
        setStartStopRange: (state, action) => {
            state.startFrequency = action.payload.start;
            state.stopFrequency = action.payload.stop;
        },
        setStartFrequency: (state, action) => {
            state.startFrequency = parseFloat(action.payload);
        },
        setStopFrequency: (state, action) => {
            state.stopFrequency = parseFloat(action.payload);
        },
        setPointsOnScreen: (state, action) => {
            state.pointsOnScreen = parseFloat(action.payload);
        },
    }
});

// const floatParse = (value: string) => {
//     const numberValue = parseFloat(value);
//     return numberValue !== undefined && !isNaN(numberValue)
//     ? numberValue
//     : 0
// }

export const {
    setInitialGrphsActions,
    setStartFrequency,
    setStopFrequency,
    setPointsOnScreen,
    setStartStopRange } = graphActionsSlice.actions;

export const selectStartFrequency = (state: any) => state.graphActions.startFrequency;
export const selectStopFrequency = (state: any) => state.graphActions.stopFrequency;
export const selectPointsOnScreen = (state: any) => state.graphActions.pointsOnScreen;

export default graphActionsSlice.reducer;