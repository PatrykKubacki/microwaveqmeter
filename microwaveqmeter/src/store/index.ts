import { configureStore } from '@reduxjs/toolkit'
import resultReducer from './resultReducer';
import chartDataReducer from './chartDataReducer';
import resonatorReducer from './resonatorReducer';
import settingsReducer from './settingsReducer';
import graphActionsReducer from './graphActionsReducer';

export default configureStore({
  reducer: {
    result: resultReducer,
    chartData: chartDataReducer,
    resonator: resonatorReducer,
    settings: settingsReducer,
    graphActions: graphActionsReducer,
  }
})