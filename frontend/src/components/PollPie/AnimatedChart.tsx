import React from 'react'
import { animated, useSpring } from 'react-spring'
import Slice from './Slice'
import { PollOption } from '../../types'

interface Props {
  results: PollOption[]
}

const AnimatedChart: React.FC<Props> = ({ results }) => {
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

  return (
    <animated.svg height='400' width='400' style={parentProps}>
      <animated.circle cx='200' cy='200' r='200' fill='#e9e9e9' />
      {results.map((r, index) => <Slice color={r.color} percentage={r.percent ? r.percent : 0} offset={r.offset ? r.offset : 0} index={index} key={r.label} />)}
    </animated.svg>
  )
}

export default AnimatedChart