import { configureStore } from '@reduxjs/toolkit'
import resultReducer from './slice';

export default configureStore({
  reducer: {
    result: resultReducer,
  }
})