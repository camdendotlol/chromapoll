import React from 'react'
import { animated, useSpring } from 'react-spring'
import { ChoiceWithData } from '../../../types'
import { mixColors } from '../../lib'

interface Props {
  results: ChoiceWithData[]
}

const Chroma: React.FC<Props> = ({ results }) => {
  const colorToShow = mixColors(results)

  const props = useSpring({
    from: {
      fill: 'transparent'
    },
    to: {
      fill: colorToShow
    },
    config: {
      duration: 240
    }
  })

  return (
    <animated.circle style={props} cx='200' cy='200' r='200' fill={colorToShow} />
  )
}

export default Chroma