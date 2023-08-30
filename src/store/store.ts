import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'

export const store = configureStore({
  reducer: combineReducers({
    [userSlice.name]: userSlice.reducer,
  }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
