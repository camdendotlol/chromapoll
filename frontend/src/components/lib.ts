import { UIColor } from '../reducers/colorReducer'
import { Choice, ChoiceWithData, RGBColor } from '../types'

export const sum = (a: number, b: number): number => a + b

// Calculates the offset for pie slices to appear in the correct spot on the chart
const getOffset = (index: number, results: ChoiceWithData[]) => {
  switch (index) {
  case 0:
    return 0
  case 1:
    return results[0].percent
  default:
    return results.slice(0, index).map(r => r.percent).reduce(sum)
  }
}

// Add percentage and offset to the results array
export const calculateDisplayData = (resultsArray: Choice[]): ChoiceWithData[] => {
  // Copy for mutation
  const results = resultsArray.slice()

  const sortedResults = results.sort((a, b) => {
    if (a.votes > b.votes) {
      return -1
    } if (a.votes < b.votes) {
      return 1
    } else {
      return 0
    }
  })

  const totalVotes = sortedResults.map(r => r.votes).reduce(sum)

  if (totalVotes === 0) {
    return results.map(r => r = {...r, percent: 0, offset: 0} as ChoiceWithData)
  }

  const newResults = sortedResults.map((r) => r = { ...r, percent: 0, offset: 0 } as ChoiceWithData)

  for (let x = 0; x < newResults.length; x++) {
    newResults[x].percent = (newResults[x].votes / totalVotes) * 100
    newResults[x].offset = getOffset(x, newResults)
  }

  return newResults
}

export const hexToRGB = (hexColor: string): RGBColor => ({
  r: parseInt(hexColor.slice(1, 3), 16),
  g: parseInt(hexColor.slice(3, 5), 16),
  b: parseInt(hexColor.slice(5, 7), 16)
})

// If there are no votes yet, use this for a flat average
const getAverageColor = (colors: RGBColor[]) => (
  {
    r: Math.floor(colors.map(c => c.r).reduce(sum) / colors.length),
    g: Math.floor(colors.map(c => c.g).reduce(sum) / colors.length),
    b: Math.floor(colors.map(c => c.b).reduce(sum) / colors.length)
  }
)

// Add a leading 0 if the number is low to keep it safe to color hex codes
export const toHex = (number: number): string => {
  const hex = number.toString(16)
  if (hex.length < 2) {
    return `0${hex}`
  } else {
    return hex
  }
}

export const mixColors = (choices: Choice[]): string => {
  const multipliedColors = []

  // Create an array of color codes, with each one multipled by the number of votes.
  // This makes it easy to average below but I'm sure there's a faster, more
  // algorithmic way to do this.
  for (let x = 0; x < choices.length; x++) {
    const RGBColor = hexToRGB(choices[x].color)
    
    for (let y = 0; y < choices[x].votes; y++) {
      multipliedColors.push(RGBColor)
    }
  }

  let averages

  // if there are no votes in the poll yet
  if (multipliedColors.length === 0) {
    averages = getAverageColor(choices.map(c => hexToRGB(c.color)))
  } else {
    averages = {
      r: Math.floor(multipliedColors.map(c => c.r).reduce(sum) / multipliedColors.length),
      g: Math.floor(multipliedColors.map(c => c.g).reduce(sum) / multipliedColors.length),
      b: Math.floor(multipliedColors.map(c => c.b).reduce(sum) / multipliedColors.length)
    }
  }

  return `#${toHex(averages.r)}${toHex(averages.g)}${toHex(averages.b)}`
}

export const getTextColor = (uiColor: UIColor): string => {
  if (uiColor.default) {
    return '#e9e9e9'
  } else {
    return '#202020'
  }
}

// Determine whether a color is bright enough to use dark text on it
export const isBright = (hexColor: string): boolean => {
  const rgbColor = hexToRGB(hexColor)
  const total = rgbColor.b + rgbColor.g + rgbColor.r
  if (total > 450) {
    return true
  } else {
    return false
  }
}

export const generateRandomColor = (): string => {
  const hexAlphabet = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']

  const color = []

  for (let i = 0; i < 6; i++) {
    const char = hexAlphabet[Math.floor(Math.random() * hexAlphabet.length)]
    color.push(char)
  }

  return '#' + color.join('')
}