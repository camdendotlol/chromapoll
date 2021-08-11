import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { hexToRGB } from '../components/lib'

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
      const rgbColor = hexToRGB(action.payload)

      const getBrightMode = (colorCode: number) => {
        return colorCode + Math.floor((255 - colorCode) / 1.5)
      }

      const getDarkMode = (colorCode: number) => {
        return colorCode - Math.floor(colorCode / 2)
      }

      const colors = {
        light: {
          r: getBrightMode(rgbColor.r),
          g: getBrightMode(rgbColor.g),
          b: getBrightMode(rgbColor.b)
        },
        dark: {
          r: getDarkMode(rgbColor.r),
          g: getDarkMode(rgbColor.g),
          b: getDarkMode(rgbColor.b)
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