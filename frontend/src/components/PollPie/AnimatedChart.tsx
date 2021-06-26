import React from 'react'
import { animated, useSpring } from 'react-spring'
import Slice from './Slice'

interface PollOption {
  label: string,
  votes: number,
  color: string,
  percent?: number,
  offset?: number
}

// Temporary for early development
const exampleResults: PollOption[] = [
  {
    label: 'Webster',
    votes: 41201,
    color: 'cyan'
  },
  {
    label: 'Van Buren',
    votes: 764176,
    color: 'magenta'
  },
  {
    label: 'Harrison',
    votes: 550816,
    color: 'yellow'
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

  const resultsWithPercent = sortedResults.map(r => r = {...r,
    percent: Math.floor((r.votes / total) * 10000) / 100
  })

  return resultsWithPercent.map((r, index) => r = { ...r,
    offset: index === 0 ? 0 : index === 1 ? resultsWithPercent[0].percent : resultsWithPercent.slice(0, index).map(r => r.percent).reduce(reducer)
  })
}

const AnimatedChart: React.FC = () => {
  const parentProps = useSpring({
    from: {
      scale: '100%'
    },
    to: {
      scale: '150%'
    },
    config: {
      duration: 240
    }
  })

  return (
    <animated.svg height='200' width='200' style={parentProps}>
      <animated.circle cx='100' cy='100' r='100' fill='#e9e9e9' />
      {getPercentages(exampleResults).map(r => <Slice color={r.color} percentage={r.percent} offset={10} key={r.label} />)}
    </animated.svg>
  )
}

export default AnimatedChart