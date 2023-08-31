import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import bearerSlice from './slices/bearerSlice'

const preloadedState = {
  [userSlice.name]:
    JSON.parse(sessionStorage.getItem(userSlice.name) as string) || {},
  [bearerSlice.name]:
    JSON.parse(sessionStorage.getItem(bearerSlice.name) as string) || {},
}

export const store = configureStore({
  reducer: combineReducers({
    [userSlice.name]: userSlice.reducer,
    [bearerSlice.name]: bearerSlice.reducer,
  }),
  preloadedState,
})

store.subscribe(() => {
  const state = store.getState()
  sessionStorage.setItem(userSlice.name, JSON.stringify(state.user))
  sessionStorage.setItem(bearerSlice.name, JSON.stringify(state.bearer))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
