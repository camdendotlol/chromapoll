import { createSlice } from '@reduxjs/toolkit'

type ErrorState = string | null

const initialState = null

const errorSlice = createSlice({
  name: 'errorSlice',
  initialState,
  reducers: {
    setErrorMessage(_state, { payload }) {
      return payload
    }
  }
})

export const { setErrorMessage } = errorSlice.actions

export default errorSlice.reducer

export const errorSelector = (state: { errorStore: ErrorState }): ErrorState => state.errorStore