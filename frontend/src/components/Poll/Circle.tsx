import React from 'react'
import { animated, useSpring } from 'react-spring'
import { ChoiceWithData } from '../../types'
import Chroma from './Chroma'
import { ChartType } from './index'
import Pie from './Pie'

interface Props {
  results: ChoiceWithData[]
  chartType: ChartType
}

const AnimatedChart: React.FC<Props> = ({ results, chartType }) => {
  const parentProps = useSpring({
    from: {
      scale: '50%'
    },
    to: {
      scale: '100%'
    },
    config: {
      duration: 240
    }
  })

  const displayChart = () => {
    switch (chartType) {
      case ChartType.Chroma:
        return <Chroma results={results} />
      case ChartType.Pie:
        return <Pie results={results} />
    }
  }

  return (
    <animated.svg height='400' width='400' style={parentProps}>
      <animated.circle cx='200' cy='200' r='200' fill='#000000' />
      {displayChart()}
    </animated.svg>
  )
}

export default AnimatedChart