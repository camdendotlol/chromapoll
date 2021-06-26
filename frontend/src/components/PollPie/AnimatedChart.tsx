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
      scale: '100%'
    },
    to: {
      scale: '200%'
    },
    config: {
      duration: 240
    }
  })

  return (
    <animated.svg height='200' width='200' style={parentProps}>
      <animated.circle cx='100' cy='100' r='100' fill='#e9e9e9' />
      {results.map((r, index) => <Slice color={r.color} percentage={r.percent ? r.percent : 0} offset={r.offset ? r.offset : 0} index={index} key={r.label} />)}
    </animated.svg>
  )
}

export default AnimatedChart