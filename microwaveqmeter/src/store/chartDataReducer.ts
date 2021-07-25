import { createSlice } from '@reduxjs/toolkit';
import { MaximumOnChart } from '../types/Chart';

type ChartDataState = {
    hubConnectionId: string;
    maximums: MaximumOnChart[];
    viewportMinimum: number;
    minimumPointValue: number;
    displayFitErrorCurve: boolean;
    isFitErrors: boolean[];
    measuredPointsPerSecond: number;
}

const initialState: ChartDataState = {
    hubConnectionId: '',
    maximums: [],
    viewportMinimum: 0,
    minimumPointValue: 0,
    displayFitErrorCurve: false,
    isFitErrors: [],
    measuredPointsPerSecond: 0,
}

export const chartDataSlice = createSlice({
    name:'chartData',
    initialState: initialState,
    reducers: {
        setChartData: (state, action) => {
            state.maximums = action.payload.maximums
            state.minimumPointValue = action.payload.minimumPointValue
            state.isFitErrors = action.payload.isFitErrors;
            state.measuredPointsPerSecond = action.payload.measuredPointsPerSecond;
        },
        setHubConnectionId: (state, action) => {
            state.hubConnectionId = action.payload;
        },
        setViewportMinimum: (state) => {
            state.viewportMinimum = (state.minimumPointValue-20);
        },
        setDisplayFitErrorCurve: (state, action) => {
            state.displayFitErrorCurve = action.payload;
        }
    }
});

export const { setChartData, setHubConnectionId, setViewportMinimum, setDisplayFitErrorCurve } = chartDataSlice.actions;

export const selectHubConnectionId = (state: any) => state.chartData.hubConnectionId;
export const selectMaximums = (state: any) => state.chartData.maximums;
export const selectViewportMinimum = (state: any) => state.chartData.viewportMinimum;
export const selectDisplayFitErrorCurve = (state: any) => state.chartData.displayFitErrorCurve;
export const selectIsFitErrors = (state: any) => state.chartData.isFitErrors;
export const selectIsAnyFitErrors = (state: any) => state.chartData.isFitErrors.some((x:boolean)=>x);
export const selectMeasuredPointsPerSecond = (state: any) => state.chartData.measuredPointsPerSecond;

export default chartDataSlice.reducer;