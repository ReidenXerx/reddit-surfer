import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type BearerState = {
  value: string
}

export const initialState: BearerState = {
  value: '',
}

const bearerSlice = createSlice({
  name: 'bearer',
  initialState: initialState,
  reducers: {
    setBearerAction: (
      state: BearerState,
      { payload }: PayloadAction<string | null>,
    ) => {
      state.value = payload ? payload : initialState.value
    },
  },
})

export const { setBearerAction } = bearerSlice.actions
export default bearerSlice