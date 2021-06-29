import React, { CSSProperties } from 'react'
import { PollOption } from '../../types'
import AnimatedChart from './AnimatedChart'
import Legend from './Legend'

// Temporary for early development
const exampleResults: PollOption[] = [
  {
    label: 'Webster',
    votes: 41201,
    color: 'red'
  },
  {
    label: 'Van Buren',
    votes: 764176,
    color: 'green'
  },
  {
    label: 'Harrison',
    votes: 550816,
    color: 'blue'
  },
  {
    label: 'White',
    votes: 146109,
    color: 'black'
  }
]

const getPercentages = (resultsArray: PollOption[]) => {
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
  })

  const resultsWithPercent = sortedResults.map(r => r = {
    ...r,
    percent: (r.votes / total) * 100
  })

  return resultsWithPercent.map((r, index) => r = {
    ...r,
    offset: index === 0 ? 0 : index === 1 ? resultsWithPercent[0].percent : resultsWithPercent.slice(0, index).map(r => r.percent).reduce(reducer)
  })
}

const pollDivStyles: CSSProperties = {
  display: 'flex',
  gap: '10vw',
  height: '100vh',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap'
}

const PollPie: React.FC = () => {
  const calculatedResults = getPercentages(exampleResults)
  return (
    <div>
      <div style={pollDivStyles}>
        <AnimatedChart results={calculatedResults}/>
        <Legend results={calculatedResults} />
      </div>
    </div>
  )
}

export default PollPie