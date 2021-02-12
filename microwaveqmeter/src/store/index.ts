import { configureStore } from '@reduxjs/toolkit'
import resultReducer from './resultReducer';
import chartDataReducer from './chartDataReducer';
import resonatorReducer from './resonatorReducer';

export default configureStore({
  reducer: {
    result: resultReducer,
    chartData: chartDataReducer,
    resonator: resonatorReducer,
  }
})