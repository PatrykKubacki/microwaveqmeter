import { createSlice } from '@reduxjs/toolkit';
import { MaximumOnChart } from '../types/Chart';

type ChartDataState = {
    startFrequency: number;
    stopFrequency: number;
    pointsOnScreen: number;
    hubConnectionId: string;
    maximums: MaximumOnChart[];
    viewportMinimum: number;
    minimumPointValue: number;
}

const initialState: ChartDataState = {
    startFrequency: 0,
    stopFrequency: 0,
    pointsOnScreen: 0,
    hubConnectionId: '',
    maximums: [],
    viewportMinimum: 0,
    minimumPointValue: 0,
}

export const chartDataSlice = createSlice({
    name:'chartData',
    initialState: initialState,
    reducers: {
        setChartData: (state, action) => {
            state.startFrequency = action.payload.startFrequency;
            state.stopFrequency = action.payload.stopFrequency;
            state.pointsOnScreen = action.payload.pointsOnScreen;
            state.maximums = action.payload.maximums
            state.minimumPointValue = action.payload.minimumPointValue
        },
        setHubConnectionId: (state, action) => {
            state.hubConnectionId = action.payload;
        },
        setViewportMinimum: (state) => {
            state.viewportMinimum = (state.minimumPointValue-20);
        }
    }
})

export const { setChartData, setHubConnectionId, setViewportMinimum } = chartDataSlice.actions;

export const selectStartFrequency = (state: any) => state.chartData.startFrequency;
export const selectStopFrequency = (state: any) => state.chartData.stopFrequency;
export const selectPointsOnScreen = (state: any) => state.chartData.pointsOnScreen;
export const selectHubConnectionId = (state: any) => state.chartData.hubConnectionId;
export const selectMaximums = (state: any) => state.chartData.maximums;
export const selectViewportMinimum = (state: any) => state.chartData.viewportMinimum;

export default chartDataSlice.reducer;