import { configureStore } from '@reduxjs/toolkit'
import metamaskReducer from './slices/metamaskSlice'
export default configureStore({
  reducer: {
    metamask: metamaskReducer,
  },
})