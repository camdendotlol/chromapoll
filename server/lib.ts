interface RGBColor {
  r: number,
  g: number,
  b: number
}

const sum = (a: number, b: number): number => a + b

const toHex = (number: number): string => {
  const hex = number.toString(16)
  if (hex.length < 2) {
    return `0${hex}`
  } else {
    return hex
  }
}

const hexToRGB = (hexColor: string): RGBColor => ({
  r: parseInt(hexColor.slice(1, 3), 16),
  g: parseInt(hexColor.slice(3, 5), 16),
  b: parseInt(hexColor.slice(5, 7), 16)
})

export const getAverageColor = (colors: string[]): string => {
  const RGBColors = colors.map(color => hexToRGB(color))
  const color = {
    r: Math.floor(RGBColors.map(c => c.r).reduce(sum) / colors.length),
    g: Math.floor(RGBColors.map(c => c.g).reduce(sum) / colors.length),
    b: Math.floor(RGBColors.map(c => c.b).reduce(sum) / colors.length)
  }

  return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`
}