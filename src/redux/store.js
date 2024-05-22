import { configureStore } from '@reduxjs/toolkit'
import metamaskReducer from './slices/metamaskSlice'
import userReducer from './slices/userSlice'
export default configureStore({
  reducer: {
    metamask: metamaskReducer,
    user: userReducer
  },
})