import { Choice, ChoiceWithData } from "../types"

const sum = (a: number, b: number) => a + b

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
const calculateDisplayData = (results: Choice[]) => {
  const totalVotes = results.map(r => r.votes).reduce(sum)
  const newResults = results.map((r) => r = { ...r, percent: 0, offset: 0 } as ChoiceWithData)
  for (let x = 0; x < newResults.length; x++) {
    newResults[x].percent = (newResults[x].votes / totalVotes) * 100
    newResults[x].offset = getOffset(x, newResults)
  }
  return newResults
}

export const getPercentages = (resultsArray: Choice[]) => {
  const sortedResults = resultsArray.sort((a, b) => {
    if (a.votes > b.votes) {
      return -1
    } if (a.votes < b.votes) {
      return 1
    } else {
      return 0
    }
  })
  return calculateDisplayData(sortedResults)
}

const hexToRGB = (hexColor: string) => ({
  r: parseInt(hexColor.slice(1, 3), 16),
  g: parseInt(hexColor.slice(3, 5), 16),
  b: parseInt(hexColor.slice(5, 7), 16)
})

export const mixColors = (resultsArray: Choice[]) => {
  let multipliedColors = []

  // Create an array of color codes, with each one multipled by the number of votes.
  // This makes it easy to average below but I'm sure there's a faster, more
  // algorithmic way to do this.
  for (let x = 0; x < resultsArray.length; x++) {
    const RGBColor = hexToRGB(resultsArray[x].color)
    for (let y = 0; y < resultsArray[x].votes; y++) {
      multipliedColors.push(RGBColor)
    }
  }

  const averages = {
    r: Math.floor(multipliedColors.map(c => c.r).reduce(sum) / multipliedColors.length),
    g: Math.floor(multipliedColors.map(c => c.g).reduce(sum) / multipliedColors.length),
    b: Math.floor(multipliedColors.map(c => c.b).reduce(sum) / multipliedColors.length)
  }

  return `rgb(${averages.r}, ${averages.g}, ${averages.b})`
}