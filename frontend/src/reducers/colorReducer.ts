import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = 'rgb(233, 233, 233)'

// This reducer determines the color of various UI elements
// It will be updated only on the poll results page when the chromapoll is displayed
const colorSlice = createSlice({
  name: 'colorSlice',
  initialState,
  reducers: {
    updateUIColor(state, action: PayloadAction<string>) {
      return state = action.payload
    }
  }
})

export const { updateUIColor } = colorSlice.actions

export default colorSlice.reducer

export const colorSelector = (state: { colorStore: string }): string => state.colorStore