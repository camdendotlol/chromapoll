import React from 'react'
import { animated, useSpring } from '@react-spring/web'

interface Props {
  color: string,
  percentage: number,
  offset: number,
  index: number
}

const Slice: React.FC<Props> = ({ percentage, offset, color, index }) => {
  const props = useSpring({
    from: {
      stroke: 'transparent'
    },
    to: {
      stroke: color
    },
    delay: index * 500,
    config: {
      duration: 240
    }
  })

  return (
    <animated.circle
      style={props}
      cx='200'
      cy='200'
      r='100'
      fill='transparent'
      strokeDasharray={`${percentage * 628.319 / 100} 628.319`}
      strokeWidth='200'
      strokeDashoffset={`${offset * -6.28319}`}
      transform='rotate(-90) translate(-400)'
    />
  )
}

export default Slice