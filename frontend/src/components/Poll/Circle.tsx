import React, { useEffect, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import styled from 'styled-components'
import breakpoints from '../../breakpoints'
import { ChoiceWithData } from '../../types'
import Chroma from './Chroma'
import { ChartType } from './index'
import Pie from './Pie'

interface Props {
  results: ChoiceWithData[]
  chartType: ChartType
}

const CircleContainer = styled(animated.div)`
  @media (max-width: ${breakpoints.phone}) {
    scale: 60%;
  }
`

const AnimatedChart: React.FC<Props> = ({ results, chartType }) => {
  const [isFirstLoad, setFirstLoad] = useState(true)

  const voteBounce = useSpring({
    from: { scale: '100%' },
    to: [
      { scale: '105%' },
      { scale: '100%' }
    ],
    config: {
      duration: 100
    }
  })

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

  useEffect(() => {
    // ignore the animation when the component first loads
    // otherwise it will be triggered because it's recieving new props
    if (!isFirstLoad) {
      voteBounce.scale.start()
    }
    
    setFirstLoad(false)
  }, [results])

  const displayChart = () => {
    switch (chartType) {
      case ChartType.Chroma:
        return <Chroma results={results} />
      case ChartType.Pie:
        return <Pie results={results} />
    }
  }

  return (
    <CircleContainer style={voteBounce}>
      <animated.svg height='400' width='400' style={parentProps}>
          <animated.circle cx='200' cy='200' r='200' fill='#000000' />
          {displayChart()}
      </animated.svg>
    </CircleContainer>
  )
} 

export default AnimatedChart