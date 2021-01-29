import { createSlice } from '@reduxjs/toolkit';

type ChartDataState = {
    startFrequency: number;
    stopFrequency: number;
    pointsOnScreen: number;
}

const initialState: ChartDataState = {
    startFrequency: 0,
    stopFrequency: 0,
    pointsOnScreen: 0,
}

export const chartDataSlice = createSlice({
    name:'chartData',
    initialState: initialState,
    reducers: {
        setChartData: (state, action) => {
            state.startFrequency = action.payload.startFrequency;
            state.stopFrequency = action.payload.stopFrequency;
            state.pointsOnScreen = action.payload.pointsOnScreen;
        }
    }
})

export const { setChartData } = chartDataSlice.actions;

export const selectStartFrequency = (state: any) => state.chartData.startFrequency;
export const selectStopFrequency = (state: any) => state.chartData.stopFrequency;
export const selectPointsOnScreen = (state: any) => state.chartData.pointsOnScreen;

export default chartDataSlice.reducer;