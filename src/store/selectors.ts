import { RootState } from './store'

export const selectUserData = (state: RootState) => state.user.value
export const selectBearer = (state: RootState) => state.bearer.value
