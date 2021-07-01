import { Choice, ChoiceWithData } from "../types"

export const getPercentages = (resultsArray: Choice[]) => {
  const reducer = (a: number, b: number) => a + b
  const total = resultsArray.map(r => r.votes).reduce(reducer)

  const sortedResults = resultsArray.sort((a, b) => {
    if (a.votes > b.votes) {
      return -1
    } if (a.votes < b.votes) {
      return 1
    } else {
      return 0
    }
  }) as ChoiceWithData[]

  const resultsWithPercent = sortedResults.map(r => r = {
    ...r,
    percent: (r.votes / total) * 100
  })

  return resultsWithPercent.map((r, index) => r = {
    ...r,
    offset: index === 0 ? 0 : index === 1 ? resultsWithPercent[0].percent : resultsWithPercent.slice(0, index).map(r => r.percent).reduce(reducer)
  })
}

const hexToRGB = (hexColor: string) => {
  const rgb = {
    r: parseInt(hexColor.slice(1, 3), 16),
    g: parseInt(hexColor.slice(3, 5), 16),
    b: parseInt(hexColor.slice(5, 7), 16)
  }
  return rgb
}

export const mixColors = (resultsArray: Choice[]) => {
  let multipliedColors = []
  for (let x = 0; x < resultsArray.length; x++) {
    const RGBColor = hexToRGB(resultsArray[x].color)
    for (let y = 0; y < resultsArray[x].votes; y++) {
      multipliedColors.push(RGBColor)
    }
  }

  const reducer = (a: number, b: number) => a + b

  const averages = {
    r: Math.floor(multipliedColors.map(c => c.r).reduce(reducer) / multipliedColors.length),
    g: Math.floor(multipliedColors.map(c => c.g).reduce(reducer) / multipliedColors.length),
    b: Math.floor(multipliedColors.map(c => c.b).reduce(reducer) / multipliedColors.length)
  }

  return `rgb(${averages.r}, ${averages.g}, ${averages.b})`
}