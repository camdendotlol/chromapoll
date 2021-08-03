import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UIColor {
  default: boolean,
  light: string,
  dark: string
}

const initialState: UIColor = {
  // the "default" property lets components check for initialState without having to import this object
  default: true,
  light: 'rgb(233, 233, 233)',
  dark: 'rgb(32, 32, 32)'
}

// This reducer determines the color of various UI elements
// It will be updated only on the poll results page when the chromapoll is displayed
const colorSlice = createSlice({
  name: 'colorSlice',
  initialState,
  reducers: {
    resetUIColor(state) {
      return initialState
    },
    updateUIColor(state, action: PayloadAction<string>) {
      const color = action.payload
      const colorArray = color.replace('(', '[').replace(')', ']')

      const tuple = JSON.parse(`{"color": ${colorArray.slice(3, colorArray.length)}}`)

      const getBrightMode = (colorCode: number) => {
        return colorCode + Math.floor((255 - colorCode) / 1.5)
      }

      const getDarkMode = (colorCode: number) => {
        return colorCode - Math.floor(colorCode / 2)
      }

      const colors = {
        light: {
          r: getBrightMode(tuple.color[0]),
          g: getBrightMode(tuple.color[1]),
          b: getBrightMode(tuple.color[2])
        },
        dark: {
          r: getDarkMode(tuple.color[0]),
          g: getDarkMode(tuple.color[1]),
          b: getDarkMode(tuple.color[2])
        }
      }

      return {
        default: false,
        light: `rgb(${colors.light.r}, ${colors.light.g}, ${colors.light.b})`,
        dark: `rgb(${colors.dark.r}, ${colors.dark.g}, ${colors.dark.b})`
      }
    }
  }
})

export const { resetUIColor, updateUIColor } = colorSlice.actions

export default colorSlice.reducer

export const colorSelector = (state: { colorStore: string }): string => state.colorStore