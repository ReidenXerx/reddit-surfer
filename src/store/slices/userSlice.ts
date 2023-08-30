import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type UserState = {
  value: Record<string, string>
}

export const initialState: UserState = {
  value: {},
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserAction: (
      state: UserState,
      { payload }: PayloadAction<Record<string, string> | null>,
    ) => {
      state.value = payload ? { ...payload } : initialState.value
    },
  },
})

export const { setUserAction } = userSlice.actions
export default userSlice
