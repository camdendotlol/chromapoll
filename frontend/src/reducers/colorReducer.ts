import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = 'rgb(233, 233, 233)'

// This reducer determines the color of various UI elements
// It will be updated only on the poll results page when the chromapoll is displayed
const colorSlice = createSlice({
  name: 'colorSlice',
  initialState,
  reducers: {
    updateUIColor(state, action: PayloadAction<string>) {
      const color = action.payload
      const colorArray = color.replace('(', '[').replace(')', ']')

      const tuple = JSON.parse(`{"color": ${colorArray.slice(3, colorArray.length)}}`)

      const handleBrightness = (colorCode: number) => {
        return colorCode + (Math.floor((255 - colorCode) / 1.5))
      }

      const colorObject = {
        r: handleBrightness(tuple.color[0]),
        g: handleBrightness(tuple.color[1]),
        b: handleBrightness(tuple.color[2])
      }

      return state = `rgb(${colorObject.r}, ${colorObject.g}, ${colorObject.b})`
    }
  }
})

export const { updateUIColor } = colorSlice.actions

export default colorSlice.reducer

export const colorSelector = (state: { colorStore: string }): string => state.colorStore