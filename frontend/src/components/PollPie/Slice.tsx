import React from 'react'
import { animated, useSpring } from 'react-spring'

interface Props {
  color: string,
  percentage: number,
  offset: number,
  index: number
}

const getDashArray = (percentage: number) => {
  return percentage * 314.16 / 100
}

const Slice: React.FC<Props> = ({ percentage, offset, color, index }) => {
  const props = useSpring({
    from: {
      stroke: 'transparent',
    },
    to: {
      stroke: color,
    },
    delay: index * 500,
    config: {
      duration: 240
    }
  })
  return (
    <animated.circle
      style={props}
      cx='100'
      cy='100'
      r='50'
      fill='transparent'
      strokeDasharray={`${getDashArray(percentage)} 314.16`}
      strokeWidth='100'
      strokeDashoffset={`-${offset * 3.14159}`}
      transform='rotate(-90) translate(-200)'
    />
  )
}

export default Slice