import { configureStore } from '@reduxjs/toolkit'
import resultReducer from './resultReducer';
import chartDataReducer from './chartDataReducer';

export default configureStore({
  reducer: {
    result: resultReducer,
    chartData: chartDataReducer,
  }
})